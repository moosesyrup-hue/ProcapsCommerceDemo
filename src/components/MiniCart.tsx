/**
 * Mini Cart Component
 * Slides in from the right side when cart button is clicked
 */

import { X, Trash2, ShoppingBag } from 'lucide-react';
import svgPaths from "../imports/svg-vsxzdz3mbf";
import { motion, AnimatePresence } from 'motion/react';

interface CartItem {
  id: string;
  productId?: string;
  name: string;
  count: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  purchaseType?: 'one-time' | 'autoship' | 'flexpay' | 'autoship-flexpay';
  
  // Autoship specific
  deliveryFrequency?: number;
  autoshipDiscount?: number;
  
  // FlexPay specific
  flexPayInstallments?: number;
  flexPayAmount?: number;
  
  // Legacy field for backward compatibility
  frequency?: string;
  
  // Today's Special flag
  isTodaysSpecial?: boolean;
}

interface MiniCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onClose: () => void;
  onViewCart: () => void;
  onCheckout: () => void;
}

function Header({ itemCount, onViewCart, onClose, hideViewCart }: { itemCount: number; onViewCart: () => void; onClose: () => void; hideViewCart?: boolean }) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-[#D9E2E2] px-[30px] py-[24px]">
      <div className="flex items-center justify-between gap-[20px]">
        <h2 className="font-['STIX_Two_Text',sans-serif] text-xl text-[#003b3c]" style={{ fontWeight: 500 }}>
          Your cart ({itemCount})
        </h2>
        <div className="flex items-center gap-[20px]">
          {!hideViewCart && (
            <button 
              onClick={onViewCart}
              className="font-['Inter',sans-serif] text-sm text-[#009296] hover:text-[#007d81] transition-colors underline"
            >
              View Cart
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-[8px] hover:bg-[#f5f5f5] rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-[24px] h-[24px] text-[#003b3c]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[120px]">
      <img
        alt={alt}
        className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[10px] size-full"
        src={src}
      />
    </div>
  );
}

function ProductTitleCount({ name, count, purchaseType, deliveryFrequency, flexPayInstallments, flexPayAmount, frequency, isTodaysSpecial }: { 
  name: string; 
  count: string; 
  purchaseType?: 'one-time' | 'autoship' | 'flexpay' | 'autoship-flexpay';
  deliveryFrequency?: number;
  flexPayInstallments?: number;
  flexPayAmount?: number;
  frequency?: string;
  isTodaysSpecial?: boolean;
}) {
  const showAutoship = purchaseType === 'autoship' || purchaseType === 'autoship-flexpay' || frequency;
  const showFlexPay = purchaseType === 'flexpay' || purchaseType === 'autoship-flexpay';
  
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start leading-[1.4] relative shrink-0 w-full">
      <p className="font-['Inter',sans-serif] font-medium text-[#003b3c] text-base w-full">
        {name}
      </p>
      <p className="font-['Inter',sans-serif] font-normal relative shrink-0 text-[#406c6d] text-sm w-full">
        {count}
      </p>
      
      {/* Today's Special Badge */}
      {isTodaysSpecial && (
        <div className="bg-[#ba282a] text-white px-[8px] py-[2px] rounded-[4px] shrink-0 flex items-center">
          <p className="font-['Inter',sans-serif] text-xs uppercase tracking-[0.5px] whitespace-nowrap">
            Today's Special
          </p>
        </div>
      )}
      
      {/* Autoship Badge */}
      {showAutoship && (
        <div className="flex items-center gap-[6px]">
          <div className="bg-[#009296] text-white px-[8px] py-[2px] rounded-[4px]">
            <p className="font-['Inter',sans-serif] text-xs uppercase tracking-[0.5px]">
              Autoship
            </p>
          </div>
          <p className="font-['Inter',sans-serif] text-xs text-[#009296]">
            {frequency || `Every ${deliveryFrequency} days`}
          </p>
        </div>
      )}
      
      {/* FlexPay Badge */}
      {showFlexPay && flexPayInstallments && flexPayAmount && (
        <div className="flex flex-col gap-[4px]">
          <div className="flex items-center gap-[6px]">
            <div className="bg-[#7B61FF] text-white px-[8px] py-[2px] rounded-[4px]">
              <p className="font-['Inter',sans-serif] text-xs uppercase tracking-[0.5px]">
                FlexPay
              </p>
            </div>
            <p className="font-['Inter',sans-serif] text-xs text-[#7B61FF]">
              {flexPayInstallments} payments of ${flexPayAmount.toFixed(2)}
            </p>
          </div>
          <p className="font-['Inter',sans-serif] text-xs text-[#406c6d]">
            First payment charged today. Then <span className="font-semibold">${flexPayAmount.toFixed(2)}</span> every 30 days for {flexPayInstallments - 1} more {flexPayInstallments - 1 === 1 ? 'payment' : 'payments'}
          </p>
        </div>
      )}
    </div>
  );
}

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

function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center pb-0 pt-[20px] px-0 relative shrink-0">
      <IconRemove onClick={onDecrease} disabled={quantity <= 1} />
      <p className="font-['Inter',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[#003b3c] text-base min-w-[20px] text-center">
        {quantity}
      </p>
      <IconAdd onClick={onIncrease} />
    </div>
  );
}

function Price({ price, originalPrice }: { price: number; originalPrice?: number }) {
  const hasDiscount = originalPrice && originalPrice > price;
  
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end leading-[1.4] relative shrink-0 text-right">
      <p className={`font-['Inter',sans-serif] font-medium relative shrink-0 text-base ${
        hasDiscount ? 'text-[#ba282a]' : 'text-[#003b3c]'
      }`}>
        ${price.toFixed(2)}
      </p>
      {hasDiscount && (
        <>
          <p className="font-['Inter',sans-serif] font-normal line-through relative shrink-0 text-[#406c6d] text-sm">
            ${originalPrice.toFixed(2)}
          </p>
          {/* Save Amount Indicator */}
          <p className="font-['Inter',sans-serif] text-[12px] text-[#009296] font-medium">
            Save ${(originalPrice - price).toFixed(2)}
          </p>
        </>
      )}
    </div>
  );
}

function ProductItem({ item, onUpdateQuantity }: { item: CartItem; onUpdateQuantity: (id: string, quantity: number) => void }) {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full">
      <ProductImage src={item.image} alt={item.name} />
      <div className="basis-0 content-stretch flex flex-col grow items-start justify-between min-h-px min-w-px relative self-stretch shrink-0">
        <ProductTitleCount 
          name={item.name} 
          count={item.count} 
          purchaseType={item.purchaseType}
          deliveryFrequency={item.deliveryFrequency}
          flexPayInstallments={item.flexPayInstallments}
          flexPayAmount={item.flexPayAmount}
          frequency={item.frequency}
          isTodaysSpecial={item.isTodaysSpecial}
        />
        <QuantitySelector
          quantity={item.quantity}
          onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
          onDecrease={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
        />
      </div>
      <div className="content-stretch flex flex-col items-end justify-between relative shrink-0 self-stretch">
        <Price price={item.price} originalPrice={item.originalPrice} />
        <button
          onClick={() => onUpdateQuantity(item.id, 0)}
          className="text-[#406c6d] hover:text-[#ba282a] transition-colors p-2 -mr-2"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function LineDivider() {
  return (
    <div className="h-0 relative shrink-0 w-full">
      <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 480 1">
          <line stroke="#D9E2E2" x2="480" y1="0.5" y2="0.5" />
        </svg>
      </div>
    </div>
  );
}

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

function ProductList({ items, onUpdateQuantity }: { items: CartItem[]; onUpdateQuantity: (id: string, quantity: number) => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <AnimatePresence initial={false}>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, height: 0, marginTop: 0, marginBottom: 0, overflow: "hidden" }}
            transition={{
              layout: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2 },
              scale: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
              height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
              marginTop: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
              marginBottom: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
            }}
            className="w-full"
            style={{ marginBottom: index < items.length - 1 ? '30px' : '0px' }}
          >
            <ProductItem item={item} onUpdateQuantity={onUpdateQuantity} />
            {index < items.length - 1 && <div className="mt-[30px]"><LineDivider /></div>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function YourCart({ items, onViewCart, onClose, onUpdateQuantity, subtotal }: {
  items: CartItem[];
  onViewCart: () => void;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  subtotal: number;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <Header itemCount={items.length} onViewCart={onViewCart} onClose={onClose} />
      <FreeShippingProgress subtotal={subtotal} />
      <ProductList items={items} onUpdateQuantity={onUpdateQuantity} />
    </div>
  );
}

function EmptyCartState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-[20px] sm:px-[40px] py-[60px] h-full">
      {/* Shopping Bag Icon */}
      <div className="mb-[30px]">
        <ShoppingBag className="w-[64px] h-[64px] text-[#009296] stroke-[1.5]" />
      </div>
      
      {/* Headline */}
      <h2 className="font-['STIX_Two_Text',sans-serif] text-[#003b3c] text-2xl tracking-[-0.28px] leading-[1.2] mb-[16px]" style={{ fontWeight: 500, fontStyle: 'normal' }}>
        Your cart is ready for you
      </h2>
      
      {/* Body Text */}
      <p className="font-['Inter',sans-serif] text-[#406c6d] text-base leading-[1.4] mb-[40px] max-w-[360px]">
        Ready to start your health journey? Browse our products to find the perfect supplements for your goals.
      </p>
      
      {/* CTA Button */}
      <button
        onClick={onClose}
        className="bg-[#009296] hover:bg-[#007d81] transition-colors h-[50px] rounded-[999px] px-[20px] sm:px-[40px]"
      >
        <span className="font-['Inter',sans-serif] font-medium text-base text-white tracking-[1.92px] uppercase">
          Continue Shopping
        </span>
      </button>
    </div>
  );
}

function TotalAndCheckout({ totalItems, finalTotal, totalDueToday, hasFlexPayItems, quantityDiscountPercent, onCheckout }: {
  totalItems: number;
  finalTotal: number;
  totalDueToday: number;
  hasFlexPayItems: boolean;
  quantityDiscountPercent: number;
  onCheckout: () => void;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full bg-white pt-[10px]">
      {/* Total with item count */}
      <div className="w-full flex flex-col gap-[6px]">
        <div className="flex items-center justify-between w-full">
          <p className="font-['Inter',sans-serif] font-medium leading-[1.4] text-[#003b3c] text-base">
            {hasFlexPayItems ? 'Due Today' : `Total (${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}
          </p>
          <p className="font-['Inter',sans-serif] font-medium leading-[1.4] text-[#003b3c] text-base">
            ${(hasFlexPayItems ? totalDueToday : finalTotal).toFixed(2)}
          </p>
        </div>
        
        {/* Order Total - Secondary (only show if there are FlexPay items) */}
        {hasFlexPayItems && (
          <div className="flex items-center justify-between w-full">
            <p className="font-['Inter',sans-serif] text-[13px] leading-[1.4] text-[#406c6d]">
              Order Total
            </p>
            <p className="font-['Inter',sans-serif] text-[13px] leading-[1.4] text-[#406c6d]">
              ${finalTotal.toFixed(2)}
            </p>
          </div>
        )}
        
        {/* Discount note - only show if discount is active and no FlexPay */}
        {quantityDiscountPercent > 0 && !hasFlexPayItems && (
          <p className="font-['Inter',sans-serif] text-[13px] leading-[1.4] text-[#009296]">
            Includes {quantityDiscountPercent}% quantity discount
          </p>
        )}
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="bg-[#009296] hover:bg-[#007d81] transition-colors h-[50px] relative rounded-[999px] shrink-0 w-full"
      >
        <div className="flex flex-row justify-center size-full">
          <div className="box-border content-stretch flex gap-[10px] h-[50px] items-center justify-center px-[39px] py-[15px] relative w-full">
            <p className="font-['Inter',sans-serif] font-medium leading-[normal] relative shrink-0 text-base text-center text-white tracking-[1.92px] uppercase">
              CHECKOUT
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}

export default function MiniCart({ items, onUpdateQuantity, onClose, onViewCart, onCheckout }: MiniCartProps) {
  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate quantity discount (SAME LOGIC AS CART PAGE)
  const getQuantityDiscountPercent = (units: number): number => {
    if (units >= 9) return 20;
    if (units >= 6) return 15;
    if (units >= 4) return 10;
    if (units >= 2) return 5;
    return 0;
  };
  
  // Filter out Today's Special items for discount calculation
  const eligibleItems = items.filter(item => !item.isTodaysSpecial);
  const eligibleItemCount = eligibleItems.reduce((sum, item) => sum + item.quantity, 0);
  const eligibleSubtotal = eligibleItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const quantityDiscountPercent = getQuantityDiscountPercent(eligibleItemCount);
  const quantityDiscountAmount = (eligibleSubtotal * quantityDiscountPercent) / 100;
  
  // Total items (for display)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate "Due Today" - for FlexPay items
  const dueToday = items.reduce((sum, item) => {
    if ((item.purchaseType === 'flexpay' || item.purchaseType === 'autoship-flexpay') && item.flexPayAmount) {
      return sum + (item.flexPayAmount * item.quantity);
    } else {
      return sum + (item.price * item.quantity);
    }
  }, 0);
  
  // Final total
  const shipping = 0;
  const total = subtotal - quantityDiscountAmount + shipping;
  const totalDueToday = dueToday - quantityDiscountAmount + shipping;
  
  // Check if cart has any FlexPay items
  const hasFlexPayItems = items.some(item => item.purchaseType === 'flexpay' || item.purchaseType === 'autoship-flexpay');
  
  const isEmpty = items.length === 0;

  return (
    <div className="bg-white relative size-full flex flex-col">
      {isEmpty ? (
        // Empty cart state
        <div className="flex flex-col h-full">
          <Header itemCount={0} onViewCart={onViewCart} onClose={onClose} hideViewCart />
          <div className="flex-1 flex items-center justify-center px-[30px]">
            <EmptyCartState onClose={onClose} />
          </div>
        </div>
      ) : (
        // Cart with items
        <>
          {/* Header */}
          <Header itemCount={items.length} onViewCart={onViewCart} onClose={onClose} />

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-[30px] py-[30px] mini-cart-scroll">
            <div className="mb-[30px]">
              <FreeShippingProgress subtotal={subtotal} />
            </div>
            
            <ProductList items={items} onUpdateQuantity={onUpdateQuantity} />
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-[#D9E2E2] px-[30px] py-[20px]">
            <TotalAndCheckout totalItems={totalItems} finalTotal={total} totalDueToday={totalDueToday} hasFlexPayItems={hasFlexPayItems} quantityDiscountPercent={quantityDiscountPercent} onCheckout={onCheckout} />
          </div>
        </>
      )}
    </div>
  );
}