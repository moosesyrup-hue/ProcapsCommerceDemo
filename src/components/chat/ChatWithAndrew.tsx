import { X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatOptions from './ChatOptions';
import ChatTypingIndicator from './ChatTypingIndicator';
import ChatResults from './ChatResults';
import ChatIntro from './ChatIntro';
import ChatStartButton from './ChatStartButton';
import andrewAvatar from "figma:asset/dc03ce14c468b809b3b5450c8c3da25788a57c15.png";
import { getUserPurchaseHistory, getUserProductNames } from '../../data/purchaseHistory';

interface ChatWithAndrewProps {
  isOpen: boolean;
  onClose: () => void;
  hideHeader?: boolean; // New prop to hide header for full-page layout
  onResultsReady?: (userData: UserData) => void; // Callback when results are ready
}

export type UserData = {
  goal?: string;
  age?: string;
  activity?: string;
  supplements?: string;
  concerns?: string;
};

type ConversationStep = 
  | 'welcome'
  | 'goal'
  | 'age'
  | 'activity'
  | 'supplements'
  | 'concerns'
  | 'processing'
  | 'results';

interface Message {
  id: string;
  type: 'andrew' | 'user';
  content: string;
  timestamp: Date;
}

export default function ChatWithAndrew({ isOpen, onClose, hideHeader, onResultsReady }: ChatWithAndrewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<ConversationStep>('welcome');
  const [userData, setUserData] = useState<UserData>({});
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // Track if consultation has started
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Check if user is authenticated and get their purchase history
  // Re-read from localStorage every time component renders to get latest auth state
  const userEmail = localStorage.getItem('userEmail');
  const isAuthenticated = !!userEmail;
  const purchasedProducts = isAuthenticated ? getUserProductNames(userEmail) : [];
  const hasPurchaseHistory = purchasedProducts.length > 0;

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize conversation when opened - reset when reopened
  useEffect(() => {
    if (isOpen && messages.length === 0 && currentStep === 'welcome') {
      // Start with welcome message
      setTimeout(() => {
        addAndrewMessage(
          "Hi, I'm Andrew Lessman\n\n**Vitamin pioneer with over 40 years of research.** I've helped millions of people find the right supplements for their unique needs.\n\nI'll ask you a few quick questions about your health goals and lifestyle—then provide personalized recommendations based on what works together, not just what sells.\n\nTakes about 2 minutes. No obligation to buy anything."
        );
      }, 300);
    }
  }, [isOpen, currentStep]);

  const addAndrewMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'andrew',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleResponse = (value: string, label: string) => {
    // Immediately hide options and show typing
    setIsTyping(true);
    
    // Add user's choice to messages
    addUserMessage(label);

    // Update user data based on current step
    const updatedData = { ...userData };
    
    switch (currentStep) {
      case 'goal':
        updatedData.goal = value;
        setUserData(updatedData);
        // Immediately transition to 'welcome' to prevent options from re-appearing
        setCurrentStep('welcome');
        
        // Transition to next step after typing delay
        setTimeout(() => {
          setIsTyping(false);
          addAndrewMessage(`Great! ${label} is something I'm passionate about. Let me ask you a few quick questions so I can give you the best recommendations...`);
          
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              addAndrewMessage("What's your age range?");
              setCurrentStep('age');
            }, 800);
          }, 1200);
        }, 1000);
        break;

      case 'age':
        updatedData.age = value;
        setUserData(updatedData);
        setCurrentStep('welcome');
        
        setTimeout(() => {
          setIsTyping(false);
          addAndrewMessage("How would you describe your activity level?");
          setCurrentStep('activity');
        }, 800);
        break;

      case 'activity':
        updatedData.activity = value;
        setUserData(updatedData);
        setCurrentStep('welcome');
        
        setTimeout(() => {
          setIsTyping(false);
          addAndrewMessage("Do you currently take any supplements?");
          setCurrentStep('supplements');
        }, 800);
        break;

      case 'supplements':
        updatedData.supplements = value;
        setUserData(updatedData);
        setCurrentStep('welcome');
        
        setTimeout(() => {
          setIsTyping(false);
          addAndrewMessage("Perfect! Let me put together some personalized recommendations for you...");
          
          // Show typing indicator before results
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              setCurrentStep('results');
              if (onResultsReady) {
                onResultsReady(updatedData);
              }
            }, 1000);
          }, 800);
        }, 800);
        break;
    }
  };

  const handleStartOver = () => {
    setMessages([]);
    setUserData({});
    setCurrentStep('welcome');
    setHasStarted(false); // Reset consultation start status
  };

  const handleBeginConsultation = () => {
    // Show typing indicator
    setIsTyping(true);
    
    // After a delay, show personalized greeting if user has purchase history
    setTimeout(() => {
      setIsTyping(false);
      
      // Personalized greeting for returning customers with purchase history
      if (hasPurchaseHistory && purchasedProducts.length > 0) {
        const productList = purchasedProducts.length === 1 
          ? `**${purchasedProducts[0]}**`
          : purchasedProducts.length === 2
          ? `**${purchasedProducts[0]}** and **${purchasedProducts[1]}**`
          : `**${purchasedProducts.slice(0, -1).join('**, **')}**, and **${purchasedProducts[purchasedProducts.length - 1]}**`;
        
        addAndrewMessage(`Good to see you again! I see you're already using my ${productList} — that's wonderful!\n\nLet me help you find what else might support your health goals. I'll keep in mind what you're already taking to make sure everything works together perfectly.`);
      } else {
        addAndrewMessage("What brings you here today?");
      }
      
      // Show next message after delay
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addAndrewMessage("What brings you here today?");
          setCurrentStep('goal');
          setHasStarted(true);
        }, 800);
      }, 1500);
    }, 1000);
  };

  if (!isOpen) return null;

  // Full-page mode (no backdrop, no side tray)
  if (hideHeader) {
    return (
      <div className="flex flex-col h-full">
        {/* Show Intro Screen */}
        {currentStep === 'intro' && (
          <ChatIntro onBegin={handleBeginConsultation} />
        )}

        {/* Messages Container */}
        {currentStep !== 'intro' && (
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 bg-white"
          >
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                type={message.type}
                content={message.content}
              />
            ))}

            {isTyping && <ChatTypingIndicator />}

            {/* Start Button for welcome step */}
            {!isTyping && !hasStarted && currentStep === 'welcome' && messages.length > 0 && (
              <ChatStartButton onStart={handleBeginConsultation} />
            )}

            {/* Options based on current step */}
            {!isTyping && currentStep === 'goal' && (
              <ChatOptions
                options={[
                  { value: 'energy', label: 'I want to feel more energized', icon: '⚡' },
                  { value: 'brain', label: 'I want to support my brain health', icon: '🧠' },
                  { value: 'heart', label: 'I want to support my heart health', icon: '❤️' },
                  { value: 'joints', label: 'I want to support my joints', icon: '🦴' },
                  { value: 'immune', label: 'I want to boost my immune system', icon: '💪' },
                  { value: 'stress', label: 'I want to manage stress better', icon: '😌' },
                  { value: 'sleep', label: 'I want to sleep better', icon: '💤' },
                  { value: 'wellness', label: 'I want overall wellness', icon: '🌟' },
                ]}
                onSelect={handleResponse}
              />
            )}

            {!isTyping && currentStep === 'age' && (
              <ChatOptions
                options={[
                  { value: 'under-30', label: 'Under 30' },
                  { value: '30-50', label: '30-50' },
                  { value: '50-65', label: '50-65' },
                  { value: '65+', label: '65+' },
                ]}
                onSelect={handleResponse}
              />
            )}

            {!isTyping && currentStep === 'activity' && (
              <ChatOptions
                options={[
                  { value: 'very-active', label: 'Very active (exercise 5+ times/week)' },
                  { value: 'moderately-active', label: 'Moderately active (exercise 2-4 times/week)' },
                  { value: 'lightly-active', label: 'Lightly active (exercise 1-2 times/week)' },
                  { value: 'sedentary', label: 'Sedentary (little to no exercise)' },
                ]}
                onSelect={handleResponse}
              />
            )}

            {!isTyping && currentStep === 'supplements' && (
              <ChatOptions
                options={[
                  { value: 'none', label: 'None - I\'m just getting started' },
                  { value: 'few', label: 'A few (1-3 supplements)' },
                  { value: 'several', label: 'Several (4+ supplements)' },
                ]}
                onSelect={handleResponse}
              />
            )}

            {currentStep === 'results' && (
              <ChatResults userData={userData} onStartOver={handleStartOver} />
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    );
  }

  // Side tray mode (original behavior)
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Side Tray */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[560px] bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-[#D9E2E2]">
            <div className="flex items-center gap-3">
              <div className="w-[45px] h-[45px] rounded-full bg-[#F7F2EC] flex items-center justify-center overflow-hidden">
                <img 
                  src={andrewAvatar} 
                  alt="Andrew Lessman"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-[#003b3c] font-['STIX_Two_Text',sans-serif] sm:text-2xl" style={{ fontWeight: 500 }}>Chat with Andrew</h2>
                <p className="text-[12px] sm:text-sm text-[#003b3c]/60">Get Personalized Recommendations</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F7F2EC] transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5 text-[#003b3c]" />
            </button>
          </div>
        )}

        {/* Messages Container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F6F2EC]"
        >
          {/* Show Intro Screen */}
          {currentStep === 'intro' && (
            <ChatIntro onBegin={handleBeginConsultation} />
          )}

          {/* Chat Messages and Options */}
          {currentStep !== 'intro' && (
            <>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  type={message.type}
                  content={message.content}
                />
              ))}

              {isTyping && <ChatTypingIndicator />}

              {/* Start Button for welcome step */}
              {!isTyping && !hasStarted && currentStep === 'welcome' && messages.length > 0 && (
                <ChatStartButton onStart={handleBeginConsultation} />
              )}

              {/* Options based on current step */}
              {!isTyping && currentStep === 'goal' && (
                <ChatOptions
                  options={[
                    { value: 'energy', label: 'I want to feel more energized', icon: '⚡' },
                    { value: 'brain', label: 'I want to support my brain health', icon: '🧠' },
                    { value: 'heart', label: 'I want to support my heart health', icon: '❤️' },
                    { value: 'joints', label: 'I want to support my joints', icon: '🦴' },
                    { value: 'immune', label: 'I want to boost my immune system', icon: '💪' },
                    { value: 'stress', label: 'I want to manage stress better', icon: '😌' },
                    { value: 'sleep', label: 'I want to sleep better', icon: '💤' },
                    { value: 'wellness', label: 'I want overall wellness', icon: '🌟' },
                  ]}
                  onSelect={handleResponse}
                />
              )}

              {!isTyping && currentStep === 'age' && (
                <ChatOptions
                  options={[
                    { value: 'under-30', label: 'Under 30' },
                    { value: '30-50', label: '30-50' },
                    { value: '50-65', label: '50-65' },
                    { value: '65+', label: '65+' },
                  ]}
                  onSelect={handleResponse}
                />
              )}

              {!isTyping && currentStep === 'activity' && (
                <ChatOptions
                  options={[
                    { value: 'very-active', label: 'Very active (exercise 5+ times/week)' },
                    { value: 'moderately-active', label: 'Moderately active (exercise 2-4 times/week)' },
                    { value: 'lightly-active', label: 'Lightly active (exercise 1-2 times/week)' },
                    { value: 'sedentary', label: 'Sedentary (little to no exercise)' },
                  ]}
                  onSelect={handleResponse}
                />
              )}

              {!isTyping && currentStep === 'supplements' && (
                <ChatOptions
                  options={[
                    { value: 'none', label: 'None - I\'m just getting started' },
                    { value: 'few', label: 'A few (1-3 supplements)' },
                    { value: 'several', label: 'Several (4+ supplements)' },
                  ]}
                  onSelect={handleResponse}
                />
              )}

              {currentStep === 'results' && (
                <ChatResults userData={userData} onStartOver={handleStartOver} />
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>
    </>
  );
}