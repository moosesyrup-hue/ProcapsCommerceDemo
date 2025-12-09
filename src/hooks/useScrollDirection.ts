import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    // Initialize with current scroll position
    setPrevScrollY(window.scrollY);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only update if scrolled more than 10px to avoid jitter
      if (Math.abs(currentScrollY - prevScrollY) < 10) {
        return;
      }

      if (currentScrollY > prevScrollY) {
        // Scrolling down
        setScrollDirection('down');
      } else {
        // Scrolling up
        setScrollDirection('up');
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  return scrollDirection;
}