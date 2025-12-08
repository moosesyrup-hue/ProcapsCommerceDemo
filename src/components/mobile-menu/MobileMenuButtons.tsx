/**
 * Mobile Menu Buttons Component
 * 
 * Displays Register and Sign In buttons at the bottom of the main menu.
 */

import { motion } from 'motion/react';
import { menuButtons, animationConfig } from '../../data/mobileMenuData';

interface MobileMenuButtonsProps {
  onRegister?: () => void;
  onSignIn?: () => void;
}

export default function MobileMenuButtons({
  onRegister,
  onSignIn
}: MobileMenuButtonsProps) {
  const handleButtonClick = (action: string) => {
    if (action === 'register') {
      onRegister?.();
    } else if (action === 'signin') {
      onSignIn?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: animationConfig.buttonsDelay, 
        duration: animationConfig.itemStagger.duration 
      }}
      className="content-stretch flex gap-[10px] items-start p-[20px] pb-[20px] pt-0 sticky bottom-0 bg-white menu-buttons"
      data-name="buttons"
    >
      {menuButtons.map((button) => (
        <div
          key={button.id}
          className={`
            box-border content-stretch flex gap-[10px] h-[50px] items-center justify-center 
            px-[39px] py-[15px] relative rounded-[999px] shrink-0 cursor-pointer 
            hover:opacity-90 transition-opacity
            ${button.variant === 'primary' 
              ? 'bg-[#009296]' 
              : 'bg-[#d9efef]'
            }
          `}
          onClick={() => handleButtonClick(button.action)}
        >
          <p className={`
            font-['Inter:Medium',sans-serif] font-medium leading-[1.8] not-italic 
            relative shrink-0 text-[16px] text-center text-nowrap tracking-[-0.16px] whitespace-pre
            ${button.variant === 'primary' 
              ? 'text-white' 
              : 'text-[#003b3c]'
            }
          `}>
            {button.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}
