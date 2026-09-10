const AD_SELECTORS = [
  "ins.adsbygoogle",
  '[id*="google_ads"]',
  '[class*="ad-container"]',
  '[id*="div-gpt-ad"]',
  '[class*="taboola"]',
  '[class*="outbrain"]',
  '[class*="advertisement"]',
];

function hideAdElements() {
  const elements = document.querySelectorAll(AD_SELECTORS.join(","));
  elements.forEach((el) => {
    el.style.setProperty("display", "none", "important");
    el.style.setProperty("height", "0", "important");
  });
}
hideAdElements();
const observer = new MutationObserver(hideAdElements);
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});
