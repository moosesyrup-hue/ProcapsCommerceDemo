import { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import svgPaths from "../imports/svg-vsxzdz3mbf";
import imgImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";
import { Checkbox } from "./ui/checkbox";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import QuickView from "./QuickView";
import FilterSidebar from "./FilterSidebar";
import CollectionBanner from "./CollectionBanner";
import CategoryCarousel from "./CategoryCarousel";
import { getCategoryBanner } from "../config/categoryData";

// Icon Components
function FilterIcon() {
  return (
    <div className="relative size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p2e051580} fill="white" />
        </g>
      </svg>
    </div>
  );
}

function ArrowDownIcon() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p2bc3cb80} fill="#003B3C" />
        </g>
      </svg>
    </div>
  );
}

// Filters Component
function Filters({ filtersVisible, onToggleFilters, activeFilterCount }: { filtersVisible: boolean; onToggleFilters: () => void; activeFilterCount: number }) {
  const [compare, setCompare] = useState(false);

  return (
    <div className="relative shrink-0 w-full">
      <div className="box-border flex flex-col gap-[30px] items-start pb-0 pt-[30px] px-[20px] md:px-[40px]">
        <div className="flex items-center justify-between w-full">
          {/* Show/Hide Filters Button */}
          <button 
            onClick={onToggleFilters}
            className="bg-[#009296] flex gap-[10px] h-[50px] items-center px-[30px] py-[15px] rounded-[999px] hover:bg-[#00b4ae] transition-colors"
          >
            <div className="flex items-center justify-center rotate-180 scale-y-[-1]">
              <FilterIcon />
            </div>
            <div className="flex items-center gap-[10px]">
              <p className="font-['Inter',sans-serif] font-medium text-[16px] text-center text-white tracking-[1.92px] uppercase">
                {filtersVisible ? 'HIDE FILTERS' : 'SHOW FILTERS'}
              </p>
              {activeFilterCount > 0 && (
                <div className="bg-white rounded-full w-[24px] h-[24px] flex items-center justify-center">
                  <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#009296]">
                    {activeFilterCount}
                  </span>
                </div>
              )}
            </div>
          </button>

          {/* Right Elements - Desktop Only */}
          <div className="hidden lg:flex gap-[30px] items-center">
            {/* Compare Toggle */}
            <div className="flex gap-[20px] items-center">
              <p className="font-['Inter',sans-serif] text-[#003b3c] text-[16px]">Compare</p>
              <button 
                onClick={() => setCompare(!compare)}
                className="relative h-[24px] w-[46px]"
              >
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 24">
                  <g>
                    <path d={svgPaths.p1faf1100} fill="#003B3C" />
                    <circle cx={compare ? "34" : "12"} cy="12" fill="white" r="8" className="transition-all" />
                  </g>
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="h-[37px] w-[1px] bg-[#D9E2E2]" />

            {/* Sort */}
            <div className="flex gap-[60px] items-center">
              <p className="font-['Inter',sans-serif] text-[#003b3c] text-[16px]">
                <span>Sort by </span>
                <span className="font-medium">Featured</span>
              </p>
              <ArrowDownIcon />
            </div>
          </div>
        </div>

        <div className="h-0 w-full border-t border-[#D9E2E2]" />
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ hasImage = true, onQuickView, headline }: { hasImage?: boolean; onQuickView?: () => void; headline?: React.ReactNode }) {
  // Default headline
  const defaultHeadline = (
    <>
      <span>An </span>
      <span className="font-['STIX_Two_Text:Italic',sans-serif] italic text-[#009296]">Unparalleled </span>
      Natural Source of Fiber
    </>
  );

  return (
    <div className="basis-0 bg-[#F6F2EC] grow h-full rounded-[10px] flex flex-col">
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

        {/* Image */}
        <div className="aspect-square overflow-clip relative w-full">
          {hasImage ? (
            <img 
              alt="" 
              className="absolute inset-0 object-cover size-full" 
              src={imgImage} 
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
              onClick={onQuickView}
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

// Product Grid Component
function ProductGrid({ filtersVisible, onQuickView }: { filtersVisible: boolean; onQuickView: () => void }) {
  const products = [
    { hasImage: true },
    { hasImage: false },
    { hasImage: true },
    { hasImage: false },
    { hasImage: false },
    { hasImage: true },
    { hasImage: false },
    { hasImage: true },
  ];

  // Desktop: Show 3 columns when filters visible, 4 when hidden
  const desktopColumns = filtersVisible ? 3 : 4;

  // Custom headline for 2nd card (index 1)
  const getHeadline = (index: number) => {
    if (index === 1) {
      return (
        <>
          Here is an Example of a Long Headline (Flexbox automatically adjust the height of all cards in row to match tallest card)
        </>
      );
    }
    return undefined; // Use default headline
  };

  return (
    <div className="relative shrink-0 w-full">
      <div className={`box-border flex flex-col gap-[20px] items-start p-[20px] md:px-[40px] md:pt-[40px] md:pb-0 ${
        filtersVisible ? 'xl:pl-[40px]' : ''
      }`}>
        {/* Mobile S & Tablet M: 2 columns */}
        <div className="grid grid-cols-2 gap-x-[10px] gap-y-[20px] md:gap-[20px] w-full lg:hidden">
          {products.map((product, i) => (
            <div key={i} className="flex flex-col gap-[20px]">
              <ProductCard hasImage={product.hasImage} onQuickView={onQuickView} headline={getHeadline(i)} />
              {/* Product Info */}
              <div className="box-border flex flex-col gap-[20px] items-start pr-[20px] text-[#003b3c]">
                <div className="flex flex-col gap-[10px] items-start leading-[1.4] text-[16px] w-full">
                  <p className="font-['Inter',sans-serif] font-medium">Fibermucil</p>
                  <p className="font-['Inter',sans-serif] text-[#406c6d]">Natural Psylium Fiber in Small Capsules</p>
                </div>
                <p className="font-['Inter',sans-serif] font-medium leading-[1.6] text-[16px]">
                  <span className="text-[#D84315]">$19.90</span>
                  <span className="line-through font-normal ml-[8px]">$24.90</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout - Original */}
        <div className="hidden lg:block w-full">
          {/* First Row */}
          <div className="flex gap-[20px] items-center min-h-[425px] xl:min-h-[500px] w-full mb-[20px]">
            {products.slice(0, desktopColumns).map((product, i) => (
              <div key={i} className="basis-0 grow self-stretch">
                <ProductCard hasImage={product.hasImage} onQuickView={onQuickView} headline={getHeadline(i)} />
              </div>
            ))}
          </div>

          {/* Product Info Row */}
          <div className="flex gap-[20px] items-start pb-[40px] w-full">
            {[...Array(desktopColumns)].map((_, i) => (
              <div key={i} className="basis-0 grow">
                <div className="box-border flex flex-col gap-[20px] items-start pr-[20px] text-[#003b3c]">
                  <div className="flex flex-col gap-[10px] items-start leading-[1.4] text-[16px] w-full">
                    <p className="font-['Inter',sans-serif] font-medium">Fibermucil</p>
                    <p className="font-['Inter',sans-serif] text-[#406c6d]">Natural Psylium Fiber in Small Capsules</p>
                  </div>
                  <p className="font-['Inter',sans-serif] font-medium leading-[1.6] text-[16px]">
                    <span className="text-[#D84315]">$19.90</span>
                    <span className="line-through font-normal ml-[8px]">$24.90</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="flex gap-[20px] items-center min-h-[425px] xl:min-h-[500px] w-full mb-[20px]">
            {products.slice(desktopColumns, desktopColumns * 2).map((product, i) => (
              <div key={i} className="basis-0 grow self-stretch">
                <ProductCard hasImage={product.hasImage} onQuickView={onQuickView} headline={getHeadline(i + desktopColumns)} />
              </div>
            ))}
          </div>

          {/* Product Info Row */}
          <div className="flex gap-[20px] items-start pb-[40px] w-full">
            {[...Array(desktopColumns)].map((_, i) => (
              <div key={i} className="basis-0 grow">
                <div className="box-border flex flex-col gap-[20px] items-start pr-[20px] text-[#003b3c]">
                  <div className="flex flex-col gap-[10px] items-start leading-[1.4] text-[16px] w-full">
                    <p className="font-['Inter',sans-serif] font-medium">Fibermucil</p>
                    <p className="font-['Inter',sans-serif] text-[#406c6d]">Natural Psylium Fiber in Small Capsules</p>
                  </div>
                  <p className="font-['Inter',sans-serif] font-medium leading-[1.6] text-[16px]">
                    <span className="text-[#D84315]">$19.90</span>
                    <span className="line-through font-normal ml-[8px]">$24.90</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Collection Page Component
export default function CollectionPage({ 
  cartItems, 
  setCartItems,
  onOpenCart,
  category = 'digestive-health',
  onNavigateToCategory
}: { 
  cartItems: any[];
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
  onOpenCart: () => void;
  category?: string;
  onNavigateToCategory?: (category: string) => void;
}) {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRanges: [] as string[],
    ratings: [] as string[],
    benefits: [] as string[],
    alphabet: undefined as string | undefined,
  });

  // Sample product data for QuickView
  const fibermucilProduct = {
    id: 'fibermucil-001',
    name: 'Fibermucil',
    description: 'Natural Psyllium Fiber in Small Capsules',
    image: imgImage,
    basePrice: 24.90,
    salePrice: 19.95,
    isSpecial: true,
    counts: [
      { value: 60, label: '60', basePrice: 24.90, salePrice: 19.95 },
      { value: 180, label: '180', basePrice: 49.90, salePrice: 39.95 },
      { value: 360, label: '360', basePrice: 89.90, salePrice: 69.95 },
      { value: 1000, label: '1000', basePrice: 199.90, salePrice: 159.95 }
    ]
  };

  const handleToggleFilters = () => {
    // On mobile/tablet, open sheet drawer
    if (window.innerWidth < 1280) {
      setMobileFiltersOpen(!mobileFiltersOpen);
    } else {
      // On desktop, use sidebar
      setFiltersVisible(!filtersVisible);
    }
  };

  const handleAddToCart = (config: {
    productId: string;
    count: number;
    purchaseType: 'one-time' | 'subscribe';
    frequency?: number;
    quantity: number;
  }) => {
    console.log('Add to cart:', config);
    // Close QuickView and open MiniCart
    setQuickViewOpen(false);
    
    // Add item to cart
    const newItem = {
      id: `${config.productId}-${Date.now()}`,
      name: 'Fibermucil',
      count: `Count: ${config.count} capsules`,
      price: config.purchaseType === 'subscribe' ? 17.95 : 19.95,
      originalPrice: config.purchaseType === 'subscribe' ? 19.95 : undefined,
      quantity: config.quantity,
      image: imgImage,
      frequency: config.purchaseType === 'subscribe' && config.frequency 
        ? `Every ${config.frequency} days` 
        : undefined
    };
    
    setCartItems(items => [...items, newItem]);
    onOpenCart();
  };

  const handleViewProductDetails = () => {
    setQuickViewOpen(false);
    console.log('Navigate to product details page');
  };

  // Calculate active filter count
  const activeFilterCount = 
    filters.categories.length + 
    filters.priceRanges.length + 
    filters.ratings.length + 
    filters.benefits.length +
    (filters.alphabet ? 1 : 0);

  return (
    <>
      {/* Quick View Sheet */}
      <Sheet open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        <SheetContent side="right" className="w-full sm:w-[560px] sm:max-w-[560px] p-0 overflow-hidden [&>button]:hidden">
          <SheetTitle className="sr-only">Quick View</SheetTitle>
          <SheetDescription className="sr-only">Quick view product details and add to cart</SheetDescription>
          <QuickView
            product={fibermucilProduct}
            onClose={() => setQuickViewOpen(false)}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewProductDetails}
          />
        </SheetContent>
      </Sheet>
      
      <CollectionBanner 
        {...getCategoryBanner(category)}
      />
      
      {/* Category Carousel - Only show on "all-products" page */}
      {category === 'all-products' && onNavigateToCategory && (
        <CategoryCarousel onNavigateToCategory={onNavigateToCategory} />
      )}
      
      <Filters 
        filtersVisible={filtersVisible}
        onToggleFilters={handleToggleFilters}
        activeFilterCount={activeFilterCount}
      />
      
      {/* Mobile/Tablet Filter Sheet */}
      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent side="left" className="w-full sm:w-[400px] p-0 overflow-y-auto">
          <SheetTitle className="sr-only">Product Filters</SheetTitle>
          <SheetDescription className="sr-only">Filter products by categories, ingredients, availability, and price</SheetDescription>
          <FilterSidebar onClose={() => setMobileFiltersOpen(false)} filters={filters} setFilters={setFilters} />
        </SheetContent>
      </Sheet>
      
      {/* Content Area with Sidebar */}
      <div className="flex w-full">
        {/* Desktop Filter Sidebar - slides in from left */}
        {filtersVisible && (
          <div 
            className="hidden lg:block w-[280px] xl:w-[300px] hd:w-[320px] ml-[20px] transition-all duration-300 ease-in-out"
          >
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
        )}
        
        {/* Product Grid - adjusts width */}
        <div className="flex-1 transition-all duration-300">
          <ProductGrid filtersVisible={filtersVisible} onQuickView={() => setQuickViewOpen(true)} />
        </div>
      </div>
    </>
  );
}