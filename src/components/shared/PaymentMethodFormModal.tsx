/**
 * Shared Payment Method Form Modal
 * Used in both Checkout and Account Profile sections
 * Supports "edit" mode (checkout) and "add" mode (profile)
 */

import { useState, useEffect } from 'react';
import { FormField } from './FormFields';

interface PaymentMethod {
  id?: string;
  type: 'visa' | 'mastercard' | 'amex' | 'discover';
  last4: string;
  nameOnCard: string;
  expiry: string;
  isDefault?: boolean;
}

interface PaymentMethodFormModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit';
  paymentMethod?: PaymentMethod;
  onClose: () => void;
  onSave: (payment: PaymentMethod) => void;
  title?: string;
  description?: string;
}

export default function PaymentMethodFormModal({ 
  isOpen,
  mode,
  paymentMethod, 
  onClose, 
  onSave,
  title,
  description
}: PaymentMethodFormModalProps) {
  const [editNameOnCard, setEditNameOnCard] = useState('');
  const [editExpiry, setEditExpiry] = useState('');
  const [editCardNumber, setEditCardNumber] = useState('');
  const [editCvv, setEditCvv] = useState('');
  const [editIsDefault, setEditIsDefault] = useState(false);

  useEffect(() => {
    if (paymentMethod && mode === 'edit') {
      setEditNameOnCard(paymentMethod.nameOnCard || '');
      setEditExpiry(paymentMethod.expiry || '');
      setEditCardNumber(''); // Card number can't be edited
      setEditCvv('');
      setEditIsDefault(paymentMethod.isDefault || false);
    } else {
      setEditNameOnCard('');
      setEditExpiry('');
      setEditCardNumber('');
      setEditCvv('');
      setEditIsDefault(false);
    }
  }, [paymentMethod, mode, isOpen]);

  // Detect card type from number
  const detectCardType = (number: string): PaymentMethod['type'] => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'discover';
    return 'visa';
  };

  // Format card number with spaces
  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\s/g, '').replace(/\D/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    setEditCardNumber(chunks.join(' ').slice(0, 19));
  };

  // Format expiry as MM/YYYY
  const handleExpiryChange = (value: string) => {
    let cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length >= 2) {
      cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 6);
    }
    
    setEditExpiry(cleaned.slice(0, 7));
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'edit' && paymentMethod) {
      // Edit mode - only update editable fields
      onSave({
        ...paymentMethod,
        nameOnCard: editNameOnCard,
        expiry: editExpiry,
        isDefault: editIsDefault,
      });
    } else {
      // Add mode - create new payment method
      const cleaned = editCardNumber.replace(/\s/g, '');
      onSave({
        type: detectCardType(cleaned),
        last4: cleaned.slice(-4),
        nameOnCard: editNameOnCard,
        expiry: editExpiry,
        isDefault: editIsDefault,
      });
    }
  };

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[16px]">
      <div className="bg-white rounded-[16px] max-w-[480px] w-full p-[32px] relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-[16px] right-[16px] text-[#406c6d] hover:text-[#003b3c] transition-colors"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Header */}
        <div className="mb-[24px]">
          <h2 className="font-['Inter',sans-serif] text-[24px] font-medium text-[#003b3c] mb-[8px]">
            {title || (mode === 'add' ? 'Add Payment Method' : 'Edit Payment Method')}
          </h2>
          <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
            {description || (mode === 'add' 
              ? 'Enter your payment details below.' 
              : 'Update your payment details below. For security reasons, card number cannot be changed.'
            )}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave}>
          <div className="space-y-[16px]">
            {mode === 'edit' && paymentMethod ? (
              /* Edit mode - show read-only card number */
              <div>
                <label className="block font-['Inter',sans-serif] text-[14px] text-[#003b3c] mb-[8px]">
                  Card Number
                </label>
                <div className="w-full h-[56px] px-[16px] border-2 border-[#D9E2E2] rounded-[8px] bg-[#F5F5F5] flex items-center gap-[12px]">
                  {paymentMethod.type === 'visa' && (
                    <div className="flex items-center justify-center bg-[#1A1F71] px-[6px] py-[3px] rounded-[2px] min-w-[32px]">
                      <span className="text-white font-['Arial',sans-serif] text-[11px] tracking-[0.5px]" style={{ fontWeight: 700 }}>VISA</span>
                    </div>
                  )}
                  {paymentMethod.type === 'mastercard' && (
                    <div className="h-[24px] flex items-center gap-[2px]">
                      <div className="w-[20px] h-[20px] rounded-full bg-[#EB001B]"></div>
                      <div className="w-[20px] h-[20px] rounded-full bg-[#F79E1B] -ml-[10px]"></div>
                    </div>
                  )}
                  <span className="font-['Inter',sans-serif] text-[16px] text-[#406c6d]">
                    •••• •••• •••• {paymentMethod.last4}
                  </span>
                </div>
                <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] mt-[8px]">
                  To change your card number, please add a new payment method.
                </p>
              </div>
            ) : (
              /* Add mode - show editable card number */
              <FormField
                label="Card Number"
                value={editCardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            )}
            
            <FormField
              label="Name on Card"
              value={editNameOnCard}
              onChange={setEditNameOnCard}
              required
            />
            
            <div className="grid grid-cols-2 gap-[16px]">
              <FormField
                label="Expiry Date"
                value={editExpiry}
                onChange={handleExpiryChange}
                placeholder="MM/YYYY"
                required
              />
              {mode === 'add' && (
                <FormField
                  label="CVV"
                  value={editCvv}
                  onChange={(value) => setEditCvv(value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  required
                />
              )}
            </div>

            {/* Set as Default checkbox - only show in add mode for profile */}
            {mode === 'add' && (
              <div className="flex items-center gap-[12px] pt-[8px]">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={editIsDefault}
                  onChange={(e) => setEditIsDefault(e.target.checked)}
                  className="custom-checkout-checkbox"
                />
                <label 
                  htmlFor="isDefault"
                  className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] cursor-pointer"
                >
                  Set as default payment method
                </label>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-[12px] mt-[32px]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
            >
              <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                Cancel
              </span>
            </button>
            <button
              type="submit"
              className="flex-1 px-[24px] py-[12px] bg-[#009296] rounded-[8px] hover:bg-[#007d81] transition-colors cursor-pointer focus:outline-none"
            >
              <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                {mode === 'add' ? 'Add Card' : 'Save Changes'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}