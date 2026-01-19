import { useState, useEffect } from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';
import svgPaths from "../imports/svg-vsxzdz3mbf";
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
  isTodaysSpecial?: boolean;
}

interface CartPageProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onContinueShopping: () => void;
  onProceedToCheckout: () => void;
  onEditItem?: (itemId: string) => void;
}

// Reusable Icon Components from MiniCart
function IconRemove({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  const strokeColor = disabled ? "#C2CFCF" : "#003B3C";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative shrink-0 size-[36px] hover:opacity-70 transition-opacity disabled:hover:opacity-100 disabled:cursor-not-allowed"
      aria-label="Decrease quantity"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45 45" style={{ overflow: 'visible' }}>
        <g>
          <circle cx="22.5" cy="22.5" r="22" stroke={strokeColor} strokeWidth="1" />
          <g>
            <line stroke={strokeColor} strokeWidth="1" x1="32" x2="13" y1="22.5" y2="22.5" />
          </g>
        </g>
      </svg>
    </button>
  );
}

function IconAdd({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative shrink-0 size-[36px] hover:opacity-70 transition-opacity"
      aria-label="Increase quantity"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45 45" style={{ overflow: 'visible' }}>
        <g>
          <circle cx="22.5" cy="22.5" r="22" stroke="#003B3C" strokeWidth="1" />
          <g>
            <line stroke="#003B3C" strokeWidth="1" x1="22.5" x2="22.5" y1="13" y2="32" />
            <line stroke="#003B3C" strokeWidth="1" x1="32" x2="13" y1="22.5" y2="22.5" />
          </g>
        </g>
      </svg>
    </button>
  );
}

function ShippingIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]">
      <div className="absolute inset-[10.42%_2.08%_6.25%_6.25%]">
        <div className="absolute inset-[-4.5%_-4.09%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
            <g>
              <path d="M4.91667 9.08333H2.41667" stroke="#009296" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d="M4.91667 13.25H4.08333" stroke="#009296" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d={svgPaths.p277d9de0} stroke="#009296" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d="M0.75 4.91667H4.91667" stroke="#009296" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d="M0.75 0.75H8.25V4.08333" stroke="#009296" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d={svgPaths.p2c5cae00} stroke="#009296" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
              <path d="M11.5833 6.58333V8.25H13.25" stroke="#009296" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

// Reusable Free Shipping Progress Component
function FreeShippingProgress({ subtotal }: { subtotal: number }) {
  const freeShippingThreshold = 25;
  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const hasUnlockedFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full bg-[#F5F9F9] rounded-[12px] p-[20px]">
      {/* Icon and Message */}
      <div className="flex items-center gap-[10px] w-full">
        <ShippingIcon />
        <p className="font-['Inter',sans-serif] text-sm leading-[1.4] text-[#003b3c]">
          {hasUnlockedFreeShipping ? (
            <span className="font-medium">You've unlocked free shipping!</span>
          ) : (
            <>
              <span className="font-medium">${remaining.toFixed(2)}</span> away from free shipping
            </>
          )}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-[6px] bg-[#D9E2E2] rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-[#009296] transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Quantity Discount Tier Component
function QuantityDiscountTiers({ totalUnits }: { totalUnits: number }) {
  const [showAllTiers, setShowAllTiers] = useState(false);
  
  const tiers = [
    { min: 2, max: 3, discount: 5, label: '2-3 items' },
    { min: 4, max: 5, discount: 10, label: '4-5 items' },
    { min: 6, max: 8, discount: 15, label: '6-8 items' },
    { min: 9, max: Infinity, discount: 20, label: '9+ items' }
  ];

  // Find current tier
  const currentTier = tiers.find(tier => totalUnits >= tier.min && totalUnits <= tier.max);
  const currentDiscount = currentTier?.discount || 0;
  
  // Find next tier
  const nextTier = tiers.find(tier => totalUnits < tier.min);
  const unitsToNext = nextTier ? nextTier.min - totalUnits : 0;

  return (
    <div className="w-full bg-[#F5F9F9] rounded-[12px] p-[20px]">
      {/* Main Status */}
      <div className="flex items-center gap-[10px] mb-[8px]">
        {currentDiscount > 0 ? (
          <>
            <span className="text-[20px] shrink-0">🎉</span>
            <p className="font-['Inter',sans-serif] text-sm leading-[1.4] text-[#003b3c]">
              <span className="font-medium">{currentDiscount}% Quantity Discount!</span>
            </p>
          </>
        ) : (
          <p className="font-['Inter',sans-serif] text-sm leading-[1.4] text-[#003b3c]">
            <span className="font-medium">Quantity Discount</span>
          </p>
        )}
      </div>

      {/* Next tier message */}
      {nextTier && unitsToNext > 0 ? (
        <p className="font-['Inter',sans-serif] text-sm leading-[1.4] text-[#003b3c] mb-[12px]">
          Add <span className="font-medium">{unitsToNext} more {unitsToNext === 1 ? 'item' : 'items'}</span> to unlock {nextTier.discount}% off
        </p>
      ) : currentDiscount === 20 ? (
        <p className="font-['Inter',sans-serif] text-sm leading-[1.4] text-[#003b3c] mb-[12px]">
          <span className="font-medium">Maximum savings unlocked! 🌟</span>
        </p>
      ) : (
        <p className="font-['Inter',sans-serif] text-sm leading-[1.4] text-[#003b3c] mb-[12px]">
          Add <span className="font-medium">1 more item</span> to unlock 5% off
        </p>
      )}
      
      {/* Toggle button */}
      <button
        onClick={() => setShowAllTiers(!showAllTiers)}
        className="flex items-center gap-[8px] font-['Inter',sans-serif] text-sm text-[#009296] hover:text-[#007a7e] transition-colors"
      >
        <span>{showAllTiers ? 'Hide tiers' : 'View all tiers'}</span>
        <div className="relative shrink-0 size-[18px]">
          <svg className="block size-full" fill="none" viewBox="0 0 18 18">
            <circle cx="9" cy="9" r="8.5" stroke="currentColor" strokeWidth="1" />
            {showAllTiers ? (
              // Up arrow - centered at (9, 9)
              <path d="M5.5 10.5 L9 7.5 L12.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            ) : (
              // Down arrow - centered at (9, 9)
              <path d="M5.5 7.5 L9 10.5 L12.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            )}
          </svg>
        </div>
      </button>

      {/* Expandable tier breakdown */}
      {showAllTiers && (
        <div className="mt-[16px] pt-[16px] border-t border-[#D9E2E2]">
          {tiers.map((tier) => {
            const isActive = currentTier?.min === tier.min;
            return (
              <div 
                key={tier.label} 
                className={`flex items-center justify-between py-[6px] ${
                  isActive ? 'font-medium' : ''
                }`}
              >
                <span className={`font-['Inter',sans-serif] text-sm leading-[1.4] ${
                  isActive ? 'text-[#003b3c]' : 'text-[#406c6d]'
                }`}>
                  {isActive && '• '}{tier.label}
                </span>
                <span className={`font-['Inter',sans-serif] text-sm leading-[1.4] ${
                  isActive ? 'text-[#003b3c]' : 'text-[#406c6d]'
                }`}>
                  {tier.discount}% off
                </span>
              </div>
            );
          })}
          
          {/* Disclaimer */}
          <p className="font-['Inter',sans-serif] text-[11px] leading-[1.4] text-[#406c6d] italic mt-[12px]">
            *Not applicable to Today's Special items
          </p>
        </div>
      )}
    </div>
  );
}

export default function CartPage({
  cartItems,
  setCartItems,
  onContinueShopping,
  onProceedToCheckout,
}: CartPageProps) {
  const [gridCols, setGridCols] = useState('');

  // Track window width for responsive grid columns
  useEffect(() => {
    const updateGridCols = () => {
      if (window.innerWidth >= 1440) {
        setGridCols('minmax(0, 1fr) 120px 500px');
      } else if (window.innerWidth >= 1024) {
        setGridCols('minmax(0, 1fr) 120px 450px');
      } else {
        setGridCols('');
      }
    };

    updateGridCols();
    window.addEventListener('resize', updateGridCols);
    return () => window.removeEventListener('resize', updateGridCols);
  }, []);

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    return sum + itemTotal;
  }, 0);

  // Calculate "Due Today" - what customer actually pays at checkout
  const dueToday = cartItems.reduce((sum, item) => {
    if ((item.purchaseType === 'flexpay' || item.purchaseType === 'autoship-flexpay') && item.flexPayAmount) {
      // For FlexPay items, only charge the first payment
      return sum + (item.flexPayAmount * item.quantity);
    } else {
      // For regular and autoship items, charge full price
      return sum + (item.price * item.quantity);
    }
  }, 0);

  // Calculate "Total Product Value" - full price of all items
  const totalProductValue = subtotal;

  const totalSavings = cartItems.reduce((sum, item) => {
    if (item.originalPrice && item.price < item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const freeShippingThreshold = 25;
  const hasUnlockedFreeShipping = subtotal >= freeShippingThreshold;
  const shipping = hasUnlockedFreeShipping ? 0 : 0;
  
  // Calculate quantity discount (exclude Today's Special items)
  const getQuantityDiscountPercent = (units: number): number => {
    if (units >= 9) return 20;
    if (units >= 6) return 15;
    if (units >= 4) return 10;
    if (units >= 2) return 5;
    return 0;
  };
  
  // Filter out Today's Special items for discount calculation
  const eligibleItems = cartItems.filter(item => !item.isTodaysSpecial);
  const eligibleItemCount = eligibleItems.reduce((sum, item) => sum + item.quantity, 0);
  const eligibleSubtotal = eligibleItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const quantityDiscountPercent = getQuantityDiscountPercent(eligibleItemCount);
  const quantityDiscountAmount = (eligibleSubtotal * quantityDiscountPercent) / 100;
  
  // Calculate final total
  const total = subtotal - quantityDiscountAmount + shipping;
  
  // Calculate totalDueToday for FlexPay
  const totalDueToday = dueToday - quantityDiscountAmount + shipping;
  
  // Total savings = MSRP savings + quantity discount
  const totalAllSavings = totalSavings + quantityDiscountAmount;

  // Check if cart has any FlexPay items
  const hasFlexPayItems = cartItems.some(item => item.purchaseType === 'flexpay' || item.purchaseType === 'autoship-flexpay');

  // Empty state
  if (cartItems.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="px-[20px] md:px-[40px] pt-[100px] md:pt-[140px] pb-[80px]">
          <div className="max-w-[600px] mx-auto text-center">
            {/* Icon */}
            <div className="mb-[30px]">
              <ShoppingBag className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] text-[#009296] stroke-[1.5] mx-auto" />
            </div>
            
            {/* Headline */}
            <h1 className="font-['STIX_Two_Text',sans-serif] text-[#003b3c] mb-[16px] leading-[1.2] text-[32px] md:text-[40px]" style={{ fontWeight: 500 }}>
              Your cart is empty
            </h1>
            
            {/* Body Text */}
            <p className="font-['Inter',sans-serif] text-[#406c6d] text-[14px] md:text-[16px] leading-[1.6] mb-[40px]">
              Discover our science-backed supplements crafted with the highest quality ingredients.
            </p>
            
            {/* CTA Button */}
            <button
              onClick={onContinueShopping}
              className="bg-[#009296] hover:bg-[#00b4ae] transition-all h-[50px] rounded-[999px] px-[30px] md:px-[40px]"
            >
              <span className="font-['Inter',sans-serif] font-medium text-[14px] md:text-[16px] text-white tracking-[1.92px] uppercase">
                Continue Shopping
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Main Content - Full width with responsive gutters */}
      <div className="pt-[30px] md:pt-[40px] lg:pt-[50px] pb-[60px] md:pb-[80px] lg:pb-[60px]">
        {/* Container with responsive padding (gutters) */}
        <div className="w-full px-[20px] md:px-[40px]">
          
          {/* Two Column Layout - Desktop uses grid */}
          <div 
            className="lg:grid lg:gap-0"
            style={{
              gridTemplateColumns: gridCols
            }}
          >
            
            {/* Left Column - Cart Items */}
            <div className="lg:col-start-1">
              {/* Header Section */}
              <div className="mb-[30px] md:mb-[40px]">
                {/* Continue Shopping Link */}
                <button
                  onClick={onContinueShopping}
                  className="inline-flex items-center gap-[8px] font-['Inter',sans-serif] text-[14px] text-[#009296] hover:text-[#00b4ae] transition-colors mb-[16px] md:mb-[20px]"
                >
                  <span>←</span>
                  <span className="font-medium">Continue shopping</span>
                </button>
                
                {/* Your cart heading */}
                <h1 
                  className="font-['STIX_Two_Text',sans-serif] text-[#003b3c] mb-[8px] md:mb-[12px] leading-[1.1] text-[40px] md:text-[48px] lg:text-[54px] tracking-[-0.8px] md:tracking-[-1.08px]" 
                  style={{ fontWeight: 500 }}
                >
                  Your cart
                </h1>
                
                {/* Item count badge */}
                <p className="font-['Inter',sans-serif] font-medium text-[#003b3c] text-[12px] md:text-[14px] tracking-[1.12px] uppercase">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>

              {/* Cart Items List */}
              <div className="flex flex-col">
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    {/* Divider line above each item */}
                    <div className="h-[1px] bg-[#D9E2E2] w-full mb-[30px] md:mb-[40px]" />

                    {/* Cart Item Row */}
                    <div className="flex gap-[16px] md:gap-[20px] mb-[30px] md:mb-[40px]">
                      {/* Product Image */}
                      <div className="bg-[#F7F2EC] relative rounded-[10px] shrink-0 size-[100px] md:size-[120px]">
                        <img
                          alt={item.name}
                          className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[10px] size-full"
                          src={item.image || imgPlaceholder}
                        />
                      </div>

                      {/* Product Details - Flex grow to fill space */}
                      <div className="flex-1 flex flex-col min-w-0">
                        {/* Top Row: Title and Price */}
                        <div className="flex items-start justify-between gap-[16px] md:gap-[20px] mb-[5px]">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-['Inter',sans-serif] font-medium text-[#003b3c] text-[15px] md:text-[16px] leading-[1.4] mb-[5px]">
                              {item.name}
                            </h3>
                            <p className="font-['Inter',sans-serif] text-[13px] md:text-[14px] text-[#406c6d] leading-[1.4]">
                              {item.count}
                            </p>
                          </div>
                          
                          {/* Price - Right aligned */}
                          <div className="text-right shrink-0">
                            <p className={`font-['Inter',sans-serif] font-medium text-[15px] md:text-[16px] leading-none ${
                              item.originalPrice && item.price < item.originalPrice ? 'text-[#ba282a]' : 'text-[#003b3c]'
                            }`}>
                              ${item.price.toFixed(2)}
                            </p>
                            {item.originalPrice && item.price < item.originalPrice && (
                              <p className="font-['Inter',sans-serif] text-[13px] md:text-[14px] text-[#406c6d] line-through mt-[4px]">
                                ${item.originalPrice.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Purchase Type Badges */}
                        {(item.purchaseType === 'autoship' || item.purchaseType === 'autoship-flexpay' || item.frequency) && (
                          <div className="mb-[8px]">
                            <div className="flex items-center gap-[6px]">
                              <div className="bg-[#009296] text-white px-[8px] py-[2px] rounded-[4px]">
                                <p className="font-['Inter',sans-serif] text-xs uppercase tracking-[0.5px]">
                                  Autoship
                                </p>
                              </div>
                              <p className="font-['Inter',sans-serif] text-xs text-[#009296]">
                                {item.frequency || `Every ${item.deliveryFrequency} days`}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {(item.purchaseType === 'flexpay' || item.purchaseType === 'autoship-flexpay') && item.flexPayInstallments && item.flexPayAmount && (
                          <div className="mb-[8px]">
                            <div className="flex items-center gap-[6px]">
                              <div className="bg-[#7B61FF] text-white px-[8px] py-[2px] rounded-[4px]">
                                <p className="font-['Inter',sans-serif] text-xs uppercase tracking-[0.5px]">
                                  FlexPay
                                </p>
                              </div>
                              <p className="font-['Inter',sans-serif] text-xs text-[#7B61FF]">
                                {item.flexPayInstallments} payments of ${item.flexPayAmount.toFixed(2)}
                              </p>
                            </div>
                            <p className="font-['Inter',sans-serif] text-xs text-[#406c6d] mt-[4px]">
                              First payment charged today. Then <span className="font-semibold">${item.flexPayAmount.toFixed(2)}</span> every 30 days for {item.flexPayInstallments - 1} more {item.flexPayInstallments - 1 === 1 ? 'payment' : 'payments'}
                            </p>
                          </div>
                        )}
                        
                        {/* Bottom Row - Quantity Controls and Remove Button */}
                        <div className="mt-[24px] md:mt-[36px]">
                          <div className="flex items-center justify-between">
                            {/* Quantity Selector and Disclaimer */}
                            <div className="flex items-center gap-[16px]">
                              {/* Quantity Selector */}
                              <div className="flex gap-[12px] items-center">
                                <IconRemove 
                                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)} 
                                  disabled={item.quantity <= 1} 
                                />
                                <p className="font-['Inter',sans-serif] font-medium text-[#003b3c] text-[16px] min-w-[20px] text-center">
                                  {item.quantity}
                                </p>
                                <IconAdd onClick={() => updateItemQuantity(item.id, item.quantity + 1)} />
                              </div>
                              
                              {/* Today's Special Disclaimer - To the right of quantity selector */}
                              {item.isTodaysSpecial && (
                                <div className="flex items-center gap-[4px] group relative">
                                  <p className="font-['Inter',sans-serif] text-[11px] text-[#406c6d] leading-[1.4]">
                                    Not eligible for quantity discount
                                  </p>
                                  
                                  {/* Info Icon with Tooltip */}
                                  <div className="relative">
                                    <svg 
                                      className="w-[14px] h-[14px] text-[#406c6d] cursor-help" 
                                      fill="none" 
                                      viewBox="0 0 24 24" 
                                      stroke="currentColor"
                                    >
                                      <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                                      <path d="M12 16v-4" strokeWidth="1.5" strokeLinecap="round" />
                                      <circle cx="12" cy="8" r="0.5" fill="currentColor" />
                                    </svg>
                                    
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[8px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-10">
                                      <div className="bg-[#003b3c] text-white px-[12px] py-[8px] rounded-[6px] shadow-lg w-[200px]">
                                        <p className="font-['Inter',sans-serif] text-[12px] leading-[1.4]">
                                          Today's Special items are already our best prices and don't qualify for additional discounts
                                        </p>
                                        {/* Arrow */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px]">
                                          <div className="border-[6px] border-transparent border-t-[#003b3c]"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[#406c6d] hover:text-[#ba282a] transition-colors p-[8px] -mr-[8px]"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="w-[17px] h-[17px] md:w-[18px] md:h-[18px]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Final bottom divider */}
                <div className="h-[1px] bg-[#D9E2E2] w-full" />

                {/* Mobile: Free Shipping Progress - shown after items */}
                <div className="lg:hidden mt-[30px] md:mt-[40px]">
                  <FreeShippingProgress subtotal={subtotal} />
                </div>
              </div>
            </div>

            {/* Middle Column - Spacer */}
            <div className="hidden lg:block lg:col-start-2" />

            {/* Right Column - Order Summary */}
            <div className="mt-[40px] lg:mt-0 lg:col-start-3">
              <div className="border border-[#D9E2E2] rounded-[10px] p-[30px] md:p-[40px] lg:sticky lg:top-[30px]">
                {/* Order Summary Heading */}
                <h2 
                  className="font-['STIX_Two_Text',sans-serif] text-[#003b3c] mb-[20px] md:mb-[25px] leading-[1.2] text-[28px] md:text-[30px] lg:text-[34px] tracking-[-0.34px]" 
                  style={{ fontWeight: 500 }}
                >
                  Order summary
                </h2>

                {/* Free Shipping Progress - Desktop only */}
                <div className="hidden lg:block mb-[20px] md:mb-[25px]">
                  <FreeShippingProgress subtotal={subtotal} />
                </div>

                {/* Quantity Discount Tiers */}
                <div className="mb-[20px] md:mb-[25px]">
                  <QuantityDiscountTiers totalUnits={eligibleItemCount} />
                </div>

                {/* Line Items */}
                <div className="mb-[20px] md:mb-[25px]">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between mb-[12px]">
                    <span className="font-['Inter',sans-serif] text-[#003b3c] text-[14px] leading-[1.4]">
                      Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                    </span>
                    <span className="font-['Inter',sans-serif] text-[#003b3c] text-[14px] leading-[1.4]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity Discount - Only show if active */}
                  {quantityDiscountAmount > 0 && (
                    <div className="flex items-center justify-between mb-[12px]">
                      <span className="font-['Inter',sans-serif] text-[#009296] text-[14px] leading-[1.4]">
                        Quantity Discount ({quantityDiscountPercent}%)
                      </span>
                      <span className="font-['Inter',sans-serif] text-[#009296] text-[14px] leading-[1.4]">
                        -${quantityDiscountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="flex items-center justify-between mb-[12px]">
                    <span className="font-['Inter',sans-serif] text-[#003b3c] text-[14px] leading-[1.4]">
                      Shipping
                    </span>
                    <span className={`font-['Inter',sans-serif] text-[14px] leading-[1.4] ${
                      hasUnlockedFreeShipping ? 'font-medium text-[#009296]' : 'text-[#406c6d]'
                    }`}>
                      {hasUnlockedFreeShipping ? 'FREE' : 'Calculated at checkout'}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-[#D9E2E2] w-full mb-[12px]" />

                  {/* Main Total - "Due Today" if FlexPay items, "Total" otherwise */}
                  <div className="flex items-center justify-between mb-[12px]">
                    <span className="font-['Inter',sans-serif] font-medium text-[#003b3c] text-[20px] md:text-[22px] leading-[1.4]">
                      {hasFlexPayItems ? 'Due Today' : 'Total'}
                    </span>
                    <span className="font-['Inter',sans-serif] font-medium text-[#003b3c] text-[20px] md:text-[22px] leading-[1.4]">
                      ${(hasFlexPayItems ? totalDueToday : total).toFixed(2)}
                    </span>
                  </div>

                  {/* Order Total - Secondary (only show if there are FlexPay items) */}
                  {hasFlexPayItems && (
                    <div className="flex items-center justify-between mb-[12px]">
                      <span className="font-['Inter',sans-serif] text-[14px] leading-[1.4] text-[#406c6d]">
                        Order Total
                      </span>
                      <span className="font-['Inter',sans-serif] text-[14px] leading-[1.4] text-[#406c6d]">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  )}

                  {/* Total Savings - Only show if there are savings */}
                  {totalAllSavings > 0 && (
                    <div className="text-right">
                      <span className="font-['Inter',sans-serif] text-[#009296] text-[13px] md:text-[14px] leading-[1.4]">
                        You saved ${totalAllSavings.toFixed(2)} total
                      </span>
                    </div>
                  )}
                </div>

                {/* Disclaimer text */}
                <p className="font-['Inter',sans-serif] text-[#406c6d] text-[13px] md:text-[14px] leading-[1.6] mb-[20px] md:mb-[25px]">
                  Promo codes, taxes & shipping calculated at checkout
                </p>

                {/* Checkout Button */}
                <button
                  onClick={onProceedToCheckout}
                  className="w-full bg-[#009296] hover:bg-[#00b4ae] transition-all h-[50px] rounded-[999px] mb-[20px] md:mb-[25px]"
                >
                  <span className="font-['Inter',sans-serif] font-medium text-[16px] text-white tracking-[1.92px] uppercase">
                    Checkout
                  </span>
                </button>

                {/* Support Link */}
                <p className="font-['Inter',sans-serif] text-[#003b3c] text-[13px] md:text-[14px] leading-[1.6]">
                  <span className="font-medium">Questions?</span>{' '}
                  <a href="#" className="underline hover:text-[#009296] transition-colors">
                    Talk to one of our Vitamin Specialists
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar - Mobile/Tablet Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#D9E2E2] z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="px-[20px] md:px-[40px] py-[16px] md:py-[20px]">
          <div className="flex items-center justify-between gap-[16px] mb-[12px]">
            {/* Left: Due Today or Order Total */}
            <div>
              <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] mb-[2px]">
                {hasFlexPayItems ? 'Due Today' : 'Order Total'}
              </p>
              <p className="font-['Inter',sans-serif] font-medium text-[#003b3c] text-[20px] md:text-[22px] leading-none">
                ${dueToday.toFixed(2)}
              </p>
            </div>

            {/* Right: Checkout Button */}
            <button
              onClick={onProceedToCheckout}
              className="bg-[#009296] hover:bg-[#00b4ae] transition-all h-[50px] rounded-[999px] px-[32px] md:px-[40px]"
            >
              <span className="font-['Inter',sans-serif] font-medium text-[14px] md:text-[16px] text-white tracking-[1.92px] uppercase whitespace-nowrap">
                Checkout
              </span>
            </button>
          </div>

          {/* Free Shipping Indicator (compact) */}
          {!hasUnlockedFreeShipping && (
            <div className="flex items-center gap-[8px]">
              <div className="flex-1 h-[4px] bg-[#D9E2E2] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#009296] transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
              <p className="font-['Inter',sans-serif] text-[11px] md:text-[12px] text-[#406c6d] whitespace-nowrap">
                ${(freeShippingThreshold - subtotal).toFixed(2)} to free shipping
              </p>
            </div>
          )}
          
          {hasUnlockedFreeShipping && (
            <div className="flex items-center gap-[6px] justify-center">
              <ShippingIcon />
              <p className="font-['Inter',sans-serif] text-[12px] md:text-[13px] text-[#009296] font-medium">
                Free shipping unlocked!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}