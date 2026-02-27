import { useEffect, useState } from 'react';
import { products, Product } from '../data/products';
import svgPaths from "../imports/svg-vsxzdz3mbf";
import imgImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";

interface SearchResultsPageProps {
  searchQuery: string;
  onProductClick: (productId: string) => void;
}

export default function SearchResultsPage({ searchQuery, onProductClick }: SearchResultsPageProps) {
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Search products
  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    
    return products.filter(product => {
      // Search in name
      if (product.name.toLowerCase().includes(lowerQuery)) return true;
      
      // Search in description
      if (product.description.toLowerCase().includes(lowerQuery)) return true;
      
      // Search in keywords
      if (product.searchKeywords?.some(keyword => keyword.toLowerCase().includes(lowerQuery))) return true;
      
      // Search in categories
      if (product.primaryCategory.toLowerCase().includes(lowerQuery)) return true;
      
      // Search in key ingredients
      if (product.keyIngredients?.some(ing => ing.toLowerCase().includes(lowerQuery))) return true;
      
      return false;
    });
  };

  // Update results when query changes
  useEffect(() => {
    const results = searchProducts(searchQuery);
    setSearchResults(results);
  }, [searchQuery]);

  const resultCount = searchResults.length;

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-[20px] md:px-[40px] py-[40px] md:py-[60px]">
        {/* Header */}
        <div className="mb-[30px] md:mb-[40px]">
          <h1 className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[28px] md:text-[36px] lg:text-[42px] text-[#003b3c] mb-[12px]">
            Search Results
          </h1>
          <p className="font-['Inter',sans-serif] text-[16px] md:text-[18px] text-[#406c6d]">
            {resultCount} {resultCount === 1 ? 'result' : 'results'} for "{searchQuery}"
          </p>
        </div>

        {/* Results Grid */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 m:grid-cols-3 l:grid-cols-4 xl:grid-cols-4 hd:grid-cols-5 gap-[15px] md:gap-[20px] lg:gap-[30px]">
            {searchResults.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onProductClick(product.id)}
              />
            ))}
          </div>
        ) : (
          /* No Results State */
          <div className="flex flex-col items-center justify-center py-[80px] md:py-[120px]">
            <div className="max-w-[500px] text-center">
              <div className="w-[64px] h-[64px] md:w-[80px] md:h-[80px] bg-[#EFF6F4] rounded-full flex items-center justify-center mx-auto mb-[24px]">
                <svg className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] text-[#009296]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[24px] md:text-[32px] text-[#003b3c] mb-[16px]">
                No results found for "{searchQuery}"
              </h2>
              <p className="font-['Inter',sans-serif] text-[16px] md:text-[18px] text-[#406c6d] leading-[1.6] mb-[32px]">
                We couldn't find any products matching your search. Try different keywords or browse our popular categories.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

function ProductCard({ product, onClick }: ProductCardProps) {
  // Format price to always show 2 decimal places
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <div className="flex flex-col gap-[15px] md:gap-[20px]">
      {/* Beige Card - Only stars, headline, and image */}
      <button
        onClick={onClick}
        className="bg-[#F6F2EC] rounded-[10px] p-[10px] md:p-[20px] flex flex-col gap-[15px] w-full hover:bg-[#EFF6F4] transition-colors"
      >
        {/* Stars */}
        <div className="flex gap-px items-start justify-center w-full flex-shrink-0">
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
        <p className="font-['STIX_Two_Text:Regular',sans-serif] text-[14px] md:text-[16px] lg:text-[18px] leading-[1.2] text-[#003b3c] text-center flex-shrink-0">
          Soothing <span className="font-['STIX_Two_Text:Italic',sans-serif] italic text-[#009296]">relief</span> for digestion and joints
        </p>
        
        {/* Product Image */}
        <div className="w-full aspect-square flex-shrink-0">
          <img 
            alt={product.name} 
            className="w-full h-full object-contain" 
            src={product.image || imgImage}
            loading="lazy"
          />
        </div>
      </button>
      
      {/* Product Info - Outside and below the beige card */}
      <div className="flex flex-col gap-[10px] md:gap-[20px]">
        {/* Title and Description */}
        <div className="flex flex-col gap-[10px] text-[#003b3c]">
          <p className="font-['Inter',sans-serif] font-medium text-[14px] md:text-[16px] leading-[1.4]">
            {product.name}
          </p>
          <p className="font-['Inter',sans-serif] text-[12px] md:text-[16px] text-[#406c6d] leading-[1.4] line-clamp-2">
            {product.description}
          </p>
        </div>
        
        {/* Price */}
        <p className="font-['Inter',sans-serif] font-medium text-[14px] md:text-[16px] leading-[1.6]">
          <span className="text-[#D84315]">${formatPrice(product.salePrice || product.price)}</span>
          {product.salePrice && (
            <span className="line-through font-normal ml-[8px] text-[#003b3c]">${formatPrice(product.price)}</span>
          )}
        </p>
      </div>
    </div>
  );
}
