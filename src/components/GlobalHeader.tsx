import { Menu } from 'lucide-react';
import ShopMegaMenu from './ShopMegaMenu';
import HeaderBanner from './header/HeaderBanner';
import HeaderNavigation from './header/HeaderNavigation';
import HeaderIcons from './header/HeaderIcons';
import HeaderLogo from './icons/HeaderLogo';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useMegaMenu } from '../hooks/useMegaMenu';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { headerData } from '../data/headerData';

interface GlobalHeaderProps {
  onMenuClick: () => void;
  onCartClick: () => void;
  onLogoClick: () => void;
  onSpecialsClick: () => void;
  onNavigateToCollection?: (category: string) => void;
  onAccountClick: () => void;
  isLoggedIn?: boolean;
  userFirstName?: string;
  onFAQClick?: () => void;
  onIngredientsClick?: () => void;
  onHelpClick?: () => void;
  onOurStoryClick?: () => void;
}

export default function GlobalHeader({
  onMenuClick,
  onCartClick,
  onLogoClick,
  onSpecialsClick,
  onNavigateToCollection,
  onAccountClick,
  onIngredientsClick,
  onOurStoryClick,
}: GlobalHeaderProps) {
  const { breakpoint, isMobileTablet, isDesktop } = useBreakpoint(headerData.breakpoints);
  const scrollDirection = useScrollDirection();
  
  const {
    isOpen: isMegaMenuOpen,
    handleOpen: handleShopHover,
    handleClose: handleMegaMenuLeave,
    handleEnter: handleMegaMenuEnter,
    handleCloseImmediate: handleOtherNavHover,
    clearTimers,
  } = useMegaMenu({
    openDelay: headerData.megaMenu.openDelay,
    closeDelay: headerData.megaMenu.closeDelay,
  });

  const handleMegaMenuNavigate = (pathOrCategory: string) => {
    clearTimers();
    
    if (pathOrCategory === 'specials') {
      onSpecialsClick();
    } else if (pathOrCategory === 'ingredients') {
      onIngredientsClick?.();
    } else {
      onNavigateToCollection?.(pathOrCategory);
    }
  };

  // Shared styles
  const sectionClasses = "bg-[#009296] px-[20px] md:px-[40px] pt-[15px]";
  const stickyClasses = isDesktop ? "sticky top-0 z-50" : "";
  const hideClasses = isDesktop && scrollDirection === 'down' && !isMegaMenuOpen ? '-translate-y-full' : 'translate-y-0';

  return (
    <>
      {/* Free Shipping Banner - Not sticky */}
      <div className={sectionClasses}>
        <HeaderBanner isMobileTablet={isMobileTablet} isDesktop={isDesktop} />
      </div>

      {/* Sticky Navigation Section - Desktop only */}
      <div 
        className={`${sectionClasses} pb-[15px] -mb-[1px] transition-transform duration-300 ${stickyClasses} ${hideClasses}`}
      >
        <div id="sticky-nav-section" onMouseLeave={handleMegaMenuLeave}>
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
                onShopHover={handleShopHover}
                onOtherNavHover={handleOtherNavHover}
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
          <div onMouseEnter={handleMegaMenuEnter}>
            <ShopMegaMenu 
              isOpen={isMegaMenuOpen && isDesktop}
              onNavigate={handleMegaMenuNavigate}
              onClose={handleOtherNavHover}
            />
          </div>
        </div>
      </div>
    </>
  );
}