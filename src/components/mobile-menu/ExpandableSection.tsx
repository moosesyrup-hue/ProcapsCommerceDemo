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
import { Package, Heart, Zap, ShieldCheck } from 'lucide-react';
import { getIconForItem } from '../../utils/shopMenuIcons';

interface ExpandableSectionProps {
  id: ExpandedSection;
  title: string;
  items: string[];
  isExpanded: boolean;
  onToggle: () => void;
  onItemClick?: (item: string) => void;
  customIndex?: number;
  icon?: string;
}

// Map icon names to components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Package,
  Heart,
  Zap,
  ShieldCheck
};

export default function ExpandableSection({
  id,
  title,
  items,
  isExpanded,
  onToggle,
  onItemClick,
  customIndex = 0,
  icon
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

  // Get icon component
  const IconComponent = icon ? iconMap[icon] : null;

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
        className="content-stretch flex items-center justify-between relative shrink-0 w-full cursor-pointer gap-3"
        onClick={onToggle}
      >
        {/* Icon + Title */}
        <div className="flex items-center gap-3 flex-1">
          {IconComponent && (
            <div className="shrink-0 size-[24px] text-[#009296]">
              <IconComponent className="size-full" />
            </div>
          )}
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic text-[#003b3c] text-[26px] tracking-[-0.52px]">
            {title}
          </p>
        </div>
        
        {/* +/- Icon */}
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
            <div className="flex flex-col gap-[6px] pb-[30px] pt-[24px]">
              {items.map((item, index) => {
                const ItemIcon = getIconForItem(item);
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    onClick={() => onItemClick?.(item)}
                    className="flex items-center gap-[10px] text-left group cursor-pointer"
                  >
                    {/* Icon with background */}
                    <div className="p-[6px] rounded-[6px] bg-[#F5F9F9] group-active:bg-[#009296] transition-colors shrink-0">
                      <ItemIcon className="w-[16px] h-[16px] text-[#009296] group-active:text-white transition-colors" />
                    </div>
                    {/* Item text */}
                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[#003b3c] text-[16px] leading-[1.6] group-active:text-[#009296] transition-colors">
                      {item}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}