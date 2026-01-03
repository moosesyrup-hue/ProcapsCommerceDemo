import { headerData } from '../../data/headerData';

interface HeaderNavigationProps {
  isMegaMenuOpen: boolean;
  onShopHover: () => void;
  onOtherNavHover: () => void;
  onSpecialsClick: () => void;
  onOurStoryClick?: () => void;
}

export default function HeaderNavigation({
  isMegaMenuOpen,
  onShopHover,
  onOtherNavHover,
  onSpecialsClick,
  onOurStoryClick,
}: HeaderNavigationProps) {
  const { navigation } = headerData;

  const handleNavClick = (item: typeof navigation[0]) => {
    if (item.key === 'specials') {
      onSpecialsClick();
    } else if (item.key === 'ourStory' && onOurStoryClick) {
      onOurStoryClick();
    }
  };

  const handleNavHover = (item: typeof navigation[0]) => {
    if (item.key === 'shop') {
      onShopHover();
    } else {
      onOtherNavHover();
    }
  };

  return (
    <div className="flex absolute left-0 top-1/2 -translate-y-1/2 gap-[40px] items-center font-['Inter',sans-serif] font-medium text-[16px] text-white uppercase tracking-[1.6px]">
      {navigation.map((item) => {
        const isShop = item.key === 'shop';
        const isClickable = item.key === 'ourStory' || item.key === 'specials';
        
        const Element = isClickable ? 'button' : 'p';
        
        return (
          <Element
            key={item.key}
            className={`cursor-pointer hover:opacity-80 transition-all relative ${
              isShop && isMegaMenuOpen 
                ? 'after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-white' 
                : 'transition-opacity'
            } ${isClickable ? 'font-medium' : ''}`}
            onMouseEnter={() => handleNavHover(item)}
            onClick={isClickable ? () => handleNavClick(item) : undefined}
          >
            {item.label}
          </Element>
        );
      })}
    </div>
  );
}