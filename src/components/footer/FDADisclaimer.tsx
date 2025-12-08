import { fdaDisclaimer } from '../../data/footerData';

interface FDADisclaimerProps {
  breakpoint: 'S' | 'M' | 'L' | 'XL' | 'HD';
}

export default function FDADisclaimer({ breakpoint }: FDADisclaimerProps) {
  const isMobileTablet = breakpoint === 'S' || breakpoint === 'M';
  const fdaPadding = isMobileTablet ? 'px-[10px]' : 'px-[139px]';
  const fdaTextSize = isMobileTablet ? 'text-[12px] leading-[1.4]' : 'text-[14px] leading-[1.8]';

  return (
    <div className="h-[80px] relative w-full border border-solid border-white">
      <div className="flex items-center justify-center size-full">
        <div className={`box-border flex gap-[10px] h-[80px] items-center justify-center ${fdaPadding} py-[26px]`}>
          <p className={`basis-0 font-['Inter',sans-serif] grow ${fdaTextSize} text-center text-white`}>
            {fdaDisclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
