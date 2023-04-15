export default function waitToElement(targetSelector: string) {
  return new Promise((resolve) => {
    if (document.querySelector(targetSelector)) {
      return resolve(document.querySelector(targetSelector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(targetSelector)) {
        resolve(document.querySelector(targetSelector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
