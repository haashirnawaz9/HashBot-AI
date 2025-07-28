"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}


function Chatbot() {
  const { user, isLoaded } = useUser();
  const userId = user?.id;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasLoadedInitialMessages = useRef(false);

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am HashBot, how can I help you today?' },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const prevMessagesLength = useRef(messages.length);

  // Load messages from localStorage only once
  useEffect(() => {
    if (!isLoaded || !userId || hasLoadedInitialMessages.current) return;

    const saved = localStorage.getItem(`chat-${userId}`);
    if (saved) {
      setMessages(JSON.parse(saved));
    }

    hasLoadedInitialMessages.current = true;
  }, [isLoaded, userId]);

  // Save messages to localStorage
  useEffect(() => {
    if (!isLoaded || !userId) return;
    localStorage.setItem(`chat-${userId}`, JSON.stringify(messages));
  }, [messages, isLoaded, userId]);

  const clearChat = () => {
    if (userId) {
      localStorage.removeItem(`chat-${userId}`);
    }
    setMessages([{ role: 'assistant', content: 'Hi! I am HashBot, how can I help you today?' }]);
  };  

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    const updatedMessages: Message[] = [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' }
    ];

    setMessages(updatedMessages);
    setMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader?.read() || { done: true, value: new Uint8Array() };
        if (done) break;
        const text = decoder.decode(value, { stream: true });

        setMessages(prev => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, content: last.content + text }];
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." }
      ]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    prevMessagesLength.current = messages.length;
  }, [messages]);

  useEffect(() => {
    document.title = "Chat | HashBot AI";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb] dark:bg-gray-900 transition-colors">
      <main className="flex-grow overflow-y-auto px-4 py-6 max-w-3xl mx-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className={`
              max-w-[110%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line shadow
              ${msg.role === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100'}
            `}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 max-w-3xl mx-auto px-4 py-3">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask HashBot..."
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <Button
            type="button"
            onClick={sendMessage}
            disabled={isLoading}
            variant='outline'
            className="rounded-lg px-4 py-2 cursor-pointer"
          >
            {isLoading ? '...' : 'Send'}
          </Button>
          <Button
            type="button"
            onClick={clearChat}
            className="rounded-lg px-4 py-2 cursor-pointer"
            >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
