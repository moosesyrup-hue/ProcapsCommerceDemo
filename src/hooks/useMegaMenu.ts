import { useState, useRef, useEffect } from 'react';

interface UseMegaMenuOptions {
  openDelay?: number;
  closeDelay?: number;
}

export function useMegaMenu(options: UseMegaMenuOptions = {}) {
  const { openDelay = 200, closeDelay = 400 } = options;
  const [isOpen, setIsOpen] = useState(false);
  const openTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear all timers
  const clearTimers = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  // Open megamenu with delay
  const handleOpen = () => {
    clearTimers();
    openTimerRef.current = setTimeout(() => {
      setIsOpen(true);
    }, openDelay);
  };

  // Close megamenu with delay
  const handleClose = () => {
    clearTimers();
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, closeDelay);
  };

  // Cancel close timer when re-entering
  const handleEnter = () => {
    clearTimers();
    setIsOpen(true);
  };

  // Close megamenu immediately
  const handleCloseImmediate = () => {
    clearTimers();
    setIsOpen(false);
  };

  // Close megamenu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => clearTimers();
  }, []);

  return {
    isOpen,
    handleOpen,
    handleClose,
    handleEnter,
    handleCloseImmediate,
    clearTimers,
  };
}
