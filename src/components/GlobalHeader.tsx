import { Menu } from 'lucide-react';
import ShopMegaMenu from './ShopMegaMenu';
import HeaderBanner from './header/HeaderBanner';
import HeaderNavigation from './header/HeaderNavigation';
import HeaderIcons from './header/HeaderIcons';
import HeaderLogo from './icons/HeaderLogo';
import HeaderContent from './header/HeaderContent';
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
    clearTimers();
    
    if (pathOrCategory === 'specials') {
      onSpecialsClick();
    } else if (pathOrCategory === 'ingredients') {
      onIngredientsClick?.();
    } else {
      onNavigateToCollection?.(pathOrCategory);
    }
  };

  // Shared props for header
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
    <div className="relative">
      <HeaderContent {...headerContentProps} />
    </div>
  );
}