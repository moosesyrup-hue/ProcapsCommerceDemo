import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex gap-4 justify-start">
      {/* Andrew's Avatar */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center text-white flex-shrink-0">
        AL
      </div>
      
      {/* Typing Animation */}
      <div className="bg-white border border-[#e8e4d8] px-6 py-4 rounded-2xl">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-[#009296] animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-[#009296] animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-[#009296] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
