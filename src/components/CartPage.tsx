import { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, X } from 'lucide-react';
import imgPlaceholder from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";

interface CartItem {
  id: string;
  productId?: string;
  name: string;
  count: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  purchaseType?: 'one-time' | 'autoship' | 'flexpay';
  deliveryFrequency?: number;
  autoshipDiscount?: number;
  flexPayInstallments?: number;
  flexPayAmount?: number;
  frequency?: string;
}

interface CartPageProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onContinueShopping: () => void;
  onProceedToCheckout: () => void;
  onEditItem?: (itemId: string) => void;
}

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) setBreakpoint('mobile');
      else if (width < 1024) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
}

// Segmented Control for Purchase Type
function PurchaseTypeControl({
  value,
  onChange,
  itemId
}: {
  value: 'one-time' | 'autoship' | 'flexpay';
  onChange: (value: 'one-time' | 'autoship' | 'flexpay') => void;
  itemId: string;
}) {
  return (
    <div className="inline-flex bg-white border border-[#D9E2E2] rounded-xl p-1 gap-1">
      <button
        onClick={() => onChange('one-time')}
        className={`px-4 py-2 rounded-lg font-['Inter',sans-serif] text-xs font-medium transition-all duration-200 ${
          value === 'one-time'
            ? 'bg-[#003b3c] text-white shadow-sm'
            : 'text-[#406c6d] hover:text-[#003b3c] hover:bg-[#F7F2EC]'
        }`}
      >
        One-time
      </button>
      <button
        onClick={() => onChange('autoship')}
        className={`px-4 py-2 rounded-lg font-['Inter',sans-serif] text-xs font-medium transition-all duration-200 whitespace-nowrap ${
          value === 'autoship'
            ? 'bg-[#009296] text-white shadow-sm'
            : 'text-[#406c6d] hover:text-[#003b3c] hover:bg-[#F7F2EC]'
        }`}
      >
        Autoship
        <span className="ml-1 opacity-80">-10%</span>
      </button>
      <button
        onClick={() => onChange('flexpay')}
        className={`px-4 py-2 rounded-lg font-['Inter',sans-serif] text-xs font-medium transition-all duration-200 ${
          value === 'flexpay'
            ? 'bg-[#003b3c] text-white shadow-sm'
            : 'text-[#406c6d] hover:text-[#003b3c] hover:bg-[#F7F2EC]'
        }`}
      >
        FlexPay
      </button>
    </div>
  );
}

export default function CartPage({
  cartItems,
  setCartItems,
  onContinueShopping,
  onProceedToCheckout,
  onEditItem
}: CartPageProps) {
  const breakpoint = useBreakpoint();
  const [showOrderNote, setShowOrderNote] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [removingItem, setRemovingItem] = useState<string | null>(null);

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setRemovingItem(itemId);
    setTimeout(() => {
      setCartItems(items => items.filter(item => item.id !== itemId));
      setRemovingItem(null);
    }, 200);
  };

  const updatePurchaseType = (itemId: string, purchaseType: 'one-time' | 'autoship' | 'flexpay') => {
    setCartItems(items =>
      items.map(item => {
        if (item.id !== itemId) return item;
        
        let newPrice = item.price;
        let autoshipDiscount = undefined;
        let deliveryFrequency = undefined;
        let flexPayInstallments = undefined;
        let flexPayAmount = undefined;

        if (purchaseType === 'autoship') {
          const originalSalePrice = item.originalPrice || item.price;
          newPrice = originalSalePrice * 0.9;
          autoshipDiscount = originalSalePrice - newPrice;
          deliveryFrequency = item.deliveryFrequency || 30;
        } else if (purchaseType === 'flexpay') {
          newPrice = item.originalPrice || item.price;
          flexPayInstallments = 4;
          flexPayAmount = newPrice / 4;
        } else {
          newPrice = item.originalPrice || item.price;
        }

        return {
          ...item,
          purchaseType,
          price: newPrice,
          autoshipDiscount,
          deliveryFrequency,
          flexPayInstallments,
          flexPayAmount
        };
      })
    );
  };

  const updateDeliveryFrequency = (itemId: string, frequency: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, deliveryFrequency: frequency } : item
      )
    );
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const itemTotal = item.purchaseType === 'flexpay' 
      ? (item.flexPayAmount || 0) * item.quantity
      : item.price * item.quantity;
    return sum + itemTotal;
  }, 0);

  const totalSavings = cartItems.reduce((sum, item) => {
    if (item.originalPrice && item.price < item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);

  const total = subtotal;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Empty state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 pt-32 sm:pt-40 pb-24">
          <div className="max-w-[540px] mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#F7F2EC] flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#009296" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <h1 className="font-['STIX_Two_Text',sans-serif] text-[#003b3c] text-4xl sm:text-5xl font-medium mb-5 leading-[1.15]">
              Your cart is empty
            </h1>
            <p className="font-['Inter',sans-serif] text-[#406c6d] text-lg mb-10 leading-[1.7]">
              Discover our science-backed supplements crafted with the highest quality ingredients.
            </p>
            <button
              onClick={onContinueShopping}
              className="inline-flex items-center justify-center bg-[#009296] text-white font-['Inter',sans-serif] font-semibold text-sm tracking-[1.2px] uppercase px-12 py-4 rounded-full hover:bg-[#00b4ae] hover:shadow-lg hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#009296] focus:ring-opacity-30"
            >
              Explore Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-8 lg:px-12 pt-28 sm:pt-36 pb-24">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={onContinueShopping}
            className="inline-flex items-center gap-2 font-['Inter',sans-serif] text-sm text-[#009296] hover:text-[#00b4ae] transition-colors mb-8 group focus:outline-none"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            <span className="font-medium">Continue shopping</span>
          </button>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-['STIX_Two_Text',sans-serif] text-[#003b3c] text-4xl sm:text-5xl lg:text-6xl font-medium mb-3 leading-[1.1]">
                Your cart
              </h1>
              <p className="font-['Inter',sans-serif] text-[#406c6d] text-lg">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className={`grid gap-8 ${breakpoint === 'desktop' ? 'grid-cols-[1fr_440px]' : 'grid-cols-1'}`}>
          {/* Cart Items */}
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
                  removingItem === item.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <div className="p-6 sm:p-8">
                  <div className={`grid gap-6 ${breakpoint === 'mobile' ? 'grid-cols-1' : 'grid-cols-[140px_1fr]'}`}>
                    {/* Product Image */}
                    <div className={`${breakpoint === 'mobile' ? 'w-32 h-32 mx-auto' : 'w-full h-[140px]'} rounded-xl overflow-hidden bg-[#F7F2EC] flex items-center justify-center relative group`}>
                      <img
                        src={item.image || imgPlaceholder}
                        alt={item.name}
                        className="w-full h-full object-contain p-3"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col">
                      {/* Top Row - Title and Remove */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-['Inter',sans-serif] text-lg font-semibold text-[#003b3c] mb-2 leading-[1.4] pr-4">
                            {item.name}
                          </h3>
                          <p className="font-['Inter',sans-serif] text-sm text-[#406c6d] leading-[1.6]">
                            {item.count}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 -mt-1 -mr-2 text-[#406c6d] hover:text-[#D84315] hover:bg-red-50 rounded-lg transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#D84315] focus:ring-opacity-30"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="mb-5">
                        <div className="flex items-baseline gap-3">
                          <p className={`font-['Inter',sans-serif] text-2xl font-semibold leading-none ${
                            item.originalPrice && item.price < item.originalPrice ? 'text-[#ba282a]' : 'text-[#003b3c]'
                          }`}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.originalPrice && item.price < item.originalPrice && (
                            <>
                              <p className="font-['Inter',sans-serif] text-base text-[#406c6d] line-through">
                                ${(item.originalPrice * item.quantity).toFixed(2)}
                              </p>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#009296] bg-opacity-10 font-['Inter',sans-serif] text-xs font-semibold text-[#009296]">
                                Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Purchase Type Segmented Control */}
                      <div className="mb-5">
                        <label className="block font-['Inter',sans-serif] text-xs font-semibold text-[#406c6d] uppercase tracking-wider mb-3">
                          Purchase Type
                        </label>
                        <PurchaseTypeControl
                          value={item.purchaseType || 'one-time'}
                          onChange={(type) => updatePurchaseType(item.id, type)}
                          itemId={item.id}
                        />
                      </div>

                      {/* Autoship Frequency */}
                      {item.purchaseType === 'autoship' && (
                        <div className="mb-5 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
                          <label className="block font-['Inter',sans-serif] text-xs font-semibold text-[#406c6d] uppercase tracking-wider mb-3">
                            Delivery Schedule
                          </label>
                          <div className="inline-flex bg-white border border-[#D9E2E2] rounded-xl p-1 gap-1">
                            {[30, 60, 90].map((days) => (
                              <button
                                key={days}
                                onClick={() => updateDeliveryFrequency(item.id, days)}
                                className={`px-4 py-2 rounded-lg font-['Inter',sans-serif] text-xs font-medium transition-all duration-200 ${
                                  (item.deliveryFrequency || 30) === days
                                    ? 'bg-[#009296] text-white shadow-sm'
                                    : 'text-[#406c6d] hover:text-[#003b3c] hover:bg-[#F7F2EC]'
                                }`}
                              >
                                {days} days
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* FlexPay Info */}
                      {item.purchaseType === 'flexpay' && item.flexPayAmount && (
                        <div className="mb-5 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F7F2EC] rounded-lg">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#009296" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                              <line x1="1" y1="10" x2="23" y2="10"/>
                            </svg>
                            <span className="font-['Inter',sans-serif] text-sm text-[#003b3c]">
                              <span className="font-semibold">${item.flexPayAmount.toFixed(2)}</span>
                              <span className="text-[#406c6d]"> × 4 payments</span>
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Quantity */}
                      <div className="flex items-center gap-4 mt-auto">
                        <span className="font-['Inter',sans-serif] text-xs font-semibold text-[#406c6d] uppercase tracking-wider">
                          Quantity
                        </span>
                        <div className="inline-flex items-center bg-white border-2 border-[#D9E2E2] rounded-xl overflow-hidden">
                          <button
                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="px-4 py-2.5 hover:bg-[#F7F2EC] disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus:bg-[#F7F2EC]"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus className="w-4 h-4 text-[#003b3c]" />
                          </button>
                          <div className="px-5 py-2.5 min-w-[60px] text-center border-x-2 border-[#D9E2E2]">
                            <span className="font-['Inter',sans-serif] text-base text-[#003b3c] font-semibold">
                              {item.quantity}
                            </span>
                          </div>
                          <button
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            className="px-4 py-2.5 hover:bg-[#F7F2EC] transition-colors focus:outline-none focus:bg-[#F7F2EC]"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus className="w-4 h-4 text-[#003b3c]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className={breakpoint !== 'desktop' ? 'mt-2' : ''}>
            <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-8">
              <h2 className="font-['STIX_Two_Text',sans-serif] text-[#003b3c] text-3xl font-medium mb-8 leading-tight">
                Order summary
              </h2>

              {/* Order Note */}
              <button
                onClick={() => setShowOrderNote(!showOrderNote)}
                className="flex items-center justify-between w-full p-4 -mx-4 mb-6 rounded-xl hover:bg-[#F7F2EC] transition-colors group focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-[#F7F2EC] group-hover:bg-white transition-all duration-200 ${showOrderNote ? 'rotate-45' : ''}`}>
                    <Plus className="w-5 h-5 text-[#009296]" />
                  </div>
                  <span className="font-['Inter',sans-serif] text-sm font-semibold text-[#003b3c]">
                    Add order note
                  </span>
                </div>
              </button>

              {showOrderNote && (
                <div className="mb-6 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
                  <textarea
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="Add gift message or special instructions..."
                    className="w-full p-4 border-2 border-[#D9E2E2] rounded-xl font-['Inter',sans-serif] text-sm text-[#003b3c] bg-white min-h-[100px] resize-none focus:outline-none focus:border-[#009296] focus:ring-4 focus:ring-[#009296] focus:ring-opacity-10 transition-all"
                    aria-label="Order note"
                  />
                </div>
              )}

              <div className="h-px bg-[#D9E2E2] my-6" />

              {/* Summary Lines */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-['Inter',sans-serif] text-sm text-[#406c6d]">
                    Subtotal
                  </span>
                  <span className="font-['Inter',sans-serif] text-sm font-medium text-[#003b3c]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="font-['Inter',sans-serif] text-sm text-[#009296] font-medium">
                      Savings
                    </span>
                    <span className="font-['Inter',sans-serif] text-sm font-semibold text-[#009296]">
                      −${totalSavings.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[#406c6d]">
                  <span className="font-['Inter',sans-serif] text-sm">
                    Shipping
                  </span>
                  <span className="font-['Inter',sans-serif] text-sm">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="h-px bg-[#D9E2E2] my-6" />

              {/* Total */}
              <div className="flex items-baseline justify-between mb-8">
                <span className="font-['Inter',sans-serif] text-lg font-semibold text-[#003b3c]">
                  Total
                </span>
                <div className="text-right">
                  <span className="font-['Inter',sans-serif] text-3xl font-semibold text-[#003b3c]">
                    ${total.toFixed(2)}
                  </span>
                  <span className="font-['Inter',sans-serif] text-base text-[#406c6d] ml-2">
                    USD
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full bg-[#009296] text-white font-['Inter',sans-serif] font-semibold text-sm tracking-[1.2px] uppercase px-8 py-4 rounded-full hover:bg-[#00b4ae] hover:shadow-xl hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#009296] focus:ring-opacity-30 mb-5"
              >
                Proceed to Checkout
              </button>

              {/* Support Link */}
              <p className="font-['Inter',sans-serif] text-sm text-center leading-[1.7]">
                <span className="text-[#406c6d]">Questions? </span>
                <a href="#" className="text-[#009296] hover:text-[#00b4ae] font-medium underline decoration-2 underline-offset-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#009296] focus:ring-opacity-30 rounded">
                  Talk to a Vitamin Specialist
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
