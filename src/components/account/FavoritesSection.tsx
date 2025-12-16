import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import ConfirmationModal from './ConfirmationModal';
import imgProduct from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";
import { useBreakpoint } from '../../hooks/useBreakpoint';

interface FavoritesSectionProps {
  isNewCustomer?: boolean;
}

export default function FavoritesSection({ isNewCustomer = false }: FavoritesSectionProps) {
  const { breakpoint } = useBreakpoint();
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);

  // Mock favorites data
  const [favorites, setFavorites] = useState([
    {
      id: 'fav-1',
      name: 'Ultimate Anti-Oxidant',
      count: '180 capsules',
      price: 39.95,
      salePrice: 35.96,
      image: imgProduct,
    },
    {
      id: 'fav-2',
      name: 'CoQ10 400mg',
      count: '120 capsules',
      price: 49.95,
      image: imgProduct,
    },
    {
      id: 'fav-3',
      name: 'Omega-3 EPA/DHA 1360mg',
      count: '60 softgels',
      price: 29.95,
      image: imgProduct,
    },
    {
      id: 'fav-4',
      name: 'Fibermucil',
      count: '60 capsules',
      price: 24.90,
      salePrice: 19.95,
      image: imgProduct,
    },
    {
      id: 'fav-5',
      name: 'Healthy Hair Skin & Nails',
      count: '120 capsules',
      price: 34.95,
      image: imgProduct,
    },
    {
      id: 'fav-6',
      name: 'Vision Essentials',
      count: '60 capsules',
      price: 29.95,
      image: imgProduct,
    },
  ]);

  const handleAddToCart = (product: any) => {
    toast.success(`${product.name} added to cart`);
  };

  const handleRemoveFavorite = (id: string) => {
    setIsRemoving(true);
    setTimeout(() => {
      setFavorites(prev => prev.filter(f => f.id !== id));
      setItemToRemove(null);
      setIsRemoving(false);
      toast.success('Removed from favorites');
    }, 300);
  };

  // Use empty array if new customer
  const displayFavorites = isNewCustomer ? [] : favorites;

  // Get responsive headline sizing based on breakpoint
  const headlineSize = breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[54px]' : breakpoint === 'L' ? 'text-[38px]' : breakpoint === 'M' ? 'text-[34px]' : 'text-[28px]';
  const headlineTracking = breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : breakpoint === 'L' ? 'tracking-[-0.76px]' : breakpoint === 'M' ? 'tracking-[-0.68px]' : 'tracking-[-0.56px]';

  return (
    <div>
      {/* Page Title */}
      <div className="mb-[40px]">
        <h1 className={`font-['STIX_Two_Text',sans-serif] font-medium leading-[1.1] ${headlineSize} ${headlineTracking} text-[#003b3c]`}>
          Favorites
        </h1>
      </div>

      {displayFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {displayFavorites.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-[8px] p-[24px] hover:shadow-lg transition-shadow relative group"
            >
              {/* Remove Heart Button */}
              <button
                onClick={() => setItemToRemove(product.id)}
                className="absolute top-[20px] right-[20px] size-[36px] rounded-full bg-white border border-[#D9E2E2] flex items-center justify-center hover:border-[#ff4444] hover:bg-[#FFF5F5] transition-colors z-10 focus:outline-none"
                aria-label="Remove from favorites"
              >
                <Heart className="size-[18px] text-[#ff4444] fill-current" />
              </button>

              {/* Product Image */}
              <div className="relative mb-[16px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto"
                />
                <div className="absolute top-0 left-0 bg-[#009296] text-white text-[12px] font-['Inter',sans-serif] px-[8px] py-[4px] rounded-br-[4px] rounded-tl-[4px]">
                  {product.count}
                </div>
              </div>

              {/* Product Info */}
              <h3 className="font-['Inter',sans-serif] text-[#003b3c] mb-[8px]">
                {product.name}
              </h3>

              <div className="flex items-center mb-[16px]">
                <p className="font-['Inter',sans-serif] text-[#009296]">
                  ${product.salePrice ? product.salePrice.toFixed(2) : product.price.toFixed(2)}
                </p>
                {product.salePrice && (
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] line-through ml-[8px]">
                    ${product.price.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full flex items-center justify-center gap-[8px] bg-[#009296] text-white text-[14px] uppercase tracking-[0.05em] rounded-[8px] px-[20px] py-[12px] hover:bg-[#007d81] transition-colors focus:outline-none"
              >
                <ShoppingCart className="size-[16px]" />
                <span className="font-['Inter',sans-serif]">Add to Cart</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[8px] p-[60px] md:p-[80px]">
          <div className="max-w-[500px] mx-auto text-center">
            <div className="inline-flex items-center justify-center size-[80px] rounded-full bg-[#E0F7F8] mb-[24px]">
              <Heart className="size-[36px] text-[#009296]" />
            </div>
            <h2 className="font-['Inter',sans-serif] text-[#003b3c] mb-[16px]">
              No favorites yet
            </h2>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[32px] leading-[1.6]">
              Save your favorite products for easy access later. Click the heart icon on any product.
            </p>
            <button className="inline-flex items-center justify-center px-[16px] py-[8px] rounded-[999px] border border-[#009296] hover:bg-[#009296] transition-colors group cursor-pointer focus:outline-none">
              <span className="font-['Inter',sans-serif] text-[14px] font-medium text-[#009296] group-hover:text-white transition-colors">
                Shop Now
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Remove Confirmation Modal */}
      <ConfirmationModal
        isOpen={itemToRemove !== null}
        onClose={() => setItemToRemove(null)}
        onConfirm={() => itemToRemove && handleRemoveFavorite(itemToRemove)}
        title="Remove from favorites?"
        message="This item will be removed from your favorites list."
        confirmText="Remove"
        cancelText="Cancel"
        variant="warning"
        isLoading={isRemoving}
      />
    </div>
  );
}