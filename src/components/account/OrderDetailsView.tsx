import { ArrowLeft, Truck, MapPin, CreditCard, Download, Mail, Package } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import ProductReviewView from './ProductReviewView';
import { useState } from 'react';

interface OrderItem {
  name: string;
  count: string;
  quantity: number;
  price?: number;
  image: string;
}

interface OrderDetailsViewProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    id: string;
    date: string;
    status: string;
    total: number;
    itemCount: number;
    shipTo: string;
    items: OrderItem[];
  };
}

export default function OrderDetailsView({ isOpen, onClose, order }: OrderDetailsViewProps) {
  const { breakpoint } = useBreakpoint();
  
  if (!isOpen) return null;

  // Calculate individual item prices (mock - would come from backend)
  const itemsWithPrices = order.items.map(item => ({
    ...item,
    price: item.price || 29.95, // Mock price
  }));

  const subtotal = itemsWithPrices.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.0875; // 8.75% tax
  const total = order.total;

  // Mock shipping/billing data - would come from backend
  const shippingAddress = {
    name: 'Andrew Lessman',
    address: '123 Main Street',
    apartment: 'Apt 4B',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    phone: '(555) 123-4567',
  };

  const billingAddress = {
    name: 'Andrew Lessman',
    address: '123 Main Street',
    apartment: 'Apt 4B',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
  };

  const paymentMethod = {
    type: 'visa',
    last4: '4242',
  };

  // Mock tracking info
  const trackingNumber = order.status === 'Shipped' || order.status === 'Delivered' 
    ? '1Z999AA10123456784' 
    : null;

  const estimatedDelivery = order.status === 'Shipped' 
    ? 'December 12, 2024' 
    : order.status === 'Delivered'
    ? 'December 9, 2024'
    : null;

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

  const badgeStyle = getBadgeStyle(order.status);

  const handleDownloadInvoice = () => {
    toast.success('Invoice download started');
  };

  const handleTrackPackage = () => {
    toast.info(`Tracking order ${order.id}`);
  };

  const handleReorder = () => {
    toast.success(`${order.itemCount} items added to cart`);
    onClose();
  };

  const handleContactSupport = () => {
    toast.info('Opening customer support');
  };

  // Get responsive headline sizing based on breakpoint
  const headlineSize = breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[54px]' : breakpoint === 'L' ? 'text-[38px]' : breakpoint === 'M' ? 'text-[34px]' : 'text-[28px]';
  const headlineTracking = breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : breakpoint === 'L' ? 'tracking-[-0.76px]' : breakpoint === 'M' ? 'tracking-[-0.68px]' : 'tracking-[-0.56px]';

  // State for product review view
  const [isReviewViewOpen, setReviewViewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);

  const openReviewView = (item: OrderItem) => {
    setSelectedItem(item);
    setReviewViewOpen(true);
    // Instantly scroll to top when opening review view
    window.scrollTo(0, 0);
  };

  const closeReviewView = () => {
    setReviewViewOpen(false);
    setSelectedItem(null);
  };

  // If viewing review, show that view instead
  if (isReviewViewOpen && selectedItem) {
    return (
      <ProductReviewView
        isOpen={isReviewViewOpen}
        onClose={closeReviewView}
        item={selectedItem}
        orderId={order.id}
      />
    );
  }

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={onClose}
        className="inline-flex items-center gap-[8px] mb-[24px] text-[#009296] hover:text-[#007d81] transition-colors cursor-pointer focus:outline-none group"
      >
        <ArrowLeft className="size-[20px] group-hover:-translate-x-[2px] transition-transform" />
        <span className="font-['Inter',sans-serif] text-[16px] font-medium">
          Back to orders
        </span>
      </button>

      {/* Page Title */}
      <div className="mb-[40px]">
        <div className="flex items-start justify-between gap-[16px] mb-[16px]">
          <h1 className={`font-['STIX_Two_Text',sans-serif] font-medium leading-[1.1] ${headlineSize} ${headlineTracking} text-[#003b3c]`}>
            Order #{order.id}
          </h1>
          <span className={`px-[16px] py-[8px] ${badgeStyle.bg} ${badgeStyle.text} font-['Inter',sans-serif] text-[14px] font-medium tracking-[0.5px] rounded-[8px] uppercase flex-shrink-0`}>
            {order.status}
          </span>
        </div>
        <p className="font-['Inter',sans-serif] text-[16px] text-[#406c6d]">
          Placed on {order.date}
        </p>
      </div>

      {/* Tracking Info - Only show if shipped or delivered */}
      {trackingNumber && (
        <div className="bg-[#E0F7F8] rounded-[8px] p-[24px] md:p-[32px] mb-[32px]">
          <div className="flex items-start gap-[20px]">
            <div className="flex-shrink-0">
              <div className="size-[56px] bg-[#009296] rounded-full flex items-center justify-center">
                <Truck className="size-[28px] text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-['Inter',sans-serif] font-medium text-[20px] text-[#003b3c] mb-[8px]">
                {order.status === 'Delivered' ? 'Package Delivered' : 'Package in Transit'}
              </h2>
              <p className="font-['Inter',sans-serif] text-[16px] text-[#406c6d] mb-[16px]">
                {order.status === 'Delivered' 
                  ? `Delivered on ${estimatedDelivery}` 
                  : `Estimated delivery: ${estimatedDelivery}`
                }
              </p>
              <div className="flex flex-col md:flex-row gap-[12px] md:items-center">
                <div className="flex items-center gap-[8px]">
                  <span className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em]">
                    Tracking Number:
                  </span>
                  <span className="font-['Inter',sans-serif] font-medium text-[16px] text-[#003b3c]">
                    {trackingNumber}
                  </span>
                </div>
                {order.status === 'Shipped' && (
                  <button
                    onClick={handleTrackPackage}
                    className="text-[#009296] font-['Inter',sans-serif] text-[16px] underline hover:no-underline self-start"
                  >
                    Track Package →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
        {/* Left Column - Order Items (2/3 width) */}
        <div className="lg:col-span-2 space-y-[32px]">
          {/* Order Items */}
          <div className="bg-white rounded-[8px] p-[30px] md:p-[40px]">
            <h2 className="font-['Inter',sans-serif] font-medium text-[24px] text-[#003b3c] mb-[24px] pb-[24px] border-b border-[#D9E2E2]">
              Items Ordered ({order.itemCount})
            </h2>
            <div className="space-y-[24px]">
              {itemsWithPrices.map((item, index) => (
                <div key={index} className="pb-[24px] border-b border-[#D9E2E2] last:border-0 last:pb-0">
                  <div className="flex gap-[20px]">
                    <div className="flex-shrink-0 size-[100px] md:size-[120px] bg-[#F5F5F5] rounded-[8px] overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-['Inter',sans-serif] font-medium text-[18px] text-[#003b3c] mb-[6px]">
                        {item.name}
                      </h3>
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[8px]">
                        {item.count}
                      </p>
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="font-['Inter',sans-serif] font-medium text-[18px] text-[#003b3c]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mt-[4px]">
                          ${item.price.toFixed(2)} each
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Write a Review Button - Only show for delivered orders */}
                  {order.status === 'Delivered' && (
                    <button
                      onClick={() => openReviewView(item)}
                      className="mt-[16px] inline-flex items-center gap-[6px] text-[#009296] hover:text-[#007d81] transition-colors cursor-pointer focus:outline-none"
                    >
                      <span className="font-['Inter',sans-serif] text-[14px] underline hover:no-underline">
                        Write a Review
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Billing Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {/* Shipping Address */}
            <div className="bg-white rounded-[8px] p-[30px] md:p-[40px]">
              <div className="flex items-center gap-[12px] mb-[20px]">
                <div className="flex-shrink-0 size-[40px] bg-[#E0F7F8] rounded-full flex items-center justify-center">
                  <MapPin className="size-[20px] text-[#009296]" />
                </div>
                <h3 className="font-['Inter',sans-serif] font-medium text-[18px] text-[#003b3c]">
                  Shipping Address
                </h3>
              </div>
              <div className="pl-[52px]">
                <p className="font-['Inter',sans-serif] text-[16px] text-[#003b3c] leading-[1.7]">
                  {shippingAddress.name}<br />
                  {shippingAddress.address}{shippingAddress.apartment && `, ${shippingAddress.apartment}`}<br />
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
                  {shippingAddress.phone}
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-[8px] p-[30px] md:p-[40px]">
              <div className="flex items-center gap-[12px] mb-[20px]">
                <div className="flex-shrink-0 size-[40px] bg-[#E0F7F8] rounded-full flex items-center justify-center">
                  <CreditCard className="size-[20px] text-[#009296]" />
                </div>
                <h3 className="font-['Inter',sans-serif] font-medium text-[18px] text-[#003b3c]">
                  Payment Method
                </h3>
              </div>
              <div className="pl-[52px]">
                <div className="flex items-center gap-[8px] mb-[12px]">
                  {paymentMethod.type === 'visa' && (
                    <div className="flex items-center justify-center bg-[#1A1F71] px-[6px] py-[3px] rounded-[2px] min-w-[32px]">
                      <span className="text-white font-['Arial',sans-serif] text-[11px] tracking-[0.5px]" style={{ fontWeight: 700 }}>VISA</span>
                    </div>
                  )}
                  <span className="font-['Inter',sans-serif] text-[16px] text-[#003b3c]">
                    •••• {paymentMethod.last4}
                  </span>
                </div>
                <p className="font-['Inter',sans-serif] text-[16px] text-[#003b3c] leading-[1.7]">
                  {billingAddress.name}<br />
                  {billingAddress.address}{billingAddress.apartment && `, ${billingAddress.apartment}`}<br />
                  {billingAddress.city}, {billingAddress.state} {billingAddress.zipCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary & Actions (1/3 width) */}
        <div className="space-y-[24px]">
          {/* Order Summary - Sticky on desktop */}
          <div className="bg-white rounded-[8px] p-[30px] md:p-[40px] lg:sticky lg:top-[24px]">
            <h3 className="font-['Inter',sans-serif] font-medium text-[20px] text-[#003b3c] mb-[24px] pb-[24px] border-b border-[#D9E2E2]">
              Order Summary
            </h3>
            <div className="space-y-[16px]">
              <div className="flex justify-between">
                <span className="font-['Inter',sans-serif] text-[16px] text-[#406c6d]">
                  Subtotal
                </span>
                <span className="font-['Inter',sans-serif] text-[16px] text-[#003b3c]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-['Inter',sans-serif] text-[16px] text-[#406c6d]">
                  Shipping
                </span>
                <span className="font-['Inter',sans-serif] text-[16px] text-[#009296] font-medium">
                  Free
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-['Inter',sans-serif] text-[16px] text-[#406c6d]">
                  Tax
                </span>
                <span className="font-['Inter',sans-serif] text-[16px] text-[#003b3c]">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="h-[1px] bg-[#D9E2E2] my-[8px]"></div>
              <div className="flex justify-between">
                <span className="font-['Inter',sans-serif] font-medium text-[20px] text-[#003b3c]">
                  Total
                </span>
                <span className="font-['Inter',sans-serif] font-medium text-[20px] text-[#003b3c]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-[12px] mt-[32px] pt-[32px] border-t border-[#D9E2E2]">
              {order.status === 'Delivered' && (
                <button
                  onClick={handleReorder}
                  className="w-full px-[24px] py-[12px] bg-[#009296] rounded-[8px] hover:bg-[#007d81] transition-colors cursor-pointer focus:outline-none"
                >
                  <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                    Reorder
                  </span>
                </button>
              )}
              <button
                onClick={handleDownloadInvoice}
                className="w-full px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em] flex items-center justify-center gap-[8px]">
                  <Download className="size-[16px]" />
                  Download Invoice
                </span>
              </button>
              <button
                onClick={handleContactSupport}
                className="w-full px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em] flex items-center justify-center gap-[8px]">
                  <Mail className="size-[16px]" />
                  Contact Support
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}