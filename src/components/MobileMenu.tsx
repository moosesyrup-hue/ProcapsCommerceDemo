/**
 * Mobile Menu Component (Refactored)
 * 
 * Full-screen mobile navigation overlay with two-level menu system.
 * 
 * Architecture:
 * - Data: /data/mobileMenuData.ts - All menu content and configuration
 * - Hook: /hooks/useMobileMenu.ts - State management and scroll locking
 * - Icons: /components/icons/mobile/* - All icon components
 * - Subcomponents: /components/mobile-menu/* - Modular UI sections
 * 
 * Features:
 * - Two-level navigation (Main → Shop)
 * - Expandable sections with smooth animations
 * - Body scroll locking (iOS-compatible)
 * - Backdrop click-to-close
 * - Staggered item animations
 * - Responsive width (full-screen mobile, 480px sidebar on tablet+)
 * 
 * For Blazor Migration:
 * - Modal/overlay component with backdrop
 * - CSS animations translate to Blazor animations
 * - Body scroll locking requires JavaScript interop
 * - Two-level state management maps to Blazor component state
 */

import { motion, AnimatePresence } from 'motion/react';
import { useMobileMenu } from '../hooks/useMobileMenu';
import { 
  MobileMenuHeader, 
  MobileMenuMain, 
  MobileMenuShop, 
  MobileMenuAccount 
} from './mobile-menu';
import { animationConfig, layoutConfig } from '../data/mobileMenuData';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (category: string) => void;
  onIngredientsClick?: () => void;
  onOurStoryClick?: () => void;
  isLoggedIn?: boolean;
  userData?: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  onAccountClick?: () => void;
}

export default function MobileMenu({ 
  isOpen, 
  onClose, 
  onNavigate, 
  onIngredientsClick, 
  onOurStoryClick,
  isLoggedIn,
  userData,
  onAccountClick
}: MobileMenuProps) {
  // State management via custom hook
  const {
    menuLevel,
    expandedSection,
    handleShopClick,
    handleBackToMain,
    toggleSection,
    handleClose
  } = useMobileMenu({ isOpen, onClose });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationConfig.backdropDuration }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: animationConfig.menuPanelDuration }}
            className="fixed inset-0 m:inset-y-0 m:left-0 m:right-auto bg-white z-50 flex flex-col m:shadow-2xl"
            style={{ 
              width: window.innerWidth >= 768 ? layoutConfig.panelWidth : '90%' 
            }}
            data-name="mobile menu overlay"
          >
            {/* Scrollable Content Area */}
            <div 
              className={`flex-1 flex flex-col gap-[10px] items-start overflow-y-auto overflow-x-hidden ${
                menuLevel === 'shop' ? 'pb-[120px]' : 'pb-0'
              }`}
              style={{ padding: layoutConfig.contentPadding }}
            >
              {/* Header with Logo/Breadcrumb and Close Button */}
              <MobileMenuHeader
                menuLevel={menuLevel}
                onBackToMain={handleBackToMain}
                onClose={handleClose}
              />

              {/* Main Menu Level */}
              {menuLevel === 'main' && (
                <MobileMenuMain
                  onShopClick={handleShopClick}
                  onOurStoryClick={onOurStoryClick}
                />
              )}

              {/* Shop Menu Level */}
              {menuLevel === 'shop' && (
                <MobileMenuShop
                  expandedSection={expandedSection}
                  onToggleSection={toggleSection}
                  onNavigate={onNavigate}
                  onIngredientsClick={onIngredientsClick}
                  onClose={handleClose}
                />
              )}
            </div>

            {/* Account Section - Only shown on main menu */}
            {menuLevel === 'main' && (
              <MobileMenuAccount
                isLoggedIn={isLoggedIn || false}
                userData={userData}
                onAccountClick={() => {
                  handleClose();
                  onAccountClick?.();
                }}
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}