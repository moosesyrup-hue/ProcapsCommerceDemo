import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useRef, useState, useEffect } from 'react';
import svgPaths from "../imports/svg-vsxzdz3mbf";

interface CategoryCarouselProps {
  onNavigateToCategory: (category: string) => void;
}

interface Category {
  id: string;
  name: string;
}

export default function CategoryCarousel({ onNavigateToCategory }: CategoryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // All 21 product categories
  const categories: Category[] = [
    { id: 'anti-aging', name: 'Anti-Aging' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'bone-and-skeletal-health', name: 'Bone Health' },
    { id: 'brain-health', name: 'Brain Health' },
    { id: 'cardiovascular-health', name: 'Cardiovascular Health' },
    { id: 'circulation', name: 'Circulation' },
    { id: 'digestive-health', name: 'Digestive Health' },
    { id: 'energy', name: 'Energy' },
    { id: 'immune-health', name: 'Immune Health' },
    { id: 'individual-vitamins-and-minerals', name: 'Vitamins & Minerals' },
    { id: 'joint-health', name: 'Joint Health' },
    { id: 'meals-and-proteins', name: 'Meals & Proteins' },
    { id: 'multivitamins', name: 'Multivitamins' },
    { id: 'pet-products', name: 'Pet Products' },
    { id: 'sleep-and-relaxation', name: 'Sleep & Relaxation' },
    { id: 'stress-and-mood', name: 'Stress & Mood' },
    { id: 'sweeteners', name: 'Sweeteners' },
    { id: 'vision-health', name: 'Vision Health' },
    { id: 'weight-management', name: 'Weight Management' },
    { id: 'other', name: 'Other' },
  ];

  // Update scroll button visibility
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full bg-white border-b border-[#D9E2E2]">
      <div className="max-w-[1920px] mx-auto px-[20px] md:px-[40px] py-[30px] md:py-[40px]">
        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg size-[40px] flex items-center justify-center hover:bg-[#F6F2EC] transition-colors -ml-[20px]"
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-[20px] text-[#003b3c]" />
            </button>
          )}

          {/* Scrollable Categories */}
          <div 
            ref={scrollContainerRef}
            onScroll={updateScrollButtons}
            className="flex gap-[30px] md:gap-[40px] overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onNavigateToCategory(category.id)}
                className="flex flex-col items-center gap-[14px] shrink-0 group cursor-pointer"
              >
                {/* Circle Image with Placeholder */}
                <div className="relative size-[100px] md:size-[120px] rounded-full overflow-hidden bg-[#e5ddd3] flex items-center justify-center group-hover:bg-[#d9cfc5] transition-colors">
                  <svg className="block w-[25px] h-[25px] md:w-[30px] md:h-[30px]" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
                    <path d={svgPaths.pdc9e330} fill="#B9B1A8" />
                  </svg>
                </div>

                {/* Category Name */}
                <p className="font-['Inter',sans-serif] text-[#003b3c] text-[16px] text-center max-w-[140px] leading-[1.3] group-hover:text-[#009296] transition-colors">
                  {category.name}
                </p>
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg size-[40px] flex items-center justify-center hover:bg-[#F6F2EC] transition-colors -mr-[20px]"
              aria-label="Scroll right"
            >
              <ChevronRight className="size-[20px] text-[#003b3c]" />
            </button>
          )}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}