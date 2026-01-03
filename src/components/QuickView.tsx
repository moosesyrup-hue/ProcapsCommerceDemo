/**
 * Quick View Component
 * Rebuilt from scratch for stable, bug-free performance
 */

import { X, Check } from 'lucide-react';
import { useState } from 'react';

interface QuickViewProps {
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    basePrice: number;
    salePrice: number;
    isSpecial?: boolean;
    counts: Array<{ value: number; label: string; basePrice: number; salePrice: number }>;
  };
  onClose: () => void;
  onAddToCart: (config: {
    productId: string;
    count: number;
    purchaseType: 'one-time' | 'subscribe';
    frequency?: number;
    quantity: number;
  }) => void;
  onViewDetails: () => void;
}

export default function QuickView({ product, onClose, onAddToCart, onViewDetails }: QuickViewProps) {
  const [selectedCount, setSelectedCount] = useState(product.counts[0].value);
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscribe'>('one-time');
  const [frequency, setFrequency] = useState(30);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Get the current count's pricing
  const selectedCountData = product.counts.find(c => c.value === selectedCount) || product.counts[0];
  
  // Calculate prices based on selected count
  const oneTimePrice = selectedCountData.salePrice;
  const subscribePrice = selectedCountData.salePrice * 0.9; // 10% off
  const basePrice = selectedCountData.basePrice;

  const handleAddToCart = () => {
    // Show success animation
    setIsAdding(true);
    
    // After animation, trigger cart addition and opening
    setTimeout(() => {
      onAddToCart({
        productId: product.id,
        count: selectedCount,
        purchaseType,
        frequency: purchaseType === 'subscribe' ? frequency : undefined,
        quantity
      });
      // Reset state after cart opens
      setTimeout(() => setIsAdding(false), 300);
    }, 1200); // Show success state for 1.2 seconds
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header - Fixed */}
      <div className="flex-none border-b border-[#D9E2E2] px-[30px] py-[24px]">
        <div className="flex items-center justify-between gap-[20px]">
          <h2 className="font-['STIX_Two_Text',sans-serif] text-xl text-[#003b3c]" style={{ fontWeight: 500 }}>
            Quick View
          </h2>
          <div className="flex items-center gap-[20px]">
            <button
              onClick={onViewDetails}
              className="font-['Inter',sans-serif] text-sm text-[#003b3c] underline hover:opacity-70 transition-opacity"
            >
              Product Details
            </button>
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

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-[30px] py-[30px]">
        <div className="flex flex-col gap-[30px]">
          
          {/* Product Header */}
          <div className="flex gap-[20px] items-start">
            <div className="relative rounded-[10px] shrink-0 w-[120px] h-[120px]">
              <img
                alt={product.name}
                className="w-full h-full object-cover rounded-[10px]"
                src={product.image}
              />
            </div>

            <div className="flex-1 min-w-0">
              {product.isSpecial && (
                <p className="font-['Inter',sans-serif] text-xs text-[#D84315] uppercase tracking-[1.2px] mb-[8px]">
                  TODAY'S SPECIAL
                </p>
              )}
              <h3 className="font-['Inter',sans-serif] font-medium text-lg text-[#003b3c] mb-[8px]">
                {product.name}
              </h3>
              <p className="font-['Inter',sans-serif] text-sm text-[#406c6d] leading-[1.4]">
                {product.description}
              </p>
            </div>
          </div>

          {/* Count Selector */}
          <div>
            <p className="font-['Inter',sans-serif] text-sm text-[#003b3c] mb-[12px]">
              Choose your count:
            </p>
            <div className="flex gap-[10px] flex-wrap">
              {product.counts.map((count) => (
                <button
                  key={count.value}
                  onClick={() => setSelectedCount(count.value)}
                  className={`
                    h-[44px] px-[24px] rounded-[999px] border transition-all duration-200
                    font-['Inter',sans-serif] text-sm
                    ${selectedCount === count.value
                      ? 'bg-[#009296] border-[#009296] text-white'
                      : 'bg-white border-[#D9E2E2] text-[#003b3c] hover:border-[#009296]'
                    }
                  `}
                >
                  {count.label}
                </button>
              ))}
            </div>
          </div>

          {/* Purchase Type */}
          <div>
            <p className="font-['Inter',sans-serif] text-sm text-[#003b3c] mb-[12px]">
              Purchase type:
            </p>
            
            <div className="flex flex-col gap-[12px]">
              
              {/* One-Time Purchase */}
              <button
                onClick={() => setPurchaseType('one-time')}
                className={`
                  border-2 rounded-[8px] p-[16px] text-left transition-all duration-200
                  ${purchaseType === 'one-time'
                    ? 'border-[#009296]'
                    : 'border-[#D9E2E2] hover:border-[#009296]'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[12px]">
                    {/* Radio Button */}
                    <div className="relative w-[20px] h-[20px] shrink-0">
                      <div className={`
                        w-full h-full rounded-full border-2 transition-all duration-200
                        ${purchaseType === 'one-time'
                          ? 'border-[#009296]'
                          : 'border-[#D9E2E2]'
                        }
                      `}>
                        {purchaseType === 'one-time' && (
                          <div className="w-[10px] h-[10px] rounded-full bg-[#009296] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                    </div>
                    <p className="font-['Inter',sans-serif] font-medium text-base text-[#003b3c]">
                      One-Time Purchase
                    </p>
                  </div>
                  <div className="flex items-center gap-[10px] shrink-0">
                    <p className="font-['Inter',sans-serif] text-sm text-[#406c6d] line-through text-right">
                      ${basePrice.toFixed(2)}
                    </p>
                    <p className="font-['Inter',sans-serif] font-medium text-base text-[#D84315] text-right min-w-[60px]">
                      ${oneTimePrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </button>

              {/* Subscribe & Save */}
              <div
                className={`
                  border-2 rounded-[8px] transition-all duration-200
                  ${purchaseType === 'subscribe'
                    ? 'border-[#009296]'
                    : 'border-[#D9E2E2] hover:border-[#009296]'
                  }
                `}
              >
                <button
                  onClick={() => setPurchaseType('subscribe')}
                  className="w-full p-[16px] text-left"
                >
                  <div className="flex items-start justify-between gap-[16px]">
                    <div className="flex items-start gap-[12px] flex-1 min-w-0">
                      {/* Radio Button */}
                      <div className="relative w-[20px] h-[20px] shrink-0 mt-[2px]">
                        <div className={`
                          w-full h-full rounded-full border-2 transition-all duration-200
                          ${purchaseType === 'subscribe'
                            ? 'border-[#009296]'
                            : 'border-[#D9E2E2]'
                          }
                        `}>
                          {purchaseType === 'subscribe' && (
                            <div className="w-[10px] h-[10px] rounded-full bg-[#009296] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-['Inter',sans-serif] font-medium text-base text-[#003b3c] mb-[4px]">
                          Subscribe & Save 10% Extra
                        </p>
                        <p className="font-['Inter',sans-serif] text-xs text-[#406c6d]">
                          Special price + 10% autoship discount
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-[10px] shrink-0">
                      <div className="flex items-center h-[24px]">
                        <p className="font-['Inter',sans-serif] text-sm text-[#406c6d] line-through text-right">
                          ${basePrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="font-['Inter',sans-serif] font-medium text-base text-[#D84315] leading-[1.5] text-right min-w-[60px]">
                          ${subscribePrice.toFixed(2)}
                        </p>
                        <p className="font-['Inter',sans-serif] text-xs text-[#406c6d] text-right">
                          /shipment
                        </p>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Frequency Options - Expandable */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: purchaseType === 'subscribe' ? '1fr' : '0fr',
                    transition: 'grid-template-rows 300ms ease-in-out'
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div className="px-[16px] pb-[16px]">
                      <div className="pt-[16px] border-t border-[#D9E2E2]">
                        <p className="font-['Inter',sans-serif] text-sm text-[#003b3c] mb-[12px]">
                          Delivery frequency:
                        </p>
                        
                        {/* Frequency Buttons */}
                        <div className="flex gap-[10px] mb-[16px]">
                          {[30, 60, 90].map((days) => (
                            <button
                              key={days}
                              onClick={(e) => {
                                e.stopPropagation();
                                setFrequency(days);
                              }}
                              className={`
                                flex-1 h-[40px] rounded-[6px] border transition-all duration-200
                                font-['Inter',sans-serif] text-sm
                                flex items-center justify-center
                                ${frequency === days
                                  ? 'bg-[#009296] border-[#009296] text-white'
                                  : 'bg-white border-[#D9E2E2] text-[#003b3c] hover:border-[#009296]'
                                }
                              `}
                            >
                              Every {days} days
                            </button>
                          ))}
                        </div>

                        {/* Benefits */}
                        <div className="flex flex-col gap-[8px]">
                          <div className="flex items-start gap-[8px]">
                            <Check className="w-[16px] h-[16px] text-[#009296] shrink-0 mt-[2px]" />
                            <p className="font-['Inter',sans-serif] text-xs text-[#003b3c] leading-[1.4]">
                              Save 10% + Free shipping
                            </p>
                          </div>
                          <div className="flex items-start gap-[8px]">
                            <Check className="w-[16px] h-[16px] text-[#009296] shrink-0 mt-[2px]" />
                            <p className="font-['Inter',sans-serif] text-xs text-[#003b3c] leading-[1.4]">
                              Easy to use account portal
                            </p>
                          </div>
                          <div className="flex items-start gap-[8px]">
                            <Check className="w-[16px] h-[16px] text-[#009296] shrink-0 mt-[2px]" />
                            <p className="font-['Inter',sans-serif] text-xs text-[#003b3c] leading-[1.4]">
                              Reminders before each order
                            </p>
                          </div>
                          <div className="flex items-start gap-[8px]">
                            <Check className="w-[16px] h-[16px] text-[#009296] shrink-0 mt-[2px]" />
                            <p className="font-['Inter',sans-serif] text-xs text-[#003b3c] leading-[1.4]">
                              Pause or cancel anytime
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Fixed */}
      <div className="flex-none border-t border-[#D9E2E2] px-[30px] py-[20px] bg-white">
        <div className="flex items-center gap-[20px]">
          
          {/* Quantity Selector */}
          <div className="flex items-center gap-[12px]">
            <button
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="relative shrink-0 w-[36px] h-[36px] hover:opacity-70 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:opacity-40"
              aria-label="Decrease quantity"
            >
              <svg className="w-full h-full" fill="none" viewBox="0 0 46 46">
                <circle 
                  cx="23" 
                  cy="23" 
                  r="22" 
                  stroke={quantity <= 1 ? "#9CB5B5" : "#003B3C"} 
                  strokeWidth="1" 
                />
                <line 
                  stroke={quantity <= 1 ? "#9CB5B5" : "#003B3C"} 
                  strokeWidth="1" 
                  x1="32.5" 
                  x2="13.5" 
                  y1="23" 
                  y2="23" 
                />
              </svg>
            </button>
            
            <p className="font-['Inter',sans-serif] font-medium text-base text-[#003b3c] min-w-[30px] text-center">
              {quantity}
            </p>
            
            <button
              onClick={increaseQuantity}
              className="relative shrink-0 w-[36px] h-[36px] hover:opacity-70 transition-opacity"
              aria-label="Increase quantity"
            >
              <svg className="w-full h-full" fill="none" viewBox="0 0 46 46">
                <circle 
                  cx="23" 
                  cy="23" 
                  r="22" 
                  stroke="#003B3C" 
                  strokeWidth="1" 
                />
                <line 
                  stroke="#003B3C" 
                  strokeWidth="1" 
                  x1="23" 
                  x2="23" 
                  y1="13.5" 
                  y2="32.5" 
                />
                <line 
                  stroke="#003B3C" 
                  strokeWidth="1" 
                  x1="32.5" 
                  x2="13.5" 
                  y1="23" 
                  y2="23" 
                />
              </svg>
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`
              h-[50px] rounded-[999px] flex-1 flex items-center justify-center gap-[10px]
              transition-all duration-300 ease-in-out
              ${isAdding 
                ? 'bg-[#4CAF50]' 
                : 'bg-[#009296] hover:bg-[#007d81]'
              }
              disabled:cursor-not-allowed
            `}
          >
            {isAdding && (
              <Check className="w-[20px] h-[20px] text-white" strokeWidth={3} />
            )}
            <span className="font-['Inter',sans-serif] font-medium text-base text-white tracking-[1.92px] uppercase">
              {isAdding ? 'ITEM ADDED' : 'ADD TO CART'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}