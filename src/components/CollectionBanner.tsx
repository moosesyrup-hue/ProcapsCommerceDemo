/**
 * CollectionBanner Component
 * Reusable banner for collection pages with responsive layout
 * 
 * Mobile: Image stacked above text
 * Desktop: Image beside text (side by side)
 */

import React from 'react';

interface CollectionBannerProps {
  /** Main heading text */
  title: string;
  /** Description text */
  description: string;
  /** Image source - can be imported image or URL */
  imageSrc?: string;
  /** SVG path data (if using inline SVG instead of image) */
  svgPath?: string;
  /** Banner background color (desktop only) */
  backgroundColor?: string;
  /** Image container background color */
  imageBackgroundColor?: string;
  /** SVG fill color (if using inline SVG) */
  svgFillColor?: string;
}

export default function CollectionBanner({
  title,
  description,
  imageSrc,
  svgPath,
  backgroundColor = '#efe8de',
  imageBackgroundColor = '#e5ddd3',
  svgFillColor = '#B9B1A8',
}: CollectionBannerProps) {
  return (
    <div className="bg-white lg:bg-[var(--banner-bg)] relative shrink-0 w-full" style={{ '--banner-bg': backgroundColor } as React.CSSProperties}>
      {/* Desktop Layout - Side by side */}
      <div className="hidden lg:block lg:aspect-[1678/413]">
        <div className="flex flex-row items-center size-full">
          <div className="box-border flex items-center justify-between pl-[40px] pr-0 py-0 relative size-full">
            {/* Copy */}
            <div className="basis-0 grow relative">
              <div className="flex flex-col justify-center size-full">
                <div className="box-border flex flex-col gap-[20px] items-start justify-center pr-[40px] text-[#003b3c]">
                  <p className="font-['STIX_Two_Text',sans-serif] font-medium leading-[1.1] text-[38px] xl:text-[54px] hd:text-[72px] tracking-[-0.76px] xl:tracking-[-1.08px] hd:tracking-[-1.44px]">
                    {title}
                  </p>
                  <p className="font-['Inter',sans-serif] leading-[1.6] text-[16px] xl:text-[20px]">
                    {description}
                  </p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div 
              className="h-full aspect-[840/413.492] relative flex items-center justify-center"
              style={{ backgroundColor: imageBackgroundColor }}
            >
              {svgPath ? (
                <div className="size-[66px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
                    <path d={svgPath} fill={svgFillColor} />
                  </svg>
                </div>
              ) : imageSrc ? (
                <img 
                  src={imageSrc} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout - Image first, then copy */}
      <div className="lg:hidden">
        {/* Image */}
        <div 
          className="aspect-[840/413.492] relative w-full flex items-center justify-center"
          style={{ backgroundColor: imageBackgroundColor }}
        >
          {svgPath ? (
            <div className="size-[66px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
                <path d={svgPath} fill={svgFillColor} />
              </svg>
            </div>
          ) : imageSrc ? (
            <img 
              src={imageSrc} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>

        {/* Copy */}
        <div className="relative w-full">
          <div className="flex flex-col justify-center size-full">
            <div className="box-border flex flex-col gap-[20px] items-start justify-center px-[20px] md:px-[40px] pt-[30px] md:pt-[40px] pb-0 text-[#003b3c]">
              <p 
                className="font-['STIX_Two_Text',sans-serif] font-medium leading-[1.1] text-[28px] md:text-[38px] tracking-[-0.56px] md:tracking-[-0.76px]"
              >
                {title}
              </p>
              <p 
                className="font-['Inter',sans-serif] leading-[1.6] text-[16px]"
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}