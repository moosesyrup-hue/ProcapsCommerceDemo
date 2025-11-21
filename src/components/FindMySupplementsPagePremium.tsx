import React from 'react';
import { ConversationInterfacePremium } from './FindMySupplements/ConversationInterfacePremium';
import { ArrowLeft, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function FindMySupplementsPagePremium() {
  const handleBackToShopping = () => {
    window.location.href = '/';
  };
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Premium Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="bg-white border-b border-[#e8e4d8] px-8 py-6 flex items-center justify-between"
      >
        <button
          onClick={handleBackToShopping}
          className="flex items-center gap-2 text-[#666666] hover:text-[#009296] transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-[#003b3c] text-[24px] mb-1">Find My Supplements</h1>
          <p className="text-sm text-[#666666]">
            Personalized recommendations from Andrew Lessman
          </p>
        </div>
        
        <button
          onClick={handleBackToShopping}
          className="w-10 h-10 flex items-center justify-center text-[#666666] hover:text-[#009296] hover:bg-[#f5f5f5] rounded-xl transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </motion.header>
      
      {/* Main Content - Full Height */}
      <div className="flex-1 overflow-hidden">
        <ConversationInterfacePremium />
      </div>
      
      {/* Footer disclaimer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-[#f5f5f5] border-t border-[#e8e4d8] px-8 py-4"
      >
        <p className="text-xs text-[#999999] text-center max-w-4xl mx-auto leading-relaxed">
          This personalized recommendation tool is based on Andrew Lessman's 40+ years of experience formulating vitamins and supplements. These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. For specific medical advice, please consult your healthcare provider.
        </p>
      </motion.footer>
    </div>
  );
}
