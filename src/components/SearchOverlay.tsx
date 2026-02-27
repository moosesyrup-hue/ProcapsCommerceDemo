import { useState, useEffect, useRef } from 'react';
import { X, Search, Heart } from 'lucide-react';
import { products, Product } from '../data/products';
import { Button } from './ui/Button';
import svgPaths from "../imports/svg-vsxzdz3mbf";
import imgImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick?: (productId: string) => void;
  onViewAllResults?: (query: string) => void;
}

export default function SearchOverlay({ isOpen, onClose, onProductClick, onViewAllResults }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Popular search terms
  const popularSearches = [
    'fiber',
    'prebiotic fiber',
    'soluble fiber',
    'fiber supplements',
    'dietary fiber',
  ];

  // Search suggestions based on input
  const getSearchSuggestions = (query: string): string[] => {
    if (!query) return [];
    
    const lowerQuery = query.toLowerCase();
    const suggestions = new Set<string>();
    
    // Add matching popular searches
    popularSearches.forEach(term => {
      if (term.toLowerCase().includes(lowerQuery)) {
        suggestions.add(term);
      }
    });
    
    // Add matching product names
    products.forEach(product => {
      if (product.name.toLowerCase().includes(lowerQuery)) {
        suggestions.add(product.name.toLowerCase());
      }
      // Add matching keywords
      product.searchKeywords?.forEach(keyword => {
        if (keyword.toLowerCase().includes(lowerQuery)) {
          suggestions.add(keyword);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 5);
  };

  // Search products
  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    
    return products.filter(product => {
      // Search in name
      if (product.name.toLowerCase().includes(lowerQuery)) return true;
      
      // Search in description
      if (product.description.toLowerCase().includes(lowerQuery)) return true;
      
      // Search in long description
      if (product.longDescription?.toLowerCase().includes(lowerQuery)) return true;
      
      // Search in keywords
      if (product.searchKeywords?.some(keyword => keyword.toLowerCase().includes(lowerQuery))) return true;
      
      // Search in categories
      if (product.primaryCategory.toLowerCase().includes(lowerQuery)) return true;
      
      // Search in key ingredients
      if (product.keyIngredients?.some(ing => ing.toLowerCase().includes(lowerQuery))) return true;
      
      return false;
    });
  };

  // Get total results and capped results
  const getTotalResults = (query: string): number => {
    return searchProducts(query).length;
  };

  const getCappedResults = (query: string): Product[] => {
    return searchProducts(query).slice(0, 12); // Cap at 12 results
  };

  // Get featured/bestselling products for idle state
  const getFeaturedProducts = (): Product[] => {
    // Return first 12 products or products marked as featured
    return products.slice(0, 12);
  };

  // Update search results when query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = getCappedResults(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Reset search when closing
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [isOpen]);

  // Auto-focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Immediate focus for mobile keyboard
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key to close overlay
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const suggestions = getSearchSuggestions(searchQuery);
  const showSuggestions = searchQuery.trim() !== '';
  const showPopularSearches = !searchQuery.trim();
  const totalResults = searchQuery.trim() ? getTotalResults(searchQuery) : 0;
  const hasMoreResults = totalResults > 12;
  const featuredProducts = getFeaturedProducts();

  // Handle view all results navigation
  const handleViewAllResults = () => {
    if (onViewAllResults) {
      onViewAllResults(searchQuery);
    }
    onClose();
  };

  return (
    <>
      {/* Background Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-label="Close search"
      />

      {/* Search Panel */}
      <div 
        className={`fixed left-0 right-0 top-0 bottom-0 bg-white z-50 transition-all duration-400 ease-out ${ 
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className={`h-full flex flex-col transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-150' : 'opacity-0'}`}>
          {/* Search Header */}
          <div className="flex-shrink-0">
            <div className="max-w-[1920px] mx-auto px-[20px] md:px-[40px] py-[15px] md:py-[20px]">
              <div className="flex items-center justify-between gap-[15px] md:gap-[20px]">
                {/* Logo - Hidden on mobile */}
                <div className="hidden md:flex flex-shrink-0 items-center">
                  <button 
                    onClick={onClose}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <div className="h-[32px] md:h-[40px] w-[87px] md:w-[109px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 38">
                        <g>
                          <path d={svgPaths.p25a86380} fill="#009296" />
                          <path d={svgPaths.p20c71700} fill="#009296" />
                          <path d={svgPaths.p23d24d80} fill="#009296" />
                          <path d={svgPaths.p5ed1b80} fill="#009296" />
                          <path d={svgPaths.p5733200} fill="#009296" />
                          <path d={svgPaths.p2c85b100} fill="#009296" />
                          <path d={svgPaths.p2a1d4000} fill="#009296" />
                          <path d={svgPaths.p4324d00} fill="#009296" />
                        </g>
                      </svg>
                    </div>
                  </button>
                </div>
                
                {/* Search Input Container - Centered on desktop, full width on mobile */}
                <div className="flex-1 flex justify-center items-center">
                  <div className="w-full max-w-[500px] md:max-w-[1060px] bg-[#F3F3F3] rounded-full px-[15px] md:px-[20px] py-[10px] md:py-[12px] flex items-center gap-[12px]">
                    {/* Search Icon */}
                    <Search className="w-[20px] h-[20px] text-[#003B3C] flex-shrink-0" />
                    
                    {/* Search Input */}
                    <input
                      type="search"
                      inputMode="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search"
                      autoFocus
                      autoComplete="off"
                      className="flex-1 font-['Inter',sans-serif] text-[16px] md:text-[18px] text-[#003b3c] placeholder:text-[#999999] bg-transparent border-none outline-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                      ref={inputRef}
                    />
                    
                    {/* Clear Button */}
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] hover:text-[#009296] transition-colors flex-shrink-0 whitespace-nowrap"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Cancel Button - Right Aligned */}
                <button
                  onClick={onClose}
                  className="flex-shrink-0 hover:opacity-70 transition-opacity"
                  aria-label="Close search"
                >
                  <X className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] text-[#003b3c]" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-[1920px] mx-auto px-[20px] md:px-[40px] pt-[30px] md:pt-[40px] pb-[60px] md:pb-[80px]">
              {/* Idle State - Two Column Layout */}
              {showPopularSearches && (
                <div className="flex flex-col md:flex-row gap-[30px] md:gap-[40px] lg:gap-[60px]">
                  {/* Left Column: Popular Searches */}
                  <div className="md:flex-shrink-0 md:w-[200px] lg:w-[280px]">
                    <h3 className="font-['Inter',sans-serif] font-medium text-[16px] md:text-[18px] text-[#003b3c] mb-[20px]">
                      Popular searches
                    </h3>
                    <div className="flex flex-col gap-[10px]">
                      {popularSearches.map((term, index) => (
                        <button
                          key={index}
                          onClick={() => setSearchQuery(term)}
                          className="font-['Inter',sans-serif] text-[14px] md:text-[16px] text-[#406c6d] hover:text-[#009296] text-left transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Featured Products */}
                  <div className="flex-1">
                    <h3 className="font-['Inter',sans-serif] font-medium text-[16px] md:text-[18px] text-[#003b3c] mb-[20px] md:mb-[30px]">
                      Featured products
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 min-[1440px]:!grid-cols-4 gap-x-[10px] md:gap-x-[20px] gap-y-[20px] md:gap-y-[30px]">
                      {featuredProducts.map((product) => (
                        <ProductSearchCard
                          key={product.id}
                          product={product}
                          onClick={() => {
                            onProductClick?.(product.id);
                            onClose();
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Active Search State */}
              {showSuggestions && (
                <div className="flex flex-col md:flex-row gap-[30px] md:gap-[40px] lg:gap-[60px]">
                  {/* Left Sidebar - Always show either Suggestions or Popular Searches */}
                  <div className="md:flex-shrink-0 md:w-[200px] lg:w-[280px]">
                    {suggestions.length > 0 ? (
                      <>
                        <h3 className="font-['Inter',sans-serif] font-medium text-[16px] md:text-[18px] text-[#003b3c] mb-[15px] md:mb-[20px]">
                          Suggestions
                        </h3>
                        {/* Mobile: Horizontal scrolling pills */}
                        <div className="flex md:hidden gap-[8px] overflow-x-auto pb-[10px] -mx-[20px] px-[20px]">
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => setSearchQuery(suggestion)}
                              className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] hover:text-[#009296] transition-colors bg-[#F3F3F3] px-[16px] py-[8px] rounded-full whitespace-nowrap flex-shrink-0"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                        {/* Desktop: Vertical list */}
                        <div className="hidden md:flex flex-col gap-[10px]">
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => setSearchQuery(suggestion)}
                              className="font-['Inter',sans-serif] text-[14px] md:text-[16px] text-[#406c6d] hover:text-[#009296] text-left transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="font-['Inter',sans-serif] font-medium text-[16px] md:text-[18px] text-[#003b3c] mb-[20px]">
                          Popular searches
                        </h3>
                        <div className="flex flex-col gap-[10px]">
                          {popularSearches.map((term, index) => (
                            <button
                              key={index}
                              onClick={() => setSearchQuery(term)}
                              className="font-['Inter',sans-serif] text-[14px] md:text-[16px] text-[#406c6d] hover:text-[#009296] text-left transition-colors"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Right Column: Product Results */}
                  {searchResults.length > 0 ? (
                    <div className="flex-1 flex flex-col">
                      {/* Result Count Header */}
                      <h3 className="font-['Inter',sans-serif] font-medium text-[16px] md:text-[18px] text-[#003b3c] mb-[20px] md:mb-[30px]">
                        {totalResults} {totalResults === 1 ? 'result' : 'results'} for "{searchQuery}"
                      </h3>
                      
                      {/* Product Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 min-[1440px]:!grid-cols-4 gap-x-[10px] md:gap-x-[20px] gap-y-[20px] md:gap-y-[30px]">
                        {searchResults.map((product) => (
                          <ProductSearchCard
                            key={product.id}
                            product={product}
                            onClick={() => {
                              onProductClick?.(product.id);
                              onClose();
                            }}
                          />
                        ))}
                      </div>

                      {/* View All Button - Below grid */}
                      {hasMoreResults && (
                        <div className="mt-[40px] md:mt-[60px] flex justify-center">
                          <Button variant="primary" onClick={handleViewAllResults}>
                            VIEW ALL
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* No Results Found State */
                    <div className="flex-1 flex flex-col">
                      {/* No Results Message - Full Width */}
                      <div className="flex flex-col items-center justify-center pt-[20px] md:pt-[30px] pb-[40px] md:pb-[60px]">
                        <div className="max-w-[600px] text-center">
                          <Search className="w-[48px] h-[48px] md:w-[64px] md:h-[64px] text-[#D9E2E2] mx-auto mb-[20px]" />
                          <h3 className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[20px] md:text-[24px] text-[#003b3c] leading-[1.4]">
                            We couldn't find any products that match your Search. These featured products might interest you.
                          </h3>
                        </div>
                      </div>

                      {/* Featured Products - Full Width */}
                      <div>
                        <h3 className="font-['Inter',sans-serif] font-medium text-[16px] md:text-[18px] text-[#003b3c] mb-[20px] md:mb-[30px]">
                          Featured products
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 min-[1440px]:!grid-cols-4 gap-x-[10px] md:gap-x-[20px] gap-y-[20px] md:gap-y-[30px]">
                          {featuredProducts.map((product) => (
                            <ProductSearchCard
                              key={product.id}
                              product={product}
                              onClick={() => {
                                onProductClick?.(product.id);
                                onClose();
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Product Card Component for Search Results
interface ProductSearchCardProps {
  product: Product;
  onClick: () => void;
}

function ProductSearchCard({ product, onClick }: ProductSearchCardProps) {
  // Format price to always show 2 decimal places
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <div className="flex flex-col gap-[15px] md:gap-[20px]">
      {/* Beige Card - Stars, headline, image, and badge/heart */}
      <button
        onClick={onClick}
        className="bg-[#F6F2EC] rounded-[10px] pt-[20px] md:pt-[30px] px-[10px] md:px-[20px] pb-[10px] md:pb-[20px] flex flex-col w-full relative"
      >
        {/* Stars */}
        <div className="flex gap-px items-start justify-center w-full flex-shrink-0 mb-[15px]">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="relative size-[14px] md:size-[20px]">
              <div className="absolute bottom-[9.55%] left-[2.45%] right-[2.45%] top-0">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 22">
                  <path d={svgPaths.p33530f00} fill="#F1A33A" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        
        {/* Headline */}
        <p className="search-product-headline font-['STIX_Two_Text:Regular',sans-serif] leading-[1.2] text-[#003b3c] text-center flex-shrink-0 mb-[15px] tracking-[-0.4px] xxl:tracking-[-0.44px] hd:tracking-[-0.56px]">
          Soothing <span className="font-['STIX_Two_Text:Italic',sans-serif] italic text-[#009296]">relief</span> for digestion and joints
        </p>
        
        {/* Product Image */}
        <div className="w-full aspect-square flex-shrink-0 relative">
          <img 
            alt={product.name} 
            className="w-full h-full object-contain" 
            src={product.image || imgImage}
            loading="lazy"
          />
        </div>
        
        {/* Badge and Favorite Row */}
        <div className="flex items-center min-h-[30px] w-full">
          {/* Today's Special Badge - Desktop only */}
          {product.todaysSpecial && (
            <div className="hidden md:inline-flex bg-white text-[#ba282a] p-[8px] rounded-[4px] items-center">
              <p className="font-['Inter',sans-serif] text-xs uppercase tracking-[0.5px] whitespace-nowrap leading-none">
                Today's Special
              </p>
            </div>
          )}
          
          {/* Favorite Heart - Always right aligned */}
          <div 
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the card click
              // Favorite functionality will be added later
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                // Favorite functionality will be added later
              }
            }}
            className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center flex-shrink-0 cursor-pointer group ml-auto"
          >
            <Heart className="w-[14px] h-[14px] text-[#003b3c] group-hover:text-[#ba282a] transition-colors" />
          </div>
        </div>
      </button>
      
      {/* Product Info - Outside and below the beige card */}
      <div className="flex flex-col">
        {/* Today's Special Badge - Mobile only, above title */}
        {product.todaysSpecial && (
          <div className="md:hidden mb-[10px]">
            <div className="bg-transparent border border-[#ba282a] text-[#ba282a] px-[8px] py-[4px] rounded-[4px] inline-flex items-center">
              <p className="font-['Inter',sans-serif] text-xs uppercase tracking-[0.5px] whitespace-nowrap leading-none">
                Today's Special
              </p>
            </div>
          </div>
        )}
        
        {/* Title and Description */}
        <div className="flex flex-col gap-[10px] text-[#003b3c]">
          <p className="font-['Inter',sans-serif] font-medium text-[14px] md:text-[16px] leading-[1.4]">
            {product.name}
          </p>
          <p className="font-['Inter',sans-serif] font-light text-[14px] md:text-[14px] text-[#406c6d] leading-[1.4] line-clamp-2">
            {product.description}
          </p>
        </div>
        
        {/* Price */}
        <p className="font-['Inter',sans-serif] font-medium text-[14px] md:text-[14px] leading-[1.6] mt-[10px]">
          <span className="text-[#ba282a]">${formatPrice(product.salePrice || product.price)}</span>
          {product.salePrice && (
            <span className="line-through font-normal ml-[8px] text-[#003b3c]">${formatPrice(product.price)}</span>
          )}
        </p>
      </div>
    </div>
  );
}