// Shared Product Card Component
import svgPaths from "../imports/svg-vsxzdz3mbf";
import imgImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";

interface ProductCardProps {
  hasImage?: boolean;
  onQuickView?: () => void;
  onCardClick?: () => void;
  headline?: React.ReactNode;
  imageSrc?: string;
}

export default function ProductCard({ hasImage = true, onQuickView, onCardClick, headline, imageSrc }: ProductCardProps) {
  // Default headline
  const defaultHeadline = (
    <>
      <span>An </span>
      <span className="font-['STIX_Two_Text:Italic',sans-serif] italic text-[#009296]">Unparalleled </span>
      Natural Source of Fiber
    </>
  );

  return (
    <div className="basis-0 bg-[#F6F2EC] grow h-full rounded-[10px] flex flex-col group">
      <div className="box-border flex flex-col items-center justify-between pb-[10px] md:pb-[20px] pt-[30px] md:pt-[40px] px-[10px] md:px-[20px] hd:px-[20px] h-full">
        {/* Stars + Headline */}
        <div className="w-full shrink-0">
          <div className="box-border flex flex-col gap-[10px] md:gap-[20px] items-center px-[10px] md:px-[20px] hd:px-[25px] py-0">
            {/* Ratings */}
            <div className="flex gap-px items-start justify-center w-full">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="relative size-[14px] md:size-[24px]">
                  <div className="absolute bottom-[9.55%] left-[2.45%] right-[2.45%] top-0">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 22">
                      <path d={svgPaths.p33530f00} fill="#F1A33A" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Headline */}
            <p className="product-headline font-['STIX_Two_Text:Regular',sans-serif] leading-[1.2] text-[#003b3c] text-center tracking-[-0.4px] xxl:tracking-[-0.44px] hd:tracking-[-0.56px]">
              {headline ? headline : defaultHeadline}
            </p>
          </div>
        </div>

        {/* Image - Clickable */}
        <div 
          onClick={onCardClick}
          className="aspect-square overflow-clip relative w-full cursor-pointer"
        >
          {hasImage ? (
            <img 
              alt="" 
              className="absolute inset-0 object-cover size-full group-hover:scale-105 transition-transform duration-300" 
              src={imageSrc ? imageSrc : imgImage} 
            />
          ) : (
            <div className="bg-[#e5ddd3] flex items-center justify-center size-full">
              <div className="size-[66px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
                  <path d={svgPaths.pdc9e330} fill="#B9B1A8" />
                </svg>
              </div>
            </div>
          )}
          
          {/* Cart Button */}
          {onQuickView && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onQuickView();
              }}
              className="absolute bottom-[0.49px] right-0 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="size-[50px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
                  <path d={svgPaths.ped05680} fill="white" />
                </svg>
              </div>
              <div className="absolute bottom-[13.49px] right-[13px] size-[24px] pointer-events-none">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                  <g>
                    <path d={svgPaths.p28485100} fill="#003B3C" stroke="#003B3C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.pd438b00} fill="#003B3C" stroke="#003B3C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p88a8300} stroke="#003B3C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}