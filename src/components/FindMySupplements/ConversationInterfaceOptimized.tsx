import React, { useState, useRef, useEffect } from 'react';
import { MessageBubbleOptimized } from './MessageBubbleOptimized';
import { QuickReplyButtonsOptimized } from './QuickReplyButtonsOptimized';
import { RecommendationDisplayOptimized } from './RecommendationDisplayOptimized';
import { getNodeById, getStartNode, ConversationNode } from '../../data/conversation-flow';
import { matchUserInput } from '../../lib/nlp-matcher';
import { getRecommendations } from '../../lib/recommendation-engine';
import { Send } from 'lucide-react';

interface ConversationMessage {
  id: string;
  sender: 'andrew' | 'user';
  message: string;
  detail?: string;
  timestamp: Date;
}

interface UserProfile {
  tags: string[];
  responses: Record<string, string>;
}

export function ConversationInterfaceOptimized() {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [currentNode, setCurrentNode] = useState<ConversationNode>(getStartNode());
  const [userProfile, setUserProfile] = useState<UserProfile>({ tags: [], responses: {} });
  const [freeTextInput, setFreeTextInput] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Show Andrew's initial message
  useEffect(() => {
    const startNode = getStartNode();
    setTimeout(() => {
      setMessages([
        {
          id: '1',
          sender: 'andrew',
          message: startNode.message,
          detail: startNode.detail,
          timestamp: new Date(),
        },
      ]);
    }, 400);
  }, []);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  const handleOptionSelect = (option: { text: string; nextNodeId: string; tags?: string[] }) => {
    // Add user's response to messages
    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: option.text,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Update user profile with tags
    if (option.tags) {
      setUserProfile(prev => ({
        ...prev,
        tags: [...prev.tags, ...option.tags],
        responses: {
          ...prev.responses,
          [currentNode.id]: option.text,
        },
      }));
    }
    
    // Move to next node with typing indicator
    const nextNode = getNodeById(option.nextNodeId);
    if (!nextNode) return;
    
    setIsTyping(true);
    
    // Natural delay
    setTimeout(() => {
      setIsTyping(false);
      const andrewMessage: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'andrew',
        message: nextNode.message,
        detail: nextNode.detail,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, andrewMessage]);
      setCurrentNode(nextNode);
      
      // If this is a recommendation node, show recommendations
      if (nextNode.type === 'recommendation') {
        const updatedProfile = option.tags 
          ? { ...userProfile, tags: [...userProfile.tags, ...option.tags] }
          : userProfile;
        
        setTimeout(() => {
          setShowRecommendations(true);
        }, 600);
      }
    }, 800);
  };
  
  const handleFreeTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!freeTextInput.trim()) return;
    
    const userInput = freeTextInput.trim();
    
    // Add user's message
    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: userInput,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setFreeTextInput('');
    
    // Try to match input to a branch
    const match = matchUserInput(userInput);
    
    setIsTyping(true);
    
    if (match) {
      // Found a match - proceed to that branch
      setUserProfile(prev => ({
        ...prev,
        tags: [...prev.tags, ...match.tags],
        responses: {
          ...prev.responses,
          [currentNode.id]: userInput,
        },
      }));
      
      const nextNode = getNodeById(match.nextNodeId);
      if (!nextNode) return;
      
      setTimeout(() => {
        setIsTyping(false);
        const andrewMessage: ConversationMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'andrew',
          message: nextNode.message,
          detail: nextNode.detail,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, andrewMessage]);
        setCurrentNode(nextNode);
      }, 800);
    } else {
      // No match - show options
      setTimeout(() => {
        setIsTyping(false);
        const andrewMessage: ConversationMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'andrew',
          message: "I understand. Let me ask this a different way - which of these areas best describes what you're looking for help with?",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, andrewMessage]);
      }, 800);
    }
  };
  
  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
    alert('Product added to cart! (This would integrate with your cart system)');
  };
  
  const handleAddAllToCart = () => {
    console.log('Add all to cart');
    alert('Complete protocol added to cart! (This would integrate with your cart system)');
  };
  
  const handleStartOver = () => {
    setMessages([]);
    setUserProfile({ tags: [], responses: {} });
    setShowRecommendations(false);
    setCurrentNode(getStartNode());
    
    // Re-show initial message
    setTimeout(() => {
      const startNode = getStartNode();
      setMessages([
        {
          id: '1',
          sender: 'andrew',
          message: startNode.message,
          detail: startNode.detail,
          timestamp: new Date(),
        },
      ]);
    }, 300);
  };
  
  const recommendations = showRecommendations
    ? getRecommendations(userProfile, currentNode.recommendationLogic)
    : [];
  
  const progress = currentNode.progressStep && currentNode.totalSteps 
    ? (currentNode.progressStep / currentNode.totalSteps) * 100 
    : 0;
  
  return (
    <div className="h-full flex flex-col bg-[#fafafa]">
      {/* Compact Progress Bar - No extra space, just a thin line */}
      {currentNode.progressStep && currentNode.totalSteps && !showRecommendations && (
        <div className="h-1 bg-[#e8e4d8] flex-shrink-0">
          <div 
            className="h-full bg-gradient-to-r from-[#009296] to-[#007a7d] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      
      {/* Messages Area - Scrollable, centered, max-width for readability */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-6">
          {/* Progress indicator text - compact */}
          {currentNode.progressStep && currentNode.totalSteps && !showRecommendations && (
            <div className="flex items-center justify-between mb-4 text-xs text-[#999999]">
              <span>Question {currentNode.progressStep} of {currentNode.totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          )}
          
          {messages.map(msg => (
            <MessageBubbleOptimized
              key={msg.id}
              sender={msg.sender}
              message={msg.message}
              detail={msg.detail}
            />
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center text-white text-sm flex-shrink-0">
                AL
              </div>
              <div className="bg-white rounded-2xl px-5 py-3 shadow-sm border border-[#e8e4d8]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#999999] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-[#999999] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-[#999999] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          {/* Recommendations */}
          {showRecommendations && (
            <div className="mt-6">
              <RecommendationDisplayOptimized
                recommendations={recommendations}
                onAddToCart={handleAddToCart}
                onAddAllToCart={handleAddAllToCart}
                onStartOver={handleStartOver}
              />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area - STICKY at bottom, always visible */}
      {!showRecommendations && (
        <div className="flex-shrink-0 bg-white border-t border-[#e8e4d8] shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
          <div className="max-w-4xl mx-auto px-6 py-4">
            {/* Free text input (if allowed) */}
            {currentNode.allowFreeText && (
              <form onSubmit={handleFreeTextSubmit} className="mb-3">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={freeTextInput}
                    onChange={(e) => setFreeTextInput(e.target.value)}
                    placeholder={currentNode.freeTextPlaceholder || "Type your response..."}
                    className="w-full px-4 py-3 pr-12 border-2 border-[#e8e4d8] rounded-xl focus:outline-none focus:border-[#009296] transition-colors text-[#003b3c] placeholder:text-[#999999]"
                  />
                  <button
                    type="submit"
                    disabled={!freeTextInput.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-gradient-to-br from-[#009296] to-[#007a7d] text-white flex items-center justify-center hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
            
            {/* Quick reply options - Always visible, no scrolling needed */}
            {currentNode.options && currentNode.options.length > 0 && (
              <div>
                {currentNode.allowFreeText && (
                  <div className="text-xs text-center text-[#999999] mb-3">or choose below</div>
                )}
                <QuickReplyButtonsOptimized
                  options={currentNode.options}
                  onSelect={handleOptionSelect}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
