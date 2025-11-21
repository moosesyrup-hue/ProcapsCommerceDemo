// Homepage Component - Integrating all breakpoints (S, M, L, XL, HD)
import { useState, useEffect } from 'react';
import SHomepage from "../imports/S-51-6025";
import MHomepage from "../imports/M-51-6021";
import LHomepage from "../imports/L-51-5445";
import XlHomepage from "../imports/Xl-51-5437";
import HdHomepage from "../imports/Hd-51-5441";

interface HomepageProps {
  onFindSupplementsClick?: () => void;
}

export default function Homepage({ onFindSupplementsClick }: HomepageProps) {
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
    <div className="w-full overflow-hidden relative">
      {/* Demo Button - Floating CTA to test Find My Supplements - Hidden for demo */}
      {/* {onFindSupplementsClick && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={onFindSupplementsClick}
            className="group relative bg-gradient-to-br from-[#009296] to-[#007a7d] text-white px-8 py-4 rounded-2xl shadow-2xl hover:shadow-[#009296]/30 transition-all duration-300 hover:scale-105 flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            
            <span className="relative text-[18px]">✨ Find My Supplements</span>
          </button>
        </div>
      )} */}
      
      {breakpoint === 'S' && <SHomepage />}
      {breakpoint === 'M' && <MHomepage />}
      {breakpoint === 'L' && <LHomepage />}
      {breakpoint === 'XL' && <XlHomepage />}
      {breakpoint === 'HD' && <HdHomepage />}
    </div>
  );
}