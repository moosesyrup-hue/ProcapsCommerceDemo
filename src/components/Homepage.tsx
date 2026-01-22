import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Leaf, Check } from 'lucide-react';
import svgPathsL from "../imports/svg-npcn6vymav";
import svgPathsXl from "../imports/svg-ovhudlxac5";
import svgPathsHd from "../imports/svg-sng3ceu5u2";
import VitaminSpecialist from './VitaminSpecialistSection';
import PhactSection from './PhactSection';
import ProcapsDifferenceSection from './ProcapsDifferenceSection';
import TickerTape from './TickerTape';
import Slider from 'react-slick';
import HighestReviewedProducts from './HighestReviewedProducts';
import imgBanner from "figma:asset/be6b296809b899ffe49a39b24634e1a5d4abb146.png";
import imgBannerMobile from "figma:asset/75fc2edc3d254e5f5f699438d8eaeb81a1ab5fd7.png";
import imgBannerTablet from "figma:asset/84ce49373bbc690f8c23b2d25b68fd6aedbf8176.png";
import imgPhactBanner from "figma:asset/5a5f96028d316f191aab6e45927bd4f65654ab16.png";
import imgPhactBannerMobile from "figma:asset/d200b64011991f9d4d5cd6c122ce6fd49a8847bd.png";
import imgVitaminsBanner from "figma:asset/c8d66f8a00fa97643f42ab2afa1531d42d26e4fb.png";
import imgChocolateBanner from "figma:asset/206eaec0d4c50016e5ef2fb0ef60d883b8f31d16.png";
import imgChocolateBannerMobile from "figma:asset/fde165d1920259e64f3feee84ace2aa76de0fb10.png";
import imgSecureBanner from "figma:asset/bc0fb1459b829d0511fff53dd58163957f0b087d.png";
import imgSecureBannerFrame from "figma:asset/f02fb39b988fbbc9d1b43dbaaf01bfc7d49a48ae.png";
import imgSecureBannerCoconut from "figma:asset/ad3335c6a2281c7a5193c5575b34bf508794f240.png";
import imgSecureBannerChocolate from "figma:asset/711cd4839a250bd5914a64839b158641184d0906.png";
import imgSecureBannerPeanutButter from "figma:asset/25603b452c1be150f86bb15ca90c33c01c39a1e9.png";
import imgSecureBannerMobileFrame from "figma:asset/69ce816a12d98857bcf36a4b8ae5fb0886eebce4.png";
import imgSecureBannerMobileCoconut from "figma:asset/241abfa44ce3e91fc26a2aedc158e450ab73f8fb.png";
import imgSecureBannerMobileChocolate from "figma:asset/0a9c72bd5282a739332bd87d6fc69f443f183dc3.png";
import imgSecureBannerMobilePeanutButter from "figma:asset/e6406a5363b70a53311bcb63de55205548ec0811.png";
import imgModule from "figma:asset/4c2934de3dbf27b37b800c210c506dfc23cea7d9.png";
import imgModule1 from "figma:asset/bb079113e4e52e6f124be3a8b4815c8ab2dbad6d.png";
import imgImage from "figma:asset/2af175d1ace132d63709b5990887874d1e9098a5.png";
import imgImage1 from "figma:asset/e98d5399b4df9f21e58d7b3e829fa1be0652fdec.png";
import imgImage2 from "figma:asset/843a93f0744d908e4670d5a4585c5f1c7432e6f0.png";
import imgImage3 from "figma:asset/33d29cd45c53175dde8ab15537ea7417446bf54d.png";
import imgImage4 from "figma:asset/ae9200ae275214fab21ea17e682459720b9ddfa8.png";
import imgImage5 from "figma:asset/53da6d9ed35f82a7364b7a236e964b3d87a96086.png";

type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

export default function Homepage({ onFindSupplementsClick, onIngredientsClick, onOurStoryClick, onCategoryClick }: { 
  onFindSupplementsClick?: () => void;
  onIngredientsClick?: () => void;
  onOurStoryClick?: () => void;
  onCategoryClick?: (categoryId: string) => void;
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
      <Banner breakpoint={breakpoint} svgPaths={svgPaths} onOurStoryClick={onOurStoryClick} />
      <BodyGroup 
        breakpoint={breakpoint} 
        svgPaths={svgPaths} 
        onIngredientsClick={onIngredientsClick}
        onCategoryClick={onCategoryClick}
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
    headlineSize: breakpoint === 'HD' ? 'text-7xl' : breakpoint === 'XL' ? 'text-6xl' : 'text-4xl',
    headlineTracking: breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : 'tracking-[-0.76px]',
    subheadSize: isDesktop ? 'text-[20px]' : 'text-base',
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
      <p className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic leading-[1.4] relative shrink-0 text-[#003b3c] text-lg text-center text-nowrap whitespace-pre">
        50,000+ verified 5-star reviews
      </p>
    </div>
  );
}

// Banner headline with responsive text - Slide 1 (Supplements)
function BannerHeadline({ breakpoint }: { breakpoint: Breakpoint }) {
  const typography = getBannerTypography(breakpoint);
  const isMobile = breakpoint === 'S';
  const showSubtext = !isMobile;
  const nowrapClasses = isMobile ? '' : 'text-nowrap whitespace-pre';

  return (
    <div className={`content-stretch flex flex-col gap-[20px] items-center relative shrink-0 text-[#003b3c] text-center ${nowrapClasses} w-full`}>
      <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 ${typography.headlineSize} ${typography.headlineTracking}`}>
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

// Banner headline for Slide 2 (pHact Soap)
function PhactBannerHeadline({ breakpoint }: { breakpoint: Breakpoint }) {
  const typography = getBannerTypography(breakpoint);
  const isMobile = breakpoint === 'S';
  const nowrapClasses = isMobile ? '' : 'text-nowrap whitespace-pre';
  const textAlign = isMobile ? 'text-center items-center' : 'text-left items-start';
  const subTextSize = isMobile ? 'text-base' : (breakpoint === 'HD' || breakpoint === 'XL' ? 'text-[20px]' : 'text-base');

  return (
    <div className={`content-stretch flex flex-col gap-[20px] relative shrink-0 text-[#003b3c] ${textAlign} ${nowrapClasses} w-full`}>
      <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 ${typography.headlineSize} ${typography.headlineTracking}`}>
        <span>
          The cleansing bar{isMobile ? ' ' : ''}
          {!isMobile && <br aria-hidden="true" />}
          {`that `}
        </span>
        <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#009296]">
          redefines
        </span>
        <span>{` clean!`}</span>
      </p>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 ${subTextSize}`}>
        Say hello to Hint of Cucumber.
      </p>
    </div>
  );
}

// Banner headline for Slide 3 (Chocolate)
function ChocolateBannerHeadline({ breakpoint }: { breakpoint: Breakpoint }) {
  const typography = getBannerTypography(breakpoint);
  const isMobile = breakpoint === 'S';
  const nowrapClasses = isMobile ? '' : 'text-nowrap whitespace-pre';
  const textAlign = isMobile ? 'text-center items-center' : 'text-left items-start';
  const subTextSize = isMobile ? 'text-base' : (breakpoint === 'HD' || breakpoint === 'XL' ? 'text-[20px]' : 'text-base');
  const labelSize = isMobile ? 'text-[16px]' : 'text-xl';

  return (
    <div className={`content-stretch flex flex-col relative shrink-0 text-[#003b3c] ${textAlign} ${nowrapClasses} w-full`}>
      {/* Monthly Special Label */}
      <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.2] text-[#009296] ${labelSize} tracking-[1px] uppercase mb-[30px]`}>
        Monthly Special
      </p>
      
      <div className="flex flex-col gap-[20px]">
        <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 ${typography.headlineSize} ${typography.headlineTracking}`}>
          <span>
            The healthiest way to{isMobile ? ' ' : ''}
            {!isMobile && <br aria-hidden="true" />}
          </span>
          <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#009296]">
            indulge
          </span>
          <span>{` this season!`}</span>
        </p>
        <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 ${subTextSize}`}>
          The world's best dark chocolate—also the healthiest.
        </p>
      </div>
    </div>
  );
}

// Banner headline for Slide 4 (Secure Bar)
function SecureBannerHeadline({ breakpoint }: { breakpoint: Breakpoint }) {
  const typography = getBannerTypography(breakpoint);
  const isMobile = breakpoint === 'S';
  const nowrapClasses = isMobile ? '' : 'text-nowrap whitespace-pre';
  const textAlign = isMobile ? 'text-center items-center' : 'text-left items-start';
  const subTextSize = isMobile ? 'text-base' : (breakpoint === 'HD' || breakpoint === 'XL' ? 'text-[20px]' : 'text-base');
  const labelSize = isMobile ? 'text-[16px]' : 'text-xl';

  return (
    <div className={`content-stretch flex flex-col relative shrink-0 text-[#003b3c] ${textAlign} ${nowrapClasses} w-full`}>
      {/* Monthly Special Label */}
      <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.2] text-[#009296] ${labelSize} tracking-[1px] uppercase mb-[30px]`}>
        Monthly Special
      </p>
      
      <div className="flex flex-col gap-[20px]">
        <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 ${typography.headlineSize} ${typography.headlineTracking}`}>
          <span>Who said </span>
          <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#009296]">
            healthy
          </span>
          {!isMobile && <br aria-hidden="true" />}
          <span>{isMobile ? " can't be delicious." : "can't be delicious."}</span>
        </p>
        <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 ${subTextSize}`}>
          Secure completely reinvents the category.
        </p>
      </div>
    </div>
  );
}

// Reusable CTA button - modified to accept text
function BannerButton({ onClick, children = "Our Story" }: { onClick?: () => void; children?: string }) {
  return <Button variant="primary" onClick={onClick}>{children}</Button>;
}

// Carousel navigation dots - now functional
function CarouselDots({ breakpoint, currentSlide, totalSlides, onDotClick }: { 
  breakpoint: Breakpoint; 
  currentSlide: number; 
  totalSlides: number; 
  onDotClick: (index: number) => void;
}) {
  const spacing = getBannerSpacing(breakpoint);

  return (
    <div className={`absolute ${spacing.dotsBottom} flex gap-[11px] ${spacing.dotsLeft} z-10`} data-name="carousel dots">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
          className="w-[13px] h-[13px] p-0 bg-transparent border-0 cursor-pointer"
        >
          {index === currentSlide ? (
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="6.5" fill="#003B3C" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="6" stroke="#003B3C" strokeWidth="1" />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
}

// Small circular NEW badge for pHact banner
function NewBadge({ breakpoint }: { breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const size = isMobile ? 'w-[60px] h-[60px]' : 'w-[80px] h-[80px]';
  const fontSize = isMobile ? 'text-sm' : 'text-base';
  
  return (
    <div className={`${size} rounded-full border-2 border-[#009296] bg-white flex items-center justify-center`}>
      <p className={`font-['Inter:SemiBold',sans-serif] font-semibold leading-[1] text-[#009296] ${fontSize} tracking-[1px]`}>
        NEW
      </p>
    </div>
  );
}

// Monthly Special badge for chocolate banner
function MonthlySpecialBadge({ breakpoint }: { breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const size = isMobile ? 'w-[140px] h-[140px]' : 'w-[160px] h-[160px]';
  const fontSize = isMobile ? 'text-lg' : 'text-lg';
  
  return (
    <div className={`${size} rounded-full border-2 border-[#009296] bg-white flex flex-col items-center justify-center gap-[2px]`}>
      <p className={`font-['Inter:SemiBold',sans-serif] font-semibold leading-[1] text-[#009296] ${fontSize} tracking-[1px]`}>
        MONTHLY
      </p>
      <p className={`font-['Inter:SemiBold',sans-serif] font-semibold leading-[1] text-[#009296] ${fontSize} tracking-[1px]`}>
        SPECIAL
      </p>
    </div>
  );
}

// Banner content overlay for Slide 1 - Supplements
function BannerContent1({ breakpoint, onOurStoryClick, isActive }: { breakpoint: Breakpoint; onOurStoryClick?: () => void; isActive: boolean }) {
  const spacing = getBannerSpacing(breakpoint);
  const isMobile = breakpoint === 'S';
  // +5px offset to optically center content on desktop (accounts for visual weight)
  const horizontalPos = isMobile ? 'left-0 translate-x-0' : 'left-[calc(50%+5px)] -translate-x-1/2';

  return (
    <div className={`absolute content-stretch flex flex-col gap-[30px] items-center ${horizontalPos} ${spacing.contentTop} ${spacing.contentWidth} pointer-events-none`}>
      <div className={isActive ? 'banner-animate-1' : 'opacity-0'}>
        <FiveStarRating svgPaths={svgPathsL} breakpoint={breakpoint} />
      </div>
      <div className={isActive ? 'banner-animate-2' : 'opacity-0'}>
        <BannerHeadline breakpoint={breakpoint} />
      </div>
      <div className={`${isActive ? 'banner-animate-3' : 'opacity-0'} pointer-events-auto`}>
        <BannerButton onClick={onOurStoryClick}>Our Story</BannerButton>
      </div>
    </div>
  );
}

// Banner content overlay for Slide 2 - pHact Soap
function BannerContent2({ breakpoint, isActive }: { breakpoint: Breakpoint; isActive: boolean }) {
  const spacing = getBannerSpacing(breakpoint);
  const isMobile = breakpoint === 'S';
  
  // Mobile: centered and top-aligned like vitamins banner
  if (isMobile) {
    return (
      <div className={`absolute content-stretch flex flex-col gap-[30px] items-center left-0 translate-x-0 ${spacing.contentTop} ${spacing.contentWidth} pointer-events-none`}>
        <div className={isActive ? 'banner-animate-2' : 'opacity-0'}>
          <PhactBannerHeadline breakpoint={breakpoint} />
        </div>
        <div className={`${isActive ? 'banner-animate-3' : 'opacity-0'} pointer-events-auto`}>
          <BannerButton>SHOP NOW</BannerButton>
        </div>
      </div>
    );
  }
  
  // Desktop/Tablet: left-aligned and vertically centered
  return (
    <div className={`absolute content-stretch flex flex-col gap-[30px] items-start left-0 top-1/2 -translate-y-1/2 pl-[40px] pointer-events-none`}>
      <div className={isActive ? 'banner-animate-2' : 'opacity-0'}>
        <PhactBannerHeadline breakpoint={breakpoint} />
      </div>
      <div className={`${isActive ? 'banner-animate-3' : 'opacity-0'} pointer-events-auto`}>
        <BannerButton>SHOP NOW</BannerButton>
      </div>
    </div>
  );
}

// Banner content overlay for Slide 3 - Chocolate
function BannerContent3({ breakpoint, isActive }: { breakpoint: Breakpoint; isActive: boolean }) {
  const spacing = getBannerSpacing(breakpoint);
  const isMobile = breakpoint === 'S';
  const benefitSize = breakpoint === 'HD' ? 'text-lg' : 'text-base';
  const benefitTracking = breakpoint === 'HD' ? 'tracking-[-0.2px]' : 'tracking-[-0.16px]';
  
  // Mobile: centered and top-aligned like vitamins banner
  if (isMobile) {
    return (
      <div className={`absolute content-stretch flex flex-col gap-[30px] items-center left-0 translate-x-0 ${spacing.contentTop} ${spacing.contentWidth} pointer-events-none`}>
        <div className={isActive ? 'banner-animate-2' : 'opacity-0'}>
          <ChocolateBannerHeadline breakpoint={breakpoint} />
        </div>
        <div className={`${isActive ? 'banner-animate-3' : 'opacity-0'} pointer-events-auto`}>
          <BannerButton>SHOP NOW</BannerButton>
        </div>
      </div>
    );
  }
  
  // Desktop/Tablet: left-aligned and vertically centered
  return (
    <div className={`absolute content-stretch flex flex-col gap-[30px] items-start left-0 top-1/2 -translate-y-1/2 pl-[40px] pointer-events-none`}>
      <div className={isActive ? 'banner-animate-2' : 'opacity-0'}>
        <ChocolateBannerHeadline breakpoint={breakpoint} />
      </div>
      <div className={`${isActive ? 'banner-animate-3' : 'opacity-0'} pointer-events-auto`}>
        <BannerButton>SHOP NOW</BannerButton>
      </div>
      <div className={`${isActive ? 'banner-animate-4' : 'opacity-0'} mt-[30px]`}>
        <div className={`flex items-center gap-[10px] text-[#009296] font-['Inter:Regular',sans-serif] font-normal leading-[1.4] ${benefitSize} ${benefitTracking}`}>
          <Leaf className="w-[18px] h-[18px] text-[#009296] shrink-0" strokeWidth={2.5} />
          <span>Heart-healthy plant sterols in a delicious dark chocolate.</span>
        </div>
      </div>
    </div>
  );
}

// Banner content overlay for Slide 4 - Secure Bar
function BannerContent4({ breakpoint, isActive }: { breakpoint: Breakpoint; isActive: boolean }) {
  const spacing = getBannerSpacing(breakpoint);
  const isMobile = breakpoint === 'S';
  const benefitSize = breakpoint === 'HD' ? 'text-lg' : 'text-base';
  const benefitTracking = breakpoint === 'HD' ? 'tracking-[-0.2px]' : 'tracking-[-0.16px]';
  
  // Mobile: centered and top-aligned like vitamins banner
  if (isMobile) {
    return (
      <div className={`absolute content-stretch flex flex-col gap-[30px] items-center left-0 translate-x-0 ${spacing.contentTop} ${spacing.contentWidth} pointer-events-none`}>
        <div className={isActive ? 'banner-animate-2' : 'opacity-0'}>
          <SecureBannerHeadline breakpoint={breakpoint} />
        </div>
        <div className={`${isActive ? 'banner-animate-3' : 'opacity-0'} pointer-events-auto`}>
          <BannerButton>SHOP NOW</BannerButton>
        </div>
      </div>
    );
  }
  
  // Desktop/Tablet: left-aligned and vertically centered
  return (
    <div className={`absolute content-stretch flex flex-col gap-[30px] items-start left-0 top-1/2 -translate-y-1/2 pl-[40px] pointer-events-none`}>
      <div className={isActive ? 'banner-animate-2' : 'opacity-0'}>
        <SecureBannerHeadline breakpoint={breakpoint} />
      </div>
      <div className={`${isActive ? 'banner-animate-3' : 'opacity-0'} pointer-events-auto`}>
        <BannerButton>SHOP NOW</BannerButton>
      </div>
      <div className={`${isActive ? 'banner-animate-4' : 'opacity-0'} mt-[30px]`}>
        <div className={`flex items-center gap-[10px] text-[#009296] font-['Inter:Regular',sans-serif] font-normal leading-[1.4] ${benefitSize} ${benefitTracking}`}>
          <Check className="w-[18px] h-[18px] text-[#009296] shrink-0" strokeWidth={2.5} />
          <span>Available in Original and Sugar-Free varieties!</span>
        </div>
      </div>
    </div>
  );
}

// Subtle snow animation - only animates when active
function SnowAnimation({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;
  
  // Create 80 snowflakes with varying sizes, positions, and animation durations
  const snowflakes = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 3 + Math.random() * 7, // 3-10px
    duration: 6 + Math.random() * 9, // 6-15 seconds
    delay: Math.random() * 8, // 0-8 seconds
    drift: -30 + Math.random() * 60, // -30px to 30px horizontal drift
    blur: 1 + Math.random() * 2, // 1-3px blur for soft edges
  }));

  return (
    <>
      <style>{`
        ${snowflakes.map((flake) => `
          @keyframes snowfall-${flake.id} {
            0% {
              transform: translateY(-10px) translateX(0px);
              opacity: 0;
            }
            10% {
              opacity: 0.85;
            }
            90% {
              opacity: 0.85;
            }
            100% {
              transform: translateY(100vh) translateX(${flake.drift}px);
              opacity: 0;
            }
          }
        `).join('\n')}
      `}</style>
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden" 
        style={{ 
          maskImage: 'linear-gradient(to bottom, white 0%, white 45%, transparent 60%)',
          WebkitMaskImage: 'linear-gradient(to bottom, white 0%, white 45%, transparent 60%)',
        }}
      >
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute rounded-full bg-white"
            style={{
              left: flake.left,
              top: '-10px',
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              filter: `blur(${flake.blur}px)`,
              opacity: 0.85,
              animationName: `snowfall-${flake.id}`,
              animationDuration: `${flake.duration}s`,
              animationTimingFunction: 'linear',
              animationDelay: `${flake.delay}s`,
              animationIterationCount: 'infinite',
            }}
          />
        ))}
      </div>
    </>
  );
}

// Rotating Secure Banner - alternates between three flavors (desktop only)
function RotatingSecureBanner({ isActive, breakpoint }: { isActive: boolean; breakpoint: Breakpoint }) {
  const [currentFlavor, setCurrentFlavor] = useState(0);
  
  useEffect(() => {
    if (!isActive) return;
    
    // Reset to first flavor when becoming active
    setCurrentFlavor(0);
    
    const interval = setInterval(() => {
      setCurrentFlavor(prev => (prev + 1) % 3); // 3 flavors now
    }, 4000); // 4 seconds per flavor
    
    return () => clearInterval(interval);
  }, [isActive]);
  
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  
  // For tablet, show static image (handled by BannerSlide's fallback)
  if (isTablet) {
    return <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgSecureBanner} />;
  }
  
  // Select images based on breakpoint
  const frameImage = isMobile ? imgSecureBannerMobileFrame : imgSecureBannerFrame;
  const chocolateImage = isMobile ? imgSecureBannerMobileChocolate : imgSecureBannerChocolate;
  const coconutImage = isMobile ? imgSecureBannerMobileCoconut : imgSecureBannerCoconut;
  const peanutButterImage = isMobile ? imgSecureBannerMobilePeanutButter : imgSecureBannerPeanutButter;
  
  // Mobile: natural aspect ratio like other mobile banners
  if (isMobile) {
    return (
      <div className="relative w-full">
        {/* Invisible sizer image to maintain aspect ratio */}
        <img 
          alt="" 
          className="w-full h-auto block opacity-0"
          src={chocolateImage}
          aria-hidden="true"
        />
        
        {/* Background color layer - #F7F2EC */}
        <div className="absolute inset-0 bg-[#F7F2EC]" />
        
        {/* Layer 1: Rotating bar variants with crossfade (Chocolate Brownie Almond) */}
        <img 
          alt="Secure Bar - Chocolate Brownie Almond Crunch" 
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ease-in-out"
          src={chocolateImage}
          style={{ opacity: currentFlavor === 0 ? 1 : 0 }}
        />
        
        {/* Layer 2: Rotating bar variants with crossfade (Coconut Almond Cookie) */}
        <img 
          alt="Secure Bar - Coconut Almond Cookie Crunch" 
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ease-in-out"
          src={coconutImage}
          style={{ opacity: currentFlavor === 1 ? 1 : 0 }}
        />
        
        {/* Layer 3: Rotating bar variants with crossfade (Peanut Butter Chocolate Chip) */}
        <img 
          alt="Secure Bar - Peanut Butter Chocolate Chip" 
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ease-in-out"
          src={peanutButterImage}
          style={{ opacity: currentFlavor === 2 ? 1 : 0 }}
        />
        
        {/* Layer 4: Static chocolate chunk frame (always visible on top) */}
        <img 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={frameImage}
        />
      </div>
    );
  }
  
  // Desktop: fixed proportional height
  return (
    <>
      {/* Background color layer - #F7F2EC */}
      <div className="absolute inset-0 bg-[#F7F2EC]" />
      
      {/* Layer 1: Rotating bar variants with crossfade (Chocolate Brownie Almond) */}
      <img 
        alt="Secure Bar - Chocolate Brownie Almond Crunch" 
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ease-in-out"
        src={chocolateImage}
        style={{ opacity: currentFlavor === 0 ? 1 : 0 }}
      />
      
      {/* Layer 2: Rotating bar variants with crossfade (Coconut Almond Cookie) */}
      <img 
        alt="Secure Bar - Coconut Almond Cookie Crunch" 
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ease-in-out"
        src={coconutImage}
        style={{ opacity: currentFlavor === 1 ? 1 : 0 }}
      />
      
      {/* Layer 3: Rotating bar variants with crossfade (Peanut Butter Chocolate Chip) */}
      <img 
        alt="Secure Bar - Peanut Butter Chocolate Chip" 
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ease-in-out"
        src={peanutButterImage}
        style={{ opacity: currentFlavor === 2 ? 1 : 0 }}
      />
      
      {/* Layer 4: Static chocolate chunk frame (always visible on top) */}
      <img 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={frameImage}
      />
    </>
  );
}

// Single slide component
function BannerSlide({ 
  image, 
  content, 
  breakpoint,
  showSnow = false,
  rotatingBackground = null,
  isActive = false
}: { 
  image: string; 
  content: React.ReactNode; 
  breakpoint: Breakpoint;
  showSnow?: boolean;
  rotatingBackground?: React.ReactNode;
  isActive?: boolean;
}) {
  const isMobileOrTablet = breakpoint === 'S' || breakpoint === 'M';
  
  if (isMobileOrTablet) {
    return (
      <div className="relative shrink-0 w-full" data-name="banner-slide">
        {rotatingBackground ? rotatingBackground : (
          <img alt="" className="w-full h-auto block" src={image} />
        )}
        {showSnow && <SnowAnimation isActive={true} />}
        <div className="absolute inset-0 pointer-events-none">
          {content}
        </div>
      </div>
    );
  }
  
  // Desktop: Use proportional height approach
  return (
    <div className="relative shrink-0 w-full h-[43.06vw]" data-name="banner-slide">
      {rotatingBackground ? rotatingBackground : (
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={image} />
      )}
      {showSnow && <SnowAnimation isActive={true} />}
      {content}
    </div>
  );
}

function Banner({ breakpoint, svgPaths, onOurStoryClick }: { breakpoint: Breakpoint; svgPaths: any; onOurStoryClick?: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  let sliderRef: Slider | null = null;
  
  // Slide visibility configuration - set to true/false to show/hide slides
  const slideConfig = {
    supplements: true,
    chocolate: true,
    soap: false,        // Set to false to hide the soap banner
    secure: true,
  };
  
  // Calculate active slide indices dynamically
  const activeSlides: string[] = [];
  if (slideConfig.supplements) activeSlides.push('supplements');
  if (slideConfig.chocolate) activeSlides.push('chocolate');
  if (slideConfig.soap) activeSlides.push('soap');
  if (slideConfig.secure) activeSlides.push('secure');
  
  const totalActiveSlides = activeSlides.length;
  const getSlideIndex = (slideName: string) => activeSlides.indexOf(slideName);
  
  // Image selection based on breakpoint
  const vitaminsImage = breakpoint === 'S' ? imgBannerMobile : breakpoint === 'M' ? imgBannerTablet : imgVitaminsBanner;
  const soapImage = breakpoint === 'S' ? imgPhactBannerMobile : breakpoint === 'M' ? imgBannerTablet : imgPhactBanner;
  const chocolateImage = breakpoint === 'S' ? imgChocolateBannerMobile : breakpoint === 'M' ? imgBannerTablet : imgChocolateBanner;
  const secureImage = breakpoint === 'S' ? imgBannerMobile : breakpoint === 'M' ? imgBannerTablet : imgSecureBanner;
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 15000, // 15 seconds to accommodate 3-flavor cycle (3 × 4s = 12s)
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
  };
  
  const handleDotClick = (index: number) => {
    if (sliderRef) {
      sliderRef.slickGoTo(index);
    }
  };
  
  return (
    <div className="relative w-full" data-name="banner">
      <Slider ref={(slider) => { sliderRef = slider; }} {...settings}>
        {/* Slide 1: Supplements */}
        {slideConfig.supplements && (
          <BannerSlide
            image={vitaminsImage}
            breakpoint={breakpoint}
            content={<BannerContent1 breakpoint={breakpoint} onOurStoryClick={onOurStoryClick} isActive={currentSlide === getSlideIndex('supplements')} />}
          />
        )}
        
        {/* Slide 2: Chocolate */}
        {slideConfig.chocolate && (
          <BannerSlide
            image={chocolateImage}
            breakpoint={breakpoint}
            content={<BannerContent3 breakpoint={breakpoint} isActive={currentSlide === getSlideIndex('chocolate')} />}
            showSnow={true}
          />
        )}
        
        {/* Slide 3: pHact Soap */}
        {slideConfig.soap && (
          <BannerSlide
            image={soapImage}
            breakpoint={breakpoint}
            content={<BannerContent2 breakpoint={breakpoint} isActive={currentSlide === getSlideIndex('soap')} />}
          />
        )}
        
        {/* Slide 4: Secure Bar */}
        {slideConfig.secure && (
          <BannerSlide
            image={secureImage}
            breakpoint={breakpoint}
            content={<BannerContent4 breakpoint={breakpoint} isActive={currentSlide === getSlideIndex('secure')} />}
            rotatingBackground={<RotatingSecureBanner isActive={currentSlide === getSlideIndex('secure')} breakpoint={breakpoint} />}
            isActive={currentSlide === getSlideIndex('secure')}
          />
        )}
      </Slider>
      
      {/* Carousel dots - only show on M breakpoint and above */}
      {breakpoint !== 'S' && (
        <CarouselDots
          breakpoint={breakpoint}
          currentSlide={currentSlide}
          totalSlides={totalActiveSlides}
          onDotClick={handleDotClick}
        />
      )}
    </div>
  );
}

// Ticker Scroll Section
function TickerScroll() {
  return (
    <div className="content-stretch flex gap-[31px] items-center justify-center relative shrink-0 w-full" data-name="ticker scroll">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic relative shrink-0 text-[#009296] text-2xl text-center text-nowrap tracking-[-0.28px] whitespace-pre">No preservatives</p>
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
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic relative shrink-0 text-[#009296] text-2xl text-center text-nowrap tracking-[-0.28px] whitespace-pre">No artificial colors</p>
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
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic relative shrink-0 text-[#009296] text-2xl text-center text-nowrap tracking-[-0.28px] whitespace-pre">No fillers</p>
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
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic relative shrink-0 text-[#009296] text-2xl text-center text-nowrap tracking-[-0.28px] whitespace-pre">No lubricants</p>
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
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic relative shrink-0 text-[#009296] text-2xl text-center text-nowrap tracking-[-0.28px] whitespace-pre">No stabilizers</p>
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
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic relative shrink-0 text-[#009296] text-2xl text-center text-nowrap tracking-[-0.28px] whitespace-pre">No Fillers</p>
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
    size: breakpoint === 'S' || breakpoint === 'M' ? 'text-[28px]' : breakpoint === 'HD' ? 'text-5xl' : 'text-[34px]',
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
      <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 ${textColor} text-base text-center text-nowrap tracking-[1.92px] uppercase whitespace-pre`}>
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
        className={`absolute font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] left-1/2 ${typography.size} text-center ${textColor} ${spacing.top} ${typography.tracking} -translate-x-1/2 ${widthClass}`}
      >
        {title}
      </p>
      <ModuleButton breakpoint={breakpoint} variant={buttonVariant} text={buttonText} />
    </div>
  );
}

// Module 1: Shop our specials
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
          <span>Featured savings on our</span>
          <br />
          <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#009296]">finest</span>
          <span> formulas.</span>
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
  const headlineSize = breakpoint === 'S' || breakpoint === 'M' ? 'text-3xl' : breakpoint === 'HD' ? 'text-7xl' : breakpoint === 'XL' ? 'text-6xl' : 'text-4xl';
  const tracking = breakpoint === 'S' || breakpoint === 'M' ? 'tracking-[-0.68px]' : breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : 'tracking-[-0.76px]';
  const subTextSize = breakpoint === 'HD' || breakpoint === 'XL' ? 'text-[20px]' : 'text-base';
  const subTextTracking = breakpoint === 'HD' || breakpoint === 'XL' ? 'tracking-[-0.2px]' : 'tracking-[-0.16px]';

  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 text-[#003b3c] text-center w-full" data-name="copy GROUP">
      <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 ${headlineSize} ${tracking} w-full`}>
        <span>
          Let us guide you
          <br aria-hidden="true" />
          {`to an `}
        </span>
        <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#009296]">
          informed
        </span>
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
  const labelSize = isMobile || isTablet ? 'text-base' : 'text-lg';
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

function Columns({ breakpoint, onIngredientsClick, onCategoryClick }: { 
  breakpoint: Breakpoint; 
  onIngredientsClick?: () => void;
  onCategoryClick?: (categoryId: string) => void;
}) {
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
            
            // Determine onClick handler based on item
            let handleClick: (() => void) | undefined = undefined;
            if (isIngredients && onIngredientsClick) {
              handleClick = onIngredientsClick;
            } else if (!isIngredients && onCategoryClick) {
              handleClick = () => onCategoryClick(item.id);
            }
            
            return (
              <div 
                key={item.id} 
                className={`snap-start flex-none w-[42%] ${isFirst ? 'ml-[20px]' : ''} ${isLast ? 'mr-[20px]' : ''}`}
              >
                <ComponentCircle 
                  img={item.img} 
                  label={item.label} 
                  breakpoint={breakpoint}
                  onClick={handleClick}
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
          
          // Determine onClick handler based on item
          let handleClick: (() => void) | undefined = undefined;
          if (isIngredients && onIngredientsClick) {
            handleClick = onIngredientsClick;
          } else if (!isIngredients && onCategoryClick) {
            handleClick = () => onCategoryClick(item.id);
          }
          
          return (
            <ComponentCircle 
              key={item.id} 
              img={item.img} 
              label={item.label} 
              breakpoint={breakpoint}
              onClick={handleClick}
            />
          );
        })}
      </div>
    </div>
  );
}

function InformedChoice({ breakpoint, onIngredientsClick, onCategoryClick }: { 
  breakpoint: Breakpoint; 
  onIngredientsClick?: () => void;
  onCategoryClick?: (categoryId: string) => void;
}) {
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
          <Columns breakpoint={breakpoint} onIngredientsClick={onIngredientsClick} onCategoryClick={onCategoryClick} />
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
  const headlineSize = isMobile ? 'text-3xl' : isTablet ? 'text-3xl' : breakpoint === 'HD' ? 'text-7xl' : breakpoint === 'XL' ? 'text-6xl' : 'text-4xl';
  const tracking = isMobile ? 'tracking-[-0.68px]' : isTablet ? 'tracking-[-0.68px]' : breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : 'tracking-[-0.76px]';
  const quoteSize = isMobile ? 'text-lg' : isTablet ? 'text-lg' : breakpoint === 'HD' ? 'text-3xl' : breakpoint === 'XL' ? 'text-3xl' : 'text-xl';
  const quoteTracking = isMobile ? 'tracking-[-0.4px]' : isTablet ? 'tracking-[-0.4px]' : breakpoint === 'HD' ? 'tracking-[-0.68px]' : breakpoint === 'XL' ? 'tracking-[-0.68px]' : 'tracking-[-0.48px]';
  const textAlign = 'text-left';

  return (
    <div className={`content-stretch flex flex-col gap-[30px] items-start relative shrink-0 text-[#003b3c] w-full ${textAlign}`}>
      <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 ${headlineSize} ${tracking} w-full`}>
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

function SignatureWithTitle({ svgPaths, breakpoint }: { svgPaths: any; breakpoint: Breakpoint }) {
  const textSize = breakpoint === 'HD' || breakpoint === 'XL' ? 'text-lg' : 'text-base';
  const tracking = breakpoint === 'HD' || breakpoint === 'XL' ? 'tracking-[-0.2px]' : 'tracking-[-0.16px]';
  const width = breakpoint === 'S' ? 'w-full' : 'w-[322.972px]';

  return (
    <div className={`content-stretch flex flex-col gap-[30px] items-start relative shrink-0 ${width}`}>
      <AndrewSignatureNew svgPaths={svgPaths} />
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#003b3c] ${textSize} ${tracking} text-left w-full`}>- Founder, Procaps Laboratories</p>
    </div>
  );
}

function CopyGroup2({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const isMobile = breakpoint === 'S';
  const gap = isMobile ? 'gap-[40px]' : 'gap-[60px]';
  const width = isMobile ? 'w-full' : 'basis-0 grow min-h-px min-w-px';

  return (
    <div className={`content-stretch flex flex-col ${gap} items-start relative shrink-0 ${width}`} data-name="copy GROUP">
      <FrameVideoQuote breakpoint={breakpoint} />
      <SignatureWithTitle svgPaths={svgPaths} breakpoint={breakpoint} />
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

// Procaps Difference Video Section
function ProcapsDifferenceVideo({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const headlineSize = breakpoint === 'HD' ? 'text-7xl' : breakpoint === 'XL' ? 'text-6xl' : 'text-4xl';
  const headlineTracking = breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : 'tracking-[-0.76px]';
  const labelSize = breakpoint === 'HD' || breakpoint === 'XL' ? 'text-3xl' : 'text-xl';
  const labelTracking = breakpoint === 'HD' || breakpoint === 'XL' ? 'tracking-[-0.34px]' : 'tracking-[-0.24px]';
  const bodySize = breakpoint === 'HD' || breakpoint === 'XL' ? 'text-lg' : 'text-base';
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
          <Button variant="outline">Learn More</Button>
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
function BodyGroup({ breakpoint, svgPaths, onIngredientsClick, onCategoryClick }: { 
  breakpoint: Breakpoint; 
  svgPaths: any; 
  onIngredientsClick?: () => void;
  onCategoryClick?: (categoryId: string) => void;
}) {
  const verticalSpacing = breakpoint === 'S' ? 'py-[60px] gap-[60px]' : 'py-[80px] gap-[80px]';
  const isMobile = breakpoint === 'S';

  return (
    <div className={`box-border content-stretch flex flex-col items-center px-0 relative shrink-0 w-full ${verticalSpacing}`} data-name="body group">
      <TickerTape fontSize={isMobile ? '28px' : '34px'} />
      <Component2Up breakpoint={breakpoint} />
      <InformedChoice breakpoint={breakpoint} onIngredientsClick={onIngredientsClick} onCategoryClick={onCategoryClick} />
      <VitaminSpecialist breakpoint={breakpoint} />
      <VideoSection breakpoint={breakpoint} svgPaths={svgPaths} />
      <PhactSection breakpoint={breakpoint} svgPaths={svgPaths} />
      <ProcapsDifferenceSection breakpoint={breakpoint} svgPaths={svgPaths} />
      
      {/* Divider - with page margins */}
      <div className={`w-full ${isMobile ? 'px-[24px]' : 'px-[40px]'}`}>
        <div className="h-[1px] bg-[#D9E2E2]" />
      </div>
      
      {/* Highest Reviewed Products Section */}
      <HighestReviewedProducts breakpoint={breakpoint} />
    </div>
  );
}