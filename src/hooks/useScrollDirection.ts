import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only update if scrolled more than 10px to avoid jitter
      if (Math.abs(currentScrollY - prevScrollY) < 10) {
        return;
      }

      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold
        setScrollDirection('down');
      } else {
        // Scrolling up or at top
        setScrollDirection('up');
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  return scrollDirection;
}
