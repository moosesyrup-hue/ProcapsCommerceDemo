import { useState, useRef } from 'react';
import ProductCard from './ProductCard';
import svgPaths from "../imports/svg-nhihq506ga";
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

// 5-Star Badge Component
function FiveStarBadge({ breakpoint }: { breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  
  // Responsive sizes
  const badgeHeight = isMobile ? 'h-[120px]' : isTablet ? 'h-[140px]' : 'h-[184px]';
  const badgeWidth = isMobile ? 'w-[75px]' : isTablet ? 'w-[90px]' : 'w-[115px]';
  const numberSize = isMobile ? 'text-[52px]' : isTablet ? 'text-[60px]' : 'text-[80px]';
  const numberTracking = isMobile ? 'tracking-[-1.04px]' : isTablet ? 'tracking-[-1.2px]' : 'tracking-[-1.6px]';
  const starSize = isMobile ? 'text-[17px]' : isTablet ? 'text-[20px]' : 'text-[26px]';
  const starTracking = isMobile ? 'tracking-[0.34px]' : isTablet ? 'tracking-[0.4px]' : 'tracking-[0.52px]';
  const ratedSize = isMobile ? 'text-[10px]' : isTablet ? 'text-[12px]' : 'text-[16px]';
  const topOffset = isMobile ? 'top-[10px]' : isTablet ? 'top-[12px]' : 'top-[14px]';
  const starTopOffset = isMobile ? 'top-[58px]' : isTablet ? 'top-[68px]' : 'top-[90px]';
  
  return (
    <div className={`relative ${badgeHeight} ${badgeWidth}`}>
      {/* Badge background SVG */}
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 115 184">
        <path d={svgPaths.p7663300} fill="url(#paint0_linear_badge)" />
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_badge" x1="57.5" x2="57.5" y1="92" y2="362.169">
            <stop stopColor="#009296" />
            <stop offset="1" stopColor="#00B4AE" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Number 5 */}
      <p className={`absolute -translate-x-1/2 left-1/2 ${topOffset} font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-center text-white ${numberSize} ${numberTracking}`}>
        5
      </p>
      
      {/* STAR RATED text */}
      <div className={`absolute -translate-x-1/2 left-1/2 ${starTopOffset} font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic text-center text-white whitespace-nowrap`}>
        <p className={`font-['STIX_Two_Text:SemiBold',sans-serif] font-semibold leading-[1.3] mb-0 ${starSize} ${starTracking}`}>STAR</p>
        <p className={`leading-[1.2] ${ratedSize}`}>RATED</p>
      </div>
    </div>
  );
}

export default function HighestReviewedProducts({ breakpoint }: { breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const isDesktop = !isMobile && !isTablet;
  const paddingX = isMobile ? 'px-[24px]' : 'px-[40px]';
  const paddingBottom = isMobile ? 'pb-[60px]' : isTablet ? 'pb-[80px]' : 'pb-[100px]';
  
  // Title sizing - matches Procaps section with full 5-breakpoint scale
  const getTitleSize = () => {
    switch (breakpoint) {
      case 'S':
        return { size: 'text-[28px]', tracking: 'tracking-[-0.56px]' };
      case 'M':
        return { size: 'text-[34px]', tracking: 'tracking-[-0.68px]' };
      case 'L':
        return { size: 'text-[38px]', tracking: 'tracking-[-0.76px]' };
      case 'XL':
        return { size: 'text-[54px]', tracking: 'tracking-[-1.08px]' };
      case 'HD':
        return { size: 'text-[72px]', tracking: 'tracking-[-1.44px]' };
      default:
        return { size: 'text-[28px]', tracking: 'tracking-[-0.56px]' };
    }
  };
  
  const titleStyles = getTitleSize();
  const titleSize = titleStyles.size;
  const titleTracking = titleStyles.tracking;
  
  const headerGap = isMobile ? 'gap-[40px]' : isTablet ? 'gap-[50px]' : 'gap-[64px]';
  const sectionGap = isMobile ? 'gap-[40px]' : isTablet ? 'gap-[50px]' : 'gap-[64px]';
  
  const [activePage, setActivePage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // 8 products total
  const products = [
    {
      id: 'product-1',
      name: 'Ultimate Antioxidant',
      subtitle: 'Comprehensive Antioxidant Protection',
      price: 34.90,
      salePrice: 29.90,
    },
    {
      id: 'product-2',
      name: 'Essential-1 with Key-Sterone',
      subtitle: 'Complete Daily Multivitamin',
      price: 39.90,
      salePrice: 34.90,
    },
    {
      id: 'product-3',
      name: 'CoQ10',
      subtitle: 'Heart & Energy Support',
      price: 29.90,
      salePrice: 24.90,
    },
    {
      id: 'product-4',
      name: 'Omega-3 EPA-DHA',
      subtitle: 'Pure Fish Oil Formula',
      price: 27.90,
      salePrice: 22.90,
    },
    {
      id: 'product-5',
      name: 'Vitamin D3',
      subtitle: 'Bone & Immune Health',
      price: 19.90,
      salePrice: 16.90,
    },
    {
      id: 'product-6',
      name: 'Ocular Formula',
      subtitle: 'Advanced Eye Health',
      price: 32.90,
      salePrice: 27.90,
    },
    {
      id: 'product-7',
      name: 'Fibermucil',
      subtitle: 'Natural Psyllium Fiber',
      price: 24.90,
      salePrice: 19.90,
    },
    {
      id: 'product-8',
      name: 'Brain Formula',
      subtitle: 'Memory & Focus Support',
      price: 36.90,
      salePrice: 31.90,
    }
  ];
  
  // Products per page: Mobile=2, Tablet=3, Desktop=4
  const productsPerPage = isMobile ? 2 : isTablet ? 3 : 4;
  const totalPages = Math.ceil(products.length / productsPerPage);
  
  // Handle scroll to update active page
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const pageWidth = scrollRef.current.offsetWidth;
      const page = Math.round(scrollLeft / pageWidth);
      setActivePage(page);
    }
  };
  
  // Grid columns based on breakpoint
  const gridCols = isMobile ? 'grid-cols-2' : isTablet ? 'grid-cols-3' : 'grid-cols-4';
  const gapX = isMobile ? 'gap-x-[10px]' : 'gap-x-[20px]';
  
  // Arrow navigation handlers
  const handlePrevPage = () => {
    if (scrollRef.current) {
      const newPage = Math.max(0, activePage - 1);
      scrollRef.current.scrollTo({
        left: newPage * scrollRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleNextPage = () => {
    if (scrollRef.current) {
      const newPage = Math.min(totalPages - 1, activePage + 1);
      scrollRef.current.scrollTo({
        left: newPage * scrollRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className={`w-full bg-[#FCFAF8] ${paddingX}`}>
      <div className={`flex flex-col items-center ${sectionGap} ${paddingBottom} pt-0 w-full max-w-[1920px] mx-auto`}>
        {/* Header: Badge + Title */}
        <div className={`flex flex-col items-center ${headerGap} w-full`}>
          <FiveStarBadge breakpoint={breakpoint} />
          <h2 className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[#003b3c] text-center ${titleSize} ${titleTracking}`}>
            Browse our highest reviewed products
          </h2>
        </div>
        
        {/* Carousel - All Breakpoints with Native Scroll, Arrows & Dots */}
        <div className="w-full flex flex-col gap-[40px]">
          {/* Scrollable container with arrows positioned to beige card center */}
          <div className="relative w-full">
            {/* Navigation Arrows - Always visible, hidden on mobile via CSS, centered to beige card */}
            {/* Left Arrow */}
            <button
              onClick={handlePrevPage}
              disabled={activePage === 0}
              className={`absolute left-0 top-[calc(50%-60px)] md:top-[calc(50%-70px)] lg:top-[calc(50%-80px)] z-10 bg-white rounded-full shadow-lg size-[40px] md:size-[50px] flex items-center justify-center hover:bg-[#F6F2EC] transition-all -ml-[20px] md:-ml-[25px] hidden md:flex ${
                activePage === 0 ? 'opacity-0 cursor-not-allowed' : 'opacity-100'
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-[20px] md:size-[24px] text-[#003b3c]" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={handleNextPage}
              disabled={activePage === totalPages - 1}
              className={`absolute right-0 top-[calc(50%-60px)] md:top-[calc(50%-70px)] lg:top-[calc(50%-80px)] z-10 bg-white rounded-full shadow-lg size-[40px] md:size-[50px] flex items-center justify-center hover:bg-[#F6F2EC] transition-all -mr-[20px] md:-mr-[25px] hidden md:flex ${
                activePage === totalPages - 1 ? 'opacity-0 cursor-not-allowed' : 'opacity-100'
              }`}
              aria-label="Next page"
            >
              <ChevronRight className="size-[20px] md:size-[24px] text-[#003b3c]" />
            </button>
            
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            >
              <div className="flex">
                {Array.from({ length: totalPages }).map((_, pageIdx) => {
                  const startIdx = pageIdx * productsPerPage;
                  const pageProducts = products.slice(startIdx, startIdx + productsPerPage);
                  
                  return (
                    <div 
                      key={pageIdx} 
                      className="min-w-full snap-start"
                    >
                      <div className={`grid ${gridCols} ${gapX} gap-y-[20px]`}>
                        {pageProducts.map((product, idx) => (
                          <div key={startIdx + idx} className="flex flex-col gap-[20px]">
                            {/* Product Card */}
                            <ProductCard hasImage={true} onQuickView={() => {}} />
                            
                            {/* Product Info */}
                            <div className="flex flex-col gap-[10px] text-[#003b3c]">
                              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] text-[16px]">{product.name}</p>
                              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[14px] text-[#406c6d]">{product.subtitle}</p>
                              
                              {/* Price */}
                              <div className="flex gap-[10px] items-center">
                                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] text-[16px] text-[#D84315]">
                                  ${product.salePrice.toFixed(2)}
                                </p>
                                <p className="font-['Inter:Light',sans-serif] font-light leading-[1.4] text-[14px] line-through">
                                  ${product.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex gap-[8px] justify-center">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo({
                      left: idx * scrollRef.current.offsetWidth,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`w-[8px] h-[8px] rounded-full transition-colors ${
                  activePage === idx ? 'bg-[#009296]' : 'bg-[#D9E2E2]'
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}