import { useState, useEffect, useRef } from 'react';
import { RefreshCw, SkipForward, Pause, Play, X, Calendar, AlertCircle, ChevronDown, ChevronUp, CreditCard, MapPin, Trash2, Check, Loader2, Clock, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import imgProduct from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";
import { useBreakpoint } from '../../hooks/useBreakpoint';
import AddressFormModal from '../shared/AddressFormModal';
import PaymentMethodFormModal from '../shared/PaymentMethodFormModal';
import { SubscriptionManagePanel } from './SubscriptionManagePanel';
import { UnsavedChangesModal } from './UnsavedChangesModal';

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
  onUnsavedChangesStatusChange?: (hasUnsavedChanges: boolean, productName?: string) => void;
  scrollToEditPanel?: boolean;
}

interface Subscription {
  id: string;
  productName: string;
  productCount: string;
  productImage: string;
  frequency: 'Every 30 days' | 'Every 45 days' | 'Every 60 days' | 'Every 90 days' | 'Every 120 days';
  nextDelivery: string;
  price: number;
  status: 'Active' | 'Paused' | 'Cancelled';
  quantity: number;
}

type ModalType = 'skip' | 'pause' | 'resume' | 'cancel' | null;
type AutoshipStatus = 'All' | 'Active' | 'Paused' | 'Cancelled';
type DateRange = 'all' | '30' | '60' | '90';

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

export default function SubscriptionsSection({ isNewCustomer = false, onUnsavedChangesStatusChange, scrollToEditPanel }: SubscriptionsSectionProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: '1',
      productName: 'Ultimate Anti-Oxidant',
      productCount: '120 Capsules',
      productImage: imgProduct,
      frequency: 'Every 60 days',
      nextDelivery: 'March 15, 2026',
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
      nextDelivery: 'April 10, 2026',
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
      nextDelivery: 'February 20, 2026',
      price: 42.50,
      status: 'Paused',
      quantity: 1,
    },
  ]);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [undoAction, setUndoAction] = useState<UndoAction | null>(null);
  
  // Ref for scrolling to the edit panel
  const editPanelRef = useRef<HTMLDivElement>(null);
  const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>({});
  const [savedFields, setSavedFields] = useState<Record<string, boolean>>({});
  const [showAllDeliveries, setShowAllDeliveries] = useState<Record<string, boolean>>({});
  const [datePickerOpen, setDatePickerOpen] = useState<Record<string, boolean>>({});
  const [selectedPaymentId, setSelectedPaymentId] = useState<Record<string, string>>({});
  const [selectedAddressId, setSelectedAddressId] = useState<Record<string, string>>({});
  const [customFrequencyValues, setCustomFrequencyValues] = useState<Record<string, string>>({});
  const [frequencyMode, setFrequencyMode] = useState<Record<string, number | 'other'>>({});
  
  // Edit mode tracking - for explicit save pattern
  const [editingSubscriptionId, setEditingSubscriptionId] = useState<string | null>(null);
  const [pendingChanges, setPendingChanges] = useState<Record<string, Partial<Subscription & { paymentId?: string; addressId?: string }>>>({});
  const [originalValues, setOriginalValues] = useState<Record<string, Subscription & { paymentId?: string; addressId?: string }>>({});
  const [isSaving, setIsSaving] = useState(false);
  
  // Filter states
  const [activeStatus, setActiveStatus] = useState<AutoshipStatus>('All');
  const [activeDateRange, setActiveDateRange] = useState<DateRange>('all');
  
  // Modal states
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Unsaved changes warning
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  
  // Frequency error state for validation
  const [frequencyErrors, setFrequencyErrors] = useState<Record<string, string>>({});
  
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
  const getUpcomingDeliveries = (sub: Subscription & Partial<{ paymentId?: string; addressId?: string }>, count: number = 5) => {
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

  // Generate available delivery dates - flexible weekly options for vacation scheduling
  const getAvailableDates = (baseDate: string, frequency: string, count: number = 12) => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Start from today or the base date, whichever is later
    let current = new Date(baseDate);
    current.setHours(0, 0, 0, 0);
    
    // If base date is in the past, start from today
    if (current < today) {
      current = new Date(today);
    }
    
    // Generate weekly intervals for flexibility (vacation scheduling)
    // This allows customers to pick any week that works for them
    for (let i = 0; i < count; i++) {
      dates.push({
        date: new Date(current),
        label: current.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        fullLabel: current.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      });
      // Add 7 days for next option
      current = new Date(current.getTime() + (7 * 24 * 60 * 60 * 1000));
    }
    return dates;
  };

  // Track date change (no auto-save)
  const handleDateChange = (subId: string, newDate: string) => {
    // Track as pending change
    setPendingChanges(prev => ({
      ...prev,
      [subId]: { ...prev[subId], nextDelivery: newDate }
    }));
    
    setDatePickerOpen(prev => ({ ...prev, [subId]: false }));
  };

  // Track payment method change (no auto-save)
  const handlePaymentChange = (subId: string, paymentId: string) => {
    // Track as pending change
    setPendingChanges(prev => ({
      ...prev,
      [subId]: { ...prev[subId], paymentId }
    }));
  };

  // Track address change (no auto-save)
  const handleAddressChange = (subId: string, addressId: string) => {
    // Track as pending change
    setPendingChanges(prev => ({
      ...prev,
      [subId]: { ...prev[subId], addressId }
    }));
  };

  // Clear undo timeout on unmount
  useEffect(() => {
    return () => {
      if (undoAction?.timeout) {
        clearTimeout(undoAction.timeout);
      }
    };
  }, [undoAction]);

  // Browser warning when user tries to close/navigate away with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Check if any subscription has pending changes
      const hasAnyPendingChanges = Object.values(pendingChanges).some(
        changes => Object.keys(changes).length > 0
      );
      
      if (hasAnyPendingChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [pendingChanges]);

  // Notify parent component when unsaved changes status changes
  useEffect(() => {
    const hasAnyPendingChanges = Object.values(pendingChanges).some(
      changes => Object.keys(changes).length > 0
    );
    
    // Get product name of the subscription being edited
    const productName = editingSubscriptionId 
      ? subscriptions.find(s => s.id === editingSubscriptionId)?.productName
      : undefined;
    
    if (onUnsavedChangesStatusChange) {
      onUnsavedChangesStatusChange(hasAnyPendingChanges, productName);
    }
  }, [pendingChanges, editingSubscriptionId, subscriptions, onUnsavedChangesStatusChange]);

  // Scroll to edit panel when user clicks "Keep Editing"
  useEffect(() => {
    if (scrollToEditPanel && editPanelRef.current && expandedId) {
      editPanelRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [scrollToEditPanel, expandedId]);

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

  // Handle Manage (enter edit mode with explicit save)
  const handleManage = (sub: Subscription) => {
    if (expandedId === sub.id) {
      // Collapse - but check if there are unsaved changes
      if (editingSubscriptionId === sub.id && Object.keys(pendingChanges[sub.id] || {}).length > 0) {
        // Show warning modal
        setPendingAction(() => () => {
          handleCancelChanges(sub.id);
        });
        setShowUnsavedWarning(true);
        return;
      }
      setExpandedId(null);
      setEditingSubscriptionId(null);
    } else {
      // Expand and enter edit mode
      setExpandedId(sub.id);
      setEditingSubscriptionId(sub.id);
      
      // Store original values for cancel/revert
      setOriginalValues(prev => ({
        ...prev,
        [sub.id]: {
          ...sub,
          paymentId: selectedPaymentId[sub.id] || '1',
          addressId: selectedAddressId[sub.id] || '1',
        }
      }));
      
      // Initialize pending changes as empty
      setPendingChanges(prev => ({ ...prev, [sub.id]: {} }));
    }
  };

  // Track frequency change (no auto-save)
  const handleFrequencyModeChange = (subId: string, mode: number | 'other') => {
    setFrequencyMode(prev => ({ ...prev, [subId]: mode }));
    
    if (mode !== 'other') {
      // Track as pending change
      setPendingChanges(prev => ({
        ...prev,
        [subId]: { ...prev[subId], frequency: `Every ${mode} days` }
      }));
    }
  };

  // Handle custom frequency value change with validation
  const handleCustomFrequencyValueChange = (subId: string, value: string) => {
    setCustomFrequencyValues(prev => ({ ...prev, [subId]: value }));
    
    // Real-time validation feedback (like PDP)
    const val = parseInt(value);
    if (value && (!isNaN(val) && (val < 15 || val > 500))) {
      setFrequencyErrors(prev => ({ ...prev, [subId]: 'Please enter between 15-500 days' }));
    } else {
      setFrequencyErrors(prev => {
        const updated = { ...prev };
        delete updated[subId];
        return updated;
      });
    }
  };
  
  // Handle custom frequency blur - auto-clamp values (like PDP)
  const handleCustomFrequencyBlur = (subId: string) => {
    const val = parseInt(customFrequencyValues[subId]);
    if (!isNaN(val)) {
      if (val < 15) {
        setCustomFrequencyValues(prev => ({ ...prev, [subId]: '15' }));
        setFrequencyErrors(prev => {
          const updated = { ...prev };
          delete updated[subId];
          return updated;
        });
      } else if (val > 500) {
        setCustomFrequencyValues(prev => ({ ...prev, [subId]: '500' }));
        setFrequencyErrors(prev => {
          const updated = { ...prev };
          delete updated[subId];
          return updated;
        });
      }
    }
  };

  // Track custom frequency (no auto-save)
  const handleCustomFrequencyApply = (subId: string) => {
    const customValue = customFrequencyValues[subId];
    if (!customValue) return;
    
    const days = parseInt(customValue);
    if (isNaN(days) || days < 15 || days > 500) {
      toast.error('Please enter between 15-500 days');
      return;
    }
    
    // Track as pending change
    setPendingChanges(prev => ({
      ...prev,
      [subId]: { ...prev[subId], frequency: `Every ${days} days` }
    }));
  };

  // Track quantity change (no auto-save)
  const handleQuantityChange = (subId: string, delta: number) => {
    const sub = subscriptions.find(s => s.id === subId);
    const pendingSub = { ...sub, ...pendingChanges[subId] };
    if (!pendingSub) return;

    const currentQuantity = pendingSub.quantity || sub?.quantity || 1;
    const newQuantity = Math.max(1, Math.min(10, currentQuantity + delta));
    if (newQuantity === currentQuantity) return;

    // Track as pending change
    setPendingChanges(prev => ({
      ...prev,
      [subId]: { ...prev[subId], quantity: newQuantity }
    }));
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

  // Handle Cancel Changes - revert all pending changes
  const handleCancelChanges = (subId: string) => {
    // Clear pending changes
    setPendingChanges(prev => {
      const updated = { ...prev };
      delete updated[subId];
      return updated;
    });
    
    // Clear frequency mode and custom values
    setFrequencyMode(prev => {
      const updated = { ...prev };
      delete updated[subId];
      return updated;
    });
    setCustomFrequencyValues(prev => {
      const updated = { ...prev };
      delete updated[subId];
      return updated;
    });
    
    // Collapse panel
    setExpandedId(null);
    setEditingSubscriptionId(null);
  };

  // Handle Save Changes - commit all pending changes
  const handleSaveChanges = async (subId: string) => {
    const changes = pendingChanges[subId];
    if (!changes || Object.keys(changes).length === 0) {
      // No changes to save
      setExpandedId(null);
      setEditingSubscriptionId(null);
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Apply all changes at once
    setSubscriptions(subs =>
      subs.map(s =>
        s.id === subId ? { ...s, ...changes } : s
      )
    );
    
    // Update payment/address if changed
    if (changes.paymentId) {
      setSelectedPaymentId(prev => ({ ...prev, [subId]: changes.paymentId! }));
    }
    if (changes.addressId) {
      setSelectedAddressId(prev => ({ ...prev, [subId]: changes.addressId! }));
    }
    
    setIsSaving(false);
    
    // Collapse panel
    setExpandedId(null);
    setEditingSubscriptionId(null);
    
    // Show success message
    toast.success('Your autoship has been updated');
  };

  // Check if there are any pending changes
  const hasPendingChanges = (subId: string): boolean => {
    const changes = pendingChanges[subId];
    return changes ? Object.keys(changes).length > 0 : false;
  };

  // Filter subscriptions based on active filters
  const filteredSubscriptions = subscriptions.filter(sub => {
    // Status filter
    if (activeStatus !== 'All' && sub.status !== activeStatus) {
      return false;
    }

    // Date range filter - based on next delivery
    if (activeDateRange !== 'all') {
      const deliveryDate = new Date(sub.nextDelivery);
      const today = new Date();
      const daysAgo = parseInt(activeDateRange);
      const cutoffDate = new Date(today.setDate(today.getDate() - daysAgo));
      
      if (deliveryDate < cutoffDate) {
        return false;
      }
    }

    return true;
  });

  // Use empty array if new customer
  const displaySubscriptions = isNewCustomer ? [] : filteredSubscriptions;

  // Status filter options
  const statusOptions: AutoshipStatus[] = ['All', 'Active', 'Paused', 'Cancelled'];

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

      {/* Filters */}
      {subscriptions.length > 0 && (
        <div className="mb-[24px] bg-white rounded-[8px] p-[16px] md:px-[40px] md:py-[20px]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[20px]">
            {/* Status Tabs */}
            <nav className="flex gap-[24px] md:gap-[40px] overflow-x-auto scrollbar-hide">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`relative py-[16px] whitespace-nowrap transition-colors cursor-pointer focus:outline-none font-['Inter',sans-serif] text-[16px] ${
                    activeStatus === status
                      ? 'text-[#003b3c]'
                      : 'text-[#406c6d] hover:text-[#003b3c]'
                  }`}
                >
                  {status}
                  {activeStatus === status && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#009296]" />
                  )}
                </button>
              ))}
            </nav>

            {/* Date Range - Just Text with Arrow */}
            <div className="lg:ml-auto">
              <button className="flex items-center gap-[8px] font-['Inter',sans-serif] text-[16px] text-[#003b3c] hover:text-[#009296] transition-colors cursor-pointer focus:outline-none">
                All Time
                <ChevronDown className="size-[16px]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {displaySubscriptions.length > 0 ? (
        <div className="space-y-[20px]">
          {displaySubscriptions.map((sub) => {
            const isExpanded = expandedId === sub.id;
            
            // Get current values including pending changes FIRST
            const currentValues = { ...sub, ...pendingChanges[sub.id] };
            const currentPaymentId = pendingChanges[sub.id]?.paymentId || selectedPaymentId[sub.id] || '1';
            const currentAddressId = pendingChanges[sub.id]?.addressId || selectedAddressId[sub.id] || '1';
            
            // Use currentValues for deliveries and calendar so changes update live
            const upcomingDeliveries = getUpcomingDeliveries(currentValues);
            const displayedDeliveries = showAllDeliveries[sub.id] ? upcomingDeliveries : upcomingDeliveries.slice(0, 2);
            const frequencyKey = `${sub.id}-frequency`;
            const quantityKey = `${sub.id}-quantity`;
            
            return (
              <div
                key={sub.id}
                ref={isExpanded && editingSubscriptionId === sub.id ? editPanelRef : null}
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
                        Qty: {currentValues.quantity}
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
                        ${(sub.price * currentValues.quantity).toFixed(2)}
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
                        {currentValues.frequency}
                      </p>
                    </div>
                    <div>
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[4px]">
                        Next Delivery
                      </p>
                      <p className="font-['Inter',sans-serif] text-[#003b3c]">
                        {currentValues.nextDelivery}
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
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SubscriptionManagePanel
                        sub={sub}
                        currentValues={currentValues}
                        currentPaymentId={currentPaymentId}
                        currentAddressId={currentAddressId}
                        availablePaymentMethods={availablePaymentMethods}
                        availableAddresses={availableAddresses}
                        displayedDeliveries={displayedDeliveries}
                        showAllDeliveries={showAllDeliveries[sub.id] || false}
                        datePickerOpen={datePickerOpen[sub.id] || false}
                        frequencyMode={frequencyMode[sub.id]}
                        customFrequencyValues={customFrequencyValues[sub.id] || ''}
                        frequencyError={frequencyErrors[sub.id] || ''}
                        isSaving={isSaving}
                        hasPendingChanges={hasPendingChanges(sub.id)}
                        onCancelChanges={() => handleCancelChanges(sub.id)}
                        onSaveChanges={() => handleSaveChanges(sub.id)}
                        onFrequencyModeChange={(mode) => handleFrequencyModeChange(sub.id, mode)}
                        onCustomFrequencyApply={() => handleCustomFrequencyApply(sub.id)}
                        onCustomFrequencyChange={(value) => handleCustomFrequencyValueChange(sub.id, value)}
                        onCustomFrequencyBlur={() => handleCustomFrequencyBlur(sub.id)}
                        onQuantityChange={(delta) => handleQuantityChange(sub.id, delta)}
                        onDatePickerToggle={() => setDatePickerOpen(prev => ({ ...prev, [sub.id]: !prev[sub.id] }))}
                        onDateChange={(date) => handleDateChange(sub.id, date)}
                        onPaymentChange={(paymentId) => handlePaymentChange(sub.id, paymentId)}
                        onAddressChange={(addressId) => handleAddressChange(sub.id, addressId)}
                        onShowAllDeliveriesToggle={() => setShowAllDeliveries(prev => ({ ...prev, [sub.id]: !prev[sub.id] }))}
                        onShowPaymentModal={() => setShowPaymentModal(true)}
                        onShowAddressModal={() => setShowAddressModal(true)}
                        onCancelAutoship={() => handleCancelClick(sub)}
                        getAvailableDates={getAvailableDates}
                        getRelativeDays={getRelativeDays}
                      />
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
                className="flex-1 px-[24px] py-[12px] bg-[#E65100] rounded-[8px] hover:bg-[#D84315] transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                  Pause Autoship
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

            {/* Cancel Action - Red */}
            {undoAction.type === 'cancel' && (
              <div className="bg-white border-2 border-[#C62828] rounded-[12px] p-[16px] sm:p-[20px] flex flex-col sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] shadow-2xl">
                <div className="flex items-start gap-[12px] sm:gap-[16px] flex-1 min-w-0">
                  <div className="inline-flex items-center justify-center size-[40px] sm:size-[44px] rounded-full bg-[#FFEBEE] shrink-0">
                    <AlertCircle className="size-[20px] sm:size-[22px] text-[#C62828]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Inter',sans-serif] font-medium text-[14px] sm:text-[15px] text-[#003b3c]">
                      Autoship Cancelled
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
                  className="shrink-0 px-[16px] sm:px-[20px] py-[10px] sm:py-[11px] bg-[#C62828] rounded-[8px] hover:bg-[#B71C1C] transition-colors cursor-pointer focus:outline-none flex items-center gap-[8px]"
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

      {/* Unsaved Changes Warning Modal */}
      <UnsavedChangesModal
        isOpen={showUnsavedWarning}
        onCancel={() => {
          setShowUnsavedWarning(false);
          setPendingAction(null);
        }}
        onDiscard={() => {
          setShowUnsavedWarning(false);
          if (pendingAction) {
            pendingAction();
          }
          setPendingAction(null);
        }}
        productName={editingSubscriptionId ? subscriptions.find(s => s.id === editingSubscriptionId)?.productName : undefined}
      />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .custom-checkout-radio {
          appearance: none;
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid #D9E2E2;
          border-radius: 50%;
          outline: none;
          cursor: pointer;
          position: relative;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .custom-checkout-radio:checked {
          border-color: #009296;
          background-color: white;
        }

        .custom-checkout-radio:checked::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #009296;
        }
      `}</style>
    </div>
  );
}