import React from 'react';

interface Option {
  text: string;
  nextNodeId: string;
  tags?: string[];
}

interface QuickReplyButtonsProps {
  options: Option[];
  onSelect: (option: Option) => void;
}

export function QuickReplyButtons({ options, onSelect }: QuickReplyButtonsProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option)}
          className="group px-6 py-4 bg-white border-2 border-[#e8e4d8] rounded-xl text-[#003b3c] hover:border-[#009296] hover:bg-[#009296] hover:text-white transition-all text-left flex items-center justify-between"
        >
          <span>{option.text}</span>
          <svg 
            className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-3" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      ))}
    </div>
  );
}
