import CollectionBanner from './CollectionBanner';
import svgPaths from "../imports/svg-vsxzdz3mbf";
import { useState, useEffect } from 'react';

// Placeholder data - will be replaced with real ingredients
const placeholderIngredients = {
  A: ['Alpha-Lipoic Acid', 'Ashwagandha', 'Acai Berry', 'Aloe Vera', 'Astaxanthin', 'Acetyl-L-Carnitine', 'Amino Acids'],
  B: ['Biotin', 'B-Complex Vitamins', 'Beta-Carotene', 'Bilberry', 'Black Cohosh', 'Boron', 'Bromelain'],
  C: ['Calcium', 'Chromium', 'Coenzyme Q10', 'Collagen', 'Copper', 'Curcumin', 'Cranberry Extract'],
  D: ['Vitamin D3', 'DHA', 'DHEA', 'Digestive Enzymes', 'D-Mannose'],
  E: ['Vitamin E', 'Echinacea', 'Elderberry', 'EPA', 'Evening Primrose Oil'],
  F: ['Folic Acid', 'Fish Oil', 'Fiber', 'Flaxseed Oil', 'Fenugreek'],
  G: ['Ginger Root', 'Ginkgo Biloba', 'Ginseng', 'Glucosamine', 'Glutamine', 'Grape Seed Extract', 'Green Tea Extract'],
  H: ['Hyaluronic Acid', 'Hawthorn Berry', 'Holy Basil', 'Horsetail Extract'],
  I: ['Iron', 'Inositol', 'Iodine'],
  J: ['Juniper Berry'],
  K: ['Vitamin K2', 'Krill Oil', 'Kelp'],
  L: ['L-Theanine', 'Lutein', 'Lycopene', 'L-Carnitine', 'Licorice Root', 'Lysine'],
  M: ['Magnesium', 'Manganese', 'Milk Thistle', 'MSM', 'Melatonin', 'Maca Root'],
  N: ['NAC', 'Niacin', 'Nettle Leaf'],
  O: ['Omega-3', 'Oregano Oil', 'Olive Leaf Extract'],
  P: ['Probiotics', 'Phosphatidylserine', 'Peppermint Oil', 'Pine Bark Extract', 'Potassium', 'Psyllium Husk'],
  Q: ['Quercetin', 'Quinoa Extract'],
  R: ['Resveratrol', 'Rhodiola Rosea', 'Riboflavin', 'Rose Hips'],
  S: ['Selenium', 'Spirulina', 'St. John\'s Wort', 'SAM-e', 'Saw Palmetto', 'Silymarin'],
  T: ['Turmeric', 'Thiamine', 'Taurine', 'Tea Tree Oil', 'Tribulus Terrestris'],
  U: ['Ubiquinol', 'Uva Ursi'],
  V: ['Vitamin A', 'Vitamin B6', 'Vitamin B12', 'Vitamin C', 'Valerian Root', 'Vanadium'],
  W: ['Whey Protein', 'White Willow Bark'],
  X: ['Xylitol'],
  Y: ['Yohimbe', 'Yucca Root'],
  Z: ['Zinc', 'Zeaxanthin'],
};

const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function IngredientsPage() {
  const [activeLetter, setActiveLetter] = useState<string>('A');

  // Scroll to section smoothly
  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      const headerOffset = 120; // Account for header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const letter of allLetters) {
        const element = document.getElementById(`letter-${letter}`);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLetter(letter);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="bg-white w-full">
      {/* Banner */}
      <CollectionBanner 
        title="Our Ingredients"
        description="Explore our comprehensive list of high-quality ingredients, each carefully selected for its purity and potency."
        svgPath={svgPaths.pdc9e330}
        backgroundColor="#F6F2EC"
        imageBackgroundColor="#e5ddd3"
        svgFillColor="#B9B1A8"
      />

      {/* A-Z Navigation Menu */}
      <div className="w-full bg-white border-b border-[#D9E2E2] sticky top-0 z-10">
        <div className="w-full py-[16px] md:py-[20px] pl-[20px] md:pl-[40px]">
          <div className="flex items-center justify-start gap-[8px] md:gap-[10px] lg:gap-[12px] overflow-x-auto scrollbar-hide pr-[20px] md:pr-[40px]">
            {allLetters.map((letter) => {
              const hasIngredients = letter in placeholderIngredients;
              const isActive = activeLetter === letter;
              
              return (
                <button
                  key={letter}
                  onClick={() => hasIngredients && scrollToLetter(letter)}
                  disabled={!hasIngredients}
                  className={`
                    flex-shrink-0 w-[32px] h-[32px] md:w-[36px] md:h-[36px] lg:w-[40px] lg:h-[40px]
                    rounded-[6px] font-['Inter:Medium',sans-serif] font-medium
                    text-[14px] md:text-[15px] lg:text-[16px] transition-all duration-200
                    ${hasIngredients 
                      ? isActive 
                        ? 'bg-[#009296] text-white shadow-sm' 
                        : 'bg-[#F5F5F5] text-[#003b3c] hover:bg-[#EBF6F4] hover:text-[#009296] cursor-pointer'
                      : 'bg-transparent text-[#C5C5C5] cursor-not-allowed'
                    }
                  `}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ingredients List */}
      <div className="w-full px-[20px] md:px-[40px] py-[40px] md:py-[60px]">
        <div>
          {Object.entries(placeholderIngredients).map(([letter, ingredients], index) => (
            <div key={letter} id={`letter-${letter}`}>
              {/* Letter Section */}
              <div className="mb-[40px] md:mb-[50px]">
                {/* Letter Headline */}
                <h2 className="font-['STIX_Two_Text:Medium',serif] font-medium text-[#003b3c] text-[48px] md:text-[64px] leading-[1.1] tracking-[-0.96px] md:tracking-[-1.28px] mb-[20px] md:mb-[30px]">
                  {letter}
                </h2>

                {/* 3 Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] md:gap-x-[40px] gap-y-[12px] md:gap-y-[16px]">
                  {ingredients.map((ingredient, idx) => (
                    <a
                      key={idx}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        // TODO: Navigate to ingredient detail page
                      }}
                      className="font-['Inter',sans-serif] text-[#003b3c] text-[16px] md:text-[18px] leading-[1.6] hover:text-[#009296] transition-colors cursor-pointer"
                    >
                      {ingredient}
                    </a>
                  ))}
                </div>
              </div>

              {/* Divider - Don't show after last section */}
              {index < Object.entries(placeholderIngredients).length - 1 && (
                <div className="w-full h-[1px] bg-[#D9E2E2] mb-[40px] md:mb-[50px]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
