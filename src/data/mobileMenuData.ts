/**
 * Mobile Menu Data Configuration
 * 
 * Centralized data for the mobile menu component.
 * This file contains all content, navigation items, and configuration.
 * 
 * For Blazor Migration:
 * - Map to C# configuration classes
 * - Main menu items can be database-driven
 * - Shop sections support dynamic content
 */

/**
 * Main Menu Items
 * Top-level navigation in the mobile menu
 */
export interface MainMenuItem {
  id: string;
  label: string;
  action?: 'shop' | 'learn' | 'about' | 'help' | 'specials';
}

export const mainMenuItems: MainMenuItem[] = [
  { id: 'shop', label: 'Shop', action: 'shop' },
  { id: 'learn', label: 'Learn', action: 'learn' },
  { id: 'about', label: 'About', action: 'about' },
  { id: 'help', label: 'Help', action: 'help' },
  { id: 'specials', label: 'Specials', action: 'specials' }
];

/**
 * Shop Menu Sections
 * Expandable sections in the Shop submenu
 */
export interface ShopSection {
  id: string;
  title: string;
  items: string[];
}

export const shopSections: ShopSection[] = [
  {
    id: 'categories',
    title: 'Categories',
    items: [
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
    ]
  },
  {
    id: 'bodyPart',
    title: 'Body Part',
    items: [
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
    ]
  },
  {
    id: 'bodyFunction',
    title: 'Body Function',
    items: [
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
    ]
  },
  {
    id: 'healthIssues',
    title: 'Health Issues',
    items: [
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
    ]
  }
];

/**
 * Shop Menu Additional Links
 * Non-expandable links in the Shop submenu
 */
export interface ShopLink {
  id: string;
  label: string;
  action: 'ingredients' | 'all-products';
}

export const shopLinks: ShopLink[] = [
  { id: 'ingredients', label: 'Ingredients', action: 'ingredients' },
  { id: 'all-products', label: 'Shop All Products', action: 'all-products' }
];

/**
 * Button Configuration
 * Register and Sign In buttons at bottom of main menu
 */
export interface MenuButton {
  id: string;
  label: string;
  variant: 'primary' | 'secondary';
  action: 'register' | 'signin';
}

export const menuButtons: MenuButton[] = [
  { id: 'register', label: 'Register', variant: 'primary', action: 'register' },
  { id: 'signin', label: 'Sign In', variant: 'secondary', action: 'signin' }
];

/**
 * Animation Configuration
 * Timing and easing settings for menu animations
 */
export const animationConfig = {
  // Backdrop fade
  backdropDuration: 0.2,
  
  // Menu panel slide
  menuPanelDuration: 0.2,
  
  // Logo/breadcrumb transition
  headerTransition: {
    duration: 0.3,
    ease: 'easeOut' as const
  },
  
  // Menu item stagger
  itemStagger: {
    delay: 0.05, // Delay between each item
    duration: 0.3,
    ease: 'easeOut' as const
  },
  
  // Expandable section
  sectionExpand: {
    duration: 0.3,
    ease: 'easeOut' as const
  },
  
  // Bottom buttons
  buttonsDelay: 0.3
};

/**
 * Layout Configuration
 */
export const layoutConfig = {
  // Menu panel width on tablet/desktop
  panelWidth: '480px',
  
  // Padding
  contentPadding: '20px',
  
  // Spacing
  headerMarginBottom: '30px',
  itemGap: '8px',
  
  // Bottom spacer (for shop menu scroll)
  shopBottomSpacer: '60px'
};

/**
 * Text Content
 */
export const textContent = {
  breadcrumb: {
    back: 'Shop'
  },
  ariaLabels: {
    closeMenu: 'Close menu',
    backToMain: 'Back to main menu'
  }
};
