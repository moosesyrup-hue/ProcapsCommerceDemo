/**
 * Checkout Page Component
 * Best-in-class checkout experience with required account creation
 * Features:
 * - Returning customers: Clean login flow
 * - New customers: Soft-gate account creation after payment info
 * - Auto-fills shipping/payment for logged-in users
 * - Email recognition: Detects registered emails during checkout
 * 
 * Demo Credentials:
 * - Registered email: demo@andrewlessman.com (password: password123)
 * - New customer: Any other email proceeds normally
 * - Login modal: Any email with password "password123"
 */

import { useState } from 'react';
import { ChevronLeft, Lock, Truck, Shield, Phone, MessageCircle, Check, Eye, EyeOff, Loader2, Headset, X } from 'lucide-react';
import svgPaths from "../imports/svg-vsxzdz3mbf";

interface CartItem {
  id: string;
  name: string;
  count: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  frequency?: string;
}

interface CheckoutPageProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onContinueShopping?: () => void;
  onPlaceOrder?: (orderData: {
    orderNumber: string;
    email: string;
    estimatedDelivery: string;
    shippingAddress: {
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
    };
    paymentMethod: {
      type: string;
      lastFour: string;
    };
    totals: {
      subtotal: number;
      shipping: number;
      tax: number;
      total: number;
    };
  }) => void;
}

interface FormFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  isValid?: boolean;
  showLockIcon?: boolean;
}

function FormField({ label, type = 'text', value, onChange, onBlur, error, required = false, isValid = false, showLockIcon = false }: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const showLabel = isFocused || hasValue;
  const fieldId = `field-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return (
    <div className="relative">
      <div className="relative">
        <input
          id={fieldId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          className={`w-full py-[18px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors placeholder:text-transparent ${
            showLockIcon ? 'pr-[48px]' : ''
          } ${
            error 
              ? 'border-[#D84315] hover:border-[#D84315] focus:border-[#D84315]' 
              : isValid
              ? 'border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]'
              : 'border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]'
          }`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${fieldId}-error` : undefined}
        />
        {/* Floating label - shown when focused or has value */}
        {showLabel && (
          <label 
            htmlFor={fieldId}
            className={`absolute left-[12px] top-[-8px] px-[4px] bg-white font-['Inter',sans-serif] text-[12px] pointer-events-none transition-colors ${
              error && isFocused
                ? 'text-[#D84315]'
                : isFocused
                ? 'text-[#003b3c]'
                : 'text-[#406c6d]'
            }`}
          >
            {label}{required && ' *'}
          </label>
        )}
        {/* Placeholder label - shown when empty and not focused */}
        {!showLabel && (
          <label 
            htmlFor={fieldId}
            className="absolute left-[16px] top-[18px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#406c6d] pointer-events-none transition-all duration-200"
          >
            {label}{required && ' *'}
          </label>
        )}
        {showLockIcon && (
          <div className="absolute right-[16px] top-1/2 -translate-y-1/2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#406c6d]">
              <path d="M14.25 8.25H13.5V5.25C13.5 3.18 11.82 1.5 9.75 1.5H8.25C6.18 1.5 4.5 3.18 4.5 5.25V8.25H3.75C3.0225 8.25 2.4375 8.835 2.4375 9.5625V15.1875C2.4375 15.915 3.0225 16.5 3.75 16.5H14.25C14.9775 16.5 15.5625 15.915 15.5625 15.1875V9.5625C15.5625 8.835 14.9775 8.25 14.25 8.25ZM9.75 13.125C9.0225 13.125 8.4375 12.54 8.4375 11.8125C8.4375 11.085 9.0225 10.5 9.75 10.5C10.4775 10.5 11.0625 11.085 11.0625 11.8125C11.0625 12.54 10.4775 13.125 9.75 13.125ZM11.8125 8.25H6.1875V5.25C6.1875 4.1175 7.1175 3.1875 8.25 3.1875H9.75C10.8825 3.1875 11.8125 4.1175 11.8125 5.25V8.25Z" fill="currentColor"/>
            </svg>
          </div>
        )}
        {isValid && !error && !showLockIcon && (
          <div className="absolute right-[16px] top-1/2 -translate-y-1/2">
            <div className="w-[20px] h-[20px] rounded-full bg-[#4CAF50] flex items-center justify-center">
              <Check className="w-[12px] h-[12px] text-white" />
            </div>
          </div>
        )}
      </div>
      {error && (
        <p id={`${fieldId}-error`} className="font-['Inter',sans-serif] text-[12px] text-[#D84315] mt-[6px]">
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

function SelectField({ label, value, onChange, onBlur, error, required = false, options }: SelectFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const showLabel = isFocused || hasValue;
  const fieldId = `field-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return (
    <div className="relative">
      <div className="relative">
        <select
          id={fieldId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          className={`w-full h-[56px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] focus:outline-none transition-colors appearance-none bg-white ${
            !hasValue ? 'text-transparent' : 'text-[#003b3c]'
          } ${
            error 
              ? 'border-[#D84315] hover:border-[#D84315] focus:border-[#D84315]' 
              : 'border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]'
          }`}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${fieldId}-error` : undefined}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-[#003b3c]">
              {option.label}
            </option>
          ))}
        </select>
        {/* Floating label - shown when focused or has value */}
        {showLabel && (
          <label 
            htmlFor={fieldId}
            className={`absolute left-[12px] top-[-8px] px-[4px] bg-white font-['Inter',sans-serif] text-[12px] pointer-events-none transition-colors ${
              error && isFocused
                ? 'text-[#D84315]'
                : isFocused
                ? 'text-[#003b3c]'
                : 'text-[#406c6d]'
            }`}
          >
            {label}{required && ' *'}
          </label>
        )}
        {/* Placeholder label - shown when empty and not focused */}
        {!showLabel && (
          <label 
            htmlFor={fieldId}
            className="absolute left-[16px] top-[18px] font-['Inter',sans-serif] text-[16px] text-[#406c6d] pointer-events-none transition-all duration-200"
          >
            {label}{required && ' *'}
          </label>
        )}
        <div className="absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="#406c6d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {error && (
        <p id={`${fieldId}-error`} className="font-['Inter',sans-serif] text-[12px] text-[#D84315] mt-[6px]">
          {error}
        </p>
      )}
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

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="h-[40px] w-[109.045px] hover:opacity-80 transition-opacity"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 38">
        <g>
          <path d={svgPaths.p25a86380} fill="white" />
          <path d={svgPaths.p20c71700} fill="white" />
          <path d={svgPaths.p23d24d80} fill="white" />
          <path d={svgPaths.p5ed1b80} fill="white" />
          <path d={svgPaths.p5733200} fill="white" />
          <path d={svgPaths.p2c85b100} fill="white" />
          <path d={svgPaths.p2a1d4000} fill="white" />
          <path d={svgPaths.p4324d00} fill="white" />
        </g>
      </svg>
    </button>
  );
}

// Saved Address Selector Component
interface SavedAddress {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

interface SavedAddressSelectorProps {
  addresses: SavedAddress[];
  selectedId: string;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

function SavedAddressSelector({ addresses, selectedId, onSelect, onEdit, onDelete, onAddNew }: SavedAddressSelectorProps) {
  return (
    <div className="space-y-[12px]">
      {addresses.map((addr) => (
        <div
          key={addr.id}
          onClick={() => onSelect(addr.id)}
          className={`relative border-2 rounded-[8px] p-[16px] cursor-pointer transition-all ${
            selectedId === addr.id
              ? 'border-[#009296] bg-[#F5F9F9]'
              : 'border-[#D9E2E2]'
          }`}
        >
          <div className="flex items-start gap-[12px]">
            <input
              type="radio"
              checked={selectedId === addr.id}
              onChange={() => onSelect(addr.id)}
              className="custom-checkout-radio"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-[8px]">
                <div className="flex items-center gap-[8px]">
                  <span className="font-['Inter',sans-serif] font-medium text-[14px] l:text-[15px] xl:text-[16px] text-[#003b3c]">
                    {addr.firstName} {addr.lastName}
                  </span>
                  {addr.isDefault && (
                    <span className="px-[8px] py-[2px] bg-[#009296] text-white font-['Inter',sans-serif] text-[10px] font-medium tracking-[0.5px] rounded-[4px] uppercase">
                      Default
                    </span>
                  )}
                </div>
                {selectedId === addr.id && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(addr.id);
                    }}
                    className="text-[#009296] font-['Inter',sans-serif] text-[12px] underline hover:no-underline"
                  >
                    Edit
                  </button>
                )}
              </div>
              <p className="font-['Inter',sans-serif] text-[14px] l:text-[15px] xl:text-[16px] text-[#406c6d] leading-[1.5]">
                {addr.address}{addr.apartment && `, ${addr.apartment}`}<br />
                {addr.city}, {addr.state} {addr.zipCode}<br />
                {addr.phone}
              </p>
            </div>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={onAddNew}
        className="w-full border-2 border-dashed border-[#D9E2E2] rounded-[8px] p-[16px] font-['Inter',sans-serif] text-[14px] l:text-[15px] xl:text-[16px] text-[#009296] hover:border-[#009296] hover:bg-[#F5F9F9] transition-all"
      >
        + Deliver to a different address
      </button>
    </div>
  );
}

// Saved Payment Method Selector Component
interface SavedPaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiry: string;
  nameOnCard: string;
  isDefault: boolean;
}

interface SavedPaymentSelectorProps {
  paymentMethods: SavedPaymentMethod[];
  selectedId: string;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  cvv: string;
  onCvvChange: (cvv: string) => void;
  onCvvBlur?: () => void;
}

function SavedPaymentSelector({ 
  paymentMethods, 
  selectedId, 
  onSelect, 
  onEdit, 
  onDelete, 
  onAddNew,
  cvv,
  onCvvChange,
  onCvvBlur
}: SavedPaymentSelectorProps) {
  const getCardIcon = (type: string) => {
    if (type === 'visa') {
      return (
        <div className="flex items-center justify-center bg-[#1A1F71] px-[6px] py-[3px] rounded-[2px] min-w-[32px]">
          <span className="text-white font-['Arial',sans-serif] text-[11px] tracking-[0.5px]" style={{ fontWeight: 700 }}>VISA</span>
        </div>
      );
    } else if (type === 'mastercard') {
      return <div className="h-[24px] flex items-center gap-[2px]">
        <div className="w-[20px] h-[20px] rounded-full bg-[#EB001B]"></div>
        <div className="w-[20px] h-[20px] rounded-full bg-[#F79E1B] -ml-[10px]"></div>
      </div>;
    }
    return null;
  };

  const selectedPayment = paymentMethods.find(p => p.id === selectedId);

  return (
    <div className="space-y-[12px]">
      {paymentMethods.map((payment) => (
        <div
          key={payment.id}
          onClick={() => onSelect(payment.id)}
          className={`relative border-2 rounded-[8px] p-[16px] cursor-pointer transition-all ${
            selectedId === payment.id
              ? 'border-[#009096] bg-[#F5F9F9]'
              : 'border-[#D9E2E2]'
          }`}
        >
          <div className="flex items-start gap-[12px]">
            <input
              type="radio"
              checked={selectedId === payment.id}
              onChange={() => onSelect(payment.id)}
              className="custom-checkout-radio"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-[8px]">
                <div className="flex items-center gap-[12px]">
                  {getCardIcon(payment.type)}
                  <span className="font-['Inter',sans-serif] font-medium text-[14px] l:text-[15px] xl:text-[16px] text-[#003b3c]">
                    <span className="tracking-[2px]">••••</span> {payment.last4}
                  </span>
                  {payment.isDefault && (
                    <span className="px-[8px] py-[2px] bg-[#009296] text-white font-['Inter',sans-serif] text-[10px] font-medium tracking-[0.5px] rounded-[4px] uppercase">
                      Default
                    </span>
                  )}
                </div>
                {selectedId === payment.id && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(payment.id);
                    }}
                    className="text-[#009296] font-['Inter',sans-serif] text-[12px] underline hover:no-underline"
                  >
                    Edit
                  </button>
                )}
              </div>
              <p className="font-['Inter',sans-serif] text-[14px] l:text-[15px] xl:text-[16px] text-[#406c6d]">
                Expires {payment.expiry}
              </p>
            </div>
          </div>
        </div>
      ))}
      
      {/* CVV Input for Selected Card */}
      {selectedPayment && (
        <div className="bg-[#FFF9E6] border border-[#FFD54F] rounded-[8px] p-[16px]">
          <label className="font-['Inter',sans-serif] text-[14px] l:text-[15px] xl:text-[16px] text-[#003b3c] font-medium mb-[8px] block">
            Security Code (CVV) *
          </label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 4) {
                onCvvChange(value);
              }
            }}
            onBlur={onCvvBlur}
            placeholder="123"
            maxLength={4}
            className="w-[120px] py-[12px] px-[16px] border border-[#D9E2E2] rounded-[8px] font-['Inter',sans-serif] text-[16px] text-[#003b3c] focus:outline-none focus:border-[#003b3c]"
          />
          <p className="font-['Inter',sans-serif] text-[12px] l:text-[13px] xl:text-[14px] text-[#406c6d] mt-[8px]">
            For your security, please enter the CVV for <span className="tracking-[2px]">••••</span> {selectedPayment.last4}
          </p>
        </div>
      )}
      
      <button
        type="button"
        onClick={onAddNew}
        className="w-full border-2 border-dashed border-[#D9E2E2] rounded-[8px] p-[16px] font-['Inter',sans-serif] text-[14px] l:text-[15px] xl:text-[16px] text-[#009296] hover:border-[#009296] hover:bg-[#F5F9F9] transition-all"
      >
        + Use a different card
      </button>
    </div>
  );
}

// Edit Address Modal Component
interface EditAddressModalProps {
  address: SavedAddress;
  onClose: () => void;
  onSave: (updatedAddress: SavedAddress) => void;
}

function EditAddressModal({ address, onClose, onSave }: EditAddressModalProps) {
  const [editFirstName, setEditFirstName] = useState(address.firstName);
  const [editLastName, setEditLastName] = useState(address.lastName);
  const [editAddress, setEditAddress] = useState(address.address);
  const [editApartment, setEditApartment] = useState(address.apartment);
  const [editCity, setEditCity] = useState(address.city);
  const [editState, setEditState] = useState(address.state);
  const [editZipCode, setEditZipCode] = useState(address.zipCode);
  const [editPhone, setEditPhone] = useState(address.phone);
  
  const handleEditPhoneChange = (value: string) => {
    // Format phone number as user types
    const cleaned = value.replace(/\D/g, '');
    let formatted = '';
    
    if (cleaned.length <= 3) {
      formatted = cleaned;
    } else if (cleaned.length <= 6) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
    
    setEditPhone(formatted);
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...address,
      firstName: editFirstName,
      lastName: editLastName,
      address: editAddress,
      apartment: editApartment,
      city: editCity,
      state: editState,
      zipCode: editZipCode,
      phone: editPhone
    });
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[16px]">
      <div className="bg-white rounded-[16px] max-w-[600px] w-full max-h-[90vh] overflow-y-auto p-[32px] relative">
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
            Edit Shipping Address
          </h2>
          <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
            Update your shipping address details below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave}>
          <div className="space-y-[16px]">
            <div className="grid grid-cols-2 gap-[16px]">
              <FormField
                label="First Name"
                value={editFirstName}
                onChange={setEditFirstName}
                required
              />
              <FormField
                label="Last Name"
                value={editLastName}
                onChange={setEditLastName}
                required
              />
            </div>
            
            <FormField
              label="Street Address"
              value={editAddress}
              onChange={setEditAddress}
              required
            />
            
            <FormField
              label="Apartment, suite, etc."
              value={editApartment}
              onChange={setEditApartment}
            />
            
            <div className="grid grid-cols-2 gap-[16px]">
              <FormField
                label="City"
                value={editCity}
                onChange={setEditCity}
                required
              />
              <SelectField
                label="State"
                value={editState}
                onChange={setEditState}
                required
                options={[
                  { value: '', label: 'State *' },
                  { value: 'AL', label: 'Alabama' },
                  { value: 'AK', label: 'Alaska' },
                  { value: 'AZ', label: 'Arizona' },
                  { value: 'AR', label: 'Arkansas' },
                  { value: 'CA', label: 'California' },
                  { value: 'CO', label: 'Colorado' },
                  { value: 'CT', label: 'Connecticut' },
                  { value: 'DE', label: 'Delaware' },
                  { value: 'FL', label: 'Florida' },
                  { value: 'GA', label: 'Georgia' },
                  { value: 'HI', label: 'Hawaii' },
                  { value: 'ID', label: 'Idaho' },
                  { value: 'IL', label: 'Illinois' },
                  { value: 'IN', label: 'Indiana' },
                  { value: 'IA', label: 'Iowa' },
                  { value: 'KS', label: 'Kansas' },
                  { value: 'KY', label: 'Kentucky' },
                  { value: 'LA', label: 'Louisiana' },
                  { value: 'ME', label: 'Maine' },
                  { value: 'MD', label: 'Maryland' },
                  { value: 'MA', label: 'Massachusetts' },
                  { value: 'MI', label: 'Michigan' },
                  { value: 'MN', label: 'Minnesota' },
                  { value: 'MS', label: 'Mississippi' },
                  { value: 'MO', label: 'Missouri' },
                  { value: 'MT', label: 'Montana' },
                  { value: 'NE', label: 'Nebraska' },
                  { value: 'NV', label: 'Nevada' },
                  { value: 'NH', label: 'New Hampshire' },
                  { value: 'NJ', label: 'New Jersey' },
                  { value: 'NM', label: 'New Mexico' },
                  { value: 'NY', label: 'New York' },
                  { value: 'NC', label: 'North Carolina' },
                  { value: 'ND', label: 'North Dakota' },
                  { value: 'OH', label: 'Ohio' },
                  { value: 'OK', label: 'Oklahoma' },
                  { value: 'OR', label: 'Oregon' },
                  { value: 'PA', label: 'Pennsylvania' },
                  { value: 'RI', label: 'Rhode Island' },
                  { value: 'SC', label: 'South Carolina' },
                  { value: 'SD', label: 'South Dakota' },
                  { value: 'TN', label: 'Tennessee' },
                  { value: 'TX', label: 'Texas' },
                  { value: 'UT', label: 'Utah' },
                  { value: 'VT', label: 'Vermont' },
                  { value: 'VA', label: 'Virginia' },
                  { value: 'WA', label: 'Washington' },
                  { value: 'WV', label: 'West Virginia' },
                  { value: 'WI', label: 'Wisconsin' },
                  { value: 'WY', label: 'Wyoming' },
                ]}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-[16px]">
              <FormField
                label="ZIP Code"
                value={editZipCode}
                onChange={setEditZipCode}
                required
              />
              <FormField
                label="Phone"
                type="tel"
                value={editPhone}
                onChange={handleEditPhoneChange}
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-[12px] mt-[32px]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-[48px] rounded-[8px] border border-[#009296] text-[#009296] hover:bg-[#F5F9F9] transition-colors font-['Inter',sans-serif] font-medium text-[16px] tracking-[1.92px] uppercase flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-[48px] rounded-[8px] bg-[#009296] hover:bg-[#007d81] transition-colors font-['Inter',sans-serif] font-medium text-[16px] text-white tracking-[1.92px] uppercase flex items-center justify-center"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Edit Payment Modal Component
interface EditPaymentModalProps {
  payment: SavedPaymentMethod;
  onClose: () => void;
  onSave: (updatedPayment: SavedPaymentMethod) => void;
}

function EditPaymentModal({ payment, onClose, onSave }: EditPaymentModalProps) {
  const [editNameOnCard, setEditNameOnCard] = useState(payment.nameOnCard);
  const [editExpiry, setEditExpiry] = useState(payment.expiry);
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...payment,
      nameOnCard: editNameOnCard,
      expiry: editExpiry
    });
  };
  
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
            Edit Payment Method
          </h2>
          <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
            Update your payment details below. For security reasons, card number cannot be changed.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave}>
          <div className="space-y-[16px]">
            {/* Card Type and Last 4 (Read-only) */}
            <div>
              <label className="block font-['Inter',sans-serif] text-[14px] text-[#003b3c] mb-[8px]">
                Card Number
              </label>
              <div className="w-full h-[56px] px-[16px] border-2 border-[#D9E2E2] rounded-[8px] bg-[#F5F5F5] flex items-center gap-[12px]">
                {payment.type === 'visa' && (
                  <div className="flex items-center justify-center bg-[#1A1F71] px-[6px] py-[3px] rounded-[2px] min-w-[32px]">
                    <span className="text-white font-['Arial',sans-serif] text-[11px] tracking-[0.5px]" style={{ fontWeight: 700 }}>VISA</span>
                  </div>
                )}
                {payment.type === 'mastercard' && (
                  <div className="h-[24px] flex items-center gap-[2px]">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#EB001B]"></div>
                    <div className="w-[20px] h-[20px] rounded-full bg-[#F79E1B] -ml-[10px]"></div>
                  </div>
                )}
                <span className="font-['Inter',sans-serif] text-[16px] text-[#406c6d]">
                  •••• •••• •••• {payment.last4}
                </span>
              </div>
              <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] mt-[8px]">
                To change your card number, please add a new payment method.
              </p>
            </div>
            
            <FormField
              label="Name on Card"
              value={editNameOnCard}
              onChange={setEditNameOnCard}
              required
            />
            
            <FormField
              label="Expiry Date"
              value={editExpiry}
              onChange={setEditExpiry}
              placeholder="MM/YYYY"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-[12px] mt-[32px]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-[48px] rounded-[8px] border border-[#009296] text-[#009296] hover:bg-[#F5F9F9] transition-colors font-['Inter',sans-serif] font-medium text-[16px] tracking-[1.92px] uppercase flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-[48px] rounded-[8px] bg-[#009296] hover:bg-[#007d81] transition-colors font-['Inter',sans-serif] font-medium text-[16px] text-white tracking-[1.92px] uppercase flex items-center justify-center"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage({ items, onUpdateQuantity, onContinueShopping, onPlaceOrder }: CheckoutPageProps) {
  // Form state
  const [email, setEmail] = useState('');
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [showSecurityCodeTooltip, setShowSecurityCodeTooltip] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard', 'ups-ground', 'ups-expedited'

  // Billing address state
  const [billingFirstName, setBillingFirstName] = useState('');
  const [billingLastName, setBillingLastName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingApartment, setBillingApartment] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingZipCode, setBillingZipCode] = useState('');

  // Error state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [billingMatchesShipping, setBillingMatchesShipping] = useState(true);
  
  // Account creation state
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | ''>('');
  
  // Login state
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Place Order loading state
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  // Help dropdown state
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  
  // Email recognition state - for detecting registered emails during checkout
  const [emailRecognized, setEmailRecognized] = useState(false);
  const [recognizedEmailPassword, setRecognizedEmailPassword] = useState('');
  const [showRecognizedPassword, setShowRecognizedPassword] = useState(false);
  const [recognizedEmailError, setRecognizedEmailError] = useState('');
  
  // Forgot password state
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordSubmitted, setForgotPasswordSubmitted] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  
  // Demo registered user data
  const DEMO_REGISTERED_EMAIL = 'demo@andrewlessman.com';
  const DEMO_PASSWORD = 'password123';
  const DEMO_USER_DATA = {
    firstName: 'Andrew',
    lastName: 'Lessman',
    address: '123 Main Street',
    apartment: 'Apt 4B',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    phone: '(555) 123-4567',
  };

  // Mock saved addresses for logged-in users (converted to state for editing)
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([
    {
      id: 'addr-1',
      firstName: 'Andrew',
      lastName: 'Lessman',
      address: '123 Main Street',
      apartment: 'Apt 4B',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      phone: '(555) 123-4567',
      isDefault: true,
    },
    {
      id: 'addr-2',
      firstName: 'Andrew',
      lastName: 'Lessman',
      address: '456 Ocean Avenue',
      apartment: '',
      city: 'Santa Monica',
      state: 'CA',
      zipCode: '90401',
      phone: '(555) 987-6543',
      isDefault: false,
    },
  ]);

  // Mock saved payment methods for logged-in users (converted to state for editing)
  const [savedPaymentMethods, setSavedPaymentMethods] = useState<SavedPaymentMethod[]>([
    {
      id: 'card-1',
      type: 'visa',
      last4: '1234',
      expiry: '12/2025',
      nameOnCard: 'Andrew Lessman',
      isDefault: true,
    },
    {
      id: 'card-2',
      type: 'mastercard',
      last4: '5678',
      expiry: '08/2026',
      nameOnCard: 'Andrew Lessman',
      isDefault: false,
    },
  ]);

  // Edit modal state
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [editingPaymentId, setEditingPaymentId] = useState<string | null>(null);

  // Saved address/payment selection state
  const [selectedAddressId, setSelectedAddressId] = useState('addr-1');
  const [selectedPaymentId, setSelectedPaymentId] = useState('card-1');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [showNewPaymentForm, setShowNewPaymentForm] = useState(false);
  const [savedCardCvv, setSavedCardCvv] = useState('');

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 25;
  
  // Calculate shipping based on selected method
  let shipping = 0;
  switch (shippingMethod) {
    case 'standard':
      shipping = 0; // Always free
      break;
    case 'ups-ground':
      shipping = 8.99;
      break;
    case 'ups-expedited':
      shipping = 14.99;
      break;
  }
  
  const tax = subtotal * 0.08;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - discount;

  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const hasUnlockedFreeShipping = subtotal >= freeShippingThreshold;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "WELCOME10" for 10% off.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    // Validate login credentials
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter your email and password');
      return;
    }
    
    // Mock login - in production this would call your auth API
    // For demo purposes, accept any email with password "password123"
    if (loginPassword === 'password123') {
      setIsLoggedIn(true);
      setIsLoginMode(false);
      
      // Reset form state to ensure clean slate
      setShowNewAddressForm(false);
      setShowNewPaymentForm(false);
      setBillingMatchesShipping(true);
      setErrors({});
      
      // Pre-fill user data (mock data - would come from API)
      setEmail(loginEmail);
      setFirstName('Andrew');
      setLastName('Lessman');
      setAddress('123 Main Street');
      setCity('Los Angeles');
      setState('CA');
      setZipCode('90001');
      setPhone('(555) 123-4567');
      
      // Select default saved address and payment method
      setSelectedAddressId('addr-1');
      setSelectedPaymentId('card-1');
      
      // Mark fields as touched and valid
      setTouched({
        ...touched,
        email: true,
        firstName: true,
        lastName: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        phone: true,
        savedCardCvv: false, // Will be marked true when user enters it
      });
    } else {
      setLoginError('Incorrect email or password. Please try again.');
    }
  };

  const handleSwitchToLogin = () => {
    setIsLoginMode(true);
    setLoginEmail(email); // Pre-fill with email they may have entered
    setLoginError('');
  };

  const handleSwitchToSignup = () => {
    setIsLoginMode(false);
    setLoginError('');
    setEmail(loginEmail); // Transfer email back
  };

  // Forgot password handlers
  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
    setForgotPasswordEmail(loginEmail); // Pre-fill with login email if available
    setForgotPasswordSubmitted(false);
    setForgotPasswordError('');
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordError('');
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!forgotPasswordEmail || !emailRegex.test(forgotPasswordEmail)) {
      setForgotPasswordError('Please enter a valid email address');
      return;
    }
    
    // Simulate sending reset email
    setForgotPasswordSubmitted(true);
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPasswordModal(false);
    setForgotPasswordEmail('');
    setForgotPasswordSubmitted(false);
    setForgotPasswordError('');
  };

  // Email recognition handler - checks if email is registered
  const handleEmailBlur = () => {
    const trimmedEmail = email.trim().toLowerCase();
    
    // Check if this is a registered demo email
    if (trimmedEmail === DEMO_REGISTERED_EMAIL.toLowerCase()) {
      setEmailRecognized(true);
      setRecognizedEmailError('');
    } else {
      setEmailRecognized(false);
      setRecognizedEmailPassword('');
      setRecognizedEmailError('');
    }
  };

  // Handle password submission for recognized email
  const handleRecognizedEmailLogin = () => {
    if (recognizedEmailPassword === DEMO_PASSWORD) {
      // Successful login - populate saved data
      setIsLoggedIn(true);
      setEmailRecognized(false);
      
      // Reset form state to ensure clean slate
      setShowNewAddressForm(false);
      setShowNewPaymentForm(false);
      setBillingMatchesShipping(true);
      setErrors({});
      
      // Pre-fill saved shipping data
      setFirstName(DEMO_USER_DATA.firstName);
      setLastName(DEMO_USER_DATA.lastName);
      setAddress(DEMO_USER_DATA.address);
      setApartment(DEMO_USER_DATA.apartment);
      setCity(DEMO_USER_DATA.city);
      setState(DEMO_USER_DATA.state);
      setZipCode(DEMO_USER_DATA.zipCode);
      setPhone(DEMO_USER_DATA.phone);
      
      // Select default saved address and payment method
      setSelectedAddressId('addr-1');
      setSelectedPaymentId('card-1');
      
      // Mark fields as touched and valid
      setTouched({
        ...touched,
        email: true,
        firstName: true,
        lastName: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        phone: true,
        savedCardCvv: false, // Will be marked true when user enters it
      });
      
      setRecognizedEmailPassword('');
      setRecognizedEmailError('');
    } else {
      setRecognizedEmailError('Incorrect password. Please try again.');
    }
  };

  // Handle adding a new address for logged-in users
  const handleAddNewAddress = () => {
    // Clear shipping form fields
    setFirstName('');
    setLastName('');
    setAddress('');
    setApartment('');
    setCity('');
    setState('');
    setZipCode('');
    setPhone('');
    
    // Clear touched state for shipping fields
    setTouched({
      email: touched.email,
    });
    
    // Keep "billing same as shipping" checked by default
    setBillingMatchesShipping(true);
    
    // Clear billing address fields (they'll match shipping when form is submitted)
    setBillingFirstName('');
    setBillingLastName('');
    setBillingAddress('');
    setBillingApartment('');
    setBillingCity('');
    setBillingState('');
    setBillingZipCode('');
    
    // Show the new address form
    setShowNewAddressForm(true);
  };

  // Validation functions
  const validateEmail = (email: string): string => {
    if (!email) return 'Please enter your email address';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validateRequired = (value: string, fieldName: string): string => {
    if (!value.trim()) return `Please enter ${fieldName}`;
    return '';
  };

  const validateZipCode = (zip: string): string => {
    if (!zip) return 'Please enter your ZIP code';
    if (!/^\d{5}(-\d{4})?$/.test(zip)) return 'Please enter a valid ZIP code';
    return '';
  };

  const validatePhone = (phone: string): string => {
    if (!phone) return 'Please enter your phone number';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10) return 'Please enter a valid phone number';
    return '';
  };

  // Format phone number as user types: (555) 123-4567
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Format: (XXX) XXX-XXXX
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setPhone(formatted);
  };

  const validateCardNumber = (card: string): string => {
    if (!card) return 'Please enter your card number';
    const cleaned = card.replace(/\s/g, '');
    if (cleaned.length < 13 || cleaned.length > 19) return 'Please enter a valid card number';
    return '';
  };

  const validateExpiry = (expiry: string): string => {
    if (!expiry) return 'Please enter expiry date';
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return 'Please enter a valid expiry date (MM/YY)';
    return '';
  };

  const validateSecurityCode = (code: string): string => {
    if (!code) return 'Please enter security code';
    if (!/^\d{3,4}$/.test(code)) return 'Please enter a valid security code';
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password) return 'Please create a password';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return '';
  };

  const calculatePasswordStrength = (password: string): 'weak' | 'medium' | 'strong' | '' => {
    if (password.length === 0) return '';
    if (password.length < 8) return 'weak';
    
    let strength = 0;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    if (strength >= 3) return 'strong';
    if (strength >= 1) return 'medium';
    return 'weak';
  };

  const handleBlur = (field: string, value: string) => {
    setTouched({ ...touched, [field]: true });
    
    let error = '';
    switch (field) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'firstName':
        error = validateRequired(value, 'your first name');
        break;
      case 'lastName':
        error = validateRequired(value, 'your last name');
        break;
      case 'address':
        error = validateRequired(value, 'your address');
        break;
      case 'city':
        error = validateRequired(value, 'your city');
        break;
      case 'state':
        error = validateRequired(value, 'your state');
        break;
      case 'zipCode':
        error = validateZipCode(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'cardNumber':
        error = validateCardNumber(value);
        break;
      case 'expiry':
        error = validateExpiry(value);
        break;
      case 'securityCode':
        error = validateSecurityCode(value);
        break;
      case 'nameOnCard':
        error = validateRequired(value, 'name on card');
        break;
      case 'billingFirstName':
        error = validateRequired(value, 'your first name');
        break;
      case 'billingLastName':
        error = validateRequired(value, 'your last name');
        break;
      case 'billingAddress':
        error = validateRequired(value, 'your address');
        break;
      case 'billingCity':
        error = validateRequired(value, 'your city');
        break;
      case 'billingState':
        error = validateRequired(value, 'your state');
        break;
      case 'billingZipCode':
        error = validateZipCode(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
    }
    
    setErrors({ ...errors, [field]: error });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    newErrors.email = validateEmail(email);
    newErrors.firstName = validateRequired(firstName, 'your first name');
    newErrors.lastName = validateRequired(lastName, 'your last name');
    newErrors.address = validateRequired(address, 'your address');
    newErrors.city = validateRequired(city, 'your city');
    newErrors.state = validateRequired(state, 'your state');
    newErrors.zipCode = validateZipCode(zipCode);
    newErrors.phone = validatePhone(phone);
    
    // Payment validation depends on whether using saved card or new card
    if (isLoggedIn && !showNewPaymentForm) {
      // Using saved payment method - only validate CVV
      newErrors.savedCardCvv = validateSecurityCode(savedCardCvv);
    } else {
      // Entering new payment info - validate all card fields
      newErrors.cardNumber = validateCardNumber(cardNumber);
      newErrors.expiry = validateExpiry(expiry);
      newErrors.securityCode = validateSecurityCode(securityCode);
      newErrors.nameOnCard = validateRequired(nameOnCard, 'name on card');
    }
    
    // Only validate password if user is not logged in
    if (!isLoggedIn) {
      newErrors.password = validatePassword(password);
    }

    // Validate billing address if it doesn't match shipping
    if (!billingMatchesShipping) {
      newErrors.billingFirstName = validateRequired(billingFirstName, 'your first name');
      newErrors.billingLastName = validateRequired(billingLastName, 'your last name');
      newErrors.billingAddress = validateRequired(billingAddress, 'your address');
      newErrors.billingCity = validateRequired(billingCity, 'your city');
      newErrors.billingState = validateRequired(billingState, 'your state');
      newErrors.billingZipCode = validateZipCode(billingZipCode);
    }

    // Filter out empty errors
    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value !== '')
    );

    setErrors(filteredErrors);

    // Mark all fields as touched
    const allTouched = Object.keys(newErrors).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    if (Object.keys(filteredErrors).length === 0) {
      // Show loading state
      setIsPlacingOrder(true);
      
      // Generate order number
      const orderNumber = `AL${Date.now().toString().slice(-8)}`;
      
      // Calculate estimated delivery (5-7 business days from now)
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 7);
      const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric' 
      });

      // Calculate totals
      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const shipping = subtotal >= 50 ? 0 : 5.95; // Free shipping over $50
      const tax = subtotal * 0.08; // 8% tax
      const total = subtotal + shipping + tax;

      // Get payment method info
      let paymentInfo;
      if (isLoggedIn && !showNewPaymentForm) {
        // Using saved payment method
        const selectedCard = savedPaymentMethods.find(p => p.id === selectedPaymentId);
        paymentInfo = {
          type: selectedCard?.type === 'visa' ? 'Visa' : selectedCard?.type === 'mastercard' ? 'Mastercard' : selectedCard?.type === 'amex' ? 'American Express' : 'Credit Card',
          lastFour: selectedCard?.last4 || '****'
        };
      } else {
        // Using new card
        paymentInfo = {
          type: 'Credit Card',
          lastFour: cardNumber.slice(-4)
        };
      }

      // Prepare order data
      const orderData = {
        orderNumber,
        email,
        estimatedDelivery,
        shippingAddress: {
          firstName,
          lastName,
          address,
          city,
          state,
          zipCode
        },
        paymentMethod: paymentInfo,
        totals: {
          subtotal,
          shipping,
          tax,
          total
        }
      };

      // Simulate processing with a short delay before navigating to confirmation
      setTimeout(() => {
        // Call the onPlaceOrder callback
        if (onPlaceOrder) {
          onPlaceOrder(orderData);
        } else {
          console.log('Order placed!', orderData);
        }
        // Note: loading state will reset when component unmounts on navigation
      }, 1500);
    }
  };

  // Helper to check if field is valid
  const isFieldValid = (field: string, value: string): boolean => {
    return touched[field] && value.length > 0 && !errors[field];
  };

  // Check if all required fields are filled and valid
  const isFormComplete = (): boolean => {
    const requiredFields: Record<string, string> = {
      email,
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      phone,
    };
    
    // Payment fields depend on whether using saved card or new card
    if (isLoggedIn && !showNewPaymentForm) {
      // Using saved payment method - only need CVV
      requiredFields.savedCardCvv = savedCardCvv;
    } else {
      // Entering new payment info - need all card fields
      requiredFields.cardNumber = cardNumber;
      requiredFields.expiry = expiry;
      requiredFields.securityCode = securityCode;
      requiredFields.nameOnCard = nameOnCard;
    }
    
    // Only require password if user is not logged in
    if (!isLoggedIn) {
      requiredFields.password = password;
    }

    // Add billing fields if billing doesn't match shipping
    if (!billingMatchesShipping) {
      requiredFields.billingFirstName = billingFirstName;
      requiredFields.billingLastName = billingLastName;
      requiredFields.billingAddress = billingAddress;
      requiredFields.billingCity = billingCity;
      requiredFields.billingState = billingState;
      requiredFields.billingZipCode = billingZipCode;
    }

    // Check if all required fields have values
    const allFieldsFilled = Object.values(requiredFields).every(value => value.trim().length > 0);

    // Check if any fields have errors
    const hasErrors = Object.keys(requiredFields).some(field => {
      const value = requiredFields[field as keyof typeof requiredFields];
      let error = '';
      
      switch (field) {
        case 'email':
          error = validateEmail(value);
          break;
        case 'firstName':
        case 'lastName':
        case 'address':
        case 'city':
        case 'state':
        case 'nameOnCard':
        case 'billingFirstName':
        case 'billingLastName':
        case 'billingAddress':
        case 'billingCity':
        case 'billingState':
          error = validateRequired(value, field);
          break;
        case 'zipCode':
        case 'billingZipCode':
          error = validateZipCode(value);
          break;
        case 'phone':
          error = validatePhone(value);
          break;
        case 'cardNumber':
          error = validateCardNumber(value);
          break;
        case 'expiry':
          error = validateExpiry(value);
          break;
        case 'securityCode':
        case 'savedCardCvv':
          error = validateSecurityCode(value);
          break;
        case 'password':
          error = validatePassword(value);
          break;
      }
      
      return error !== '';
    });

    return allFieldsFilled && !hasErrors;
  };

  const stateOptions = [
    { value: '', label: 'State' },
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header - Full Width */}
      <div className="bg-[#009296] border-b border-[#0CA9AD]">
        <div className="px-[20px] md:px-[40px] py-[28px]">
          <div className="relative flex items-center justify-between">
            {/* Left: Continue Shopping Link */}
            <button
              onClick={onContinueShopping}
              className="flex items-center gap-[8px] text-white hover:opacity-80 transition-opacity"
            >
              <ChevronLeft className="w-[20px] h-[20px]" />
              <span className="font-['Inter',sans-serif] text-[14px]">Continue shopping</span>
            </button>
            
            {/* Center: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Logo onClick={onContinueShopping} />
            </div>
            
            {/* Right: Help Button with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowHelpDropdown(!showHelpDropdown)}
                className="flex items-center gap-[8px] text-white hover:opacity-80 transition-opacity"
                aria-label="Customer support options"
              >
                <span className="font-['Inter',sans-serif] text-[14px] hidden sm:inline">Need Help?</span>
                <Headset className="w-[20px] h-[20px]" />
              </button>

              {/* Help Dropdown */}
              {showHelpDropdown && (
                <>
                  {/* Backdrop for mobile */}
                  <div 
                    className="fixed inset-0 z-40 lg:hidden"
                    onClick={() => setShowHelpDropdown(false)}
                  />
                  
                  {/* Dropdown content */}
                  <div className="absolute right-0 top-[calc(100%+12px)] z-50 bg-white rounded-[12px] shadow-xl border border-[#D9E2E2] overflow-hidden min-w-[280px]">
                    {/* Header */}
                    <div className="bg-[#F5F9F9] px-[20px] py-[16px] border-b border-[#D9E2E2] flex items-center justify-between">
                      <div className="flex items-center gap-[8px]">
                        <Headset className="w-[20px] h-[20px] text-[#009296]" />
                        <h3 className="font-['Inter',sans-serif] font-medium text-[16px] text-[#003b3c]">
                          Customer Support
                        </h3>
                      </div>
                      <button
                        onClick={() => setShowHelpDropdown(false)}
                        className="text-[#406c6d] hover:text-[#003b3c] transition-colors lg:hidden"
                        aria-label="Close help menu"
                      >
                        <X className="w-[18px] h-[18px]" />
                      </button>
                    </div>

                    {/* Contact Options */}
                    <div className="p-[12px]">
                      {/* Phone */}
                      <a
                        href="tel:1-800-800-1200"
                        onClick={() => setShowHelpDropdown(false)}
                        className="flex items-center gap-[12px] px-[12px] py-[14px] rounded-[8px] hover:bg-[#F5F9F9] transition-colors group"
                      >
                        <div className="w-[40px] h-[40px] rounded-full bg-[#E8F5F5] flex items-center justify-center group-hover:bg-[#009296] transition-colors">
                          <Phone className="w-[20px] h-[20px] text-[#009296] group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <p className="font-['Inter',sans-serif] font-medium text-[15px] text-[#003b3c] group-hover:text-[#009296] transition-colors">
                            Call Us
                          </p>
                          <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                            1-800-800-1200
                          </p>
                        </div>
                      </a>

                      {/* Live Chat */}
                      <button
                        onClick={() => {
                          setShowHelpDropdown(false);
                          // Handle chat opening logic here
                        }}
                        className="w-full flex items-center gap-[12px] px-[12px] py-[14px] rounded-[8px] hover:bg-[#F5F9F9] transition-colors group"
                      >
                        <div className="w-[40px] h-[40px] rounded-full bg-[#E8F5F5] flex items-center justify-center group-hover:bg-[#009296] transition-colors">
                          <MessageCircle className="w-[20px] h-[20px] text-[#009296] group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-left">
                          <p className="font-['Inter',sans-serif] font-medium text-[15px] text-[#003b3c] group-hover:text-[#009296] transition-colors">
                            Live Chat
                          </p>
                          <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                            Average response: 2 min
                          </p>
                        </div>
                      </button>
                    </div>

                    {/* Footer */}
                    <div className="bg-[#F5F9F9] px-[20px] py-[12px] border-t border-[#D9E2E2]">
                      <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] text-center">
                        Available 7 days a week, 6am-6pm PST
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Order Summary Toggle */}
      <div className="lg:hidden bg-white border-b border-[#D9E2E2]">
        <button
          onClick={() => setShowOrderSummary(!showOrderSummary)}
          className="w-full px-[20px] md:px-[40px] py-[16px] flex items-center justify-between"
        >
          <div className="flex items-center gap-[8px]">
            <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c]">
              {showOrderSummary ? 'Hide' : 'Show'} order summary
            </span>
            <ChevronLeft className={`w-[16px] h-[16px] text-[#003b3c] transition-transform ${showOrderSummary ? '-rotate-90' : 'rotate-90'}`} />
          </div>
          <span className="font-['Inter',sans-serif] font-medium text-[16px] text-[#003b3c]">
            ${total.toFixed(2)}
          </span>
        </button>
        
        {showOrderSummary && (
          <div className="px-[20px] md:px-[40px] pb-[20px] border-t border-[#D9E2E2]">
            <OrderSummary
              items={items}
              onUpdateQuantity={onUpdateQuantity}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              discount={discount}
              total={total}
              hasUnlockedFreeShipping={hasUnlockedFreeShipping}
              remaining={remaining}
              progress={progress}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              promoApplied={promoApplied}
              promoError={promoError}
              setPromoError={setPromoError}
              handleApplyPromo={handleApplyPromo}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="py-[40px] lg:py-[60px]">
        <div className="w-full px-[20px] md:px-[40px] lg:w-[1200px] lg:px-0 lg:mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-[40px] lg:gap-[80px]">
          {/* Left Column - Checkout Form */}
          <div className="order-2 lg:order-1">
            {/* Login Form - Shows when user clicks "Log in" */}
            {isLoginMode && !isLoggedIn ? (
              <div>
                <div className="mb-[32px]">
                  <h2 className="font-['STIX_Two_Text',sans-serif] text-[32px] text-[#003b3c] mb-[8px]" style={{ fontWeight: 500 }}>
                    Welcome back
                  </h2>
                  <p className="font-['Inter',sans-serif] text-[16px] text-[#406c6d]">
                    Log in to continue with your order
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-[20px]">
                  {/* Email Field */}
                  <div className="relative">
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full py-[18px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c] placeholder:text-transparent"
                      placeholder="Email"
                    />
                    {loginEmail.length > 0 && (
                      <label className="absolute left-[12px] top-[-8px] px-[4px] bg-white font-['Inter',sans-serif] text-[12px] text-[#406c6d] pointer-events-none">
                        Email
                      </label>
                    )}
                    {loginEmail.length === 0 && (
                      <label className="absolute left-[16px] top-[18px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#406c6d] pointer-events-none transition-all duration-200">
                        Email
                      </label>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full py-[18px] px-[16px] pr-[48px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c] placeholder:text-transparent"
                      placeholder="Password"
                    />
                    {loginPassword.length > 0 && (
                      <label className="absolute left-[12px] top-[-8px] px-[4px] bg-white font-['Inter',sans-serif] text-[12px] text-[#406c6d] pointer-events-none">
                        Password
                      </label>
                    )}
                    {loginPassword.length === 0 && (
                      <label className="absolute left-[16px] top-[18px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#406c6d] pointer-events-none transition-all duration-200">
                        Password
                      </label>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#406c6d] hover:text-[#003b3c] transition-colors"
                      aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                    >
                      {showLoginPassword ? (
                        <EyeOff className="w-[20px] h-[20px]" />
                      ) : (
                        <Eye className="w-[20px] h-[20px]" />
                      )}
                    </button>
                  </div>

                  {/* Error Message */}
                  {loginError && (
                    <div className="bg-[#FFF3E0] border border-[#FF9800] rounded-[8px] px-[16px] py-[12px]">
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#D84315]">
                        {loginError}
                      </p>
                    </div>
                  )}

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <button 
                      type="button" 
                      onClick={handleForgotPasswordClick}
                      className="font-['Inter',sans-serif] text-[14px] text-[#009296] underline hover:no-underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={!loginEmail || !loginPassword}
                    className={`w-full h-[56px] rounded-[999px] flex items-center justify-center gap-[8px] transition-colors ${
                      loginEmail && loginPassword
                        ? 'bg-[#009296] hover:bg-[#007d81] cursor-pointer'
                        : 'bg-[#C2CFCF] cursor-not-allowed'
                    }`}
                  >
                    <span className="font-['Inter',sans-serif] font-medium text-[16px] text-white tracking-[1.92px] uppercase">
                      Log In
                    </span>
                  </button>

                  {/* Demo Helper */}
                  <div className="mt-[24px] bg-[#F5F9F9] border border-[#D9E2E2] rounded-[8px] px-[16px] py-[12px]">
                    <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] text-center">
                      <strong>Demo:</strong> Use email "demo@andrewlessman.com" and password "password123"
                    </p>
                  </div>

                  {/* Switch to Signup */}
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] text-center mt-[24px]">
                    New customer?{' '}
                    <button 
                      type="button" 
                      onClick={handleSwitchToSignup}
                      className="text-[14px] text-[#009296] underline hover:no-underline"
                    >
                      Continue to checkout
                    </button>
                  </p>
                </form>
              </div>
            ) : (
            <form onSubmit={handlePlaceOrder} className="space-y-[40px]">
              {/* Delivery */}
              <div>
                <div className="flex items-center justify-between mb-[20px]">
                  <h2 className="font-['STIX_Two_Text',sans-serif] text-[32px] l:text-[36px] xl:text-[40px] hd:text-[44px] text-[#003b3c]" style={{ fontWeight: 500 }}>
                    Delivery
                  </h2>
                  {!isLoggedIn && (
                    <p className="font-['Inter',sans-serif] text-[14px] l:text-[15px] xl:text-[16px] text-[#406c6d]">
                      Have an account?{' '}
                      <button 
                        type="button" 
                        onClick={handleSwitchToLogin}
                        className="text-[14px] l:text-[15px] xl:text-[16px] text-[#009296] underline hover:no-underline"
                      >
                        Log in for faster checkout
                      </button>
                    </p>
                  )}
                  {isLoggedIn && (
                    <p className="font-['Inter',sans-serif] text-[14px] l:text-[15px] xl:text-[16px] text-[#406c6d] flex items-center gap-[6px]">
                      <Check className="w-[16px] h-[16px] text-[#4CAF50]" />
                      Logged in as <span className="font-medium">{email}</span>{' '}
                      <button 
                        type="button" 
                        onClick={() => {
                          setIsLoggedIn(false);
                          // Clear all form fields
                          setEmail('');
                          setEmailMarketing(false);
                          setFirstName('');
                          setLastName('');
                          setAddress('');
                          setApartment('');
                          setCity('');
                          setState('');
                          setZipCode('');
                          setPhone('');
                          setCardNumber('');
                          setExpiry('');
                          setSecurityCode('');
                          setNameOnCard('');
                          setBillingFirstName('');
                          setBillingLastName('');
                          setBillingAddress('');
                          setBillingApartment('');
                          setBillingCity('');
                          setBillingState('');
                          setBillingZipCode('');
                          setPassword('');
                          setPasswordStrength('');
                          setSelectedAddressId('');
                          setSelectedPaymentId('');
                          setSavedCardCvv('');
                        }}
                        className="text-[14px] l:text-[15px] xl:text-[16px] text-[#009296] underline hover:no-underline"
                      >
                        Log out
                      </button>
                    </p>
                  )}
                </div>
                <div className="space-y-[16px]">
                  
                  {/* Only show email field for non-logged-in users */}
                  {!isLoggedIn && (
                  <div>
                    <FormField
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(value) => {
                        setEmail(value);
                        // Reset recognition when email changes
                        if (emailRecognized) {
                          setEmailRecognized(false);
                          setRecognizedEmailPassword('');
                          setRecognizedEmailError('');
                        }
                      }}
                      onBlur={() => {
                        handleBlur('email', email);
                        handleEmailBlur();
                      }}
                      error={touched.email ? errors.email : undefined}
                      required
                      isValid={isFieldValid('email', email)}
                    />
                    
                    {/* Email recognized - show password prompt */}
                    {emailRecognized && (
                      <div className="mt-[16px] bg-[#E8F5F5] border border-[#009296] rounded-[8px] px-[16px] py-[16px]">
                        <div className="flex items-start gap-[12px] mb-[16px]">
                          <div className="w-[20px] h-[20px] rounded-full bg-[#009296] flex items-center justify-center flex-shrink-0 mt-[2px]">
                            <Check className="w-[12px] h-[12px] text-white" />
                          </div>
                          <div>
                            <p className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] font-medium mb-[4px]">
                              We found your account!
                            </p>
                            <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                              Please enter your password to continue and we'll fill in your saved information.
                            </p>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <input
                            type={showRecognizedPassword ? 'text' : 'password'}
                            value={recognizedEmailPassword}
                            onChange={(e) => {
                              setRecognizedEmailPassword(e.target.value);
                              setRecognizedEmailError('');
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleRecognizedEmailLogin();
                              }
                            }}
                            placeholder="Enter your password"
                            className="w-full py-[12px] px-[16px] pr-[48px] border border-[#D9E2E2] rounded-[8px] font-['Inter',sans-serif] text-[16px] text-[#003b3c] focus:outline-none focus:border-[#003b3c]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowRecognizedPassword(!showRecognizedPassword)}
                            className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#406c6d] hover:text-[#003b3c]"
                          >
                            {showRecognizedPassword ? <EyeOff className="w-[20px] h-[20px]" /> : <Eye className="w-[20px] h-[20px]" />}
                          </button>
                        </div>
                        
                        {recognizedEmailError && (
                          <p className="font-['Inter',sans-serif] text-[12px] text-[#D84315] mt-[8px]">
                            {recognizedEmailError}
                          </p>
                        )}
                        
                        <button
                          type="button"
                          onClick={handleRecognizedEmailLogin}
                          className="w-full mt-[12px] h-[48px] rounded-[8px] bg-[#009296] hover:bg-[#007d81] transition-colors flex items-center justify-center"
                        >
                          <span className="font-['Inter',sans-serif] font-medium text-[16px] text-white tracking-[1.92px] uppercase">
                            Continue
                          </span>
                        </button>
                        
                        <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] text-center mt-[12px]">
                          <strong>Demo:</strong> Use password "password123"
                        </p>
                      </div>
                    )}
                  </div>
                  )}
                  
                  {/* Shipping Address Section */}
                  {!emailRecognized && (
                  <>
                  {/* Logged-in users: Show saved addresses */}
                  {isLoggedIn && !showNewAddressForm ? (
                    <div className="mt-[24px]">
                      <SavedAddressSelector
                        addresses={savedAddresses}
                        selectedId={selectedAddressId}
                        onSelect={setSelectedAddressId}
                        onEdit={(id) => setEditingAddressId(id)}
                        onDelete={(id) => alert(`Delete address ${id} - This would show a confirmation dialog in production`)}
                        onAddNew={handleAddNewAddress}
                      />
                    </div>
                  ) : (
                  <>
                  {/* New customer or "add new address" mode: Show address form */}
                  {isLoggedIn && showNewAddressForm && (
                    <div className="flex items-center justify-between mb-[16px]">
                      <h3 className="font-['Inter',sans-serif] font-medium text-[18px] text-[#003b3c]">
                        New Shipping Address
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowNewAddressForm(false)}
                        className="font-['Inter',sans-serif] text-[14px] text-[#009296] underline hover:no-underline"
                      >
                        ← Back to saved addresses
                      </button>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-[16px]">
                    <FormField
                      label="First Name"
                      value={firstName}
                      onChange={setFirstName}
                      onBlur={() => handleBlur('firstName', firstName)}
                      error={touched.firstName ? errors.firstName : undefined}
                      required
                      isValid={isFieldValid('firstName', firstName)}
                    />
                    <FormField
                      label="Last Name"
                      value={lastName}
                      onChange={setLastName}
                      onBlur={() => handleBlur('lastName', lastName)}
                      error={touched.lastName ? errors.lastName : undefined}
                      required
                      isValid={isFieldValid('lastName', lastName)}
                    />
                  </div>
                  <FormField
                    label="Address"
                    value={address}
                    onChange={setAddress}
                    onBlur={() => handleBlur('address', address)}
                    error={touched.address ? errors.address : undefined}
                    required
                    isValid={isFieldValid('address', address)}
                  />
                  <FormField
                    label="Apartment, suite, etc."
                    value={apartment}
                    onChange={setApartment}
                    isValid={apartment.length > 0}
                  />
                  <div className="grid grid-cols-3 gap-[16px]">
                    <FormField
                      label="City"
                      value={city}
                      onChange={setCity}
                      onBlur={() => handleBlur('city', city)}
                      error={touched.city ? errors.city : undefined}
                      required
                      isValid={isFieldValid('city', city)}
                    />
                    <SelectField
                      label="State"
                      value={state}
                      onChange={setState}
                      onBlur={() => handleBlur('state', state)}
                      error={touched.state ? errors.state : undefined}
                      required
                      options={stateOptions}
                    />
                    <FormField
                      label="ZIP Code"
                      value={zipCode}
                      onChange={setZipCode}
                      onBlur={() => handleBlur('zipCode', zipCode)}
                      error={touched.zipCode ? errors.zipCode : undefined}
                      required
                      isValid={isFieldValid('zipCode', zipCode)}
                    />
                  </div>
                  <FormField
                    label="Phone"
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={() => handleBlur('phone', phone)}
                    error={touched.phone ? errors.phone : undefined}
                    required
                    isValid={isFieldValid('phone', phone)}
                    placeholder="(555) 123-4567"
                  />
                  <label className="flex items-center gap-[12px] cursor-pointer mt-[24px]">
                    <input
                      type="checkbox"
                      checked={billingMatchesShipping}
                      onChange={(e) => setBillingMatchesShipping(e.target.checked)}
                      className="custom-checkout-checkbox"
                    />
                    <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] leading-[1.4]">
                      Billing address same as shipping address
                    </span>
                  </label>

                  {/* Billing Address Form - Expands when checkbox is unchecked */}
                  {!billingMatchesShipping && (
                    <div className="mt-[44px] space-y-[16px]">
                      <h3 className="font-['Inter',sans-serif] font-medium text-[16px] text-[#003b3c] mb-[12px]">
                        What's your billing address?
                      </h3>
                      <div className="grid grid-cols-2 gap-[16px]">
                        <FormField
                          label="First Name"
                          value={billingFirstName}
                          onChange={setBillingFirstName}
                          onBlur={() => handleBlur('billingFirstName', billingFirstName)}
                          error={touched.billingFirstName ? errors.billingFirstName : undefined}
                          required
                          isValid={isFieldValid('billingFirstName', billingFirstName)}
                        />
                        <FormField
                          label="Last Name"
                          value={billingLastName}
                          onChange={setBillingLastName}
                          onBlur={() => handleBlur('billingLastName', billingLastName)}
                          error={touched.billingLastName ? errors.billingLastName : undefined}
                          required
                          isValid={isFieldValid('billingLastName', billingLastName)}
                        />
                      </div>
                      <FormField
                        label="Address"
                        value={billingAddress}
                        onChange={setBillingAddress}
                        onBlur={() => handleBlur('billingAddress', billingAddress)}
                        error={touched.billingAddress ? errors.billingAddress : undefined}
                        required
                        isValid={isFieldValid('billingAddress', billingAddress)}
                      />
                      <FormField
                        label="Apartment, suite, etc."
                        value={billingApartment}
                        onChange={setBillingApartment}
                        isValid={billingApartment.length > 0}
                      />
                      <div className="grid grid-cols-3 gap-[16px]">
                        <FormField
                          label="City"
                          value={billingCity}
                          onChange={setBillingCity}
                          onBlur={() => handleBlur('billingCity', billingCity)}
                          error={touched.billingCity ? errors.billingCity : undefined}
                          required
                          isValid={isFieldValid('billingCity', billingCity)}
                        />
                        <SelectField
                          label="State"
                          value={billingState}
                          onChange={setBillingState}
                          onBlur={() => handleBlur('billingState', billingState)}
                          error={touched.billingState ? errors.billingState : undefined}
                          required
                          options={stateOptions}
                        />
                        <FormField
                          label="ZIP Code"
                          value={billingZipCode}
                          onChange={setBillingZipCode}
                          onBlur={() => handleBlur('billingZipCode', billingZipCode)}
                          error={touched.billingZipCode ? errors.billingZipCode : undefined}
                          required
                          isValid={isFieldValid('billingZipCode', billingZipCode)}
                        />
                      </div>
                    </div>
                  )}
                  </>
                  )}
                  </>
                  )}

                </div>
              </div>

              {/* Divider */}
              {!emailRecognized && <div className="border-t border-[#D9E2E2]"></div>}

              {/* Shipping */}
              {!emailRecognized && (
              <div>
                <h2 className="font-['STIX_Two_Text',sans-serif] text-[32px] text-[#003b3c] mb-[20px]" style={{ fontWeight: 500 }}>
                  Shipping
                </h2>
                <div className="space-y-[12px]">
                  {/* Standard Shipping - Always FREE */}
                  <label 
                    className={`flex items-center justify-between p-[16px] rounded-[8px] cursor-pointer transition-all border-2 ${
                      shippingMethod === 'standard'
                        ? 'border-[#009296] bg-[#F5F9F9]'
                        : 'border-[#D9E2E2]'
                    }`}
                  >
                    <div className="flex items-center gap-[12px]">
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="custom-checkout-radio"
                      />
                      <div>
                        <p className="font-['Inter',sans-serif] font-medium text-[14px] l:text-[15px] xl:text-[16px] text-[#003b3c]">
                          Standard Shipping
                        </p>
                        <p className="font-['Inter',sans-serif] text-[12px] l:text-[13px] xl:text-[14px] text-[#406c6d]">
                          5-7 business days
                        </p>
                      </div>
                    </div>
                    <span className="font-['Inter',sans-serif] font-medium text-[14px] l:text-[15px] xl:text-[16px] text-[#003b3c]">
                      FREE
                    </span>
                  </label>

                  {/* UPS Ground */}
                  <label 
                    className={`flex items-center justify-between p-[16px] rounded-[8px] cursor-pointer transition-all border-2 ${
                      shippingMethod === 'ups-ground'
                        ? 'border-[#009296] bg-[#F5F9F9]'
                        : 'border-[#D9E2E2]'
                    }`}
                  >
                    <div className="flex items-center gap-[12px]">
                      <input
                        type="radio"
                        name="shipping"
                        value="ups-ground"
                        checked={shippingMethod === 'ups-ground'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="custom-checkout-radio"
                      />
                      <div>
                        <p className="font-['Inter',sans-serif] font-medium text-[14px] l:text-[15px] xl:text-[16px] text-[#003b3c]">
                          UPS Ground
                        </p>
                        <p className="font-['Inter',sans-serif] text-[12px] l:text-[13px] xl:text-[14px] text-[#406c6d]">
                          3-5 business days
                        </p>
                      </div>
                    </div>
                    <span className="font-['Inter',sans-serif] font-medium text-[14px] l:text-[15px] xl:text-[16px] text-[#003b3c]">
                      $8.99
                    </span>
                  </label>

                  {/* UPS 2nd Day Air (Expedited) */}
                  <label 
                    className={`flex items-center justify-between p-[16px] rounded-[8px] cursor-pointer transition-all border-2 ${
                      shippingMethod === 'ups-expedited'
                        ? 'border-[#009296] bg-[#F5F9F9]'
                        : 'border-[#D9E2E2]'
                    }`}
                  >
                    <div className="flex items-center gap-[12px]">
                      <input
                        type="radio"
                        name="shipping"
                        value="ups-expedited"
                        checked={shippingMethod === 'ups-expedited'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="custom-checkout-radio"
                      />
                      <div>
                        <p className="font-['Inter',sans-serif] font-medium text-[14px] l:text-[15px] xl:text-[16px] text-[#003b3c]">
                          UPS 2nd Day Air
                        </p>
                        <p className="font-['Inter',sans-serif] text-[12px] l:text-[13px] xl:text-[14px] text-[#406c6d]">
                          2 business days
                        </p>
                      </div>
                    </div>
                    <span className="font-['Inter',sans-serif] font-medium text-[14px] l:text-[15px] xl:text-[16px] text-[#003b3c]">
                      $14.99
                    </span>
                  </label>
                </div>
              </div>
              )}

              {/* Divider */}
              {!emailRecognized && <div className="border-t border-[#D9E2E2]"></div>}

              {/* Payment */}
              {!emailRecognized && (
              <div>
                <h2 className="font-['STIX_Two_Text',sans-serif] text-[32px] l:text-[36px] xl:text-[40px] hd:text-[44px] text-[#003b3c] mb-[20px]" style={{ fontWeight: 500 }}>
                  Payment
                </h2>
                
                {/* Logged-in users: Show saved payment methods */}
                {isLoggedIn && !showNewPaymentForm ? (
                  <SavedPaymentSelector
                    paymentMethods={savedPaymentMethods}
                    selectedId={selectedPaymentId}
                    onSelect={setSelectedPaymentId}
                    onEdit={(id) => setEditingPaymentId(id)}
                    onDelete={(id) => alert(`Delete payment method ${id} - This would show a confirmation dialog in production`)}
                    onAddNew={() => setShowNewPaymentForm(true)}
                    cvv={savedCardCvv}
                    onCvvChange={setSavedCardCvv}
                    onCvvBlur={() => setTouched({ ...touched, savedCardCvv: true })}
                  />
                ) : (
                <>
                {/* New customer or "add new card" mode: Show payment form */}
                {isLoggedIn && showNewPaymentForm && (
                  <div className="flex items-center justify-between mb-[16px]">
                    <h3 className="font-['Inter',sans-serif] font-medium text-[18px] text-[#003b3c]">
                      New Payment Method
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowNewPaymentForm(false)}
                      className="font-['Inter',sans-serif] text-[14px] text-[#009296] underline hover:no-underline"
                    >
                      ← Back to saved cards
                    </button>
                  </div>
                )}
                <div className="space-y-[16px]">
                  <FormField
                    label="Name on Card"
                    value={nameOnCard}
                    onChange={setNameOnCard}
                    onBlur={() => handleBlur('nameOnCard', nameOnCard)}
                    error={touched.nameOnCard ? errors.nameOnCard : undefined}
                    required
                    isValid={isFieldValid('nameOnCard', nameOnCard)}
                  />
                  <FormField
                    label="Card Number"
                    value={cardNumber}
                    onChange={setCardNumber}
                    onBlur={() => handleBlur('cardNumber', cardNumber)}
                    error={touched.cardNumber ? errors.cardNumber : undefined}
                    required
                    isValid={isFieldValid('cardNumber', cardNumber)}
                  />
                  <div className="grid grid-cols-2 gap-[16px]">
                    <FormField
                      label="MM/YY"
                      value={expiry}
                      onChange={(value) => {
                        // Remove any non-digit characters except the slash
                        const cleaned = value.replace(/[^\d]/g, '');
                        
                        // Limit to 4 digits
                        const limited = cleaned.slice(0, 4);
                        
                        // Auto-format with slash after 2 digits
                        let formatted = limited;
                        if (limited.length >= 2) {
                          formatted = limited.slice(0, 2) + '/' + limited.slice(2);
                        }
                        
                        setExpiry(formatted);
                      }}
                      onBlur={() => handleBlur('expiry', expiry)}
                      error={touched.expiry ? errors.expiry : undefined}
                      required
                      isValid={isFieldValid('expiry', expiry)}
                    />
                    <div>
                      <FormField
                        label="Security Code"
                        value={securityCode}
                        onChange={setSecurityCode}
                        onBlur={() => handleBlur('securityCode', securityCode)}
                        error={touched.securityCode ? errors.securityCode : undefined}
                        required
                        isValid={isFieldValid('securityCode', securityCode)}
                      />
                      <div 
                        className="relative mt-[6px] text-right"
                        onMouseEnter={() => setShowSecurityCodeTooltip(true)}
                        onMouseLeave={() => setShowSecurityCodeTooltip(false)}
                      >
                        <button
                          type="button"
                          className="font-['Inter',sans-serif] text-[12px] text-[#003b3c] underline hover:no-underline inline-block"
                        >
                          Where's my Security Code?
                        </button>
                        {showSecurityCodeTooltip && (
                          <div className="absolute right-0 top-full mt-[4px] bg-[#003b3c] text-white rounded-[8px] px-[12px] py-[8px] font-['Inter',sans-serif] text-[12px] whitespace-nowrap z-10 shadow-lg pointer-events-none">
                            The 3-digit security code usually found on the back of your card.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                </>
                )}
              </div>
              )}

              {/* Divider */}
              {!isLoggedIn && email && email.length > 0 && !emailRecognized && <div className="border-t border-[#D9E2E2]"></div>}

              {/* Account Creation - Only show if not logged in and email is filled and not in recognition mode */}
              {!isLoggedIn && email && email.length > 0 && !emailRecognized && <div>
                <h2 className="font-['STIX_Two_Text',sans-serif] text-[32px] text-[#003b3c] mb-[8px]" style={{ fontWeight: 500 }}>
                  Complete Your Order
                </h2>
                <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[20px]">
                  We'll create your account for easy reordering and shipment tracking.
                </p>
                <div className="space-y-[16px]">
                  {/* Email (pre-filled from shipping) */}
                  <div className="relative">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full py-[18px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors bg-[#F5F9F9] border-[#D9E2E2]"
                      />
                      <label className="absolute left-[12px] top-[-8px] px-[4px] bg-white font-['Inter',sans-serif] text-[12px] text-[#406c6d] pointer-events-none">
                        Email
                      </label>
                      <div className="absolute right-[16px] top-1/2 -translate-y-1/2">
                        <div className="w-[20px] h-[20px] rounded-full bg-[#4CAF50] flex items-center justify-center">
                          <Check className="w-[12px] h-[12px] text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Password with show/hide toggle */}
                  <div className="relative">
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          const newPassword = e.target.value;
                          setPassword(newPassword);
                          setPasswordStrength(calculatePasswordStrength(newPassword));
                        }}
                        onFocus={() => setPasswordStrength(calculatePasswordStrength(password))}
                        onBlur={() => {
                          handleBlur('password', password);
                          if (password.length === 0) setPasswordStrength('');
                        }}
                        className={`w-full py-[18px] px-[16px] pr-[48px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors placeholder:text-transparent ${
                          touched.password && errors.password
                            ? 'border-[#D84315] hover:border-[#D84315] focus:border-[#D84315]'
                            : 'border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]'
                        }`}
                        aria-invalid={errors.password ? 'true' : 'false'}
                      />
                      {password.length > 0 && (
                        <label className="absolute left-[12px] top-[-8px] px-[4px] bg-white font-['Inter',sans-serif] text-[12px] text-[#406c6d] pointer-events-none">
                          Create Password *
                        </label>
                      )}
                      {password.length === 0 && (
                        <label className="absolute left-[16px] top-[18px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#406c6d] pointer-events-none transition-all duration-200">
                          Create Password *
                        </label>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#406c6d] hover:text-[#003b3c] transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="w-[20px] h-[20px]" />
                        ) : (
                          <Eye className="w-[20px] h-[20px]" />
                        )}
                      </button>
                    </div>
                    
                    {/* Password strength indicator */}
                    {passwordStrength && (
                      <div className="mt-[6px]">
                        <div className="flex gap-[4px] mb-[4px]">
                          <div className={`h-[4px] flex-1 rounded-full transition-colors ${
                            passwordStrength === 'weak' ? 'bg-[#D84315]' : 
                            passwordStrength === 'medium' ? 'bg-[#FF9800]' : 
                            'bg-[#4CAF50]'
                          }`}></div>
                          <div className={`h-[4px] flex-1 rounded-full transition-colors ${
                            passwordStrength === 'medium' || passwordStrength === 'strong' ? 
                            passwordStrength === 'medium' ? 'bg-[#FF9800]' : 'bg-[#4CAF50]' : 
                            'bg-[#E5E5E5]'
                          }`}></div>
                          <div className={`h-[4px] flex-1 rounded-full transition-colors ${
                            passwordStrength === 'strong' ? 'bg-[#4CAF50]' : 'bg-[#E5E5E5]'
                          }`}></div>
                        </div>
                        <p className={`font-['Inter',sans-serif] text-[12px] ${
                          passwordStrength === 'weak' ? 'text-[#D84315]' :
                          passwordStrength === 'medium' ? 'text-[#FF9800]' :
                          'text-[#4CAF50]'
                        }`}>
                          {passwordStrength === 'weak' && 'Weak password - add more characters'}
                          {passwordStrength === 'medium' && 'Medium strength'}
                          {passwordStrength === 'strong' && 'Strong password'}
                        </p>
                      </div>
                    )}
                    
                    {touched.password && errors.password && (
                      <p className="font-['Inter',sans-serif] text-[12px] text-[#D84315] mt-[6px]">
                        {errors.password}
                      </p>
                    )}
                    
                    {!errors.password && (
                      <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] mt-[6px]">
                        At least 8 characters
                      </p>
                    )}
                  </div>
                </div>
              </div>}

              {/* Place Order Button */}
              <div>
                <p className="font-['Inter',sans-serif] text-[12px] l:text-[13px] xl:text-[14px] text-[#406c6d] text-left mb-[12px]">
                  By clicking Place Order, you agree to our <button type="button" className="text-[#406c6d] underline hover:no-underline font-['Inter',sans-serif] text-[12px] l:text-[13px] xl:text-[14px]">Terms and Conditions</button>.
                </p>
                <button
                  type="submit"
                  disabled={!isFormComplete() || isPlacingOrder}
                  className={`w-full h-[56px] rounded-[999px] flex items-center justify-center gap-[8px] transition-colors ${
                    isFormComplete() && !isPlacingOrder
                      ? 'bg-[#009296] hover:bg-[#007d81] cursor-pointer'
                      : 'bg-[#C2CFCF] cursor-not-allowed'
                  }`}
                >
                  {isPlacingOrder && (
                    <Loader2 className="w-[20px] h-[20px] text-white animate-spin" />
                  )}
                  <span className="font-['Inter',sans-serif] font-medium text-[16px] text-white tracking-[1.92px] uppercase">
                    {isPlacingOrder 
                      ? 'Processing Order...' 
                      : (isLoggedIn ? 'Place Order' : 'Place Order & Create Account')
                    }
                  </span>
                </button>
                
                {/* Trust Badges */}
                <div className="mt-[24px] flex flex-wrap items-center justify-center gap-[20px] text-[#406c6d]">
                  <div className="flex items-center gap-[6px]">
                    <Shield className="w-[16px] h-[16px]" />
                    <span className="font-['Inter',sans-serif] text-[12px] l:text-[13px] xl:text-[14px]">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <Truck className="w-[16px] h-[16px]" />
                    <span className="font-['Inter',sans-serif] text-[12px] l:text-[13px] xl:text-[14px]">Free Returns</span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <Phone className="w-[16px] h-[16px]" />
                    <span className="font-['Inter',sans-serif] text-[12px] l:text-[13px] xl:text-[14px]">Customer Support</span>
                  </div>
                </div>
              </div>
            </form>
            )}
          </div>

          {/* Right Column - Order Summary (Desktop) */}
          <div className="order-1 lg:order-2 hidden lg:block">
            <div className="lg:sticky lg:top-[40px]">
              <OrderSummary
                items={items}
                onUpdateQuantity={onUpdateQuantity}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                discount={discount}
                total={total}
                hasUnlockedFreeShipping={hasUnlockedFreeShipping}
                remaining={remaining}
                progress={progress}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                promoApplied={promoApplied}
                promoError={promoError}
                setPromoError={setPromoError}
                handleApplyPromo={handleApplyPromo}
              />
            </div>
          </div>
          </div>
        </div>
      </div>
      
      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[16px]">
          <div className="bg-white rounded-[16px] max-w-[480px] w-full p-[32px] relative">
            {/* Close button */}
            <button
              onClick={handleCloseForgotPassword}
              className="absolute top-[16px] right-[16px] text-[#406c6d] hover:text-[#003b3c] transition-colors"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {!forgotPasswordSubmitted ? (
              <>
                {/* Header */}
                <div className="mb-[24px]">
                  <h2 className="font-['Inter',sans-serif] text-[24px] font-medium text-[#003b3c] mb-[8px]">
                    Reset Your Password
                  </h2>
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleForgotPasswordSubmit}>
                  <div className="mb-[24px]">
                    <label className="block font-['Inter',sans-serif] text-[14px] text-[#003b3c] mb-[8px]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={forgotPasswordEmail}
                      onChange={(e) => {
                        setForgotPasswordEmail(e.target.value);
                        setForgotPasswordError('');
                      }}
                      placeholder="your.email@example.com"
                      className={`w-full h-[56px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] text-[#003b3c] placeholder:text-[#999999] focus:outline-none transition-colors ${
                        forgotPasswordError
                          ? 'border-[#D84315] focus:border-[#D84315]'
                          : 'border-[#D9E2E2] focus:border-[#003b3c]'
                      }`}
                      autoFocus
                    />
                    {forgotPasswordError && (
                      <p className="font-['Inter',sans-serif] text-[12px] text-[#D84315] mt-[8px]">
                        {forgotPasswordError}
                      </p>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-[12px]">
                    <button
                      type="button"
                      onClick={handleCloseForgotPassword}
                      className="flex-1 h-[48px] rounded-[8px] border border-[#009296] text-[#009296] hover:bg-[#F5F9F9] transition-colors font-['Inter',sans-serif] font-medium text-[16px] tracking-[1.92px] uppercase flex items-center justify-center"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 h-[48px] rounded-[8px] bg-[#009296] hover:bg-[#007d81] transition-colors font-['Inter',sans-serif] font-medium text-[16px] text-white tracking-[1.92px] uppercase flex items-center justify-center"
                    >
                      Send Link
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="text-center">
                  <div className="w-[64px] h-[64px] rounded-full bg-[#E8F5F5] flex items-center justify-center mx-auto mb-[24px]">
                    <Check className="w-[32px] h-[32px] text-[#009296]" />
                  </div>
                  <h2 className="font-['Inter',sans-serif] text-[24px] font-medium text-[#003b3c] mb-[12px]">
                    Check Your Email
                  </h2>
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[8px]">
                    We've sent password reset instructions to:
                  </p>
                  <p className="font-['Inter',sans-serif] text-[14px] font-medium text-[#003b3c] mb-[24px]">
                    {forgotPasswordEmail}
                  </p>
                  <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] mb-[32px]">
                    Didn't receive the email? Check your spam folder or try again with a different email address.
                  </p>
                  <button
                    onClick={handleCloseForgotPassword}
                    className="w-full h-[48px] rounded-[8px] bg-[#009296] hover:bg-[#007d81] transition-colors font-['Inter',sans-serif] font-medium text-[16px] text-white tracking-[1.92px] uppercase flex items-center justify-center"
                  >
                    Got It
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Edit Address Modal */}
      {editingAddressId && savedAddresses.find(a => a.id === editingAddressId) && (
        <EditAddressModal
          address={savedAddresses.find(a => a.id === editingAddressId)!}
          onClose={() => setEditingAddressId(null)}
          onSave={(updatedAddress) => {
            setSavedAddresses(prev => prev.map(a => 
              a.id === editingAddressId ? updatedAddress : a
            ));
            setEditingAddressId(null);
          }}
        />
      )}
      
      {/* Edit Payment Modal */}
      {editingPaymentId && savedPaymentMethods.find(p => p.id === editingPaymentId) && (
        <EditPaymentModal
          payment={savedPaymentMethods.find(p => p.id === editingPaymentId)!}
          onClose={() => setEditingPaymentId(null)}
          onSave={(updatedPayment) => {
            setSavedPaymentMethods(prev => prev.map(p => 
              p.id === editingPaymentId ? updatedPayment : p
            ));
            setEditingPaymentId(null);
          }}
        />
      )}
    </div>
  );
}

function OrderSummary({
  items,
  onUpdateQuantity,
  subtotal,
  shipping,
  tax,
  discount,
  total,
  hasUnlockedFreeShipping,
  remaining,
  progress,
  promoCode,
  setPromoCode,
  promoApplied,
  promoError,
  setPromoError,
  handleApplyPromo,
}: {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  hasUnlockedFreeShipping: boolean;
  remaining: number;
  progress: number;
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoApplied: boolean;
  promoError: string;
  setPromoError: (error: string) => void;
  handleApplyPromo: () => void;
}) {
  return (
    <div className="space-y-[24px] pt-[20px]">
      {/* Free Shipping Progress */}
      {!hasUnlockedFreeShipping && (
        <div className="bg-[#F5F9F9] rounded-[12px] p-[20px]">
          <div className="flex items-center gap-[10px] mb-[12px]">
            <ShippingIcon />
            <p className="font-['Inter',sans-serif] text-[14px] l:text-[15px] xl:text-[16px] text-[#003b3c]">
              <span className="font-medium">${remaining.toFixed(2)}</span> away from free shipping
            </p>
          </div>
          <div className="relative w-full h-[6px] bg-[#D9E2E2] rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-[#009296] transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="space-y-[20px]">
        {items.map((item) => (
          <div key={item.id} className="space-y-[12px]">
            <div className="flex gap-[16px]">
              <div className="w-[80px] h-[80px] rounded-[8px] overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-['Inter',sans-serif] font-medium text-[14px] l:text-[15px] xl:text-[16px] text-[#003b3c] mb-[4px] truncate">
                  {item.name}
                </p>
                <p className="font-['Inter',sans-serif] text-[12px] l:text-[13px] xl:text-[14px] text-[#406c6d] mb-[4px]">
                  {item.count}
                </p>
                <p className="font-['Inter',sans-serif] text-[12px] l:text-[13px] xl:text-[14px] text-[#406c6d]">
                  Quantity: {item.quantity}
                </p>
                {item.frequency && (
                  <div className="flex items-center gap-[6px] mt-[6px]">
                    <div className="bg-[#009296] text-white px-[6px] py-[2px] rounded-[4px]">
                      <p className="font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.5px]">
                        Autoship
                      </p>
                    </div>
                    <p className="font-['Inter',sans-serif] text-[12px] l:text-[13px] xl:text-[14px] text-[#009296]">
                      {item.frequency}
                    </p>
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="font-['Inter',sans-serif] font-medium text-[14px] l:text-[15px] xl:text-[16px] text-[#D84315]">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                {item.originalPrice && item.originalPrice > item.price && (
                  <p className="font-['Inter',sans-serif] text-[12px] l:text-[13px] xl:text-[14px] text-[#406c6d] line-through">
                    ${(item.originalPrice * item.quantity).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
            
            {/* Autoship Benefits - Show for autoship items */}
            {item.frequency && (
              <div className="bg-[#F5F9F9] rounded-[8px] p-[12px] ml-[96px]">
                <div className="space-y-[4px]">
                  <p className="font-['Inter',sans-serif] text-[11px] text-[#003b3c] leading-[1.5]">
                    <span className="font-medium">Next delivery:</span> {(() => {
                      const days = item.frequency.includes('30') ? 30 : item.frequency.includes('60') ? 60 : 90;
                      const nextDate = new Date();
                      nextDate.setDate(nextDate.getDate() + days);
                      return nextDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    })()}
                  </p>
                  <p className="font-['Inter',sans-serif] text-[11px] text-[#406c6d] leading-[1.5]">
                    ✓ Cancel anytime • Skip or reschedule deliveries • Modify frequency
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div>
        <div className="flex gap-[8px]">
          <input
            type="text"
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              setPromoError('');
            }}
            disabled={promoApplied}
            className="flex-1 h-[44px] px-[16px] border border-[#D9E2E2] rounded-[8px] font-['Inter',sans-serif] text-[14px] text-[#003b3c] placeholder:text-[#C2CFCF] focus:outline-none focus:border-[#009296] focus:ring-1 focus:ring-[#009296] transition-colors disabled:bg-[#F5F9F9] disabled:text-[#406c6d]"
          />
          <button
            type="button"
            onClick={handleApplyPromo}
            disabled={promoApplied || !promoCode}
            className="h-[44px] px-[20px] bg-[#003b3c] hover:bg-[#005456] text-white rounded-[8px] font-['Inter',sans-serif] font-medium text-[14px] transition-colors disabled:bg-[#C2CFCF] disabled:cursor-not-allowed"
          >
            {promoApplied ? 'Applied' : 'Apply'}
          </button>
        </div>
        {promoApplied && (
          <p className="font-['Inter',sans-serif] text-[12px] l:text-[13px] xl:text-[14px] text-[#009296] mt-[8px]">
            ✓ Promo code WELCOME10 applied - 10% off
          </p>
        )}
        {promoError && !promoApplied && (
          <p className="font-['Inter',sans-serif] text-[12px] l:text-[13px] xl:text-[14px] text-[#D32F2F] mt-[8px]">
            {promoError}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-[#D9E2E2]"></div>

      {/* Price Breakdown */}
      <div className="space-y-[12px]">
        <div className="flex items-center justify-between">
          <span className="font-['Inter',sans-serif] text-[14px] l:text-[15px] xl:text-[16px] text-[#406c6d]">Subtotal</span>
          <span className="font-['Inter',sans-serif] text-[14px] l:text-[15px] xl:text-[16px] text-[#003b3c]">${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="font-['Inter',sans-serif] text-[14px] l:text-[15px] xl:text-[16px] text-[#406c6d]">Discount</span>
            <span className="font-['Inter',sans-serif] text-[14px] l:text-[15px] xl:text-[16px] text-[#009296]">-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="font-['Inter',sans-serif] text-[14px] l:text-[15px] xl:text-[16px] text-[#406c6d]">Shipping</span>
          <span className="font-['Inter',sans-serif] text-[14px] l:text-[15px] xl:text-[16px] text-[#003b3c]">
            {hasUnlockedFreeShipping ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-['Inter',sans-serif] text-[14px] l:text-[15px] xl:text-[16px] text-[#406c6d]">Tax (estimated)</span>
          <span className="font-['Inter',sans-serif] text-[14px] l:text-[15px] xl:text-[16px] text-[#003b3c]">${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#D9E2E2]"></div>

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="font-['Inter',sans-serif] font-medium text-[16px] l:text-[18px] xl:text-[20px] text-[#003b3c]">Total</span>
        <span className="font-['Inter',sans-serif] font-medium text-[20px] l:text-[22px] xl:text-[24px] text-[#003b3c]">USD ${total.toFixed(2)}</span>
      </div>
    </div>
  );
}