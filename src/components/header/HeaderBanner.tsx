import GiftIcon from '../icons/GiftIcon';
import { headerData } from '../../data/headerData';

interface HeaderBannerProps {
  isMobileTablet: boolean;
  isDesktop: boolean;
}

export default function HeaderBanner({ isMobileTablet, isDesktop }: HeaderBannerProps) {
  const { freeShippingBanner } = headerData;

  return (
    <div className="flex flex-col gap-[15px] items-center relative shrink-0 w-full">
      <div className="flex flex-col gap-[13px] items-center relative shrink-0 w-full max-w-[1360px]">
        <div className="flex items-center justify-center relative shrink-0 gap-[14px]">
          <div>
            <GiftIcon />
          </div>
          <div className="flex flex-col font-['Inter',sans-serif] justify-center text-center text-white">
            <p className="text-[14px] leading-[24px] whitespace-nowrap">
              {isMobileTablet && freeShippingBanner.mobileText}
              {isDesktop && (
                <>
                  {freeShippingBanner.desktopText}<span className="underline">{freeShippingBanner.desktopLinkText}</span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-full border-t border-[#0CA9AD]" />
    </div>
  );
}
