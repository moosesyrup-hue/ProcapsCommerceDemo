import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-[#666666]">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-[#666666]">
          {Math.round(progress)}% complete
        </span>
      </div>
      
      <div className="w-full h-2 bg-[#e8e4d8] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#009296] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
