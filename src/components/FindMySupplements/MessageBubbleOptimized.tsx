import React from 'react';

interface MessageBubbleOptimizedProps {
  sender: 'andrew' | 'user';
  message: string;
  detail?: string;
}

export function MessageBubbleOptimized({ sender, message, detail }: MessageBubbleOptimizedProps) {
  const isAndrew = sender === 'andrew';
  
  return (
    <div className={`flex gap-3 mb-6 ${isAndrew ? 'justify-start' : 'justify-end'}`}>
      {/* Andrew's avatar */}
      {isAndrew && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center text-white text-sm">
          AL
        </div>
      )}
      
      {/* Message content - Reduced padding for better vertical space usage */}
      <div className={`flex-1 max-w-[85%] ${isAndrew ? '' : 'flex justify-end'}`}>
        <div
          className={`rounded-2xl px-5 py-3 shadow-sm ${
            isAndrew
              ? 'bg-white border border-[#e8e4d8] text-[#003b3c]'
              : 'bg-gradient-to-br from-[#009296] to-[#007a7d] text-white'
          }`}
        >
          <p className="leading-relaxed">{message}</p>
          {detail && (
            <p className="mt-3 leading-relaxed opacity-90 pt-3 border-t border-current/10">
              {detail}
            </p>
          )}
        </div>
      </div>
      
      {/* User's avatar */}
      {!isAndrew && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#003b3c] flex items-center justify-center text-white text-sm">
          You
        </div>
      )}
    </div>
  );
}
