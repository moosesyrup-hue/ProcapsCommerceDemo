import { useState } from 'react';
import { X, Menu, Plus, Minus } from 'lucide-react';
import svgPaths from "./imports/svg-vsxzdz3mbf";
import imgImage from "figma:asset/902e9baf4329e9eccec5f8fbe2da4128f222cb1b.png";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
import { Checkbox } from "./components/ui/checkbox";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./components/ui/sheet";
import MiniCart from "./components/MiniCart";
import QuickView from "./components/QuickView";

// Icon Components
function GiftIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]">
      <div className="absolute inset-[10.42%_2.08%_6.25%_6.25%]">
        <div className="absolute inset-[-4.5%_-4.09%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
            <g>
              <path d="M4.91667 9.08333H2.41667" stroke="white" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d="M4.91667 13.25H4.08333" stroke="white" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d={svgPaths.p277d9de0} stroke="white" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d="M0.75 4.91667H4.91667" stroke="white" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d="M0.75 0.75H8.25V4.08333" stroke="white" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d={svgPaths.p2c5cae00} stroke="white" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d="M11.5833 6.58333V8.25H13.25" stroke="white" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <div className="relative shrink-0 size-[26px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g>
          <path d={svgPaths.p2d74cd80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M22.75 22.75L18.0375 18.0375" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function HeartIcon() {
  return (
    <div className="relative shrink-0 size-[26px]">
      <div className="absolute inset-[12.49%_8.33%_13.43%_8.33%]">
        <div className="absolute inset-[-3.89%_-3.46%_-5.62%_-3.46%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 22">
            <g>
              <path d={svgPaths.p3f83a9f1} stroke="white" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <div className="relative shrink-0 size-[26px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g>
          <path d={svgPaths.p9f6780} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a9b980} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function CartIcon() {
  return (
    <div className="relative shrink-0 size-[26px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g>
          <path d={svgPaths.pb88320} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p894b100} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p18c7e300} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

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

// Logo Component
function Logo() {
  return (
    <div className="absolute left-1/2 top-[10px] -translate-x-1/2">
      <div className="h-[40px] w-[109.045px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 38">
          <g>
            <path d={svgPaths.p25a86380} fill="white" />
            <path d={svgPaths.p20c71700} fill="white" />
            <path d={svgPaths.p23d24d80} fill="white" />
            <path d={svgPaths.p5ed1b80} fill="white" />
            <path d={svgPaths.p5733200} fill="white" />
            <path d={svgPaths.p2c85b100} fill="white" />
            <path d={svgPaths.p2a1d4000} fill="white" />
            <path d={svgPaths.p4324d00} fill="white" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// Header Component
function Header({ onMenuClick, onCartClick }: { onMenuClick: () => void; onCartClick: () => void }) {
  return (
    <div className="bg-[#009296] relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="box-border flex flex-col gap-[15px] items-center px-[20px] md:px-[40px] py-[15px] relative w-full">
          {/* Free Shipping Banner */}
          <div className="flex flex-col gap-[15px] items-center relative shrink-0 w-full">
            <div className="flex flex-col gap-[13px] items-center relative shrink-0 w-full max-w-[1360px]">
              <div className="flex items-center justify-center xl:justify-between relative shrink-0 w-full xl:w-[376px]">
                <div className="hidden xl:block">
                  <GiftIcon />
                </div>
                <div className="flex items-center gap-[14px] xl:gap-0">
                  <div className="xl:hidden">
                    <GiftIcon />
                  </div>
                  <div className="flex flex-col font-['Inter',sans-serif] justify-center text-center text-white">
                    <p className="text-[14px] leading-[24px]">
                      {/* Mobile and Tablet: Simple message */}
                      <span className="xl:hidden">FREE ground shipping on orders over $25</span>
                      {/* Desktop: Message with Details link */}
                      <span className="hidden xl:inline">FREE ground shipping on orders over $25  -  </span>
                      <span className="hidden xl:inline underline">Details</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-0 relative shrink-0 w-full border-t border-[#0CA9AD]" />
          </div>

          {/* Navigation */}
          <div className="h-[62px] relative shrink-0 w-full">
            {/* Mobile/Tablet Menu Button */}
            <button 
              onClick={onMenuClick}
              className="xl:hidden absolute left-0 top-1/2 -translate-y-1/2 text-white"
            >
              <Menu className="w-[26px] h-[26px]" />
            </button>

            {/* Desktop Categories */}
            <div className="hidden xl:flex absolute left-0 top-1/2 -translate-y-1/2 gap-[40px] items-center font-['Inter',sans-serif] font-medium text-[16px] text-white uppercase tracking-[1.6px]">
              <p>SHOP</p>
              <p>LEARN</p>
              <p>ABOUT</p>
              <p>HELP</p>
              <p>SPECIALS</p>
            </div>

            {/* Logo */}
            <Logo />

            {/* Icons */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-[20px] md:gap-[20px] xl:gap-[30px] items-center">
              <SearchIcon />
              {/* Heart and User icons: hidden on S (mobile), shown on M/L/XL/HD (768px+) */}
              <span className="hidden md:block"><HeartIcon /></span>
              <span className="hidden md:block"><UserIcon /></span>
              <button onClick={onCartClick} className="hover:opacity-80 transition-opacity">
                <CartIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Banner Component
function Banner() {
  return (
    <div className="bg-white xl:bg-[#efe8de] relative shrink-0 w-full">
      {/* Desktop Layout - Side by side */}
      <div className="hidden xl:block xl:aspect-[1678/413]">
        <div className="flex flex-row items-center size-full">
          <div className="box-border flex items-center justify-between pl-[40px] pr-0 py-0 relative size-full">
            {/* Copy */}
            <div className="basis-0 grow relative">
              <div className="flex flex-col justify-center size-full">
                <div className="box-border flex flex-col gap-[20px] items-start justify-center pr-[40px] text-[#003b3c]">
                  <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[38px] xxl:text-[54px] hd:text-[72px] tracking-[-0.76px] xxl:tracking-[-1.08px] hd:tracking-[-1.44px]">
                    Digestive health
                  </p>
                  <p className="font-['Inter',sans-serif] leading-[1.6] text-[16px] xxl:text-[20px]">
                    Maintaining a healthy digestion system is crucial for your overall health.
                  </p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="bg-[#e5ddd3] h-full aspect-[840/413.492] relative flex items-center justify-center">
              <div className="size-[66px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
                  <path d={svgPaths.pdc9e330} fill="#B9B1A8" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout - Image first, then copy */}
      <div className="xl:hidden">
        {/* Image */}
        <div className="aspect-[840/413.492] bg-[#e5ddd3] relative w-full flex items-center justify-center">
          <div className="size-[66px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
              <path d={svgPaths.pdc9e330} fill="#B9B1A8" />
            </svg>
          </div>
        </div>

        {/* Copy */}
        <div className="relative w-full">
          <div className="flex flex-col justify-center size-full">
            <div className="box-border flex flex-col gap-[20px] items-start justify-center px-[20px] md:px-[40px] pt-[30px] md:pt-[40px] pb-0 text-[#003b3c]">
              <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[28px] md:text-[38px] tracking-[-0.56px] md:tracking-[-0.76px]">
                Digestive health
              </p>
              <p className="font-['Inter',sans-serif] leading-[1.6] text-[16px]">
                Maintaining a healthy digestion system is crucial for your overall health.
              </p>
            </div>
          </div>
        </div>
      </div>
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
          <div className="hidden xl:flex gap-[30px] items-center">
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
function ProductCard({ hasImage = true, onQuickView }: { hasImage?: boolean; onQuickView?: () => void }) {
  return (
    <div className="basis-0 bg-[#efe8de] grow h-full rounded-[10px] flex flex-col">
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
              <span>An </span>
              <span className="font-['STIX_Two_Text:Italic',sans-serif] italic text-[#009296]">Unparalleled </span>
              Natural Source of Fiber
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

  return (
    <div className="relative shrink-0 w-full">
      <div className={`box-border flex flex-col gap-[20px] items-start p-[20px] md:p-[40px] ${
        filtersVisible ? 'xl:pl-[40px]' : ''
      }`}>
        {/* Mobile S & Tablet M: 2 columns */}
        <div className="grid grid-cols-2 gap-x-[10px] gap-y-[20px] md:gap-[20px] w-full xl:hidden">
          {products.map((product, i) => (
            <div key={i} className="flex flex-col gap-[20px]">
              <ProductCard hasImage={product.hasImage} onQuickView={onQuickView} />
              {/* Product Info */}
              <div className="box-border flex flex-col gap-[20px] items-start pr-[20px] text-[#003b3c]">
                <div className="flex flex-col gap-[10px] items-start leading-[1.4] text-[16px] w-full">
                  <p className="font-['Inter',sans-serif] font-medium">Fibermucil</p>
                  <p className="font-['Inter',sans-serif] text-[#406c6d]">Natural Psylium Fiber in Small Capsules</p>
                </div>
                <p className="font-['Inter',sans-serif] font-medium leading-[1.6] text-[16px]">
                  <span className="text-[#ba282a]">$19.90</span>
                  <span className="line-through font-normal ml-[8px]">$24.90</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout - Original */}
        <div className="hidden xl:block w-full">
          {/* First Row */}
          <div className="flex gap-[20px] items-center min-h-[425px] xxl:min-h-[500px] w-full mb-[20px]">
            {products.slice(0, desktopColumns).map((product, i) => (
              <div key={i} className="basis-0 grow self-stretch">
                <ProductCard hasImage={product.hasImage} onQuickView={onQuickView} />
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
                    <span className="text-[#ba282a]">$19.90</span>
                    <span className="line-through font-normal ml-[8px]">$24.90</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="flex gap-[20px] items-center min-h-[425px] xxl:min-h-[500px] w-full mb-[20px]">
            {products.slice(desktopColumns, desktopColumns * 2).map((product, i) => (
              <div key={i} className="basis-0 grow self-stretch">
                <ProductCard hasImage={product.hasImage} onQuickView={onQuickView} />
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
                    <span className="text-[#ba282a]">$19.90</span>
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

// Footer Component
function Footer() {
  return (
    <div className="bg-gradient-to-b from-[#009296] from-50% to-[#00b4ae] to-[196.83%] relative shrink-0 w-full">
      <div className="box-border flex gap-[10px] items-start px-[20px] md:px-[40px] xl:px-[40px] py-[40px] md:py-[60px] xl:py-[80px]">
        <div className="basis-0 flex flex-col gap-[40px] md:gap-[60px] xl:gap-[70px] grow">
          <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[28px] md:text-[38px] xl:text-[48px] text-white tracking-[-0.56px] md:tracking-[-0.76px] xl:tracking-[-0.96px]">
            The supplement brand trusted for over 45 years.
          </p>

          {/* Mobile/Tablet Accordion Layout */}
          <div className="xl:hidden">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="account" className="border-t border-b border-[#0CA9AD]">
                <AccordionTrigger className="group flex items-center justify-between py-[20px] hover:no-underline [&>svg]:hidden">
                  <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[20px] text-white">Account</p>
                  <div className="group-data-[state=open]:hidden">
                    <Plus className="w-[20px] h-[20px] text-white" />
                  </div>
                  <div className="hidden group-data-[state=open]:block">
                    <Minus className="w-[20px] h-[20px] text-white" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="font-['Inter',sans-serif] leading-[1.8] text-[14px] text-white pb-[10px]">
                    <p className="mb-0">My Account</p>
                    <p className="mb-0">Track Order</p>
                    <p className="mb-0">Reset Password</p>
                    <p>Shipping & Returns</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="about" className="border-b border-[#0CA9AD]">
                <AccordionTrigger className="group flex items-center justify-between py-[20px] hover:no-underline [&>svg]:hidden">
                  <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[20px] text-white">About</p>
                  <div className="group-data-[state=open]:hidden">
                    <Plus className="w-[20px] h-[20px] text-white" />
                  </div>
                  <div className="hidden group-data-[state=open]:block">
                    <Minus className="w-[20px] h-[20px] text-white" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="font-['Inter',sans-serif] leading-[1.8] text-[14px] text-white pb-[10px]">
                    <p className="mb-0">Our Story</p>
                    <p className="mb-0">Giving</p>
                    <p>Careers</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="support" className="border-b border-[#0CA9AD]">
                <AccordionTrigger className="group flex items-center justify-between py-[20px] hover:no-underline [&>svg]:hidden">
                  <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[20px] text-white">Support</p>
                  <div className="group-data-[state=open]:hidden">
                    <Plus className="w-[20px] h-[20px] text-white" />
                  </div>
                  <div className="hidden group-data-[state=open]:block">
                    <Minus className="w-[20px] h-[20px] text-white" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="font-['Inter',sans-serif] leading-[1.8] text-[14px] text-white pb-[10px]">
                    <p className="mb-0">Contact</p>
                    <p>FAQs</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Divider after accordion */}
            <div className="h-0 w-full border-t border-[#0CA9AD]" />

            {/* Sign Up */}
            <div className="flex flex-col gap-[20px] pt-[40px]">
              <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[20px] text-white">
                Save 10% off your next order
              </p>
              <p className="font-['Inter',sans-serif] leading-[1.8] text-[14px] text-white">
                Sign up for our newsletter to receive a welcome gift from us.
              </p>
              <div className="bg-white max-w-[555px]">
                <div className="box-border flex items-center justify-between leading-[1.8] px-[20px] py-[11px] text-[16px]">
                  <p className="font-['Inter',sans-serif] text-[#003b3c]">Email address</p>
                  <p className="font-['Inter',sans-serif] font-medium text-[#009296] tracking-[1.6px]">SUBMIT</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Divider */}
          <div className="hidden xl:block h-0 w-full border-t border-[#0CA9AD]" />

          {/* Desktop Columns Layout */}
          <div className="hidden xl:grid grid-cols-2 gap-[20px] h-[175px]">
            {/* Sign Up - Now First */}
            <div className="flex flex-col gap-[30px]">
              <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[24px] text-white">
                Save 10% off your next order
              </p>
              <p className="font-['Inter',sans-serif] leading-[1.8] text-[16px] text-white">
                Sign up for our newsletter to receive a welcome gift from us.
              </p>
              <div className="bg-white max-w-[555px]">
                <div className="box-border flex items-center justify-between leading-[1.8] px-[20px] py-[11px] text-[16px]">
                  <p className="font-['Inter',sans-serif] text-[#003b3c]">Email address</p>
                  <p className="font-['Inter',sans-serif] font-medium text-[#009296] tracking-[1.6px]">SUBMIT</p>
                </div>
              </div>
            </div>

            {/* Right Columns - Account, About, Support */}
            <div className="grid grid-cols-3 gap-[20px]">
              {/* Account */}
              <div className="flex flex-col gap-[30px] text-white">
                <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[24px]">Account</p>
                <div className="font-['Inter',sans-serif] leading-[1.8] text-[16px]">
                  <p className="mb-0">My Account</p>
                  <p className="mb-0">Track Order</p>
                  <p className="mb-0">Reset Password</p>
                  <p>Shipping & Returns</p>
                </div>
              </div>

              {/* About */}
              <div className="flex flex-col gap-[30px] text-white">
                <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[24px]">About</p>
                <div className="font-['Inter',sans-serif] leading-[1.8] text-[16px]">
                  <p className="mb-0">Our Story</p>
                  <p className="mb-0">Giving</p>
                  <p>Careers</p>
                </div>
              </div>

              {/* Support */}
              <div className="flex flex-col gap-[30px] text-white">
                <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[24px]">Support</p>
                <div className="font-['Inter',sans-serif] leading-[1.8] text-[16px]">
                  <p className="mb-0">Contact</p>
                  <p>FAQs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logo, Copyright, FDA */}
          <div className="flex flex-col gap-[30px] items-start w-full">
            <div className="h-[38px] w-[103.621px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 38">
                <g>
                  <path d={svgPaths.p25a86380} fill="white" />
                  <path d={svgPaths.p20c71700} fill="white" />
                  <path d={svgPaths.p23d24d80} fill="white" />
                  <path d={svgPaths.p5ed1b80} fill="white" />
                  <path d={svgPaths.p5733200} fill="white" />
                  <path d={svgPaths.p2c85b100} fill="white" />
                  <path d={svgPaths.p2a1d4000} fill="white" />
                  <path d={svgPaths.p4324d00} fill="white" />
                </g>
              </svg>
            </div>

            <p className="font-['Inter',sans-serif] leading-[1.8] text-[14px] text-white">
              <span>Copyright © 2024 ProCaps Laboratories, Inc.    </span>
              <span className="underline">Terms of Use</span>{' '}
              <span className="underline">Privacy Policy</span>
            </p>

            {/* FDA */}
            <div className="h-[80px] relative w-full border border-solid border-white">
              <div className="flex items-center justify-center size-full">
                <div className="box-border flex gap-[10px] h-[80px] items-center justify-center px-[10px] md:px-[10px] xl:px-[139px] py-[26px]">
                  <p className="basis-0 font-['Inter',sans-serif] grow leading-[1.4] md:leading-[1.4] xl:leading-[1.8] text-[12px] md:text-[12px] xl:text-[14px] text-center text-white">
                    *These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure or prevent any disease.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Filter Sidebar Component
function FilterSidebar({ onClose, filters, setFilters }: { 
  onClose?: () => void; 
  filters: {
    categories: string[];
    priceRanges: string[];
    ratings: string[];
    benefits: string[];
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    categories: string[];
    priceRanges: string[];
    ratings: string[];
    benefits: string[];
  }>>;
}) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBenefits, setShowAllBenefits] = useState(false);
  const [showAllRatings, setShowAllRatings] = useState(false);
  const [showAllPriceRanges, setShowAllPriceRanges] = useState(false);

  const filterOptions = {
    categories: [
      { id: 'anti-aging', label: 'Anti-Aging', count: 12 },
      { id: 'antioxidants', label: 'Antioxidants', count: 18 },
      { id: 'beauty', label: 'Beauty', count: 15 },
      { id: 'beverages', label: 'Beverages', count: 8 },
      { id: 'bone-skeletal', label: 'Bone & Skeletal Health', count: 14 },
      { id: 'brain', label: 'Brain Health', count: 16 },
      { id: 'cardiovascular', label: 'Cardiovascular Health', count: 20 },
      { id: 'circulation', label: 'Circulation', count: 10 },
      { id: 'digestive', label: 'Digestive Health', count: 24 },
      { id: 'energy', label: 'Energy', count: 13 },
      { id: 'immune', label: 'Immune Health', count: 22 },
      { id: 'vitamins-minerals', label: 'Individual Vitamins & Minerals', count: 35 },
      { id: 'joint', label: 'Joint Health', count: 17 },
      { id: 'meals-proteins', label: 'Meals & Proteins', count: 9 },
      { id: 'multivitamins', label: 'Multivitamins', count: 11 },
      { id: 'pet', label: 'Pet Products', count: 7 },
      { id: 'sleep', label: 'Sleep & Relaxation', count: 14 },
      { id: 'stress-mood', label: 'Stress & Mood', count: 16 },
      { id: 'sweeteners', label: 'Sweeteners', count: 5 },
      { id: 'vision', label: 'Vision Health', count: 12 },
      { id: 'weight', label: 'Weight Management', count: 10 },
      { id: 'other', label: 'Other', count: 8 },
    ],
    priceRanges: [
      { id: 'under20', label: 'Under $20', count: 12 },
      { id: '20-40', label: '$20 - $40', count: 28 },
      { id: 'over40', label: 'Over $40', count: 8 },
    ],
    ratings: [
      { id: '5star', label: '5 Stars', stars: 5, count: 16 },
      { id: '4star', label: '4 Stars & Up', stars: 4, count: 35 },
      { id: '3star', label: '3 Stars & Up', stars: 3, count: 45 },
    ],
    benefits: [
      { id: 'arteries', label: 'Arteries', count: 8 },
      { id: 'bladder', label: 'Bladder', count: 5 },
      { id: 'blood', label: 'Blood', count: 18 },
      { id: 'bones', label: 'Bones', count: 14 },
      { id: 'brain', label: 'Brain', count: 16 },
      { id: 'breast', label: 'Breast', count: 6 },
      { id: 'colon', label: 'Colon', count: 12 },
      { id: 'ears', label: 'Ears', count: 4 },
      { id: 'eyes', label: 'Eyes', count: 15 },
      { id: 'endocrine', label: 'Endocrine System', count: 10 },
      { id: 'gi-tract', label: 'GI Tract', count: 20 },
      { id: 'hair-skin-nails', label: 'Hair, Skin, & Nails', count: 22 },
      { id: 'heart', label: 'Heart', count: 25 },
      { id: 'immune', label: 'Immune System', count: 28 },
      { id: 'joints', label: 'Joints', count: 17 },
      { id: 'kidneys', label: 'Kidneys', count: 9 },
      { id: 'legs', label: 'Legs', count: 7 },
      { id: 'liver', label: 'Liver', count: 11 },
      { id: 'lungs', label: 'Lungs', count: 8 },
      { id: 'muscles', label: 'Muscles', count: 13 },
      { id: 'nerves', label: 'Nerves', count: 12 },
      { id: 'prostate', label: 'Prostate', count: 8 },
      { id: 'reproductive', label: 'Reproductive System', count: 6 },
      { id: 'stomach', label: 'Stomach', count: 15 },
      { id: 'urinary-tract', label: 'Urinary Tract', count: 7 },
      { id: 'veins', label: 'Veins', count: 9 },
    ],
  };

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const removeFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(v => v !== value)
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      priceRanges: [],
      ratings: [],
      benefits: [],
    });
  };

  const activeFilterCount = Object.values(filters).flat().length;

  // Get all active filters with their labels
  const getActiveFilters = () => {
    const active: Array<{ category: keyof typeof filters; id: string; label: string }> = [];
    
    (Object.keys(filters) as Array<keyof typeof filters>).forEach(category => {
      const categoryKey = category === 'priceRanges' ? 'priceRanges' : category;
      filters[category].forEach(id => {
        const option = filterOptions[categoryKey as keyof typeof filterOptions]?.find((opt: any) => opt.id === id);
        if (option) {
          active.push({ category, id, label: option.label });
        }
      });
    });
    
    return active;
  };

  return (
    <div className="w-full xl:w-[280px] xxl:w-[300px] hd:w-[320px] shrink-0 bg-white">
      <div className="xl:sticky top-0">
        <div className="px-[20px] md:px-[20px] xl:pl-[0px] xl:pr-[40px] pt-[30px] md:pt-[30px] xl:pt-[40px] pb-[40px]">
            {/* Mobile/Tablet Close Button */}
            {onClose && (
              <button 
                onClick={onClose}
                className="xl:hidden flex items-center gap-[10px] mb-[20px] text-[#003b3c] hover:text-[#009296]"
              >
                <X className="w-5 h-5" />
                <span className="font-['Inter',sans-serif] text-[16px]">Close Filters</span>
              </button>
            )}

            {/* Applied Filters Section */}
            {activeFilterCount > 0 && (
              <div>
                <p className="font-['Inter',sans-serif] font-medium leading-[1.6] text-[20px] text-[#003b3c] mb-[20px] pt-[20px]">
                  Applied filters
                </p>
                <div className="flex flex-col gap-[15px] mb-[20px]">
                  {getActiveFilters().map((filter, index) => (
                    <button
                      key={`${filter.category}-${filter.id}-${index}`}
                      onClick={() => removeFilter(filter.category, filter.id)}
                      className="border border-[#003b3c] border-solid rounded-[999px] px-[20px] py-[15px] h-[50px] flex items-center gap-[10px] text-left hover:bg-[#f5f5f5] transition-colors w-fit"
                    >
                      <p className="font-['Inter',sans-serif] leading-[1.4] text-[16px] text-[#003b3c] whitespace-nowrap">
                        {filter.label}
                      </p>
                      <X className="w-[16px] h-[16px] text-[#003b3c]" />
                    </button>
                  ))}
                </div>
                <button
                  onClick={clearAllFilters}
                  className="font-['Inter',sans-serif] text-[16px] text-[#003b3c] underline underline-offset-4 hover:text-[#009296] mb-[30px] block"
                >
                  Clear All
                </button>
                <div className="h-0 w-full border-t border-[#D9E2E2] mb-[30px]" />
              </div>
            )}

            {/* Categories Section */}
            <div className="w-full">
              <div className="border-b border-[#D9E2E2] pb-[30px]">
                <p className="font-['Inter',sans-serif] font-medium text-[20px] text-[#003b3c] pb-[20px]">
                  Categories
                </p>
                <div className="flex flex-col gap-[15px]">
                  {filterOptions.categories.slice(0, showAllCategories ? undefined : 10).map((option) => (
                    <div key={option.id} className="flex items-center gap-[10px]">
                      <Checkbox
                        id={`category-${option.id}`}
                        checked={filters.categories.includes(option.id)}
                        onCheckedChange={() => toggleFilter('categories', option.id)}
                        className="w-[20px] h-[20px] rounded-none border-[#003b3c] data-[state=unchecked]:bg-white"
                      />
                      <label
                        htmlFor={`category-${option.id}`}
                        className="font-['Inter',sans-serif] text-[16px] text-[#003b3c] leading-[1.4] cursor-pointer flex-1"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                  {filterOptions.categories.length > 10 && (
                    <button
                      onClick={() => setShowAllCategories(!showAllCategories)}
                      className="font-['Inter',sans-serif] text-[16px] text-[#003b3c] underline underline-offset-4 hover:text-[#009296] text-left"
                    >
                      {showAllCategories ? 'Show Less' : 'Show More'}
                    </button>
                  )}
                </div>
              </div>

              <div className="border-b border-[#D9E2E2] pt-[30px] pb-[30px]">
                <p className="font-['Inter',sans-serif] font-medium text-[20px] text-[#003b3c] pb-[20px]">
                  Benefits
                </p>
                <div className="flex flex-col gap-[15px]">
                  {filterOptions.benefits.slice(0, showAllBenefits ? undefined : 10).map((option) => (
                    <div key={option.id} className="flex items-center gap-[10px]">
                      <Checkbox
                        id={`benefit-${option.id}`}
                        checked={filters.benefits.includes(option.id)}
                        onCheckedChange={() => toggleFilter('benefits', option.id)}
                        className="w-[20px] h-[20px] rounded-none border-[#003b3c] data-[state=unchecked]:bg-white"
                      />
                      <label
                        htmlFor={`benefit-${option.id}`}
                        className="font-['Inter',sans-serif] text-[16px] text-[#003b3c] leading-[1.4] cursor-pointer flex-1"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                  {filterOptions.benefits.length > 10 && (
                    <button
                      onClick={() => setShowAllBenefits(!showAllBenefits)}
                      className="font-['Inter',sans-serif] text-[16px] text-[#003b3c] underline underline-offset-4 hover:text-[#009296] text-left"
                    >
                      {showAllBenefits ? 'Show Less' : 'Show More'}
                    </button>
                  )}
                </div>
              </div>

              <div className="border-b border-[#D9E2E2] pt-[30px] pb-[30px]">
                <p className="font-['Inter',sans-serif] font-medium text-[20px] text-[#003b3c] pb-[20px]">
                  Customer Rating
                </p>
                <div className="flex flex-col gap-[15px]">
                  {filterOptions.ratings.slice(0, showAllRatings ? undefined : 10).map((option) => (
                    <div key={option.id} className="flex items-center gap-[10px]">
                      <Checkbox
                        id={`rating-${option.id}`}
                        checked={filters.ratings.includes(option.id)}
                        onCheckedChange={() => toggleFilter('ratings', option.id)}
                        className="w-[20px] h-[20px] rounded-none border-[#003b3c] data-[state=unchecked]:bg-white"
                      />
                      <label
                        htmlFor={`rating-${option.id}`}
                        className="font-['Inter',sans-serif] text-[16px] text-[#003b3c] leading-[1.4] cursor-pointer flex-1 flex items-center gap-[8px]"
                      >
                        <div className="flex gap-px items-center">
                          {[...Array(option.stars)].map((_, i) => (
                            <div key={i} className="relative size-[16px]">
                              <div className="absolute bottom-[9.55%] left-[2.45%] right-[2.45%] top-0">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 22">
                                  <path d={svgPaths.p33530f00} fill="#F1A33A" />
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                        {option.stars === 5 ? '' : '& Up'}
                      </label>
                    </div>
                  ))}
                  {filterOptions.ratings.length > 10 && (
                    <button
                      onClick={() => setShowAllRatings(!showAllRatings)}
                      className="font-['Inter',sans-serif] text-[16px] text-[#003b3c] underline underline-offset-4 hover:text-[#009296] text-left"
                    >
                      {showAllRatings ? 'Show Less' : 'Show More'}
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-[30px] pb-[30px]">
                <p className="font-['Inter',sans-serif] font-medium text-[20px] text-[#003b3c] pb-[20px]">
                  Price
                </p>
                <div className="flex flex-col gap-[15px]">
                  {filterOptions.priceRanges.slice(0, showAllPriceRanges ? undefined : 10).map((option) => (
                    <div key={option.id} className="flex items-center gap-[10px]">
                      <Checkbox
                        id={`price-${option.id}`}
                        checked={filters.priceRanges.includes(option.id)}
                        onCheckedChange={() => toggleFilter('priceRanges', option.id)}
                        className="w-[20px] h-[20px] rounded-none border-[#003b3c] data-[state=unchecked]:bg-white"
                      />
                      <label
                        htmlFor={`price-${option.id}`}
                        className="font-['Inter',sans-serif] text-[16px] text-[#003b3c] leading-[1.4] cursor-pointer flex-1"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                  {filterOptions.priceRanges.length > 10 && (
                    <button
                      onClick={() => setShowAllPriceRanges(!showAllPriceRanges)}
                      className="font-['Inter',sans-serif] text-[16px] text-[#003b3c] underline underline-offset-4 hover:text-[#009296] text-left"
                    >
                      {showAllPriceRanges ? 'Show Less' : 'Show More'}
                    </button>
                  )}
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRanges: [] as string[],
    ratings: [] as string[],
    benefits: [] as string[],
  });
  const [cartItems, setCartItems] = useState<Array<{
    id: string;
    name: string;
    count: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    image: string;
  }>>([
    {
      id: '1',
      name: 'Fibermucil',
      count: 'Count: 60 capsules',
      price: 19.95,
      originalPrice: 24.90,
      quantity: 1,
      image: imgImage
    },
    {
      id: '2',
      name: 'Ultimate Anti-Oxidant',
      count: 'Count: 180 capsules',
      price: 39.95,
      originalPrice: 49.90,
      quantity: 1,
      image: imgImage
    },
    {
      id: '3',
      name: 'Essential-1 Multivitamin',
      count: 'Count: 360 capsules',
      price: 69.95,
      originalPrice: 89.90,
      quantity: 1,
      image: imgImage
    },
    {
      id: '4',
      name: 'Procosa Joint Support',
      count: 'Count: 180 capsules',
      price: 35.90,
      originalPrice: 44.90,
      quantity: 1,
      image: imgImage
    },
    {
      id: '5',
      name: 'CoQ10 Ubiquinol',
      count: 'Count: 60 capsules',
      price: 29.95,
      originalPrice: 39.90,
      quantity: 1,
      image: imgImage
    }
  ]);

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

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      // Remove item if quantity is 0
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      // Update quantity
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleViewCart = () => {
    setCartOpen(false);
    console.log('Navigate to full cart page');
  };

  const handleCheckout = () => {
    setCartOpen(false);
    console.log('Navigate to checkout');
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
      originalPrice: 24.90,
      quantity: config.quantity,
      image: imgImage
    };
    
    setCartItems(items => [...items, newItem]);
    setCartOpen(true);
  };

  const handleViewProductDetails = () => {
    setQuickViewOpen(false);
    console.log('Navigate to product details page');
  };

  // Calculate active filter count
  const activeFilterCount = Object.values(filters).flat().length;

  return (
    <div className="bg-white flex flex-col items-center relative w-full min-h-screen">
      <Header onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} onCartClick={() => setCartOpen(true)} />
      
      {/* Mobile/Tablet Menu Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="bg-[#009296] border-[#0CA9AD] w-[280px]">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">Main navigation menu with links to Shop, Learn, About, Help, and Specials</SheetDescription>
          <div className="flex flex-col gap-[30px] pt-[40px]">
            <p className="font-['Inter',sans-serif] font-medium text-[16px] text-white uppercase tracking-[1.6px]">SHOP</p>
            <p className="font-['Inter',sans-serif] font-medium text-[16px] text-white uppercase tracking-[1.6px]">LEARN</p>
            <p className="font-['Inter',sans-serif] font-medium text-[16px] text-white uppercase tracking-[1.6px]">ABOUT</p>
            <p className="font-['Inter',sans-serif] font-medium text-[16px] text-white uppercase tracking-[1.6px]">HELP</p>
            <p className="font-['Inter',sans-serif] font-medium text-[16px] text-white uppercase tracking-[1.6px]">SPECIALS</p>
          </div>
        </SheetContent>
      </Sheet>

      {/* Mini Cart Sheet */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="right" className="w-full sm:w-[560px] sm:max-w-[560px] p-0 overflow-hidden [&>button]:hidden">
          <SheetTitle className="sr-only">Shopping Cart</SheetTitle>
          <SheetDescription className="sr-only">Review and manage items in your shopping cart</SheetDescription>
          <MiniCart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onClose={() => setCartOpen(false)}
            onViewCart={handleViewCart}
            onCheckout={handleCheckout}
          />
        </SheetContent>
      </Sheet>

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
      
      <Banner />
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
        <div 
          className={`hidden xl:block transition-all duration-300 ease-in-out ${
            filtersVisible ? 'w-[280px] xxl:w-[300px] hd:w-[320px] ml-[20px]' : 'w-0'
          } overflow-hidden`}
        >
          <div className={`transition-opacity duration-300 ${filtersVisible ? 'opacity-100' : 'opacity-0'}`}>
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
        </div>
        
        {/* Product Grid - adjusts width */}
        <div className="flex-1 transition-all duration-300">
          <ProductGrid filtersVisible={filtersVisible} onQuickView={() => setQuickViewOpen(true)} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}