/**
 * Checkout Page Component
 * Best-in-class checkout experience with all UX best practices
 */

import { useState } from 'react';
import { ChevronLeft, Lock, Truck, Shield, Phone, MessageCircle, Check } from 'lucide-react';
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

  return (
    <div className="relative">
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          className={`w-full h-[56px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] text-[#003b3c] focus:outline-none transition-colors placeholder:text-transparent ${
            showLockIcon ? 'pr-[48px]' : ''
          } ${
            error 
              ? 'border-[#D84315] hover:border-[#D84315] focus:border-[#D84315]' 
              : isValid
              ? 'border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]'
              : 'border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]'
          }`}
          required={required}
        />
        {showLabel && (
          <label 
            className={`absolute left-[12px] top-[-8px] px-[4px] bg-white font-['Inter',sans-serif] text-[12px] pointer-events-none transition-colors ${
              error && isFocused
                ? 'text-[#D84315]'
                : isFocused
                ? 'text-[#003b3c]'
                : 'text-[#406c6d]'
            }`}
          >
            {label}{required ? ' *' : ''}
          </label>
        )}
        {!showLabel && (
          <label 
            className="absolute left-[16px] top-[18px] font-['Inter',sans-serif] text-[16px] text-[#406c6d] pointer-events-none transition-all duration-200"
          >
            {label}{required ? ' *' : ''}
          </label>
        )}
        {showLockIcon && (
          <div className="absolute right-[16px] top-1/2 -translate-y-1/2">
            <Lock className="w-[18px] h-[18px] text-[#406c6d]" />
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
        <p className="font-['Inter',sans-serif] text-[12px] text-[#D84315] mt-[6px]">
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

  return (
    <div className="relative">
      <div className="relative">
        <select
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
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-[#003b3c]">
              {option.label}
            </option>
          ))}
        </select>
        {showLabel && (
          <label 
            className={`absolute left-[12px] top-[-8px] px-[4px] bg-white font-['Inter',sans-serif] text-[12px] pointer-events-none transition-colors ${
              error && isFocused
                ? 'text-[#D84315]'
                : isFocused
                ? 'text-[#003b3c]'
                : 'text-[#406c6d]'
            }`}
          >
            {label}{required ? ' *' : ''}
          </label>
        )}
        {!showLabel && (
          <label 
            className="absolute left-[16px] top-[18px] font-['Inter',sans-serif] text-[16px] text-[#406c6d] pointer-events-none transition-all duration-200"
          >
            {label}{required ? ' *' : ''}
          </label>
        )}
        <div className="absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="#406c6d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {error && (
        <p className="font-['Inter',sans-serif] text-[12px] text-[#D84315] mt-[6px]">
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

export default function CheckoutPage({ items, onUpdateQuantity, onContinueShopping }: CheckoutPageProps) {
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
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [billingMatchesShipping, setBillingMatchesShipping] = useState(true);

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
    }
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
    newErrors.cardNumber = validateCardNumber(cardNumber);
    newErrors.expiry = validateExpiry(expiry);
    newErrors.securityCode = validateSecurityCode(securityCode);
    newErrors.nameOnCard = validateRequired(nameOnCard, 'name on card');

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
      console.log('Order placed!');
      // Handle order submission
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
      cardNumber,
      expiry,
      securityCode,
      nameOnCard,
    };

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
          error = validateSecurityCode(value);
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
        <div className="max-w-[1400px] mx-auto px-[20px] sm:px-[40px] py-[20px]">
          <div className="flex items-center justify-between">
            <Logo onClick={onContinueShopping} />
            <div className="flex items-center gap-[24px]">
              <a 
                href="tel:1-800-800-1200"
                className="flex items-center gap-[8px] text-white hover:opacity-80 transition-opacity"
              >
                <Phone className="w-[18px] h-[18px]" />
                <span className="font-['Inter',sans-serif] text-[14px] hidden sm:inline">1-800-800-1200</span>
              </a>
              <button 
                className="flex items-center gap-[8px] text-white hover:opacity-80 transition-opacity"
                aria-label="Customer service chat"
              >
                <MessageCircle className="w-[20px] h-[20px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Order Summary Toggle */}
      <div className="lg:hidden bg-white border-b border-[#D9E2E2]">
        <button
          onClick={() => setShowOrderSummary(!showOrderSummary)}
          className="w-full px-[20px] py-[16px] flex items-center justify-between"
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
          <div className="px-[20px] pb-[20px] border-t border-[#D9E2E2]">
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
              handleApplyPromo={handleApplyPromo}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-[20px] sm:px-[40px] py-[40px] lg:py-[60px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-[40px] lg:gap-[80px]">
          {/* Left Column - Checkout Form */}
          <div className="order-2 lg:order-1">
            <form onSubmit={handlePlaceOrder} className="space-y-[40px]">
              {/* Delivery */}
              <div>
                <div className="flex items-center justify-between mb-[20px]">
                  <h2 className="font-['STIX_Two_Text',sans-serif] text-[24px] text-[#003b3c]" style={{ fontWeight: 500 }}>
                    Delivery
                  </h2>
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                    Have an account?{' '}
                    <button type="button" className="text-[#009296] hover:underline">
                      Log in
                    </button>
                  </p>
                </div>
                <div className="space-y-[16px]">
                  <FormField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    onBlur={() => handleBlur('email', email)}
                    error={touched.email ? errors.email : undefined}
                    required
                    isValid={isFieldValid('email', email)}
                  />
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
                    onChange={setPhone}
                    onBlur={() => handleBlur('phone', phone)}
                    error={touched.phone ? errors.phone : undefined}
                    required
                    isValid={isFieldValid('phone', phone)}
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
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#D9E2E2]"></div>

              {/* Shipping */}
              <div>
                <h2 className="font-['STIX_Two_Text',sans-serif] text-[24px] text-[#003b3c] mb-[20px]" style={{ fontWeight: 500 }}>
                  Shipping
                </h2>
                <div className="space-y-[12px]">
                  {/* Standard Shipping - Always FREE */}
                  <label 
                    className={`flex items-center justify-between p-[16px] rounded-[8px] cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'bg-[#F5F9F9] border-2 border-[#009296]'
                        : 'bg-white border-2 border-[#D9E2E2]'
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
                        <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[#003b3c]">
                          Standard Shipping
                        </p>
                        <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d]">
                          5-7 business days
                        </p>
                      </div>
                    </div>
                    <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#003b3c]">
                      FREE
                    </span>
                  </label>

                  {/* UPS Ground */}
                  <label 
                    className={`flex items-center justify-between p-[16px] rounded-[8px] cursor-pointer transition-all ${
                      shippingMethod === 'ups-ground'
                        ? 'bg-[#F5F9F9] border-2 border-[#009296]'
                        : 'bg-white border-2 border-[#D9E2E2]'
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
                        <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[#003b3c]">
                          UPS Ground
                        </p>
                        <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d]">
                          3-5 business days
                        </p>
                      </div>
                    </div>
                    <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#003b3c]">
                      $8.99
                    </span>
                  </label>

                  {/* UPS 2nd Day Air (Expedited) */}
                  <label 
                    className={`flex items-center justify-between p-[16px] rounded-[8px] cursor-pointer transition-all ${
                      shippingMethod === 'ups-expedited'
                        ? 'bg-[#F5F9F9] border-2 border-[#009296]'
                        : 'bg-white border-2 border-[#D9E2E2]'
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
                        <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[#003b3c]">
                          UPS 2nd Day Air
                        </p>
                        <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d]">
                          2 business days
                        </p>
                      </div>
                    </div>
                    <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#003b3c]">
                      $14.99
                    </span>
                  </label>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#D9E2E2]"></div>

              {/* Payment */}
              <div>
                <h2 className="font-['STIX_Two_Text',sans-serif] text-[24px] text-[#003b3c] mb-[20px]" style={{ fontWeight: 500 }}>
                  Payment
                </h2>
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
                    showLockIcon
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
              </div>

              {/* Place Order Button */}
              <div>
                <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] text-left mb-[12px]">
                  By clicking Place Order, you agree to our <button type="button" className="text-[#406c6d] underline hover:no-underline font-['Inter',sans-serif] text-[12px]">Terms and Conditions</button>.
                </p>
                <button
                  type="submit"
                  disabled={!isFormComplete()}
                  className={`w-full h-[56px] rounded-[999px] flex items-center justify-center gap-[8px] transition-colors ${
                    isFormComplete()
                      ? 'bg-[#009296] hover:bg-[#007d81] cursor-pointer'
                      : 'bg-[#C2CFCF] cursor-not-allowed'
                  }`}
                >
                  <span className="font-['Inter',sans-serif] font-medium text-[16px] text-white tracking-[1.92px] uppercase">
                    Place Order
                  </span>
                  <Lock className="w-[16px] h-[16px] text-white" />
                </button>
                
                {/* Trust Badges */}
                <div className="mt-[24px] flex flex-wrap items-center justify-center gap-[20px] text-[#406c6d]">
                  <div className="flex items-center gap-[6px]">
                    <Shield className="w-[16px] h-[16px]" />
                    <span className="font-['Inter',sans-serif] text-[12px]">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <Truck className="w-[16px] h-[16px]" />
                    <span className="font-['Inter',sans-serif] text-[12px]">Free Returns</span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <Phone className="w-[16px] h-[16px]" />
                    <span className="font-['Inter',sans-serif] text-[12px]">24/7 Support</span>
                  </div>
                </div>
              </div>
            </form>
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
                handleApplyPromo={handleApplyPromo}
              />
            </div>
          </div>
        </div>
      </div>
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
  handleApplyPromo: () => void;
}) {
  return (
    <div className="space-y-[24px] pt-[20px]">
      {/* Free Shipping Progress */}
      {!hasUnlockedFreeShipping && (
        <div className="bg-[#F5F9F9] rounded-[12px] p-[20px]">
          <div className="flex items-center gap-[10px] mb-[12px]">
            <ShippingIcon />
            <p className="font-['Inter',sans-serif] text-[14px] text-[#003b3c]">
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
          <div key={item.id} className="flex gap-[16px]">
            <div className="w-[80px] h-[80px] rounded-[8px] overflow-hidden shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[#003b3c] mb-[4px] truncate">
                {item.name}
              </p>
              <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] mb-[4px]">
                {item.count}
              </p>
              <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d]">
                Quantity: {item.quantity}
              </p>
              {item.frequency && (
                <p className="font-['Inter',sans-serif] text-[12px] text-[#009296] mt-[4px]">
                  Subscribe & Save: {item.frequency}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[#D84315]">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              {item.originalPrice && item.originalPrice > item.price && (
                <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] line-through">
                  ${(item.originalPrice * item.quantity).toFixed(2)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div>
        <div className="flex gap-[8px]">
          <input
            type="text"
            placeholder="Discount code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={promoApplied}
            className="flex-1 h-[44px] px-[16px] border border-[#D9E2E2] rounded-[8px] font-['Inter',sans-serif] text-[14px] text-[#003b3c] placeholder:text-[#C2CFCF] focus:outline-none focus:border-[#009296] focus:ring-1 focus:ring-[#009296] transition-colors disabled:bg-[#F5F9F9] disabled:text-[#406c6d]"
          />
          <button
            type="button"
            onClick={handleApplyPromo}
            disabled={promoApplied || !promoCode}
            className="h-[44px] px-[20px] bg-[#003b3c] hover:bg-[#005456] text-white rounded-[8px] font-['Inter',sans-serif] font-medium text-[14px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {promoApplied ? 'Applied' : 'Apply'}
          </button>
        </div>
        {promoApplied && (
          <p className="font-['Inter',sans-serif] text-[12px] text-[#009296] mt-[8px]">
            ✓ Discount code applied
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-[#D9E2E2]"></div>

      {/* Price Breakdown */}
      <div className="space-y-[12px]">
        <div className="flex items-center justify-between">
          <span className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">Subtotal</span>
          <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c]">${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">Discount</span>
            <span className="font-['Inter',sans-serif] text-[14px] text-[#009296]">-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">Shipping</span>
          <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c]">
            {hasUnlockedFreeShipping ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">Tax (estimated)</span>
          <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c]">${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#D9E2E2]"></div>

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="font-['Inter',sans-serif] font-medium text-[16px] text-[#003b3c]">Total</span>
        <span className="font-['Inter',sans-serif] font-medium text-[20px] text-[#003b3c]">USD ${total.toFixed(2)}</span>
      </div>
    </div>
  );
}