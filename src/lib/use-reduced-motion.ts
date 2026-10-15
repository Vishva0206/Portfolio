import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyPreference = () => {
      const stored = window.localStorage.getItem("portfolio-reduce-motion");
      const enabled = stored ? stored === "true" : mediaQuery.matches;
      setReducedMotion(enabled);
      document.documentElement.dataset.reduceMotion = enabled ? "true" : "false";
    };

    applyPreference();

    const handleMediaChange = () => applyPreference();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMediaChange);
      return () => mediaQuery.removeEventListener("change", handleMediaChange);
    }
    mediaQuery.addListener(handleMediaChange);
    return () => mediaQuery.removeListener(handleMediaChange);
  }, []);

  const toggleReducedMotion = () => {
    const nextValue = !reducedMotion;
    setReducedMotion(nextValue);
    window.localStorage.setItem("portfolio-reduce-motion", String(nextValue));
    document.documentElement.dataset.reduceMotion = nextValue ? "true" : "false";
  };

  return { reducedMotion, toggleReducedMotion };
}
