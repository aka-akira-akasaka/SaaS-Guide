// Fix: Declare chrome for environments where types are not automatically available.
declare const chrome: any;

import { useState, useEffect, useCallback } from 'react';

const API_KEY_STORAGE_KEY = 'gemini-api-key';

export const useApiKey = (): [string | null, (key: string) => void, boolean] => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get(API_KEY_STORAGE_KEY, (result) => {
        const storedKey = result[API_KEY_STORAGE_KEY];
        if (storedKey) {
          setApiKey(storedKey);
        }
        setIsLoading(false);
      });
    } else {
      console.warn('chrome.storage.sync is not available. API key will not be persisted.');
      setIsLoading(false);
    }
  }, []);

  const saveApiKey = useCallback((newApiKey: string) => {
     if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.set({ [API_KEY_STORAGE_KEY]: newApiKey }, () => {
          setApiKey(newApiKey);
          console.log('API Key saved.');
        });
     } else {
        console.warn('chrome.storage.sync is not available. API key is not being saved.');
        setApiKey(newApiKey);
     }
  }, []);

  return [apiKey, saveApiKey, isLoading];
};
