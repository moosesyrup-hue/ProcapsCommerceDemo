import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import imgProduct from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useState, useEffect } from 'react';
import OrderDetailsView from './OrderDetailsView';

type OrderStatus = 'All' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
type DateRange = 'all' | '30' | '60' | '90';

interface OrdersSectionProps {
  isNewCustomer?: boolean;
  initialOrderId?: string;
}

export default function OrdersSection({ isNewCustomer = false, initialOrderId }: OrdersSectionProps) {
  const { breakpoint } = useBreakpoint();
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [activeStatus, setActiveStatus] = useState<OrderStatus>('All');
  const [activeDateRange, setActiveDateRange] = useState<DateRange>('all');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  
  // Handle initial order ID from navigation
  useEffect(() => {
    if (initialOrderId) {
      const order = orders.find(o => o.id === initialOrderId);
      if (order) {
        setSelectedOrder(order);
        setShowOrderDetails(true);
        window.scrollTo(0, 0);
      }
    }
  }, [initialOrderId]);
  
  // Mock orders data - latest at top
  const orders = [
    {
      id: '5641702',
      date: 'December 9, 2024',
      status: 'Shipped',
      total: 149.75,
      itemCount: 5,
      shipTo: 'Andrew Lessman',
      items: [
        { name: 'Ultimate Anti-Oxidant', count: '180 capsules', quantity: 2, image: imgProduct },
        { name: 'CoQ10 400mg', count: '120 capsules', quantity: 1, image: imgProduct },
        { name: 'Omega-3 EPA/DHA', count: '60 softgels', quantity: 1, image: imgProduct },
        { name: 'Fibermucil', count: '60 capsules', quantity: 1, image: imgProduct },
        { name: 'Probiotic-10', count: '60 capsules', quantity: 1, image: imgProduct },
      ]
    },
    {
      id: '5638491',
      date: 'December 5, 2024',
      status: 'Delivered',
      total: 129.85,
      itemCount: 4,
      shipTo: 'Andrew Lessman',
      items: [
        { name: 'Ultimate Anti-Oxidant', count: '180 capsules', quantity: 1, image: imgProduct },
        { name: 'CoQ10 400mg', count: '120 capsules', quantity: 2, image: imgProduct },
        { name: 'Omega-3 EPA/DHA', count: '60 softgels', quantity: 1, image: imgProduct },
        { name: 'Fibermucil', count: '60 capsules', quantity: 1, image: imgProduct },
      ]
    },
    {
      id: '5618293',
      date: 'November 2, 2024',
      status: 'Delivered',
      total: 159.80,
      itemCount: 5,
      shipTo: 'Andrew Lessman',
      items: [
        { name: 'Healthy Hair Skin & Nails', count: '120 capsules', quantity: 1, image: imgProduct },
        { name: 'Vision Essentials', count: '60 capsules', quantity: 2, image: imgProduct },
        { name: 'CoQ10 400mg', count: '120 capsules', quantity: 1, image: imgProduct },
        { name: 'Ultimate Anti-Oxidant', count: '180 capsules', quantity: 1, image: imgProduct },
        { name: 'Omega-3 EPA/DHA', count: '60 softgels', quantity: 1, image: imgProduct },
      ]
    },
    {
      id: '5605721',
      date: 'October 15, 2024',
      status: 'Cancelled',
      total: 75.50,
      itemCount: 2,
      shipTo: 'Andrew Lessman',
      items: [
        { name: 'Vision Essentials', count: '60 capsules', quantity: 1, image: imgProduct },
        { name: 'Probiotic-10', count: '60 capsules', quantity: 1, image: imgProduct },
      ]
    },
  ];

  const handleReorder = (order: any) => {
    toast.success(`${order.itemCount} items added to cart`);
  };

  const handleTrackOrder = (orderId: string) => {
    toast.info(`Tracking order ${orderId}`);
  };

  const handleViewDetails = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setShowOrderDetails(true);
      // Instantly scroll to top when opening order details
      window.scrollTo(0, 0);
    }
  };

  const toggleExpandOrder = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  // Helper to get badge styling based on status
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'Delivered':
        return { bg: 'bg-[#E8F5E9]', text: 'text-[#2E7D32]' };
      case 'Shipped':
        return { bg: 'bg-[#E0F7F8]', text: 'text-[#009296]' };
      case 'Cancelled':
        return { bg: 'bg-[#FFEBEE]', text: 'text-[#C62828]' };
      default:
        return { bg: 'bg-[#F5F5F5]', text: 'text-[#616161]' };
    }
  };

  // Check if order should show Track Order button
  const shouldShowTrackButton = (status: string) => {
    return status === 'Shipped';
  };

  // Check if order should show Reorder button
  const shouldShowReorderButton = (status: string) => {
    return status === 'Delivered';
  };

  // Filter orders based on active filters
  const filteredOrders = orders.filter(order => {
    // Status filter
    if (activeStatus !== 'All' && order.status !== activeStatus) {
      return false;
    }

    // Date range filter
    if (activeDateRange !== 'all') {
      const orderDate = new Date(order.date);
      const today = new Date();
      const daysAgo = parseInt(activeDateRange);
      const cutoffDate = new Date(today.setDate(today.getDate() - daysAgo));
      
      if (orderDate < cutoffDate) {
        return false;
      }
    }

    return true;
  });

  // Use empty array if new customer
  const displayOrders = isNewCustomer ? [] : filteredOrders;

  // Status filter options
  const statusOptions: OrderStatus[] = ['All', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'];

  // Date range options
  const dateRangeOptions = [
    { value: 'all', label: 'All time' },
    { value: '30', label: 'Last 30 days' },
    { value: '60', label: 'Last 60 days' },
    { value: '90', label: 'Last 90 days' },
  ];

  // Get responsive headline sizing based on breakpoint
  const headlineSize = breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[54px]' : breakpoint === 'L' ? 'text-[38px]' : breakpoint === 'M' ? 'text-[34px]' : 'text-[28px]';
  const headlineTracking = breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : breakpoint === 'L' ? 'tracking-[-0.76px]' : breakpoint === 'M' ? 'tracking-[-0.68px]' : 'tracking-[-0.56px]';

  // If viewing order details, show that view instead
  if (showOrderDetails && selectedOrder) {
    return (
      <OrderDetailsView
        isOpen={showOrderDetails}
        order={selectedOrder}
        onClose={() => {
          setShowOrderDetails(false);
          setSelectedOrder(null);
        }}
      />
    );
  }

  return (
    <div>
      {/* Page Title */}
      <div className="mb-[40px]">
        <h1 className={`font-['STIX_Two_Text',sans-serif] font-medium leading-[1.1] ${headlineSize} ${headlineTracking} text-[#003b3c]`}>
          Order history
        </h1>
      </div>

      {/* Filters */}
      {orders.length > 0 && (
        <div className="mb-[24px] bg-white rounded-[8px] p-[20px] md:p-[24px]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[16px]">
            {/* Status Pills */}
            <div className="flex flex-wrap gap-[8px]">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`px-[16px] py-[8px] rounded-[8px] border transition-all cursor-pointer focus:outline-none ${
                    activeStatus === status
                      ? 'bg-[#009296] border-[#009296] text-white'
                      : 'bg-white border-[#D9E2E2] text-[#003b3c] hover:border-[#003b3c]'
                  }`}
                >
                  <span className="font-['Inter',sans-serif] text-[14px] uppercase tracking-[0.05em]">
                    {status}
                  </span>
                </button>
              ))}
            </div>

            {/* Date Range Dropdown */}
            <div className="lg:ml-auto">
              <div className="relative">
                <select
                  value={activeDateRange}
                  onChange={(e) => setActiveDateRange(e.target.value as DateRange)}
                  className="w-full lg:w-auto h-[56px] pl-[16px] pr-[44px] border rounded-[8px] bg-white text-[#003b3c] font-['Inter',sans-serif] text-[16px] focus:outline-none transition-colors appearance-none cursor-pointer border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]"
                >
                  {dateRangeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#406c6d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {displayOrders.length > 0 ? (
        <div className="space-y-[20px]">
          {displayOrders.map((order) => {
            const isExpanded = expandedOrders.has(order.id);
            const badgeStyle = getBadgeStyle(order.status);
            const showTrackButton = shouldShowTrackButton(order.status);
            const showReorderButton = shouldShowReorderButton(order.status);
            const displayItems = isExpanded ? order.items : order.items.slice(0, 3);
            const hasMoreItems = order.items.length > 3;
            
            return (
              <div
                key={order.id}
                className="bg-white rounded-[8px] p-[30px] md:p-[40px]"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[12px] mb-[24px] pb-[24px] border-b border-[#D9E2E2]">
                  <div className="flex-1">
                    <h3 className="font-['Inter',sans-serif] font-medium text-[#003b3c] mb-[12px] text-[20px]">
                      Order #{order.id}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-[8px] sm:gap-[24px]">
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                        {order.date}
                      </p>
                    </div>
                  </div>
                  <div className={`inline-flex ${badgeStyle.bg} rounded-[8px] px-[12px] py-[6px] self-start`}>
                    <span className={`font-['Inter',sans-serif] text-[12px] font-medium ${badgeStyle.text} uppercase tracking-[0.5px]`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-[24px]">
                  <div className="space-y-[16px]">
                    {displayItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-[16px]">
                        <div className="size-[60px] rounded-[4px] overflow-hidden bg-white shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-['Inter',sans-serif] font-medium text-[#003b3c] mb-[2px]">
                            {item.name}
                          </p>
                          <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[2px]">
                            {item.count}
                          </p>
                          <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Expand/Collapse Button */}
                  {hasMoreItems && (
                    <button
                      onClick={() => toggleExpandOrder(order.id)}
                      className="mt-[16px] flex items-center gap-[8px] font-['Inter',sans-serif] text-[14px] text-[#009296] hover:text-[#007d81] transition-colors cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          Show less
                          <ChevronUp className="size-[16px]" />
                        </>
                      ) : (
                        <>
                          + {order.items.length - 3} more item{order.items.length - 3 > 1 ? 's' : ''}
                          <ChevronDown className="size-[16px]" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Order Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[16px] pt-[24px] border-t border-[#D9E2E2]">
                  <div>
                    <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[4px]">
                      Total
                    </p>
                    <p className="font-['Inter',sans-serif] font-medium text-[#003b3c]">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-[12px]">
                    <button
                      onClick={() => handleViewDetails(order.id)}
                      className="px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
                    >
                      <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                        View Details
                      </span>
                    </button>
                    {showTrackButton && (
                      <button
                        onClick={() => handleTrackOrder(order.id)}
                        className="px-[24px] py-[12px] bg-[#009296] rounded-[8px] hover:bg-[#007d81] transition-colors cursor-pointer focus:outline-none"
                      >
                        <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                          Track Order
                        </span>
                      </button>
                    )}
                    {showReorderButton && (
                      <button
                        onClick={() => handleReorder(order)}
                        className="px-[24px] py-[12px] bg-[#009296] rounded-[8px] hover:bg-[#007d81] transition-colors cursor-pointer focus:outline-none"
                      >
                        <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                          Reorder
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-[8px] p-[60px] md:p-[80px]">
          <div className="max-w-[500px] mx-auto text-center">
            <div className="inline-flex items-center justify-center size-[80px] rounded-full bg-[#E0F7F8] mb-[24px]">
              <Package className="size-[36px] text-[#009296]" />
            </div>
            <h2 className="font-['Inter',sans-serif] text-[#003b3c] mb-[16px]">
              No orders yet
            </h2>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[32px] leading-[1.6]">
              You haven't placed any orders yet. Start exploring our premium vitamins and supplements.
            </p>
            <button className="inline-flex items-center justify-center px-[16px] py-[8px] rounded-[999px] border border-[#009296] hover:bg-[#009296] transition-colors group cursor-pointer focus:outline-none">
              <span className="font-['Inter',sans-serif] text-[14px] font-medium text-[#009296] group-hover:text-white transition-colors">
                Shop Now
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}