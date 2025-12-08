import { Menu } from 'lucide-react';
import ShopMegaMenu from './ShopMegaMenu';
import HeaderBanner from './header/HeaderBanner';
import HeaderNavigation from './header/HeaderNavigation';
import HeaderIcons from './header/HeaderIcons';
import HeaderLogo from './icons/HeaderLogo';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useMegaMenu } from '../hooks/useMegaMenu';
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
    console.log('Navigate to:', pathOrCategory);
    clearTimers();
    
    if (pathOrCategory === 'specials') {
      onSpecialsClick();
    } else if (pathOrCategory === 'ingredients') {
      onIngredientsClick?.();
    } else {
      // All other paths are category slugs that go to collection page
      onNavigateToCollection?.(pathOrCategory);
    }
  };

  return (
    <div className="bg-[#009296] relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="box-border flex flex-col gap-[15px] items-center px-[20px] md:px-[40px] py-[15px] relative w-full">
          {/* Free Shipping Banner */}
          <HeaderBanner isMobileTablet={isMobileTablet} isDesktop={isDesktop} />

          {/* Navigation - wrapped with megamenu for hover detection */}
          <div 
            className="relative w-full"
            onMouseLeave={handleMegaMenuLeave}
          >
            <div className="h-[62px] relative shrink-0 w-full">
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
          </div>
        </div>
      </div>
      
      {/* Mega Menu */}
      <div onMouseEnter={handleMegaMenuEnter}>
        <ShopMegaMenu 
          isOpen={isMegaMenuOpen && isDesktop}
          onNavigate={handleMegaMenuNavigate}
          onClose={() => {
            clearTimers();
          }}
        />
      </div>
    </div>
  );
}
