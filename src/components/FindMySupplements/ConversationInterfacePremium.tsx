import React, { useState, useRef, useEffect } from 'react';
import { MessageBubblePremium } from './MessageBubblePremium';
import { QuickReplyButtonsPremium } from './QuickReplyButtonsPremium';
import { ProgressIndicatorPremium } from './ProgressIndicatorPremium';
import { RecommendationDisplayPremium } from './RecommendationDisplayPremium';
import { getNodeById, getStartNode, ConversationNode } from '../../data/conversation-flow';
import { matchUserInput } from '../../lib/nlp-matcher';
import { getRecommendations } from '../../lib/recommendation-engine';
import { Send, Sparkles } from 'lucide-react';

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

export function ConversationInterfacePremium() {
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
    }, 600);
  }, []);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
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
        }, 800);
      }
    }, 1200);
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
      }, 1200);
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
      }, 1200);
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
    }, 400);
  };
  
  const recommendations = showRecommendations
    ? getRecommendations(userProfile, currentNode.recommendationLogic)
    : [];
  
  return (
    <div className="flex h-full">
      {/* LEFT: Conversation Panel */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Progress indicator */}
        {currentNode.progressStep && currentNode.totalSteps && !showRecommendations && (
          <div className="px-8 pt-8 pb-4">
            <ProgressIndicatorPremium
              currentStep={currentNode.progressStep}
              totalSteps={currentNode.totalSteps}
            />
          </div>
        )}
        
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-3xl mx-auto">
            {messages.map(msg => (
              <MessageBubblePremium
                key={msg.id}
                sender={msg.sender}
                message={msg.message}
                detail={msg.detail}
              />
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center text-white shadow-lg">
                  <span className="text-sm">AL</span>
                </div>
                <div className="bg-[#f5f5f5] rounded-3xl px-6 py-4">
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
              <div className="mt-8">
                <RecommendationDisplayPremium
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
        
        {/* Input area */}
        {!showRecommendations && (
          <div className="border-t border-[#e8e4d8] bg-white">
            <div className="max-w-3xl mx-auto px-8 py-6">
              {/* Free text input (if allowed) */}
              {currentNode.allowFreeText && (
                <form onSubmit={handleFreeTextSubmit} className="mb-4">
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={freeTextInput}
                      onChange={(e) => setFreeTextInput(e.target.value)}
                      placeholder={currentNode.freeTextPlaceholder || "Share what's on your mind..."}
                      className="w-full px-6 py-4 pr-14 border-2 border-[#e8e4d8] rounded-2xl focus:outline-none focus:border-[#009296] transition-colors text-[#003b3c] placeholder:text-[#999999]"
                    />
                    <button
                      type="submit"
                      disabled={!freeTextInput.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-to-br from-[#009296] to-[#007a7d] text-white flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              )}
              
              {/* Quick reply options */}
              {currentNode.options && currentNode.options.length > 0 && (
                <div>
                  {currentNode.allowFreeText && (
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1 h-px bg-[#e8e4d8]" />
                      <span className="text-sm text-[#999999]">or choose below</span>
                      <div className="flex-1 h-px bg-[#e8e4d8]" />
                    </div>
                  )}
                  <QuickReplyButtonsPremium
                    options={currentNode.options}
                    onSelect={handleOptionSelect}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* RIGHT: Context Panel */}
      <div className="w-[480px] bg-gradient-to-br from-[#f5f1e8] to-[#e8e4d8] p-12 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#009296] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#003b3c] opacity-5 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center">
          {/* Andrew's presence */}
          <div className="mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center text-white shadow-2xl mx-auto mb-6">
              <span className="text-4xl">AL</span>
            </div>
            <h3 className="text-[#003b3c] mb-2">Andrew Lessman</h3>
            <p className="text-[#666666]">Vitamin Formulator</p>
          </div>
          
          {/* Stats/Trust elements */}
          <div className="space-y-4 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-[32px] text-[#009296] mb-1">40+</div>
              <div className="text-sm text-[#666666]">Years of Experience</div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-[32px] text-[#009296] mb-1">500+</div>
              <div className="text-sm text-[#666666]">Unique Formulations</div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-[32px] text-[#009296] mb-1">100%</div>
              <div className="text-sm text-[#666666]">Quality Guaranteed</div>
            </div>
          </div>
          
          {/* Tagline */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <Sparkles className="w-6 h-6 text-[#009296] mx-auto mb-3" />
            <p className="text-sm text-[#666666] leading-relaxed italic">
              "I've dedicated my life to creating the most effective supplements possible. Let me help you find exactly what you need."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
