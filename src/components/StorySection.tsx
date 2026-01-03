import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import React from 'react';

type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

interface StorySectionProps {
  breakpoint: Breakpoint;
  eyebrow: string;
  headline: string | React.ReactNode;
  bodyContent: React.ReactNode;
  imageSlot: React.ReactNode;
  imageOnRight?: boolean;
  eyebrowPosition?: 'above' | 'below'; // above for PDP, below for Our Story
  showDivider?: boolean; // true for Our Story, false for PDP
  animated?: boolean;
  bgColor?: string;
}

export function StorySection({
  breakpoint,
  eyebrow,
  headline,
  bodyContent,
  imageSlot,
  imageOnRight = false,
  eyebrowPosition = 'above',
  showDivider = false,
  animated = false,
  bgColor = 'white'
}: StorySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  
  // Responsive values
  const padding = isMobile ? 'px-[24px] pb-[40px]' : isTablet ? 'px-[40px] pb-[50px]' : 'px-[40px] pb-[55px]';
  const eyebrowSize = isMobile ? 'text-[14px]' : isTablet ? 'text-[14px]' : 'text-[16px] lg:text-[20px]';
  const headlineSize = isMobile ? 'text-[32px]' : isTablet ? 'text-[42px]' : 'text-[54px]';
  const headlineTracking = isMobile ? 'tracking-[-0.64px]' : isTablet ? 'tracking-[-0.84px]' : 'tracking-[-1.08px]';
  const layoutDirection = isMobile ? 'flex-col' : 'flex-row';
  const contentGap = isMobile ? 'gap-[40px]' : isTablet ? 'gap-[60px]' : 'gap-[100px]';
  
  const textOrder = isMobile ? 'order-2' : imageOnRight ? 'order-1' : 'order-2';
  const imageOrder = isMobile ? 'order-1' : imageOnRight ? 'order-2' : 'order-1';
  
  // Build headline section with eyebrow above or below
  const headlineSection = (
    <div className="flex flex-col gap-[40px]">
      {eyebrowPosition === 'above' && (
        <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.4] text-[#009296] uppercase tracking-[1.4px] ${eyebrowSize}`}>
          {eyebrow}
        </p>
      )}
      
      <h2 className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[#003b3c] ${headlineSize} ${headlineTracking}`}>
        {headline}
      </h2>
      
      {eyebrowPosition === 'below' && (
        <>
          {showDivider && (
            <div className="h-0 relative shrink-0 w-[50px]" data-name="line">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 1">
                  <line stroke="#009296" x2="50" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          )}
          <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.4] text-[#009296] uppercase tracking-[1.4px] ${eyebrowSize}`}>
            {eyebrow}
          </p>
        </>
      )}
    </div>
  );
  
  const textContent = (
    <div className={`flex flex-col gap-[40px] ${isMobile ? 'w-full' : 'flex-1'} min-w-0 ${textOrder}`}>
      {headlineSection}
      {bodyContent}
    </div>
  );
  
  const imageContent = (
    <div className={`${isMobile ? 'w-full' : 'flex-1'} min-w-0 ${imageOrder}`}>
      {imageSlot}
    </div>
  );
  
  if (animated) {
    return (
      <div className={`w-full bg-${bgColor}`}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`flex ${layoutDirection} ${contentGap} items-center justify-center max-w-[1600px] mx-auto ${padding}`}>
            {textContent}
            {imageContent}
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className={`w-full bg-${bgColor}`}>
      <div className={`flex ${layoutDirection} ${contentGap} items-center justify-center max-w-[1600px] mx-auto ${padding}`}>
        {textContent}
        {imageContent}
      </div>
    </div>
  );
}