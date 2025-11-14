import { useState } from 'react';
import { X } from 'lucide-react';
import svgPaths from "../imports/svg-vsxzdz3mbf";
import { Checkbox } from "./ui/checkbox";

export default function FilterSidebar({ onClose, filters, setFilters }: { 
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
