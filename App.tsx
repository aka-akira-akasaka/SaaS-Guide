import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import type { ChatMessage as ChatMessageType } from './types';
import { Role } from './types';
import { getAiResponse } from './services/geminiService';
import { captureVisibleTab } from './utils/screenshot';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import WelcomeScreen from './components/WelcomeScreen';
import { useModelSelection } from './hooks/useModelSelection';
import ModelSelector from './components/ModelSelector';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel, isModelLoading] = useModelSelection();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = useCallback(async (prompt: string) => {
    if (!prompt.trim() || isModelLoading) return;

    setIsLoading(true);
    const userMessage: ChatMessageType = {
      role: Role.USER,
      text: prompt,
      screenshot: null,
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const screenshotDataUrl = await captureVisibleTab();

      setMessages(prev => prev.map((msg, index) =>
        index === prev.length - 1 ? { ...msg, screenshot: screenshotDataUrl } : msg
      ));
      
      const mimeType = screenshotDataUrl.split(';')[0].split(':')[1];
      const base64Data = screenshotDataUrl.split(',')[1];
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const responseText = await getAiResponse(ai, prompt, base64Data, mimeType, selectedModel);

      const modelMessage: ChatMessageType = {
        role: Role.MODEL,
        text: responseText,
      };
      setMessages(prev => [...prev, modelMessage]);

    } catch (error) {
      console.error("Error processing request:", error);
      let errorMessage = "An unexpected error occurred. Please check the console for details.";
      if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
          errorMessage = "The configured API key is invalid. Please contact the administrator.";
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }
      const errorMessageObj: ChatMessageType = {
        role: Role.MODEL,
        text: errorMessage,
        isError: true,
      };
      setMessages(prev => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedModel, isModelLoading]);

  return (
    <div className="flex flex-col h-screen font-sans bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <header className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 bg-white dark:bg-gray-800 z-10">
        <h1 className="text-lg font-bold text-gray-800 dark:text-white pl-2">SaaS AI Guide</h1>
        <ModelSelector
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          disabled={isLoading || isModelLoading}
        />
      </header>
      <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          messages.map((msg, index) => <ChatMessage key={index} message={msg} />)
        )}
        {isLoading && <ChatMessage message={{ role: Role.MODEL, text: 'Thinking...' }} isLoading={true} />}
      </main>
      <footer className="p-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky bottom-0">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};

export default App;