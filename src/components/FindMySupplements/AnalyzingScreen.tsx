import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface AnalyzingScreenProps {
  answers: Record<string, string[]>;
}

const analyzingSteps = [
  'Reviewing your health goals...',
  'Analyzing your lifestyle factors...',
  'Cross-referencing clinical research...',
  'Selecting optimal formulations...',
  'Building your personalized protocol...',
];

export function AnalyzingScreen({ answers }: AnalyzingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev < analyzingSteps.length - 1 ? prev + 1 : prev));
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#fafafa] to-[#f5f1e8] px-4 sm:px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Icon */}
        <div className="mb-8 sm:mb-12 flex justify-center">
          <div className="relative">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-[#009296]/20 animate-ping" />
            
            {/* Middle Ring */}
            <div className="absolute inset-2 rounded-full border-4 border-[#009296]/40 animate-pulse" />
            
            {/* Inner Circle */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center">
              <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-white animate-pulse" />
            </div>
          </div>
        </div>
        
        {/* Title */}
        <h2 className="text-[#003b3c] text-2xl sm:text-3xl md:text-4xl mb-6">
          Creating Your Protocol
        </h2>
        
        {/* Steps */}
        <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
          {analyzingSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 sm:gap-4 justify-center transition-all duration-300 ${
                index <= currentStep ? 'opacity-100' : 'opacity-30'
              }`}
            >
              {index < currentStep ? (
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#009296] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : index === currentStep ? (
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#009296] flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#009296] animate-pulse" />
                </div>
              ) : (
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#e8e4d8] flex-shrink-0" />
              )}
              
              <span className={`text-sm sm:text-base md:text-lg ${
                index <= currentStep ? 'text-[#003b3c]' : 'text-[#999999]'
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="h-2 bg-[#e8e4d8] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#009296] to-[#007a7d] rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / analyzingSteps.length) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Subtext */}
        <p className="text-[#999999] text-sm sm:text-base mt-6 sm:mt-8">
          This will only take a moment...
        </p>
      </div>
    </div>
  );
}