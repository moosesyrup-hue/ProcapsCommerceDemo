import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import svgPathsL1 from "../imports/svg-bz2m66y7mp";
import svgPathsL2 from "../imports/svg-2fhtqn3kb5";
import svgPathsL3 from "../imports/svg-cjnntmumc9";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type MenuLevel = 'main' | 'shop';
type ExpandedSection = 'categories' | 'bodyPart' | 'bodyFunction' | 'healthIssues' | null;

// Logo Component
function Logo() {
  return (
    <div className="h-[40px] relative shrink-0 w-[109.074px]" data-name="logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 110 40">
        <g id="logo">
          <path d={svgPathsL1.p37447300} fill="var(--fill-0, #009296)" id="Vector" />
          <path d={svgPathsL1.p6bfad80} fill="var(--fill-0, #009296)" id="Vector_2" />
          <path d={svgPathsL1.p1f781200} fill="var(--fill-0, #009296)" id="Vector_3" />
          <path d={svgPathsL1.p3823bb00} fill="var(--fill-0, #009296)" id="Vector_4" />
          <path d={svgPathsL1.p11342c00} fill="var(--fill-0, #009296)" id="Vector_5" />
          <path d={svgPathsL1.p16724e32} fill="var(--fill-0, #009296)" id="Vector_6" />
          <path d={svgPathsL1.p83c2d00} fill="var(--fill-0, #009296)" id="Vector_7" />
          <path d={svgPathsL1.p13257680} fill="var(--fill-0, #009296)" id="Vector_8" />
        </g>
      </svg>
    </div>
  );
}

// Icon Components (all 24x24 with 2px stroke)
function IconClose() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d="M18 6L6 18" stroke="#003B3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 6L18 18" stroke="#003B3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function IconChevronRight() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon chevron right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d="M9 6L15 12L9 18" stroke="#003B3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function IconAdd() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d="M12 5V19" stroke="#003B3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 12H19" stroke="#003B3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function IconMinus() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon minus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d="M5 12H19" stroke="#003B3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

// Categories list data
const categories = [
  'Anti-Aging',
  'Antioxidants',
  'Beauty',
  'Beverages',
  'Bone & Skeletal Health',
  'Brain Health',
  'Cardiovascular Health',
  'Circulation',
  'Digestive Health',
  'Energy',
  'Immune Health',
  'Individual Vitamins & Minerals',
  'Joint Health',
  'Meals & Proteins',
  'Multivitamins',
  'Pet Products',
  'Sleep & Relaxation',
  'Stress & Mood',
  'Sweeteners',
  'Vision Health',
  'Weight Management',
  'Other'
];

// Body Part list data
const bodyParts = [
  'Arteries',
  'Bladder',
  'Blood',
  'Bones',
  'Brain',
  'Breast',
  'Colon',
  'Ears',
  'Eyes',
  'Endocrine System',
  'GI Tract',
  'Hair, Skin, & Nails',
  'Heart',
  'Immune System',
  'Joints',
  'Kidneys',
  'Legs',
  'Liver',
  'Lungs',
  'Muscles',
  'Nerves',
  'Prostate',
  'Reproductive System',
  'Stomach',
  'Urinary Tract',
  'Veins'
];

// Body Function list data
const bodyFunctions = [
  'Breathing or Respiration',
  'Cell protection',
  'Circulation',
  'Cognitive Function',
  'Detoxification',
  'Digestion',
  'Energy Production',
  'Hormone Balancing',
  'Immune Defense',
  'Memory',
  'Metabolism',
  'Mood Balancing',
  'Movement',
  'Skin Protection',
  'Sleep',
  'Structural Support',
  'Urinary Function',
  'Vision',
  'Waste Removal'
];

// Health Issues list data
const healthIssues = [
  'Joint Pain and Stiffness',
  'Heart and Blood Vessel Health',
  'High Blood Pressure',
  'Type 2 Diabetes',
  'Cholesterol Management',
  'Anxiety and Stress',
  'Depression',
  'Memory and Brain Health',
  'Sleep Disorders',
  'Immune Health',
  'Bone Strength',
  'Vision Problems',
  'Fatigue',
  'Menopause Symptoms',
  'Liver Health',
  'Urinary Tract Infections',
  'Digestive Health',
  'Breathing Problems'
];

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: 'easeOut'
    }
  })
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [menuLevel, setMenuLevel] = useState<MenuLevel>('main');
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);

  // Lock body scroll when menu is open (with enhanced iOS support)
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      
      // Apply styles to lock scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleShopClick = () => {
    setMenuLevel('shop');
  };

  const handleBackToAll = () => {
    setMenuLevel('main');
    setExpandedSection(null);
  };

  const toggleSection = (section: ExpandedSection) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleClose = () => {
    // Reset state when closing
    setMenuLevel('main');
    setExpandedSection(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-50 m:block hidden"
            onClick={handleClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 m:inset-y-0 m:left-0 m:right-auto m:w-[480px] bg-white z-50 flex flex-col m:shadow-2xl"
            data-name="mobile menu overlay"
          >
            {/* Scrollable Content Area */}
            <div className={`flex-1 flex flex-col gap-[10px] items-start p-[20px] overflow-y-auto overflow-x-hidden ${menuLevel === 'shop' ? 'pb-[120px]' : 'pb-0'}`}>
              {/* Logo and Close Button / Breadcrumb and Close Button */}
              <div className="flex items-center justify-between w-full mb-[30px]">
                <div className="relative h-[40px] w-[109.074px]">
                  <AnimatePresence mode="wait">
                    {menuLevel === 'main' ? (
                      <motion.div
                        key="logo"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute inset-0"
                      >
                        <Logo />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="breadcrumb"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute inset-0 flex gap-[14px] items-center cursor-pointer"
                        onClick={handleBackToAll}
                      >
                        <div className="flex items-center justify-center">
                          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                            <IconChevronRight />
                          </div>
                        </div>
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.2] not-italic text-[#003b3c] text-[16px] text-nowrap tracking-[-0.16px] whitespace-pre">Shop</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button 
                  onClick={handleClose}
                  className="text-[#003B3C] hover:opacity-70 transition-opacity"
                  aria-label="Close menu"
                >
                  <IconClose />
                </button>
              </div>

              {/* Main Menu Level */}
              {menuLevel === 'main' && (
                <div className="content-stretch flex flex-col gap-[8px] items-start w-full" data-name="menu">
                  <motion.div
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    className="content-stretch flex items-center justify-between w-full cursor-pointer"
                    onClick={handleShopClick}
                  >
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic text-[#003b3c] text-[24px] text-nowrap tracking-[-0.48px] whitespace-pre">Shop</p>
                    <IconChevronRight />
                  </motion.div>
                  <motion.p
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic text-[#003b3c] text-[24px] tracking-[-0.48px] w-full cursor-pointer"
                  >
                    Learn
                  </motion.p>
                  <motion.p
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic text-[#003b3c] text-[24px] tracking-[-0.48px] w-full cursor-pointer"
                  >
                    About
                  </motion.p>
                  <motion.p
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic text-[#003b3c] text-[24px] tracking-[-0.48px] w-full cursor-pointer"
                  >
                    Help
                  </motion.p>
                  <motion.p
                    custom={4}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic text-[#003b3c] text-[24px] tracking-[-0.48px] w-full cursor-pointer"
                  >
                    Specials
                  </motion.p>
                </div>
              )}

              {/* Shop Menu Level */}
              {menuLevel === 'shop' && (
                <>
                  {/* Shop Menu Items */}
                  <div className="content-stretch flex flex-col gap-[8px] items-start w-full" data-name="menu">
                    {/* Categories */}
                    <motion.div
                      custom={0}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                    >
                      <div 
                        className="content-stretch flex items-center justify-between relative shrink-0 w-full cursor-pointer"
                        onClick={() => toggleSection('categories')}
                      >
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic text-[#003b3c] text-[24px] text-nowrap tracking-[-0.48px] whitespace-pre">Categories</p>
                        {expandedSection === 'categories' ? <IconMinus /> : <IconAdd />}
                      </div>
                      
                      <AnimatePresence>
                        {expandedSection === 'categories' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="overflow-hidden w-full"
                          >
                            <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center pb-[30px] pt-[10px] px-0 relative shrink-0 w-full">
                              <div className="font-['Inter:Regular',sans-serif] font-normal leading-[2] not-italic relative shrink-0 text-[#003b3c] text-[16px] w-full">
                                {categories.map((category, index) => (
                                  <p key={index} className="mb-0 cursor-pointer hover:opacity-70 transition-opacity">{category}</p>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Body Part */}
                    <motion.div
                      custom={1}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                    >
                      <div 
                        className="content-stretch flex items-center justify-between relative shrink-0 w-full cursor-pointer"
                        onClick={() => toggleSection('bodyPart')}
                      >
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic text-[#003b3c] text-[24px] text-nowrap tracking-[-0.48px] whitespace-pre">Body Part</p>
                        {expandedSection === 'bodyPart' ? <IconMinus /> : <IconAdd />}
                      </div>
                      
                      <AnimatePresence>
                        {expandedSection === 'bodyPart' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="overflow-hidden w-full"
                          >
                            <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center pb-[30px] pt-[10px] px-0 relative shrink-0 w-full">
                              <div className="font-['Inter:Regular',sans-serif] font-normal leading-[2] not-italic relative shrink-0 text-[#003b3c] text-[16px] w-full">
                                {bodyParts.map((bodyPart, index) => (
                                  <p key={index} className="mb-0 cursor-pointer hover:opacity-70 transition-opacity">{bodyPart}</p>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Body Function */}
                    <motion.div
                      custom={2}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                    >
                      <div 
                        className="content-stretch flex items-center justify-between relative shrink-0 w-full cursor-pointer"
                        onClick={() => toggleSection('bodyFunction')}
                      >
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic text-[#003b3c] text-[24px] text-nowrap tracking-[-0.48px] whitespace-pre">Body Function</p>
                        {expandedSection === 'bodyFunction' ? <IconMinus /> : <IconAdd />}
                      </div>
                      
                      <AnimatePresence>
                        {expandedSection === 'bodyFunction' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="overflow-hidden w-full"
                          >
                            <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center pb-[30px] pt-[10px] px-0 relative shrink-0 w-full">
                              <div className="font-['Inter:Regular',sans-serif] font-normal leading-[2] not-italic relative shrink-0 text-[#003b3c] text-[16px] w-full">
                                {bodyFunctions.map((bodyFunction, index) => (
                                  <p key={index} className="mb-0 cursor-pointer hover:opacity-70 transition-opacity">{bodyFunction}</p>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Health Issues */}
                    <motion.div
                      custom={3}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                    >
                      <div 
                        className="content-stretch flex items-center justify-between relative shrink-0 w-full cursor-pointer"
                        onClick={() => toggleSection('healthIssues')}
                      >
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic text-[#003b3c] text-[24px] text-nowrap tracking-[-0.48px] whitespace-pre">Health Issues</p>
                        {expandedSection === 'healthIssues' ? <IconMinus /> : <IconAdd />}
                      </div>
                      
                      <AnimatePresence>
                        {expandedSection === 'healthIssues' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="overflow-hidden w-full"
                          >
                            <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center pb-[30px] pt-[10px] px-0 relative shrink-0 w-full">
                              <div className="font-['Inter:Regular',sans-serif] font-normal leading-[2] not-italic relative shrink-0 text-[#003b3c] text-[16px] w-full">
                                {healthIssues.map((healthIssue, index) => (
                                  <p key={index} className="mb-0 cursor-pointer hover:opacity-70 transition-opacity">{healthIssue}</p>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Ingredients */}
                    <motion.div
                      custom={4}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      className="content-stretch flex items-center justify-between w-full cursor-pointer"
                    >
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic text-[#003b3c] text-[24px] text-nowrap tracking-[-0.48px] whitespace-pre">Ingredients</p>
                    </motion.div>

                    {/* Shop All Products */}
                    <motion.div
                      custom={5}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      className="content-stretch flex items-center justify-between w-full cursor-pointer"
                    >
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic text-[#003b3c] text-[24px] text-nowrap tracking-[-0.48px] whitespace-pre">Shop All Products</p>
                    </motion.div>

                    {/* Spacer */}
                    <div className="h-[60px]" />
                  </div>
                </>
              )}
            </div>

            {/* Bottom Section - Buttons (Fixed at bottom) */}
            {menuLevel === 'main' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="content-stretch flex gap-[10px] items-start p-[20px] pb-[20px] pt-0 sticky bottom-0 bg-white"
                data-name="buttons"
              >
                <div className="bg-[#009296] box-border content-stretch flex gap-[10px] h-[50px] items-center justify-center px-[39px] py-[15px] relative rounded-[999px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.8] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.16px] whitespace-pre">Register</p>
                </div>
                <div className="bg-[#d9efef] box-border content-stretch flex gap-[10px] h-[50px] items-center justify-center px-[39px] py-[15px] relative rounded-[999px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.8] not-italic relative shrink-0 text-[#003b3c] text-[16px] text-center text-nowrap tracking-[-0.16px] whitespace-pre">Sign In</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}