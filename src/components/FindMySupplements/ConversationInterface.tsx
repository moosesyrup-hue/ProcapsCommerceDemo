import React, { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { QuickReplyButtons } from './QuickReplyButtons';
import { RecommendationDisplay } from './RecommendationDisplay';
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

export function ConversationInterface() {
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
    <div className="h-full flex">
      {/* LEFT SIDE: Conversation - 50% width */}
      <div className="w-1/2 flex flex-col border-r border-[#e8e4d8]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-12 py-8">
          {/* Progress indicator */}
          {currentNode.progressStep && currentNode.totalSteps && !showRecommendations && (
            <div className="mb-8 pb-6 border-b border-[#e8e4d8]">
              <div className="flex items-center justify-between text-sm text-[#999999] mb-3">
                <span>Step {currentNode.progressStep} of {currentNode.totalSteps}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="h-2 bg-[#e8e4d8] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#009296] to-[#007a7d] rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          
          {/* Messages */}
          {messages.map(msg => (
            <MessageBubble
              key={msg.id}
              sender={msg.sender}
              message={msg.message}
              detail={msg.detail}
            />
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center text-white flex-shrink-0">
                <span>AL</span>
              </div>
              <div className="flex-1">
                <div className="inline-block bg-[#f5f5f5] rounded-2xl px-6 py-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#999999] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-[#999999] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-[#999999] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area - Sticky at bottom of left panel */}
        {!showRecommendations && (
          <div className="flex-shrink-0 border-t border-[#e8e4d8] bg-white px-12 py-6">
            {/* Quick reply buttons */}
            {currentNode.options && currentNode.options.length > 0 && (
              <div className="mb-4">
                <QuickReplyButtons
                  options={currentNode.options}
                  onSelect={handleOptionSelect}
                />
              </div>
            )}
            
            {/* Free text input */}
            {currentNode.allowFreeText && (
              <>
                {currentNode.options && currentNode.options.length > 0 && (
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 h-px bg-[#e8e4d8]" />
                    <span className="text-sm text-[#999999]">or type your own</span>
                    <div className="flex-1 h-px bg-[#e8e4d8]" />
                  </div>
                )}
                <form onSubmit={handleFreeTextSubmit}>
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={freeTextInput}
                      onChange={(e) => setFreeTextInput(e.target.value)}
                      placeholder={currentNode.freeTextPlaceholder || "Type your message..."}
                      className="w-full px-6 py-4 pr-14 border-2 border-[#e8e4d8] rounded-xl focus:outline-none focus:border-[#009296] transition-colors text-[#003b3c] placeholder:text-[#999999] bg-white"
                    />
                    <button
                      type="submit"
                      disabled={!freeTextInput.trim()}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-gradient-to-br from-[#009296] to-[#007a7d] text-white flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}
      </div>
      
      {/* RIGHT SIDE: Context/Recommendations - 50% width */}
      <div className="w-1/2 flex flex-col bg-[#fafafa]">
        <div className="flex-1 overflow-y-auto px-12 py-8">
          {!showRecommendations ? (
            /* Context Panel - Before recommendations */
            <div>
              {/* Andrew's Profile Card */}
              <div className="bg-white rounded-2xl p-8 border border-[#e8e4d8] mb-6">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center text-white text-2xl flex-shrink-0">
                    AL
                  </div>
                  <div>
                    <h3 className="text-[#003b3c] text-xl mb-2">Andrew Lessman</h3>
                    <p className="text-[#666666] leading-relaxed">
                      Founder of ProCaps Laboratories with over 40 years of experience creating premium vitamin formulations
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#e8e4d8]">
                  <div className="text-center">
                    <div className="text-[#009296] text-2xl mb-1">40+</div>
                    <div className="text-[#999999] text-sm">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#009296] text-2xl mb-1">500+</div>
                    <div className="text-[#999999] text-sm">Formulations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#009296] text-2xl mb-1">10M+</div>
                    <div className="text-[#999999] text-sm">Customers</div>
                  </div>
                </div>
              </div>
              
              {/* Why This Process */}
              <div className="bg-white rounded-2xl p-8 border border-[#e8e4d8]">
                <h3 className="text-[#003b3c] text-lg mb-4">Why This Personalized Approach?</h3>
                <div className="space-y-4 text-[#666666] leading-relaxed">
                  <p>
                    Not everyone needs the same supplements. Your health goals, lifestyle, and specific concerns are unique to you.
                  </p>
                  <p>
                    By understanding what you're looking to achieve, I can recommend the specific formulations that will work best for your individual needs.
                  </p>
                  <p>
                    This takes just a few minutes and ensures you're not wasting money on supplements you don't need.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Recommendations Display */
            <RecommendationDisplay
              recommendations={recommendations}
              onAddToCart={handleAddToCart}
              onAddAllToCart={handleAddAllToCart}
              onStartOver={handleStartOver}
            />
          )}
        </div>
      </div>
    </div>
  );
}
