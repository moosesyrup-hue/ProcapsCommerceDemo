import { useState, useEffect } from 'react';
import svgPathsL from "../imports/svg-npcn6vymav";
import svgPathsXl from "../imports/svg-ovhudlxac5";
import svgPathsHd from "../imports/svg-sng3ceu5u2";
import imgBanner from "figma:asset/be6b296809b899ffe49a39b24634e1a5d4abb146.png";
import imgModule from "figma:asset/4c2934de3dbf27b37b800c210c506dfc23cea7d9.png";
import imgModule1 from "figma:asset/bb079113e4e52e6f124be3a8b4815c8ab2dbad6d.png";
import imgImage from "figma:asset/2af175d1ace132d63709b5990887874d1e9098a5.png";
import imgImage1 from "figma:asset/e98d5399b4df9f21e58d7b3e829fa1be0652fdec.png";
import imgImage2 from "figma:asset/843a93f0744d908e4670d5a4585c5f1c7432e6f0.png";
import imgImage3 from "figma:asset/33d29cd45c53175dde8ab15537ea7417446bf54d.png";
import imgImage4 from "figma:asset/ae9200ae275214fab21ea17e682459720b9ddfa8.png";
import imgImage5 from "figma:asset/53da6d9ed35f82a7364b7a236e964b3d87a96086.png";
import imgImage6 from "figma:asset/07a96391057ade3b14e0a1c61eff3099de640600.png";

type Breakpoint = 'L' | 'XL' | 'HD';

export default function Homepage() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('XL');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1920) {
        setBreakpoint('HD');
      } else if (width >= 1440) {
        setBreakpoint('XL');
      } else {
        setBreakpoint('L');
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
      <BodyGroup breakpoint={breakpoint} svgPaths={svgPaths} />
    </div>
  );
}

// Banner Section
function Stars({ svgPaths }: { svgPaths: any }) {
  return (
    <div className="[grid-area:1_/_1] h-[30px] ml-0 mt-0 relative w-[164.081px]" data-name="stars">
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
  );
}

function Reviews({ svgPaths }: { svgPaths: any }) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="reviews">
      <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
        <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
          <Stars svgPaths={svgPaths} />
        </div>
      </div>
    </div>
  );
}

function Reviews1({ svgPaths }: { svgPaths: any }) {
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-center relative shrink-0 w-[250px]" data-name="reviews">
      <Reviews svgPaths={svgPaths} />
      <p className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic leading-[1.4] relative shrink-0 text-[#003b3c] text-[20px] text-center text-nowrap whitespace-pre">50,000+ verified 5-star reviews</p>
    </div>
  );
}

function Headline({ breakpoint }: { breakpoint: Breakpoint }) {
  const headlineSize = breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[54px]' : 'text-[38px]';
  const tracking = breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : 'tracking-[-0.76px]';
  const subTextSize = breakpoint === 'HD' || breakpoint === 'XL' ? 'text-[20px]' : 'text-[16px]';

  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 text-[#003b3c] text-center text-nowrap w-full whitespace-pre" data-name="headline">
      <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 text-[0px] ${headlineSize} ${tracking}`}>
        <span>
          The supplement brand
          <br aria-hidden="true" />
        </span>
        <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#009296]">trusted</span>
        <span>{` for over 45 years.`}</span>
      </p>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 ${subTextSize}`}>Refresh your mind and mood with our revitalizing products!</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#009296] box-border content-stretch flex gap-[10px] h-[50px] items-center justify-center px-[39px] py-[15px] relative rounded-[999px] shrink-0" data-name="button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[1.92px] uppercase whitespace-pre">OUR STORY</p>
    </div>
  );
}

function CarouselDots() {
  return (
    <div className="absolute bottom-[40.22px] h-[13px] left-[42px] w-[59px]" data-name="carousel dots">
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

function CopyGroup({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const width = breakpoint === 'HD' ? 'w-[800px]' : breakpoint === 'XL' ? 'w-[760px]' : 'w-[719px]';
  const topPos = breakpoint === 'HD' ? 'top-[80px]' : breakpoint === 'XL' ? 'top-[70px]' : 'top-[58px]';

  return (
    <div className={`absolute content-stretch flex flex-col gap-[30px] items-center left-[calc(50%+5px)] ${topPos} translate-x-[-50%] ${width}`} data-name="copy GROUP">
      <Reviews1 svgPaths={svgPathsL} />
      <Headline breakpoint={breakpoint} />
      <Button />
    </div>
  );
}

function Banner({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  return (
    <div className="relative shrink-0 w-full h-[47.5vw] max-h-[900px]" data-name="banner">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBanner} />
      <CarouselDots />
      <CopyGroup breakpoint={breakpoint} svgPaths={svgPaths} />
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

// 2-Up Module Cards
function Button1() {
  return (
    <div className="absolute bg-[#009296] bottom-[60.42px] box-border content-stretch flex gap-[10px] h-[50px] items-center justify-center left-[calc(50%+0.5px)] px-[39px] py-[15px] rounded-[999px] translate-x-[-50%]" data-name="button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[1.92px] uppercase whitespace-pre">SHOP OUR SPECIALS</p>
    </div>
  );
}

function Module({ breakpoint }: { breakpoint: Breakpoint }) {
  const headlineSize = breakpoint === 'HD' ? 'text-[48px]' : 'text-[34px]';
  const tracking = breakpoint === 'HD' ? 'tracking-[-0.96px]' : 'tracking-[-0.68px]';
  const width = breakpoint === 'HD' ? 'w-[650px]' : 'w-[552px]';

  return (
    <div className="aspect-[670/700] basis-0 grow min-h-px min-w-px overflow-clip relative rounded-[20px] shrink-0" data-name="module">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgModule} />
      <p className={`absolute font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] left-1/2 text-[#003b3c] text-[0px] ${headlineSize} text-center top-[56px] ${tracking} translate-x-[-50%] ${width}`}>
        <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#009296]">Mother Nature's</span>
        <span>{` most targeted protective molecules.`}</span>
      </p>
      <Button1 />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white bottom-[60.42px] box-border content-stretch flex gap-[10px] h-[50px] items-center justify-center left-[calc(50%+1px)] px-[39px] py-[15px] rounded-[999px] translate-x-[-50%]" data-name="button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#009296] text-[16px] text-center text-nowrap tracking-[1.92px] uppercase whitespace-pre">LEARN MORE</p>
    </div>
  );
}

function Module1({ breakpoint }: { breakpoint: Breakpoint }) {
  const headlineSize = breakpoint === 'HD' ? 'text-[48px]' : 'text-[34px]';
  const tracking = breakpoint === 'HD' ? 'tracking-[-0.96px]' : 'tracking-[-0.68px]';
  const width = breakpoint === 'HD' ? 'w-[540px]' : 'w-[448px]';

  return (
    <div className="aspect-[670/700] basis-0 grow min-h-px min-w-px overflow-clip relative rounded-[20px] shrink-0" data-name="module">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgModule1} />
      <Button2 />
      <p className={`absolute font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] left-1/2 text-[0px] ${headlineSize} text-center text-white top-[54.67px] ${tracking} translate-x-[-50%] ${width}`}>
        <span>
          No false promises,
          <br aria-hidden="true" />
        </span>
        <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#48e1dc]">truth</span>
        <span>{` in every capsule.`}</span>
      </p>
    </div>
  );
}

function Component2Up({ breakpoint }: { breakpoint: Breakpoint }) {
  return (
    <div className="relative shrink-0 w-full" data-name="2-up">
      <div className="flex flex-row justify-center size-full">
        <div className="box-border content-stretch flex gap-[20px] items-start justify-center px-[40px] py-0 relative w-full">
          <Module breakpoint={breakpoint} />
          <Module1 breakpoint={breakpoint} />
        </div>
      </div>
    </div>
  );
}

// Informed Choice Section
function CopyGroup1({ breakpoint }: { breakpoint: Breakpoint }) {
  const headlineSize = breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[54px]' : 'text-[38px]';
  const tracking = breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : 'tracking-[-0.76px]';
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

function ComponentCircle({ img, label }: { img: string; label: string }) {
  return (
    <div className="aspect-[210/278] basis-0 content-stretch flex flex-col gap-[40px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="aspect-[210/210] relative shrink-0 w-full" data-name="image">
        <img alt="" className="block max-w-none size-full" height="176" src={img} width="176" />
      </div>
      <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 text-[#003b3c] text-[20px] text-center tracking-[-0.2px] w-full">{label}</p>
    </div>
  );
}

function Columns() {
  return (
    <div className="aspect-[1130/278] content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-name="columns">
      <ComponentCircle img={imgImage} label="Product Category" />
      <ComponentCircle img={imgImage1} label="Body Part" />
      <ComponentCircle img={imgImage2} label="Body Function" />
      <ComponentCircle img={imgImage3} label="Health Issues" />
      <ComponentCircle img={imgImage4} label="Ingredients" />
    </div>
  );
}

function InformedChoice({ breakpoint }: { breakpoint: Breakpoint }) {
  const padding = breakpoint === 'HD' ? 'px-[200px]' : breakpoint === 'XL' ? 'px-[180px]' : 'px-[160px]';

  return (
    <div className="relative shrink-0 w-full" data-name="Informed Choice">
      <div className="flex flex-col items-center size-full">
        <div className={`box-border content-stretch flex flex-col gap-[60px] items-center ${padding} py-0 relative w-full`}>
          <CopyGroup1 breakpoint={breakpoint} />
          <Columns />
          <div className="h-0 relative shrink-0 w-full" data-name="hori line">
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

// Vitamin Specialist Section
function Layer({ svgPaths }: { svgPaths: any }) {
  return (
    <div className="[grid-area:1_/_1] h-[147.728px] ml-0 mt-0 relative w-[148.527px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 149 148">
        <g clipPath="url(#clip0_195_1807)" id="Layer_1">
          <path d={svgPaths.p31bcbd00} fill="var(--fill-0, #009296)" />
          <g id="Group">
            <path d={svgPaths.p2e7fb500} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p7928a00} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p1f920300} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p24ea2c0} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p338e96c0} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.pa752e70} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p21a97e00} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p205ac600} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p35640b00} fill="var(--fill-0, #009296)" />
          </g>
          <g id="Group_2">
            <path d={svgPaths.pfa37580} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p13f29180} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p24692340} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p3b587800} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p32c93d80} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p3954c440} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p362c1300} fill="var(--fill-0, #009296)" />
          </g>
          <g id="Group_3">
            <path d={svgPaths.p2a972f00} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p35caf500} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p18f46000} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p2c40a080} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p2ae01800} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p2794180} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p19635600} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p882ed00} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.p36ff4a00} fill="var(--fill-0, #009296)" />
            <path d={svgPaths.pd3d2c00} fill="var(--fill-0, #009296)" />
          </g>
          <path d={svgPaths.pd03e680} fill="var(--fill-0, #009296)" />
          <path d={svgPaths.p3a429000} fill="var(--fill-0, #009296)" />
        </g>
        <defs>
          <clipPath id="clip0_195_1807">
            <rect fill="white" height="147.728" width="148.527" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Vitaminspecialistbadge({ svgPaths }: { svgPaths: any }) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="vitaminspecialistbadge">
      <Layer svgPaths={svgPaths} />
    </div>
  );
}

function CopyVitamin({ breakpoint }: { breakpoint: Breakpoint }) {
  const headlineSize = breakpoint === 'HD' ? 'text-[40px]' : breakpoint === 'XL' ? 'text-[38px]' : 'text-[34px]';
  const tracking = breakpoint === 'HD' ? 'tracking-[-0.8px]' : breakpoint === 'XL' ? 'tracking-[-0.76px]' : 'tracking-[-0.68px]';
  const width = breakpoint === 'HD' ? 'w-[600px]' : breakpoint === 'XL' ? 'w-[580px]' : 'w-[555px]';
  const subTextSize = breakpoint === 'HD' || breakpoint === 'XL' ? 'text-[20px]' : 'text-[16px]';
  const subTextTracking = breakpoint === 'HD' || breakpoint === 'XL' ? 'tracking-[-0.2px]' : 'tracking-[-0.16px]';

  return (
    <div className="content-stretch flex flex-col items-center leading-[1.8] relative shrink-0 text-center" data-name="copy">
      <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium relative shrink-0 text-[#009296] ${headlineSize} text-nowrap ${tracking} whitespace-pre`}>Need personalized assistance?</p>
      <p className={`font-['Inter:Regular',sans-serif] font-normal h-[36px] not-italic relative shrink-0 text-[#003b3c] ${subTextSize} ${subTextTracking} ${width}`}>Talk to one of our knowledgeable, onsite Vitamin Specialists</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[50px] items-center justify-center px-[39px] py-[15px] relative rounded-[999px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#009296] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#009296] text-[16px] text-center text-nowrap tracking-[1.92px] uppercase whitespace-pre">CHAT NOW</p>
    </div>
  );
}

function VitaminSpecialist({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0" data-name="vitamin specialist">
      <Vitaminspecialistbadge svgPaths={svgPathsL} />
      <CopyVitamin breakpoint={breakpoint} />
      <Button3 />
    </div>
  );
}

// Video Section
function FrameVideoQuote({ breakpoint }: { breakpoint: Breakpoint }) {
  const headlineSize = breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[54px]' : 'text-[38px]';
  const tracking = breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : 'tracking-[-0.76px]';
  const quoteSize = breakpoint === 'HD' ? 'text-[34px]' : breakpoint === 'XL' ? 'text-[34px]' : 'text-[24px]';
  const quoteTracking = breakpoint === 'HD' ? 'tracking-[-0.68px]' : breakpoint === 'XL' ? 'tracking-[-0.68px]' : 'tracking-[-0.48px]';

  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 text-[#003b3c] w-full">
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

  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-[322.972px]">
      <AndrewSignatureNew svgPaths={svgPaths} />
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[#003b3c] ${textSize} ${tracking} w-[min-content]`}>- Founder, Procaps Laboratories</p>
    </div>
  );
}

function CopyGroup2({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[60px] grow items-start min-h-px min-w-px relative shrink-0" data-name="copy GROUP">
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

function ImageVideo({ svgPaths }: { svgPaths: any }) {
  return (
    <div className="aspect-[667.333/770] basis-0 box-border content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative rounded-[20px] shrink-0" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgImage5} />
      <Play svgPaths={svgPaths} />
    </div>
  );
}

function Columns1({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const gap = breakpoint === 'HD' ? 'gap-[200px]' : breakpoint === 'XL' ? 'gap-[190px]' : 'gap-[180px]';

  return (
    <div className={`basis-0 content-stretch flex ${gap} grow items-center min-h-px min-w-px relative shrink-0`} data-name="columns">
      <CopyGroup2 breakpoint={breakpoint} svgPaths={svgPaths} />
      <ImageVideo svgPaths={svgPaths} />
    </div>
  );
}

function VideoSection({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const padding = breakpoint === 'HD' ? 'px-[40px] py-[80px]' : breakpoint === 'XL' ? 'px-[40px] py-[70px]' : 'px-[40px] py-[60px]';

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
function BodyGroup({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  return (
    <div className="box-border content-stretch flex flex-col gap-[80px] items-center px-0 py-[80px] relative shrink-0 w-full" data-name="body group">
      <TickerScroll />
      <Component2Up breakpoint={breakpoint} />
      <InformedChoice breakpoint={breakpoint} />
      <VitaminSpecialist breakpoint={breakpoint} svgPaths={svgPaths} />
      <VideoSection breakpoint={breakpoint} svgPaths={svgPaths} />
      <PhactSection breakpoint={breakpoint} svgPaths={svgPaths} />
      <ProcapsDifferenceVideo breakpoint={breakpoint} svgPaths={svgPaths} />
    </div>
  );
}