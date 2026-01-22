import { useState, useRef } from 'react';
import ProductCard from './ProductCard';

type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

export default function HighestReviewedProducts({ breakpoint }: { breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const isDesktop = !isMobile && !isTablet;
  const padding = isMobile ? 'px-[24px] pb-[20px]' : isTablet ? 'px-[40px] pb-[20px]' : 'px-[40px] pb-0';
  const titleSize = isMobile ? 'text-[28px]' : isTablet ? 'text-[38px]' : 'text-[48px]';
  const titleTracking = isMobile ? 'tracking-[-0.56px]' : isTablet ? 'tracking-[-0.76px]' : 'tracking-[-0.96px]';
  
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
  
  return (
    <div className={`w-full bg-white ${padding}`}>
      <div className="flex flex-col items-start gap-[40px] w-full max-w-[1920px] mx-auto">
        {/* Title */}
        <h2 className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[#003b3c] ${titleSize} ${titleTracking}`}>
          Browse our highest reviewed products
        </h2>
        
        {/* Carousel - All Breakpoints with Native Scroll & Dots */}
        <div className="w-full flex flex-col gap-[40px]">
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