import SearchIcon from '../icons/SearchIcon';
import HeartIcon from '../icons/HeartIcon';
import UserIcon from '../icons/UserIcon';
import CartIcon from '../icons/CartIcon';
import type { Breakpoint } from '../../hooks/useBreakpoint';

interface HeaderIconsProps {
  breakpoint: Breakpoint;
  isDesktop: boolean;
  onCartClick: () => void;
  onAccountClick: () => void;
  onSearchClick?: () => void;
}

export default function HeaderIcons({
  breakpoint,
  isDesktop,
  onCartClick,
  onAccountClick,
  onSearchClick,
}: HeaderIconsProps) {
  const showHeart = breakpoint !== 'S';
  const showUser = breakpoint !== 'S';

  return (
    <div className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center ${isDesktop ? 'gap-[30px]' : 'gap-[20px]'}`}>
      <button 
        onClick={onSearchClick} 
        className="hover:opacity-80 transition-opacity"
      >
        <SearchIcon />
      </button>
      
      {showHeart && <HeartIcon />}
      
      {showUser && (
        <button 
          onClick={onAccountClick} 
          className="hover:opacity-80 transition-opacity"
        >
          <UserIcon />
        </button>
      )}
      
      <button onClick={onCartClick} className="hover:opacity-80 transition-opacity">
        <CartIcon />
      </button>
    </div>
  );
}