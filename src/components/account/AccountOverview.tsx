import { Package, RefreshCw, Heart, ChevronDown, ChevronUp, SkipForward, Pause, Play, X, Calendar, AlertCircle, DollarSign } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import imgImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useState, useEffect } from 'react';

interface AccountOverviewProps {
  userEmail: string;
  onNavigate: (tab: 'overview' | 'orders' | 'profile' | 'autoship' | 'flexpay' | 'favorites', orderId?: string) => void;
  isNewCustomer?: boolean;
}

type ModalType = 'skip' | 'pause' | 'resume' | null;

interface UndoAction {
  type: 'skip' | 'pause' | 'resume';
  previousNextDelivery?: string;
  previousStatus?: 'Active' | 'Paused';
  timeout: NodeJS.Timeout;
  productName?: string;
}

export default function AccountOverview({ userEmail, onNavigate, isNewCustomer = false }: AccountOverviewProps) {
  const { breakpoint } = useBreakpoint();
  const [isLatestOrderExpanded, setIsLatestOrderExpanded] = useState(false);
  
  // Autoship state management
  const [autoshipStatus, setAutoshipStatus] = useState<'Active' | 'Paused'>('Active');
  const [nextDelivery, setNextDelivery] = useState('December 19, 2025');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [undoAction, setUndoAction] = useState<UndoAction | null>(null);
  
  // Demo data for latest order - matches the top order from OrdersSection
  const latestOrder = {
    orderNumber: '5641702',
    date: 'December 9, 2025',
    status: 'Shipped',
    total: 149.75,
    products: [
      { name: 'Ultimate Anti-Oxidant', count: '180 capsules', quantity: 2, image: imgImage },
      { name: 'CoQ10 400mg', count: '120 capsules', quantity: 1, image: imgImage },
      { name: 'Omega-3 EPA/DHA', count: '60 softgels', quantity: 1, image: imgImage },
      { name: 'Fibermucil', count: '60 capsules', quantity: 1, image: imgImage },
      { name: 'Probiotic-10', count: '60 capsules', quantity: 1, image: imgImage },
    ],
  };

  // Demo data for next autoship
  const nextAutoship = {
    productName: 'Ultimate Anti-Oxidant',
    productCount: '180 capsules',
    productImage: imgImage,
    frequency: 'Every 30 days',
    price: 35.96,
  };

  // Get user's first name from email (demo logic)
  const isDemoUser = userEmail === 'demo@andrewlessman.com';
  const firstName = isDemoUser ? 'Andrew' : userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1);
  
  // New users have no orders or autoships
  const hasOrders = isDemoUser && !isNewCustomer;
  const hasAutoships = isDemoUser && !isNewCustomer;

  // Determine time of day for greeting
  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // For demo user who is an existing customer, show first name. For new customers, don't show first name
  const hasUserName = isDemoUser && !isNewCustomer;
  const greeting = hasUserName 
    ? `${getTimeOfDayGreeting()}, ${firstName}!`
    : `${getTimeOfDayGreeting()}!`;

  // Check if profile is incomplete (new customer needs to fill in details)
  const hasIncompleteProfile = isNewCustomer;

  // Calculate next delivery date based on frequency
  const calculateNextDelivery = (currentDate: string, frequency: string): string => {
    const current = new Date(currentDate);
    const days = frequency === 'Every 30 days' ? 30 : frequency === 'Every 60 days' ? 60 : 90;
    current.setDate(current.getDate() + days);
    return current.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Clear undo timeout on unmount
  useEffect(() => {
    return () => {
      if (undoAction?.timeout) {
        clearTimeout(undoAction.timeout);
      }
    };
  }, [undoAction]);

  const handleViewOrderDetails = () => {
    onNavigate('orders', latestOrder.orderNumber);
  };

  const handleTrackOrder = () => {
    toast.info(`Tracking order #${latestOrder.orderNumber}`);
  };

  // Handle Skip Next
  const handleSkipClick = () => {
    setActiveModal('skip');
  };

  const confirmSkip = () => {
    const newNextDelivery = calculateNextDelivery(nextDelivery, nextAutoship.frequency);
    const previousNextDelivery = nextDelivery;

    // Update delivery date
    setNextDelivery(newNextDelivery);

    // Close modal
    setActiveModal(null);

    // Show undo toast
    const timeout = setTimeout(() => {
      setUndoAction(null);
    }, 5000);

    setUndoAction({
      type: 'skip',
      previousNextDelivery,
      timeout,
      productName: nextAutoship.productName,
    });
  };

  // Handle Pause
  const handlePauseClick = () => {
    setActiveModal('pause');
  };

  const confirmPause = () => {
    // Update autoship status
    setAutoshipStatus('Paused');

    // Close modal
    setActiveModal(null);

    // Show undo toast
    const timeout = setTimeout(() => {
      setUndoAction(null);
    }, 5000);

    setUndoAction({
      type: 'pause',
      timeout,
      productName: nextAutoship.productName,
    });
  };

  // Handle Resume
  const handleResumeClick = () => {
    setActiveModal('resume');
  };

  const confirmResume = () => {
    // Calculate new next delivery (based on frequency from today)
    const newNextDelivery = calculateNextDelivery(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), nextAutoship.frequency);
    
    // Update autoship status and next delivery
    setAutoshipStatus('Active');
    setNextDelivery(newNextDelivery);

    // Close modal
    setActiveModal(null);

    // Show undo toast
    const timeout = setTimeout(() => {
      setUndoAction(null);
    }, 5000);

    setUndoAction({
      type: 'resume',
      timeout,
      productName: nextAutoship.productName,
      previousStatus: 'Paused',
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
      setNextDelivery(undoAction.previousNextDelivery);
    } else if (undoAction.type === 'pause') {
      // Restore to active
      setAutoshipStatus('Active');
    } else if (undoAction.type === 'resume' && undoAction.previousStatus) {
      // Restore to paused
      setAutoshipStatus(undoAction.previousStatus);
    }

    setUndoAction(null);
  };

  const handleManageAutoship = () => {
    onNavigate('autoship');
  };

  // Close modal
  const closeModal = () => {
    setActiveModal(null);
  };

  // Get responsive headline sizing based on breakpoint
  const headlineSize = breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[54px]' : breakpoint === 'L' ? 'text-[38px]' : breakpoint === 'M' ? 'text-[34px]' : 'text-[28px]';
  const headlineTracking = breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : breakpoint === 'L' ? 'tracking-[-0.76px]' : breakpoint === 'M' ? 'tracking-[-0.68px]' : 'tracking-[-0.56px]';

  return (
    <div className="space-y-[20px]">
      {/* Welcome Headline */}
      <div className="mb-[40px]">
        <h1 className={`font-['STIX_Two_Text',sans-serif] font-medium leading-[1.1] ${headlineSize} ${headlineTracking} text-[#003b3c]`}>
          {greeting}
        </h1>
        {hasIncompleteProfile && (
          <button
            onClick={() => onNavigate('profile')}
            className="inline-block mt-[12px] font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em] underline decoration-[#003b3c] decoration-1 underline-offset-[6px] hover:decoration-2 transition-all cursor-pointer"
          >
            Complete Your Profile
          </button>
        )}
      </div>

      {/* Latest Order & Next Autoship - 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] items-stretch">
        {/* Latest Order */}
        <div className="bg-white rounded-[8px] p-[30px] md:p-[40px] flex flex-col">
          <div className="flex items-center gap-[12px] mb-[24px] pb-[24px] border-b border-[#D9E2E2]">
            <Package className="size-[24px] text-[#009296]" />
            <h3 className="font-['Inter',sans-serif] font-medium text-[#003b3c] text-[20px]">
              Latest Order
            </h3>
          </div>

          {hasOrders ? (
            <>
              <div className="mb-[20px] flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[12px] mb-[20px]">
                  <div>
                    <p className="font-['Inter',sans-serif] font-medium text-[#003b3c] mb-[4px]">
                      Order #{latestOrder.orderNumber}
                    </p>
                    <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                      {latestOrder.date}
                    </p>
                  </div>
                  <div className="inline-flex bg-[#E0F7F8] rounded-[8px] px-[12px] py-[6px] self-start">
                    <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#009296] uppercase tracking-[0.5px]">
                      {latestOrder.status}
                    </span>
                  </div>
                </div>

                {/* Products */}
                <div className="space-y-[12px] mb-[20px]">
                  {(isLatestOrderExpanded ? latestOrder.products : latestOrder.products.slice(0, 2)).map((product, index) => (
                    <div key={index} className="flex items-center gap-[12px]">
                      <div className="size-[50px] rounded-[4px] overflow-hidden bg-white shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[#003b3c]">
                          {product.name}
                        </p>
                        <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d]">
                          {product.count}
                        </p>
                        <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d]">
                          Qty: {product.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                  {latestOrder.products.length > 2 && !isLatestOrderExpanded && (
                    <button
                      onClick={() => setIsLatestOrderExpanded(true)}
                      className="flex items-center gap-[8px] font-['Inter',sans-serif] text-[12px] text-[#009296] hover:text-[#007d81] transition-colors cursor-pointer pl-[62px]"
                    >
                      + {latestOrder.products.length - 2} more item{latestOrder.products.length - 2 > 1 ? 's' : ''}
                      <ChevronDown className="size-[14px]" />
                    </button>
                  )}
                  {isLatestOrderExpanded && (
                    <button
                      onClick={() => setIsLatestOrderExpanded(false)}
                      className="flex items-center gap-[8px] font-['Inter',sans-serif] text-[12px] text-[#009296] hover:text-[#007d81] transition-colors cursor-pointer pl-[62px]"
                    >
                      Show less
                      <ChevronUp className="size-[14px]" />
                    </button>
                  )}
                </div>

                {/* Total */}
                <div className="pt-[16px] border-t border-[#D9E2E2] mb-[20px]">
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[4px]">
                    Total
                  </p>
                  <p className="font-['Inter',sans-serif] font-medium text-[#003b3c]">
                    ${latestOrder.total.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-[12px]">
                <button
                  onClick={handleViewOrderDetails}
                  className="flex-1 px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
                >
                  <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                    View Details
                  </span>
                </button>
                <button
                  onClick={handleTrackOrder}
                  className="flex-1 px-[24px] py-[12px] bg-[#009296] rounded-[8px] hover:bg-[#007d81] transition-colors cursor-pointer focus:outline-none"
                >
                  <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                    Track Order
                  </span>
                </button>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="text-center flex-1 flex flex-col items-center justify-center py-[40px]">
              <p className="font-['Inter',sans-serif] text-[#003b3c] mb-[8px]">
                No orders yet
              </p>
              <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[20px] max-w-[320px]">
                Start shopping to see your order history here.
              </p>
              <button className="inline-flex items-center justify-center px-[16px] py-[8px] rounded-[999px] border border-[#009296] hover:bg-[#009296] transition-colors group cursor-pointer focus:outline-none">
                <span className="font-['Inter',sans-serif] text-[14px] font-medium text-[#009296] group-hover:text-white transition-colors">
                  Shop Now
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Next Autoship */}
        <div className="bg-white rounded-[8px] p-[30px] md:p-[40px] flex flex-col">
          <div className="flex items-center gap-[12px] mb-[24px] pb-[24px] border-b border-[#D9E2E2]">
            <RefreshCw className="size-[24px] text-[#009296]" />
            <h3 className="font-['Inter',sans-serif] font-medium text-[#003b3c] text-[20px]">
              Next Autoship
            </h3>
          </div>

          {hasAutoships ? (
            <>
              <div className="mb-[20px] flex-1">
                <div className="flex items-start gap-[16px] mb-[20px]">
                  {/* Product Image */}
                  <div className="size-[60px] rounded-[4px] overflow-hidden bg-white shrink-0">
                    <img src={nextAutoship.productImage} alt={nextAutoship.productName} className="w-full h-full object-contain" />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <p className="font-['Inter',sans-serif] font-medium text-[#003b3c] mb-[4px]">
                      {nextAutoship.productName}
                    </p>
                    <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                      {nextAutoship.productCount}
                    </p>
                  </div>

                  {/* Status Badge - Aligned Right */}
                  {autoshipStatus === 'Active' ? (
                    <div className="inline-flex bg-[#E8F5E9] rounded-[8px] px-[12px] py-[6px] self-start">
                      <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#2E7D32] uppercase tracking-[0.5px]">
                        {autoshipStatus}
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex bg-[#FFEBEE] rounded-[8px] px-[12px] py-[6px] self-start">
                      <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#C62828] uppercase tracking-[0.5px]">
                        {autoshipStatus}
                      </span>
                    </div>
                  )}
                </div>

                {/* Autoship Details */}
                <div className="grid grid-cols-2 gap-[16px] mb-[20px]">
                  <div>
                    <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[4px]">
                      Frequency
                    </p>
                    <p className="font-['Inter',sans-serif] text-[#003b3c]">
                      {nextAutoship.frequency}
                    </p>
                  </div>
                  <div>
                    <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[4px]">
                      Next Delivery
                    </p>
                    <p className="font-['Inter',sans-serif] text-[#003b3c]">
                      {nextDelivery}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-[12px]">
                {autoshipStatus === 'Active' ? (
                  <>
                    <button
                      onClick={handleSkipClick}
                      className="inline-flex items-center justify-center flex-1 px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
                    >
                      <SkipForward className="size-[16px] text-[#003b3c] mr-[8px]" />
                      <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                        Skip Next
                      </span>
                    </button>
                    <button
                      onClick={handlePauseClick}
                      className="inline-flex items-center justify-center flex-1 px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
                    >
                      <Pause className="size-[16px] text-[#003b3c] mr-[8px]" />
                      <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                        Pause
                      </span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleResumeClick}
                    className="inline-flex items-center justify-center flex-1 px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
                  >
                    <Play className="size-[16px] text-[#003b3c] mr-[8px]" />
                    <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                      Resume
                    </span>
                  </button>
                )}
                <button
                  onClick={handleManageAutoship}
                  className="flex-1 px-[24px] py-[12px] bg-[#009296] rounded-[8px] hover:bg-[#007d81] transition-colors cursor-pointer focus:outline-none"
                >
                  <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                    Manage
                  </span>
                </button>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="text-center flex-1 flex flex-col items-center justify-center py-[40px]">
              <p className="font-['Inter',sans-serif] text-[#003b3c] mb-[8px]">
                No active autoship
              </p>
              <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[20px] max-w-[320px]">
                Save time and money with automatic deliveries of your favorite products.
              </p>
              <button className="inline-flex items-center justify-center px-[16px] py-[8px] rounded-[999px] border border-[#009296] hover:bg-[#009296] transition-colors group cursor-pointer focus:outline-none">
                <span className="font-['Inter',sans-serif] text-[14px] font-medium text-[#009296] group-hover:text-white transition-colors">
                  Learn More
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
        <button
          onClick={() => onNavigate('orders')}
          className="bg-white rounded-[8px] p-[24px] hover:shadow-lg transition-shadow cursor-pointer focus:outline-none text-left"
        >
          <Package className="size-[24px] text-[#009296] mb-[12px]" />
          <p className="font-['Inter',sans-serif] font-medium text-[#003b3c] mb-[4px] text-[20px]">
            Orders
          </p>
          <p className="font-['Inter',sans-serif] text-[16px] text-[#406c6d]">
            View order history
          </p>
        </button>

        <button
          onClick={() => onNavigate('autoship')}
          className="bg-white rounded-[8px] p-[24px] hover:shadow-lg transition-shadow cursor-pointer focus:outline-none text-left"
        >
          <RefreshCw className="size-[24px] text-[#009296] mb-[12px]" />
          <p className="font-['Inter',sans-serif] font-medium text-[#003b3c] mb-[4px] text-[20px]">
            Autoship
          </p>
          <p className="font-['Inter',sans-serif] text-[16px] text-[#406c6d]">
            Manage autoship
          </p>
        </button>

        <button
          onClick={() => onNavigate('flexpay')}
          className="bg-white rounded-[8px] p-[24px] hover:shadow-lg transition-shadow cursor-pointer focus:outline-none text-left"
        >
          <DollarSign className="size-[24px] text-[#009296] mb-[12px]" />
          <p className="font-['Inter',sans-serif] font-medium text-[#003b3c] mb-[4px] text-[20px]">
            Flexpay
          </p>
          <p className="font-['Inter',sans-serif] text-[16px] text-[#406c6d]">
            Payment plans
          </p>
        </button>

        <button
          onClick={() => onNavigate('favorites')}
          className="bg-white rounded-[8px] p-[24px] hover:shadow-lg transition-shadow cursor-pointer focus:outline-none text-left"
        >
          <Heart className="size-[24px] text-[#009296] mb-[12px]" />
          <p className="font-['Inter',sans-serif] font-medium text-[#003b3c] mb-[4px] text-[20px]">
            Favorites
          </p>
          <p className="font-['Inter',sans-serif] text-[16px] text-[#406c6d]">
            View saved items
          </p>
        </button>
      </div>

      {/* Skip Next Modal */}
      {activeModal === 'skip' && (
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
                    {nextDelivery}
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
                    {calculateNextDelivery(nextDelivery, nextAutoship.frequency)}
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
      {activeModal === 'pause' && (
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
                    <span className="font-medium">Your {nextDelivery} delivery will be cancelled.</span>
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
                  handleSkipClick();
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
      {activeModal === 'resume' && (
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
                    {calculateNextDelivery(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), nextAutoship.frequency)}
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

      {/* Undo Banner - Fixed Bottom Center with Action-Specific Styling */}
      {undoAction && (
        <div className="fixed bottom-[20px] sm:bottom-[30px] left-[50%] -translate-x-1/2 z-50 animate-slideIn w-[calc(100%-40px)] sm:w-auto sm:min-w-[400px] max-w-[90%] sm:max-w-[600px]">
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
        </div>
      )}
    </div>
  );
}