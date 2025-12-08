import { useState, useEffect } from 'react';

export type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

interface BreakpointConfig {
  mobile: number;
  tablet: number;
  desktop: number;
  xlDesktop: number;
  hdDesktop: number;
}

const defaultBreakpoints: BreakpointConfig = {
  mobile: 768,
  tablet: 768,
  desktop: 1280,
  xlDesktop: 1440,
  hdDesktop: 1920,
};

export function useBreakpoint(config: BreakpointConfig = defaultBreakpoints) {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('M');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= config.hdDesktop) {
        setBreakpoint('HD');
      } else if (width >= config.xlDesktop) {
        setBreakpoint('XL');
      } else if (width >= config.desktop) {
        setBreakpoint('L');
      } else if (width >= config.tablet) {
        setBreakpoint('M');
      } else {
        setBreakpoint('S');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, [config]);

  // Helper computed values
  const isMobileTablet = breakpoint === 'S' || breakpoint === 'M';
  const isDesktop = breakpoint === 'L' || breakpoint === 'XL' || breakpoint === 'HD';

  return {
    breakpoint,
    isMobileTablet,
    isDesktop,
  };
}
