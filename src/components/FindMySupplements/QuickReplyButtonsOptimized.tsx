import React from 'react';

interface Option {
  text: string;
  nextNodeId: string;
  tags?: string[];
}

interface QuickReplyButtonsOptimizedProps {
  options: Option[];
  onSelect: (option: Option) => void;
}

export function QuickReplyButtonsOptimized({ options, onSelect }: QuickReplyButtonsOptimizedProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option)}
          className="group px-4 py-3 rounded-xl border-2 border-[#e8e4d8] bg-white text-[#003b3c] hover:border-[#009296] hover:bg-[#009296] hover:text-white transition-all duration-200 text-left flex items-center justify-between"
        >
          <span className="flex-1">{option.text}</span>
          <svg 
            className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      ))}
    </div>
  );
}
