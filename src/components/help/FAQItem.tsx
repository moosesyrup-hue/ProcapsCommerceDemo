import { Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';

interface FAQItemProps {
  question: string;
  answer: string;
  isExpanded: boolean;
  onToggle: () => void;
  showDivider: boolean;
  index: number;
}

export default function FAQItem({ 
  question, 
  answer, 
  isExpanded, 
  onToggle, 
  showDivider,
  index 
}: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.25, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-[20px] md:py-[24px] text-left group"
      >
        <span className="font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] md:text-[18px] lg:text-[20px] leading-[1.3] pr-[20px] group-hover:text-[#009296] transition-colors text-[20px]">
          {question}
        </span>
        {isExpanded ? (
          <Minus className="w-[20px] h-[20px] text-[#003b3c] flex-shrink-0" />
        ) : (
          <Plus className="w-[20px] h-[20px] text-[#003b3c] flex-shrink-0" />
        )}
      </button>

      {/* FAQ Answer */}
      {isExpanded && (
        <div className="pb-[24px] md:pb-[28px]">
          <p className="font-['Inter',sans-serif] text-[#003b3c] text-[15px] md:text-[16px] leading-[1.6] pr-[40px]">
            {answer}
          </p>
        </div>
      )}

      {/* Divider */}
      {showDivider && (
        <div className="w-full h-[1px] bg-[#D9E2E2]" />
      )}
    </motion.div>
  );
}
