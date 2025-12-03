import CollectionBanner from './CollectionBanner';
import svgPaths from "../imports/svg-vsxzdz3mbf";
import { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import ingredientsBannerImage from "figma:asset/a7cb9223d250c550dddc253d3871c182ee65cc1d.png";

// Real ingredients data
const placeholderIngredients = {
  '#': ['5-HTP'],
  A: ['Acai Berry', 'Acetyl L-Carnitine', 'Algal Oil', 'Aloe Vera', 'Alpha Lipoic Acid', 'Amino Acid Complex', 'Apple', 'Ashwagandha', 'Asian Ginseng', 'Astaxanthin', 'Astragalus'],
  B: ['B-Complex Vitamins', 'Bacopa Monnieri', 'Barley Grass', 'Berberine', 'Berberine Phospholipid Complex', 'Bergamot', 'Bifidobacterium Lactis', 'Bilberry', 'Biotin', 'Black Cohosh', 'Black Currant', 'Blackberry', 'Blue-Green Algae', 'Blueberry', 'Branched Chain Amino Acid Complex', 'Broccoli', 'Brussels Sprouts', 'Butcher\'s Broom'],
  C: ['Calcium', 'Carnitine', 'Chamomile', 'Cherry', 'Chlorella', 'Chokeberry', 'Choline', 'Chondroitin Sulfate', 'Cinnamon', 'Citrus Bioflavonoid Complex', 'Coenzyme Q-10', 'Collagen', 'Cranberry'],
  D: ['D-Mannose', 'Daidzein', 'Damiana', 'DHA', 'DHEA', 'Digestive Enzymes', 'Diosmin', 'Dong Quai', 'DPA'],
  E: ['Echinacea', 'EGCG', 'Elderberry', 'Eleuthero', 'EPA', 'Essential Amino Acids', 'Evening Primrose Oil'],
  F: ['Fermented Pea & Rice Protein', 'Fish Oil', 'Free Range Collagen Peptides'],
  G: ['Gamma Tocopherol', 'Garlic', 'Genistein', 'Ginger', 'Ginkgo biloba', 'Glucosamine Sulfate', 'Glutamine', 'Glutathione', 'Glycine', 'Goldenseal', 'Grape Seed Extract', 'Grape Skin', 'Green Tea Extract', 'Guarana'],
  H: ['Hesperidin', 'Hops', 'Horse Chestnut Seed Extract', 'Huperzine Extract'],
  I: ['Indole-3-Carbinol', 'Iodine', 'Iron'],
  K: ['Kale'],
  L: ['Lutein', 'Lycopene', 'Lysine'],
  M: ['Magnesium', 'Marine Collagen Peptides', 'Melatonin', 'Methyl Folate', 'Mixed Tocopherols', 'Mixed Tocotrienols', 'MSM', 'Mushroom Blend', 'Mustard Seed'],
  N: ['N-Acetyl Cysteine', 'Natural Vitamin E Complex', 'Niacin'],
  O: ['Omega-3', 'Oregano'],
  P: ['Parsley Seed, oil', 'Passionflower', 'Peppermint Oil', 'Phosphatidyl Choline', 'Phosphatidyl Serine', 'Phytoceramides', 'Phytosterols', 'Pine Bark', 'Pomegranate', 'Potassium', 'PQQ', 'Probiotics', 'Protein', 'Psyllium Husk Powder', 'Pumpkin Seed Oil'],
  Q: ['Quercetin'],
  R: ['Raspberry', 'Red Cabbage', 'Red Wine', 'Resveratrol', 'Rhodiola rosea', 'Rosemary', 'Royal Jelly', 'Rutin'],
  S: ['Saffron Extract', 'Sage', 'Saw Palmetto', 'Silymarin', 'Soy Isoflavones', 'Soy Lecithin Granules', 'Soy Lecithin Oil', 'Soy Protein', 'Spearmint Oil', 'Spirulina', 'Strawberry'],
  T: ['Taurine', 'Tea', 'Theanine', 'Thyme', 'Turmeric (Curcumin)'],
  U: ['UC-II® Chicken Cartilage'],
  V: ['Valerian', 'Vinpocetine', 'Vitamin B12', 'Vitamin C', 'Vitamin D3', 'Vitamin E', 'Vitamin K-2 MK-7', 'Vitex Agnus'],
  W: ['Wasabi', 'Wheat Grass', 'Whey Protein', 'White Tea'],
  Z: ['Zeaxanthin', 'Zinc'],
};

const allLetters = '#ABCDEFGHIKLMNOPQRSTUVWZ'.split('');

export default function IngredientsPage({ 
  onNavigateToIngredient 
}: { 
  onNavigateToIngredient?: (ingredient: string) => void;
}) {
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
        title="Ingredient Index"
        description="Explore our comprehensive list of high-quality ingredients, each carefully selected for its purity and potency."
        imageSrc={ingredientsBannerImage}
        backgroundColor="#F6F2EC"
        imageBackgroundColor="#e5ddd3"
      />

      {/* A-Z Navigation Menu */}
      <div className="w-full bg-white/95 sticky top-0 z-10">
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
        <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[60px]">
          {/* Main Ingredients List - 3 columns on desktop */}
          <div className="flex-1">
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
                      <button
                        key={idx}
                        onClick={() => onNavigateToIngredient && onNavigateToIngredient(ingredient)}
                        className="font-['Inter',sans-serif] text-[#003b3c] text-[16px] md:text-[18px] leading-[1.6] hover:text-[#009296] transition-colors cursor-pointer text-left"
                      >
                        {ingredient}
                      </button>
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

          {/* Sticky Quality Box - 4th column on desktop */}
          <div className="lg:w-[320px] xl:w-[360px]">
            <div className="lg:sticky lg:top-[140px]">
              <div className="bg-[#009296] rounded-[12px] p-[32px] md:p-[40px]">
                {/* Icon */}
                <div className="w-[56px] h-[56px] bg-white/20 rounded-full flex items-center justify-center mb-[24px]">
                  <Leaf className="w-[28px] h-[28px] text-white" />
                </div>

                {/* Headline */}
                <h3 className="font-['STIX_Two_Text:Medium',serif] font-medium text-white text-[28px] md:text-[32px] leading-[1.2] tracking-[-0.64px] mb-[16px]">
                  Committed to 100% Clean
                </h3>

                {/* Description */}
                <p className="font-['Inter',sans-serif] text-white/90 text-[16px] leading-[1.6] mb-[24px]">
                  Every ingredient we use is carefully selected for its purity, potency, and scientific backing. We never compromise on quality—only the finest, most effective ingredients make it into our formulas.
                </p>

                {/* Button */}
                <button className="w-full bg-white text-[#009296] rounded-full px-[24px] py-[14px] font-['Inter:Medium',sans-serif] font-medium text-[16px] hover:bg-white/95 transition-colors">
                  See Our No List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}