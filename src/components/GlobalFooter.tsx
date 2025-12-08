import { useState, useEffect } from 'react';
import { Accordion } from "./ui/accordion";
import { footerSections } from '../data/footerData';
import FooterHeadline from './footer/FooterHeadline';
import FooterSection from './footer/FooterSection';
import NewsletterSignup from './footer/NewsletterSignup';
import FooterLogo from './footer/FooterLogo';
import FooterLegal from './footer/FooterLegal';
import FDADisclaimer from './footer/FDADisclaimer';

interface GlobalFooterProps {
  onFAQClick?: () => void;
  onPrivacyPolicyClick?: () => void;
  onTermsOfUseClick?: () => void;
  onMyAccountClick?: () => void;
  onShippingReturnsClick?: () => void;
  onTrackOrderClick?: () => void;
  onContactClick?: () => void;
  onOurStoryClick?: () => void;
}

export default function GlobalFooter({ 
  onFAQClick, 
  onPrivacyPolicyClick, 
  onTermsOfUseClick, 
  onMyAccountClick, 
  onShippingReturnsClick, 
  onTrackOrderClick, 
  onContactClick, 
  onOurStoryClick 
}: GlobalFooterProps) {
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

  // Determine padding based on breakpoint
  const containerPadding = breakpoint === 'S' ? 'px-[20px]' : 'px-[40px]';
  const verticalPadding = breakpoint === 'S' ? 'py-[40px]' : breakpoint === 'M' ? 'py-[60px]' : 'py-[80px]';
  const headlineGap = breakpoint === 'S' ? 'gap-[40px]' : breakpoint === 'M' ? 'gap-[60px]' : 'gap-[70px]';

  // Map action keys to actual onClick handlers
  const handleLinkClick = (action: string | null) => {
    if (!action) return;
    
    const actionHandlers: Record<string, (() => void) | undefined> = {
      myAccount: onMyAccountClick,
      trackOrder: onTrackOrderClick,
      shippingReturns: onShippingReturnsClick,
      ourStory: onOurStoryClick,
      helpCenter: onContactClick,
      faq: onFAQClick
    };

    actionHandlers[action]?.();
  };

  return (
    <div className="bg-gradient-to-b from-[#009296] from-50% to-[#00b4ae] to-[196.83%] relative shrink-0 w-full">
      <div className={`box-border flex gap-[10px] items-start ${containerPadding} ${verticalPadding}`}>
        <div className={`basis-0 flex flex-col ${headlineGap} grow`}>
          {/* Headline */}
          <FooterHeadline breakpoint={breakpoint} />

          {/* Mobile/Tablet Accordion Layout */}
          {isMobileTablet && (
            <div>
              <Accordion type="multiple" className="w-full">
                {footerSections.map((section) => (
                  <FooterSection
                    key={section.title}
                    section={section}
                    isMobileTablet={true}
                    onLinkClick={handleLinkClick}
                  />
                ))}
              </Accordion>

              {/* Divider after accordion */}
              <div className="h-0 w-full border-t border-[#0CA9AD]" />

              {/* Newsletter Signup */}
              <div className="pt-[40px]">
                <NewsletterSignup isMobileTablet={true} />
              </div>
            </div>
          )}

          {/* Desktop Divider */}
          {isDesktop && <div className="h-0 w-full border-t border-[#0CA9AD]" />}

          {/* Desktop Layout */}
          {isDesktop && (
            <div className="grid grid-cols-2 gap-[20px] h-[175px]">
              {/* Newsletter Signup */}
              <NewsletterSignup isMobileTablet={false} />

              {/* Right Columns - Account, About, Support */}
              <div className="grid grid-cols-3 gap-[20px]">
                {footerSections.map((section) => (
                  <FooterSection
                    key={section.title}
                    section={section}
                    isMobileTablet={false}
                    onLinkClick={handleLinkClick}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Logo, Copyright, FDA */}
          <div className="flex flex-col gap-[30px] items-start w-full">
            <FooterLogo />
            <FooterLegal 
              onTermsOfUseClick={onTermsOfUseClick}
              onPrivacyPolicyClick={onPrivacyPolicyClick}
            />
            <FDADisclaimer breakpoint={breakpoint} />
          </div>
        </div>
      </div>
    </div>
  );
}
