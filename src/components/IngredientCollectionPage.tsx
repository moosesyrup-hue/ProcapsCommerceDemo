import { useState } from 'react';
import svgPaths from "../imports/svg-vsxzdz3mbf";
import imgImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import FilterSidebar from "./FilterSidebar";
import CollectionBanner from "./CollectionBanner";
import { products } from '../data/products';

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

        {/* Mobile/Tablet - Compare and Sort */}
        <div className="flex lg:hidden gap-[20px] items-center w-full">
          {/* Compare */}
          <div className="flex gap-[10px] items-center">
            <p className="font-['Inter',sans-serif] text-[#003b3c] text-[14px] sm:text-[16px]">Compare</p>
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
          <div className="flex gap-[20px] sm:gap-[40px] items-center flex-1">
            <p className="font-['Inter',sans-serif] text-[#003b3c] text-[14px] sm:text-[16px]">
              <span>Sort by </span>
              <span className="font-medium">Featured</span>
            </p>
            <ArrowDownIcon />
          </div>
        </div>
      </div>

      <div className="h-0 w-full border-t border-[#D9E2E2] mt-[30px]" />
    </div>
  );
}

// Product Card Component
function ProductCard({ product, headline }: { product: any; headline?: React.ReactNode }) {
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
          {product.image ? (
            <img 
              alt="" 
              className="absolute inset-0 object-cover size-full" 
              src={product.image} 
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
          <button 
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
        </div>
      </div>
    </div>
  );
}

// Product Grid Component
function ProductGrid({ filtersVisible, filteredProducts }: { filtersVisible: boolean; filteredProducts: any[] }) {
  // Desktop: Show 3 columns when filters visible, 4 when hidden
  const desktopColumns = filtersVisible ? 3 : 4;

  // Pad products to fill rows
  const paddedProducts = [...filteredProducts];
  
  return (
    <div className="relative shrink-0 w-full">
      <div className={`box-border flex flex-col gap-[20px] items-start p-[20px] md:px-[40px] md:pt-[40px] md:pb-0 ${
        filtersVisible ? 'xl:pl-[40px]' : ''
      }`}>
        {/* Mobile S & Tablet M: 2 columns */}
        <div className="grid grid-cols-2 gap-x-[10px] gap-y-[20px] md:gap-[20px] w-full lg:hidden">
          {paddedProducts.map((product, i) => (
            <div key={i} className="flex flex-col gap-[20px]">
              <ProductCard product={product} />
              {/* Product Info */}
              <div className="box-border flex flex-col gap-[20px] items-start pr-[20px] text-[#003b3c]">
                <div className="flex flex-col gap-[10px] items-start leading-[1.4] text-[16px] w-full">
                  <p className="font-['Inter',sans-serif] font-medium">{product.name}</p>
                  <p className="font-['Inter',sans-serif] text-[#406c6d]">{product.description}</p>
                </div>
                <p className="font-['Inter',sans-serif] font-medium leading-[1.6] text-[16px]">
                  {product.salePrice ? (
                    <>
                      <span className="text-[#D84315]">${product.salePrice.toFixed(2)}</span>
                      <span className="line-through font-normal ml-[8px]">${product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span>${product.price.toFixed(2)}</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block w-full">
          {paddedProducts.length === 0 ? (
            <div className="text-center py-[60px]">
              <p className="font-['Inter',sans-serif] text-[18px] text-[#003b3c]/60">
                No products found with this ingredient.
              </p>
            </div>
          ) : (
            <>
              {Array.from({ length: Math.ceil(paddedProducts.length / desktopColumns) }).map((_, rowIndex) => {
                const rowProducts = paddedProducts.slice(rowIndex * desktopColumns, (rowIndex + 1) * desktopColumns);
                
                return (
                  <div key={rowIndex}>
                    {/* Product Cards Row */}
                    <div className={`grid gap-[20px] items-center min-h-[425px] xl:min-h-[500px] w-full mb-[20px] ${
                      desktopColumns === 3 ? 'grid-cols-3' : 'grid-cols-4'
                    }`}>
                      {rowProducts.map((product, i) => (
                        <div key={i} className="self-stretch">
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>

                    {/* Product Info Row */}
                    <div className={`grid gap-[20px] items-start pb-[40px] w-full ${
                      desktopColumns === 3 ? 'grid-cols-3' : 'grid-cols-4'
                    }`}>
                      {rowProducts.map((product, i) => (
                        <div key={i}>
                          <div className="box-border flex flex-col gap-[20px] items-start pr-[20px] text-[#003b3c]">
                            <div className="flex flex-col gap-[10px] items-start leading-[1.4] text-[16px] w-full">
                              <p className="font-['Inter',sans-serif] font-medium">{product.name}</p>
                              <p className="font-['Inter',sans-serif] text-[#406c6d]">{product.description}</p>
                            </div>
                            <p className="font-['Inter',sans-serif] font-medium leading-[1.6] text-[16px]">
                              {product.salePrice ? (
                                <>
                                  <span className="text-[#D84315]">${product.salePrice.toFixed(2)}</span>
                                  <span className="line-through font-normal ml-[8px]">${product.price.toFixed(2)}</span>
                                </>
                              ) : (
                                <span>${product.price.toFixed(2)}</span>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Ingredient Collection Page Component
export default function IngredientCollectionPage({ 
  cartItems, 
  setCartItems,
  onOpenCart,
  ingredient = 'Vitamin C',
  onNavigateToCategory
}: { 
  cartItems: any[];
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
  onOpenCart: () => void;
  ingredient?: string;
  onNavigateToCategory?: (category: string) => void;
}) {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRanges: [] as string[],
    ratings: [] as string[],
    benefits: [] as string[],
    alphabet: undefined as string | undefined,
  });

  // Filter products by ingredient
  const filteredProducts = products.filter(product => 
    product.keyIngredients.some(ing => 
      ing.toLowerCase() === ingredient.toLowerCase()
    )
  );

  const handleToggleFilters = () => {
    // On mobile/tablet, open sheet drawer
    if (window.innerWidth < 1280) {
      setMobileFiltersOpen(!mobileFiltersOpen);
    } else {
      // On desktop, use sidebar
      setFiltersVisible(!filtersVisible);
    }
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
      {/* Banner */}
      <CollectionBanner 
        title={ingredient}
        description={`Explore all products containing ${ingredient}, carefully formulated for maximum purity and potency.`}
        svgPath={svgPaths.pdc9e330}
        backgroundColor="#F6F2EC"
        imageBackgroundColor="#e5ddd3"
        svgFillColor="#B9B1A8"
      />

      {/* Filters Bar */}
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
            filteredProducts={filteredProducts}
          />
        </div>
      </div>
    </>
  );
}