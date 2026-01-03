import { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import svgPaths from "../imports/svg-vsxzdz3mbf";
import imgImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";
import { Checkbox } from "./ui/checkbox";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import QuickView from "./QuickView";
import FilterSidebar from "./FilterSidebar";
import CollectionBanner from "./CollectionBanner";
import CategoryCarousel from "./CategoryCarousel";
import ProductCard from "./ProductCard";
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

// Product Grid Component
function ProductGrid({ filtersVisible, onQuickView, onProductClick }: { filtersVisible: boolean; onQuickView: () => void; onProductClick?: () => void }) {
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
              <ProductCard hasImage={product.hasImage} onQuickView={onQuickView} onCardClick={onProductClick} headline={getHeadline(i)} />
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
          <div className={`grid gap-[20px] items-center min-h-[425px] xl:min-h-[500px] w-full mb-[20px] ${
            desktopColumns === 3 ? 'grid-cols-3' : 'grid-cols-4'
          }`}>
            {products.slice(0, desktopColumns).map((product, i) => (
              <div key={i} className="self-stretch">
                <ProductCard hasImage={product.hasImage} onQuickView={onQuickView} onCardClick={onProductClick} headline={getHeadline(i)} />
              </div>
            ))}
          </div>

          {/* Product Info Row */}
          <div className={`grid gap-[20px] items-start pb-[40px] w-full ${
            desktopColumns === 3 ? 'grid-cols-3' : 'grid-cols-4'
          }`}>
            {[...Array(desktopColumns)].map((_, i) => (
              <div key={i}>
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
          <div className={`grid gap-[20px] items-center min-h-[425px] xl:min-h-[500px] w-full mb-[20px] ${
            desktopColumns === 3 ? 'grid-cols-3' : 'grid-cols-4'
          }`}>
            {products.slice(desktopColumns, desktopColumns * 2).map((product, i) => (
              <div key={i} className="self-stretch">
                <ProductCard hasImage={product.hasImage} onQuickView={onQuickView} onCardClick={onProductClick} headline={getHeadline(i + desktopColumns)} />
              </div>
            ))}
          </div>

          {/* Product Info Row */}
          <div className={`grid gap-[20px] items-start pb-[40px] w-full ${
            desktopColumns === 3 ? 'grid-cols-3' : 'grid-cols-4'
          }`}>
            {[...Array(desktopColumns)].map((_, i) => (
              <div key={i}>
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
  onNavigateToCategory,
  onNavigateToProduct
}: { 
  cartItems: any[];
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
  onOpenCart: () => void;
  category?: string;
  onNavigateToCategory: (category: string) => void;
  onNavigateToProduct?: (productId: string) => void;
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

  // Special type for specials page
  const [activeSpecialType, setActiveSpecialType] = useState<'all' | 'todays-specials' | 'monthly-specials' | 'winter-specials'>('all');

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

  // Determine the banner category based on active special type
  const bannerCategory = category === 'specials' 
    ? (activeSpecialType === 'all' ? 'specials' : activeSpecialType)
    : category;

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
      
      {/* Collection Banner - Shows for all categories including specials */}
      <CollectionBanner 
        {...getCategoryBanner(bannerCategory)}
      />
      
      {/* Specials Tabs - Only show on specials page */}
      {category === 'specials' && (
        <div className="relative shrink-0 w-full border-b border-[#D9E2E2]">
          <div className="box-border flex gap-[40px] md:gap-[60px] items-center px-[20px] md:px-[40px] overflow-x-auto">
            <button
              onClick={() => setActiveSpecialType('all')}
              className={`py-[16px] transition-all whitespace-nowrap relative ${
                activeSpecialType === 'all' ? '' : 'hover:opacity-60'
              }`}
            >
              <span className={`font-['Inter',sans-serif] text-[14px] md:text-[16px] transition-colors ${
                activeSpecialType === 'all' ? 'text-[#009296]' : 'text-[#003b3c]'
              }`}>
                All Specials
              </span>
              {activeSpecialType === 'all' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#009296]" />
              )}
            </button>
            
            <button
              onClick={() => setActiveSpecialType('todays-specials')}
              className={`py-[16px] transition-all whitespace-nowrap relative ${
                activeSpecialType === 'todays-specials' ? '' : 'hover:opacity-60'
              }`}
            >
              <span className={`font-['Inter',sans-serif] text-[14px] md:text-[16px] transition-colors ${
                activeSpecialType === 'todays-specials' ? 'text-[#009296]' : 'text-[#003b3c]'
              }`}>
                Today's Specials
              </span>
              {activeSpecialType === 'todays-specials' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#009296]" />
              )}
            </button>
            
            <button
              onClick={() => setActiveSpecialType('monthly-specials')}
              className={`py-[16px] transition-all whitespace-nowrap relative ${
                activeSpecialType === 'monthly-specials' ? '' : 'hover:opacity-60'
              }`}
            >
              <span className={`font-['Inter',sans-serif] text-[14px] md:text-[16px] transition-colors ${
                activeSpecialType === 'monthly-specials' ? 'text-[#009296]' : 'text-[#003b3c]'
              }`}>
                Monthly Specials
              </span>
              {activeSpecialType === 'monthly-specials' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#009296]" />
              )}
            </button>
            
            <button
              onClick={() => setActiveSpecialType('winter-specials')}
              className={`py-[16px] transition-all whitespace-nowrap relative ${
                activeSpecialType === 'winter-specials' ? '' : 'hover:opacity-60'
              }`}
            >
              <span className={`font-['Inter',sans-serif] text-[14px] md:text-[16px] transition-colors ${
                activeSpecialType === 'winter-specials' ? 'text-[#009296]' : 'text-[#003b3c]'
              }`}>
                Winter Specials
              </span>
              {activeSpecialType === 'winter-specials' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#009296]" />
              )}
            </button>
          </div>
        </div>
      )}
      
      {/* Category Carousel - Only show on "all-products" page */}
      {category === 'all-products' && onNavigateToCategory && (
        <CategoryCarousel onNavigateToCategory={onNavigateToCategory} />
      )}
      
      {/* Body Part Carousel - Show on parent body-part page */}
      {category === 'body-part' && onNavigateToCategory && (
        <CategoryCarousel 
          type="body-part"
          onNavigateToCategory={(subCategory) => onNavigateToCategory(`body-part/${subCategory}`)} 
        />
      )}
      
      {/* Body Function Carousel - Show on parent body-function page */}
      {category === 'body-function' && onNavigateToCategory && (
        <CategoryCarousel 
          type="body-function"
          onNavigateToCategory={(subCategory) => onNavigateToCategory(`body-function/${subCategory}`)} 
        />
      )}
      
      {/* Health Issues Carousel - Show on parent health-issues page */}
      {category === 'health-issues' && onNavigateToCategory && (
        <CategoryCarousel 
          type="health-issues"
          onNavigateToCategory={(subCategory) => onNavigateToCategory(`health-issues/${subCategory}`)} 
        />
      )}
      
      {/* Product Category Carousel - Show on parent product-category page */}
      {category === 'product-category' && onNavigateToCategory && (
        <CategoryCarousel 
          type="product-category"
          onNavigateToCategory={(subCategory) => onNavigateToCategory(`product-category/${subCategory}`)} 
        />
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
          <ProductGrid 
            filtersVisible={filtersVisible} 
            onQuickView={() => setQuickViewOpen(true)} 
            onProductClick={() => onNavigateToProduct?.('fibermucil')} 
          />
        </div>
      </div>
    </>
  );
}