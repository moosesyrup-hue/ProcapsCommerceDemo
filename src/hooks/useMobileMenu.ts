/**
 * useMobileMenu Hook
 * 
 * Manages mobile menu state, navigation levels, and body scroll locking.
 * 
 * Features:
 * - Menu level state (main vs shop)
 * - Expandable section state
 * - Body scroll locking with iOS support
 * - State reset on close
 * 
 * For Blazor Migration:
 * - Translate to a state management service
 * - Body scroll locking maps to JavaScript interop
 * - State management can use Blazor component state
 */

import { useState, useEffect } from 'react';

export type MenuLevel = 'main' | 'shop';
export type ExpandedSection = 'categories' | 'bodyPart' | 'bodyFunction' | 'healthIssues' | null;

interface UseMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UseMobileMenuReturn {
  menuLevel: MenuLevel;
  expandedSection: ExpandedSection;
  setMenuLevel: (level: MenuLevel) => void;
  setExpandedSection: (section: ExpandedSection) => void;
  handleShopClick: () => void;
  handleBackToMain: () => void;
  toggleSection: (section: ExpandedSection) => void;
  handleClose: () => void;
}

/**
 * Custom hook for mobile menu state management
 */
export function useMobileMenu({ isOpen, onClose }: UseMobileMenuProps): UseMobileMenuReturn {
  const [menuLevel, setMenuLevel] = useState<MenuLevel>('main');
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);

  // Lock body scroll when menu is open (with enhanced iOS support)
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      
      // Apply styles to lock scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  /**
   * Navigate to Shop menu level
   */
  const handleShopClick = () => {
    setMenuLevel('shop');
  };

  /**
   * Navigate back to main menu level
   */
  const handleBackToMain = () => {
    setMenuLevel('main');
    setExpandedSection(null);
  };

  /**
   * Toggle an expandable section (collapse if already open)
   */
  const toggleSection = (section: ExpandedSection) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  /**
   * Close menu and reset all state
   */
  const handleClose = () => {
    setMenuLevel('main');
    setExpandedSection(null);
    onClose();
  };

  return {
    menuLevel,
    expandedSection,
    setMenuLevel,
    setExpandedSection,
    handleShopClick,
    handleBackToMain,
    toggleSection,
    handleClose
  };
}
