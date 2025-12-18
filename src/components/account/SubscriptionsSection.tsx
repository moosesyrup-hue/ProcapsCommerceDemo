import { useState, useEffect } from 'react';
import { RefreshCw, SkipForward, Pause, Play, X, Calendar, AlertCircle, ChevronDown, ChevronUp, CreditCard, MapPin, Trash2, Check, Loader2, Clock, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import imgProduct from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";
import { useBreakpoint } from '../../hooks/useBreakpoint';
import AddressFormModal from '../shared/AddressFormModal';
import PaymentMethodFormModal from '../shared/PaymentMethodFormModal';

// Circle button components matching MiniCart
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

interface SubscriptionsSectionProps {
  isNewCustomer?: boolean;
}

interface Subscription {
  id: string;
  productName: string;
  productCount: string;
  productImage: string;
  frequency: 'Every 30 days' | 'Every 45 days' | 'Every 60 days' | 'Every 90 days' | 'Every 120 days';
  nextDelivery: string;
  price: number;
  status: 'Active' | 'Paused';
  quantity: number;
}

type ModalType = 'skip' | 'pause' | 'resume' | 'cancel' | null;

interface UndoAction {
  type: 'skip' | 'pause' | 'resume';
  subscriptionId: string;
  previousNextDelivery?: string;
  timeout: NodeJS.Timeout;
  productName?: string;
}

// Default payment and address for demo
const defaultPayment = {
  last4: '4242',
  nameOnCard: 'Andrew Lessman',
};

const defaultAddress = {
  firstName: 'Andrew',
  lastName: 'Lessman',
  address: '123 Main St',
  apartment: 'Apt 4B',
  city: 'Los Angeles',
  state: 'CA',
  zipCode: '90001',
};

// Mock payment methods
const availablePaymentMethods = [
  {
    id: '1',
    type: 'Visa',
    last4: '4242',
    nameOnCard: 'Andrew Lessman',
    expiryMonth: '12',
    expiryYear: '26',
  },
  {
    id: '2',
    type: 'Mastercard',
    last4: '8888',
    nameOnCard: 'Andrew Lessman',
    expiryMonth: '03',
    expiryYear: '27',
  },
  {
    id: '3',
    type: 'Amex',
    last4: '1005',
    nameOnCard: 'Andrew Lessman',
    expiryMonth: '08',
    expiryYear: '25',
  },
];

// Mock shipping addresses
const availableAddresses = [
  {
    id: '1',
    firstName: 'Andrew',
    lastName: 'Lessman',
    address: '123 Main St',
    apartment: 'Apt 4B',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
  },
  {
    id: '2',
    firstName: 'Andrew',
    lastName: 'Lessman',
    address: '456 Oak Ave',
    apartment: '',
    city: 'Santa Monica',
    state: 'CA',
    zipCode: '90402',
  },
];

export default function SubscriptionsSection({ isNewCustomer = false }: SubscriptionsSectionProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: '1',
      productName: 'Ultimate Anti-Oxidant',
      productCount: '120 Capsules',
      productImage: imgProduct,
      frequency: 'Every 60 days',
      nextDelivery: 'December 19, 2025',
      price: 35.96,
      status: 'Active',
      quantity: 1,
    },
    {
      id: '2',
      productName: 'Vitamin D3 5000 IU',
      productCount: '250 Capsules',
      productImage: imgProduct,
      frequency: 'Every 90 days',
      nextDelivery: 'December 27, 2025',
      price: 24.95,
      status: 'Active',
      quantity: 2,
    },
    {
      id: '3',
      productName: 'CoQ10 with Bioperine',
      productCount: '120 Capsules',
      productImage: imgProduct,
      frequency: 'Every 30 days',
      nextDelivery: 'January 10, 2026',
      price: 42.50,
      status: 'Paused',
      quantity: 1,
    },
  ]);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [undoAction, setUndoAction] = useState<UndoAction | null>(null);
  const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>({});
  const [savedFields, setSavedFields] = useState<Record<string, boolean>>({});
  const [showAllDeliveries, setShowAllDeliveries] = useState<Record<string, boolean>>({});
  const [datePickerOpen, setDatePickerOpen] = useState<Record<string, boolean>>({});
  const [selectedPaymentId, setSelectedPaymentId] = useState<Record<string, string>>({});
  const [selectedAddressId, setSelectedAddressId] = useState<Record<string, string>>({});
  
  // Modal states
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const { breakpoint, isMobile } = useBreakpoint();
  
  // Calculate next delivery date based on frequency
  const calculateNextDelivery = (currentDate: string, frequency: string): string => {
    const current = new Date(currentDate);
    const days = frequency === 'Every 30 days' ? 30 
      : frequency === 'Every 45 days' ? 45 
      : frequency === 'Every 60 days' ? 60 
      : frequency === 'Every 90 days' ? 90 
      : 120;
    current.setDate(current.getDate() + days);
    return current.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Calculate relative days from now
  const getRelativeDays = (dateString: string): string => {
    const deliveryDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    deliveryDate.setHours(0, 0, 0, 0);
    
    const diffTime = deliveryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    if (diffDays < 7) return `${diffDays} days away`;
    if (diffDays < 30) return `In ${diffDays} days`;
    if (diffDays < 60) return `In about ${Math.round(diffDays / 7)} weeks`;
    return `In ${diffDays} days`;
  };

  // Generate upcoming deliveries
  const getUpcomingDeliveries = (sub: Subscription, count: number = 5) => {
    const deliveries = [];
    let currentDate = sub.nextDelivery;
    for (let i = 0; i < count; i++) {
      deliveries.push({
        date: currentDate,
        price: sub.price * sub.quantity,
        status: i === 0 ? 'Active' : 'Scheduled',
      });
      currentDate = calculateNextDelivery(currentDate, sub.frequency);
    }
    return deliveries;
  };

  // Show saved indicator temporarily
  const showSavedIndicator = (fieldKey: string) => {
    setSavedFields(prev => ({ ...prev, [fieldKey]: true }));
    setTimeout(() => {
      setSavedFields(prev => {
        const updated = { ...prev };
        delete updated[fieldKey];
        return updated;
      });
    }, 2000);
  };

  // Generate available delivery dates
  const getAvailableDates = (baseDate: string, frequency: string, count: number = 8) => {
    const dates = [];
    let current = new Date(baseDate);
    const days = frequency === 'Every 30 days' ? 30 
      : frequency === 'Every 45 days' ? 45 
      : frequency === 'Every 60 days' ? 60 
      : frequency === 'Every 90 days' ? 90 
      : 120;
    
    for (let i = 0; i < count; i++) {
      dates.push({
        date: new Date(current),
        label: current.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        fullLabel: current.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      });
      current = new Date(current.getTime() + (days * 24 * 60 * 60 * 1000));
    }
    return dates;
  };

  // Handle date change
  const handleDateChange = async (subId: string, newDate: string) => {
    setLoadingActions(prev => ({ ...prev, [`${subId}-date`]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setSubscriptions(subs =>
      subs.map(s =>
        s.id === subId ? { ...s, nextDelivery: newDate } : s
      )
    );
    
    setLoadingActions(prev => ({ ...prev, [`${subId}-date`]: false }));
    setDatePickerOpen(prev => ({ ...prev, [subId]: false }));
    
    // Show saved badge
    setSavedFields(prev => ({ ...prev, [`${subId}-date`]: true }));
    setTimeout(() => {
      setSavedFields(prev => ({ ...prev, [`${subId}-date`]: false }));
    }, 2000);
    
    toast.success('Delivery date updated');
  };

  // Handle payment method change
  const handlePaymentChange = async (subId: string, paymentId: string) => {
    const fieldKey = `${subId}-payment`;
    setLoadingActions(prev => ({ ...prev, [fieldKey]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setSelectedPaymentId(prev => ({ ...prev, [subId]: paymentId }));
    setLoadingActions(prev => ({ ...prev, [fieldKey]: false }));
    
    // Show saved badge
    setSavedFields(prev => ({ ...prev, [fieldKey]: true }));
    setTimeout(() => {
      setSavedFields(prev => ({ ...prev, [fieldKey]: false }));
    }, 2000);
    
    const payment = availablePaymentMethods.find(p => p.id === paymentId);
    toast.success(`Payment updated to ${payment?.type} •••• ${payment?.last4}`);
  };

  // Handle address change
  const handleAddressChange = async (subId: string, addressId: string) => {
    const fieldKey = `${subId}-address`;
    setLoadingActions(prev => ({ ...prev, [fieldKey]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setSelectedAddressId(prev => ({ ...prev, [subId]: addressId }));
    setLoadingActions(prev => ({ ...prev, [fieldKey]: false }));
    
    // Show saved badge
    setSavedFields(prev => ({ ...prev, [fieldKey]: true }));
    setTimeout(() => {
      setSavedFields(prev => ({ ...prev, [fieldKey]: false }));
    }, 2000);
    
    toast.success('Shipping address updated');
  };

  // Clear undo timeout on unmount
  useEffect(() => {
    return () => {
      if (undoAction?.timeout) {
        clearTimeout(undoAction.timeout);
      }
    };
  }, [undoAction]);

  // Handle Skip Next
  const handleSkipClick = (sub: Subscription) => {
    setSelectedSubscription(sub);
    setModalType('skip');
  };

  const confirmSkip = () => {
    if (!selectedSubscription) return;

    const newNextDelivery = calculateNextDelivery(selectedSubscription.nextDelivery, selectedSubscription.frequency);
    const previousNextDelivery = selectedSubscription.nextDelivery;

    // Update subscription
    setSubscriptions(subs =>
      subs.map(s =>
        s.id === selectedSubscription.id
          ? { ...s, nextDelivery: newNextDelivery }
          : s
      )
    );

    // Close modal
    setModalType(null);

    // Show undo toast
    const timeout = setTimeout(() => {
      setUndoAction(null);
    }, 5000);

    setUndoAction({
      type: 'skip',
      subscriptionId: selectedSubscription.id,
      previousNextDelivery,
      timeout,
      productName: selectedSubscription.productName,
    });
  };

  // Handle Pause
  const handlePauseClick = (sub: Subscription) => {
    setSelectedSubscription(sub);
    setModalType('pause');
  };

  const confirmPause = () => {
    if (!selectedSubscription) return;

    // Update subscription status
    setSubscriptions(subs =>
      subs.map(s =>
        s.id === selectedSubscription.id
          ? { ...s, status: 'Paused' }
          : s
      )
    );

    // Close modal
    setModalType(null);

    // Show undo toast
    const timeout = setTimeout(() => {
      setUndoAction(null);
    }, 5000);

    setUndoAction({
      type: 'pause',
      subscriptionId: selectedSubscription.id,
      timeout,
      productName: selectedSubscription.productName,
    });
  };

  // Handle Resume
  const handleResumeClick = (sub: Subscription) => {
    setSelectedSubscription(sub);
    setModalType('resume');
  };

  const confirmResume = () => {
    if (!selectedSubscription) return;

    // Calculate new next delivery (30 days from now for demo)
    const newNextDelivery = calculateNextDelivery(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), selectedSubscription.frequency);

    // Update subscription status and next delivery
    setSubscriptions(subs =>
      subs.map(s =>
        s.id === selectedSubscription.id
          ? { ...s, status: 'Active', nextDelivery: newNextDelivery }
          : s
      )
    );

    // Close modal
    setModalType(null);

    // Show undo toast
    const timeout = setTimeout(() => {
      setUndoAction(null);
    }, 5000);

    setUndoAction({
      type: 'resume',
      subscriptionId: selectedSubscription.id,
      timeout,
      productName: selectedSubscription.productName,
    });
  };

  // Handle Undo
  const handleUndo = () => {
    if (!undoAction) return;

    if (undoAction.timeout) {
      clearTimeout(undoAction.timeout);
    }

    if (undoAction.type === 'skip' && undoAction.previousNextDelivery) {
      // Restore previous delivery date
      setSubscriptions(subs =>
        subs.map(s =>
          s.id === undoAction.subscriptionId
            ? { ...s, nextDelivery: undoAction.previousNextDelivery! }
            : s
        )
      );
    } else if (undoAction.type === 'pause') {
      // Restore to active
      setSubscriptions(subs =>
        subs.map(s =>
          s.id === undoAction.subscriptionId
            ? { ...s, status: 'Active' }
            : s
        )
      );
    } else if (undoAction.type === 'resume') {
      // Restore to paused
      setSubscriptions(subs =>
        subs.map(s =>
          s.id === undoAction.subscriptionId
            ? { ...s, status: 'Paused' }
            : s
        )
      );
    }

    setUndoAction(null);
  };

  // Handle Manage (toggle expanded state)
  const handleManage = (sub: Subscription) => {
    setExpandedId(prev => prev === sub.id ? null : sub.id);
  };

  // Handle frequency change
  const handleFrequencyChange = async (subId: string, newFrequency: 'Every 30 days' | 'Every 45 days' | 'Every 60 days' | 'Every 90 days' | 'Every 120 days') => {
    const fieldKey = `${subId}-frequency`;
    setLoadingActions(prev => ({ ...prev, [fieldKey]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setSubscriptions(subs =>
      subs.map(s =>
        s.id === subId ? { ...s, frequency: newFrequency } : s
      )
    );
    
    setLoadingActions(prev => ({ ...prev, [fieldKey]: false }));
    showSavedIndicator(fieldKey);
    toast.success('Delivery frequency updated');
  };

  // Handle quantity change
  const handleQuantityChange = async (subId: string, delta: number) => {
    const sub = subscriptions.find(s => s.id === subId);
    if (!sub) return;

    const newQuantity = Math.max(1, Math.min(10, sub.quantity + delta));
    if (newQuantity === sub.quantity) return;

    const fieldKey = `${subId}-quantity`;
    setLoadingActions(prev => ({ ...prev, [fieldKey]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setSubscriptions(subs =>
      subs.map(s =>
        s.id === subId ? { ...s, quantity: newQuantity } : s
      )
    );
    
    setLoadingActions(prev => ({ ...prev, [fieldKey]: false }));
    showSavedIndicator(fieldKey);
    toast.success(`Quantity updated to ${newQuantity}`);
  };

  // Handle cancel
  const handleCancelClick = (sub: Subscription) => {
    setSelectedSubscription(sub);
    setModalType('cancel');
  };

  const confirmCancel = () => {
    if (!selectedSubscription) return;

    // Remove subscription
    setSubscriptions(subs => subs.filter(s => s.id !== selectedSubscription.id));

    // Close modal
    setModalType(null);
    
    toast.success(`${selectedSubscription.productName} autoship cancelled`);
  };

  // Close modal
  const closeModal = () => {
    setModalType(null);
    setSelectedSubscription(null);
  };

  // Use empty array if new customer
  const displaySubscriptions = isNewCustomer ? [] : subscriptions;

  // Get responsive headline sizing based on breakpoint
  const headlineSize = breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[54px]' : breakpoint === 'L' ? 'text-[38px]' : breakpoint === 'M' ? 'text-[34px]' : 'text-[28px]';
  const headlineTracking = breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : breakpoint === 'L' ? 'tracking-[-0.76px]' : breakpoint === 'M' ? 'tracking-[-0.68px]' : 'tracking-[-0.56px]';

  return (
    <div>
      {/* Page Title */}
      <div className="mb-[40px]">
        <h1 className={`font-['STIX_Two_Text',sans-serif] font-medium leading-[1.1] ${headlineSize} ${headlineTracking} text-[#003b3c]`}>
          Autoship
        </h1>
      </div>

      {displaySubscriptions.length > 0 ? (
        <div className="space-y-[20px]">
          {displaySubscriptions.map((sub) => {
            const isExpanded = expandedId === sub.id;
            const upcomingDeliveries = getUpcomingDeliveries(sub);
            const displayedDeliveries = showAllDeliveries[sub.id] ? upcomingDeliveries : upcomingDeliveries.slice(0, 2);
            const frequencyKey = `${sub.id}-frequency`;
            const quantityKey = `${sub.id}-quantity`;

            return (
              <div
                key={sub.id}
                className="bg-white rounded-[8px] overflow-hidden transition-all"
              >
                <div className="p-[30px] md:p-[40px]">
                  {/* Subscription Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-[20px] mb-[24px] pb-[24px] border-b border-[#D9E2E2]">
                    {/* Product Image */}
                    <div className="size-[80px] rounded-[4px] overflow-hidden bg-white shrink-0">
                      <img src={sub.productImage} alt={sub.productName} className="w-full h-full object-contain" />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-['Inter',sans-serif] font-medium text-[#003b3c] mb-[4px]">
                        {sub.productName}
                      </h3>
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[4px]">
                        {sub.productCount}
                      </p>
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[8px]">
                        Qty: {sub.quantity}
                      </p>
                      {sub.status === 'Active' ? (
                        <div className="inline-flex bg-[#E0F7F8] rounded-[8px] px-[12px] py-[6px] self-start">
                          <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#009296] uppercase tracking-[0.5px]">
                            {sub.status}
                          </span>
                        </div>
                      ) : (
                        <div className="inline-flex bg-[#FFF3E0] rounded-[8px] px-[12px] py-[6px] self-start">
                          <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#E65100] uppercase tracking-[0.5px]">
                            {sub.status}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="text-left sm:text-right">
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[4px]">
                        Price
                      </p>
                      <p className="font-['Inter',sans-serif] font-medium text-[#003b3c]">
                        ${(sub.price * sub.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Subscription Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] sm:gap-[40px] mb-[24px]">
                    <div className="max-w-[220px]">
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[4px]">
                        Frequency
                      </p>
                      <p className="font-['Inter',sans-serif] text-[#003b3c]">
                        {sub.frequency}
                      </p>
                    </div>
                    <div>
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[4px]">
                        Next Delivery
                      </p>
                      <p className="font-['Inter',sans-serif] text-[#003b3c]">
                        {sub.nextDelivery}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-[12px] pt-[24px] border-t border-[#D9E2E2]">
                    {sub.status === 'Active' ? (
                      <>
                        <button
                          onClick={() => handleSkipClick(sub)}
                          className="inline-flex items-center justify-center px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
                        >
                          <SkipForward className="size-[16px] text-[#003b3c] mr-[8px]" />
                          <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                            Skip Next
                          </span>
                        </button>
                        <button
                          onClick={() => handlePauseClick(sub)}
                          className="inline-flex items-center justify-center px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
                        >
                          <Pause className="size-[16px] text-[#003b3c] mr-[8px]" />
                          <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                            Pause
                          </span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleResumeClick(sub)}
                        className="inline-flex items-center justify-center px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
                      >
                        <Play className="size-[16px] text-[#003b3c] mr-[8px]" />
                        <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                          Resume
                        </span>
                      </button>
                    )}
                    <button
                      onClick={() => handleManage(sub)}
                      className="inline-flex items-center justify-center gap-[8px] px-[24px] py-[12px] bg-[#009296] rounded-[8px] hover:bg-[#007d81] transition-colors cursor-pointer focus:outline-none"
                    >
                      <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                        Manage
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="size-[16px] text-white" />
                      ) : (
                        <ChevronDown className="size-[16px] text-white" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white border-t border-[#D9E2E2] px-[30px] md:px-[40px] py-[30px]">
                        {/* Row 1: Frequency | Quantity | Next Delivery (3 columns) */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px] lg:gap-[32px]">
                          {/* Frequency */}
                          <div>
                            <div className="flex items-center gap-[8px] mb-[12px]">
                              <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em]">
                                Frequency
                              </p>
                              <AnimatePresence>
                                {savedFields[frequencyKey] && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="inline-flex items-center gap-[4px] bg-[#E8F5E9] px-[6px] py-[1px] rounded-[4px]"
                                  >
                                    <Check className="size-[10px] text-[#2E7D32]" />
                                    <span className="font-['Inter',sans-serif] text-[10px] font-medium text-[#2E7D32]">
                                      Saved
                                    </span>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            <div className="space-y-[6px]">
                              {(['Every 30 days', 'Every 45 days', 'Every 60 days', 'Every 90 days', 'Every 120 days'] as const).map((freq) => (
                                <label
                                  key={freq}
                                  className={`flex items-center gap-[8px] p-[8px] rounded-[6px] border transition-all cursor-pointer group ${
                                    sub.frequency === freq
                                      ? 'border-[#009296] bg-[#E0F7F8]/30'
                                      : 'border-[#D9E2E2] hover:border-[#009296] hover:bg-[#F5F9F9]'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`frequency-${sub.id}`}
                                    checked={sub.frequency === freq}
                                    onChange={() => handleFrequencyChange(sub.id, freq)}
                                    disabled={loadingActions[frequencyKey]}
                                    className="appearance-none size-[16px] rounded-full border-2 border-[#D9E2E2] checked:border-[#009296] checked:border-[5px] transition-all cursor-pointer disabled:opacity-50 shrink-0"
                                  />
                                  <span className={`font-['Inter',sans-serif] text-[16px] transition-colors flex-1 ${
                                    sub.frequency === freq ? 'text-[#009296] font-medium' : 'text-[#003b3c] group-hover:text-[#009296]'
                                  }`}>
                                    {freq}
                                  </span>
                                  {sub.frequency === freq && (
                                    <Check className="size-[14px] text-[#009296] shrink-0" />
                                  )}
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Quantity */}
                          <div>
                              <div className="flex items-center gap-[8px] mb-[12px]">
                                <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em]">
                                  Quantity
                                </p>
                                <AnimatePresence>
                                  {savedFields[quantityKey] && (
                                    <motion.div
                                      initial={{ scale: 0, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      exit={{ scale: 0, opacity: 0 }}
                                      className="inline-flex items-center gap-[4px] bg-[#E8F5E9] px-[6px] py-[1px] rounded-[4px]"
                                    >
                                      <Check className="size-[10px] text-[#2E7D32]" />
                                      <span className="font-['Inter',sans-serif] text-[10px] font-medium text-[#2E7D32]">
                                        Saved
                                      </span>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                              <div className="flex items-center gap-[12px]">
                                <IconRemove 
                                  onClick={() => handleQuantityChange(sub.id, -1)} 
                                  disabled={sub.quantity <= 1 || loadingActions[quantityKey]}
                                />
                                <p className="font-['Inter',sans-serif] font-medium text-[16px] text-[#003b3c] min-w-[20px] text-center">
                                  {loadingActions[quantityKey] ? (
                                    <Loader2 className="size-[16px] animate-spin inline-block" />
                                  ) : (
                                    sub.quantity
                                  )}
                                </p>
                                <IconAdd onClick={() => handleQuantityChange(sub.id, 1)} />
                                <span className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] ml-[8px]">
                                  ${(sub.price * sub.quantity).toFixed(2)} per delivery
                                </span>
                              </div>
                          </div>

                          {/* Next Delivery */}
                          <div>
                            <div className="flex items-center gap-[8px] mb-[12px]">
                              <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em]">
                                Next Delivery
                              </p>
                              <AnimatePresence>
                                {savedFields[`${sub.id}-date`] && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="inline-flex items-center gap-[4px] bg-[#E8F5E9] px-[6px] py-[1px] rounded-[4px]"
                                  >
                                    <Check className="size-[10px] text-[#2E7D32]" />
                                    <span className="font-['Inter',sans-serif] text-[10px] font-medium text-[#2E7D32]">
                                      Saved
                                    </span>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            <div className="flex items-center gap-[8px] mb-[8px]">
                              <Calendar className="size-[16px] text-[#009296]" />
                              <p className="font-['Inter',sans-serif] text-[#003b3c]">
                                {sub.nextDelivery}
                              </p>
                            </div>
                            <button
                              onClick={() => setDatePickerOpen(prev => ({ ...prev, [sub.id]: !prev[sub.id] }))}
                              className="font-['Inter',sans-serif] text-[14px] text-[#009296] hover:underline"
                            >
                              {datePickerOpen[sub.id] ? 'Cancel' : 'Change Date'}
                            </button>
                            
                            {/* Inline Date Picker */}
                            <AnimatePresence>
                              {datePickerOpen[sub.id] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-[12px] bg-white border border-[#D9E2E2] rounded-[8px] p-[16px]">
                                    <p className="font-['Inter',sans-serif] text-[13px] font-medium text-[#003b3c] mb-[12px]">
                                      Select a new delivery date:
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px]">
                                      {getAvailableDates(sub.nextDelivery, sub.frequency).map(date => (
                                        <button
                                          key={date.label}
                                          onClick={() => handleDateChange(sub.id, date.fullLabel)}
                                          disabled={loadingActions[`${sub.id}-date`]}
                                          className="px-[12px] py-[8px] rounded-[6px] border border-[#D9E2E2] hover:border-[#009296] hover:bg-[#E0F7F8] transition-all text-left disabled:opacity-50"
                                        >
                                          <span className="font-['Inter',sans-serif] text-[13px] text-[#003b3c]">
                                            {date.label}
                                          </span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-[1px] bg-[#D9E2E2] my-[32px]" />

                        {/* Row 2: Payment | Shipping (2 columns) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[32px]">
                          {/* Payment Method */}
                          <div>
                            <div className="flex items-center gap-[8px] mb-[12px]">
                              <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em]">
                                Payment Method
                              </p>
                              <AnimatePresence>
                                {savedFields[`${sub.id}-payment`] && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="inline-flex items-center gap-[4px] bg-[#E8F5E9] px-[6px] py-[1px] rounded-[4px]"
                                  >
                                    <Check className="size-[10px] text-[#2E7D32]" />
                                    <span className="font-['Inter',sans-serif] text-[10px] font-medium text-[#2E7D32]">
                                      Saved
                                    </span>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            
                            {(() => {
                              const currentPaymentId = selectedPaymentId[sub.id] || '1';
                              
                              return (
                                <div className="space-y-[12px]">
                                  {availablePaymentMethods.map(payment => {
                                    const isSelected = currentPaymentId === payment.id;
                                    return (
                                      <div
                                        key={payment.id}
                                        onClick={() => handlePaymentChange(sub.id, payment.id)}
                                        className={`relative border-2 rounded-[8px] p-[16px] cursor-pointer transition-all ${
                                          isSelected
                                            ? 'border-[#009296] bg-[#F5F9F9]'
                                            : 'border-[#D9E2E2]'
                                        }`}
                                      >
                                        <div className="flex items-start gap-[12px]">
                                          <input
                                            type="radio"
                                            checked={isSelected}
                                            onChange={() => handlePaymentChange(sub.id, payment.id)}
                                            disabled={loadingActions[`${sub.id}-payment`]}
                                            className="custom-checkout-radio"
                                          />
                                          <div className="flex-1">
                                            <div className="flex items-center gap-[12px] mb-[8px]">
                                              <CreditCard className="size-[16px] text-[#009296]" />
                                              <span className="font-['Inter',sans-serif] font-medium text-[16px] text-[#003b3c]">
                                                <span className="tracking-[2px]">••••</span> {payment.last4}
                                              </span>
                                            </div>
                                            <p className="font-['Inter',sans-serif] text-[16px] text-[#406c6d]">
                                              Expires {payment.expiryMonth}/{payment.expiryYear}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                  
                                  <button
                                    onClick={() => setShowPaymentModal(true)}
                                    className="w-full border-2 border-dashed border-[#D9E2E2] rounded-[8px] p-[16px] font-['Inter',sans-serif] text-[14px] text-[#009296] hover:border-[#009296] hover:bg-[#F5F9F9] transition-all"
                                  >
                                    + Use a different card
                                  </button>
                                </div>
                              );
                            })()}
                          </div>

                          {/* Shipping Address */}
                          <div>
                            <div className="flex items-center gap-[8px] mb-[12px]">
                              <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em]">
                                Shipping Address
                              </p>
                              <AnimatePresence>
                                {savedFields[`${sub.id}-address`] && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="inline-flex items-center gap-[4px] bg-[#E8F5E9] px-[6px] py-[1px] rounded-[4px]"
                                  >
                                    <Check className="size-[10px] text-[#2E7D32]" />
                                    <span className="font-['Inter',sans-serif] text-[10px] font-medium text-[#2E7D32]">
                                      Saved
                                    </span>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            
                            {(() => {
                              const currentAddressId = selectedAddressId[sub.id] || '1';
                              
                              return (
                                <div className="space-y-[12px]">
                                  {availableAddresses.map(address => {
                                    const isSelected = currentAddressId === address.id;
                                    return (
                                      <div
                                        key={address.id}
                                        onClick={() => handleAddressChange(sub.id, address.id)}
                                        className={`relative border-2 rounded-[8px] p-[16px] cursor-pointer transition-all ${
                                          isSelected
                                            ? 'border-[#009296] bg-[#F5F9F9]'
                                            : 'border-[#D9E2E2]'
                                        }`}
                                      >
                                        <div className="flex items-start gap-[12px]">
                                          <input
                                            type="radio"
                                            checked={isSelected}
                                            onChange={() => handleAddressChange(sub.id, address.id)}
                                            disabled={loadingActions[`${sub.id}-address`]}
                                            className="custom-checkout-radio"
                                          />
                                          <div className="flex-1">
                                            <div className="flex items-center gap-[8px] mb-[8px]">
                                              <span className="font-['Inter',sans-serif] font-medium text-[16px] text-[#003b3c]">
                                                {address.firstName} {address.lastName}
                                              </span>
                                            </div>
                                            <p className="font-['Inter',sans-serif] text-[16px] text-[#406c6d] leading-[1.5]">
                                              {address.address}{address.apartment && `, ${address.apartment}`}<br />
                                              {address.city}, {address.state} {address.zipCode}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                  
                                  <button
                                    onClick={() => setShowAddressModal(true)}
                                    className="w-full border-2 border-dashed border-[#D9E2E2] rounded-[8px] p-[16px] font-['Inter',sans-serif] text-[14px] text-[#009296] hover:border-[#009296] hover:bg-[#F5F9F9] transition-all"
                                  >
                                    + Deliver to a different address
                                  </button>
                                </div>
                              );
                            })()}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-[1px] bg-[#D9E2E2] my-[32px]" />

                        {/* Row 3: Upcoming Deliveries (full width) */}
                        <div>
                            <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[12px]">
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
                                          <p className={`font-['Inter',sans-serif] text-[16px] ${
                                            isNext ? 'text-[#003b3c] font-medium' : 'text-[#003b3c]'
                                          }`}>
                                            {delivery.date}
                                          </p>
                                          <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                                            {relativeDays}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-[8px] shrink-0">
                                        <p className="font-['Inter',sans-serif] text-[16px] font-medium text-[#003b3c]">
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
                              onClick={() => setShowAllDeliveries(prev => ({ ...prev, [sub.id]: !prev[sub.id] }))}
                              className="font-['Inter',sans-serif] text-[14px] text-[#009296] hover:underline mt-[12px] inline-flex items-center gap-[4px]"
                            >
                              {showAllDeliveries[sub.id] ? (
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

                        {/* Cancel Section */}
                        <div className="mt-[32px]">
                          <button
                            onClick={() => handleCancelClick(sub)}
                            className="font-['Inter',sans-serif] text-[14px] text-[#C62828] hover:underline"
                          >
                            Cancel This Autoship
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-[8px] p-[60px] md:p-[80px]">
          <div className="max-w-[500px] mx-auto text-center">
            <div className="inline-flex items-center justify-center size-[80px] rounded-full bg-[#E0F7F8] mb-[24px]">
              <RefreshCw className="size-[36px] text-[#009296]" />
            </div>
            <h2 className="font-['Inter',sans-serif] text-[#003b3c] mb-[16px]">
              No Autoship
            </h2>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[32px] leading-[1.6]">
              Subscribe to your favorite products and save 10% on every delivery.
            </p>
            <button className="inline-flex items-center justify-center px-[16px] py-[8px] rounded-[999px] border border-[#009296] hover:bg-[#009296] transition-colors group cursor-pointer focus:outline-none">
              <span className="font-['Inter',sans-serif] text-[14px] font-medium text-[#009296] group-hover:text-white transition-colors">
                Learn More
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Skip Next Modal */}
      {modalType === 'skip' && selectedSubscription && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-[20px] animate-fadeIn">
          <div className="bg-white rounded-[12px] max-w-[480px] w-full p-[40px] shadow-2xl animate-slideUp">
            {/* Icon */}
            <div className="inline-flex items-center justify-center size-[56px] rounded-full bg-[#E0F7F8] mb-[20px]">
              <SkipForward className="size-[28px] text-[#009296]" />
            </div>

            {/* Header */}
            <h2 className="font-['Inter',sans-serif] font-medium text-[24px] text-[#003b3c] mb-[12px]">
              Skip Your Next Delivery?
            </h2>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] leading-[1.6] mb-[24px]">
              Your autoship will continue—we'll just skip this one shipment.
            </p>

            {/* Current & New Delivery Dates */}
            <div className="bg-[#F5F9F9] border border-[#D9E2E2] rounded-[8px] p-[16px] mb-[24px]">
              <div className="flex items-start gap-[12px] mb-[12px]">
                <Calendar className="size-[18px] text-[#009296] mt-[2px] shrink-0" />
                <div className="flex-1">
                  <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] uppercase tracking-[0.05em] mb-[4px]">
                    Currently Scheduled
                  </p>
                  <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[#003b3c]">
                    {selectedSubscription.nextDelivery}
                  </p>
                </div>
              </div>
              <div className="h-[1px] bg-[#D9E2E2] mb-[12px]" />
              <div className="flex items-start gap-[12px]">
                <Calendar className="size-[18px] text-[#009296] mt-[2px] shrink-0" />
                <div className="flex-1">
                  <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] uppercase tracking-[0.05em] mb-[4px]">
                    New Next Delivery
                  </p>
                  <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[#003b3c]">
                    {calculateNextDelivery(selectedSubscription.nextDelivery, selectedSubscription.frequency)}
                  </p>
                </div>
              </div>
            </div>

            <p className="font-['Inter',sans-serif] text-[13px] text-[#406c6d] leading-[1.6] mb-[24px]">
              You won't be charged for this delivery. Your autoship will continue as normal after.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-[12px]">
              <button
                onClick={closeModal}
                className="flex-1 px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                  Cancel
                </span>
              </button>
              <button
                onClick={confirmSkip}
                className="flex-1 px-[24px] py-[12px] bg-[#009296] rounded-[8px] hover:bg-[#007d81] transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                  Skip Delivery
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pause Modal */}
      {modalType === 'pause' && selectedSubscription && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-[20px] animate-fadeIn">
          <div className="bg-white rounded-[12px] max-w-[480px] w-full p-[40px] shadow-2xl animate-slideUp">
            {/* Icon */}
            <div className="inline-flex items-center justify-center size-[56px] rounded-full bg-[#FFF3E0] mb-[20px]">
              <Pause className="size-[28px] text-[#E65100]" />
            </div>

            {/* Header */}
            <h2 className="font-['Inter',sans-serif] font-medium text-[24px] text-[#003b3c] mb-[12px]">
              Pause Autoship?
            </h2>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] leading-[1.6] mb-[24px]">
              No deliveries or charges while paused. Resume anytime.
            </p>

            {/* Impact Info */}
            <div className="bg-[#FFF9F5] border border-[#FFE4CC] rounded-[8px] p-[16px] mb-[24px]">
              <div className="flex items-start gap-[12px]">
                <AlertCircle className="size-[18px] text-[#E65100] mt-[2px] shrink-0" />
                <div className="flex-1">
                  <p className="font-['Inter',sans-serif] text-[13px] text-[#003b3c] leading-[1.6] mb-[8px]">
                    <span className="font-medium">Your {selectedSubscription.nextDelivery} delivery will be cancelled.</span>
                  </p>
                  <p className="font-['Inter',sans-serif] text-[13px] text-[#406c6d] leading-[1.6]">
                    Deliveries and billing will pause until you resume.
                  </p>
                </div>
              </div>
            </div>

            {/* Alternative action */}
            <div className="mb-[24px] text-center">
              <button
                onClick={() => {
                  closeModal();
                  handleSkipClick(selectedSubscription);
                }}
                className="font-['Inter',sans-serif] text-[13px] text-[#009296] underline hover:no-underline"
              >
                Just skip next delivery instead?
              </button>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-[12px]">
              <button
                onClick={closeModal}
                className="flex-1 px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                  Cancel
                </span>
              </button>
              <button
                onClick={confirmPause}
                className="flex-1 px-[24px] py-[12px] bg-[#009296] rounded-[8px] hover:bg-[#007d81] transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                  Pause Autoship
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Modal */}
      {modalType === 'resume' && selectedSubscription && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-[20px] animate-fadeIn">
          <div className="bg-white rounded-[12px] max-w-[480px] w-full p-[40px] shadow-2xl animate-slideUp">
            {/* Icon */}
            <div className="inline-flex items-center justify-center size-[56px] rounded-full bg-[#E8F5E9] mb-[20px]">
              <Play className="size-[28px] text-[#2E7D32]" />
            </div>

            {/* Header */}
            <h2 className="font-['Inter',sans-serif] font-medium text-[24px] text-[#003b3c] mb-[12px]">
              Resume Autoship?
            </h2>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] leading-[1.6] mb-[24px]">
              Your autoship will become active again.
            </p>

            {/* Next Delivery Info */}
            <div className="bg-[#F5F9F9] border border-[#D9E2E2] rounded-[8px] p-[16px] mb-[24px]">
              <div className="flex items-start gap-[12px]">
                <Calendar className="size-[18px] text-[#009296] mt-[2px] shrink-0" />
                <div className="flex-1">
                  <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] uppercase tracking-[0.05em] mb-[4px]">
                    Next Delivery
                  </p>
                  <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[#003b3c]">
                    {calculateNextDelivery(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), selectedSubscription.frequency)}
                  </p>
                </div>
              </div>
            </div>

            <p className="font-['Inter',sans-serif] text-[13px] text-[#406c6d] leading-[1.6] mb-[24px]">
              Billing will resume with your next shipment.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-[12px]">
              <button
                onClick={closeModal}
                className="flex-1 px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                  Cancel
                </span>
              </button>
              <button
                onClick={confirmResume}
                className="flex-1 px-[24px] py-[12px] bg-[#009296] rounded-[8px] hover:bg-[#007d81] transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                  Resume Autoship
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {modalType === 'cancel' && selectedSubscription && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-[20px] animate-fadeIn">
          <div className="bg-white rounded-[12px] max-w-[480px] w-full p-[40px] shadow-2xl animate-slideUp">
            {/* Icon */}
            <div className="inline-flex items-center justify-center size-[56px] rounded-full bg-[#FFEBEE] mb-[20px]">
              <AlertCircle className="size-[28px] text-[#C62828]" />
            </div>

            {/* Header */}
            <h2 className="font-['Inter',sans-serif] font-medium text-[24px] text-[#003b3c] mb-[12px]">
              Cancel Autoship?
            </h2>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] leading-[1.6] mb-[24px]">
              You'll lose your 10% autoship discount on {selectedSubscription.productName}.
            </p>

            {/* Benefits Reminder */}
            <div className="bg-[#F5F9F9] border border-[#D9E2E2] rounded-[8px] p-[16px] mb-[24px]">
              <p className="font-['Inter',sans-serif] text-[13px] font-medium text-[#003b3c] mb-[8px]">
                You're currently saving:
              </p>
              <ul className="space-y-[6px]">
                <li className="font-['Inter',sans-serif] text-[13px] text-[#406c6d] flex items-center gap-[8px]">
                  <span className="size-[4px] rounded-full bg-[#009296]"></span>
                  10% on every delivery
                </li>
                <li className="font-['Inter',sans-serif] text-[13px] text-[#406c6d] flex items-center gap-[8px]">
                  <span className="size-[4px] rounded-full bg-[#009296]"></span>
                  Never run out of your essentials
                </li>
                <li className="font-['Inter',sans-serif] text-[13px] text-[#406c6d] flex items-center gap-[8px]">
                  <span className="size-[4px] rounded-full bg-[#009296]"></span>
                  Free shipping on all orders
                </li>
              </ul>
            </div>

            {/* Alternative action */}
            <div className="mb-[24px] text-center">
              <button
                onClick={() => {
                  closeModal();
                  handlePauseClick(selectedSubscription);
                }}
                className="font-['Inter',sans-serif] text-[13px] text-[#009296] underline hover:no-underline"
              >
                Pause instead? You can resume anytime.
              </button>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-[12px]">
              <button
                onClick={closeModal}
                className="flex-1 px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                  Keep Autoship
                </span>
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 px-[24px] py-[12px] bg-[#C62828] rounded-[8px] hover:bg-[#B71C1C] transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                  Cancel Autoship
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Undo Banner - Fixed Bottom Center with Action-Specific Styling */}
      <AnimatePresence>
        {undoAction && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-[20px] sm:bottom-[30px] left-[50%] -translate-x-1/2 z-50 w-[calc(100%-40px)] sm:w-auto sm:min-w-[400px] max-w-[90%] sm:max-w-[600px]"
          >
            {/* Skip Action - Teal/Blue */}
            {undoAction.type === 'skip' && (
              <div className="bg-white border-2 border-[#009296] rounded-[12px] p-[16px] sm:p-[20px] flex flex-col sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] shadow-2xl">
                <div className="flex items-start gap-[12px] sm:gap-[16px] flex-1 min-w-0">
                  <div className="inline-flex items-center justify-center size-[40px] sm:size-[44px] rounded-full bg-[#E0F7F8] shrink-0">
                    <SkipForward className="size-[20px] sm:size-[22px] text-[#009296]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Inter',sans-serif] font-medium text-[14px] sm:text-[15px] text-[#003b3c]">
                      Delivery Skipped
                    </p>
                    {undoAction.productName && (
                      <p className="font-['Inter',sans-serif] text-[12px] sm:text-[13px] text-[#406c6d] line-clamp-2 leading-[1.4]">
                        {undoAction.productName}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleUndo}
                  className="px-[20px] sm:px-[24px] py-[10px] sm:py-[12px] bg-[#009296] hover:bg-[#007d81] rounded-[8px] transition-colors shrink-0 w-full sm:w-auto"
                >
                  <span className="font-['Inter',sans-serif] text-[13px] sm:text-[14px] font-medium text-white uppercase tracking-[0.05em]">
                    Undo
                  </span>
                </button>
              </div>
            )}

            {/* Pause Action - Orange/Warning */}
            {undoAction.type === 'pause' && (
              <div className="bg-white border-2 border-[#E65100] rounded-[12px] p-[16px] sm:p-[20px] flex flex-col sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] shadow-2xl">
                <div className="flex items-start gap-[12px] sm:gap-[16px] flex-1 min-w-0">
                  <div className="inline-flex items-center justify-center size-[40px] sm:size-[44px] rounded-full bg-[#FFF3E0] shrink-0">
                    <Pause className="size-[20px] sm:size-[22px] text-[#E65100]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Inter',sans-serif] font-medium text-[14px] sm:text-[15px] text-[#003b3c]">
                      Autoship Paused
                    </p>
                    {undoAction.productName && (
                      <p className="font-['Inter',sans-serif] text-[12px] sm:text-[13px] text-[#406c6d] line-clamp-2 leading-[1.4]">
                        {undoAction.productName}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleUndo}
                  className="px-[20px] sm:px-[24px] py-[10px] sm:py-[12px] bg-[#E65100] hover:bg-[#D84315] rounded-[8px] transition-colors shrink-0 w-full sm:w-auto"
                >
                  <span className="font-['Inter',sans-serif] text-[13px] sm:text-[14px] font-medium text-white uppercase tracking-[0.05em]">
                    Undo
                  </span>
                </button>
              </div>
            )}

            {/* Resume Action - Green/Success */}
            {undoAction.type === 'resume' && (
              <div className="bg-white border-2 border-[#2E7D32] rounded-[12px] p-[16px] sm:p-[20px] flex flex-col sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] shadow-2xl">
                <div className="flex items-start gap-[12px] sm:gap-[16px] flex-1 min-w-0">
                  <div className="inline-flex items-center justify-center size-[40px] sm:size-[44px] rounded-full bg-[#E8F5E9] shrink-0">
                    <Play className="size-[20px] sm:size-[22px] text-[#2E7D32]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Inter',sans-serif] font-medium text-[14px] sm:text-[15px] text-[#003b3c]">
                      Autoship Resumed
                    </p>
                    {undoAction.productName && (
                      <p className="font-['Inter',sans-serif] text-[12px] sm:text-[13px] text-[#406c6d] line-clamp-2 leading-[1.4]">
                        {undoAction.productName}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleUndo}
                  className="px-[20px] sm:px-[24px] py-[10px] sm:py-[12px] bg-[#2E7D32] hover:bg-[#1B5E20] rounded-[8px] transition-colors shrink-0 w-full sm:w-auto"
                >
                  <span className="font-['Inter',sans-serif] text-[13px] sm:text-[14px] font-medium text-white uppercase tracking-[0.05em]">
                    Undo
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Address Form Modal */}
      <AddressFormModal
        isOpen={showAddressModal}
        mode="add"
        onClose={() => setShowAddressModal(false)}
        onSave={(newAddress) => {
          toast.success('Address added successfully!');
          setShowAddressModal(false);
        }}
      />

      {/* Payment Method Form Modal */}
      <PaymentMethodFormModal
        isOpen={showPaymentModal}
        mode="add"
        onClose={() => setShowPaymentModal(false)}
        onSave={(newPayment) => {
          toast.success('Payment method added successfully!');
          setShowPaymentModal(false);
        }}
      />
    </div>
  );
}