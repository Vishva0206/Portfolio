import { chromium } from "playwright";

const URL = process.argv[2] || "http://127.0.0.1:8080/";
const browser = await chromium.launch();
const results = [];
const ok = (n, c, d = "") => results.push(`${c ? "PASS" : "FAIL"}  ${n}${d ? " — " + d : ""}`);

// ---------- mobile: menu + anchor nav ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  const toggle = page.getByRole("button", { name: /open menu/i });
  ok("mobile menu button present", (await toggle.count()) === 1);
  await toggle.click();
  await page.waitForTimeout(400);
  const menu = page.locator("#mobile-menu");
  ok("mobile menu opens", await menu.isVisible());
  ok("menu link count", (await menu.locator("a[href^='#']").count()) === 6,
    `${await menu.locator("a[href^='#']").count()} links`);

  // menu items must be reachable and 44px tall
  const heights = await menu.locator("a[href^='#']").evaluateAll((els) =>
    els.map((e) => Math.round(e.getBoundingClientRect().height)),
  );
  ok("menu tap targets >= 44px", heights.every((h) => h >= 44), heights.join(","));

  await menu.locator("a[href='#projects']").click();
  await page.waitForTimeout(900);
  const menuClosed = (await page.locator("#mobile-menu").count()) === 0;
  ok("menu closes after nav", menuClosed);
  const scrolled = await page.evaluate(() => window.scrollY);
  ok("anchor scrolled to projects", scrolled > 500, `scrollY=${Math.round(scrolled)}`);

  // projects section must be within the viewport horizontally
  const box = await page.locator("#projects").boundingBox();
  ok("projects section full-bleed on mobile",
    box && box.x <= 1 && Math.round(box.width) === 390,
    box ? `x=${Math.round(box.x)} w=${Math.round(box.width)}` : "no box");

  ok("no mobile page errors", errs.length === 0, errs.join("; "));
  await ctx.close();
}

// ---------- desktop: project dialog ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  const h1 = (await page.locator("h1").first().textContent())?.trim();
  ok("h1 is the person's name", h1 === "Vishva N R", `h1="${h1}"`);

  const btn = page.getByRole("button", { name: /view details/i }).first();
  await btn.click();
  await page.waitForTimeout(500);
  const dialog = page.getByRole("dialog");
  ok("project dialog opens", await dialog.isVisible());
  const dtext = (await dialog.textContent()) || "";
  ok("dialog has case-study content",
    /Problem/.test(dtext) && /What I built/.test(dtext) && /My contribution/.test(dtext));

  // dialog text must be readable on its light surface (WCAG AA)
  const cr = await dialog.locator("dd").first().evaluate((el) => {
    const lin = (c) => {
      const v = c / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    const px = (s) => (s.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
    const s = getComputedStyle(el);
    const card = getComputedStyle(el.closest("[role=dialog]"));
    const [l1, l2] = [L(px(s.color)), L(px(card.backgroundColor))].sort((a, b) => b - a);
    return { color: s.color, bg: card.backgroundColor, ratio: Math.round(((l1 + 0.05) / (l2 + 0.05)) * 100) / 100 };
  });
  ok("dialog body text >= 4.5:1", cr.ratio >= 4.5, `${cr.ratio}:1 ${cr.color} on ${cr.bg}`);

  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  ok("dialog closes on Escape", (await page.getByRole("dialog").count()) === 0);

  // active nav link tracking
  await page.locator('a[href="#skills"]').first().click();
  await page.waitForTimeout(1200);
  const current = await page.locator('a[href="#skills"][aria-current="true"]').count();
  ok("nav marks active section", current >= 1, `${current} marked`);

  ok("no desktop page errors", errs.length === 0, errs.join("; "));
  await ctx.close();
}

// ---------- contact form validation ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.getByRole("button", { name: /send message/i }).click();
  await page.waitForTimeout(500);
  const errCount = await page.locator("form .text-danger").count();
  ok("empty submit shows validation errors", errCount === 4, `${errCount} errors`);
  await ctx.close();
}

await browser.close();
console.log(results.join("\n"));
const failed = results.filter((r) => r.startsWith("FAIL")).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
