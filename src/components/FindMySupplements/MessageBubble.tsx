import React from 'react';

interface MessageBubbleProps {
  sender: 'andrew' | 'user';
  message: string;
  detail?: string;
}

export function MessageBubble({ sender, message, detail }: MessageBubbleProps) {
  const isAndrew = sender === 'andrew';
  
  return (
    <div className={`flex items-start gap-4 mb-8 ${isAndrew ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
        isAndrew 
          ? 'bg-gradient-to-br from-[#009296] to-[#007a7d] text-white' 
          : 'bg-[#003b3c] text-white'
      }`}>
        <span>{isAndrew ? 'AL' : 'You'}</span>
      </div>
      
      {/* Message Content */}
      <div className="flex-1">
        <div className={`${
          isAndrew 
            ? 'bg-[#f5f5f5] text-[#003b3c]' 
            : 'bg-gradient-to-br from-[#009296] to-[#007a7d] text-white'
        } rounded-2xl px-6 py-4`}>
          <p className="leading-relaxed">{message}</p>
          {detail && (
            <p className="mt-4 pt-4 border-t border-current/10 leading-relaxed opacity-90">
              {detail}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
