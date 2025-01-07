import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ChatInput({ input, setInput, onSubmit }: ChatInputProps) {
  return (
    <form 
      onSubmit={onSubmit}
      className="p-4 border-t border-gray-200 bg-white rounded-b-lg"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta aquí..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-red-800"
        />
        <button
          type="submit"
          className="bg-red-800 text-white rounded-lg px-4 py-2 hover:bg-red-900"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}