import { Button } from './ui/Button';
import { useState } from 'react';
import VideoModal from './VideoModal';

type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

/**
 * Procaps Difference Section - Production-ready component
 * Displays promotional content about Procaps Labs with video player
 * Fully responsive across all breakpoints (S, M, L, XL, HD)
 */

// ============================================================================
// HELPER FUNCTIONS - Spacing and Layout
// ============================================================================

function getSpacing(breakpoint: Breakpoint) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const isDesktop = breakpoint === 'L' || breakpoint === 'XL' || breakpoint === 'HD';
  
  // Horizontal container padding (no vertical - handled by BodyGroup)
  const getContainerPadding = () => {
    switch (breakpoint) {
      case 'S':
        return 'px-[20px]';
      case 'M':
        return 'px-[40px]';
      case 'L':
        return 'px-[100px]';
      case 'XL':
        return 'px-[150px]';
      case 'HD':
        return 'px-[200px]';
      default:
        return 'px-[20px]';
    }
  };
  
  // Gap between header and video
  const getSectionGap = () => {
    if (isMobile) return 'gap-[60px]';
    if (isTablet) return 'gap-[80px]';
    return 'gap-[120px]';
  };
  
  // Gap between header elements (label, copy, button)
  const getHeaderGap = () => {
    if (isMobile || isTablet) return 'gap-[40px]';
    return 'gap-[50px]';
  };
  
  // Gap between label text and underline
  const getLabelGap = () => {
    if (isMobile) return 'gap-[20px]';
    return 'gap-[30px]';
  };
  
  // Gap between headline and body copy
  const getCopyGap = () => {
    if (isMobile) return 'gap-[20px]';
    return 'gap-[30px]';
  };
  
  // Video border radius
  const getVideoBorderRadius = () => {
    if (isMobile) return 'rounded-[10px]';
    return 'rounded-[20px]';
  };
  
  // Header max width
  const getHeaderMaxWidth = () => {
    if (isMobile) return 'w-full';
    return 'max-w-[900px]';
  };
  
  return {
    containerPadding: getContainerPadding(),
    sectionGap: getSectionGap(),
    headerGap: getHeaderGap(),
    labelGap: getLabelGap(),
    copyGap: getCopyGap(),
    videoBorderRadius: getVideoBorderRadius(),
    headerMaxWidth: getHeaderMaxWidth(),
    contentMaxWidth: 'max-w-[1060px]',
  };
}

// ============================================================================
// HELPER FUNCTIONS - Typography
// ============================================================================

function getTypography(breakpoint: Breakpoint) {
  // Label (e.g., "The Procaps Difference")
  const getLabelSize = () => {
    switch (breakpoint) {
      case 'S':
        return { size: 'text-[20px]', tracking: 'tracking-[-0.2px]' };
      case 'M':
      case 'L':
        return { size: 'text-[24px]', tracking: 'tracking-[-0.24px]' };
      case 'XL':
      case 'HD':
        return { size: 'text-[34px]', tracking: 'tracking-[-0.34px]' };
      default:
        return { size: 'text-[24px]', tracking: 'tracking-[-0.24px]' };
    }
  };
  
  // Headline
  const getHeadlineSize = () => {
    switch (breakpoint) {
      case 'S':
        return { size: 'text-[28px]', tracking: 'tracking-[-0.56px]' };
      case 'M':
        return { size: 'text-[34px]', tracking: 'tracking-[-0.68px]' };
      case 'L':
        return { size: 'text-[38px]', tracking: 'tracking-[-0.76px]' };
      case 'XL':
        return { size: 'text-[54px]', tracking: 'tracking-[-1.08px]' };
      case 'HD':
        return { size: 'text-[72px]', tracking: 'tracking-[-1.44px]' };
      default:
        return { size: 'text-[28px]', tracking: 'tracking-[-0.56px]' };
    }
  };
  
  // Body text
  const getBodySize = () => {
    switch (breakpoint) {
      case 'S':
      case 'M':
      case 'L':
        return { size: 'text-[16px]', tracking: 'tracking-[-0.32px]' };
      case 'XL':
      case 'HD':
        return { size: 'text-[20px]', tracking: 'tracking-[-0.4px]' };
      default:
        return { size: 'text-[16px]', tracking: 'tracking-[-0.32px]' };
    }
  };
  
  // Play button
  const getPlayButtonSize = () => {
    if (breakpoint === 'S') return 'size-[70px]';
    return 'size-[91px]';
  };
  
  const label = getLabelSize();
  const headline = getHeadlineSize();
  const body = getBodySize();
  
  return {
    labelSize: label.size,
    labelTracking: label.tracking,
    headlineSize: headline.size,
    headlineTracking: headline.tracking,
    bodySize: body.size,
    bodyTracking: body.tracking,
    playButtonSize: getPlayButtonSize(),
  };
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Section label with colored underline
 */
function SectionLabel({ breakpoint }: { breakpoint: Breakpoint }) {
  const spacing = getSpacing(breakpoint);
  const typography = getTypography(breakpoint);

  return (
    <div className={`flex flex-col items-center ${spacing.labelGap}`}>
      <p 
        className={`
          font-['Inter:Regular',sans-serif] 
          font-normal 
          leading-[1.4] 
          text-[#009296] 
          ${typography.labelSize} 
          ${typography.labelTracking} 
          text-center
        `}
      >
        The Procaps Difference
      </p>
      <div className="w-[100px] h-[1px] bg-[#009296]" />
    </div>
  );
}

/**
 * Main headline and body copy
 */
function ContentCopy({ breakpoint }: { breakpoint: Breakpoint }) {
  const spacing = getSpacing(breakpoint);
  const typography = getTypography(breakpoint);

  return (
    <div className={`flex flex-col items-center ${spacing.copyGap} text-center w-full`}>
      <h2 
        className={`
          font-['STIX_Two_Text:Medium',sans-serif] 
          font-medium 
          leading-[1.1] 
          text-[#003b3c] 
          ${typography.headlineSize} 
          ${typography.headlineTracking}
        `}
      >
        Evolving with science, maximizing efficacy for you.
      </h2>
      <p 
        className={`
          font-['Inter:Regular',sans-serif] 
          font-normal 
          leading-[1.4] 
          text-[#003b3c] 
          ${typography.bodySize} 
          ${typography.bodyTracking}
        `}
      >
        At Procaps Labs, innovation is at the heart of everything we do. Just as science is always advancing, we remain committed to evolving alongside it. With each new discovery, we refine our formulas to ensure they reflect the latest scientific breakthroughs. Our dedication to progress allows us to create the most effective, research-backed products possible.
      </p>
    </div>
  );
}

/**
 * Call-to-action button
 */
function CTAButton() {
  return <Button variant="outline">Learn More</Button>;
}

/**
 * Header section containing label, copy, and button
 */
function Header({ breakpoint }: { breakpoint: Breakpoint }) {
  const spacing = getSpacing(breakpoint);

  return (
    <div className={`flex flex-col items-center ${spacing.headerGap} w-full ${spacing.headerMaxWidth}`}>
      <SectionLabel breakpoint={breakpoint} />
      <ContentCopy breakpoint={breakpoint} />
      <CTAButton />
    </div>
  );
}

/**
 * Video play button SVG icon
 */
function PlayButton({ 
  svgPaths, 
  breakpoint, 
  onClick 
}: { 
  svgPaths: any; 
  breakpoint: Breakpoint; 
  onClick?: () => void;
}) {
  const typography = getTypography(breakpoint);

  return (
    <button 
      className={`${typography.playButtonSize} cursor-pointer transition-opacity hover:opacity-80`}
      aria-label="Play video"
      onClick={onClick}
    >
      <svg className="block size-full" fill="none" viewBox="0 0 91 91">
        <circle 
          cx="45.5" 
          cy="45.5" 
          fill="white" 
          fillOpacity="0.15" 
          r="44" 
          stroke="white" 
          strokeWidth="3" 
        />
        <path d={svgPaths.p3f714600} fill="white" />
      </svg>
    </button>
  );
}

/**
 * Video player placeholder with play button overlay
 */
function VideoPlayer({ 
  svgPaths, 
  breakpoint, 
  onPlayClick 
}: { 
  svgPaths: any; 
  breakpoint: Breakpoint; 
  onPlayClick?: () => void;
}) {
  const spacing = getSpacing(breakpoint);

  return (
    <div 
      className={`
        relative 
        w-full 
        aspect-[1060/658] 
        bg-[#c4c4c4] 
        ${spacing.videoBorderRadius} 
        flex 
        items-center 
        justify-center
        overflow-hidden
        cursor-pointer
      `}
      onClick={onPlayClick}
    >
      <PlayButton svgPaths={svgPaths} breakpoint={breakpoint} onClick={onPlayClick} />
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Main Procaps Difference Section
 * @param breakpoint - Current viewport breakpoint (S, M, L, XL, HD)
 * @param svgPaths - SVG path data for play button icon
 */
export default function ProcapsDifferenceSection({ 
  breakpoint, 
  svgPaths 
}: { 
  breakpoint: Breakpoint; 
  svgPaths: any; 
}) {
  const spacing = getSpacing(breakpoint);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section 
      className={`flex flex-col items-center ${spacing.containerPadding} w-full`}
      aria-labelledby="procaps-heading"
    >
      <div className={`flex flex-col items-center ${spacing.sectionGap} ${spacing.contentMaxWidth} w-full`}>
        <Header breakpoint={breakpoint} />
        <VideoPlayer svgPaths={svgPaths} breakpoint={breakpoint} onPlayClick={() => setIsModalOpen(true)} />
      </div>
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}