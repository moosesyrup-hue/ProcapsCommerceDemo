import React from 'react';
import { Message } from '../../types/chat';
import { ProductCard } from './ProductCard';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Andrew's Avatar - Only for assistant messages */}
      {!isUser && (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center text-white flex-shrink-0">
          AL
        </div>
      )}
      
      {/* Message Content */}
      <div className={`flex-1 max-w-3xl ${isUser ? 'flex justify-end' : ''}`}>
        <div className="space-y-4">
          {/* Text Bubble */}
          <div
            className={`px-6 py-4 rounded-2xl ${
              isUser
                ? 'bg-gradient-to-r from-[#009296] to-[#007a7d] text-white ml-auto'
                : 'bg-white border border-[#e8e4d8] text-[#003b3c]'
            }`}
            style={{ maxWidth: isUser ? '80%' : '100%' }}
          >
            <div className="whitespace-pre-wrap leading-relaxed">
              {message.content}
            </div>
          </div>
          
          {/* Product Recommendations - Only for assistant messages */}
          {!isUser && message.products && message.products.length > 0 && (
            <div className="space-y-4">
              {message.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          {/* Timestamp */}
          <div className={`text-xs text-[#999999] px-2 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
      
      {/* User Avatar Placeholder - Just for spacing */}
      {isUser && (
        <div className="w-12 h-12 rounded-full bg-[#e8e4d8] flex items-center justify-center text-[#666666] flex-shrink-0">
          You
        </div>
      )}
    </div>
  );
}
