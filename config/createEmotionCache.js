import createCache from "@emotion/cache";

const isBrowserEnvironment = typeof document !== "undefined";

export default function createEmotionCache() {
  let insertionPointElement;

  if (isBrowserEnvironment) {
    insertionPointElement = document.querySelector(
      'meta[name="emotion-insertion-point"]'
    );
  }

  return createCache({
    key: "css",
    insertionPoint: insertionPointElement,
  });
}

