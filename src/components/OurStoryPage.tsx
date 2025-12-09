import svgPaths from "../imports/svg-dtsi8ijs14";
import imgAndrewLessman from "figma:asset/57c0a2c73038ec880e929f319cc00673eadd1d96.png";
import imgSolarPanels from "figma:asset/ef394230c09eec394da41c87196d663833c1283c.png";
import imgPill from "figma:asset/51bfd1cd02e5e96025702f9020e2597cdefc893c.png";
import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Sun, ShieldCheck, FlaskConical, Leaf } from 'lucide-react';
import React from 'react';

// ============================================================================
// SHARED REUSABLE COMPONENTS
// ============================================================================

interface SectionHeadlineProps {
  eyebrow: string;
  headline: string | React.ReactNode;
  align?: 'left' | 'center';
  animated?: boolean;
}

function SectionHeadline({ eyebrow, headline, align = 'center', animated = false }: SectionHeadlineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const containerClass = align === 'center' 
    ? "content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-[785px]"
    : "content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full";
  
  const headlineClass = align === 'center'
    ? "font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] min-w-full relative shrink-0 text-[#003b3c] text-[92px] text-center tracking-[-1.84px] w-[min-content]"
    : "font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] min-w-full relative shrink-0 text-[#003b3c] text-[58px] tracking-[-1.16px] w-[min-content]";
  
  const eyebrowClass = align === 'center'
    ? "font-['Inter:Medium',sans-serif] font-medium leading-[1.4] min-w-full not-italic relative shrink-0 text-[#009296] text-[20px] text-center tracking-[2px] w-[min-content]"
    : "font-['Inter:Medium',sans-serif] font-medium leading-[1.4] min-w-full not-italic relative shrink-0 text-[#009296] text-[20px] tracking-[2px] w-[min-content]";

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
        <div className="content-stretch flex flex-col items-start px-[55px] py-[50px] relative w-full">
          <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[20px] items-start leading-[1.4] not-italic relative shrink-0 text-[#003b3c] w-full">
            <p className="relative shrink-0 text-[28px] tracking-[-0.56px] w-full">{quote}</p>
            <p className="relative shrink-0 text-[20px] tracking-[-0.2px] w-full">{author}</p>
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
}

function StickyContent({ headline, body }: StickyContentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="content-stretch flex flex-col gap-[60px] items-start sticky top-[120px] self-start shrink-0 w-[431px]" 
      data-name="sticky-content"
    >
      {headline}
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#003b3c] text-[20px] tracking-[-0.4px] w-full">
        {body}
      </div>
    </motion.div>
  );
}

interface AnimatedImageColumnProps {
  children: React.ReactNode;
}

function AnimatedImageColumn({ children }: AnimatedImageColumnProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="basis-0 content-stretch flex flex-col gap-[60px] grow items-start min-h-px min-w-px relative self-stretch shrink-0" 
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
}

function TwoColumnSection({ 
  leftContent, 
  rightContent, 
  reverse = false, 
  bgColor = 'white',
  paddingTop = '120px',
  paddingBottom = '120px'
}: TwoColumnSectionProps) {
  const bgClass = bgColor === 'white' ? 'bg-white' : bgColor === 'beige' ? 'bg-[#f6f2ec]' : bgColor === 'teal' ? 'bg-[#e8f9f9]' : 'bg-white';
  
  return (
    <div className={`${bgClass} relative shrink-0 w-full`} data-name="two-column-section">
      <div className="size-full">
        <div className="content-stretch flex gap-[110px] items-start px-[176px] relative w-full" style={{ paddingTop, paddingBottom }}>
          {reverse ? (
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

function HeroCopy() {
  return (
    <div className="content-stretch flex flex-col gap-[46px] items-center relative shrink-0 text-center text-white w-full" data-name="copy">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="font-['STIX_Two_Text:Regular',sans-serif] font-normal h-[233px] leading-[1.1] relative shrink-0 text-[0px] text-[120px] tracking-[-2.4px] w-full"
      >
        <p className="mb-0">
          <span className="font-['STIX_Two_Text:Regular',sans-serif] font-normal">Made</span>
          <span className="font-['STIX_Two_Text:Regular',sans-serif] font-normal"> </span>
          <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#48e1dc]">differently.</span>
        </p>
        <p>For a reason.</p>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[20px] w-[598px]"
      >
        Founded by Andrew Lessman in 1979. Still owner-operated. The only facility in the world creating 100% pure, additive-free supplements powered entirely by solar energy.
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
      className="content-stretch flex gap-[17px] items-center relative shrink-0" 
      data-name="pill tabs"
    >
      <PillTab>Founded 1979</PillTab>
      <PillTab>100% Solar Powered</PillTab>
      <PillTab>Owner-Operated</PillTab>
    </motion.div>
  );
}

function HeroContentCopy() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-center relative shrink-0 w-full" data-name="hero content copy">
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
      <HeroCopy />
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
      className="relative w-[1000px] h-[528px]" 
      data-name="largepillimage"
    >
      {/* Pill image */}
      <img 
        src={imgPill} 
        alt="Golden supplement capsule" 
        className="w-full h-full object-contain"
      />
      
      {/* SVG mask definition with feathered edges */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Gaussian blur filter for feathered edges */}
          <filter id="featherEdge">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
          
          {/* Mask using exact Figma-traced pill shape */}
          <mask id="pillCapsuleMask">
            <path 
              d="M183.189 1.6043C125.189 3.6043 79.3553 23.4376 63.6886 33.1043C35.6886 51.1041 -12.3114 105.104 3.68859 162.104C19.6886 219.104 88.1886 240.104 118.689 250.104C149.189 260.104 252.689 265.104 304.189 265.604C355.689 266.104 502.689 260.104 507.689 259.104C512.689 258.104 605.189 245.104 645.689 212.104C686.189 179.104 698.689 124.104 676.189 88.1045C653.689 52.1045 615.189 29.6045 582.189 17.6045C555.789 8.00449 487.855 2.93769 457.189 1.6043C390.022 0.770963 241.189 -0.395703 183.189 1.6043Z"
              fill="white"
              filter="url(#featherEdge)"
            />
          </mask>
        </defs>
      </svg>
      
      {/* Solar energy effects - ON TOP with blend mode and feathered mask */}
      <div 
        className="absolute top-[13px] left-1/2 -translate-x-1/2 overflow-hidden"
        style={{
          width: '700px',
          height: '267px',
          mask: 'url(#pillCapsuleMask)',
          WebkitMask: 'url(#pillCapsuleMask)',
          mixBlendMode: 'overlay',
          opacity: 0.7,
        }}
      >
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

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[6px] h-[6px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 215, 0, 0.6) 100%)',
              left: `${20 + (i * 10)}%`,
              top: `80%`,
              filter: 'blur(1px)',
            }}
            animate={{
              x: [0, Math.sin(i) * 20, 0],
              y: [0, -100 - (i * 8), -200],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + (i * 0.3),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Additional smaller particles for depth */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`small-${i}`}
            className="absolute w-[3px] h-[3px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 230, 100, 0.7) 100%)',
              left: `${30 + (i * 12)}%`,
              top: `85%`,
              filter: 'blur(0.5px)',
            }}
            animate={{
              x: [0, Math.cos(i) * 15, 0],
              y: [0, -80 - (i * 6), -160],
              opacity: [0, 0.9, 0],
              scale: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3.5 + (i * 0.4),
              repeat: Infinity,
              delay: i * 0.5 + 1.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function HeroGroup() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[60px] items-center left-1/2 top-[34px] translate-x-[-50%] w-[864px]" data-name="hero group">
      <HeroContentCopy />
    </div>
  );
}

function Hero() {
  return (
    <div className="relative shrink-0 w-full" data-name="hero">
      {/* Single gradient background spanning hero + wave */}
      <div className="relative w-full" style={{ height: '1000px', background: 'linear-gradient(180deg, #009296 0%, #00C2BD 100%)' }}>
        {/* Hero content */}
        <div className="absolute top-0 left-0 right-0" style={{ height: '700px' }}>
          <HeroGroup />
        </div>
        
        {/* Pill image positioned to align with wave center - accounting for shadow in image */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '750px', zIndex: 20 }}>
          <LargePillImage />
        </div>
        
        {/* White wave overlay - fixed height to prevent gaps */}
        <div className="absolute left-0 right-0 w-full pointer-events-none" style={{ top: '700px', height: '300px', zIndex: 1 }}>
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
// FOUNDER SECTION
// ============================================================================

function FounderSection() {
  const headline = (
    <SectionHeadline 
      eyebrow="MEET ANDREW LESSMAN"
      headline={
        <div className="font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] relative shrink-0 text-[#003b3c] tracking-[-1.16px] w-full">
          <p className="mb-0 text-[58px]">Founder owned.</p>
          <p className="text-[#009296] text-[58px]">Always.</p>
        </div>
      }
      align="left"
    />
  );

  const body = (
    <>
      <p className="mb-0">Andrew Lessman—biochemist, law student, and elite decathlon athlete—founded ProCaps in 1979 after realizing most supplements were low quality and made without regard to scientific research.</p>
      <p className="mb-0">&nbsp;</p>
      <p>{`He created the world's first 100% pure, additive-free vitamins for his own athletic needs. The company remains privately owned with no shareholders or board of directors—just Andrew's unwavering commitment to your health.`}</p>
    </>
  );

  return (
    <TwoColumnSection
      paddingTop="338px"
      leftContent={<StickyContent headline={headline} body={body} />}
      rightContent={
        <AnimatedImageColumn>
          <ImageBlock src={imgAndrewLessman} alt="Andrew Lessman" />
          <QuoteBlock 
            quote={`"I'd rather focus on prevention than illness."`}
            author="- Andrew Lessman"
          />
        </AnimatedImageColumn>
      }
    />
  );
}

// ============================================================================
// VALUES SECTION
// ============================================================================

function CircleIcon({ icon }: { icon: 'shield' | 'sun' | 'flask' | 'leaf' }) {
  const IconComponent = {
    shield: ShieldCheck,
    sun: Sun,
    flask: FlaskConical,
    leaf: Leaf,
  }[icon];

  return (
    <div className="bg-[#e8f9f9] content-stretch flex items-center justify-center p-[28px] relative rounded-[999px] shrink-0 size-[104px]" data-name="circle icon">
      <IconComponent className="size-[48px] text-[#009296]" strokeWidth={1.5} />
    </div>
  );
}

function ValueCard({ title, description, icon }: { title: string; description: string; icon: 'shield' | 'sun' | 'flask' | 'leaf' }) {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[20px] self-stretch shrink-0" data-name="card">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-start px-[40px] py-[60px] relative size-full">
          <CircleIcon icon={icon} />
          <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="copy">
            <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.8] relative shrink-0 text-[#009296] text-[28px] tracking-[-0.56px] w-full">{title}</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#003b3c] text-[20px] tracking-[-0.2px] w-full">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueCardsRow({ cards }: { cards: Array<{ title: string; description: string; icon: 'shield' | 'sun' | 'flask' | 'leaf' }> }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-name="cards-row">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
          className="basis-0 grow min-h-px min-w-px self-stretch shrink-0"
        >
          <ValueCard {...card} />
        </motion.div>
      ))}
    </div>
  );
}

function ValuesSection() {
  const valuesData = {
    row1: [
      {
        title: "100% pure & additive-free",
        description: "The only vitamins in the world completely free of additives, fillers, and artificial ingredients.",
        icon: 'shield' as const
      },
      {
        title: "Solar-powered manufacturing",
        description: "One of the largest private solar installations powers our entire facility—the only supplement manufacturer to do so.",
        icon: 'sun' as const
      }
    ],
    row2: [
      {
        title: "We make what we sell",
        description: "Complete control from formulation to manufacturing in our Henderson, Nevada facility ensures unmatched quality.",
        icon: 'flask' as const
      },
      {
        title: "Environmental excellence",
        description: "LEED Gold certified for green energy, environmental responsibility, and an outstanding work environment.",
        icon: 'leaf' as const
      }
    ]
  };

  return (
    <div className="bg-[#f6f2ec] relative shrink-0 w-full" data-name="values-section">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[176px] py-[120px] relative w-full">
          <div className="content-stretch flex flex-col gap-[120px] items-center relative shrink-0 w-full">
            <SectionHeadline 
              eyebrow="WHAT SETS US APART"
              headline={
                <>
                  <p className="font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] mb-0 text-[92px]">Changing times,</p>
                  <p className="font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] text-[92px]">
                    <span className="text-[#003b3c]">enduring</span>
                    <span>{` values.`}</span>
                  </p>
                </>
              }
              align="center"
              animated={true}
            />
            <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
              <ValueCardsRow cards={valuesData.row1} />
              <ValueCardsRow cards={valuesData.row2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ENVIRONMENTAL SECTION
// ============================================================================

function ByTheNumbersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  interface StatCardProps {
    value: number;
    suffix: string;
    label: string;
    delay: number;
  }

  function StatCard({ value, suffix, label, delay }: StatCardProps) {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      if (!isInView) return;

      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = value / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          currentStep++;
          if (currentStep >= steps) {
            setCount(value);
            clearInterval(interval);
          } else {
            setCount(Math.floor(increment * currentStep));
          }
        }, stepDuration);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timer);
    }, [isInView, value, delay]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: delay / 1000 }}
        className="content-stretch flex flex-col gap-[20px] items-center text-center relative shrink-0"
      >
        <div className="font-['STIX_Two_Text:Regular',sans-serif] font-normal text-[#009296] text-[80px] leading-[1] tracking-[-1.6px]">
          {count.toLocaleString()}{suffix}
        </div>
        <div className="font-['Inter:Regular',sans-serif] font-normal text-[#003b3c] text-[20px] leading-[1.4] tracking-[-0.2px] max-w-[280px]">
          {label}
        </div>
      </motion.div>
    );
  }

  const stats = [
    { value: 45, suffix: '+', label: 'Years in Business', delay: 0 },
    { value: 500, suffix: 'M+', label: 'Supplements Manufactured', delay: 100 },
    { value: 25, suffix: 'M+', label: 'kWh Solar Energy Generated', delay: 200 },
    { value: 15, suffix: 'K+', label: 'Tons CO₂ Emissions Prevented', delay: 300 },
  ];

  return (
    <div className="bg-white relative shrink-0 w-full" data-name="by-the-numbers-section">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[176px] py-[120px] relative w-full">
          <div ref={ref} className="content-stretch flex flex-col gap-[100px] items-center relative shrink-0 w-full">
            <SectionHeadline 
              eyebrow="BY THE NUMBERS"
              headline={
                <>
                  Proven impact.
                  <br aria-hidden="true" />
                  Measurable results.
                </>
              }
              align="center"
              animated={true}
            />
            <div className="grid grid-cols-4 gap-[60px] w-full">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  delay={stat.delay}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnvironmentalSection() {
  const headline = (
    <SectionHeadline 
      eyebrow="ENVIRONMENTAL LEADERSHIP"
      headline={
        <p className="font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] min-w-full relative shrink-0 text-[#003b3c] text-[58px] tracking-[-1.16px] w-[min-content]">
          <span>{`Supplements `}</span>
          <span className="text-[#009296]">powered</span>
          <span>{` by the sun.`}</span>
        </p>
      }
      align="left"
    />
  );

  const body = (
    <>
      <p className="mb-0">One of the largest private solar energy installations in the world powers our entire facility—making us the only supplement manufacturer to do so.</p>
      <p className="mb-0">&nbsp;</p>
      <p>{`We're LEED Existing Building (EB) GOLD certified for green energy production, environmentally responsible upgrades, and an outstanding work environment.`}</p>
    </>
  );

  return (
    <TwoColumnSection
      leftContent={
        <AnimatedImageColumn>
          <ImageBlock src={imgSolarPanels} alt="Solar panels at ProCaps facility" />
        </AnimatedImageColumn>
      }
      rightContent={<StickyContent headline={headline} body={body} />}
      reverse={true}
    />
  );
}

// ============================================================================
// TIMELINE SECTION
// ============================================================================

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  side: 'left' | 'right';
  index: number;
  isLast?: boolean;
}

function TimelineItem({ year, title, description, side, index, isLast }: TimelineItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative flex items-center justify-center w-full mb-[200px] last:mb-0">
      {/* Left content */}
      <div className="flex-1 flex justify-end pr-[60px]">
        {side === 'left' && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="text-right max-w-[400px]"
          >
            <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[28px] text-[#009296] mb-[10px] leading-[1.2]">
              {title}
            </p>
            <p className="font-['Inter:Regular',sans-serif] text-[18px] text-[#003b3c] leading-[1.4]">
              {description}
            </p>
          </motion.div>
        )}
      </div>

      {/* Center circle with year */}
      <div className="relative flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
          className="w-[150px] h-[150px] rounded-full border-[2px] border-[#009296] bg-white flex items-center justify-center relative z-10"
        >
          <p className="font-['Inter:Medium',sans-serif] font-medium text-[20px] text-[#009296] tracking-[1px]">
            {year}
          </p>
        </motion.div>

        {/* Vertical line - only show if not the last item */}
        {!isLast && (
          <div className="absolute left-1/2 top-[150px] w-[2px] h-[200px] -translate-x-1/2 overflow-hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              className="w-full h-full bg-[#009296] origin-top"
            />
          </div>
        )}
      </div>

      {/* Right content */}
      <div className="flex-1 flex justify-start pl-[60px]">
        {side === 'right' && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="text-left max-w-[400px]"
          >
            <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[28px] text-[#009296] mb-[10px] leading-[1.2]">
              {title}
            </p>
            <p className="font-['Inter:Regular',sans-serif] text-[18px] text-[#003b3c] leading-[1.4]">
              {description}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function TimelineSection() {
  const timelineData = [
    {
      year: "1979",
      title: "Founded by Andrew Lessman",
      description: "Created the world's first 100% pure, additive-free vitamins for elite athletes and health professionals.",
      side: 'left' as const
    },
    {
      year: "1980s",
      title: "Television Pioneer",
      description: "First to bring nutritional supplements to QVC with education-based presentations.",
      side: 'right' as const
    },
    {
      year: "1996",
      title: "State-of-the-Art Facility",
      description: "Moved to HSN and built a 125,000 sq ft manufacturing facility in Henderson, Nevada.",
      side: 'left' as const
    },
    {
      year: "TODAY",
      title: "ProCaps Laboratories",
      description: "Still founder-owned. Solar-powered. Dedicated to the world's finest supplements.",
      side: 'right' as const
    }
  ];

  return (
    <div className="bg-[#e8f9f9] relative shrink-0 w-full" data-name="timeline-section">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[176px] py-[120px] relative w-full">
          <div className="content-stretch flex flex-col gap-[120px] items-center relative shrink-0 w-full">
            <SectionHeadline 
              eyebrow="OUR JOURNEY"
              headline={
                <>
                  Four decades
                  <br aria-hidden="true" />
                  of excellence.
                </>
              }
              align="center"
              animated={true}
            />
            <div className="relative w-full max-w-[1200px] mx-auto">
              {timelineData.map((item, index) => (
                <TimelineItem
                  key={item.year}
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  side={item.side}
                  index={index}
                  isLast={index === timelineData.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// EDUCATION SECTION
// ============================================================================

function EducationSection() {
  const headline = (
    <SectionHeadline 
      eyebrow="INNOVATION IN MARKETING"
      headline={
        <p className="font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] min-w-full relative shrink-0 text-[#003b3c] text-[58px] tracking-[-1.16px] w-[min-content]">
          <span className="text-[#009296]">Education</span>
          <span>{` over entertainment.`}</span>
        </p>
      }
      align="left"
    />
  );

  const body = (
    <p>Andrew pioneered supplement sales on television in the late 1980s, presenting on QVC without celebrities or gimmicks—just honest, science-based education.</p>
  );

  return (
    <TwoColumnSection
      leftContent={<StickyContent headline={headline} body={body} />}
      rightContent={
        <AnimatedImageColumn>
          <ImageBlock alt="Andrew Lessman on QVC" />
          <QuoteBlock 
            quote='"People will listen to an honest, respectful presentation without sensationalism."'
            author="- Andrew Lessman"
          />
        </AnimatedImageColumn>
      }
    />
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function OurStoryPage() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative w-full" data-name="ourstory desktop">
      <Hero />
      <FounderSection />
      <ValuesSection />
      <ByTheNumbersSection />
      <EnvironmentalSection />
      <TimelineSection />
      <EducationSection />
    </div>
  );
}