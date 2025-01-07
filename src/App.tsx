import React, { useState, useRef, useEffect } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { findBestMatch } from './utils/chatbot';
import type { Message } from './types/chat';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "¡Hola! Soy el asistente virtual de la UAM Azcapotzalco. ¿En qué puedo ayudarte?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = findBestMatch(userMessage);
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <ChatHeader />
      <main className="flex-1 max-w-4xl w-full mx-auto p-4">
        <div className="bg-gray-50 rounded-lg shadow-lg h-[calc(100vh-12rem)] flex flex-col">
          <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />
          <ChatInput 
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
}

export default App;