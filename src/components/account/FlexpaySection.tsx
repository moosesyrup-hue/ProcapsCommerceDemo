import { useState, useEffect } from 'react';
import { CreditCard, Calendar, AlertCircle, ChevronDown, ChevronUp, Check, Loader2, Clock, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import imgProduct from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";
import { useBreakpoint } from '../../hooks/useBreakpoint';
import PaymentMethodFormModal from '../shared/PaymentMethodFormModal';

interface FlexpaySectionProps {
  isNewCustomer?: boolean;
}

interface Payment {
  id: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Upcoming' | 'Pending';
  paidDate?: string;
}

interface FlexpayPlan {
  id: string;
  orderNumber: string;
  productName: string;
  productCount: string;
  productImage: string;
  totalAmount: number;
  installments: 2 | 3 | 4;
  payments: Payment[];
  paymentMethod: {
    type: string;
    last4: string;
    nameOnCard: string;
  };
  orderDate: string;
}

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

export default function FlexpaySection({ isNewCustomer = false }: FlexpaySectionProps) {
  const [flexpayPlans, setFlexpayPlans] = useState<FlexpayPlan[]>([
    {
      id: '1',
      orderNumber: '5641866',
      productName: 'Ultimate Anti-Oxidant',
      productCount: '360 Capsules',
      productImage: imgProduct,
      totalAmount: 119.95,
      installments: 3,
      payments: [
        {
          id: 'p1',
          amount: 39.98,
          dueDate: 'January 15, 2026',
          status: 'Paid',
          paidDate: 'January 15, 2026',
        },
        {
          id: 'p2',
          amount: 39.98,
          dueDate: 'February 15, 2026',
          status: 'Upcoming',
        },
        {
          id: 'p3',
          amount: 39.99,
          dueDate: 'March 15, 2026',
          status: 'Pending',
        },
      ],
      paymentMethod: {
        type: 'Visa',
        last4: '4242',
        nameOnCard: 'Andrew Lessman',
      },
      orderDate: 'January 15, 2026',
    },
    {
      id: '2',
      orderNumber: '5641702',
      productName: 'Essential-1 with Beta Carotene',
      productCount: '180 Capsules',
      productImage: imgProduct,
      totalAmount: 79.95,
      installments: 2,
      payments: [
        {
          id: 'p1',
          amount: 39.98,
          dueDate: 'January 20, 2026',
          status: 'Paid',
          paidDate: 'January 20, 2026',
        },
        {
          id: 'p2',
          amount: 39.97,
          dueDate: 'February 20, 2026',
          status: 'Upcoming',
        },
      ],
      paymentMethod: {
        type: 'Mastercard',
        last4: '8888',
        nameOnCard: 'Andrew Lessman',
      },
      orderDate: 'January 20, 2026',
    },
    {
      id: '3',
      orderNumber: '5641589',
      productName: 'Healthy Hair, Skin & Nails',
      productCount: '240 Capsules',
      productImage: imgProduct,
      totalAmount: 159.95,
      installments: 4,
      payments: [
        {
          id: 'p1',
          amount: 39.99,
          dueDate: 'December 10, 2025',
          status: 'Paid',
          paidDate: 'December 10, 2025',
        },
        {
          id: 'p2',
          amount: 39.99,
          dueDate: 'January 10, 2026',
          status: 'Paid',
          paidDate: 'January 10, 2026',
        },
        {
          id: 'p3',
          amount: 39.99,
          dueDate: 'February 10, 2026',
          status: 'Upcoming',
        },
        {
          id: 'p4',
          amount: 39.98,
          dueDate: 'March 10, 2026',
          status: 'Pending',
        },
      ],
      paymentMethod: {
        type: 'Visa',
        last4: '4242',
        nameOnCard: 'Andrew Lessman',
      },
      orderDate: 'December 10, 2025',
    },
    {
      id: '4',
      orderNumber: '5640821',
      productName: 'CoQ10 400mg with Bioperine',
      productCount: '120 Capsules',
      productImage: imgProduct,
      totalAmount: 89.95,
      installments: 3,
      payments: [
        {
          id: 'p1',
          amount: 29.98,
          dueDate: 'October 15, 2025',
          status: 'Paid',
          paidDate: 'October 15, 2025',
        },
        {
          id: 'p2',
          amount: 29.98,
          dueDate: 'November 15, 2025',
          status: 'Paid',
          paidDate: 'November 14, 2025',
        },
        {
          id: 'p3',
          amount: 29.99,
          dueDate: 'December 15, 2025',
          status: 'Paid',
          paidDate: 'December 15, 2025',
        },
      ],
      paymentMethod: {
        type: 'Visa',
        last4: '4242',
        nameOnCard: 'Andrew Lessman',
      },
      orderDate: 'October 15, 2025',
    },
  ]);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>({});
  const [savedFields, setSavedFields] = useState<Record<string, boolean>>({});
  const [selectedPaymentId, setSelectedPaymentId] = useState<Record<string, string>>({});
  
  // Modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentEditingPlanId, setCurrentEditingPlanId] = useState<string | null>(null);
  
  const { breakpoint } = useBreakpoint();
  
  // Get next upcoming payment
  const getNextPayment = (plan: FlexpayPlan): Payment | null => {
    return plan.payments.find(p => p.status === 'Upcoming') || null;
  };

  // Get number of paid payments
  const getPaidCount = (plan: FlexpayPlan): number => {
    return plan.payments.filter(p => p.status === 'Paid').length;
  };

  // Check if all payments are completed
  const isFullyPaid = (plan: FlexpayPlan): boolean => {
    return plan.payments.every(p => p.status === 'Paid');
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

  // Handle payment method change
  const handlePaymentChange = async (planId: string, paymentId: string) => {
    const fieldKey = `${planId}-payment`;
    setLoadingActions(prev => ({ ...prev, [fieldKey]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setFlexpayPlans(plans =>
      plans.map(p => {
        if (p.id === planId) {
          const payment = availablePaymentMethods.find(pm => pm.id === paymentId);
          if (payment) {
            return {
              ...p,
              paymentMethod: {
                type: payment.type,
                last4: payment.last4,
                nameOnCard: payment.nameOnCard,
              }
            };
          }
        }
        return p;
      })
    );
    
    setSelectedPaymentId(prev => ({ ...prev, [planId]: paymentId }));
    setLoadingActions(prev => ({ ...prev, [fieldKey]: false }));
    
    // Show saved badge
    setSavedFields(prev => ({ ...prev, [fieldKey]: true }));
    setTimeout(() => {
      setSavedFields(prev => ({ ...prev, [fieldKey]: false }));
    }, 2000);
    
    const payment = availablePaymentMethods.find(p => p.id === paymentId);
    toast.success(`Payment updated to ${payment?.type} •••• ${payment?.last4}`);
  };

  // Handle Manage (toggle expanded state)
  const handleManage = (plan: FlexpayPlan) => {
    setExpandedId(prev => prev === plan.id ? null : plan.id);
  };

  // Handle adding new payment method
  const handleAddPaymentMethod = (planId: string) => {
    setCurrentEditingPlanId(planId);
    setShowPaymentModal(true);
  };

  // Use empty array if new customer
  const displayPlans = isNewCustomer ? [] : flexpayPlans;

  // Get responsive headline sizing based on breakpoint
  const headlineSize = breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[54px]' : breakpoint === 'L' ? 'text-[38px]' : breakpoint === 'M' ? 'text-[34px]' : 'text-[28px]';
  const headlineTracking = breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : breakpoint === 'L' ? 'tracking-[-0.76px]' : breakpoint === 'M' ? 'tracking-[-0.68px]' : 'tracking-[-0.56px]';

  return (
    <div>
      {/* Page Title */}
      <div className="mb-[40px]">
        <h1 className={`font-['STIX_Two_Text',sans-serif] font-medium leading-[1.1] ${headlineSize} ${headlineTracking} text-[#003b3c]`}>
          Flexpay
        </h1>
      </div>

      {displayPlans.length > 0 ? (
        <div className="space-y-[20px]">
          {displayPlans.map((plan) => {
            const isExpanded = expandedId === plan.id;
            const nextPayment = getNextPayment(plan);
            const paidCount = getPaidCount(plan);
            const fullyPaid = isFullyPaid(plan);

            return (
              <div
                key={plan.id}
                className="bg-white rounded-[8px] overflow-hidden transition-all"
              >
                <div className="p-[30px] md:p-[40px]">
                  {/* Plan Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-[20px] mb-[24px] pb-[24px] border-b border-[#D9E2E2]">
                    {/* Product Image */}
                    <div className="size-[80px] rounded-[4px] overflow-hidden bg-white shrink-0">
                      <img src={plan.productImage} alt={plan.productName} className="w-full h-full object-contain" />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-['Inter',sans-serif] font-medium text-[#003b3c] mb-[4px]">
                        {plan.productName}
                      </h3>
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[4px]">
                        {plan.productCount}
                      </p>
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[8px]">
                        Order# {plan.orderNumber}
                      </p>
                      {fullyPaid ? (
                        <div className="inline-flex bg-[#E8F5E9] rounded-[8px] px-[12px] py-[6px] self-start">
                          <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#2E7D32] uppercase tracking-[0.5px]">
                            Paid in Full
                          </span>
                        </div>
                      ) : (
                        <div className="inline-flex bg-[#E0F7F8] rounded-[8px] px-[12px] py-[6px] self-start">
                          <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#009296] uppercase tracking-[0.5px]">
                            {paidCount} of {plan.installments} Paid
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="text-left sm:text-right">
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[4px]">
                        Total
                      </p>
                      <p className="font-['Inter',sans-serif] font-medium text-[#003b3c]">
                        ${plan.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Plan Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] sm:gap-[40px] mb-[24px]">
                    <div className="max-w-[220px]">
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[4px]">
                        Payment Plan
                      </p>
                      <p className="font-['Inter',sans-serif] text-[#003b3c]">
                        {plan.installments} Payments
                      </p>
                    </div>
                    {!fullyPaid && nextPayment && (
                      <div>
                        <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[4px]">
                          Next Payment
                        </p>
                        <p className="font-['Inter',sans-serif] text-[#003b3c]">
                          ${nextPayment.amount.toFixed(2)} on {nextPayment.dueDate}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-[12px] pt-[24px] border-t border-[#D9E2E2]">
                    <button
                      onClick={() => handleManage(plan)}
                      className="inline-flex items-center justify-center gap-[8px] px-[24px] py-[12px] bg-[#009296] rounded-[8px] hover:bg-[#007d81] transition-colors cursor-pointer focus:outline-none"
                    >
                      <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                        {isExpanded ? 'Close' : 'View Details'}
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
                        {/* Payment Schedule */}
                        <div className="mb-[32px]">
                          <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[12px]">
                            Payment Schedule
                          </p>

                          <div className="space-y-[8px]">
                            {plan.payments.map((payment, index) => {
                              const relativeDays = getRelativeDays(payment.dueDate);
                              const isNext = payment.status === 'Upcoming';
                              
                              return (
                                <div
                                  key={payment.id}
                                  className={`flex items-center justify-between gap-[12px] p-[12px] rounded-[6px] ${
                                    isNext ? 'bg-[#E0F7F8]/40' : payment.status === 'Paid' ? 'bg-[#E8F5E9]/30' : 'bg-[#F5F9F9]'
                                  }`}
                                >
                                  <div className="flex items-center gap-[8px] flex-1 min-w-0">
                                    {payment.status === 'Paid' ? (
                                      <Check className="size-[14px] shrink-0 text-[#2E7D32]" />
                                    ) : isNext ? (
                                      <Clock className="size-[14px] shrink-0 text-[#009296]" />
                                    ) : (
                                      <Calendar className="size-[14px] shrink-0 text-[#406c6d]" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <p className={`font-['Inter',sans-serif] text-[16px] ${
                                        isNext ? 'text-[#003b3c] font-medium' : 'text-[#003b3c]'
                                      }`}>
                                        Payment {index + 1} of {plan.installments}
                                      </p>
                                      <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                                        {payment.status === 'Paid' && payment.paidDate
                                          ? `Paid on ${payment.paidDate}`
                                          : payment.dueDate} {payment.status !== 'Paid' && `• ${relativeDays}`}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-[8px] shrink-0">
                                    <p className="font-['Inter',sans-serif] text-[16px] font-medium text-[#003b3c]">
                                      ${payment.amount.toFixed(2)}
                                    </p>
                                    {isNext && (
                                      <span className="inline-flex items-center px-[6px] py-[1px] bg-[#009296] text-white rounded-[4px] text-[9px] font-medium uppercase tracking-[0.5px]">
                                        Next
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Divider */}
                        {!fullyPaid && <div className="h-[1px] bg-[#D9E2E2] mb-[32px]" />}

                        {/* Payment Method (Only show if not fully paid) */}
                        {!fullyPaid && (
                          <div>
                            <div className="flex items-center gap-[8px] mb-[12px]">
                              <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em]">
                                Payment Method
                              </p>
                              <AnimatePresence>
                                {savedFields[`${plan.id}-payment`] && (
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
                              const currentPaymentId = selectedPaymentId[plan.id] || '1';
                              
                              return (
                                <div className="space-y-[12px]">
                                  {availablePaymentMethods.map(payment => {
                                    const isSelected = currentPaymentId === payment.id;
                                    return (
                                      <div
                                        key={payment.id}
                                        onClick={() => handlePaymentChange(plan.id, payment.id)}
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
                                            onChange={() => handlePaymentChange(plan.id, payment.id)}
                                            disabled={loadingActions[`${plan.id}-payment`]}
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
                                    onClick={() => handleAddPaymentMethod(plan.id)}
                                    className="w-full border-2 border-dashed border-[#D9E2E2] rounded-[8px] p-[16px] font-['Inter',sans-serif] text-[14px] text-[#009296] hover:border-[#009296] hover:bg-[#F5F9F9] transition-all"
                                  >
                                    + Use a different card
                                  </button>
                                </div>
                              );
                            })()}
                          </div>
                        )}
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
              <DollarSign className="size-[36px] text-[#009296]" />
            </div>
            <h2 className="font-['Inter',sans-serif] text-[#003b3c] mb-[16px]">
              No Flexpay Plans
            </h2>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[32px] leading-[1.6]">
              Choose Flexpay at checkout to split your purchase into 2, 3, or 4 easy payments with no interest or fees.
            </p>
            <button className="inline-flex items-center justify-center px-[16px] py-[8px] rounded-[999px] border border-[#009296] hover:bg-[#009296] transition-colors group cursor-pointer focus:outline-none">
              <span className="font-['Inter',sans-serif] text-[14px] font-medium text-[#009296] group-hover:text-white transition-colors">
                Learn More
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Payment Method Form Modal */}
      <PaymentMethodFormModal
        isOpen={showPaymentModal}
        mode="add"
        onClose={() => {
          setShowPaymentModal(false);
          setCurrentEditingPlanId(null);
        }}
        onSave={(newPayment) => {
          toast.success('Payment method added successfully!');
          setShowPaymentModal(false);
          setCurrentEditingPlanId(null);
        }}
      />
    </div>
  );
}