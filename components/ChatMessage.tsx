
import React from 'react';
import type { ChatMessage as ChatMessageType } from '../types';
import { Role } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
  isLoading?: boolean;
}

const UserIcon = () => (
    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
        U
    </div>
);

const ModelIcon = () => (
    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
    </div>
);

const LoadingDots: React.FC = () => (
  <div className="flex space-x-1">
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
  </div>
);

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading = false }) => {
  const isUser = message.role === Role.USER;

  const containerClasses = `flex items-start gap-3 ${isUser ? 'justify-end' : ''}`;
  const bubbleClasses = `max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
    isUser
      ? 'bg-blue-500 text-white rounded-br-none'
      : message.isError 
      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700 rounded-bl-none'
      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
  }`;

  return (
    <div className={containerClasses}>
      {!isUser && <ModelIcon />}
      <div className="flex flex-col items-start">
        <div className={bubbleClasses}>
            {isLoading ? <LoadingDots /> : 
                <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
            }
        </div>
        {message.screenshot && (
            <div className="mt-2 ml-auto">
                <img src={message.screenshot} alt="Screenshot" className="w-32 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer hover:opacity-75 transition-opacity" onClick={() => window.open(message.screenshot, '_blank')} />
            </div>
        )}
      </div>
      {isUser && <UserIcon />}
    </div>
  );
};

export default ChatMessage;
   