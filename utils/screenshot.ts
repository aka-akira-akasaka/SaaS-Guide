// Fix: Declare chrome for environments where types are not automatically available.
declare const chrome: any;

/**
 * Captures the visible area of the currently active tab.
 * This function is intended to be used within a Chrome extension.
 * @returns A Promise that resolves with a data URL of the screenshot.
 */
export const captureVisibleTab = (): Promise<string> => {
  if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.captureVisibleTab) {
    return new Promise((resolve, reject) => {
      chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(dataUrl);
        }
      });
    });
  } else {
    console.warn("chrome.tabs.captureVisibleTab is not available. Using placeholder image.");
    return imageToBase64(`https://picsum.photos/800/600?random=${Date.now()}`);
  }
};

/**
 * Fetches an image from a URL and converts it to a base64 data URL.
 * Useful for creating placeholder screenshots in a non-extension environment.
 * @param url The URL of the image to fetch.
 * @returns A Promise that resolves with the base64 data URL.
 */
export const imageToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
