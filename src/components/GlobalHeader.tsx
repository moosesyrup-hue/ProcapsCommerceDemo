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
import { useState, useEffect } from 'react';

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
  const [hasScrolledPast, setHasScrolledPast] = useState(false);
  
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

  // Track if user has scrolled past the header
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Once user scrolls past threshold, keep it true
      if (scrollY > 150) {
        setHasScrolledPast(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  
  // Only show sticky when scrolling UP after scrolling past threshold
  const showSticky = isDesktop && hasScrolledPast && scrollDirection === 'up';

  return (
    <>
      {/* Static header - always in document flow, always visible */}
      <div className="relative">
        {/* Free Shipping Banner */}
        <div className={sectionClasses}>
          <HeaderBanner isMobileTablet={isMobileTablet} isDesktop={isDesktop} />
        </div>

        {/* Navigation Section */}
        <div className={`${sectionClasses} pb-[15px] -mb-[1px]`} onMouseLeave={handleMegaMenuLeave}>
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
        </div>
        
        {/* Mega Menu - positioned relative to the full header wrapper */}
        <div onMouseEnter={handleMegaMenuEnter}>
          <ShopMegaMenu 
            isOpen={isMegaMenuOpen && isDesktop}
            onNavigate={handleMegaMenuNavigate}
            onClose={handleOtherNavHover}
          />
        </div>
      </div>

      {/* Sticky header - Always rendered for smooth animation */}
      <div className="fixed top-0 left-0 right-0 z-50 overflow-hidden">
        <div 
          className={`
            transition-all duration-300 ease-in-out
            ${showSticky ? 'translate-y-0' : '-translate-y-full'}
          `}
        >
          {/* Free Shipping Banner */}
          <div className={sectionClasses}>
            <HeaderBanner isMobileTablet={isMobileTablet} isDesktop={isDesktop} />
          </div>

          {/* Navigation Section */}
          <div className={`${sectionClasses} pb-[15px] -mb-[1px]`}>
            <div onMouseLeave={handleMegaMenuLeave}>
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
        </div>
      </div>
    </>
  );
}