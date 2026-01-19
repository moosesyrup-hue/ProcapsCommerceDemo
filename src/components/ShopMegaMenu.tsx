import { ChevronRight, Sparkles, Coffee, Bone, Brain, Heart, Activity, Apple, Zap, Shield, Pill, Utensils, Dog, Moon, Smile, Droplet, Eye, Scale, MoreHorizontal, Wind, Dumbbell, Circle, RefreshCw, TrendingUp, TrendingDown, AlertCircle, Flame, BatteryLow, ShieldCheck, Package, HeartPulse, ArrowRight, Leaf, Calculator, Compass } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import SpecialsPromo from './SpecialsPromo';

interface ShopMegaMenuProps {
  isOpen: boolean;
  onNavigate?: (path: string) => void;
  onClose?: () => void;
}

export default function ShopMegaMenu({ isOpen, onNavigate, onClose }: ShopMegaMenuProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<'categories' | 'body-part' | 'body-function' | 'health-issues'>('categories');

  // Reset to 'categories' when menu closes
  useEffect(() => {
    if (!isOpen) {
      setActiveSubmenu('categories');
    }
  }, [isOpen]);

  const leftMenuItems = [
    { id: 'categories', label: 'Product Category', icon: Package, hasChevron: true, description: 'Browse by health benefit' },
    { id: 'body-part', label: 'Body Part', icon: Heart, hasChevron: true, description: 'Target specific areas' },
    { id: 'body-function', label: 'Body Function', icon: Zap, hasChevron: true, description: 'Support key processes' },
    { id: 'health-issues', label: 'Health Issue', icon: ShieldCheck, hasChevron: true, description: 'Address specific concerns' },
    { id: 'ingredients', label: 'Ingredients', icon: Leaf, hasChevron: false },
    { id: 'vitamin-calculator', label: 'Vitamin Calculator', icon: Calculator, hasChevron: false },
    { id: 'shop-all', label: 'Shop All Products', icon: ArrowRight, hasChevron: false },
  ];

  // Enhanced category data with popular flags
  const categoriesColumn1 = [
    { name: 'Anti-Aging', popular: false },
    { name: 'Beauty', popular: false },
    { name: 'Beverages', popular: false },
    { name: 'Bone & Skeletal Health', popular: false },
    { name: 'Brain Health', popular: true },
    { name: 'Cardiovascular Health', popular: true },
    { name: 'Circulation', popular: false },
    { name: 'Digestive Health', popular: false },
    { name: 'Energy', popular: true },
    { name: 'Immune Health', popular: true },
    { name: 'Individual Vitamins & Minerals', popular: false },
  ];

  const categoriesColumn2 = [
    { name: 'Joint Health', popular: true },
    { name: 'Meals & Proteins', popular: false },
    { name: 'Multivitamins', popular: false },
    { name: 'Pet Products', popular: false },
    { name: 'Sleep & Relaxation', popular: false },
    { name: 'Stress & Mood', popular: false },
    { name: 'Sweeteners', popular: false },
    { name: 'Vision Health', popular: false },
    { name: 'Weight Management', popular: false },
    { name: 'Other', popular: false },
  ];

  // Body Part subcategories
  const bodyPartColumn1 = [
    { name: 'Brain & Nerves', popular: true },
    { name: 'Cardiovascular System', popular: true },
    { name: 'Digestive System', popular: false },
    { name: 'Eyes', popular: false },
    { name: 'Hair, Skin & Nails', popular: false },
    { name: 'Heart', popular: true },
    { name: 'Immune System', popular: false },
  ];

  const bodyPartColumn2 = [
    { name: 'Joints & Bones', popular: true },
    { name: 'Kidneys', popular: false },
    { name: 'Liver', popular: false },
    { name: 'Lungs', popular: false },
    { name: 'Muscles', popular: false },
    { name: 'Prostate', popular: false },
    { name: 'Thyroid', popular: false },
  ];

  // Body Function subcategories
  const bodyFunctionColumn1 = [
    { name: 'Antioxidant Protection', popular: false },
    { name: 'Blood Sugar Support', popular: false },
    { name: 'Bone Density', popular: false },
    { name: 'Cellular Energy', popular: true },
    { name: 'Circulation', popular: false },
    { name: 'Detoxification', popular: false },
    { name: 'Digestive Health', popular: false },
  ];

  const bodyFunctionColumn2 = [
    { name: 'Hormonal Balance', popular: false },
    { name: 'Immune Function', popular: true },
    { name: 'Joint Flexibility', popular: false },
    { name: 'Memory & Focus', popular: true },
    { name: 'Metabolism', popular: false },
    { name: 'Muscle Recovery', popular: false },
    { name: 'Vision Health', popular: false },
  ];

  // Health Issues subcategories
  const healthIssuesColumn1 = [
    { name: 'Allergies', popular: false },
    { name: 'Anxiety & Stress', popular: true },
    { name: 'Arthritis', popular: false },
    { name: 'Blood Pressure', popular: false },
    { name: 'Cholesterol', popular: false },
    { name: 'Cognitive Decline', popular: false },
    { name: 'Diabetes Support', popular: false },
  ];

  const healthIssuesColumn2 = [
    { name: 'Fatigue', popular: true },
    { name: 'Inflammation', popular: false },
    { name: 'Insomnia', popular: false },
    { name: 'Joint Pain', popular: true },
    { name: 'Poor Circulation', popular: false },
    { name: 'Weight Management', popular: false },
    { name: 'Weak Immunity', popular: false },
  ];

  // Determine which columns to show based on activeSubmenu
  const getActiveColumns = () => {
    switch (activeSubmenu) {
      case 'body-part':
        return { column1: bodyPartColumn1, column2: bodyPartColumn2 };
      case 'body-function':
        return { column1: bodyFunctionColumn1, column2: bodyFunctionColumn2 };
      case 'health-issues':
        return { column1: healthIssuesColumn1, column2: healthIssuesColumn2 };
      case 'categories':
      default:
        return { column1: categoriesColumn1, column2: categoriesColumn2 };
    }
  };

  const { column1, column2 } = getActiveColumns();

  // Icon mapping for all subcategories
  const getIconForItem = (item: string) => {
    const iconMap: Record<string, any> = {
      // Categories
      'Anti-Aging': Sparkles,
      'Beauty': Sparkles,
      'Beverages': Coffee,
      'Bone & Skeletal Health': Bone,
      'Brain Health': Brain,
      'Cardiovascular Health': HeartPulse,
      'Circulation': Activity,
      'Digestive Health': Apple,
      'Energy': Zap,
      'Immune Health': ShieldCheck,
      'Individual Vitamins & Minerals': Pill,
      'Joint Health': Activity,
      'Meals & Proteins': Utensils,
      'Multivitamins': Package,
      'Pet Products': Dog,
      'Sleep & Relaxation': Moon,
      'Stress & Mood': Smile,
      'Sweeteners': Droplet,
      'Vision Health': Eye,
      'Weight Management': Scale,
      'Other': MoreHorizontal,
      
      // Body Part
      'Brain & Nerves': Brain,
      'Cardiovascular System': HeartPulse,
      'Digestive System': Apple,
      'Eyes': Eye,
      'Hair, Skin & Nails': Sparkles,
      'Heart': Heart,
      'Immune System': Shield,
      'Joints & Bones': Bone,
      'Kidneys': Circle,
      'Liver': Circle,
      'Lungs': Wind,
      'Muscles': Dumbbell,
      'Prostate': Circle,
      'Thyroid': Circle,
      
      // Body Function
      'Antioxidant Protection': Shield,
      'Blood Sugar Support': Droplet,
      'Bone Density': Bone,
      'Cellular Energy': Zap,
      'Detoxification': RefreshCw,
      'Hormonal Balance': Scale,
      'Immune Function': ShieldCheck,
      'Joint Flexibility': Activity,
      'Memory & Focus': Brain,
      'Metabolism': TrendingUp,
      'Muscle Recovery': Dumbbell,
      
      // Health Issues
      'Allergies': Wind,
      'Anxiety & Stress': AlertCircle,
      'Arthritis': Activity,
      'Blood Pressure': HeartPulse,
      'Cholesterol': TrendingDown,
      'Cognitive Decline': Brain,
      'Diabetes Support': Droplet,
      'Fatigue': BatteryLow,
      'Inflammation': Flame,
      'Insomnia': Moon,
      'Joint Pain': Activity,
      'Poor Circulation': Activity,
      'Weak Immunity': Shield,
    };

    return iconMap[item] || Circle;
  };

  return (
    <>
      {/* Background Overlay - absolute positioning relative to parent, starting from mega menu */}
      <div 
        className={`absolute left-0 right-0 top-full bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 cursor-pointer' : 'opacity-0 pointer-events-none'
        }`}
        style={{ height: 'calc(100vh - 100%)' }}
        onClick={onClose}
        aria-label="Close menu"
      />

      {/* Megamenu */}
      <div 
        className={`absolute left-0 right-0 top-full bg-white z-50 overflow-hidden transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-100' : 'opacity-0'}`}>
          <div className="max-w-[1920px] mx-auto px-[40px] py-[48px]">
            <div className="flex gap-[32px]">
              {/* Enhanced Left Sidebar Navigation */}
              <div className="flex-shrink-0 w-[280px]">
                {/* Primary Navigation - Main 4 items */}
                <div className="bg-[#F5F9F9] rounded-[10px] p-[8px] mb-[24px] space-y-[6px]">
                  {leftMenuItems.slice(0, 4).map((item) => {
                    const isActive = activeSubmenu === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onMouseEnter={() => setActiveSubmenu(item.id as any)}
                        className={`relative w-full px-[16px] py-[14px] text-left rounded-[8px] transition-all duration-200 group ${
                          isActive ? 'bg-white shadow-sm' : 'hover:bg-white/60'
                        }`}
                      >
                        {/* Title and Chevron */}
                        <div className="flex items-center justify-between gap-[12px] mb-[5px]">
                          <span className={`font-['Inter',sans-serif] font-medium text-[18px] leading-tight ${
                            isActive ? 'text-[#009296]' : 'text-[#003b3c]'
                          }`}>
                            {item.label}
                          </span>
                          <ChevronRight className={`w-[18px] h-[18px] flex-shrink-0 transition-all duration-200 ${
                            isActive 
                              ? 'text-[#009296] translate-x-1' 
                              : 'text-[#003b3c] group-hover:translate-x-1'
                          }`} />
                        </div>
                        
                        {/* Subtitle */}
                        <p className="font-['Inter',sans-serif] text-[13px] text-[rgb(64,108,109)] leading-[1.4] pr-[28px]">
                          {item.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Secondary Links */}
                <div className="space-y-[4px]">
                  {leftMenuItems.slice(4).map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          const path = item.id === 'shop-all' ? 'all-products' : item.id;
                          onNavigate?.(path);
                          onClose?.();
                        }}
                        className="flex items-center gap-[12px] w-full px-[12px] py-[10px] text-left rounded-[8px] hover:bg-[#F5F9F9] transition-all duration-200 group"
                      >
                        <IconComponent className="w-[16px] h-[16px] text-[#003b3c] group-hover:text-[#009296] transition-colors" />
                        <span className="font-['Inter',sans-serif] text-[16px] text-[#003b3c] group-hover:text-[#009296] transition-colors">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="w-[1px] bg-[#D9E2E2] flex-shrink-0" />

              {/* Enhanced Columns with Subtle Cards */}
              <div className="flex gap-[48px] flex-1 relative">
                {/* Column 1 */}
                <div 
                  key={`col1-${activeSubmenu}`}
                  className="w-[280px] flex-shrink-0 animate-fadeIn space-y-[4px] min-h-[560px]"
                >
                  {column1.map((item) => {
                    const IconComponent = getIconForItem(item.name);
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          // Convert category name to slug
                          const itemSlug = item.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
                          // For body-part, body-function, health-issues, prepend parent category
                          const categorySlug = activeSubmenu === 'categories' 
                            ? `product-category/${itemSlug}`
                            : `${activeSubmenu}/${itemSlug}`;
                          onNavigate?.(categorySlug);
                          onClose?.();
                        }}
                        className="relative flex items-center gap-[12px] w-full text-left font-['Inter',sans-serif] text-[16px] text-[#003b3c] px-[12px] py-[10px] rounded-[8px] transition-all duration-200 group bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                      >
                        <div className="p-[6px] rounded-[6px] bg-[#F5F9F9] group-hover:bg-[#009296] transition-colors">
                          <IconComponent className="w-[16px] h-[16px] text-[#009296] group-hover:text-white transition-colors" />
                        </div>
                        <span className="flex-1 group-hover:text-[#009296] transition-colors whitespace-nowrap">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Column 2 */}
                <div 
                  key={`col2-${activeSubmenu}`}
                  className="w-[280px] flex-shrink-0 animate-fadeIn space-y-[4px] min-h-[560px]"
                >
                  {column2.map((item) => {
                    const IconComponent = getIconForItem(item.name);
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          // Convert category name to slug
                          const itemSlug = item.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
                          // For body-part, body-function, health-issues, prepend parent category
                          const categorySlug = activeSubmenu === 'categories' 
                            ? `product-category/${itemSlug}`
                            : `${activeSubmenu}/${itemSlug}`;
                          onNavigate?.(categorySlug);
                          onClose?.();
                        }}
                        className="relative flex items-center gap-[12px] w-full text-left font-['Inter',sans-serif] text-[16px] text-[#003b3c] px-[12px] py-[10px] rounded-[8px] transition-all duration-200 group bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                      >
                        <div className="p-[6px] rounded-[6px] bg-[#F5F9F9] group-hover:bg-[#009296] transition-colors">
                          <IconComponent className="w-[16px] h-[16px] text-[#009296] group-hover:text-white transition-colors" />
                        </div>
                        <span className="flex-1 group-hover:text-[#009296] transition-colors whitespace-nowrap">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Enhanced Right Section with Better Typography */}
              <div className="flex-shrink-0 w-[360px] flex flex-col gap-[20px]">
                {/* Shop Our Specials - Figma Design */}
                <SpecialsPromo onNavigate={onNavigate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}