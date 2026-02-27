import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import imgImage6 from "figma:asset/07a96391057ade3b14e0a1c61eff3099de640600.png";
import imgSucress from "figma:asset/dd96a0efe2a7069ea4f589da76a39541a0c792be.png";
import imgSecure from "figma:asset/5ee8cdb4d77e634b3b61681ac361020f0fda082c.png";
import imgImage6Mobile from "figma:asset/6975fd6999936d88f4cb405f53fa150bdaad5716.png";
import imgSucessMobile from "figma:asset/366ae2207afd21d0518c6fa4ef0e46ef959a6435.png";
import imgSecureMobile from "figma:asset/0560483ebd50a7010f3ad1c27eaace806a7a4897.png";
import svgPathsPhact from "../imports/svg-bg3t24lv8d";

type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

// Carousel slide data (3 slides - starting with soap, then 2 more duplicates for now)
const CAROUSEL_SLIDES = [
  {
    id: 'slide-1',
    badge: 'phact',
    headline: {
      text1: 'The most rigorously tested, ',
      textItalic: 'all-in-one',
      text2: ' cleansing experience.'
    },
    description: 'Enjoy a rich, foamy lather that gently cleanses, moisturizes and does not damage your skin\'s natural protective barriers, all with just four gentle plant-based ingredients.',
    buttonText: 'Shop PHACT',
    image: imgImage6,
    imageMobile: imgImage6Mobile
  },
  {
    id: 'slide-2',
    badge: null, // No badge for Sucress
    headline: {
      text1: 'Enjoy the pure natural ',
      textItalic: 'sweetness',
      text2: ' of Sucress!'
    },
    description: 'Our unique non-GMO Stevia leaf sweetener contains NO HIDDEN SUGAR. Each packet provides the sweetness equivalence of approximately 2 teaspoons of sugar, along with the healthy blood sugar support of the amino acid Glycine.',
    buttonText: 'TASTE THE DIFFERENCE',
    image: imgSucress,
    imageMobile: imgSucessMobile
  },
  {
    id: 'slide-3',
    badge: null, // No badge for Secure
    headline: {
      text1: 'The most nutrient-rich, low-calorie and ',
      textItalic: 'delicious',
      text2: ' meal replacement.'
    },
    description: 'Secure\'s great taste and caloric composition make it easy and enjoyable to embrace a weight-loss regimen that actually works.',
    buttonText: 'SHOP NOW',
    image: imgSecure,
    imageMobile: imgSecureMobile
  }
];

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
function PhactImage({ breakpoint, image, imageMobile }: { breakpoint: Breakpoint; image: string; imageMobile: string }) {
  const isMobile = breakpoint === 'S';
  const spacing = getPhactSpacing(breakpoint);
  
  if (isMobile) {
    return (
      <div className="w-full relative shrink-0">
        <img 
          alt="Product" 
          className={`w-full h-auto block ${spacing.imageBorderRadius}`} 
          src={imageMobile} 
        />
      </div>
    );
  }
  
  return (
    <div className="aspect-[720/720] basis-0 grow min-h-px min-w-px relative shrink-0">
      <img 
        alt="Product" 
        className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" 
        src={image} 
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
function PhactCopy({ 
  breakpoint, 
  headline, 
  description 
}: { 
  breakpoint: Breakpoint; 
  headline: typeof CAROUSEL_SLIDES[0]['headline']; 
  description: string;
}) {
  const spacing = getPhactSpacing(breakpoint);
  const typography = getPhactTypography(breakpoint);

  return (
    <div className={`content-stretch flex flex-col gap-[20px] items-start relative shrink-0 text-[#003b3c] w-full ${spacing.textAlign}`}>
      <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 ${typography.headlineSize} ${typography.headlineTracking} w-full`}>
        <span>{headline.text1}</span>
        <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#009296]">{headline.textItalic}</span>
        <span>{headline.text2}</span>
      </p>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 ${typography.bodySize} ${typography.bodyTracking} w-full`}>
        {description}
      </p>
    </div>
  );
}

// PHACT CTA button
function PhactButton({ buttonText }: { buttonText: string }) {
  return <Button variant="primary">{buttonText}</Button>;
}

// PHACT content group (badge, copy, button)
function PhactContent({ 
  breakpoint, 
  svgPaths, 
  slide 
}: { 
  breakpoint: Breakpoint; 
  svgPaths: any; 
  slide: typeof CAROUSEL_SLIDES[0];
}) {
  const spacing = getPhactSpacing(breakpoint);
  
  return (
    <div className={`content-stretch flex flex-col ${spacing.contentGap} ${spacing.itemsAlign} justify-center relative shrink-0 w-full`}>
      {slide.badge && <PhactBadge svgPaths={svgPaths} breakpoint={breakpoint} />}
      <PhactCopy breakpoint={breakpoint} headline={slide.headline} description={slide.description} />
      <PhactButton buttonText={slide.buttonText} />
    </div>
  );
}

// PHACT content panel (desktop only - right side with beige background)
function PhactContentPanel({ 
  breakpoint, 
  svgPaths, 
  slide 
}: { 
  breakpoint: Breakpoint; 
  svgPaths: any; 
  slide: typeof CAROUSEL_SLIDES[0];
}) {
  const spacing = getPhactSpacing(breakpoint);

  return (
    <div className="aspect-[1146/1146] basis-0 bg-[#f6f2ec] grow min-h-px min-w-px relative shrink-0">
      <div className={`flex flex-col justify-center ${spacing.contentPadding} size-full`}>
        <PhactContent breakpoint={breakpoint} svgPaths={svgPaths} slide={slide} />
      </div>
    </div>
  );
}

// PHACT card (mobile stacked, tablet/desktop side-by-side)
function PhactCard({ 
  breakpoint, 
  svgPaths, 
  slide 
}: { 
  breakpoint: Breakpoint; 
  svgPaths: any; 
  slide: typeof CAROUSEL_SLIDES[0];
}) {
  const isMobile = breakpoint === 'S';
  const spacing = getPhactSpacing(breakpoint);
  
  if (isMobile) {
    // Mobile: Stacked layout - Image → Badge → Copy → Button
    return (
      <div className={`w-full bg-[#f6f2ec] ${spacing.borderRadius} overflow-hidden`}>
        <PhactImage breakpoint={breakpoint} image={slide.image} imageMobile={slide.imageMobile} />
        <div className={spacing.mobilePadding}>
          <PhactContent breakpoint={breakpoint} svgPaths={svgPaths} slide={slide} />
        </div>
      </div>
    );
  }
  
  // Tablet & Desktop: Side-by-side layout - Image | Content Panel
  return (
    <div className={`basis-0 content-stretch flex grow items-start justify-center min-h-px min-w-px overflow-clip relative ${spacing.borderRadius} self-stretch shrink-0`}>
      <PhactImage breakpoint={breakpoint} image={slide.image} imageMobile={slide.imageMobile} />
      <PhactContentPanel breakpoint={breakpoint} svgPaths={svgPaths} slide={slide} />
    </div>
  );
}

// Carousel Dots
function CarouselDots({ 
  totalSlides, 
  currentSlide, 
  onDotClick 
}: { 
  totalSlides: number; 
  currentSlide: number; 
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-[12px] mt-[30px]">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`transition-all duration-300 rounded-full ${
            currentSlide === index 
              ? 'w-[32px] h-[8px] bg-[#009296]' 
              : 'w-[8px] h-[8px] bg-[#D9E2E2] hover:bg-[#009296]/50'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

// PHACT Section with Carousel (main export)
export default function PhactSection({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const spacing = getPhactSpacing(breakpoint);
  const isMobile = breakpoint === 'S';
  
  // Use the dedicated PHACT svg paths that has all badge paths
  const phactSvgPaths = svgPathsPhact;
  
  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };
  
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };
  
  return (
    <div className="relative shrink-0 w-full">
      <div className={`box-border content-stretch flex flex-col items-center justify-center ${spacing.containerPadding} py-0 relative w-full`}>
        {/* Carousel container with fade transition and arrow buttons */}
        <div className="relative w-full">
          {/* Left Arrow - Hidden on mobile, 0% opacity at start */}
          <button
            onClick={handlePrevSlide}
            disabled={currentSlide === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg size-[40px] md:size-[50px] flex items-center justify-center hover:bg-[#F6F2EC] transition-all -ml-[20px] md:-ml-[25px] hidden md:flex ${
              currentSlide === 0 ? 'opacity-0 cursor-not-allowed' : 'opacity-100'
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-[20px] md:size-[24px] text-[#003b3c]" />
          </button>

          {CAROUSEL_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-opacity duration-500 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
              }`}
            >
              <PhactCard breakpoint={breakpoint} svgPaths={phactSvgPaths} slide={slide} />
            </div>
          ))}
          
          {/* Right Arrow - Hidden on mobile, 0% opacity at end */}
          <button
            onClick={handleNextSlide}
            disabled={currentSlide === CAROUSEL_SLIDES.length - 1}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg size-[40px] md:size-[50px] flex items-center justify-center hover:bg-[#F6F2EC] transition-all -mr-[20px] md:-mr-[25px] hidden md:flex ${
              currentSlide === CAROUSEL_SLIDES.length - 1 ? 'opacity-0 cursor-not-allowed' : 'opacity-100'
            }`}
            aria-label="Next slide"
          >
            <ChevronRight className="size-[20px] md:size-[24px] text-[#003b3c]" />
          </button>
        </div>
        
        {/* Carousel navigation dots */}
        <CarouselDots 
          totalSlides={CAROUSEL_SLIDES.length} 
          currentSlide={currentSlide} 
          onDotClick={handleDotClick}
        />
      </div>
    </div>
  );
}