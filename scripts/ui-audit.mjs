#!/usr/bin/env node
// UI audit: screenshots + measurable layout/contrast/overflow findings.
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const URL = process.argv[2] || "http://127.0.0.1:8080/";
const OUT = "screenshots/audit";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();
const report = { url: URL, viewports: {} };

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") {
      consoleErrors.push(`${m.type()}: ${m.text()}`);
    }
  });
  page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message}`));
  page.on("requestfailed", (r) =>
    consoleErrors.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`),
  );

  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  // trigger reveal animations
  await page.evaluate(async () => {
    await new Promise((r) => setTimeout(r, 400));
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });
  await page.waitForTimeout(800);

  const metrics = await page.evaluate(() => {
    const px = (v) => Math.round(v * 100) / 100;

    // ---- horizontal overflow ----
    const de = document.documentElement;
    const overflow = {
      scrollWidth: de.scrollWidth,
      clientWidth: de.clientWidth,
      hasHScroll: de.scrollWidth > de.clientWidth + 1,
      innerWidth: window.innerWidth,
    };
    const wideNodes = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      if (r.right > window.innerWidth + 1 || r.left < -1) {
        wideNodes.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 90),
          left: px(r.left),
          right: px(r.right),
          id: el.id || undefined,
        });
      }
    }

    // ---- content alignment: left/right edges of major content blocks ----
    const edges = [];
    const probes = [
      ["hero-h1", "h1"],
      ["about-card", "#about .rounded-lg"],
      ["skills-grid", "#skills .grid"],
      ["projects-heading", "#projects header"],
      ["projects-grid", "#projects .grid"],
      ["experience-list", "#experience ol"],
      ["education-list", "#education ol"],
      ["resume-cta", "#resume .rounded-lg"],
      ["contact-form", "#contact form"],
    ];
    for (const [label, sel] of probes) {
      const el = document.querySelector(sel);
      if (!el) {
        edges.push({ label, missing: true });
        continue;
      }
      const r = el.getBoundingClientRect();
      edges.push({ label, left: px(r.left), right: px(r.right), width: px(r.width) });
    }

    // ---- the full-bleed projects band ----
    const proj = document.querySelector("#projects");
    const band = proj
      ? (() => {
          const r = proj.getBoundingClientRect();
          const cs = getComputedStyle(proj);
          return {
            left: px(r.left),
            right: px(r.right),
            width: px(r.width),
            marginInline: cs.marginInlineStart + " / " + cs.marginInlineEnd,
            paddingInline: cs.paddingInlineStart + " / " + cs.paddingInlineEnd,
            bg: cs.backgroundColor,
          };
        })()
      : null;

    // ---- typography actually rendered ----
    const fontOf = (sel) => {
      const el = document.querySelector(sel);
      return el ? getComputedStyle(el).fontFamily : null;
    };

    // ---- contrast audit on real rendered text ----
    const srgb = (c) => {
      const v = c / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const lum = ([r, g, b]) =>
      0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
    const nums = (s) => (s.match(/-?[\d.]+(?:e-?\d+)?/g) || []).map(Number);

    // oklab/oklch -> sRGB 0-255. Tailwind v4 emits these, and reading their
    // components as 0-255 RGB silently produces near-black false positives.
    const oklabToRgb = (L, a, bb) => {
      const l_ = L + 0.3963377774 * a + 0.2158037573 * bb;
      const m_ = L - 0.1055613458 * a - 0.0638541728 * bb;
      const s_ = L - 0.0894841775 * a - 1.291485548 * bb;
      const l = l_ ** 3;
      const m = m_ ** 3;
      const s = s_ ** 3;
      const lin = [
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
      ];
      return lin.map((v) => {
        const c = v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
        return Math.max(0, Math.min(255, c * 255));
      });
    };

    const parse = (s) => {
      if (!s) return null;
      if (s === "transparent") return [0, 0, 0, 0];
      const n = nums(s);
      if (n.length < 3) return null;
      // every form here contributes alpha as a 4th number when present
      const alpha = n.length > 3 ? n[3] : 1;

      if (/^oklab\(/.test(s)) {
        const [r, g, b] = oklabToRgb(n[0], n[1], n[2]);
        return [r, g, b, alpha];
      }
      if (/^oklch\(/.test(s)) {
        const [L, C, H] = n;
        const rad = (H * Math.PI) / 180;
        const [r, g, b] = oklabToRgb(L, C * Math.cos(rad), C * Math.sin(rad));
        return [r, g, b, alpha];
      }
      if (/^color\(/.test(s)) {
        // color(srgb r g b / a) — 0-1 components
        return [n[0] * 255, n[1] * 255, n[2] * 255, alpha];
      }
      // plain rgb()/rgba()
      return [n[0], n[1], n[2], alpha];
    };
    // Composite every translucent ancestor layer, so text over `bg-bg/80`
    // is measured against the colour the eye actually sees.
    const effBg = (el) => {
      const layers = [];
      let n = el;
      while (n && n !== document.documentElement) {
        const c = parse(getComputedStyle(n).backgroundColor);
        if (c && c[3] > 0) {
          layers.push(c);
          if (c[3] >= 0.999) break;
        }
        n = n.parentElement;
      }
      let out = [255, 255, 255];
      for (let i = layers.length - 1; i >= 0; i--) {
        const [r, g, b, a] = layers[i];
        out = [
          r * a + out[0] * (1 - a),
          g * a + out[1] * (1 - a),
          b * a + out[2] * (1 - a),
        ];
      }
      return out.map((v) => Math.round(v));
    };
    const ratio = (a, b) => {
      const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
      return Math.round(((l1 + 0.05) / (l2 + 0.05)) * 100) / 100;
    };

    const contrast = [];
    const seen = new Set();
    for (const el of document.querySelectorAll(
      "p, h1, h2, h3, span, a, li, dt, dd, label, button, figcaption, time",
    )) {
      const txt = (el.textContent || "").trim();
      if (!txt || el.children.length > 0) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const size = parseFloat(cs.fontSize);
      const weight = Number(cs.fontWeight) || 400;
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const need = large ? 3 : 4.5;
      const fg = parse(cs.color);
      const bg = effBg(el);
      if (!fg || !bg) continue;
      const fgRgb = [Math.round(fg[0]), Math.round(fg[1]), Math.round(fg[2])];
      const cr = ratio(fgRgb, bg);
      const key = `${cs.color}|${cs.backgroundColor}|${size}|${large}`;
      if (cr < need && !seen.has(key)) {
        seen.add(key);
        contrast.push({
          text: txt.slice(0, 48),
          cls: (el.className?.baseVal ?? el.className ?? "")
            .toString()
            .slice(0, 70),
          color: `rgb(${fgRgb.join(", ")})`,
          bg: `rgb(${bg.join(", ")})`,
          sizePx: size,
          weight,
          large,
          ratio: cr,
          need,
          fail: cr < need,
        });
      }
    }

    // ---- tap target audit (mobile) ----
    const small = [];
    for (const el of document.querySelectorAll("a, button, input, textarea")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.height < 44 || r.width < 44) {
        small.push({
          tag: el.tagName.toLowerCase(),
          text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 32),
          w: px(r.width),
          h: px(r.height),
        });
      }
    }

    // ---- heading order ----
    const headings = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => ({
      level: Number(h.tagName[1]),
      text: (h.textContent || "").trim().slice(0, 40),
    }));

    return {
      overflow,
      wideNodes: wideNodes.slice(0, 25),
      edges,
      band,
      fonts: {
        h1: fontOf("h1"),
        body: fontOf("body"),
        mono: fontOf(".hero-eyebrow"),
      },
      fontFacesLoaded: [...document.fonts].map(
        (f) => `${f.family} ${f.weight} ${f.style} ${f.status}`,
      ),
      contrast,
      smallTargets: small.slice(0, 20),
      headings,
      docHeight: document.body.scrollHeight,
    };
  });

  await page.screenshot({
    path: `${OUT}/${vp.name}-full.png`,
    fullPage: true,
  });
  await page.screenshot({ path: `${OUT}/${vp.name}-fold.png` });

  report.viewports[vp.name] = { ...metrics, consoleErrors: [...new Set(consoleErrors)] };
  await ctx.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
