import { Calendar, CreditCard, Loader2, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { CalendarPicker } from './CalendarPicker';

// Icon components for quantity - matching MiniCart design
const IconAdd = ({ onClick }: { onClick: () => void }) => (
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

const IconRemove = ({ onClick, disabled }: { onClick: () => void; disabled: boolean }) => {
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
};

interface Address {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
}

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
}

interface Subscription {
  id: string;
  productName: string;
  quantity: number;
  frequency: string;
  nextDelivery: string;
  price: number;
}

interface Delivery {
  date: string;
  price: number;
}

interface SubscriptionManagePanelProps {
  sub: Subscription;
  currentValues: Subscription & { paymentId?: string; addressId?: string };
  currentPaymentId: string;
  currentAddressId: string;
  availablePaymentMethods: PaymentMethod[];
  availableAddresses: Address[];
  displayedDeliveries: Delivery[];
  showAllDeliveries: boolean;
  datePickerOpen: boolean;
  frequencyMode: number | 'other' | undefined;
  customFrequencyValues: string;
  frequencyError: string;
  isSaving: boolean;
  hasPendingChanges: boolean;
  
  // Handlers
  onCancelChanges: () => void;
  onSaveChanges: () => void;
  onFrequencyModeChange: (mode: number | 'other') => void;
  onCustomFrequencyApply: () => void;
  onCustomFrequencyChange: (value: string) => void;
  onCustomFrequencyBlur: () => void;
  onQuantityChange: (delta: number) => void;
  onDatePickerToggle: () => void;
  onDateChange: (date: string) => void;
  onPaymentChange: (paymentId: string) => void;
  onAddressChange: (addressId: string) => void;
  onShowAllDeliveriesToggle: () => void;
  onShowPaymentModal: () => void;
  onShowAddressModal: () => void;
  onCancelAutoship: () => void;
  
  getAvailableDates: (currentDate: string, frequency: string) => Array<{ label: string; fullLabel: string }>;
  getRelativeDays: (date: string) => string;
}

export function SubscriptionManagePanel({
  sub,
  currentValues,
  currentPaymentId,
  currentAddressId,
  availablePaymentMethods,
  availableAddresses,
  displayedDeliveries,
  showAllDeliveries,
  datePickerOpen,
  frequencyMode,
  customFrequencyValues,
  frequencyError,
  isSaving,
  hasPendingChanges,
  onCancelChanges,
  onSaveChanges,
  onFrequencyModeChange,
  onCustomFrequencyApply,
  onCustomFrequencyChange,
  onCustomFrequencyBlur,
  onQuantityChange,
  onDatePickerToggle,
  onDateChange,
  onPaymentChange,
  onAddressChange,
  onShowAllDeliveriesToggle,
  onShowPaymentModal,
  onShowAddressModal,
  onCancelAutoship,
  getAvailableDates,
  getRelativeDays,
}: SubscriptionManagePanelProps) {
  const actionBarRef = useRef<HTMLDivElement>(null);
  const panelBottomRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [actionBarWidth, setActionBarWidth] = useState(0);

  useEffect(() => {
    const actionBar = actionBarRef.current;
    const panelBottom = panelBottomRef.current;
    if (!actionBar || !panelBottom) return;

    let actionBarScrolledPast = false;
    let panelScrolledPast = false;

    const actionBarObserver = new IntersectionObserver(
      ([entry]) => {
        // When the action bar scrolls out of view at the top
        actionBarScrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        // Only stick if action bar is past AND panel is still visible
        setIsSticky(actionBarScrolledPast && !panelScrolledPast);
      },
      {
        threshold: [1],
        rootMargin: '-1px 0px 0px 0px'
      }
    );

    const panelBottomObserver = new IntersectionObserver(
      ([entry]) => {
        // When the panel bottom scrolls out of view at the top (we're past the panel)
        panelScrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        // Only stick if action bar is past AND panel is still visible
        setIsSticky(actionBarScrolledPast && !panelScrolledPast);
      },
      {
        threshold: [0],
        rootMargin: '0px'
      }
    );

    actionBarObserver.observe(actionBar);
    panelBottomObserver.observe(panelBottom);

    // Track width for the fixed clone
    const updateWidth = () => {
      if (actionBar) {
        setActionBarWidth(actionBar.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => {
      actionBarObserver.disconnect();
      panelBottomObserver.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return (
    <div className="bg-[#FAFBFB] border-t border-[#D9E2E2]">
      {/* Top Action Bar - Original (for positioning reference) */}
      <div 
        ref={actionBarRef}
        className="px-[30px] md:px-[40px] pt-[24px] pb-[20px] border-b border-[#D9E2E2] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px]"
      >
        <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
          Make changes below and click Save when ready
        </p>
        <div className="flex gap-[12px] shrink-0 self-end sm:self-auto">
          <button
            onClick={onCancelChanges}
            disabled={isSaving}
            className="
              px-[20px] py-[10px] border border-[#D9E2E2] rounded-[8px]
              hover:border-[#003b3c] transition-colors
              cursor-pointer focus:outline-none
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <span className="font-['Inter',sans-serif] text-[13px] text-[#003b3c] uppercase tracking-[0.05em]">
              Cancel
            </span>
          </button>
          <button
            onClick={onSaveChanges}
            disabled={!hasPendingChanges || isSaving}
            className="
              px-[20px] py-[10px] bg-[#009296] rounded-[8px]
              hover:bg-[#007d81] transition-colors
              cursor-pointer focus:outline-none
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center gap-[8px]
            "
          >
            {isSaving ? (
              <Loader2 className="size-[14px] text-white animate-spin" />
            ) : null}
            <span className="font-['Inter',sans-serif] text-[13px] text-white uppercase tracking-[0.05em]">
              Save Changes
            </span>
          </button>
        </div>
      </div>

      {/* Top Action Bar - Fixed Clone */}
      {isSticky && (
        <div
          className="fixed top-0 z-10 px-[30px] md:px-[40px] pt-[24px] pb-[20px] border-b border-[#D9E2E2] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px] shadow-sm"
          style={{ width: actionBarWidth }}
        >
          <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
            Make changes below and click Save when ready
          </p>
          <div className="flex gap-[12px] shrink-0 self-end sm:self-auto">
            <button
              onClick={onCancelChanges}
              disabled={isSaving}
              className="
                px-[20px] py-[10px] border border-[#D9E2E2] rounded-[8px]
                hover:border-[#003b3c] transition-colors
                cursor-pointer focus:outline-none
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <span className="font-['Inter',sans-serif] text-[13px] text-[#003b3c] uppercase tracking-[0.05em]">
                Cancel
              </span>
            </button>
            <button
              onClick={onSaveChanges}
              disabled={!hasPendingChanges || isSaving}
              className="
                px-[20px] py-[10px] bg-[#009296] rounded-[8px]
                hover:bg-[#007d81] transition-colors
                cursor-pointer focus:outline-none
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center gap-[8px]
              "
            >
              {isSaving ? (
                <Loader2 className="size-[14px] text-white animate-spin" />
              ) : null}
              <span className="font-['Inter',sans-serif] text-[13px] text-white uppercase tracking-[0.05em]">
                Save Changes
              </span>
            </button>
          </div>
        </div>
      )}

      <div className="px-[30px] md:px-[40px] py-[32px] space-y-[40px]">
        {/* SECTION 1: Order Configuration */}
        <div>
          <h4 className="font-['Inter',sans-serif] text-[12px] font-medium text-[#003b3c] uppercase tracking-[0.1em] mb-[20px] flex items-center gap-[10px]">
            <div className="size-[22px] rounded-full bg-[#009296] text-white flex items-center justify-center text-[11px] font-bold shrink-0">1</div>
            Order Configuration
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
            {/* Quantity */}
            <div className="bg-white border border-[#D9E2E2] rounded-[8px] p-[20px]">
              <p className="font-['Inter',sans-serif] text-[13px] text-[#406c6d] uppercase tracking-[0.05em] mb-[16px]">
                Quantity
              </p>
              <div className="flex items-center gap-[12px]">
                <IconRemove 
                  onClick={() => onQuantityChange(-1)} 
                  disabled={currentValues.quantity <= 1}
                />
                <p className="font-['Inter',sans-serif] font-medium text-[18px] text-[#003b3c] min-w-[24px] text-center">
                  {currentValues.quantity}
                </p>
                <IconAdd onClick={() => onQuantityChange(1)} />
                <span className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] ml-[8px]">
                  ${(sub.price * currentValues.quantity).toFixed(2)} per delivery
                </span>
              </div>
            </div>

            {/* Frequency */}
            <div className="bg-white border border-[#D9E2E2] rounded-[8px] p-[20px]">
              <p className="font-['Inter',sans-serif] text-[13px] text-[#406c6d] uppercase tracking-[0.05em] mb-[16px]">
                Delivery Frequency
              </p>
              
              <p className="font-['Inter',sans-serif] text-[16px] text-[#003b3c] mb-[14px] font-medium">
                {currentValues.frequency}
              </p>
              
              {/* Frequency Buttons */}
              <div className="flex gap-[8px] mb-[12px]">
                {[30, 60, 90, 'other'].map((option) => (
                  <button
                    key={option}
                    onClick={() => onFrequencyModeChange(option as number | 'other')}
                    className={`
                      flex-1 h-[38px] rounded-[6px] border transition-all duration-200
                      font-['Inter',sans-serif] text-[13px]
                      flex items-center justify-center
                      ${(frequencyMode ?? (currentValues.frequency === 'Every 30 days' ? 30 : currentValues.frequency === 'Every 60 days' ? 60 : currentValues.frequency === 'Every 90 days' ? 90 : 'other')) === option
                        ? 'bg-[#009296] border-[#009296] text-white font-medium'
                        : 'bg-white border-[#D9E2E2] text-[#003b3c] hover:border-[#009296]'
                      }
                    `}
                  >
                    {option === 'other' ? 'Other' : `${option} days`}
                  </button>
                ))}
              </div>
              
              {/* Custom Frequency Input */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: (frequencyMode ?? (currentValues.frequency !== 'Every 30 days' && currentValues.frequency !== 'Every 60 days' && currentValues.frequency !== 'Every 90 days' ? 'other' : null)) === 'other' ? '1fr' : '0fr',
                  transition: 'grid-template-rows 300ms ease-in-out'
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <div className="pt-[4px]">
                    <p className="font-['Inter',sans-serif] text-[13px] text-[#003b3c] mb-[8px]">
                      Custom frequency (15-500 days):
                    </p>
                    <div className="flex items-center gap-[8px]">
                      <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c]">
                        Every
                      </span>
                      <div className="relative flex-1 max-w-[100px]">
                        <input
                          type="number"
                          min="15"
                          max="500"
                          value={customFrequencyValues || ''}
                          onChange={(e) => onCustomFrequencyChange(e.target.value)}
                          onBlur={onCustomFrequencyBlur}
                          placeholder="0"
                          className="
                            w-full h-[36px] px-[12px] rounded-[6px] border transition-all duration-200
                            font-['Inter',sans-serif] text-[14px] text-[#003b3c]
                            bg-white border-[#D9E2E2]
                            focus:outline-none focus:border-[#009296]
                          "
                        />
                      </div>
                      <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c]">
                        days
                      </span>
                    </div>
                    <button
                      onClick={onCustomFrequencyApply}
                      disabled={!customFrequencyValues}
                      className="
                        mt-[10px] h-[36px] px-[20px] rounded-[6px]
                        bg-[#009296] text-white
                        font-['Inter',sans-serif] text-[13px] font-medium
                        hover:bg-[#007d81] transition-colors
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                    >
                      Apply
                    </button>
                    {frequencyError && (
                      <p className="font-['Inter',sans-serif] text-[13px] text-[#C62828] mt-[8px]">
                        {frequencyError}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Delivery Schedule */}
        <div>
          <h4 className="font-['Inter',sans-serif] text-[12px] font-medium text-[#003b3c] uppercase tracking-[0.1em] mb-[20px] flex items-center gap-[10px]">
            <div className="size-[22px] rounded-full bg-[#009296] text-white flex items-center justify-center text-[11px] font-bold shrink-0">2</div>
            Delivery Schedule
          </h4>
          
          <div className="space-y-[20px]">
            {/* Next Delivery Date */}
            <div className="bg-white border border-[#D9E2E2] rounded-[8px] p-[20px]">
              <p className="font-['Inter',sans-serif] text-[13px] text-[#406c6d] uppercase tracking-[0.05em] mb-[16px]">
                Next Delivery
              </p>
              
              <div className="flex items-center gap-[8px] mb-[12px]">
                <Calendar className="size-[16px] text-[#009296]" />
                <p className="font-['Inter',sans-serif] text-[16px] font-medium text-[#003b3c]">
                  {currentValues.nextDelivery}
                </p>
              </div>
              
              <button
                onClick={onDatePickerToggle}
                className="font-['Inter',sans-serif] text-[14px] text-[#009296] hover:underline"
              >
                {datePickerOpen ? 'Cancel' : 'Change Date'}
              </button>
              
              {/* Inline Date Picker */}
              <AnimatePresence>
                {datePickerOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-[16px]">
                      <CalendarPicker
                        selectedDate={currentValues.nextDelivery}
                        onDateSelect={(date) => {
                          onDateChange(date);
                        }}
                        minDaysAhead={3}
                        maxMonthsAhead={12}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Upcoming Deliveries Preview */}
            <div className="bg-white border border-[#D9E2E2] rounded-[8px] p-[20px]">
              <p className="font-['Inter',sans-serif] text-[13px] text-[#406c6d] uppercase tracking-[0.05em] mb-[16px]">
                Upcoming Deliveries
              </p>

              <div className="space-y-[8px]">
                <AnimatePresence initial={false} mode="sync">
                  {displayedDeliveries.map((delivery, index) => {
                    const isNext = index === 0;
                    const relativeDays = getRelativeDays(delivery.date);
                    
                    return (
                      <motion.div
                        key={`${delivery.date}-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className={`flex items-center justify-between gap-[12px] p-[12px] rounded-[6px] ${
                          isNext ? 'bg-[#E0F7F8]/40' : 'bg-[#F5F9F9]'
                        }`}
                      >
                        <div className="flex items-center gap-[8px] flex-1 min-w-0">
                          <Calendar className={`size-[14px] shrink-0 ${
                            isNext ? 'text-[#009296]' : 'text-[#406c6d]'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className={`font-['Inter',sans-serif] text-[14px] ${
                              isNext ? 'text-[#003b3c] font-medium' : 'text-[#003b3c]'
                            }`}>
                              {delivery.date}
                            </p>
                            <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d]">
                              {relativeDays}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-[8px] shrink-0">
                          <p className="font-['Inter',sans-serif] text-[14px] font-medium text-[#003b3c]">
                            ${delivery.price.toFixed(2)}
                          </p>
                          {isNext && (
                            <span className="inline-flex items-center px-[6px] py-[1px] bg-[#009296] text-white rounded-[4px] text-[9px] font-medium uppercase tracking-[0.5px]">
                              Next
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              <button
                onClick={onShowAllDeliveriesToggle}
                className="font-['Inter',sans-serif] text-[14px] text-[#009296] hover:underline mt-[12px] inline-flex items-center gap-[4px]"
              >
                {showAllDeliveries ? (
                  <>
                    <span>Show Less</span>
                    <ChevronUp className="size-[14px]" />
                  </>
                ) : (
                  <>
                    <span>View More</span>
                    <ChevronDown className="size-[14px]" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 3: Fulfillment */}
        <div>
          <h4 className="font-['Inter',sans-serif] text-[12px] font-medium text-[#003b3c] uppercase tracking-[0.1em] mb-[20px] flex items-center gap-[10px]">
            <div className="size-[22px] rounded-full bg-[#009296] text-white flex items-center justify-center text-[11px] font-bold shrink-0">3</div>
            Payment & Shipping
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            {/* Payment Method */}
            <div className="bg-white border border-[#D9E2E2] rounded-[8px] p-[20px]">
              <p className="font-['Inter',sans-serif] text-[13px] text-[#406c6d] uppercase tracking-[0.05em] mb-[16px]">
                Payment Method
              </p>
              
              <div className="space-y-[12px]">
                {availablePaymentMethods.map(payment => {
                  const isSelected = currentPaymentId === payment.id;
                  return (
                    <div
                      key={payment.id}
                      onClick={() => onPaymentChange(payment.id)}
                      className={`relative border-2 rounded-[8px] p-[14px] cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#009296] bg-[#F5F9F9]'
                          : 'border-[#D9E2E2] hover:border-[#009296]/40'
                      }`}
                    >
                      <div className="flex items-start gap-[12px]">
                        <input
                          type="radio"
                          checked={isSelected}
                          onChange={() => onPaymentChange(payment.id)}
                          className="custom-checkout-radio mt-[2px]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-[10px] mb-[4px]">
                            <CreditCard className="size-[14px] text-[#009296]" />
                            <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#003b3c]">
                              <span className="tracking-[2px]">••••</span> {payment.last4}
                            </span>
                          </div>
                          <p className="font-['Inter',sans-serif] text-[13px] text-[#406c6d]">
                            Expires {payment.expiryMonth}/{payment.expiryYear}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                <button
                  onClick={onShowPaymentModal}
                  className="w-full border-2 border-dashed border-[#D9E2E2] rounded-[8px] p-[14px] font-['Inter',sans-serif] text-[13px] text-[#009296] hover:border-[#009296] hover:bg-[#F5F9F9] transition-all"
                >
                  + Use a different card
                </button>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white border border-[#D9E2E2] rounded-[8px] p-[20px]">
              <p className="font-['Inter',sans-serif] text-[13px] text-[#406c6d] uppercase tracking-[0.05em] mb-[16px]">
                Shipping Address
              </p>
              
              <div className="space-y-[12px]">
                {availableAddresses.map(address => {
                  const isSelected = currentAddressId === address.id;
                  return (
                    <div
                      key={address.id}
                      onClick={() => onAddressChange(address.id)}
                      className={`relative border-2 rounded-[8px] p-[14px] cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#009296] bg-[#F5F9F9]'
                          : 'border-[#D9E2E2] hover:border-[#009296]/40'
                      }`}
                    >
                      <div className="flex items-start gap-[12px]">
                        <input
                          type="radio"
                          checked={isSelected}
                          onChange={() => onAddressChange(address.id)}
                          className="custom-checkout-radio mt-[2px]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-[8px] mb-[6px]">
                            <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#003b3c]">
                              {address.firstName} {address.lastName}
                            </span>
                          </div>
                          <p className="font-['Inter',sans-serif] text-[13px] text-[#406c6d] leading-[1.5]">
                            {address.address}{address.apartment && `, ${address.apartment}`}<br />
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                <button
                  onClick={onShowAddressModal}
                  className="w-full border-2 border-dashed border-[#D9E2E2] rounded-[8px] p-[14px] font-['Inter',sans-serif] text-[13px] text-[#009296] hover:border-[#009296] hover:bg-[#F5F9F9] transition-all"
                >
                  + Deliver to a different address
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel Autoship - Separated at bottom */}
        <div className="pt-[24px] border-t border-[#D9E2E2]" ref={panelBottomRef}>
          <button
            onClick={onCancelAutoship}
            className="font-['Inter',sans-serif] text-[14px] text-[#C62828] hover:underline"
          >
            Cancel This Autoship
          </button>
        </div>
      </div>
    </div>
  );
}