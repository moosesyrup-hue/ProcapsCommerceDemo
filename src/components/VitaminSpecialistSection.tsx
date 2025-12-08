type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

// Clean, production-ready Vitamin Specialist Badge component
function VitaminSpecialistBadge({ svgPaths, breakpoint }: { svgPaths: any; breakpoint: Breakpoint }) {
  // Responsive badge sizing
  const getSize = () => {
    switch (breakpoint) {
      case 'S':
        return { width: 100, height: 100 };
      case 'M':
        return { width: 120, height: 120 };
      case 'L':
      case 'XL':
      case 'HD':
      default:
        return { width: 148, height: 148 };
    }
  };
  
  const { width, height } = getSize();
  
  return (
    <div 
      className="relative shrink-0 flex items-center justify-center" 
      style={{ width: `${width}px`, height: `${height}px` }}
      data-name="vitamin-specialist-badge"
    >
      <svg 
        className="block w-full h-full" 
        fill="none" 
        viewBox="0 0 149 148"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip-vitamin-badge)" id="Layer_1">
          <path d={svgPaths.p31bcbd00} fill="#009296" />
          <g id="Group">
            <path d={svgPaths.p2e7fb500} fill="#009296" />
            <path d={svgPaths.p7928a00} fill="#009296" />
            <path d={svgPaths.p1f920300} fill="#009296" />
            <path d={svgPaths.p24ea2c0} fill="#009296" />
            <path d={svgPaths.p338e96c0} fill="#009296" />
            <path d={svgPaths.pa752e70} fill="#009296" />
            <path d={svgPaths.p21a97e00} fill="#009296" />
            <path d={svgPaths.p205ac600} fill="#009296" />
            <path d={svgPaths.p35640b00} fill="#009296" />
          </g>
          <g id="Group_2">
            <path d={svgPaths.pfa37580} fill="#009296" />
            <path d={svgPaths.p13f29180} fill="#009296" />
            <path d={svgPaths.p24692340} fill="#009296" />
            <path d={svgPaths.p3b587800} fill="#009296" />
            <path d={svgPaths.p32c93d80} fill="#009296" />
            <path d={svgPaths.p3954c440} fill="#009296" />
            <path d={svgPaths.p362c1300} fill="#009296" />
          </g>
          <g id="Group_3">
            <path d={svgPaths.p2a972f00} fill="#009296" />
            <path d={svgPaths.p35caf500} fill="#009296" />
            <path d={svgPaths.p18f46000} fill="#009296" />
            <path d={svgPaths.p2c40a080} fill="#009296" />
            <path d={svgPaths.p2ae01800} fill="#009296" />
            <path d={svgPaths.p2794180} fill="#009296" />
            <path d={svgPaths.p19635600} fill="#009296" />
            <path d={svgPaths.p882ed00} fill="#009296" />
            <path d={svgPaths.p36ff4a00} fill="#009296" />
            <path d={svgPaths.pd3d2c00} fill="#009296" />
          </g>
          <path d={svgPaths.pd03e680} fill="#009296" />
          <path d={svgPaths.p3a429000} fill="#009296" />
        </g>
        <defs>
          <clipPath id="clip-vitamin-badge">
            <rect fill="white" height="148" width="149" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CopyVitamin({ breakpoint }: { breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const headlineSize = isMobile || isTablet ? 'text-[24px]' : breakpoint === 'HD' ? 'text-[40px]' : breakpoint === 'XL' ? 'text-[38px]' : 'text-[34px]';
  const tracking = isMobile || isTablet ? 'tracking-[-0.48px]' : breakpoint === 'HD' ? 'tracking-[-0.8px]' : breakpoint === 'XL' ? 'tracking-[-0.76px]' : 'tracking-[-0.68px]';
  const subTextSize = isMobile || isTablet ? 'text-[16px]' : breakpoint === 'HD' || breakpoint === 'XL' ? 'text-[20px]' : 'text-[16px]';
  const subTextTracking = isMobile || isTablet ? 'tracking-[-0.16px]' : breakpoint === 'HD' || breakpoint === 'XL' ? 'tracking-[-0.2px]' : 'tracking-[-0.16px]';
  const padding = isMobile || isTablet ? 'px-[20px]' : '';
  const gap = isMobile || isTablet ? 'gap-[20px]' : 'gap-[10px]';
  const maxWidth = breakpoint === 'HD' ? 'max-w-[600px]' : breakpoint === 'XL' ? 'max-w-[580px]' : breakpoint === 'L' ? 'max-w-[555px]' : 'max-w-none';

  return (
    <div className={`content-stretch flex flex-col items-center ${gap} relative shrink-0 text-center w-full ${padding}`} data-name="copy">
      <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#009296] ${headlineSize} ${tracking} w-full`}>
        Need personalized assistance?
      </p>
      <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#003b3c] ${subTextSize} ${subTextTracking} w-full ${maxWidth}`}>
        Talk to one of our knowledgeable, onsite Vitamin Specialists
      </p>
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

export default function VitaminSpecialist({ breakpoint, svgPaths }: { breakpoint: Breakpoint; svgPaths: any }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const gap = isMobile || isTablet ? 'gap-[30px]' : 'gap-[40px]';
  
  return (
    <div className={`content-stretch flex flex-col ${gap} items-center relative shrink-0`} data-name="vitamin specialist">
      <VitaminSpecialistBadge svgPaths={svgPaths} breakpoint={breakpoint} />
      <CopyVitamin breakpoint={breakpoint} />
      <Button3 />
    </div>
  );
}
