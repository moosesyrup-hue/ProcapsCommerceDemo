import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useRef, useState, useEffect } from 'react';
import svgPaths from "../imports/svg-vsxzdz3mbf";

// Import category images
import imgBeauty from "figma:asset/b0323d513080625cce18bebc3cb4445f4f73f1e7.png";
import imgCardiovascular from "figma:asset/01d65120a81fbf5506a24e06565184ecbdfaabc0.png";
import imgDigestive from "figma:asset/58c8dacdf71c3d35e7a6dd12b3982ff211175e7f.png";
import imgVision from "figma:asset/a5123ef9b5a8aaa1c2c9555fdfd2970168bea173.png";
import imgSleep from "figma:asset/f2eb8cb82f5806c6f883d332fd2e2d15f37fa7b8.png";
import imgMeals from "figma:asset/1cbda3a1e7e570b1abc7a68a9706693c201cdd62.png";
import imgWeightManagement from "figma:asset/a9fe83c2b56267b60452f4c16f68e1f735a3cb74.png";
import imgStressMood from "figma:asset/923eecf2b24812333f9562fff178df23e5368ba1.png";
import imgBrainHealth from "figma:asset/e24feb2f2ba186bdc59c2c2f406c369c314d8735.png";
import imgJointHealth from "figma:asset/a73500931a5e725df77558da1e9193957469926c.png";
import imgEnergy from "figma:asset/59c8dacdf71c3d35e7a6dd12b3982ff211175e7f.png";
import imgMultivitamins from "figma:asset/59c8dacdf71c3d35e7a6dd12b3982ff211175e7f.png";

// Body Part Carousel Circle Images
import imgCarouselArteries from "figma:asset/de78e9b333c3abbe5b513778d69abd9b1f0dba5a.png";
import imgCarouselBladder from "figma:asset/a804fe8a54438c3a676fbd739318349362325fad.png";
import imgCarouselBlood from "figma:asset/8731a2e4714c9901822a57d5f56e2b35910437a6.png";
import imgCarouselBreast from "figma:asset/2bb32cbadc8f0d9653812d9980147aaf83cefba7.png";
import imgCarouselColon from "figma:asset/d11e27985db9e81806a9f3735d001321f7cad450.png";
import imgCarouselEars from "figma:asset/2412f7239d6bbe8cf972be346685d20c08f81d89.png";
import imgCarouselEndocrineSystem from "figma:asset/82870e0fd67aa999789b8d3dd571a4eb9a22eecd.png";
import imgCarouselGITract from "figma:asset/a59a71da7cd3a20aebc803203282ad9c50709da8.png";
import imgCarouselHairSkinNails from "figma:asset/fd54d3180a3965875915a39daedd83079981513d.png";
import imgCarouselHeart from "figma:asset/94b6a91addbd9149d8de9ad4e0d3bb727f9547f7.png";
import imgCarouselImmuneSystem from "figma:asset/a9151d2f276cf83e5126c7fa372d641bcdc2b559.png";
import imgCarouselJoints from "figma:asset/c01b816cae978fcff8a12d9de046beb95ee82ab9.png";
import imgCarouselKidneys from "figma:asset/e840b8c5e753694e7f010a7284badf027b9bfc28.png";
import imgCarouselLegs from "figma:asset/81807a6800ab0b9d284c08a90f3d8694a9a52c05.png";
import imgCarouselLiver from "figma:asset/afb93fb240e43796330282c0c888d46fd7059be3.png";
import imgCarouselLungs from "figma:asset/e5bc922de4ffaeb1dbe0e7bdafe0850e11ec7160.png";
import imgCarouselMuscles from "figma:asset/f21bf0f2b49c8ddd9737576f996cab6f8f134519.png";
import imgCarouselNerves from "figma:asset/594b7de601c2a0a52367c8003fd3d33a125cee97.png";
import imgCarouselProstate from "figma:asset/2689a14f9d568ae2e53ffbd615087654d013390e.png";
import imgCarouselReproductiveSystem from "figma:asset/833b6a97c12d32d4785b47b54cd72aefdd715103.png";
import imgCarouselStomach from "figma:asset/e3a7de50e350d85b54034d19f411ef9ed609e88d.png";
import imgCarouselUrinaryTract from "figma:asset/673a196fb6f26f02c810122c37a6b4b2e8f52690.png";
import imgCarouselVeins from "figma:asset/b770fa1c08c8e45fa9b1a8d7e21fcfe386760745.png";

// Health Issues Carousel Circle Images
import imgCarouselCholesterol from "figma:asset/c9b9f1852fa9fe2705a1135c550c6abd87de7928.png";
import imgCarouselDepression from "figma:asset/b6d34379b8ad62120a5871b21998800558730f05.png";
import imgCarouselHeartBloodVessel from "figma:asset/94b6a91addbd9149d8de9ad4e0d3bb727f9547f7.png";
import imgCarouselJointPain from "figma:asset/c01b816cae978fcff8a12d9de046beb95ee82ab9.png";
import imgCarouselSleepDisorders from "figma:asset/22aa6d98974770449ea1659606dd7d184742eafc.png";
import imgCarouselDiabetes from "figma:asset/905eed95c2083f5e8d823a7b2e882642380268ee.png";
import imgCarouselBoneStrength from "figma:asset/def637343e9e13360471d50cc8ce4e80506af36d.png";
import imgCarouselFatigue from "figma:asset/97b72ddc704ef316ccfa4fa783f676ab326bae0b.png";
import imgCarouselMenopause from "figma:asset/64f0a92ef7dbf35bf1f22e3217fa1398df8098af.png";

interface CategoryCarouselProps {
  onNavigateToCategory: (category: string) => void;
  type?: 'product-category' | 'body-part' | 'body-function' | 'health-issues';
}

interface Category {
  id: string;
  name: string;
  image?: string;
}

export default function CategoryCarousel({ onNavigateToCategory, type = 'product-category' }: CategoryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // All 21 product categories
  const productCategories: Category[] = [
    { id: 'anti-aging', name: 'Anti-Aging' },
    { id: 'antioxidants', name: 'Antioxidants' },
    { id: 'beauty', name: 'Beauty', image: imgBeauty },
    { id: 'beverages', name: 'Beverages' },
    { id: 'bone-and-skeletal-health', name: 'Bone & Skeletal Health' },
    { id: 'brain-health', name: 'Brain Health', image: imgBrainHealth },
    { id: 'cardiovascular-health', name: 'Cardiovascular Health', image: imgCardiovascular },
    { id: 'digestive-health', name: 'Digestive Health', image: imgDigestive },
    { id: 'energy', name: 'Energy' },
    { id: 'immune-health', name: 'Immune Health' },
    { id: 'individual-vitamins-and-minerals', name: 'Individual Vitamins & Minerals' },
    { id: 'joint-health', name: 'Joint Health', image: imgJointHealth },
    { id: 'meals-and-proteins', name: 'Meals & Proteins', image: imgMeals },
    { id: 'multivitamins', name: 'Multivitamins' },
    { id: 'pet-products', name: 'Pet Products' },
    { id: 'sleep-and-relaxation', name: 'Sleep & Relaxation', image: imgSleep },
    { id: 'stress-and-mood', name: 'Stress & Mood', image: imgStressMood },
    { id: 'sweeteners', name: 'Sweeteners' },
    { id: 'vision-health', name: 'Vision Health', image: imgVision },
    { id: 'weight-management', name: 'Weight Management', image: imgWeightManagement },
    { id: 'other', name: 'Other' },
  ];

  // Body Part subcategories (25 items)
  const bodyPartCategories: Category[] = [
    { id: 'arteries', name: 'Arteries', image: imgCarouselArteries },
    { id: 'bladder', name: 'Bladder', image: imgCarouselBladder },
    { id: 'blood', name: 'Blood', image: imgCarouselBlood },
    { id: 'brain', name: 'Brain', image: imgBrainHealth },
    { id: 'breast', name: 'Breast', image: imgCarouselBreast },
    { id: 'colon', name: 'Colon', image: imgCarouselColon },
    { id: 'ears', name: 'Ears', image: imgCarouselEars },
    { id: 'eyes', name: 'Eyes', image: imgVision },
    { id: 'endocrine-system', name: 'Endocrine System', image: imgCarouselEndocrineSystem },
    { id: 'gi-tract', name: 'GI Tract', image: imgCarouselGITract },
    { id: 'hair-skin-and-nails', name: 'Hair, Skin & Nails', image: imgCarouselHairSkinNails },
    { id: 'heart', name: 'Heart', image: imgCarouselHeart },
    { id: 'immune-system', name: 'Immune System', image: imgCarouselImmuneSystem },
    { id: 'joints', name: 'Joints', image: imgCarouselJoints },
    { id: 'kidneys', name: 'Kidneys', image: imgCarouselKidneys },
    { id: 'legs', name: 'Legs', image: imgCarouselLegs },
    { id: 'liver', name: 'Liver', image: imgCarouselLiver },
    { id: 'lungs', name: 'Lungs', image: imgCarouselLungs },
    { id: 'muscles', name: 'Muscles', image: imgCarouselMuscles },
    { id: 'nerves', name: 'Nerves', image: imgCarouselNerves },
    { id: 'prostate', name: 'Prostate', image: imgCarouselProstate },
    { id: 'reproductive-system', name: 'Reproductive System', image: imgCarouselReproductiveSystem },
    { id: 'stomach', name: 'Stomach', image: imgCarouselStomach },
    { id: 'urinary-tract', name: 'Urinary Tract', image: imgCarouselUrinaryTract },
    { id: 'veins', name: 'Veins', image: imgCarouselVeins },
  ];

  // Body Function subcategories (18 items)
  const bodyFunctionCategories: Category[] = [
    { id: 'body-function/breathing-or-respiration', name: 'Breathing or Respiration' },
    { id: 'body-function/cell-protection', name: 'Cell Protection' },
    { id: 'body-function/cognitive-function', name: 'Cognitive Function', image: imgBrainHealth },
    { id: 'body-function/detoxification', name: 'Detoxification' },
    { id: 'body-function/digestion', name: 'Digestion', image: imgDigestive },
    { id: 'body-function/energy-production', name: 'Energy Production' },
    { id: 'body-function/hormone-balancing', name: 'Hormone Balancing' },
    { id: 'body-function/immune-defense', name: 'Immune Defense' },
    { id: 'body-function/memory', name: 'Memory', image: imgBrainHealth },
    { id: 'body-function/metabolism', name: 'Metabolism', image: imgWeightManagement },
    { id: 'body-function/mood-balancing', name: 'Mood Balancing', image: imgStressMood },
    { id: 'body-function/movement', name: 'Movement', image: imgJointHealth },
    { id: 'body-function/skin-protection', name: 'Skin Protection', image: imgBeauty },
    { id: 'body-function/sleep', name: 'Sleep', image: imgSleep },
    { id: 'body-function/structural-support', name: 'Structural Support' },
    { id: 'body-function/urinary-function', name: 'Urinary Function' },
    { id: 'body-function/vision', name: 'Vision', image: imgVision },
    { id: 'body-function/waste-removal', name: 'Waste Removal' },
  ];

  // Health Issues subcategories (15 items) - Alphabetically sorted
  const healthIssuesCategories: Category[] = [
    { id: 'health-issues/anxiety-and-stress', name: 'Anxiety & Stress', image: imgStressMood },
    { id: 'health-issues/bone-strength', name: 'Bone Strength', image: imgCarouselBoneStrength },
    { id: 'health-issues/breathing-problems', name: 'Breathing Problems', image: imgCarouselLungs },
    { id: 'health-issues/cholesterol-management', name: 'Cholesterol Management', image: imgCarouselCholesterol },
    { id: 'health-issues/depression', name: 'Depression', image: imgCarouselDepression },
    { id: 'health-issues/fatigue', name: 'Fatigue', image: imgCarouselFatigue },
    { id: 'health-issues/heart-and-blood-vessel-health', name: 'Heart & Blood Vessel Health', image: imgCarouselHeartBloodVessel },
    { id: 'health-issues/high-blood-pressure', name: 'High Blood Pressure', image: imgCardiovascular },
    { id: 'health-issues/joint-and-pain-stiffness', name: 'Joint & Pain Stiffness', image: imgCarouselJointPain },
    { id: 'health-issues/liver-health', name: 'Liver Health', image: imgCarouselLiver },
    { id: 'health-issues/menopause-symptoms', name: 'Menopause Symptoms', image: imgCarouselMenopause },
    { id: 'health-issues/sleep-disorders', name: 'Sleep Disorders', image: imgCarouselSleepDisorders },
    { id: 'health-issues/type-2-diabetes', name: 'Type 2 Diabetes', image: imgCarouselDiabetes },
    { id: 'health-issues/urinary-tract-infections', name: 'Urinary Tract Infections', image: imgCarouselKidneys },
    { id: 'health-issues/vision-problems', name: 'Vision Problems', image: imgVision },
  ];

  // Product Category subcategories (21 items)
  const productCategoryCategories: Category[] = [
    { id: 'anti-aging', name: 'Anti-Aging' },
    { id: 'antioxidants', name: 'Antioxidants' },
    { id: 'beauty', name: 'Beauty', image: imgBeauty },
    { id: 'beverages', name: 'Beverages' },
    { id: 'bone-and-skeletal-health', name: 'Bone & Skeletal Health' },
    { id: 'brain-health', name: 'Brain Health', image: imgBrainHealth },
    { id: 'cardiovascular-health', name: 'Cardiovascular Health', image: imgCardiovascular },
    { id: 'digestive-health', name: 'Digestive Health', image: imgDigestive },
    { id: 'energy', name: 'Energy' },
    { id: 'immune-health', name: 'Immune Health' },
    { id: 'individual-vitamins-and-minerals', name: 'Individual Vitamins & Minerals' },
    { id: 'joint-health', name: 'Joint Health', image: imgJointHealth },
    { id: 'meals-and-proteins', name: 'Meals & Proteins', image: imgMeals },
    { id: 'multivitamins', name: 'Multivitamins' },
    { id: 'pet-products', name: 'Pet Products' },
    { id: 'sleep-and-relaxation', name: 'Sleep & Relaxation', image: imgSleep },
    { id: 'stress-and-mood', name: 'Stress & Mood', image: imgStressMood },
    { id: 'sweeteners', name: 'Sweeteners' },
    { id: 'vision-health', name: 'Vision Health', image: imgVision },
    { id: 'weight-management', name: 'Weight Management', image: imgWeightManagement },
    { id: 'other', name: 'Other' },
  ];

  // Select categories based on type
  const categories = type === 'body-part' ? bodyPartCategories : 
                    type === 'body-function' ? bodyFunctionCategories :
                    type === 'health-issues' ? healthIssuesCategories :
                    type === 'product-category' ? productCategoryCategories :
                    productCategories;

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
            className="flex gap-[10px] md:gap-[20px] overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onNavigateToCategory(category.id)}
                className="flex flex-col items-center gap-[14px] shrink-0 group cursor-pointer w-[140px]"
              >
                {/* Circle Image with Placeholder */}
                <div className="relative size-[100px] md:size-[120px] rounded-full overflow-hidden bg-[#e5ddd3] flex items-center justify-center group-hover:bg-[#d9cfc5] transition-colors">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="block w-[25px] h-[25px] md:w-[30px] md:h-[30px]" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
                      <path d={svgPaths.pdc9e330} fill="#B9B1A8" />
                    </svg>
                  )}
                </div>

                {/* Category Name */}
                <p className="font-['Inter',sans-serif] text-[#003b3c] text-[16px] text-center w-full leading-[1.3] group-hover:text-[#009296] transition-colors">
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