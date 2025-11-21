import React from 'react';
import { ConversationInterfaceOptimized } from './FindMySupplements/ConversationInterfaceOptimized';
import { X } from 'lucide-react';

export default function FindMySupplementsPageOptimized() {
  const handleBackToShopping = () => {
    window.location.href = '/';
  };
  
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Compact Header - Only 64px */}
      <header className="h-16 border-b border-[#e8e4d8] px-6 flex items-center justify-between flex-shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center text-white text-sm">
            AL
          </div>
          <div>
            <h1 className="text-[#003b3c] text-[18px] leading-tight">Find My Supplements</h1>
            <p className="text-xs text-[#999999]">with Andrew Lessman</p>
          </div>
        </div>
        
        <button
          onClick={handleBackToShopping}
          className="w-10 h-10 flex items-center justify-center text-[#666666] hover:text-[#009296] hover:bg-[#f5f5f5] rounded-lg transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </header>
      
      {/* Main Content - Takes remaining height */}
      <div className="flex-1 overflow-hidden">
        <ConversationInterfaceOptimized />
      </div>
    </div>
  );
}
