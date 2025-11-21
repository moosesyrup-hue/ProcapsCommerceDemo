import React from 'react';
import { ConversationState } from '../../types/chat';
import { Sparkles, Heart, Brain, Zap, Shield, Bone, Moon, Leaf, RefreshCw } from 'lucide-react';

interface ChatSidebarProps {
  conversationState: ConversationState;
  onSuggestedPrompt: (prompt: string) => void;
  onStartOver: () => void;
}

const suggestedPrompts = [
  {
    icon: Zap,
    label: "I'm always tired",
    prompt: "I'm struggling with constant fatigue and low energy. What supplements might help?",
  },
  {
    icon: Moon,
    label: "Sleep issues",
    prompt: "I have trouble falling asleep and staying asleep. Can you recommend something?",
  },
  {
    icon: Heart,
    label: "Heart health",
    prompt: "I want to support my cardiovascular health. What do you suggest?",
  },
  {
    icon: Brain,
    label: "Brain fog",
    prompt: "I'm experiencing brain fog and memory issues. What can help with mental clarity?",
  },
  {
    icon: Bone,
    label: "Joint pain",
    prompt: "My joints are stiff and uncomfortable, especially in the morning. What helps?",
  },
  {
    icon: Shield,
    label: "Immune support",
    prompt: "I want to strengthen my immune system. What supplements do you recommend?",
  },
  {
    icon: Leaf,
    label: "General wellness",
    prompt: "I don't take any supplements yet. Where should I start for overall health?",
  },
];

export function ChatSidebar({ conversationState, onSuggestedPrompt, onStartOver }: ChatSidebarProps) {
  return (
    <div className="w-96 bg-white border-r border-[#e8e4d8] flex flex-col">
      {/* Andrew's Profile */}
      <div className="p-8 border-b border-[#e8e4d8]">
        <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#009296] to-[#007a7d] mb-6 overflow-hidden flex items-center justify-center text-white text-6xl">
          AL
        </div>
        
        <h2 className="text-[#003b3c] text-xl mb-2">Andrew Lessman</h2>
        <p className="text-[#666666] text-sm mb-6 leading-relaxed">
          Vitamin formulator and founder of ProCaps Labs with over 40 years of experience creating premium supplements.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-[#f5f1e8] rounded-xl">
          <div className="text-center">
            <div className="text-lg text-[#009296]">40+</div>
            <div className="text-xs text-[#666666]">Years</div>
          </div>
          <div className="text-center">
            <div className="text-lg text-[#009296]">500+</div>
            <div className="text-xs text-[#666666]">Products</div>
          </div>
          <div className="text-center">
            <div className="text-lg text-[#009296]">10M+</div>
            <div className="text-xs text-[#666666]">Customers</div>
          </div>
        </div>
      </div>
      
      {/* Suggested Questions */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-[#009296]" />
          <h3 className="text-[#003b3c]">Common Questions</h3>
        </div>
        
        <div className="space-y-3">
          {suggestedPrompts.map((item, index) => (
            <button
              key={index}
              onClick={() => onSuggestedPrompt(item.prompt)}
              className="w-full text-left p-4 rounded-xl border-2 border-[#e8e4d8] hover:border-[#009296] hover:bg-[#f5f1e8] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-[#003b3c] group-hover:text-[#009296] transition-colors">
                  {item.label}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Start Over */}
      {conversationState.userTags.length > 0 && (
        <div className="p-8 border-t border-[#e8e4d8]">
          <button
            onClick={onStartOver}
            className="w-full px-6 py-3 border-2 border-[#009296] text-[#009296] rounded-xl hover:bg-[#009296] hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Start New Conversation</span>
          </button>
        </div>
      )}
    </div>
  );
}
