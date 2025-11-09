import React from 'react';
import type { ModelId } from '../types';
import { AVAILABLE_MODELS } from '../types';

interface ModelSelectorProps {
  selectedModel: ModelId;
  onModelChange: (modelId: ModelId) => void;
  disabled: boolean;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange, disabled }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="model-select" className="text-sm font-medium text-gray-600 dark:text-gray-300">
        Model:
      </label>
      <select
        id="model-select"
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value as ModelId)}
        disabled={disabled}
        className="block w-full pl-3 pr-8 py-1.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md bg-gray-50 dark:bg-gray-700 text-sm"
        aria-label="Select AI Model"
      >
        {AVAILABLE_MODELS.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelector;
