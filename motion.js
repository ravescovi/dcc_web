/* DeChellis Capital — scroll + load motion via Motion (motion.dev)
 * Loaded as an ES module; imports Motion from the esm.sh CDN.
 * Respects prefers-reduced-motion.
 */

import { animate, inView, stagger } from "https://esm.sh/motion@11?bundle";

const reducedMotion =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion) {
  document.documentElement.classList.add("reduced-motion");
} else {
  document.documentElement.classList.remove("no-js");

  /* --- Hero entrance --- */
  const heroEls = document.querySelectorAll(
    ".hero .eyebrow, .hero h1, .hero__lede, .hero__actions, .hero__meta"
  );
  if (heroEls.length) {
    animate(
      heroEls,
      { opacity: [0, 1], transform: ["translateY(28px)", "translateY(0)"] },
      { duration: 0.9, delay: stagger(0.12), easing: [0.2, 0.65, 0.3, 1] }
    );
  }

  /* --- Scroll-triggered reveal ---
   * Any element with .reveal animates in when it scrolls into view.
   * Children with .reveal-child get a subtle stagger.
   */
  inView(
    ".reveal",
    ({ target }) => {
      const children = target.querySelectorAll(".reveal-child");
      if (children.length) {
        animate(
          target,
          { opacity: [0, 1] },
          { duration: 0.5, easing: "ease-out" }
        );
        animate(
          children,
          { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0)"] },
          { duration: 0.7, delay: stagger(0.08), easing: [0.2, 0.65, 0.3, 1] }
        );
      } else {
        animate(
          target,
          { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0)"] },
          { duration: 0.8, easing: [0.2, 0.65, 0.3, 1] }
        );
      }
    },
    { amount: 0.3 }
  );

  /* --- Stats counter ---
   * Elements with data-count="N" animate from 0 to N when visible.
   * Optional data-suffix="+" or "hr" is preserved.
   */
  inView(
    "[data-count]",
    ({ target }) => {
      const end = parseFloat(target.dataset.count);
      const suffix = target.dataset.suffix || "";
      const prefix = target.dataset.prefix || "";
      if (!isFinite(end)) return;
      const controls = animate(0, end, {
        duration: 1.6,
        easing: [0.22, 0.61, 0.36, 1],
        onUpdate(v) {
          target.textContent = prefix + Math.round(v) + suffix;
        },
      });
      return () => controls.stop();
    },
    { amount: 0.8 }
  );
}
