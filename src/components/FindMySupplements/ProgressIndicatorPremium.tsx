import React from 'react';
import { motion } from 'motion/react';

interface ProgressIndicatorPremiumProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicatorPremium({ currentStep, totalSteps }: ProgressIndicatorPremiumProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-[#666666]">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-[#009296]">
          {Math.round(progress)}% complete
        </span>
      </div>
      
      <div className="relative w-full h-1.5 bg-[#e8e4d8] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#009296] to-[#007a7d] rounded-full"
        />
        
        {/* Shimmer effect */}
        <motion.div
          animate={{ x: ['0%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index < currentStep
                ? 'bg-[#009296] scale-100'
                : 'bg-[#e8e4d8] scale-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
