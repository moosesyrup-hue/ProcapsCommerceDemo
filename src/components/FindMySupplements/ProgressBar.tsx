import React from 'react';

interface ProgressBarProps {
  progress: number;
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ progress, currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e8e4d8]">
      <div className="px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-[#003b3c]">
              Question <span className="text-[#009296]">{currentStep}</span> of {totalSteps}
            </div>
            <div className="text-sm text-[#999999]">
              {Math.round(progress)}% Complete
            </div>
          </div>
          
          <div className="h-2 bg-[#e8e4d8] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#009296] to-[#007a7d] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
