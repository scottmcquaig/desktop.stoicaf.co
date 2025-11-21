'use client';

import { ChatInterface } from '@/components/chadgpt/chat-interface';
import React from 'react';

const ChadGPTPage: React.FC = () => {
  return (
    <div className="flex h-full items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-2xl">
        <h1 className="mb-4 text-center text-2xl font-bold">Chat with ChadGPT</h1>
        <ChatInterface />
      </div>
    </div>
  );
};

export default ChadGPTPage;
