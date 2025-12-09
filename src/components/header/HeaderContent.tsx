import { Menu } from 'lucide-react';
import ShopMegaMenu from '../ShopMegaMenu';
import HeaderBanner from './HeaderBanner';
import HeaderNavigation from './HeaderNavigation';
import HeaderIcons from './HeaderIcons';
import HeaderLogo from '../icons/HeaderLogo';

interface HeaderContentProps {
  // Breakpoint/Display
  isMobileTablet: boolean;
  isDesktop: boolean;
  breakpoint: 'mobile' | 'tablet' | 'desktop';
  
  // Mega Menu
  isMegaMenuOpen: boolean;
  onShopHover: () => void;
  onOtherNavHover: () => void;
  onMegaMenuLeave: () => void;
  onMegaMenuEnter: () => void;
  onMegaMenuNavigate: (pathOrCategory: string) => void;
  
  // Navigation handlers
  onMenuClick: () => void;
  onCartClick: () => void;
  onLogoClick: () => void;
  onSpecialsClick: () => void;
  onAccountClick: () => void;
  onOurStoryClick?: () => void;
}

export default function HeaderContent({
  isMobileTablet,
  isDesktop,
  breakpoint,
  isMegaMenuOpen,
  onShopHover,
  onOtherNavHover,
  onMegaMenuLeave,
  onMegaMenuEnter,
  onMegaMenuNavigate,
  onMenuClick,
  onCartClick,
  onLogoClick,
  onSpecialsClick,
  onAccountClick,
  onOurStoryClick,
}: HeaderContentProps) {
  const sectionClasses = "bg-[#009296] px-[20px] md:px-[40px] pt-[15px]";

  return (
    <>
      {/* Free Shipping Banner */}
      <div className={sectionClasses}>
        <HeaderBanner isMobileTablet={isMobileTablet} isDesktop={isDesktop} />
      </div>

      {/* Navigation Section */}
      <div className={`${sectionClasses} pb-[15px] -mb-[1px]`}>
        <div onMouseLeave={onMegaMenuLeave}>
          <div className="h-[62px] relative">
            {/* Mobile/Tablet Menu Button */}
            {isMobileTablet && (
              <button 
                onClick={onMenuClick}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-white"
              >
                <Menu className="w-[26px] h-[26px]" />
              </button>
            )}

            {/* Desktop Navigation */}
            {isDesktop && (
              <HeaderNavigation
                isMegaMenuOpen={isMegaMenuOpen}
                onShopHover={onShopHover}
                onOtherNavHover={onOtherNavHover}
                onSpecialsClick={onSpecialsClick}
                onOurStoryClick={onOurStoryClick}
              />
            )}

            {/* Logo */}
            <HeaderLogo onClick={onLogoClick} />

            {/* Icons */}
            <HeaderIcons
              breakpoint={breakpoint}
              isDesktop={isDesktop}
              onCartClick={onCartClick}
              onAccountClick={onAccountClick}
            />
          </div>
          
          {/* Mega Menu */}
          <div onMouseEnter={onMegaMenuEnter}>
            <ShopMegaMenu 
              isOpen={isMegaMenuOpen && isDesktop}
              onNavigate={onMegaMenuNavigate}
              onClose={onOtherNavHover}
            />
          </div>
        </div>
      </div>
    </>
  );
}
