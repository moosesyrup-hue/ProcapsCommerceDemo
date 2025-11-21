import React from 'react';
import { Message } from '../../types/chat';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface ChatConversationProps {
  messages: Message[];
  isTyping: boolean;
}

export function ChatConversation({ messages, isTyping }: ChatConversationProps) {
  return (
    <div className="space-y-8">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      
      {isTyping && <TypingIndicator />}
    </div>
  );
}
