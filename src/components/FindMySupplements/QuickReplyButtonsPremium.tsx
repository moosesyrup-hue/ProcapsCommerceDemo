import React from 'react';
import { motion } from 'motion/react';

interface Option {
  text: string;
  nextNodeId: string;
  tags?: string[];
}

interface QuickReplyButtonsPremiumProps {
  options: Option[];
  onSelect: (option: Option) => void;
}

export function QuickReplyButtonsPremium({ options, onSelect }: QuickReplyButtonsPremiumProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {options.map((option, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
          onClick={() => onSelect(option)}
          className="group relative px-6 py-4 rounded-2xl border-2 border-[#e8e4d8] text-left text-[#003b3c] hover:border-[#009296] hover:bg-[#009296]/5 transition-all duration-200 overflow-hidden"
        >
          {/* Hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#009296]/0 via-[#009296]/5 to-[#009296]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          
          {/* Text */}
          <span className="relative block">{option.text}</span>
          
          {/* Arrow indicator */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="#009296" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
