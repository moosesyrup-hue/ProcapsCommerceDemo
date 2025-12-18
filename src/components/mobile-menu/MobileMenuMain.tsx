/**
 * Mobile Menu Main Level Component
 * 
 * Displays the main menu items with staggered animation.
 */

import { motion } from 'motion/react';
import { ChevronRightIcon } from '../icons/mobile';
import { mainMenuItems, animationConfig } from '../../data/mobileMenuData';

interface MobileMenuMainProps {
  onShopClick: () => void;
  onOurStoryClick?: () => void;
}

export default function MobileMenuMain({ 
  onShopClick,
  onOurStoryClick
}: MobileMenuMainProps) {
  // Animation variants for staggered menu items
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * animationConfig.itemStagger.delay,
        duration: animationConfig.itemStagger.duration,
        ease: animationConfig.itemStagger.ease
      }
    })
  };

  const handleItemClick = (action?: string) => {
    switch (action) {
      case 'shop':
        onShopClick();
        break;
      case 'our-story':
        onOurStoryClick?.();
        break;
      // Add other actions as needed
      default:
        break;
    }
  };

  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start w-full" data-name="menu">
      {mainMenuItems.map((item, index) => (
        <motion.div
          key={item.id}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="content-stretch flex items-center justify-between w-full cursor-pointer"
          onClick={() => handleItemClick(item.action)}
        >
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic text-[#003b3c] text-[24px] tracking-[-0.48px] w-full">
            {item.label}
          </p>
          {item.action === 'shop' && <ChevronRightIcon />}
        </motion.div>
      ))}
    </div>
  );
}