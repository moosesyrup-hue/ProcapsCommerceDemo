/**
 * Mobile Menu Header Component
 * 
 * Displays logo (main level) or breadcrumb (shop level) with close button.
 * Includes animated transition between states.
 */

import { motion, AnimatePresence } from 'motion/react';
import { CloseIcon, ChevronRightIcon, MobileMenuLogo } from '../icons/mobile';
import { textContent, animationConfig } from '../../data/mobileMenuData';
import type { MenuLevel } from '../../hooks/useMobileMenu';

interface MobileMenuHeaderProps {
  menuLevel: MenuLevel;
  onBackToMain: () => void;
  onClose: () => void;
}

export default function MobileMenuHeader({ 
  menuLevel, 
  onBackToMain, 
  onClose 
}: MobileMenuHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full mb-[30px]">
      {/* Logo / Breadcrumb Container */}
      <div className="relative h-[40px] w-[109.074px]">
        <AnimatePresence mode="wait">
          {menuLevel === 'main' ? (
            // Logo (Main Menu)
            <motion.div
              key="logo"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={animationConfig.headerTransition}
              className="absolute inset-0"
            >
              <MobileMenuLogo />
            </motion.div>
          ) : (
            // Breadcrumb (Shop Menu)
            <motion.div
              key="breadcrumb"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={animationConfig.headerTransition}
              className="absolute inset-0 flex gap-[14px] items-center cursor-pointer"
              onClick={onBackToMain}
              aria-label={textContent.ariaLabels.backToMain}
            >
              <div className="flex items-center justify-center">
                <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                  <ChevronRightIcon />
                </div>
              </div>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.2] not-italic text-[#003b3c] text-[16px] text-nowrap tracking-[-0.16px] whitespace-pre">
                {textContent.breadcrumb.back}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="text-[#003B3C] hover:opacity-70 transition-opacity"
        aria-label={textContent.ariaLabels.closeMenu}
      >
        <CloseIcon />
      </button>
    </div>
  );
}
