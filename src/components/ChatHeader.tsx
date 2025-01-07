import React from 'react';

export function ChatHeader() {
  return (
    <header className="bg-red-800 text-white p-4">
      <div className="max-w-4xl mx-auto flex items-center gap-2">
        <img 
          src="https://e-continua.izt.uam.mx/wp-content/uploads/2024/03/UAM-logo.png" 
          alt="UAM Logo" 
          className="w-10 h-10 rounded"
        />
        <h1 className="text-xl font-bold">Asistente Virtual UAM Azcapotzalco</h1>
      </div>
    </header>
  );
}