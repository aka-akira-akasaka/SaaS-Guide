
import React, { useState } from 'react';

interface ApiKeySetupProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7h2a2 2 0 012 2v10a2 2 0 01-2 2h-2m-6 0H7a2 2 0 01-2-2V9a2 2 0 012-2h2m4-4h.01M12 4h.01M12 20h.01M8 4h.01M8 20h.01M4 8h.01M20 8h.01M4 16h.01M20 16h.01M12 8v8" />
  </svg>
);

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onApiKeySubmit }) => {
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim().length < 10) { // Basic validation
      setError('Please enter a valid API key.');
      return;
    }
    setError('');
    onApiKeySubmit(inputKey.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
          <ApiKeyIcon />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Set Up Your API Key</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Please enter your Google Gemini API key to start using the guide. Your key is stored locally and never shared.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="api-key" className="sr-only">API Key</label>
              <input
                id="api-key"
                name="api-key"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your Gemini API Key"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
            >
              Save and Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiKeySetup;
   