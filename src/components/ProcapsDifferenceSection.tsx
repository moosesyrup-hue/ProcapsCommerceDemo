import { Button } from './ui/Button';

type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

// Helper functions for consistent spacing and typography
function getProcapsSpacing(breakpoint: Breakpoint) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  
  return {
    // Container padding - only horizontal, no vertical (BodyGroup handles vertical spacing)
    containerPadding: isMobile 
      ? 'px-[20px]' 
      : isTablet 
      ? 'px-[40px]' 
      : breakpoint === 'HD' 
      ? 'px-[200px]' 
      : breakpoint === 'XL' 
      ? 'px-[150px]' 
      : 'px-[100px]',
    
    // Section gaps
    headerGap: isMobile ? 'gap-[40px]' : isTablet ? 'gap-[40px]' : 'gap-[50px]',
    labelGap: isMobile ? 'gap-[20px]' : 'gap-[30px]',
    copyGap: isMobile ? 'gap-[20px]' : 'gap-[30px]',
    sectionGap: isMobile ? 'gap-[60px]' : isTablet ? 'gap-[80px]' : 'gap-[120px]',
    
    // Border radius
    videoBorderRadius: isMobile ? 'rounded-[10px]' : 'rounded-[20px]',
    
    // Max widths
    maxWidth: 'max-w-[1060px]',
    headerMaxWidth: isMobile ? 'w-full' : 'max-w-[900px]',
  };
}

function getProcapsTypography(breakpoint: Breakpoint) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const isDesktop = breakpoint === 'HD' || breakpoint === 'XL';
  
  return {
    // Label (The Procaps Difference)
    labelSize: isMobile 
      ? 'text-[20px]' 
      : isTablet 
      ? 'text-[24px]' 
      : isDesktop 
      ? 'text-[34px]' 
      : 'text-[24px]',
    labelTracking: isMobile 
      ? 'tracking-[-0.2px]' 
      : isTablet 
      ? 'tracking-[-0.24px]' 
      : isDesktop 
      ? 'tracking-[-0.34px]' 
      : 'tracking-[-0.24px]',
    
    // Headline
    headlineSize: isMobile 
      ? 'text-[28px]' 
      : isTablet 
      ? 'text-[34px]' 
      : breakpoint === 'HD' 
      ? 'text-[72px]' 
      : breakpoint === 'XL' 
      ? 'text-[54px]' 
      : 'text-[38px]',
    headlineTracking: isMobile 
      ? 'tracking-[-0.56px]' 
      : isTablet 
      ? 'tracking-[-0.68px]' 
      : breakpoint === 'HD' 
      ? 'tracking-[-1.44px]' 
      : breakpoint === 'XL' 
      ? 'tracking-[-1.08px]' 
      : 'tracking-[-0.76px]',
    
    // Body text
    bodySize: isMobile 
      ? 'text-[16px]' 
      : isTablet 
      ? 'text-[16px]' 
      : isDesktop 
      ? 'text-[20px]' 
      : 'text-[16px]',
    bodyTracking: isMobile 
      ? 'tracking-[-0.16px]' 
      : isTablet 
      ? 'tracking-[-0.16px]' 
      : isDesktop 
      ? 'tracking-[-0.4px]' 
      : 'tracking-[-0.32px]',
    
    // Play button size
    playButtonSize: isMobile ? 'size-[70px]' : 'size-[91px]',
  };
}

// Label with underline
function ProcapsLabel({ breakpoint }: { breakpoint: Breakpoint }) {
  const spacing = getProcapsSpacing(breakpoint);
  const typography = getProcapsTypography(breakpoint);

  return (
    <div className={`flex flex-col items-center ${spacing.labelGap}`}>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#009296] ${typography.labelSize} ${typography.labelTracking} text-center`}>
        The Procaps Difference
      </p>
      <div className="w-[100px] h-[1px] bg-[#009296]" />
    </div>
  );
}

// Headline and body copy
function ProcapsCopy({ breakpoint }: { breakpoint: Breakpoint }) {
  const spacing = getProcapsSpacing(breakpoint);
  const typography = getProcapsTypography(breakpoint);

  return (
    <div className={`flex flex-col items-center ${spacing.copyGap} text-center w-full`}>
      <h2 className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[#003b3c] ${typography.headlineSize} ${typography.headlineTracking}`}>
        Evolving with science, maximizing efficacy for you.
      </h2>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#003b3c] ${typography.bodySize} ${typography.bodyTracking}`}>
        At Procaps Labs, innovation is at the heart of everything we do. Just as science is always advancing, we remain committed to evolving alongside it. With each new discovery, we refine our formulas to ensure they reflect the latest scientific breakthroughs. Our dedication to progress allows us to create the most effective, research-backed products possible.
      </p>
    </div>
  );
}

// CTA Button
function ProcapsButton() {
  return <Button variant="outline">Learn More</Button>;
}

// Header section (label, copy, button)
function ProcapsHeader({ breakpoint }: { breakpoint: Breakpoint }) {
  const spacing = getProcapsSpacing(breakpoint);

  return (
    <div className={`flex flex-col items-center ${spacing.headerGap} w-full ${spacing.headerMaxWidth}`}>
      <ProcapsLabel breakpoint={breakpoint} />
      <ProcapsCopy breakpoint={breakpoint} />
      <ProcapsButton />
    </div>
  );
}

// Play button SVG
function PlayButton({ svgPaths, breakpoint }: { svgPaths: any; breakpoint: Breakpoint }) {
  const typography = getProcapsTypography(breakpoint);

  return (
    <div className={`${typography.playButtonSize}`}>
      <svg className="block size-full" fill="none" viewBox="0 0 91 91">
        <circle cx="45.5" cy="45.5" fill="white" fillOpacity="0.15" r="44" stroke="white" strokeWidth="3" />
        <path d={svgPaths.p3f714600} fill="white" />
      </svg>
    </div>
  );
}

// Video placeholder with play button
function ProcapsVideo({ svgPaths, breakpoint }: { svgPaths: any; breakpoint: Breakpoint }) {
  const spacing = getProcapsSpacing(breakpoint);

  return (
    <div className={`relative w-full aspect-[1060/658] bg-[#c4c4c4] ${spacing.videoBorderRadius} flex items-center justify-center`}>
      <PlayButton svgPaths={svgPaths} breakpoint={breakpoint} />
    </div>
  );
}

// Main export
export default function ProcapsDifferenceSection({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const spacing = getProcapsSpacing(breakpoint);

  return (
    <div className={`flex flex-col items-center ${spacing.containerPadding} w-full`}>
      <div className={`flex flex-col items-center ${spacing.sectionGap} ${spacing.maxWidth} w-full`}>
        <ProcapsHeader breakpoint={breakpoint} />
        <ProcapsVideo svgPaths={svgPaths} breakpoint={breakpoint} />
      </div>
    </div>
  );
}