import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Microscope, Beaker, ClipboardCheck, Sun, XCircle, CheckCircle2, Store, Award, Shield, PackageCheck, Droplets, Package, CheckCircle } from 'lucide-react';
import React from 'react';
import { StorySection } from './StorySection';
import imgPill from "figma:asset/51bfd1cd02e5e96025702f9020e2597cdefc893c.png";
import imgAndrewLessman from "figma:asset/384ef49028b56ed05243dbdcd0905aa0a6fec69e.png";
import imgAndrewEducation from "figma:asset/fd37985b5e095f1bed66c1ed2ce98843526dc5bf.png";

// ============================================================================
// BREAKPOINT TYPE
// ============================================================================

type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

// ============================================================================
// SHARED REUSABLE COMPONENTS
// ============================================================================

interface SectionHeadlineProps {
  eyebrow: string;
  headline: string | React.ReactNode;
  align?: 'left' | 'center';
  animated?: boolean;
  breakpoint?: Breakpoint;
}

function SectionHeadline({ eyebrow, headline, align = 'center', animated = false, breakpoint = 'XL' }: SectionHeadlineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const containerClass = align === 'center' 
    ? breakpoint === 'S' 
      ? "content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full"
      : "content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-[785px] lg:w-[650px]"
    : "content-stretch flex flex-col gap-[40px] md:gap-[30px] lg:gap-[30px] items-start relative shrink-0 w-full";
  
  const headlineClass = align === 'center'
    ? breakpoint === 'S'
      ? "font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] relative shrink-0 text-[#003b3c] text-[48px] text-center tracking-[-0.96px] w-full"
      : "font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] min-w-full relative shrink-0 text-[#003b3c] text-[72px] lg:text-[120px] text-center tracking-[-1.44px] lg:tracking-[-2.4px] w-[min-content]"
    : "font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] min-w-full relative shrink-0 text-[#003b3c] text-[34px] m:text-[38px] lg:text-[48px] hd:text-[58px] tracking-[-1.16px] w-[min-content]";
  
  const eyebrowClass = align === 'center'
    ? breakpoint === 'S'
      ? "font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#009296] text-[20px] text-center tracking-[2px] w-full"
      : "font-['Inter:Medium',sans-serif] font-medium leading-[1.4] min-w-full not-italic relative shrink-0 text-[#009296] text-[20px] text-center tracking-[2px] w-[min-content]"
    : "font-['Inter:Medium',sans-serif] font-medium leading-[1.4] min-w-full not-italic relative shrink-0 text-[#009296] text-[20px] md:text-[16px] lg:text-[20px] tracking-[2px] md:tracking-[1.6px] lg:tracking-[2px] w-[min-content]";

  const content = (
    <div className={containerClass} data-name="headline group">
      <div className={headlineClass}>
        {headline}
      </div>
      <div className="h-0 relative shrink-0 w-[50px]" data-name="line">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 1">
            <line id="line" stroke="var(--stroke-0, #009296)" x2="50" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className={eyebrowClass + (align === 'left' ? ' uppercase' : '')}>{eyebrow}</p>
    </div>
  );

  if (animated) {
    return (
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

interface QuoteBlockProps {
  quote: string;
  author: string;
}

function QuoteBlock({ quote, author }: QuoteBlockProps) {
  return (
    <div className="bg-[#e8f9f9] relative rounded-[20px] shrink-0 w-full" data-name="quote">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[40px] s:px-[55px] py-[40px] s:py-[50px] relative w-full">
          <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[20px] items-start leading-[1.4] not-italic relative shrink-0 text-[#003b3c] w-full">
            <p className="relative shrink-0 text-[20px] s:text-[20px] m:text-[24px] lg:text-[24px] xl:text-[24px] hd:text-[28px] tracking-[-0.4px] s:tracking-[-0.4px] m:tracking-[-0.48px] lg:tracking-[-0.48px] xl:tracking-[-0.48px] hd:tracking-[-0.56px] w-full">{quote}</p>
            <p className="relative shrink-0 text-[16px] s:text-[20px] tracking-[-0.16px] s:tracking-[-0.2px] w-full">{author}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ImageBlockProps {
  src?: string;
  alt: string;
}

function ImageBlock({ src, alt }: ImageBlockProps) {
  return (
    <div className="aspect-[789/800] bg-[#ccd8d8] overflow-clip rounded-[20px] shrink-0 w-full" data-name="image">
      {src && (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

interface StickyContentProps {
  headline: React.ReactNode;
  body: React.ReactNode;
  breakpoint?: Breakpoint;
}

function StickyContent({ headline, body, breakpoint = 'XL' }: StickyContentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Center align on S breakpoint
  const alignmentClass = breakpoint === 'S' ? 'items-center text-center' : 'items-start';
  const bodyAlignClass = breakpoint === 'S' ? 'text-center' : '';
  const widthClass = breakpoint === 'S' ? 'w-full' : 'w-[431px] md:w-auto md:flex-1 lg:w-[431px]';
  const paddingClass = breakpoint === 'S' ? 'px-[60px]' : '';

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={`content-stretch flex flex-col gap-[60px] md:gap-[40px] ${alignmentClass} relative self-start shrink-0 ${widthClass} ${paddingClass}`} 
      data-name="sticky-content"
    >
      {headline}
      <div className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#003b3c] text-[16px] lg:text-[20px] xl:text-[20px] hd:text-[20px] tracking-[-0.32px] lg:tracking-[-0.4px] w-full xl:max-w-[540px] ${bodyAlignClass}`}>
        {body}
      </div>
    </motion.div>
  );
}

interface AnimatedImageColumnProps {
  children: React.ReactNode;
  breakpoint?: Breakpoint;
}

function AnimatedImageColumn({ children, breakpoint = 'XL' }: AnimatedImageColumnProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const paddingClass = breakpoint === 'S' ? 'px-[20px]' : '';

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={`basis-0 content-stretch flex flex-col gap-[40px] grow items-start min-h-px min-w-px relative self-stretch shrink-0 ${paddingClass}`} 
      data-name="animated-image-column"
    >
      {children}
    </motion.div>
  );
}

interface TwoColumnSectionProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  reverse?: boolean;
  bgColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  breakpoint?: Breakpoint;
}

function TwoColumnSection({ 
  leftContent, 
  rightContent, 
  reverse = false, 
  bgColor = 'white',
  paddingTop = '120px',
  paddingBottom = '120px',
  breakpoint = 'XL'
}: TwoColumnSectionProps) {
  const bgClass = bgColor === 'white' ? 'bg-white' : bgColor === 'beige' ? 'bg-[#f6f2ec]' : bgColor === 'teal' ? 'bg-[#e8f9f9]' : 'bg-white';
  
  // Stack on S breakpoint with larger gap
  const layoutClass = breakpoint === 'S' 
    ? 'flex flex-col gap-[80px]' 
    : 'flex gap-[110px] md:gap-[40px] lg:gap-[40px]';
  
  // Responsive padding: no padding on S (handled by children), 40px on M, 120px on L+
  const paddingX = breakpoint === 'S' ? '' : 'px-[176px] md:px-[40px] lg:px-[120px]';
  
  return (
    <div className={`${bgClass} relative shrink-0 w-full`} data-name="two-column-section">
      <div className="size-full">
        <div className={`content-stretch ${layoutClass} items-start ${paddingX} relative w-full`} style={{ paddingTop, paddingBottom }}>
          {breakpoint === 'S' ? (
            // Stacked layout for S breakpoint
            <>
              {leftContent}
              {rightContent}
            </>
          ) : reverse ? (
            <>
              <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                {leftContent}
              </div>
              {rightContent}
            </>
          ) : (
            <>
              {leftContent}
              {rightContent}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// HERO SECTION COMPONENTS
// ============================================================================

function HeroCopy({ breakpoint }: { breakpoint: Breakpoint }) {
  // Headline font size: 48px on S, 72px on M+
  const headlineFontSize = breakpoint === 'S' ? 'text-[48px]' : 'text-[72px] md:text-[72px] lg:text-[120px]';
  const headlineTracking = breakpoint === 'S' ? 'tracking-[-0.76px]' : 'tracking-[-2.4px] md:tracking-[-1.44px] lg:tracking-[-2.4px]';
  const headlineHeight = breakpoint === 'S' ? 'h-auto' : 'h-[233px] md:h-[140px] lg:h-[233px]';
  
  // Body font size: 16px on S, 20px on M+
  const bodyFontSize = breakpoint === 'S' ? 'text-[16px]' : 'text-[20px]';
  const bodyWidth = breakpoint === 'S' ? 'w-full max-w-[327px]' : 'w-[598px]';
  
  // Gap between headline and body: 40px on S, 46px on M+
  const copyGap = breakpoint === 'S' ? 'gap-[40px]' : 'gap-[46px]';
  
  return (
    <div className={`content-stretch flex flex-col ${copyGap} items-center relative shrink-0 text-center text-white w-full`} data-name="copy">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`font-['STIX_Two_Text:Regular',sans-serif] font-normal ${headlineHeight} leading-[1.1] relative shrink-0 ${headlineFontSize} ${headlineTracking} w-full`}
      >
        <p className={`mb-0 ${headlineFontSize} ${headlineTracking}`}>
          <span className="font-['STIX_Two_Text:Regular',sans-serif] font-normal">Why quality </span>
          <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#48e1dc]">matters.</span>
        </p>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 ${bodyFontSize} ${bodyWidth}`}
      >
        The strongest bridge between you and better health is understanding what makes supplements truly effective.
      </motion.p>
    </div>
  );
}

function PillTab({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[rgba(72,225,220,0.25)] content-stretch flex h-[50px] items-center justify-center px-[30px] py-[15px] relative rounded-[999px] shrink-0" data-name="pill tab">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white whitespace-pre">{children}</p>
    </div>
  );
}

function PillTabs() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="content-stretch flex flex-wrap gap-[17px] items-center justify-center relative shrink-0 w-full" 
      data-name="pill tabs"
    >
      <PillTab>100% Additive-Free</PillTab>
      <PillTab>Third-Party Tested</PillTab>
      <PillTab>Made in USA</PillTab>
    </motion.div>
  );
}

function HeroContentCopy({ breakpoint }: { breakpoint: Breakpoint }) {
  // Gap between HeroCopy and PillTabs: 40px on S, 64px on M+
  const contentGap = breakpoint === 'S' ? 'gap-[40px]' : 'gap-[64px]';
  
  return (
    <div className={`content-stretch flex flex-col ${contentGap} items-center relative shrink-0 w-full`} data-name="hero content copy">
      <div className="flex h-[111px] items-center justify-center relative shrink-0 w-0 overflow-visible" style={{ "--transform-inner-width": "110.984375", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[111px]" data-name="vertical line">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px] overflow-hidden">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 111 1">
                <motion.line 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  id="vertical line" 
                  stroke="white" 
                  strokeDasharray="0 1"
                  x2="111" 
                  y1="0.5" 
                  y2="0.5" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <HeroCopy breakpoint={breakpoint} />
      <PillTabs />
    </div>
  );
}

function LargePillImage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 1, ease: "easeOut" }}
      className="relative w-[450px] h-[238px] md:w-[800px] md:h-[423px] lg:w-[1000px] lg:h-[528px]" 
      data-name="largepillimage"
    >
      {/* Pill image */}
      <img 
        src={imgPill} 
        alt="Golden supplement capsule" 
        className="w-full h-full object-contain"
      />
      
      {/* Solar energy effects - ON TOP with blend mode and clip-path - RESPONSIVE */}
      <div 
        className="absolute top-[6px] md:top-[10px] lg:top-[13px] left-1/2 -translate-x-1/2 overflow-hidden w-[315px] h-[120px] md:w-[560px] md:h-[214px] lg:w-[700px] lg:h-[267px]"
        style={{
          mixBlendMode: 'overlay',
          opacity: 0.9,
          clipPath: 'url(#pillShapeClip)',
        }}
      >
        {/* SVG clip-path definition that scales with container */}
        <svg className="absolute w-0 h-0">
          <defs>
            <clipPath id="pillShapeClip" clipPathUnits="objectBoundingBox">
              <path 
                d="M 0.262 0.006 C 0.179 0.014 0.113 0.088 0.091 0.124 C 0.051 0.191 -0.018 0.394 0.005 0.607 C 0.028 0.821 0.126 0.899 0.170 0.937 C 0.213 0.975 0.361 0.993 0.435 0.995 C 0.508 0.996 0.718 0.974 0.725 0.970 C 0.732 0.967 0.865 0.918 0.923 0.794 C 0.980 0.671 0.998 0.465 0.966 0.330 C 0.934 0.195 0.879 0.111 0.832 0.066 C 0.794 0.030 0.697 0.011 0.653 0.006 C 0.557 0.003 0.345 -0.001 0.262 0.006"
                filter="url(#featherFilter)"
              />
            </clipPath>
            <filter id="featherFilter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.004" />
            </filter>
          </defs>
        </svg>

        {/* Flowing golden shimmer effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(120deg, transparent 0%, transparent 30%, rgba(255, 215, 0, 0.6) 40%, rgba(255, 180, 0, 0.8) 50%, rgba(255, 215, 0, 0.6) 60%, transparent 70%, transparent 100%)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Flowing shimmer effect 2 (offset) */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(60deg, transparent 0%, transparent 35%, rgba(255, 200, 50, 0.5) 45%, rgba(255, 165, 0, 0.7) 50%, rgba(255, 200, 50, 0.5) 55%, transparent 65%, transparent 100%)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}

function HeroGroup({ breakpoint, top }: { breakpoint: Breakpoint; top: string }) {
  // Responsive width for hero group
  const heroWidth = breakpoint === 'S' ? 'w-full px-[20px]' : 'w-[864px]';
  
  return (
    <div className={`absolute content-stretch flex flex-col gap-[60px] items-center left-1/2 translate-x-[-50%] ${heroWidth}`} style={{ top }} data-name="hero group">
      <HeroContentCopy breakpoint={breakpoint} />
    </div>
  );
}

function Hero({ breakpoint }: { breakpoint: Breakpoint }) {
  if (breakpoint === 'S') {
    // S breakpoint: completely simple stacked layout
    return (
      <div className="w-full" data-name="hero">
        {/* Teal gradient background section - matches M+ */}
        <div className="px-[20px] pt-[24px] pb-[60px]" style={{ background: 'linear-gradient(180deg, #009296 0%, #00C2BD 100%)' }}>
          {/* Vertical line */}
          <div className="flex h-[111px] items-center justify-center mb-[64px]">
            <div className="rotate-[90deg]">
              <svg width="111" height="1" viewBox="0 0 111 1" fill="none">
                <motion.line 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  stroke="white" 
                  x1="0" y1="0.5" 
                  x2="111" y2="0.5" 
                />
              </svg>
            </div>
          </div>

          <HeroCopy breakpoint={breakpoint} />

          <div className={breakpoint === 'S' ? 'mt-[40px]' : 'mt-[64px]'}>
            <PillTabs />
          </div>
        </div>

        {/* White section with wave and pill */}
        <div className="bg-white relative">
          {/* Wave at top */}
          <div className="w-full" style={{ height: '130px' }}>
            <svg 
              className="w-full h-full block" 
              viewBox="0 0 768 150" 
              fill="none" 
              preserveAspectRatio="none"
              style={{ marginTop: '-1px' }}
            >
              <path 
                d="M0,75 C230,50 300,50 384,75 C468,100 540,100 768,75 L768,0 L0,0 Z" 
                fill="#00C2BD"
              />
            </svg>
          </div>

          {/* Pill image - positioned to overlap wave like M+ */}
          <div className="flex justify-center" style={{ marginTop: '-110px' }}>
            <LargePillImage />
          </div>
        </div>
      </div>
    );
  }

  // M+ breakpoints: original absolute positioning layout
  const heroHeight = 'h-[930px] lg:h-[1000px]';
  const heroContentHeight = '700px';
  const pillImageTop = 'top-[680px] lg:top-[750px]';
  const waveTop = 'top-[630px] lg:top-[700px]';
  const heroGroupTop = 'top-[34px]';
  
  return (
    <div className="relative shrink-0 w-full" data-name="hero">
      {/* Single gradient background spanning hero + wave */}
      <div className={`relative w-full ${heroHeight}`} style={{ background: 'linear-gradient(180deg, #009296 0%, #00C2BD 100%)' }}>
        {/* Hero content */}
        <div className="absolute top-0 left-0 right-0" style={{ height: heroContentHeight }}>
          <HeroGroup breakpoint={breakpoint} top={heroGroupTop} />
        </div>
        
        {/* Pill image positioned to align with wave center - accounting for shadow in image */}
        <div className={`absolute left-1/2 -translate-x-1/2 ${pillImageTop}`} style={{ zIndex: 20 }}>
          <LargePillImage />
        </div>
        
        {/* White wave overlay - fixed height to prevent gaps */}
        <div className={`absolute left-0 right-0 w-full pointer-events-none ${waveTop}`} style={{ height: '300px', zIndex: 1 }}>
          <svg 
            className="w-full h-full block" 
            viewBox="0 0 1440 300" 
            fill="none" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,150 C360,60 480,60 720,150 C960,240 1080,240 1440,150 L1440,300 L0,300 Z" 
              fill="white"
            />
          </svg>
        </div>
      </div>
      
      {/* White background continuation to prevent any gap */}
      <div className="bg-white w-full" style={{ marginTop: '-1px' }} />
    </div>
  );
}

// ============================================================================
// QUALITY BLOCK (Reusable content block for Quality page)
// ============================================================================

interface QualityBlockProps {
  breakpoint: Breakpoint;
  eyebrow: string;
  headline: React.ReactNode;
  bodyContent: React.ReactNode;
  imageSlot: React.ReactNode;
  imageOnRight?: boolean;
  paddingTop?: string;
}

function QualityBlock({ 
  breakpoint, 
  eyebrow, 
  headline, 
  bodyContent, 
  imageSlot, 
  imageOnRight = true,
  paddingTop 
}: QualityBlockProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const isMobile = breakpoint === 'S';
  const sectionPaddingTop = paddingTop || (isMobile ? 'pt-[60px]' : 'pt-[120px] md:pt-[120px] lg:pt-[120px]');
  
  const padding = isMobile ? 'px-[24px] pb-[40px]' : 'px-[40px] pb-[120px]';
  const eyebrowSize = isMobile ? 'text-[14px]' : 'text-[16px] lg:text-[20px]';
  const headlineSize = breakpoint === 'S' || breakpoint === 'M' ? 'text-3xl' : breakpoint === 'HD' ? 'text-7xl' : breakpoint === 'XL' ? 'text-6xl' : 'text-4xl';
  const headlineTracking = breakpoint === 'S' || breakpoint === 'M' ? 'tracking-[-0.68px]' : breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : 'tracking-[-0.76px]';
  const layoutDirection = isMobile ? 'flex-col' : 'flex-row';
  const contentGap = isMobile ? 'gap-[40px]' : 'gap-[100px]';
  
  const textOrder = isMobile ? 'order-2' : imageOnRight ? 'order-1' : 'order-2';
  const imageOrder = isMobile ? 'order-1' : imageOnRight ? 'order-2' : 'order-1';
  
  const headlineSection = (
    <div className="flex flex-col gap-[40px]">
      <h2 className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[#003b3c] ${headlineSize} ${headlineTracking}`}>
        {headline}
      </h2>
      
      <div className="h-0 relative shrink-0 w-[50px]" data-name="line">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 1">
            <line stroke="#009296" x2="50" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      
      <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[1.4] text-[#009296] uppercase tracking-[1.4px] ${eyebrowSize}`}>
        {eyebrow}
      </p>
    </div>
  );
  
  const textContent = (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col gap-[40px] max-w-[740px] min-w-0 ${textOrder} ${isMobile ? 'w-full' : ''}`}
    >
      {headlineSection}
      {bodyContent}
    </motion.div>
  );
  
  const imageContent = (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`${isMobile ? 'w-full' : 'max-w-[740px] min-w-0'} ${imageOrder}`}
    >
      {imageSlot}
    </motion.div>
  );
  
  return (
    <div ref={ref} className={`${sectionPaddingTop} bg-white w-full`}>
      <div className="size-full">
        <div className={`content-stretch flex flex-col items-start ${padding} relative w-full`}>
          <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
            <div className="max-w-[1600px] mx-auto w-full">
              <div className={`flex ${layoutDirection} ${contentGap} items-center`}>
                {textContent}
                {imageContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPARISON SECTION
// ============================================================================

interface ComparisonCardProps {
  title: string;
  subtitle: string;
  items: string[];
  icon: 'store' | 'award';
  isProCaps?: boolean;
  breakpoint: Breakpoint;
}

function ComparisonCard({ title, subtitle, items, icon, isProCaps = false, breakpoint }: ComparisonCardProps) {
  const IconComponent = icon === 'store' ? Store : Award;
  const iconColor = 'text-[#009296]';
  const iconBgColor = 'bg-white';
  const checkIconColor = isProCaps ? 'text-[#009296]' : 'text-[#cc0000]';
  const CheckIcon = isProCaps ? CheckCircle2 : XCircle;
  const cardBgColor = isProCaps ? 'bg-[#e8f9f9]' : 'bg-[#f6f2ec]';
  
  const titleSize = breakpoint === 'S' ? 'text-[24px]' : 'text-[28px]';
  const titleTracking = breakpoint === 'S' ? 'tracking-[-0.48px]' : 'tracking-[-0.56px]';
  const itemSize = 'text-[16px] lg:text-[20px]';
  const itemTracking = 'tracking-[-0.32px] lg:tracking-[-0.4px]';
  
  return (
    <div className={`basis-0 ${cardBgColor} grow min-h-px min-w-px relative rounded-[20px] self-stretch shrink-0`} data-name="comparison-card">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-start px-[40px] py-[60px] relative size-full">
          {/* Title and Subtitle */}
          <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
            <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[#009296] ${titleSize} ${titleTracking} w-full`}>
              {title}
            </p>
            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#003b3c] ${itemSize} ${itemTracking} w-full`}>
              {subtitle}
            </p>
          </div>
          
          {/* List Items */}
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            {items.map((item, index) => (
              <div key={index} className="flex gap-[12px] items-center w-full">
                <CheckIcon className={`size-[20px] ${checkIconColor} shrink-0`} strokeWidth={2} />
                <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${itemSize} ${itemTracking} flex-1`}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonSection({ breakpoint }: { breakpoint: Breakpoint }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const paddingY = breakpoint === 'S' ? 'py-[60px]' : breakpoint === 'M' ? 'py-[100px]' : 'py-[120px]';
  const paddingTop = breakpoint === 'S' ? 'pt-[60px]' : 'pt-[300px] md:pt-[300px] lg:pt-[300px]';
  const paddingBottom = breakpoint === 'S' ? 'pb-[60px]' : breakpoint === 'M' ? 'pb-[100px]' : 'pb-[120px]';
  const paddingX = breakpoint === 'S' ? 'px-[24px]' : 'px-[40px]';
  const gapSize = breakpoint === 'S' ? 'gap-[60px]' : 'gap-[120px] lg:gap-[100px]';
  
  const comparisonData = {
    typicalBrands: {
      title: "Typical Brands",
      subtitle: "Store supplements",
      icon: 'store' as const,
      items: [
        "Manufactured by third parties",
        "Contains glues, binders, and fillers",
        "Hard tablets with added waxes and dyes",
        "Plastic capsules that pass undigested",
        "Can cause stomach upset",
        "Clear packaging degrades nutrients"
      ]
    },
    proCaps: {
      title: "ProCaps Laboratories",
      subtitle: "Premium supplements",
      icon: 'award' as const,
      items: [
        "We manufacture what we distribute",
        "Zero additives of any kind",
        "Natural capsules only, never tablets",
        "Natural gelatin, no plastic capsules",
        "pH balanced, gentle on stomach",
        "Purple packets protect from light & heat"
      ]
    }
  };

  return (
    <div className="bg-white relative shrink-0 w-full" data-name="comparison-section">
      <div className="size-full">
        <div className={`content-stretch flex flex-col items-start ${paddingX} ${paddingTop} ${paddingBottom} relative w-full`}>
          <div className="max-w-[1600px] mx-auto w-full">
            <div className={`content-stretch flex flex-col ${gapSize} items-center relative shrink-0 w-full`}>
              <SectionHeadline 
                eyebrow="THE PROCAPS DIFFERENCE"
                headline={
                  breakpoint === 'S' ? (
                    <>
                      <p className="font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] mb-0 text-[48px] tracking-[-0.96px]">Not all supplements</p>
                      <p className="font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] text-[48px] tracking-[-0.96px]">
                        are created equal.
                      </p>
                    </>
                  ) : (
                    <>
                      <span className="whitespace-nowrap">Not all supplements</span>
                      <br aria-hidden="true" />
                      <span className="whitespace-nowrap">are created equal.</span>
                    </>
                  )
                }
                align="center"
                animated={true}
                breakpoint={breakpoint}
              />
              
              {breakpoint === 'S' ? (
                // Stacked layout for S breakpoint
                <div ref={ref} className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-full"
                  >
                    <ComparisonCard {...comparisonData.typicalBrands} isProCaps={false} breakpoint={breakpoint} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full"
                  >
                    <ComparisonCard {...comparisonData.proCaps} isProCaps={true} breakpoint={breakpoint} />
                  </motion.div>
                </div>
              ) : (
                // Side-by-side layout for M+ breakpoints
                <div ref={ref} className="content-stretch flex gap-[20px] items-stretch relative shrink-0 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="basis-0 grow min-h-px min-w-px shrink-0 flex"
                  >
                    <ComparisonCard {...comparisonData.typicalBrands} isProCaps={false} breakpoint={breakpoint} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="basis-0 grow min-h-px min-w-px shrink-0 flex"
                  >
                    <ComparisonCard {...comparisonData.proCaps} isProCaps={true} breakpoint={breakpoint} />
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VALUES SECTION
// ============================================================================

function CircleIcon({ icon }: { icon: 'microscope' | 'beaker' | 'clipboard' | 'sun' }) {
  const IconComponent = {
    microscope: Microscope,
    beaker: Beaker,
    clipboard: ClipboardCheck,
    sun: Sun,
  }[icon];

  return (
    <div className="bg-[#e8f9f9] content-stretch flex items-center justify-center p-[28px] relative rounded-[999px] shrink-0 size-[104px]" data-name="circle icon">
      <IconComponent className="size-[48px] text-[#009296]" strokeWidth={1.5} />
    </div>
  );
}

function ValueCard({ title, description, icon, breakpoint, stepNumber }: { title: string; description: string; icon: 'microscope' | 'beaker' | 'clipboard' | 'sun'; breakpoint: Breakpoint; stepNumber: number }) {
  const titleSize = breakpoint === 'S' ? 'text-[24px]' : 'text-[28px]';
  const titleTracking = breakpoint === 'S' ? 'tracking-[-0.48px]' : 'tracking-[-0.56px]';
  
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[20px] self-stretch shrink-0" data-name="card">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center px-[40px] py-[60px] relative size-full">
          <CircleIcon icon={icon} />
          
          {/* Number badge centered - perfect circle */}
          <div className="bg-[#e8f9f9] content-stretch flex items-center justify-center relative rounded-[999px] shrink-0 size-[50px]">
            <span className={`font-['Inter:Medium',sans-serif] font-medium leading-[1] text-[#009296] text-[20px]`}>
              {stepNumber}
            </span>
          </div>
          
          <div className="content-stretch flex flex-col gap-[10px] items-center text-center relative shrink-0 w-full" data-name="copy">
            <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[#009296] ${titleSize} ${titleTracking} w-full`}>
              {title}
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#003b3c] text-[16px] lg:text-[20px] tracking-[-0.32px] lg:tracking-[-0.4px] w-full">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueCardsRow({ cards, breakpoint, startIndex = 0 }: { cards: Array<{ title: string; description: string; icon: 'microscope' | 'beaker' | 'clipboard' | 'sun' }>; breakpoint: Breakpoint; startIndex?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="content-stretch flex gap-[20px] items-stretch relative shrink-0 w-full" data-name="cards-row">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
          className="basis-0 grow min-h-px min-w-px shrink-0 flex"
        >
          <ValueCard {...card} breakpoint={breakpoint} stepNumber={startIndex + index + 1} />
        </motion.div>
      ))}
    </div>
  );
}

function ValuesSection({ breakpoint }: { breakpoint: Breakpoint }) {
  const paddingY = breakpoint === 'S' ? 'py-[60px]' : breakpoint === 'M' ? 'py-[100px]' : 'py-[120px]';
  const paddingX = breakpoint === 'S' ? 'px-[24px]' : 'px-[40px]';
  const gapSize = breakpoint === 'S' ? 'gap-[60px]' : 'gap-[120px] lg:gap-[100px]';
  
  const valuesData = {
    row1: [
      {
        title: "Research",
        description: "Following the latest peer-reviewed scientific studies on nutrition and biochemistry.",
        icon: 'microscope' as const
      },
      {
        title: "Formulation",
        description: "Creating perfectly balanced formulas with exceptionally active components.",
        icon: 'beaker' as const
      }
    ],
    row2: [
      {
        title: "Testing",
        description: "Third-party testing on ingredients, then confirmation testing in-house.",
        icon: 'clipboard' as const
      },
      {
        title: "Manufacturing",
        description: "In-house production in the high desert with 100% solar power and zero additives.",
        icon: 'sun' as const
      }
    ]
  };

  return (
    <div className="bg-[#f6f2ec] relative shrink-0 w-full" data-name="values-section">
      <div className="size-full">
        <div className={`content-stretch flex flex-col items-start ${paddingX} ${paddingY} relative w-full`}>
          <div className="max-w-[1600px] mx-auto w-full">
            <div className={`content-stretch flex flex-col ${gapSize} items-center relative shrink-0 w-full`}>
              <SectionHeadline 
              eyebrow="OUR SCIENTIFIC PROCESS"
              headline={
                breakpoint === 'S' ? (
                  <>
                    <p className="font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] mb-0 text-[48px] tracking-[-0.96px]">From research</p>
                    <p className="font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] text-[48px] tracking-[-0.96px]">
                      <span className="text-[#003b3c]">to results.</span>
                    </p>
                  </>
                ) : (
                  <>
                    <span className="whitespace-nowrap">From research</span>
                    <br aria-hidden="true" />
                    <span className="text-[#003b3c] whitespace-nowrap">to results.</span>
                  </>
                )
              }
              align="center"
              animated={true}
              breakpoint={breakpoint}
            />
            {breakpoint === 'S' ? (
              // Stacked layout for S breakpoint
              <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                {[...valuesData.row1, ...valuesData.row2].map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                    className="w-full"
                  >
                    <ValueCard {...card} breakpoint={breakpoint} stepNumber={index + 1} />
                  </motion.div>
                ))}
              </div>
            ) : (
              // Single horizontal row for M+ breakpoints
              <ValueCardsRow cards={[...valuesData.row1, ...valuesData.row2]} breakpoint={breakpoint} startIndex={0} />
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// QUALITY ASSURANCE SECTION (6-card grid for "Uncompromising standards")
// ============================================================================

type QualityAssuranceIconType = 'shield' | 'packageCheck' | 'droplets' | 'sun' | 'package' | 'checkCircle';

function QualityAssuranceIcon({ icon }: { icon: QualityAssuranceIconType }) {
  const IconComponent = {
    shield: Shield,
    packageCheck: PackageCheck,
    droplets: Droplets,
    sun: Sun,
    package: Package,
    checkCircle: CheckCircle,
  }[icon];

  return (
    <div className="bg-[#e8f9f9] content-stretch flex items-center justify-center p-[28px] relative rounded-[999px] shrink-0 size-[104px]" data-name="circle icon">
      <IconComponent className="size-[48px] text-[#009296]" strokeWidth={1.5} />
    </div>
  );
}

function QualityAssuranceCard({ title, description, icon, breakpoint }: { title: string; description: string; icon: QualityAssuranceIconType; breakpoint: Breakpoint }) {
  const titleSize = breakpoint === 'S' ? 'text-[24px]' : 'text-[28px]';
  const titleTracking = breakpoint === 'S' ? 'tracking-[-0.48px]' : 'tracking-[-0.56px]';
  
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[20px] self-stretch shrink-0" data-name="card">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center px-[40px] py-[60px] relative size-full">
          <QualityAssuranceIcon icon={icon} />
          
          <div className="content-stretch flex flex-col gap-[10px] items-center text-center relative shrink-0 w-full" data-name="copy">
            <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[#009296] ${titleSize} ${titleTracking} w-full`}>
              {title}
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#003b3c] text-[16px] lg:text-[20px] tracking-[-0.32px] lg:tracking-[-0.4px] w-full">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QualityAssuranceCardsRow({ cards, breakpoint }: { cards: Array<{ title: string; description: string; icon: QualityAssuranceIconType }>; breakpoint: Breakpoint }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="content-stretch flex gap-[20px] items-stretch relative shrink-0 w-full" data-name="cards-row">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
          className="basis-0 grow min-h-px min-w-px shrink-0 flex"
        >
          <QualityAssuranceCard {...card} breakpoint={breakpoint} />
        </motion.div>
      ))}
    </div>
  );
}

function QualityAssuranceSection({ breakpoint }: { breakpoint: Breakpoint }) {
  const paddingY = breakpoint === 'S' ? 'py-[60px]' : breakpoint === 'M' ? 'py-[100px]' : 'py-[120px]';
  const paddingX = breakpoint === 'S' ? 'px-[24px]' : 'px-[40px]';
  const gapSize = breakpoint === 'S' ? 'gap-[60px]' : 'gap-[120px] lg:gap-[100px]';
  
  const qualityData = {
    row1: [
      {
        title: "Certificate of Analysis",
        description: "Every raw ingredient verified for purity and quality",
        icon: 'shield' as const
      },
      {
        title: "Dual Testing Process",
        description: "Third-party testing plus in-house confirmation testing",
        icon: 'packageCheck' as const
      },
      {
        title: "Desert Climate Advantage",
        description: "Low humidity enables ultra-fine powders without additives",
        icon: 'droplets' as const
      }
    ],
    row2: [
      {
        title: "100% Solar Powered",
        description: "Entire 125,000 sq ft facility powered by solar energy",
        icon: 'sun' as const
      },
      {
        title: "Purple Perma-Fresh Packets",
        description: "Protects nutrients from heat and sunlight degradation",
        icon: 'package' as const
      },
      {
        title: "pH Balanced Formulas",
        description: "Metabolically balanced to prevent stomach discomfort",
        icon: 'checkCircle' as const
      }
    ]
  };

  return (
    <div className="bg-[#e8f9f9] relative shrink-0 w-full" data-name="quality-assurance-section">
      <div className="size-full">
        <div className={`content-stretch flex flex-col items-start ${paddingX} ${paddingY} relative w-full`}>
          <div className="max-w-[1600px] mx-auto w-full">
            <div className={`content-stretch flex flex-col ${gapSize} items-center relative shrink-0 w-full`}>
              <SectionHeadline 
              eyebrow="QUALITY ASSURANCE"
              headline={
                breakpoint === 'S' ? (
                  <>
                    <p className="font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] mb-0 text-[48px] tracking-[-0.96px]">Uncompromising</p>
                    <p className="font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] text-[48px] tracking-[-0.96px]">standards.</p>
                  </>
                ) : (
                  <>
                    <span className="whitespace-nowrap">Uncompromising</span>
                    <br aria-hidden="true" />
                    <span className="whitespace-nowrap">standards.</span>
                  </>
                )
              }
              align="center"
              animated={true}
              breakpoint={breakpoint}
            />
            {breakpoint === 'S' ? (
              // Stacked layout for S breakpoint
              <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                {[...qualityData.row1, ...qualityData.row2].map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                    className="w-full"
                  >
                    <QualityAssuranceCard {...card} breakpoint={breakpoint} />
                  </motion.div>
                ))}
              </div>
            ) : (
              // 3x2 grid layout for M+ breakpoints
              <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                <QualityAssuranceCardsRow cards={qualityData.row1} breakpoint={breakpoint} />
                <QualityAssuranceCardsRow cards={qualityData.row2} breakpoint={breakpoint} />
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TESTIMONIALS SECTION
// ============================================================================

function StatCard({ number, label, breakpoint, delay, isInView }: { number: string; label: string; breakpoint: Breakpoint; delay: number; isInView: boolean }) {
  // Calculate stats font size based on breakpoint
  const getStatsFontSize = () => {
    switch (breakpoint) {
      case 'S': return '34px';
      case 'M': return '58px';
      case 'L':
      case 'XL':
      case 'HD':
      default: return '80px';
    }
  };

  // Calculate letter spacing (proportional to font size)
  const getStatsLetterSpacing = () => {
    switch (breakpoint) {
      case 'S': return '-0.68px'; // 34 * 0.02
      case 'M': return '-1.16px'; // 58 * 0.02
      case 'L':
      case 'XL':
      case 'HD':
      default: return '-1.6px'; // 80 * 0.02
    }
  };

  // Calculate label font size based on breakpoint
  const getLabelFontSize = () => {
    switch (breakpoint) {
      case 'S':
      case 'M': return '16px';
      case 'L':
      case 'XL':
      case 'HD':
      default: return '20px';
    }
  };

  // Calculate label letter spacing
  const getLabelLetterSpacing = () => {
    switch (breakpoint) {
      case 'S':
      case 'M': return '-0.16px'; // 16 * 0.01
      case 'L':
      case 'XL':
      case 'HD':
      default: return '-0.2px'; // 20 * 0.01
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className={`content-stretch flex flex-col gap-[20px] items-center text-center relative shrink-0 ${breakpoint === 'S' ? 'bg-[#E6F7F7] rounded-[20px] p-[30px]' : ''}`}
    >
      <div 
        className={`font-normal text-[#009296] leading-[1] ${breakpoint === 'S' ? "font-['Inter:Medium',sans-serif]" : "font-['STIX_Two_Text:Regular',sans-serif]"}`}
        style={{ 
          fontSize: getStatsFontSize(), 
          letterSpacing: getStatsLetterSpacing() 
        }}
      >
        {number}
      </div>
      <div 
        className="font-['Inter:Regular',sans-serif] font-normal text-[#003b3c] leading-[1.4] max-w-[280px]"
        style={{ 
          fontSize: getLabelFontSize(), 
          letterSpacing: getLabelLetterSpacing() 
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

function TestimonialCard({ quote, name, product, breakpoint }: { quote: string; name: string; product: string; breakpoint: Breakpoint }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const quoteSize = breakpoint === 'S' ? 'text-[18px]' : 'text-[20px]';
  const quoteTracking = breakpoint === 'S' ? 'tracking-[-0.36px]' : 'tracking-[-0.4px]';
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="bg-white relative rounded-[20px] shrink-0 h-full"
    >
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start px-[40px] py-[50px] relative h-full">
          <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${quoteSize} ${quoteTracking}`}>
            "{quote}"
          </p>
          <div className="flex flex-col gap-[4px] mt-auto">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] text-[#009296] text-[16px] tracking-[-0.32px]">
              {name}
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#003b3c] text-[14px] tracking-[-0.28px]">
              {product}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialsSection({ breakpoint }: { breakpoint: Breakpoint }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const paddingY = breakpoint === 'S' ? 'py-[60px]' : breakpoint === 'M' ? 'py-[100px]' : 'py-[120px]';
  const paddingX = breakpoint === 'S' ? 'px-[24px]' : 'px-[40px]';
  const gapSize = breakpoint === 'S' ? 'gap-[60px]' : 'gap-[80px]';
  const gridCols = breakpoint === 'S' ? 'grid-cols-1' : 'grid-cols-3';
  const gridGap = breakpoint === 'S' ? 'gap-[10px]' : 'gap-[60px] lg:gap-[50px]';
  
  const stats = [
    { number: "50M+", label: "Customers Served", delay: 0 },
    { number: "40+", label: "Years of Trust", delay: 100 },
    { number: "4.9/5", label: "Average Rating", delay: 200 }
  ];
  
  const testimonials = [
    {
      quote: "I can actually feel the difference in quality. No stomach upset, no fillers—just pure nutrition that works.",
      name: "Sarah M.",
      product: "Ultimate Beauty Customer"
    },
    {
      quote: "After 40 years of trying different brands, I finally found supplements I can trust. The purity is noticeable.",
      name: "Robert K.",
      product: "Essential-1 Customer"
    },
    {
      quote: "As someone with a sensitive stomach, these are the only vitamins that don't cause discomfort. The pH balanced formula really works.",
      name: "Jennifer L.",
      product: "Digestive Health Customer"
    }
  ];
  
  return (
    <div className="bg-[#F7F2EC] relative shrink-0 w-full" data-name="testimonials-section">
      <div className="size-full">
        <div className={`content-stretch flex flex-col items-start ${paddingX} ${paddingY} relative w-full`}>
          <div className="max-w-[1600px] mx-auto w-full">
            <div className={`content-stretch flex flex-col ${gapSize} items-center relative shrink-0 w-full`}>
              {/* Headline */}
              <SectionHeadline 
                eyebrow="CUSTOMER STORIES"
                headline="Trusted by 50+ Million Customers"
                align="center"
                animated={true}
                breakpoint={breakpoint}
              />
              
              {/* Testimonials Grid */}
              <div className={`content-stretch flex ${breakpoint === 'S' ? 'flex-col' : 'flex-row'} gap-[20px] items-stretch relative shrink-0 w-full`}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className={breakpoint === 'S' ? 'w-full' : 'basis-0 grow min-h-px min-w-px shrink-0'}>
                    <TestimonialCard {...testimonial} breakpoint={breakpoint} />
                  </div>
                ))}
              </div>
              
              {/* Stats Row */}
              <div ref={ref} className={`grid ${gridCols} ${gridGap} w-full`}>
                {stats.map((stat, index) => (
                  <StatCard
                    key={index}
                    number={stat.number}
                    label={stat.label}
                    delay={stat.delay}
                    breakpoint={breakpoint}
                    isInView={isInView}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VIDEO SECTION
// ============================================================================

function VideoSection({ breakpoint }: { breakpoint: Breakpoint }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <div className="w-full aspect-video relative overflow-hidden">
      <iframe
        src="https://player.vimeo.com/video/1151210441?background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0&speed=1"
        className="absolute top-0 left-0 w-full h-full"
        style={{ border: 0 }}
        allow="autoplay; fullscreen; picture-in-picture"
        title="ProCaps Manufacturing Video"
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#002525]/50 mix-blend-multiply" />
      
      {/* Centered headline */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.h2 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className={`font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] text-white text-center ${
            breakpoint === 'S' 
              ? 'text-[48px] tracking-[-0.96px]' 
              : 'text-[72px] lg:text-[120px] tracking-[-1.44px] lg:tracking-[-2.4px]'
          }`}
        >
          Purity you can see.
          <br />
          Quality you can trust.
        </motion.h2>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function QualityPage() {
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

  // Content blocks
  const bodySize = breakpoint === 'XL' || breakpoint === 'HD' ? 'text-[20px]' : 'text-[16px]';
  
  const purityBodyContent = (
    <div className={`flex flex-col gap-[16px]`}>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${bodySize}`}>
        Andrew Lessman's unwavering commitment to quality begins with sourcing. We only purchase ingredients from internationally recognized, quality suppliers who meet the highest standards in the industry.
      </p>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${bodySize}`}>
        Every raw ingredient comes with a Certificate of Analysis and must pass rigorous third-party testing before it ever enters our facility. But we don't stop there.
      </p>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${bodySize}`}>
        We perform our own confirmation testing in-house to verify purity, potency, and quality—a double-check that most supplement companies would never even consider.
      </p>
    </div>
  );
  
  const purityImageSlot = (
    <div className="flex flex-col gap-[20px] w-full">
      <div className="relative">
        <img 
          src={imgAndrewLessman} 
          alt="Andrew Lessman" 
          className="w-full h-auto rounded-[20px]"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-['Inter',sans-serif] text-white text-[14px] font-medium tracking-[1px]">
            FPO
          </span>
        </div>
      </div>
      <QuoteBlock 
        quote={`"I will never compromise on ingredient quality. Your health depends on it."`}
        author="- Andrew Lessman"
      />
    </div>
  );

  const testingBodyContent = (
    <div className={`flex flex-col gap-[16px]`}>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${bodySize}`}>
        Every batch undergoes rigorous third-party testing to verify potency, purity, and identity. We test for heavy metals, microbials, and contaminants that others ignore.
      </p>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] ${bodySize}`}>
        Our certificates of analysis are available upon request. Because quality you can't verify isn't quality at all.
      </p>
    </div>
  );
  
  const testingImageSlot = (
    <div className="flex flex-col gap-[20px] w-full">
      <div className="relative">
        <img 
          src={imgAndrewEducation} 
          alt="Quality testing and verification" 
          className="w-full h-auto rounded-[20px]"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-['Inter',sans-serif] text-white text-[14px] font-medium tracking-[1px]">
            FPO
          </span>
        </div>
      </div>
      <QuoteBlock 
        quote={`"We test everything. Because your health deserves absolute certainty."`}
        author="- Andrew Lessman"
      />
    </div>
  );

  return (
    <div className="bg-white flex flex-col items-start relative w-full overflow-x-hidden" data-name="quality desktop">
      <Hero breakpoint={breakpoint} />
      
      <ComparisonSection breakpoint={breakpoint} />
      
      <ValuesSection breakpoint={breakpoint} />
      
      <QualityBlock 
        breakpoint={breakpoint}
        eyebrow="Andrew Lessman's Commitment"
        headline={
          <>
            <span className="text-[#009296]">Premium ingredients.</span>
            <br />
            No exceptions.
          </>
        }
        bodyContent={purityBodyContent}
        imageSlot={purityImageSlot}
        imageOnRight={true}
      />
      
      <QualityAssuranceSection breakpoint={breakpoint} />
      
      <QualityBlock 
        breakpoint={breakpoint}
        eyebrow="RIGOROUS TESTING"
        headline={
          <>
            Third-party verified.
            <br />
            <span className="text-[#009296]">Every time.</span>
          </>
        }
        bodyContent={testingBodyContent}
        imageSlot={testingImageSlot}
        imageOnRight={true}
        paddingTop="pt-[60px]"
      />
      
      <TestimonialsSection breakpoint={breakpoint} />
    </div>
  );
}