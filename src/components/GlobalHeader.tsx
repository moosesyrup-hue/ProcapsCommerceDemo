import { Menu } from 'lucide-react';
import ShopMegaMenu from './ShopMegaMenu';
import HeaderBanner from './header/HeaderBanner';
import HeaderNavigation from './header/HeaderNavigation';
import HeaderIcons from './header/HeaderIcons';
import HeaderLogo from './icons/HeaderLogo';
import HeaderContent from './header/HeaderContent';
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
  
  // Only show sticky when scrolling UP after scrolling past threshold
  const showSticky = isDesktop && hasScrolledPast && scrollDirection === 'up';

  // Shared props for both header instances
  const headerContentProps = {
    isMobileTablet,
    isDesktop,
    breakpoint,
    isMegaMenuOpen,
    onShopHover: handleShopHover,
    onOtherNavHover: handleOtherNavHover,
    onMegaMenuLeave: handleMegaMenuLeave,
    onMegaMenuEnter: handleMegaMenuEnter,
    onMegaMenuNavigate: handleMegaMenuNavigate,
    onMenuClick,
    onCartClick,
    onLogoClick,
    onSpecialsClick,
    onAccountClick,
    onOurStoryClick,
  };

  return (
    <>
      {/* Static header - always in document flow, always visible */}
      <div className="relative">
        <HeaderContent {...headerContentProps} />
      </div>

      {/* Sticky header - Always rendered for smooth animation */}
      <div className="fixed top-0 left-0 right-0 z-50 overflow-hidden">
        <div 
          className={`
            transition-all duration-300 ease-in-out
            ${showSticky ? 'translate-y-0' : '-translate-y-full'}
          `}
        >
          <HeaderContent {...headerContentProps} />
        </div>
      </div>
    </>
  );
}