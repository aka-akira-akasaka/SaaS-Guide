
import React from 'react';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 p-4">
      <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-4 rounded-full mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Welcome to SaaS AI Guide</h2>
      <p className="mt-2 max-w-sm">
        I can see what you see. Ask me anything about the current page, like "How do I add a new user?" or "What does this button do?".
      </p>
      <p className="mt-4 text-sm font-medium">
        Type your question below and I'll analyze a screenshot of your active tab to help you.
      </p>
    </div>
  );
};

export default WelcomeScreen;
   