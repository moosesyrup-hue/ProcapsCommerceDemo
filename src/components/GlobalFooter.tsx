import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import svgPaths from "../imports/svg-vsxzdz3mbf";

interface GlobalFooterProps {
  onFAQClick?: () => void;
  onPrivacyPolicyClick?: () => void;
  onTermsOfUseClick?: () => void;
  onMyAccountClick?: () => void;
  onShippingReturnsClick?: () => void;
  onTrackOrderClick?: () => void;
}

export default function GlobalFooter({ onFAQClick, onPrivacyPolicyClick, onTermsOfUseClick, onMyAccountClick, onShippingReturnsClick, onTrackOrderClick }: GlobalFooterProps) {
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

  // S and M show mobile/tablet accordion layout
  const isMobileTablet = breakpoint === 'S' || breakpoint === 'M';
  // L, XL, HD show desktop column layout
  const isDesktop = breakpoint === 'L' || breakpoint === 'XL' || breakpoint === 'HD';

  // Determine padding and text sizes based on breakpoint
  const containerPadding = breakpoint === 'S' ? 'px-[20px]' : isDesktop ? 'px-[40px]' : 'px-[40px]';
  const verticalPadding = breakpoint === 'S' ? 'py-[40px]' : breakpoint === 'M' ? 'py-[60px]' : 'py-[80px]';
  
  // Footer headline sizes for each breakpoint
  let headlineSize = '';
  if (breakpoint === 'S') {
    headlineSize = 'text-[28px] tracking-[-0.56px]';
  } else if (breakpoint === 'M') {
    headlineSize = 'text-[38px] tracking-[-0.76px]';
  } else if (breakpoint === 'L') {
    headlineSize = 'text-[48px] tracking-[-0.96px]';
  } else if (breakpoint === 'XL') {
    headlineSize = 'text-[54px] tracking-[-1.08px]';
  } else {
    // HD
    headlineSize = 'text-[72px] tracking-[-1.44px]';
  }
  
  const headlineGap = breakpoint === 'S' ? 'gap-[40px]' : breakpoint === 'M' ? 'gap-[60px]' : 'gap-[70px]';
  const fdaPadding = breakpoint === 'S' || breakpoint === 'M' ? 'px-[10px]' : 'px-[139px]';
  const fdaTextSize = breakpoint === 'S' || breakpoint === 'M' ? 'text-[12px] leading-[1.4]' : 'text-[14px] leading-[1.8]';

  return (
    <div className="bg-gradient-to-b from-[#009296] from-50% to-[#00b4ae] to-[196.83%] relative shrink-0 w-full">
      <div className={`box-border flex gap-[10px] items-start ${containerPadding} ${verticalPadding}`}>
        <div className={`basis-0 flex flex-col ${headlineGap} grow`}>
          <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] ${headlineSize} text-white`}>
            The supplement brand trusted for over 45 years.
          </p>

          {/* Mobile/Tablet Accordion Layout */}
          {isMobileTablet && (
            <div>
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="account" className="border-t border-b border-[#0CA9AD]">
                  <AccordionTrigger className="group flex items-center justify-between py-[20px] hover:no-underline [&>svg]:hidden">
                    <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[20px] text-white">Account</p>
                    <div className="group-data-[state=open]:hidden">
                      <Plus className="w-[20px] h-[20px] text-white" />
                    </div>
                    <div className="hidden group-data-[state=open]:block">
                      <Minus className="w-[20px] h-[20px] text-white" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="font-['Inter',sans-serif] leading-[1.8] text-[14px] text-white pb-[10px]">
                      <p 
                        className="mb-0 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={onMyAccountClick}
                      >
                        My Account
                      </p>
                      <p 
                        className="mb-0 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={onTrackOrderClick}
                      >
                        Track Order
                      </p>
                      <p className="mb-0">Reset Password</p>
                      <p 
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={onShippingReturnsClick}
                      >
                        Shipping & Returns
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="about" className="border-b border-[#0CA9AD]">
                  <AccordionTrigger className="group flex items-center justify-between py-[20px] hover:no-underline [&>svg]:hidden">
                    <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[20px] text-white">About</p>
                    <div className="group-data-[state=open]:hidden">
                      <Plus className="w-[20px] h-[20px] text-white" />
                    </div>
                    <div className="hidden group-data-[state=open]:block">
                      <Minus className="w-[20px] h-[20px] text-white" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="font-['Inter',sans-serif] leading-[1.8] text-[14px] text-white pb-[10px]">
                      <p className="mb-0">Our Story</p>
                      <p className="mb-0">Giving</p>
                      <p>Careers</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="support" className="border-b border-[#0CA9AD]">
                  <AccordionTrigger className="group flex items-center justify-between py-[20px] hover:no-underline [&>svg]:hidden">
                    <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[20px] text-white">Support</p>
                    <div className="group-data-[state=open]:hidden">
                      <Plus className="w-[20px] h-[20px] text-white" />
                    </div>
                    <div className="hidden group-data-[state=open]:block">
                      <Minus className="w-[20px] h-[20px] text-white" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="font-['Inter',sans-serif] leading-[1.8] text-[14px] text-white pb-[10px]">
                      <p className="mb-0">Contact</p>
                      <p className="cursor-pointer hover:underline" onClick={onFAQClick}>FAQs</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Divider after accordion */}
              <div className="h-0 w-full border-t border-[#0CA9AD]" />

              {/* Sign Up */}
              <div className="flex flex-col gap-[20px] pt-[40px]">
                <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[20px] text-white">
                  Save 10% off your next order
                </p>
                <p className="font-['Inter',sans-serif] leading-[1.8] text-[14px] text-white">
                  Sign up for our newsletter to receive a welcome gift from us.
                </p>
                <div className="bg-white max-w-[555px]">
                  <div className="box-border flex items-center justify-between leading-[1.8] px-[20px] py-[11px] text-[16px]">
                    <p className="font-['Inter',sans-serif] text-[#003b3c]">Email address</p>
                    <p className="font-['Inter',sans-serif] font-medium text-[#009296] tracking-[1.6px]">SUBMIT</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Divider */}
          {isDesktop && <div className="h-0 w-full border-t border-[#0CA9AD]" />}

          {/* Desktop Columns Layout */}
          {isDesktop && (
            <div className="grid grid-cols-2 gap-[20px] h-[175px]">
              {/* Sign Up - Now First */}
              <div className="flex flex-col gap-[30px]">
                <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[24px] text-white">
                  Save 10% off your next order
                </p>
                <p className="font-['Inter',sans-serif] leading-[1.8] text-[16px] text-white">
                  Sign up for our newsletter to receive a welcome gift from us.
                </p>
                <div className="bg-white max-w-[555px]">
                  <div className="box-border flex items-center justify-between leading-[1.8] px-[20px] py-[11px] text-[16px]">
                    <p className="font-['Inter',sans-serif] text-[#003b3c]">Email address</p>
                    <p className="font-['Inter',sans-serif] font-medium text-[#009296] tracking-[1.6px]">SUBMIT</p>
                  </div>
                </div>
              </div>

              {/* Right Columns - Account, About, Support */}
              <div className="grid grid-cols-3 gap-[20px]">
                {/* Account */}
                <div className="flex flex-col gap-[30px] text-white">
                  <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[24px]">Account</p>
                  <div className="font-['Inter',sans-serif] leading-[1.8] text-[16px]">
                    <p 
                      className="mb-0 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={onMyAccountClick}
                    >
                      My Account
                    </p>
                    <p 
                      className="mb-0 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={onTrackOrderClick}
                    >
                      Track Order
                    </p>
                    <p className="mb-0">Reset Password</p>
                    <p 
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={onShippingReturnsClick}
                    >
                      Shipping & Returns
                    </p>
                  </div>
                </div>

                {/* About */}
                <div className="flex flex-col gap-[30px] text-white">
                  <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[24px]">About</p>
                  <div className="font-['Inter',sans-serif] leading-[1.8] text-[16px]">
                    <p className="mb-0">Our Story</p>
                    <p className="mb-0">Giving</p>
                    <p>Careers</p>
                  </div>
                </div>

                {/* Support */}
                <div className="flex flex-col gap-[30px] text-white">
                  <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[24px]">Support</p>
                  <div className="font-['Inter',sans-serif] leading-[1.8] text-[16px]">
                    <p className="mb-0">Contact</p>
                    <p className="cursor-pointer hover:underline" onClick={onFAQClick}>FAQs</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Logo, Copyright, FDA */}
          <div className="flex flex-col gap-[30px] items-start w-full">
            <div className="h-[38px] w-[103.621px]">
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

            <p className="font-['Inter',sans-serif] leading-[1.8] text-[14px] text-white">
              <span>Copyright © 2024 ProCaps Laboratories, Inc.    </span>
              <span 
                className="underline cursor-pointer hover:opacity-80 transition-opacity"
                onClick={onTermsOfUseClick}
              >
                Terms of Use
              </span>{' '}
              <span 
                className="underline cursor-pointer hover:opacity-80 transition-opacity"
                onClick={onPrivacyPolicyClick}
              >
                Privacy Policy
              </span>
            </p>

            {/* FDA */}
            <div className="h-[80px] relative w-full border border-solid border-white">
              <div className="flex items-center justify-center size-full">
                <div className={`box-border flex gap-[10px] h-[80px] items-center justify-center ${fdaPadding} py-[26px]`}>
                  <p className={`basis-0 font-['Inter',sans-serif] grow ${fdaTextSize} text-center text-white`}>
                    *These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure or prevent any disease.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}