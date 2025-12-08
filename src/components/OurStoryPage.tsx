import svgPaths from "../imports/svg-dtsi8ijs14";
import imgImage6 from "figma:asset/824e0153286d743295deed9bf24753e3f61b6757.png";
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

// ============================================================================
// HERO SECTION COMPONENTS
// ============================================================================

function Copy() {
  return (
    <div className="content-stretch flex flex-col gap-[46px] items-center relative shrink-0 text-center text-white w-full" data-name="copy">
      <div className="font-['STIX_Two_Text:Regular',sans-serif] font-normal h-[233px] leading-[1.1] relative shrink-0 text-[0px] text-[120px] tracking-[-2.4px] w-full">
        <p className="mb-0">
          <span className="font-['STIX_Two_Text:Regular',sans-serif] font-normal">Made</span>
          <span className="font-['STIX_Two_Text:Regular',sans-serif] font-normal"> </span>
          <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#48e1dc]">differently.</span>
        </p>
        <p>For a reason.</p>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[20px] w-[598px]">Founded by Andrew Lessman in 1979. Still owner-operated. The only facility in the world creating 100% pure, additive-free supplements powered entirely by solar energy.</p>
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
    <div className="content-stretch flex gap-[17px] items-center relative shrink-0" data-name="pill tabs">
      <PillTab>Founded 1979</PillTab>
      <PillTab>100% Solar Powered</PillTab>
      <PillTab>Owner-Operated</PillTab>
    </div>
  );
}

function HeroContentCopy() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-center relative shrink-0 w-full" data-name="hero content copy">
      <div className="flex h-[111px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "110.984375", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[111px]" data-name="vertical line">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 111 1">
                <line id="vertical line" stroke="var(--stroke-0, white)" x2="111" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Copy />
      <PillTabs />
    </div>
  );
}

function Largepillimage() {
  return (
    <div className="h-[421px] overflow-clip relative shrink-0 w-[790px]" data-name="largepillimage">
      <div className="absolute h-[153.212px] right-[102.87px] top-[49.23px] w-[605.626px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 606 154">
          <path d={svgPaths.p3b8f4700} fill="var(--fill-0, white)" id="Vector 41" />
        </svg>
      </div>
      <div className="absolute left-[-295px] size-[1382px] top-[-571px]" data-name="image 6">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage6} />
      </div>
      
      {/* Shimmer mask container - positioned exactly over the pill image */}
      <div 
        className="absolute left-[-295px] size-[1382px] top-[-571px] pointer-events-none overflow-hidden"
        style={{
          maskImage: `url(${imgImage6})`,
          WebkitMaskImage: `url(${imgImage6})`,
          maskSize: 'cover',
          WebkitMaskSize: 'cover',
          maskPosition: '50% 50%',
          WebkitMaskPosition: '50% 50%',
        }}
      >
        {/* Shimmer gradient that animates inside the mask */}
        <motion.div
          className="absolute inset-0 w-[200%]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, transparent 45%, rgba(255, 255, 255, 0.4) 50%, transparent 55%, transparent 100%)',
          }}
          animate={{
            x: ['-50%', '50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
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
      {/* Solid teal background - matching header color */}
      <div className="bg-[#009296] relative w-full" style={{ height: '700px' }}>
        <HeroGroup />
      </div>
      
      {/* White section with wave divider at top */}
      <div className="relative bg-white" style={{ paddingTop: '300px' }}>
        {/* Wavy divider - positioned at top of white section */}
        <div className="absolute left-0 right-0 w-full pointer-events-none" style={{ top: '-1px', zIndex: 1 }}>
          <svg 
            className="w-full h-auto" 
            viewBox="0 0 1440 300" 
            fill="none" 
            preserveAspectRatio="none"
            style={{ display: 'block' }}
          >
            <path 
              d="M0,0 L0,150 C360,60 480,60 720,150 C960,240 1080,240 1440,150 L1440,0 Z" 
              fill="#009296"
            />
            <path 
              d="M0,150 C360,60 480,60 720,150 C960,240 1080,240 1440,150 L1440,300 L0,300 Z" 
              fill="white"
            />
          </svg>
        </div>
        
        {/* Pill image - positioned to sit on top of the wave */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '50px', zIndex: 2 }}>
          <Largepillimage />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// FOUNDER SECTION COMPONENTS
// ============================================================================

function HeadlineGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="headline group">
      <div className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 text-[#003b3c] tracking-[-1.16px] w-full">
        <p className="mb-0 text-[58px]">Founder owned.</p>
        <p className="text-[#009296] text-[58px]">Always.</p>
      </div>
      <div className="h-0 relative shrink-0 w-[50px]" data-name="line">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 1">
            <line id="line" stroke="var(--stroke-0, #009296)" x2="50" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#009296] text-[20px] tracking-[2px] w-full uppercase">MEET ANDREW LESSMAN</p>
    </div>
  );
}

function Left() {
  return (
    <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-[431px]" data-name="left">
      <HeadlineGroup />
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#003b3c] text-[20px] tracking-[-0.4px] w-full">
        <p className="mb-0">Andrew Lessman—biochemist, law student, and elite decathlon athlete—founded ProCaps in 1979 after realizing most supplements were low quality and made without regard to scientific research.</p>
        <p className="mb-0">&nbsp;</p>
        <p>{`He created the world's first 100% pure, additive-free vitamins for his own athletic needs. The company remains privately owned with no shareholders or board of directors—just Andrew's unwavering commitment to your health.`}</p>
      </div>
    </div>
  );
}

function Image() {
  return <div className="aspect-[789/800] bg-[#ccd8d8] overflow-clip rounded-[20px] shrink-0 w-full" data-name="image 1" />;
}

function QuoteGroup() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[20px] items-start leading-[1.4] not-italic relative shrink-0 text-[#003b3c] w-full" data-name="quote group">
      <p className="relative shrink-0 text-[28px] tracking-[-0.56px] w-full">{`"I'd rather focus on prevention than illness."`}</p>
      <p className="relative shrink-0 text-[20px] tracking-[-0.2px] w-full">- Andrew Lessman</p>
    </div>
  );
}

function Quote() {
  return (
    <div className="bg-[#e8f9f9] relative rounded-[20px] shrink-0 w-full" data-name="quote 1">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[55px] py-[50px] relative w-full">
          <QuoteGroup />
        </div>
      </div>
    </div>
  );
}

function QuoteImage() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[60px] grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="quote image 1">
      <Image />
      <Quote />
    </div>
  );
}

function Component2Up() {
  return (
    <div className="relative shrink-0 w-full" data-name="2up">
      <div className="size-full">
        <div className="content-stretch flex gap-[110px] items-start px-[176px] relative w-full" style={{ paddingTop: '289px', paddingBottom: '120px' }}>
          <Left />
          <QuoteImage />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VALUES SECTION COMPONENTS
// ============================================================================

function HeadlineGroup1() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-[785px]" data-name="headline group">
      <div className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[0] min-w-full relative shrink-0 text-[#003b3c] text-[0px] text-center tracking-[-1.84px] w-[min-content]">
        <p className="font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] mb-0 text-[92px]">Changing times,</p>
        <p className="font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] text-[92px]">
          <span className="text-[#003b3c]">enduring</span>
          <span>{` values.`}</span>
        </p>
      </div>
      <div className="h-0 relative shrink-0 w-[50px]" data-name="line">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 1">
            <line id="line" stroke="var(--stroke-0, #009296)" x2="50" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] min-w-full not-italic relative shrink-0 text-[#009296] text-[20px] text-center tracking-[2px] w-[min-content]">WHAT SETS US APART</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="icon">
          <path d={svgPaths.p25837100} fill="var(--fill-0, #009296)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CircleIcon() {
  return (
    <div className="bg-[#e8f9f9] content-stretch flex items-center p-[28px] relative rounded-[999px] shrink-0 size-[104px]" data-name="circle icon">
      <Icon1 />
    </div>
  );
}

function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[20px] self-stretch shrink-0" data-name="card">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-start px-[40px] py-[60px] relative size-full">
          <CircleIcon />
          <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="copy">
            <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.8] relative shrink-0 text-[#009296] text-[28px] tracking-[-0.56px] w-full">{title}</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#003b3c] text-[20px] tracking-[-0.2px] w-full">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-name="row1">
      <Card 
        title="100% pure & additive-free" 
        description="The only vitamins in the world completely free of additives, fillers, and artificial ingredients." 
      />
      <Card 
        title="Solar-powered manufacturing" 
        description="The only vitamins in the world completely free of additives, fillers, and artificial ingredients." 
      />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-name="row2">
      <Card 
        title="We make what we sell" 
        description="The only vitamins in the world completely free of additives, fillers, and artificial ingredients." 
      />
      <Card 
        title="Environmental excellence" 
        description="The only vitamins in the world completely free of additives, fillers, and artificial ingredients." 
      />
    </div>
  );
}

function CardsGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="cards group">
      <Row />
      <Row1 />
    </div>
  );
}

function HeadlineAndCardsGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[120px] items-center relative shrink-0 w-full" data-name="headline and cards group">
      <HeadlineGroup1 />
      <CardsGroup />
    </div>
  );
}

function Section() {
  return (
    <div className="bg-[#f6f2ec] relative shrink-0 w-full" data-name="section">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[176px] py-[120px] relative w-full">
          <HeadlineAndCardsGroup />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ENVIRONMENTAL SECTION COMPONENTS
// ============================================================================

function Image1() {
  return <div className="aspect-[789/800] bg-[#ccd8d8] overflow-clip rounded-[20px] shrink-0 w-full" data-name="image 1" />;
}

function QuoteImage1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="quote image 1">
      <Image1 />
    </div>
  );
}

function HeadlineGroup2() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="headline group">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] min-w-full not-italic relative shrink-0 text-[#009296] text-[20px] tracking-[2px] w-[min-content]">ENVIRONMENTAL LEADERSHIP</p>
      <div className="h-0 relative shrink-0 w-[50px]" data-name="line">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 1">
            <line id="line" stroke="var(--stroke-0, #009296)" x2="50" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] min-w-full relative shrink-0 text-[#003b3c] text-[58px] tracking-[-1.16px] w-[min-content]">
        <span>{`Supplements `}</span>
        <span className="text-[#009296]">powered</span>
        <span>{` by the sun.`}</span>
      </p>
    </div>
  );
}

function Left1() {
  return (
    <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-[431px]" data-name="left">
      <HeadlineGroup2 />
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#003b3c] text-[20px] tracking-[-0.4px] w-full">
        <p className="mb-0">One of the largest private solar energy installations in the world powers our entire facility—making us the only supplement manufacturer to do so.</p>
        <p className="mb-0">&nbsp;</p>
        <p>{`We're LEED Existing Building (EB) GOLD certified for green energy production, environmentally responsible upgrades, and an outstanding work environment.`}</p>
      </div>
    </div>
  );
}

function Component2Up1() {
  return (
    <div className="relative shrink-0 w-full" data-name="2up">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[110px] items-center px-[176px] py-[120px] relative w-full">
          <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
            <QuoteImage1 />
          </div>
          <Left1 />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TIMELINE SECTION COMPONENTS
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
    <div ref={ref} className="relative flex items-center justify-center w-full mb-[80px] last:mb-0">
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
          className="w-[120px] h-[120px] rounded-full border-[2px] border-[#009296] bg-white flex items-center justify-center relative z-10"
        >
          <p className="font-['Inter:Medium',sans-serif] font-medium text-[20px] text-[#009296] tracking-[1px]">
            {year}
          </p>
        </motion.div>

        {/* Vertical line - only show if not the last item */}
        {!isLast && (
          <div className="absolute left-1/2 top-[120px] w-[2px] h-[80px] -translate-x-1/2 overflow-hidden">
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

function TimelineContent() {
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
    <div className="relative w-full max-w-[1200px] mx-auto pt-[60px]">
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
  );
}

function HeadlineGroup3() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-[785px]" data-name="headline group">
      <p className="font-['STIX_Two_Text:Regular',sans-serif] font-normal leading-[1.1] min-w-full relative shrink-0 text-[#003b3c] text-[92px] text-center tracking-[-1.84px] w-[min-content]">
        Four decades
        <br aria-hidden="true" />
        of excellence.
      </p>
      <div className="h-0 relative shrink-0 w-[50px]" data-name="line">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 1">
            <line id="line" stroke="var(--stroke-0, #009296)" x2="50" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] min-w-full not-italic relative shrink-0 text-[#009296] text-[20px] text-center tracking-[2px] w-[min-content]">OUR JOURNEY</p>
    </div>
  );
}

function HeadlineAndCardsGroup1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="headline and cards group">
      <HeadlineGroup3 />
      <TimelineContent />
    </div>
  );
}

function Timeline() {
  return (
    <div className="bg-[#e8f9f9] relative shrink-0 w-full" data-name="timeline">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[176px] py-[120px] relative w-full">
          <HeadlineAndCardsGroup1 />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// EDUCATION SECTION COMPONENTS
// ============================================================================

function HeadlineGroup4() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="headline group">
      <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] min-w-full relative shrink-0 text-[#003b3c] text-[58px] tracking-[-1.16px] w-[min-content]">
        <span className="text-[#009296]">Education</span>
        <span>{` over entertainment.`}</span>
      </p>
      <div className="h-0 relative shrink-0 w-[50px]" data-name="line">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 1">
            <line id="line" stroke="var(--stroke-0, #009296)" x2="50" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] min-w-full not-italic relative shrink-0 text-[#009296] text-[20px] tracking-[2px] w-[min-content]">INNOVATION IN MARKETING</p>
    </div>
  );
}

function Left2() {
  return (
    <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-[431px]" data-name="left">
      <HeadlineGroup4 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#003b3c] text-[20px] tracking-[-0.4px] w-full">Andrew pioneered supplement sales on television in the late 1980s, presenting on QVC without celebrities or gimmicks—just honest, science-based education.</p>
    </div>
  );
}

function Image2() {
  return <div className="aspect-[789/800] bg-[#ccd8d8] overflow-clip rounded-[20px] shrink-0 w-full" data-name="image 1" />;
}

function QuoteGroup1() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[20px] items-start leading-[1.4] not-italic relative shrink-0 text-[#003b3c] w-full" data-name="quote group">
      <p className="relative shrink-0 text-[28px] tracking-[-0.56px] w-full">"People will listen to an honest, respectful presentation without sensationalism."</p>
      <p className="relative shrink-0 text-[20px] tracking-[-0.2px] w-full">- Andrew Lessman</p>
    </div>
  );
}

function Quote1() {
  return (
    <div className="bg-[#e8f9f9] relative rounded-[20px] shrink-0 w-full" data-name="quote 1">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[55px] py-[50px] relative w-full">
          <QuoteGroup1 />
        </div>
      </div>
    </div>
  );
}

function QuoteImage2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[60px] grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="quote image 1">
      <Image2 />
      <Quote1 />
    </div>
  );
}

function Component2Up2() {
  return (
    <div className="relative shrink-0 w-full" data-name="2up">
      <div className="size-full">
        <div className="content-stretch flex gap-[110px] items-start px-[176px] py-[120px] relative w-full">
          <Left2 />
          <QuoteImage2 />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function OurStoryPage() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative w-full" data-name="ourstory desktop">
      <Hero />
      <Component2Up />
      <Section />
      <Component2Up1 />
      <Timeline />
      <Component2Up2 />
    </div>
  );
}