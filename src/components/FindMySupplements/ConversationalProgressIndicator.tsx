import React from 'react';
import { motion } from 'motion/react';

interface ConversationalProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ConversationalProgressIndicator({
  currentStep,
  totalSteps,
}: ConversationalProgressIndicatorProps) {
  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50">
      <div className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm px-3 sm:px-5 py-2 sm:py-3 rounded-full border border-[#e8e4d8] shadow-lg">
        <span className="text-xs sm:text-sm text-[#666666]">
          <span className="hidden sm:inline">Question </span>{currentStep} of {totalSteps}
        </span>
        
        {/* Dot Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8 }}
              animate={{
                scale: index < currentStep ? 1 : 0.8,
                opacity: index < currentStep ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
              className={`
                w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full
                ${index < currentStep ? 'bg-[#009296]' : 'bg-[#e8e4d8]'}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
