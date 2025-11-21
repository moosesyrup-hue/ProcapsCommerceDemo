import React, { useState, useRef, useEffect } from 'react';
import { ChatSidebar } from './AndrewAIChat/ChatSidebar';
import { ChatConversation } from './AndrewAIChat/ChatConversation';
import { ChatInput } from './AndrewAIChat/ChatInput';
import { Message, ConversationState } from '../types/chat';
import { processUserMessage } from '../lib/chat-processor';

export default function AndrewAIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Andrew Lessman. I've spent over 40 years formulating premium vitamins and supplements, and I'm here to help you find exactly what you need.\n\nWhether you're dealing with fatigue, looking to support your heart health, or simply want to optimize your wellness - I can guide you to the right supplements backed by science and real results.\n\nWhat brings you here today?",
      timestamp: new Date(),
    },
  ]);
  
  const [conversationState, setConversationState] = useState<ConversationState>({
    userTags: [],
    recommendedProducts: [],
    currentTopic: null,
  });
  
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  
  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate processing delay
    setTimeout(async () => {
      const response = await processUserMessage(content, conversationState);
      
      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
        products: response.products,
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setConversationState(response.newState);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };
  
  const handleSuggestedPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };
  
  const handleStartOver = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Let's start fresh. What would you like to focus on today?",
        timestamp: new Date(),
      },
    ]);
    setConversationState({
      userTags: [],
      recommendedProducts: [],
      currentTopic: null,
    });
  };
  
  return (
    <div className="h-screen flex bg-gradient-to-br from-white via-[#fafafa] to-[#f5f1e8]">
      {/* Left Sidebar - Andrew's Context */}
      <ChatSidebar 
        conversationState={conversationState}
        onSuggestedPrompt={handleSuggestedPrompt}
        onStartOver={handleStartOver}
      />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-[#e8e4d8] px-8 py-6">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center text-white text-xl">
                AL
              </div>
              <div>
                <h1 className="text-[#003b3c] text-2xl">Chat with Andrew Lessman</h1>
                <p className="text-[#666666]">Your personal supplement advisor powered by AI</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#00ff00] animate-pulse" />
              <span className="text-sm text-[#666666]">Online</span>
            </div>
          </div>
        </div>
        
        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="max-w-5xl mx-auto">
            <ChatConversation 
              messages={messages}
              isTyping={isTyping}
            />
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input Area */}
        <div className="bg-white border-t border-[#e8e4d8] px-8 py-6">
          <div className="max-w-5xl mx-auto">
            <ChatInput 
              onSendMessage={handleSendMessage}
              disabled={isTyping}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
