// Homepage Component - Integrating all breakpoints (S, M, L, XL, HD)
import { useState, useEffect } from 'react';
import SHomepage from "../imports/S-51-6025";
import MHomepage from "../imports/M-51-6021";
import LHomepage from "../imports/L-51-5445";
import XlHomepage from "../imports/Xl-51-5437";
import HdHomepage from "../imports/Hd-51-5441";

export default function Homepage() {
  const [breakpoint, setBreakpoint] = useState<'S' | 'M' | 'L' | 'XL' | 'HD'>('M');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      let newBreakpoint: 'S' | 'M' | 'L' | 'XL' | 'HD';
      
      if (width >= 1920) {
        newBreakpoint = 'HD';
      } else if (width >= 1440) {
        newBreakpoint = 'XL';
      } else if (width >= 1280) {
        newBreakpoint = 'L';
      } else if (width >= 768) {
        newBreakpoint = 'M';
      } else {
        newBreakpoint = 'S';
      }
      
      console.log('Homepage breakpoint:', { width, breakpoint: newBreakpoint });
      setBreakpoint(newBreakpoint);
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {breakpoint === 'S' && <SHomepage />}
      {breakpoint === 'M' && <MHomepage />}
      {breakpoint === 'L' && <LHomepage />}
      {breakpoint === 'XL' && <XlHomepage />}
      {breakpoint === 'HD' && <HdHomepage />}
    </div>
  );
}