import React from 'react';
import { motion } from 'motion/react';

interface MessageBubblePremiumProps {
  sender: 'andrew' | 'user';
  message: string;
  detail?: string;
}

export function MessageBubblePremium({ sender, message, detail }: MessageBubblePremiumProps) {
  const isAndrew = sender === 'andrew';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={`flex gap-4 mb-8 ${isAndrew ? 'justify-start' : 'justify-end'}`}
    >
      {/* Andrew's avatar */}
      {isAndrew && (
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center text-white shadow-lg">
          <span className="text-sm">AL</span>
        </div>
      )}
      
      {/* Message content */}
      <div className={`flex-1 max-w-[600px] ${isAndrew ? '' : 'flex justify-end'}`}>
        <div
          className={`rounded-3xl px-7 py-5 shadow-sm ${
            isAndrew
              ? 'bg-[#f5f5f5] text-[#003b3c]'
              : 'bg-gradient-to-br from-[#009296] to-[#007a7d] text-white shadow-lg'
          }`}
        >
          <p className="leading-relaxed mb-0">{message}</p>
          {detail && (
            <p className="mt-4 leading-relaxed opacity-90 pt-4 border-t border-current/10">
              {detail}
            </p>
          )}
        </div>
      </div>
      
      {/* User's avatar */}
      {!isAndrew && (
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#003b3c] flex items-center justify-center text-white shadow-lg">
          <span className="text-sm">You</span>
        </div>
      )}
    </motion.div>
  );
}
