/**
 * Expandable Section Component
 * 
 * Reusable component for expandable menu sections (Categories, Body Parts, etc.)
 * Features smooth expand/collapse animation and item click handling.
 */

import { motion, AnimatePresence } from 'motion/react';
import { AddIcon, MinusIcon } from '../icons/mobile';
import { animationConfig } from '../../data/mobileMenuData';
import type { ExpandedSection } from '../../hooks/useMobileMenu';

interface ExpandableSectionProps {
  id: ExpandedSection;
  title: string;
  items: string[];
  isExpanded: boolean;
  onToggle: () => void;
  onItemClick?: (item: string) => void;
  customIndex?: number;
}

export default function ExpandableSection({
  id,
  title,
  items,
  isExpanded,
  onToggle,
  onItemClick,
  customIndex = 0
}: ExpandableSectionProps) {
  // Animation variants for the section header
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: customIndex * animationConfig.itemStagger.delay,
        duration: animationConfig.itemStagger.duration,
        ease: animationConfig.itemStagger.ease
      }
    }
  };

  return (
    <motion.div
      custom={customIndex}
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
    >
      {/* Section Header */}
      <div 
        className="content-stretch flex items-center justify-between relative shrink-0 w-full cursor-pointer"
        onClick={onToggle}
      >
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic text-[#003b3c] text-[24px] text-nowrap tracking-[-0.48px] whitespace-pre">
          {title}
        </p>
        {isExpanded ? <MinusIcon /> : <AddIcon />}
      </div>
      
      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={animationConfig.sectionExpand}
            className="overflow-hidden w-full"
          >
            <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center pb-[30px] pt-[10px] px-0 relative shrink-0 w-full">
              <div className="font-['Inter:Regular',sans-serif] font-normal leading-[2] not-italic relative shrink-0 text-[#003b3c] text-[16px] w-full">
                {items.map((item, index) => (
                  <p 
                    key={index} 
                    className="mb-0 cursor-pointer hover:opacity-70 transition-opacity"
                    onClick={() => onItemClick?.(item)}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
