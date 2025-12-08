import { useState, useEffect } from 'react';
import svgPathsL from "../imports/svg-npcn6vymav";
import svgPathsXl from "../imports/svg-ovhudlxac5";
import svgPathsHd from "../imports/svg-sng3ceu5u2";
import VitaminSpecialist from './VitaminSpecialistSection';
import imgBanner from "figma:asset/be6b296809b899ffe49a39b24634e1a5d4abb146.png";
import imgBannerMobile from "figma:asset/75fc2edc3d254e5f5f699438d8eaeb81a1ab5fd7.png";
import imgBannerTablet from "figma:asset/84ce49373bbc690f8c23b2d25b68fd6aedbf8176.png";
import imgModule from "figma:asset/4c2934de3dbf27b37b800c210c506dfc23cea7d9.png";
import imgModule1 from "figma:asset/bb079113e4e52e6f124be3a8b4815c8ab2dbad6d.png";
import imgImage from "figma:asset/2af175d1ace132d63709b5990887874d1e9098a5.png";
import imgImage1 from "figma:asset/e98d5399b4df9f21e58d7b3e829fa1be0652fdec.png";
import imgImage2 from "figma:asset/843a93f0744d908e4670d5a4585c5f1c7432e6f0.png";
import imgImage3 from "figma:asset/33d29cd45c53175dde8ab15537ea7417446bf54d.png";
import imgImage4 from "figma:asset/ae9200ae275214fab21ea17e682459720b9ddfa8.png";
import imgImage5 from "figma:asset/53da6d9ed35f82a7364b7a236e964b3d87a96086.png";
import imgImage6 from "figma:asset/07a96391057ade3b14e0a1c61eff3099de640600.png";

type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

export default function Homepage({ onFindSupplementsClick, onIngredientsClick }: { 
  onFindSupplementsClick?: () => void;
  onIngredientsClick?: () => void;
}) {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('XL');

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

  const svgPaths = breakpoint === 'HD' ? svgPathsHd : breakpoint === 'XL' ? svgPathsXl : svgPathsL;

  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-x-hidden relative w-full">
      <Banner breakpoint={breakpoint} svgPaths={svgPaths} />
      <BodyGroup 
        breakpoint={breakpoint} 
        svgPaths={svgPaths} 
        onIngredientsClick={onIngredientsClick}
      />
    </div>
  );
}

// Banner Section - Helper functions for consistent spacing
function getBannerSpacing(breakpoint: Breakpoint) {
  return {
    contentTop: breakpoint === 'S' ? 'top-[40px]' : breakpoint === 'M' ? 'top-[58px]' : breakpoint === 'HD' ? 'top-[80px]' : breakpoint === 'XL' ? 'top-[70px]' : 'top-[58px]',
    contentWidth: breakpoint === 'S' || breakpoint === 'M' ? 'w-full px-[40px]' : breakpoint === 'HD' ? 'w-[800px]' : breakpoint === 'XL' ? 'w-[760px]' : 'w-[719px]',
    dotsBottom: 'bottom-[40px]',
    dotsLeft: breakpoint === 'S' ? 'left-[40px]' : 'left-[42px]',
  };
}

function getBannerTypography(breakpoint: Breakpoint) {
  const isDesktop = breakpoint === 'HD' || breakpoint === 'XL';
  return {
    headlineSize: breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[54px]' : 'text-[38px]',
    headlineTracking: breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : 'tracking-[-0.76px]',
    subheadSize: isDesktop ? 'text-[20px]' : 'text-[16px]',
    starsHeight: breakpoint === 'S' ? 'h-[24px]' : 'h-[30px]',
    starsWidth: breakpoint === 'S' ? 'w-[131px]' : 'w-[164px]',
  };
}

// Flattened 5-star rating display
function FiveStarRating({ svgPaths, breakpoint }: { svgPaths: any; breakpoint: Breakpoint }) {
  const typography = getBannerTypography(breakpoint);
  
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-center relative shrink-0 w-[250px]" data-name="reviews">
      <div className={`${typography.starsHeight} relative ${typography.starsWidth}`}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 165 30">
          <g id="stars">
            <path d={svgPaths.pde64000} fill="var(--fill-0, #F1A33A)" />
            <path d={svgPaths.p7d06c80} fill="var(--fill-0, #F1A33A)" />
            <path d={svgPaths.p10eff040} fill="var(--fill-0, #F1A33A)" />
            <path d={svgPaths.p45c7b80} fill="var(--fill-0, #F1A33A)" />
            <path d={svgPaths.p3b5a1e00} fill="var(--fill-0, #F1A33A)" />
          </g>
        </svg>
      </div>
      <p className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic leading-[1.4] relative shrink-0 text-[#003b3c] text-[20px] text-center text-nowrap whitespace-pre">
        50,000+ verified 5-star reviews
      </p>
    </div>
  );
}

// Banner headline with responsive text
function BannerHeadline({ breakpoint }: { breakpoint: Breakpoint }) {
  const typography = getBannerTypography(breakpoint);
  const isMobile = breakpoint === 'S';
  const showSubtext = !isMobile;
  const nowrapClasses = isMobile ? '' : 'text-nowrap whitespace-pre';

  return (
    <div className={`content-stretch flex flex-col gap-[20px] items-center relative shrink-0 text-[#003b3c] text-center ${nowrapClasses} w-full`}>
      <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 text-[0px] ${typography.headlineSize} ${typography.headlineTracking}`}>
        <span>
          The supplement brand{isMobile ? ' ' : ''}
          {!isMobile && <br aria-hidden="true" />}
        </span>
        <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#009296]">
          {isMobile ? 'trusted' : ' trusted'}
        </span>
        <span>{` for over 45 years.`}</span>
      </p>
      {showSubtext && (
        <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 ${typography.subheadSize}`}>
          Refresh your mind and mood with our revitalizing products!
        </p>
      )}
    </div>
  );
}

// Reusable CTA button
function BannerButton() {
  return (
    <div className="bg-[#009296] box-border content-stretch flex gap-[10px] h-[50px] items-center justify-center px-[39px] py-[15px] relative rounded-[999px] shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[1.92px] uppercase whitespace-pre">
        OUR STORY
      </p>
    </div>
  );
}

// Carousel navigation dots
function CarouselDots({ breakpoint }: { breakpoint: Breakpoint }) {
  const spacing = getBannerSpacing(breakpoint);

  return (
    <div className={`absolute ${spacing.dotsBottom} h-[13px] ${spacing.dotsLeft} w-[59px]`} data-name="carousel dots">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59 13">
        <g id="carousel dots">
          <circle cx="6.5" cy="6.5" fill="var(--fill-0, #003B3C)" r="6.5" />
          <circle cx="29.5" cy="6.5" r="6" stroke="var(--stroke-0, #003B3C)" />
          <circle cx="52.5" cy="6.5" r="6" stroke="var(--stroke-0, #003B3C)" />
        </g>
      </svg>
    </div>
  );
}

// Banner content overlay (reviews, headline, button)
function BannerContent({ breakpoint }: { breakpoint: Breakpoint }) {
  const spacing = getBannerSpacing(breakpoint);
  const isMobile = breakpoint === 'S';
  // +5px offset to optically center content on desktop (accounts for visual weight)
  const horizontalPos = isMobile ? 'left-0 translate-x-0' : 'left-[calc(50%+5px)] -translate-x-1/2';

  return (
    <div className={`absolute content-stretch flex flex-col gap-[30px] items-center ${horizontalPos} ${spacing.contentTop} ${spacing.contentWidth}`}>
      <FiveStarRating svgPaths={svgPathsL} breakpoint={breakpoint} />
      <BannerHeadline breakpoint={breakpoint} />
      <BannerButton />
    </div>
  );
}

function Banner({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const bannerImage = breakpoint === 'S' ? imgBannerMobile : breakpoint === 'M' ? imgBannerTablet : imgBanner;
  const isMobileOrTablet = breakpoint === 'S' || breakpoint === 'M';
  
  if (isMobileOrTablet) {
    // Mobile and tablet: Show full image without cropping
    return (
      <div className="relative shrink-0 w-full" data-name="banner">
        <img alt="" className="w-full h-auto block" src={bannerImage} />
        <div className="absolute inset-0 pointer-events-none">
          {breakpoint !== 'S' && <CarouselDots breakpoint={breakpoint} />}
          <BannerContent breakpoint={breakpoint} />
        </div>
      </div>
    );
  }
  
  // Desktop: Use proportional height approach
  return (
    <div className="relative shrink-0 w-full h-[47.5vw] max-h-[900px]" data-name="banner">
      <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={bannerImage} />
      <CarouselDots breakpoint={breakpoint} />
      <BannerContent breakpoint={breakpoint} />
    </div>
  );
}

// Ticker Scroll Section
function TickerScroll() {
  return (
    <div className="content-stretch flex gap-[31px] items-center justify-center relative shrink-0 w-full" data-name="ticker scroll">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic relative shrink-0 text-[#009296] text-[28px] text-center text-nowrap tracking-[-0.28px] whitespace-pre">No preservatives</p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <div className="h-0 relative w-[94px]" data-name="line">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 94 1">
                <line stroke="var(--stroke-0, #009296)" x2="94" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic relative shrink-0 text-[#009296] text-[28px] text-center text-nowrap tracking-[-0.28px] whitespace-pre">No artificial colors</p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <div className="h-0 relative w-[94px]" data-name="line">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 94 1">
                <line stroke="var(--stroke-0, #009296)" x2="94" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic relative shrink-0 text-[#009296] text-[28px] text-center text-nowrap tracking-[-0.28px] whitespace-pre">No fillers</p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <div className="h-0 relative w-[94px]" data-name="line">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 94 1">
                <line stroke="var(--stroke-0, #009296)" x2="94" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic relative shrink-0 text-[#009296] text-[28px] text-center text-nowrap tracking-[-0.28px] whitespace-pre">No lubricants</p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <div className="h-0 relative w-[94px]" data-name="line">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 94 1">
                <line stroke="var(--stroke-0, #009296)" x2="94" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic relative shrink-0 text-[#009296] text-[28px] text-center text-nowrap tracking-[-0.28px] whitespace-pre">No stabilizers</p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <div className="h-0 relative w-[94px]" data-name="line">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 94 1">
                <line stroke="var(--stroke-0, #009296)" x2="94" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic relative shrink-0 text-[#009296] text-[28px] text-center text-nowrap tracking-[-0.28px] whitespace-pre">No Fillers</p>
    </div>
  );
}

// 2-Up Module Cards - Helper functions for consistent spacing
function getModuleSpacing(breakpoint: Breakpoint) {
  // Tighter padding on mobile/tablet, more spacious on desktop
  return {
    top: breakpoint === 'S' ? 'top-[30px]' : breakpoint === 'M' ? 'top-[40px]' : 'top-[56px]',
    bottom: breakpoint === 'S' ? 'bottom-[30px]' : breakpoint === 'M' ? 'bottom-[40px]' : 'bottom-[60px]',
    horizontalPadding: breakpoint === 'S' ? 'px-[30px]' : breakpoint === 'M' ? 'px-[40px]' : '',
    borderRadius: breakpoint === 'S' || breakpoint === 'M' ? 'rounded-[10px]' : 'rounded-[20px]',
  };
}

function getModuleTypography(breakpoint: Breakpoint) {
  return {
    size: breakpoint === 'S' || breakpoint === 'M' ? 'text-[24px]' : breakpoint === 'HD' ? 'text-[48px]' : 'text-[34px]',
    tracking: breakpoint === 'S' || breakpoint === 'M' ? 'tracking-[-0.48px]' : breakpoint === 'HD' ? 'tracking-[-0.96px]' : 'tracking-[-0.68px]',
  };
}

// Unified module button component
function ModuleButton({ 
  breakpoint, 
  variant, 
  text 
}: { 
  breakpoint: Breakpoint; 
  variant: 'primary' | 'secondary'; 
  text: string;
}) {
  const spacing = getModuleSpacing(breakpoint);
  const isPrimary = variant === 'primary';
  const bgColor = isPrimary ? 'bg-[#009296]' : 'bg-white';
  const textColor = isPrimary ? 'text-white' : 'text-[#009296]';

  return (
    <div 
      className={`absolute ${bgColor} ${spacing.bottom} box-border content-stretch flex gap-[10px] h-[50px] items-center justify-center left-1/2 px-[39px] py-[15px] rounded-[999px] -translate-x-1/2`} 
      data-name="button"
    >
      <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 ${textColor} text-[16px] text-center text-nowrap tracking-[1.92px] uppercase whitespace-pre`}>
        {text}
      </p>
    </div>
  );
}

// Unified module card component
function ModuleCard({ 
  breakpoint, 
  image, 
  title, 
  buttonText, 
  buttonVariant,
  textColor = 'text-[#003b3c]',
  maxWidth
}: { 
  breakpoint: Breakpoint;
  image: string;
  title: React.ReactNode;
  buttonText: string;
  buttonVariant: 'primary' | 'secondary';
  textColor?: string;
  maxWidth?: { hd: string; default: string };
}) {
  const spacing = getModuleSpacing(breakpoint);
  const typography = getModuleTypography(breakpoint);
  
  // Width calculation: mobile/tablet use full width with padding, desktop uses max-width
  const widthClass = breakpoint === 'S' || breakpoint === 'M'
    ? `w-full ${spacing.horizontalPadding}`
    : maxWidth
    ? (breakpoint === 'HD' ? maxWidth.hd : maxWidth.default)
    : 'w-[552px]';

  const containerClass = breakpoint === 'S'
    ? `aspect-[670/700] w-full overflow-clip relative ${spacing.borderRadius} shrink-0`
    : `aspect-[670/700] basis-0 grow min-h-px min-w-px overflow-clip relative ${spacing.borderRadius} shrink-0`;

  return (
    <div className={containerClass} data-name="module">
      <img 
        alt="" 
        className={`absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none ${spacing.borderRadius} size-full`} 
        src={image} 
      />
      <p 
        className={`absolute font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] left-1/2 text-[0px] ${typography.size} text-center ${textColor} ${spacing.top} ${typography.tracking} -translate-x-1/2 ${widthClass}`}
      >
        {title}
      </p>
      <ModuleButton breakpoint={breakpoint} variant={buttonVariant} text={buttonText} />
    </div>
  );
}

// Module 1: Mother Nature's
function Module({ breakpoint }: { breakpoint: Breakpoint }) {
  return (
    <ModuleCard
      breakpoint={breakpoint}
      image={imgModule}
      buttonText="SHOP OUR SPECIALS"
      buttonVariant="primary"
      maxWidth={{ hd: 'w-[650px]', default: 'w-[552px]' }}
      title={
        <>
          <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#009296]">Mother Nature's</span>
          <span>{` most targeted protective molecules.`}</span>
        </>
      }
    />
  );
}

// Module 2: No false promises
function Module1({ breakpoint }: { breakpoint: Breakpoint }) {
  return (
    <ModuleCard
      breakpoint={breakpoint}
      image={imgModule1}
      buttonText="LEARN MORE"
      buttonVariant="secondary"
      textColor="text-white"
      maxWidth={{ hd: 'w-[540px]', default: 'w-[448px]' }}
      title={
        <>
          <span>
            No false promises,
            <br aria-hidden="true" />
          </span>
          <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#48e1dc]">truth</span>
          <span>{` in every capsule.`}</span>
        </>
      }
    />
  );
}

function Component2Up({ breakpoint }: { breakpoint: Breakpoint }) {
  const flexDirection = breakpoint === 'S' ? 'flex-col' : 'flex-row';
  const padding = breakpoint === 'S' ? 'px-[20px]' : breakpoint === 'M' ? 'px-[30px]' : 'px-[40px]';
  const gap = breakpoint === 'S' || breakpoint === 'M' ? 'gap-[20px]' : 'gap-[20px]';

  return (
    <div className="relative shrink-0 w-full" data-name="2-up">
      <div className="flex flex-row justify-center size-full">
        <div className={`box-border content-stretch flex ${flexDirection} ${gap} items-start justify-center ${padding} py-0 relative w-full`}>
          <Module breakpoint={breakpoint} />
          <Module1 breakpoint={breakpoint} />
        </div>
      </div>
    </div>
  );
}

// Informed Choice Section
const CATEGORY_ITEMS = [
  { img: imgImage, label: "Product Category", id: "product-category" },
  { img: imgImage1, label: "Body Part", id: "body-part" },
  { img: imgImage2, label: "Body Function", id: "body-function" },
  { img: imgImage3, label: "Health Issues", id: "health-issues" },
  { img: imgImage4, label: "Ingredients", id: "ingredients" }
];

function CopyGroup1({ breakpoint }: { breakpoint: Breakpoint }) {
  const headlineSize = breakpoint === 'S' || breakpoint === 'M' ? 'text-[34px]' : breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[54px]' : 'text-[38px]';
  const tracking = breakpoint === 'S' || breakpoint === 'M' ? 'tracking-[-0.68px]' : breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : 'tracking-[-0.76px]';
  const subTextSize = breakpoint === 'HD' || breakpoint === 'XL' ? 'text-[20px]' : 'text-[16px]';
  const subTextTracking = breakpoint === 'HD' || breakpoint === 'XL' ? 'tracking-[-0.2px]' : 'tracking-[-0.16px]';

  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 text-[#003b3c] text-center w-full" data-name="copy GROUP">
      <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 text-[0px] ${headlineSize} ${tracking} w-full`}>
        <span>
          Let us guide you
          <br aria-hidden="true" />
          {`to an `}
        </span>
        <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#009296]">informed</span>
        <span>{` choice.`}</span>
      </p>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 ${subTextSize} ${subTextTracking} w-full`}>Start by selecting an area to explore and discover more about our products and their benefits.</p>
    </div>
  );
}

function ComponentCircle({ img, label, breakpoint, onClick }: { 
  img: string; 
  label: string; 
  breakpoint: Breakpoint;
  onClick?: () => void;
}) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const labelSize = isMobile || isTablet ? 'text-[16px]' : 'text-[20px]';
  const labelTracking = isMobile || isTablet ? 'tracking-[-0.16px]' : 'tracking-[-0.2px]';
  const gap = isMobile || isTablet ? 'gap-[20px]' : 'gap-[40px]';
  const isClickable = !!onClick;
  
  const content = (
    <>
      <div className="aspect-square relative shrink-0 w-full overflow-hidden rounded-full" data-name="image">
        <img 
          alt={label}
          className={`block max-w-none size-full transition-transform duration-300 ease-out ${isClickable ? 'group-hover:scale-110' : ''}`}
          src={img} 
        />
      </div>
      <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 text-[#003b3c] ${labelSize} text-center ${labelTracking} w-full transition-colors duration-300 ease-out ${isClickable ? 'group-hover:text-[#009296]' : ''}`}>
        {label}
      </p>
    </>
  );
  
  if (isClickable) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`View ${label}`}
        className={`content-stretch flex flex-col ${gap} items-center relative shrink-0 ${isMobile ? '' : 'basis-0 grow min-h-px min-w-px'} group cursor-pointer bg-transparent border-0 p-0`}
      >
        {content}
      </button>
    );
  }
  
  return (
    <div className={`content-stretch flex flex-col ${gap} items-center relative shrink-0 ${isMobile ? '' : 'basis-0 grow min-h-px min-w-px'}`}>
      {content}
    </div>
  );
}

function Columns({ breakpoint, onIngredientsClick }: { breakpoint: Breakpoint; onIngredientsClick?: () => void }) {
  const isMobile = breakpoint === 'S';
  
  if (isMobile) {
    // Mobile: First and last items get edge margin for symmetric 20px breathing room
    return (
      <div className="w-full" data-name="columns">
        <div className="flex gap-[16px] overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {CATEGORY_ITEMS.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === CATEGORY_ITEMS.length - 1;
            const isIngredients = item.id === 'ingredients';
            
            return (
              <div 
                key={item.id} 
                className={`snap-start flex-none w-[42%] ${isFirst ? 'ml-[20px]' : ''} ${isLast ? 'mr-[20px]' : ''}`}
              >
                <ComponentCircle 
                  img={item.img} 
                  label={item.label} 
                  breakpoint={breakpoint}
                  onClick={isIngredients ? onIngredientsClick : undefined}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  // Tablet and Desktop: single row of 5, centered
  const gap = breakpoint === 'M' ? 'gap-[12px]' : 'gap-[20px]';
  
  return (
    <div className="flex justify-center w-full" data-name="columns">
      <div className={`content-stretch flex ${gap} items-start relative shrink-0 w-full max-w-[1200px]`}>
        {CATEGORY_ITEMS.map(item => {
          const isIngredients = item.id === 'ingredients';
          return (
            <ComponentCircle 
              key={item.id} 
              img={item.img} 
              label={item.label} 
              breakpoint={breakpoint}
              onClick={isIngredients ? onIngredientsClick : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}

function InformedChoice({ breakpoint, onIngredientsClick }: { breakpoint: Breakpoint; onIngredientsClick?: () => void }) {
  const padding = breakpoint === 'S' ? 'px-0' : breakpoint === 'M' ? 'px-[30px]' : breakpoint === 'HD' ? 'px-[200px]' : breakpoint === 'XL' ? 'px-[180px]' : 'px-[160px]';
  const textPadding = breakpoint === 'S' ? 'px-[20px]' : '';
  const gap = breakpoint === 'S' || breakpoint === 'M' ? 'gap-[40px]' : 'gap-[60px]';

  return (
    <div className="relative shrink-0 w-full" data-name="Informed Choice">
      <div className="flex flex-col items-center size-full">
        <div className={`box-border content-stretch flex flex-col ${gap} items-center ${padding} py-0 relative w-full`}>
          <div className={textPadding}>
            <CopyGroup1 breakpoint={breakpoint} />
          </div>
          <Columns breakpoint={breakpoint} onIngredientsClick={onIngredientsClick} />
          <div className={`h-0 relative shrink-0 w-full ${textPadding}`} data-name="hori line">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 960 1">
                <line stroke="var(--stroke-0, #D9E2E2)" x2="960" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Video Section
function FrameVideoQuote({ breakpoint }: { breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const headlineSize = isMobile ? 'text-[34px]' : isTablet ? 'text-[34px]' : breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[54px]' : 'text-[38px]';
  const tracking = isMobile ? 'tracking-[-0.68px]' : isTablet ? 'tracking-[-0.68px]' : breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : 'tracking-[-0.76px]';
  const quoteSize = isMobile ? 'text-[20px]' : isTablet ? 'text-[18px]' : breakpoint === 'HD' ? 'text-[34px]' : breakpoint === 'XL' ? 'text-[34px]' : 'text-[24px]';
  const quoteTracking = isMobile ? 'tracking-[-0.4px]' : isTablet ? 'tracking-[-0.36px]' : breakpoint === 'HD' ? 'tracking-[-0.68px]' : breakpoint === 'XL' ? 'tracking-[-0.68px]' : 'tracking-[-0.48px]';
  const textAlign = 'text-left';

  return (
    <div className={`content-stretch flex flex-col gap-[30px] items-start relative shrink-0 text-[#003b3c] w-full ${textAlign}`}>
      <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 text-[0px] ${headlineSize} ${tracking} w-full`}>
        <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#009296]">Passionate</span>
        <span>{` about your health and the planet.`}</span>
      </p>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 ${quoteSize} ${quoteTracking} w-full`}>{`"It's not important that you get the products I'm offering, but it's very important that you get the information I'm sharing."`}</p>
    </div>
  );
}

function AndrewSignatureNew({ svgPaths }: { svgPaths: any }) {
  return (
    <div className="h-[56.105px] relative shrink-0 w-[321.972px]" data-name="Andrew Signature NEW">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 322 57">
        <g id="Andrew Signature NEW">
          <path d={svgPaths.p161e9140} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p18bb5700} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p30639200} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p3a40800} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p13c708c0} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p1b1aeb80} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p2933e480} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p1f4b8780} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p1ce2f200} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p11d34600} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p36947f80} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p366f5c80} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p4414900} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p27f86400} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p2df70e80} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.pb72e300} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p1a6f6a80} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p2cc52100} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p2a228e20} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p25448a70} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p3b7e3000} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.pf1e1680} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.pbd15600} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p282731a0} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p1d51fd00} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p2bbada80} fill="var(--fill-0, #009296)" />
        </g>
      </svg>
    </div>
  );
}

function Frame1({ svgPaths, breakpoint }: { svgPaths: any; breakpoint: Breakpoint }) {
  const textSize = breakpoint === 'HD' || breakpoint === 'XL' ? 'text-[20px]' : 'text-[16px]';
  const tracking = breakpoint === 'HD' || breakpoint === 'XL' ? 'tracking-[-0.2px]' : 'tracking-[-0.16px]';
  const alignment = 'items-start';
  const textAlign = 'text-left';
  const width = breakpoint === 'S' ? 'w-full' : 'w-[322.972px]';

  return (
    <div className={`content-stretch flex flex-col gap-[30px] ${alignment} relative shrink-0 ${width}`}>
      <AndrewSignatureNew svgPaths={svgPaths} />
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#003b3c] ${textSize} ${tracking} ${textAlign} w-full`}>- Founder, Procaps Laboratories</p>
    </div>
  );
}

function CopyGroup2({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const gap = isMobile || isTablet ? 'gap-[40px]' : 'gap-[60px]';
  const alignment = isMobile ? 'items-center' : 'items-start';
  const width = isMobile ? 'w-full' : 'basis-0 grow min-h-px min-w-px';

  return (
    <div className={`content-stretch flex flex-col ${gap} ${alignment} relative shrink-0 ${width}`} data-name="copy GROUP">
      <FrameVideoQuote breakpoint={breakpoint} />
      <Frame1 svgPaths={svgPaths} breakpoint={breakpoint} />
    </div>
  );
}

function Play({ svgPaths }: { svgPaths: any }) {
  return (
    <div className="relative shrink-0 size-[91px]" data-name="play">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 91 91">
        <g id="play">
          <circle cx="45.5" cy="45.5" fill="var(--fill-0, white)" fillOpacity="0.15" r="44" stroke="var(--stroke-0, white)" strokeWidth="3" />
          <path d={svgPaths.p3f714600} fill="var(--fill-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function ImageVideo({ svgPaths, breakpoint }: { svgPaths: any; breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const baseClasses = isMobile ? 'w-full' : 'basis-0 grow min-h-px min-w-px';
  const borderRadius = isMobile ? 'rounded-[10px]' : 'rounded-[20px]';
  
  return (
    <div className={`aspect-[667.333/770] box-border content-stretch flex gap-[10px] items-center justify-center relative ${borderRadius} shrink-0 ${baseClasses}`} data-name="image">
      <img alt="" className={`absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none ${borderRadius} size-full`} src={imgImage5} />
      <Play svgPaths={svgPaths} />
    </div>
  );
}

function Columns1({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  
  if (isMobile) {
    // Mobile: Stacked layout - Image, Headline, Quote, Signature
    return (
      <div className="content-stretch flex flex-col gap-[40px] items-center relative w-full px-[20px]" data-name="columns">
        <ImageVideo svgPaths={svgPaths} breakpoint={breakpoint} />
        <CopyGroup2 breakpoint={breakpoint} svgPaths={svgPaths} />
      </div>
    );
  }
  
  // Tablet & Desktop: Side-by-side layout
  const gap = isTablet ? 'gap-[60px]' : breakpoint === 'HD' ? 'gap-[200px]' : breakpoint === 'XL' ? 'gap-[190px]' : 'gap-[180px]';
  const padding = isTablet ? 'px-[30px]' : '';

  return (
    <div className={`basis-0 content-stretch flex ${gap} grow items-center min-h-px min-w-px relative shrink-0 ${padding}`} data-name="columns">
      <CopyGroup2 breakpoint={breakpoint} svgPaths={svgPaths} />
      <ImageVideo svgPaths={svgPaths} breakpoint={breakpoint} />
    </div>
  );
}

function VideoSection({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile || isTablet 
    ? 'px-0 py-[60px]' 
    : breakpoint === 'HD' 
    ? 'px-[40px] py-[80px]' 
    : breakpoint === 'XL' 
    ? 'px-[40px] py-[70px]' 
    : 'px-[40px] py-[60px]';

  return (
    <div className="bg-[#f6f2ec] relative shrink-0 w-full" data-name="video">
      <div className="flex flex-row items-center w-full">
        <div className={`box-border content-stretch flex items-center justify-between ${padding} relative w-full`}>
          <Columns1 breakpoint={breakpoint} svgPaths={svgPaths} />
        </div>
      </div>
    </div>
  );
}

// PHACT Section
function Image1() {
  return (
    <div className="aspect-[720/720] basis-0 grow min-h-px min-w-px relative shrink-0" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage6} />
    </div>
  );
}

function Icon1({ svgPaths }: { svgPaths: any }) {
  return (
    <div className="relative shrink-0 size-[102.845px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 103 103">
        <g id="icon">
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

function Copy1({ breakpoint }: { breakpoint: Breakpoint }) {
  const headlineSize = breakpoint === 'HD' ? 'text-[54px]' : breakpoint === 'XL' ? 'text-[38px]' : 'text-[34px]';
  const tracking = breakpoint === 'HD' ? 'tracking-[-1.08px]' : breakpoint === 'XL' ? 'tracking-[-0.76px]' : 'tracking-[-0.68px]';
  const subTextSize = breakpoint === 'HD' || breakpoint === 'XL' ? 'text-[20px]' : 'text-[16px]';
  const subTextTracking = breakpoint === 'HD' || breakpoint === 'XL' ? 'tracking-[-0.2px]' : 'tracking-[-0.16px]';

  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 text-[#003b3c] w-full" data-name="copy">
      <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 text-[0px] ${headlineSize} ${tracking} w-full`}>
        <span>
          The most rigorously tested,
          <br aria-hidden="true" />
        </span>
        <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#009296]">all-in-one</span>
        <span>{` cleansing experience.`}</span>
      </p>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 ${subTextSize} ${subTextTracking} w-full`}>Enjoy a rich, foamy lather that gently cleanses, moisturizes and does not damage your skin's natural protective barriers, all with just four gentle plant-based ingredients.</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#009296] box-border content-stretch flex gap-[10px] h-[50px] items-center justify-center px-[39px] py-[15px] relative rounded-[999px] shrink-0" data-name="button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[1.92px] uppercase whitespace-pre">SHOP PHACT</p>
    </div>
  );
}

function CopyGroup3({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start justify-center relative shrink-0 w-full" data-name="copy Group">
      <Icon1 svgPaths={svgPaths} />
      <Copy1 breakpoint={breakpoint} />
      <Button4 />
    </div>
  );
}

function Right({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const padding = breakpoint === 'HD' ? 'pl-[80px] pr-[130px] py-[100px]' : breakpoint === 'XL' ? 'pl-[70px] pr-[120px] py-[95px]' : 'pl-[60px] pr-[110px] py-[90px]';

  return (
    <div className="aspect-[1146/1146] basis-0 bg-[#f6f2ec] grow min-h-px min-w-px relative shrink-0" data-name="right">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className={`aspect-[1146/1146] box-border content-stretch flex flex-col gap-[10px] items-start justify-center ${padding} relative size-full`}>
          <CopyGroup3 breakpoint={breakpoint} svgPaths={svgPaths} />
        </div>
      </div>
    </div>
  );
}

function Frame3({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  return (
    <div className="basis-0 content-stretch flex grow items-start justify-center min-h-px min-w-px overflow-clip relative rounded-[20px] self-stretch shrink-0">
      <Image1 />
      <Right breakpoint={breakpoint} svgPaths={svgPaths} />
    </div>
  );
}

function PhactSection({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  return (
    <div className="relative shrink-0 w-full" data-name="phact 1920">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex items-start justify-center px-[40px] py-0 relative w-full">
          <Frame3 breakpoint={breakpoint} svgPaths={svgPaths} />
        </div>
      </div>
    </div>
  );
}

// Procaps Difference Video Section
function ProcapsDifferenceVideo({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const headlineSize = breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[54px]' : 'text-[38px]';
  const headlineTracking = breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : 'tracking-[-0.76px]';
  const labelSize = breakpoint === 'HD' || breakpoint === 'XL' ? 'text-[34px]' : 'text-[24px]';
  const labelTracking = breakpoint === 'HD' || breakpoint === 'XL' ? 'tracking-[-0.34px]' : 'tracking-[-0.24px]';
  const bodySize = breakpoint === 'HD' || breakpoint === 'XL' ? 'text-[20px]' : 'text-[16px]';
  const bodyTracking = breakpoint === 'HD' || breakpoint === 'XL' ? 'tracking-[-0.4px]' : 'tracking-[-0.32px]';
  const padding = breakpoint === 'HD' ? 'px-[200px]' : breakpoint === 'XL' ? 'px-[150px]' : 'px-[100px]';

  return (
    <div className={`flex flex-col items-center py-[60px] ${padding} w-full`}>
      <div className="flex flex-col items-center gap-[120px] max-w-[1060px] w-full">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-[50px] w-full max-w-[900px]">
          {/* Label with underline */}
          <div className="flex flex-col items-center gap-[30px]">
            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#009296] ${labelSize} ${labelTracking} text-center`}>
              The Procaps Difference
            </p>
            <div className="w-[100px] h-[1px] bg-[#009296]" />
          </div>

          {/* Copy */}
          <div className="flex flex-col items-center gap-[30px] text-center w-full">
            <h2 className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[#003b3c] ${headlineSize} ${headlineTracking}`}>
              Evolving with science, maximizing efficacy for you.
            </h2>
            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#003b3c] ${bodySize} ${bodyTracking}`}>
              At Procaps Labs, innovation is at the heart of everything we do. Just as science is always advancing, we remain committed to evolving alongside it. With each new discovery, we refine our formulas to ensure they reflect the latest scientific breakthroughs. Our dedication to progress allows us to create the most effective, research-backed products possible.
            </p>
          </div>

          {/* Button */}
          <button className="flex items-center justify-center h-[50px] px-[39px] py-[15px] rounded-full border border-[#009296]">
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[#009296] text-[16px] tracking-[1.92px] uppercase">
              LEARN MORE
            </span>
          </button>
        </div>

        {/* Video */}
        <div className="relative w-full aspect-[1060/658] bg-[#c4c4c4] rounded-[20px] flex items-center justify-center">
          <div className="size-[91px]">
            <svg className="block size-full" fill="none" viewBox="0 0 91 91">
              <circle cx="45.5" cy="45.5" fill="white" fillOpacity="0.15" r="44" stroke="white" strokeWidth="3" />
              <path d={svgPaths.p3f714600} fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Body Group
function BodyGroup({ breakpoint, svgPaths, onIngredientsClick }: { breakpoint: Breakpoint; svgPaths: any; onIngredientsClick?: () => void }) {
  const verticalSpacing = breakpoint === 'S' ? 'py-[60px] gap-[60px]' : 'py-[80px] gap-[80px]';

  return (
    <div className={`box-border content-stretch flex flex-col items-center px-0 relative shrink-0 w-full ${verticalSpacing}`} data-name="body group">
      <TickerScroll />
      <Component2Up breakpoint={breakpoint} />
      <InformedChoice breakpoint={breakpoint} onIngredientsClick={onIngredientsClick} />
      <VitaminSpecialist breakpoint={breakpoint} />
      <VideoSection breakpoint={breakpoint} svgPaths={svgPaths} />
      <PhactSection breakpoint={breakpoint} svgPaths={svgPaths} />
      <ProcapsDifferenceVideo breakpoint={breakpoint} svgPaths={svgPaths} />
    </div>
  );
}