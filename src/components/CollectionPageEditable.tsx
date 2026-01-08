import { useState } from 'react';
import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import QuickView from "./QuickView";
import FilterSidebar from "./FilterSidebar";
import CollectionBannerEditable from "./CollectionBannerEditable";
import CategoryCarousel from "./CategoryCarousel";
import ProductGridEditable from "./ProductGridEditable";
import { getCategoryBanner } from "../config/categoryData";
import svgPaths from "../imports/svg-vsxzdz3mbf";
import imgImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";

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

// Collection Page Editable Component
export default function CollectionPageEditable({ 
  cartItems, 
  setCartItems,
  onOpenCart,
  category = 'all-products',
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
    price: 19.95,
    originalPrice: 24.95,
    rating: 5,
    reviewCount: 1234,
  };

  // Calculate active filter count
  const activeFilterCount = 
    filters.categories.length + 
    filters.priceRanges.length + 
    filters.ratings.length + 
    filters.benefits.length +
    (filters.alphabet ? 1 : 0);

  const handleToggleFilters = () => {
    if (window.innerWidth < 1024) {
      // On mobile/tablet, use sheet
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
    setQuickViewOpen(false);
    
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

  // Determine banner category
  let bannerCategory = category;
  if (category.includes('/')) {
    bannerCategory = category.split('/')[0];
  }

  return (
    <>
      {/* QuickView Sheet */}
      <Sheet open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        <SheetContent side="right" className="w-full sm:w-[700px] sm:max-w-[700px] p-0 overflow-y-auto [&>button]:hidden">
          <SheetTitle className="sr-only">Quick View</SheetTitle>
          <SheetDescription className="sr-only">Quick view of product details</SheetDescription>
          <QuickView
            product={fibermucilProduct}
            onClose={() => setQuickViewOpen(false)}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewProductDetails}
          />
        </SheetContent>
      </Sheet>
      
      {/* Collection Banner - EDITABLE */}
      <CollectionBannerEditable 
        title=""
        description=""
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
        
        {/* Product Grid - EDITABLE - adjusts width */}
        <div className="flex-1 transition-all duration-300">
          <ProductGridEditable 
            filtersVisible={filtersVisible} 
            onQuickView={() => setQuickViewOpen(true)} 
            onProductClick={() => onNavigateToProduct?.('fibermucil')} 
          />
        </div>
      </div>
    </>
  );
}