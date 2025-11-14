import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import svgPaths from "../imports/svg-vsxzdz3mbf";

// Icon Components
function GiftIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]">
      <div className="absolute inset-[10.42%_2.08%_6.25%_6.25%]">
        <div className="absolute inset-[-4.5%_-4.09%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
            <g>
              <path d="M4.91667 9.08333H2.41667" stroke="white" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d="M4.91667 13.25H4.08333" stroke="white" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d={svgPaths.p277d9de0} stroke="white" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d="M0.75 4.91667H4.91667" stroke="white" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d="M0.75 0.75H8.25V4.08333" stroke="white" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d={svgPaths.p2c5cae00} stroke="white" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d="M11.5833 6.58333V8.25H13.25" stroke="white" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <div className="relative shrink-0 size-[26px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g>
          <path d={svgPaths.p2d74cd80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M22.75 22.75L18.0375 18.0375" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function HeartIcon() {
  return (
    <div className="relative shrink-0 size-[26px]">
      <div className="absolute inset-[12.49%_8.33%_13.43%_8.33%]">
        <div className="absolute inset-[-3.89%_-3.46%_-5.62%_-3.46%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 22">
            <g>
              <path d={svgPaths.p3f83a9f1} stroke="white" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <div className="relative shrink-0 size-[26px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g>
          <path d={svgPaths.p9f6780} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a9b980} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function CartIcon() {
  return (
    <div className="relative shrink-0 size-[26px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g>
          <path d={svgPaths.pb88320} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p894b100} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p18c7e300} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

// Logo Component
function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="absolute left-1/2 top-[10px] -translate-x-1/2 hover:opacity-80 transition-opacity"
    >
      <div className="h-[40px] w-[109.045px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 38">
          <g>
            <path d={svgPaths.p25a86380} fill="white" />
            <path d={svgPaths.p20c71700} fill="white" />
            <path d={svgPaths.p23d24d80} fill="white" />
            <path d={svgPaths.p5ed1b80} fill="white" />
            <path d={svgPaths.p5733200} fill="white" />
            <path d={svgPaths.p2c85b100} fill="white" />
            <path d={svgPaths.p2a1d4000} fill="white" />
            <path d={svgPaths.p4324d00} fill="white" />
          </g>
        </svg>
      </div>
    </button>
  );
}

// Global Header Component
export default function GlobalHeader({ 
  onMenuClick, 
  onCartClick,
  onLogoClick,
  onSpecialsClick 
}: { 
  onMenuClick: () => void; 
  onCartClick: () => void;
  onLogoClick: () => void;
  onSpecialsClick: () => void;
}) {
  const [breakpoint, setBreakpoint] = useState<'S' | 'M' | 'L' | 'XL' | 'HD'>('M');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1920) {
        setBreakpoint('HD');
      } else if (width >= 1440) {
        setBreakpoint('XL');
      } else if (width >= 1280) {
        setBreakpoint('L');
      } else if (width >= 768) {
        setBreakpoint('M');
      } else {
        setBreakpoint('S');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  // S and M show mobile/tablet layout
  const isMobileTablet = breakpoint === 'S' || breakpoint === 'M';
  // L, XL, HD show desktop layout
  const isDesktop = breakpoint === 'L' || breakpoint === 'XL' || breakpoint === 'HD';

  return (
    <div className="bg-[#009296] relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="box-border flex flex-col gap-[15px] items-center px-[20px] md:px-[40px] py-[15px] relative w-full">
          {/* Free Shipping Banner */}
          <div className="flex flex-col gap-[15px] items-center relative shrink-0 w-full">
            <div className="flex flex-col gap-[13px] items-center relative shrink-0 w-full max-w-[1360px]">
              <div className="flex items-center justify-center relative shrink-0 gap-[14px]">
                <div>
                  <GiftIcon />
                </div>
                <div className="flex flex-col font-['Inter',sans-serif] justify-center text-center text-white">
                  <p className="text-[14px] leading-[24px] whitespace-nowrap">
                    {isMobileTablet && "FREE ground shipping on orders over $25"}
                    {isDesktop && (
                      <>
                        FREE ground shipping on orders over $25  -  <span className="underline">Details</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-0 relative shrink-0 w-full border-t border-[#0CA9AD]" />
          </div>

          {/* Navigation */}
          <div className="h-[62px] relative shrink-0 w-full">
            {/* Mobile/Tablet Menu Button */}
            {isMobileTablet && (
              <button 
                onClick={onMenuClick}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-white"
              >
                <Menu className="w-[26px] h-[26px]" />
              </button>
            )}

            {/* Desktop Categories */}
            {isDesktop && (
              <div className="flex absolute left-0 top-1/2 -translate-y-1/2 gap-[40px] items-center font-['Inter',sans-serif] font-medium text-[16px] text-white uppercase tracking-[1.6px]">
                <p className="cursor-pointer hover:opacity-80 transition-opacity">SHOP</p>
                <p className="cursor-pointer hover:opacity-80 transition-opacity">LEARN</p>
                <p className="cursor-pointer hover:opacity-80 transition-opacity">ABOUT</p>
                <p className="cursor-pointer hover:opacity-80 transition-opacity">HELP</p>
                <button onClick={onSpecialsClick} className="hover:opacity-80 transition-opacity">
                  <p>SPECIALS</p>
                </button>
              </div>
            )}

            {/* Logo */}
            <Logo onClick={onLogoClick} />

            {/* Icons */}
            <div className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center ${isDesktop ? 'gap-[30px]' : 'gap-[20px]'}`}>
              <SearchIcon />
              {/* Heart and User icons: hidden on S (mobile), shown on M/L/XL/HD (768px+) */}
              {!isMobileTablet && <HeartIcon />}
              {!isMobileTablet && <UserIcon />}
              {breakpoint === 'M' && (
                <>
                  <HeartIcon />
                  <UserIcon />
                </>
              )}
              <button onClick={onCartClick} className="hover:opacity-80 transition-opacity">
                <CartIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
