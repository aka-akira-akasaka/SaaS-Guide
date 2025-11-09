// Fix: Declare chrome for environments where types are not automatically available.
declare const chrome: any;

import { useState, useEffect, useCallback } from 'react';
import { AVAILABLE_MODELS, type ModelId } from '../types';

const MODEL_STORAGE_KEY = 'saas-guide-selected-model';
const DEFAULT_MODEL = AVAILABLE_MODELS[0].id;

export const useModelSelection = (): [ModelId, (modelId: ModelId) => void, boolean] => {
  const [selectedModel, setSelectedModel] = useState<ModelId>(DEFAULT_MODEL);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get(MODEL_STORAGE_KEY, (result) => {
        const storedModel = result[MODEL_STORAGE_KEY];
        if (storedModel && AVAILABLE_MODELS.some(m => m.id === storedModel)) {
          setSelectedModel(storedModel as ModelId);
        }
        setIsLoading(false);
      });
    } else {
      console.warn('chrome.storage.sync is not available. Model selection will not be persisted.');
      setIsLoading(false);
    }
  }, []);

  const saveSelectedModel = useCallback((newModelId: ModelId) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.set({ [MODEL_STORAGE_KEY]: newModelId }, () => {
        setSelectedModel(newModelId);
      });
    } else {
      console.warn('chrome.storage.sync is not available. Model selection is not being saved.');
      setSelectedModel(newModelId);
    }
  }, []);

  return [selectedModel, saveSelectedModel, isLoading];
};
