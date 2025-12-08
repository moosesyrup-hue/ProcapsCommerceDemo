import { Button } from './ui/Button';
import imgImage6 from "figma:asset/07a96391057ade3b14e0a1c61eff3099de640600.png";

type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

// PHACT Section - Helper functions for consistent spacing and typography
function getPhactSpacing(breakpoint: Breakpoint) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  
  return {
    // Container padding
    containerPadding: isMobile ? 'px-[20px]' : 'px-[40px]',
    
    // Content padding (for text area)
    contentPadding: isTablet 
      ? 'pl-[40px] pr-[80px] py-[70px]' 
      : breakpoint === 'HD' 
      ? 'pl-[80px] pr-[130px] py-[100px]' 
      : breakpoint === 'XL' 
      ? 'pl-[70px] pr-[120px] py-[95px]' 
      : 'pl-[60px] pr-[110px] py-[90px]',
    
    // Mobile card padding
    mobilePadding: 'px-[30px] py-[40px]',
    
    // Gap between elements
    contentGap: isMobile ? 'gap-[30px]' : 'gap-[40px]',
    
    // Border radius
    borderRadius: isMobile ? 'rounded-[10px]' : 'rounded-[20px]',
    imageBorderRadius: isMobile ? 'rounded-t-[10px]' : '',
    
    // Alignment
    itemsAlign: isMobile ? 'items-center' : 'items-start',
    textAlign: isMobile ? 'text-center' : 'text-left',
  };
}

function getPhactTypography(breakpoint: Breakpoint) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const isSmallScreen = isMobile || isTablet;
  
  return {
    // Badge/icon size
    badgeSize: isSmallScreen ? 'size-[80px]' : 'size-[102.845px]',
    
    // Headline sizing
    headlineSize: isSmallScreen 
      ? 'text-[28px]' 
      : breakpoint === 'HD' 
      ? 'text-[54px]' 
      : breakpoint === 'XL' 
      ? 'text-[38px]' 
      : 'text-[34px]',
    headlineTracking: isSmallScreen 
      ? 'tracking-[-0.56px]' 
      : breakpoint === 'HD' 
      ? 'tracking-[-1.08px]' 
      : breakpoint === 'XL' 
      ? 'tracking-[-0.76px]' 
      : 'tracking-[-0.68px]',
    
    // Body text sizing
    bodySize: isMobile 
      ? 'text-[16px]' 
      : isTablet 
      ? 'text-[14px]' 
      : breakpoint === 'HD' || breakpoint === 'XL' 
      ? 'text-[20px]' 
      : 'text-[16px]',
    bodyTracking: isMobile 
      ? 'tracking-[-0.16px]' 
      : isTablet 
      ? 'tracking-[-0.14px]' 
      : breakpoint === 'HD' || breakpoint === 'XL' 
      ? 'tracking-[-0.2px]' 
      : 'tracking-[-0.16px]',
  };
}

// PHACT product image
function PhactImage({ breakpoint }: { breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const spacing = getPhactSpacing(breakpoint);
  
  return (
    <div className={`${isMobile ? 'w-full aspect-[670/500]' : 'aspect-[720/720] basis-0 grow min-h-px min-w-px'} relative shrink-0`}>
      <img 
        alt="PHACT Soap Product" 
        className={`absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full ${spacing.imageBorderRadius}`} 
        src={imgImage6} 
      />
    </div>
  );
}

// PHACT badge icon
function PhactBadge({ svgPaths, breakpoint }: { svgPaths: any; breakpoint: Breakpoint }) {
  const typography = getPhactTypography(breakpoint);
  
  return (
    <div className={`relative shrink-0 ${typography.badgeSize}`}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 103 103">
        <g id="phact-badge">
          <path d={svgPaths.pb0384e0} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.pe853980} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p2184400} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p57e9500} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p71e2c00} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p23a6b780} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p2195d60} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p11791000} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p29d6cb80} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p3d5d01f0} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p23f80780} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p39635200} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p3470400} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p2af03300} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p13f8d600} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p2bbf2480} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p1ebe4c80} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p2a1ade00} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p16b8ef00} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p9f9480} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p3e352660} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p31238900} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p3e19e0f0} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p32f10800} fill="var(--fill-0, #009296)" />
        </g>
      </svg>
    </div>
  );
}

// PHACT headline and description copy
function PhactCopy({ breakpoint }: { breakpoint: Breakpoint }) {
  const spacing = getPhactSpacing(breakpoint);
  const typography = getPhactTypography(breakpoint);

  return (
    <div className={`content-stretch flex flex-col gap-[20px] items-start relative shrink-0 text-[#003b3c] w-full ${spacing.textAlign}`}>
      <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 text-[0px] ${typography.headlineSize} ${typography.headlineTracking} w-full`}>
        <span>The most rigorously tested, </span>
        <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#009296]">all-in-one</span>
        <span>{` cleansing experience.`}</span>
      </p>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 ${typography.bodySize} ${typography.bodyTracking} w-full`}>
        Enjoy a rich, foamy lather that gently cleanses, moisturizes and does not damage your skin's natural protective barriers, all with just four gentle plant-based ingredients.
      </p>
    </div>
  );
}

// PHACT CTA button
function PhactButton() {
  return <Button variant="primary">Shop PHACT</Button>;
}

// PHACT content group (badge, copy, button)
function PhactContent({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const spacing = getPhactSpacing(breakpoint);
  
  return (
    <div className={`content-stretch flex flex-col ${spacing.contentGap} ${spacing.itemsAlign} justify-center relative shrink-0 w-full`}>
      <PhactBadge svgPaths={svgPaths} breakpoint={breakpoint} />
      <PhactCopy breakpoint={breakpoint} />
      <PhactButton />
    </div>
  );
}

// PHACT content panel (desktop only - right side with beige background)
function PhactContentPanel({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const spacing = getPhactSpacing(breakpoint);

  return (
    <div className="aspect-[1146/1146] basis-0 bg-[#f6f2ec] grow min-h-px min-w-px relative shrink-0">
      <div className={`flex flex-col justify-center ${spacing.contentPadding} size-full`}>
        <PhactContent breakpoint={breakpoint} svgPaths={svgPaths} />
      </div>
    </div>
  );
}

// PHACT card (mobile stacked, tablet/desktop side-by-side)
function PhactCard({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const isMobile = breakpoint === 'S';
  const spacing = getPhactSpacing(breakpoint);
  
  if (isMobile) {
    // Mobile: Stacked layout - Image → Badge → Copy → Button
    return (
      <div className={`w-full bg-[#f6f2ec] ${spacing.borderRadius} overflow-hidden`}>
        <PhactImage breakpoint={breakpoint} />
        <div className={spacing.mobilePadding}>
          <PhactContent breakpoint={breakpoint} svgPaths={svgPaths} />
        </div>
      </div>
    );
  }
  
  // Tablet & Desktop: Side-by-side layout - Image | Content Panel
  return (
    <div className={`basis-0 content-stretch flex grow items-start justify-center min-h-px min-w-px overflow-clip relative ${spacing.borderRadius} self-stretch shrink-0`}>
      <PhactImage breakpoint={breakpoint} />
      <PhactContentPanel breakpoint={breakpoint} svgPaths={svgPaths} />
    </div>
  );
}

// PHACT Section (main export)
export default function PhactSection({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const spacing = getPhactSpacing(breakpoint);
  
  return (
    <div className="relative shrink-0 w-full">
      <div className={`box-border content-stretch flex items-start justify-center ${spacing.containerPadding} py-0 relative w-full`}>
        <PhactCard breakpoint={breakpoint} svgPaths={svgPaths} />
      </div>
    </div>
  );
}
