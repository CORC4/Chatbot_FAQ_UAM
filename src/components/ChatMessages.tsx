import React from 'react';
import { ChatMessage } from './ChatMessage';
import type { Message } from '../types/chat';

interface ChatMessagesProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function ChatMessages({ messages, messagesEndRef }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <ChatMessage 
          key={index}
          message={message.text}
          isBot={message.isBot}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}