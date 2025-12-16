import { useState, useEffect } from 'react';
import { PenLine, Plus, MapPin, CreditCard, Trash2, User, Key, Home } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import AddressFormModal from '../shared/AddressFormModal';
import PaymentMethodFormModal from '../shared/PaymentMethodFormModal';
import ConfirmationModal from './ConfirmationModal';

interface ProfileSectionProps {
  userEmail: string;
  isNewCustomer?: boolean;
}

interface Address {
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

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'discover';
  last4: string;
  nameOnCard: string;
  expiry: string;
  isDefault: boolean;
}

export default function ProfileSection({ userEmail, isNewCustomer = false }: ProfileSectionProps) {
  const { breakpoint } = useBreakpoint();
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  // Address modal states
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressModalMode, setAddressModalMode] = useState<'add' | 'edit'>('add');
  const [editingAddress, setEditingAddress] = useState<Address | undefined>(undefined);
  
  // Payment modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentModalMode, setPaymentModalMode] = useState<'add' | 'edit'>('add');
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | undefined>(undefined);
  
  // Delete confirmation states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: 'address' | 'payment', id: string, name: string }>({ type: 'address', id: '', name: '' });
  
  // Mock user data - replace with real data from your backend
  const isDemoUser = userEmail === 'demo@andrewlessman.com';
  
  const userData = {
    firstName: isDemoUser ? 'Andrew' : '',
    lastName: isDemoUser ? 'Lessman' : '',
    dateOfBirth: isDemoUser ? '1956-03-15' : '',
    gender: isDemoUser ? 'male' : '',
    phone: isDemoUser ? '(555) 123-4567' : '',
  };

  // Check if profile has any data
  const hasPersonalInfo = userData.firstName || userData.lastName || userData.phone;

  // Initialize form fields when editing
  const handleEditClick = () => {
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setPhoneNumber(userData.phone);
    setIsEditingPersonal(true);
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
    setPhoneNumber(formatted);
  };

  // State for addresses and payment methods
  const initialAddresses: Address[] = (isDemoUser && !isNewCustomer) ? [
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
  ] : [];

  const initialPaymentMethods: PaymentMethod[] = (isDemoUser && !isNewCustomer) ? [
    {
      id: 'card-1',
      type: 'visa',
      last4: '4242',
      nameOnCard: 'Andrew Lessman',
      expiry: '12/25',
      isDefault: true,
    },
  ] : [];

  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);

  // Update addresses and payment methods when isNewCustomer changes
  useEffect(() => {
    const newAddresses: Address[] = (isDemoUser && !isNewCustomer) ? [
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
    ] : [];

    const newPaymentMethods: PaymentMethod[] = (isDemoUser && !isNewCustomer) ? [
      {
        id: 'card-1',
        type: 'visa',
        last4: '4242',
        nameOnCard: 'Andrew Lessman',
        expiry: '12/25',
        isDefault: true,
      },
    ] : [];

    setAddresses(newAddresses);
    setPaymentMethods(newPaymentMethods);
  }, [isNewCustomer, isDemoUser]);

  // Delete handlers
  const handleDeleteAddress = (id: string) => {
    const address = addresses.find((a) => a.id === id);
    if (address) {
      setItemToDelete({ type: 'address', id, name: `${address.firstName} ${address.lastName}` });
      setShowDeleteModal(true);
    }
  };

  const handleDeletePayment = (id: string) => {
    const method = paymentMethods.find((m) => m.id === id);
    if (method) {
      setItemToDelete({
        type: 'payment',
        id,
        name: `${method.type === 'visa' ? 'Visa' : method.type === 'mastercard' ? 'Mastercard' : 'Card'} •••• ${method.last4}`,
      });
      setShowDeleteModal(true);
    }
  };

  // Set as default handlers
  const handleSetDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    const address = addresses.find((a) => a.id === id);
    toast.success(`${address?.firstName} ${address?.lastName} set as default address`);
  };

  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
    const method = paymentMethods.find((m) => m.id === id);
    toast.success(`${method?.type === 'visa' ? 'Visa' : method?.type === 'mastercard' ? 'Mastercard' : 'Card'} •••• ${method?.last4} set as default`);
  };

  const handleAddAddress = () => {
    setAddressModalMode('add');
    setShowAddressModal(true);
  };

  const handleAddPayment = () => {
    setPaymentModalMode('add');
    setShowPaymentModal(true);
  };

  const getCardIcon = (type: string) => {
    if (type === 'visa') {
      return (
        <div className="flex items-center justify-center bg-[#1A1F71] px-[6px] py-[3px] rounded-[2px] min-w-[32px]">
          <span className="text-white font-['Arial',sans-serif] text-[11px] tracking-[0.5px]" style={{ fontWeight: 700 }}>VISA</span>
        </div>
      );
    }
    if (type === 'mastercard') {
      return (
        <div className="h-[24px] flex items-center gap-[2px]">
          <div className="w-[20px] h-[20px] rounded-full bg-[#EB001B]"></div>
          <div className="w-[20px] h-[20px] rounded-full bg-[#F79E1B] -ml-[10px]"></div>
        </div>
      );
    }
    return null;
  };

  // Get responsive headline sizing based on breakpoint
  const headlineSize = breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[54px]' : breakpoint === 'L' ? 'text-[38px]' : breakpoint === 'M' ? 'text-[34px]' : 'text-[28px]';
  const headlineTracking = breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : breakpoint === 'L' ? 'tracking-[-0.76px]' : breakpoint === 'M' ? 'tracking-[-0.68px]' : 'tracking-[-0.56px]';

  return (
    <div className="space-y-[20px]">
      {/* Page Title */}
      <div className="mb-[40px]">
        <h1 className={`font-['STIX_Two_Text',sans-serif] font-medium leading-[1.1] ${headlineSize} ${headlineTracking} text-[#003b3c]`}>
          Profile
        </h1>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
        {/* Left Column: Personal Details & Password */}
        <div className="space-y-[20px]">
          {/* Personal Details Card */}
          <div className="bg-white rounded-[8px] p-[30px] md:p-[40px]">
            <div className="flex items-center justify-between gap-[12px] mb-[24px] pb-[24px] border-b border-[#D9E2E2]">
              <div className="flex items-center gap-[12px]">
                <User className="size-[24px] text-[#009296]" />
                <h3 className="font-['Inter',sans-serif] font-medium text-[#003b3c] text-[20px] leading-[1.2]">
                  Personal Details
                </h3>
              </div>
              <div className="h-[40px] flex items-center">
                {!isEditingPersonal && (
                  <button
                    onClick={handleEditClick}
                    className="inline-flex items-center gap-[8px] px-[20px] py-[10px] border border-[#D9E2E2] rounded-full hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
                  >
                    <PenLine className="size-[16px] text-[#003b3c]" />
                    <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                      Edit
                    </span>
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-[20px]">
              {/* Email */}
              <div>
                <label className="block font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[8px]">
                  Email
                </label>
                <p className="font-['Inter',sans-serif] text-[#003b3c]">
                  {userEmail}
                </p>
              </div>

              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                <div>
                  <label className="block font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[8px]">
                    First Name
                  </label>
                  {isEditingPersonal ? (
                    <input
                      type="text"
                      className="w-full py-[18px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  ) : (
                    <p className="font-['Inter',sans-serif] text-[#003b3c]">
                      {userData.firstName || '-'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[8px]">
                    Last Name
                  </label>
                  {isEditingPersonal ? (
                    <input
                      type="text"
                      className="w-full py-[18px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  ) : (
                    <p className="font-['Inter',sans-serif] text-[#003b3c]">
                      {userData.lastName || '-'}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[8px]">
                  Phone Number
                </label>
                {isEditingPersonal ? (
                  <input
                    type="tel"
                    className="w-full py-[18px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]"
                    placeholder="(555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                  />
                ) : (
                  <p className="font-['Inter',sans-serif] text-[#003b3c]">
                    {userData.phone || '-'}
                  </p>
                )}
              </div>

              {isEditingPersonal && (
                <div className="flex gap-[12px] pt-[8px]">
                  <button
                    onClick={() => {
                      setIsEditingPersonal(false);
                      toast.success('Personal details updated');
                    }}
                    className="px-[24px] py-[12px] bg-[#009296] rounded-[8px] hover:bg-[#007d81] transition-colors cursor-pointer focus:outline-none"
                  >
                    <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                      Save Changes
                    </span>
                  </button>
                  <button
                    onClick={() => setIsEditingPersonal(false)}
                    className="px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
                  >
                    <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                      Cancel
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Password Card */}
          <div className="bg-white rounded-[8px] p-[30px] md:p-[40px]">
            <div className="flex items-center justify-between gap-[12px] mb-[24px] pb-[24px] border-b border-[#D9E2E2]">
              <div className="flex items-center gap-[12px]">
                <Key className="size-[24px] text-[#009296]" />
                <h3 className="font-['Inter',sans-serif] font-medium text-[#003b3c] text-[20px] leading-[1.2]">
                  Password
                </h3>
              </div>
              <div className="h-[40px]"></div>
            </div>

            <div className="space-y-[20px]">
              <div>
                <label className="block font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[8px]">
                  Email
                </label>
                <p className="font-['Inter',sans-serif] text-[#003b3c]">
                  {userEmail}
                </p>
              </div>

              <div>
                <label className="block font-['Inter',sans-serif] text-[14px] text-[#406c6d] uppercase tracking-[0.05em] mb-[8px]">
                  Password
                </label>
                <p className="font-['Inter',sans-serif] text-[#003b3c]">
                  ••••••••
                </p>
              </div>

              {passwordResetSent ? (
                <div className="bg-[#E8F5E9] rounded-[8px] p-[16px]">
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#2E7D32]">
                    Password reset link sent to {userEmail}
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => setShowResetPasswordModal(true)}
                  className="inline-flex items-center gap-[8px] px-[20px] py-[10px] border border-[#D9E2E2] rounded-full hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
                >
                  <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                    Reset Password
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Saved Addresses & Payment Methods */}
        <div className="space-y-[20px]">
          {/* Saved Addresses Card */}
          <div className="bg-white rounded-[8px] p-[30px] md:p-[40px]">
            <div className="flex items-center justify-between gap-[12px] mb-[24px] pb-[24px] border-b border-[#D9E2E2]">
              <div className="flex items-center gap-[12px]">
                <Home className="size-[24px] text-[#009296]" />
                <h3 className="font-['Inter',sans-serif] font-medium text-[#003b3c] text-[20px] leading-[1.2]">
                  Saved Addresses
                </h3>
              </div>
              <div className="h-[40px] flex items-center">
                <button
                  onClick={handleAddAddress}
                  className="inline-flex items-center gap-[8px] px-[20px] py-[10px] border border-[#D9E2E2] rounded-full hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
                >
                  <Plus className="size-[16px] text-[#003b3c]" />
                  <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                    Add
                  </span>
                </button>
              </div>
            </div>

            {addresses.length > 0 ? (
              <div className="space-y-[16px]">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="border border-[#D9E2E2] rounded-[8px] p-[16px]"
                  >
                    <div className="flex items-start justify-between mb-[8px]">
                      <div className="flex items-center gap-[8px]">
                        <span className="font-['Inter',sans-serif] font-medium text-[16px] text-[#003b3c]">
                          {address.firstName} {address.lastName}
                        </span>
                        {address.isDefault && (
                          <span className="px-[8px] py-[2px] bg-[#009296] text-white font-['Inter',sans-serif] text-[10px] font-medium tracking-[0.5px] rounded-[4px] uppercase">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-[12px]">
                        <button
                          onClick={() => {
                            setEditingAddress(address);
                            setAddressModalMode('edit');
                            setShowAddressModal(true);
                          }}
                          className="text-[#009296] font-['Inter',sans-serif] text-[12px] underline hover:no-underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-[#406c6d] hover:text-[#ff4444] transition-colors cursor-pointer"
                          aria-label="Delete address"
                        >
                          <Trash2 className="size-[18px]" />
                        </button>
                      </div>
                    </div>
                    <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] leading-[1.5]">
                      {address.address}{address.apartment && `, ${address.apartment}`}<br />
                      {address.city}, {address.state} {address.zipCode}<br />
                      {address.phone}
                    </p>
                    {/* Set as Default Button - Only show for non-default addresses when there are multiple */}
                    {!address.isDefault && addresses.length > 1 && (
                      <button
                        onClick={() => handleSetDefaultAddress(address.id)}
                        className="mt-[12px] inline-flex items-center gap-[6px] text-[#009296] hover:text-[#007d81] transition-colors cursor-pointer focus:outline-none"
                      >
                        <span className="font-['Inter',sans-serif] text-[12px] underline hover:no-underline">
                          Set as Default
                        </span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-[40px]">
                <p className="font-['Inter',sans-serif] text-[#406c6d]">
                  No saved addresses
                </p>
              </div>
            )}
          </div>

          {/* Saved Payment Methods Card */}
          <div className="bg-white rounded-[8px] p-[30px] md:p-[40px]">
            <div className="flex items-center justify-between gap-[12px] mb-[24px] pb-[24px] border-b border-[#D9E2E2]">
              <div className="flex items-center gap-[12px]">
                <CreditCard className="size-[24px] text-[#009296]" />
                <h3 className="font-['Inter',sans-serif] font-medium text-[#003b3c] text-[20px] leading-[1.2]">
                  Saved Payment Methods
                </h3>
              </div>
              <div className="h-[40px] flex items-center">
                <button
                  onClick={handleAddPayment}
                  className="inline-flex items-center gap-[8px] px-[20px] py-[10px] border border-[#D9E2E2] rounded-full hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
                >
                  <Plus className="size-[16px] text-[#003b3c]" />
                  <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                    Add
                  </span>
                </button>
              </div>
            </div>

            {paymentMethods.length > 0 ? (
              <div className="space-y-[16px]">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="border border-[#D9E2E2] rounded-[8px] p-[16px]"
                  >
                    <div className="flex items-start justify-between mb-[8px]">
                      <div className="flex items-center gap-[8px]">
                        {getCardIcon(method.type)}
                        <span className="font-['Inter',sans-serif] font-medium text-[16px] text-[#003b3c]">
                          {method.type === 'visa' ? 'Visa' : method.type === 'mastercard' ? 'Mastercard' : 'Card'} •••• {method.last4}
                        </span>
                        {method.isDefault && (
                          <span className="px-[8px] py-[2px] bg-[#009296] text-white font-['Inter',sans-serif] text-[10px] font-medium tracking-[0.5px] rounded-[4px] uppercase">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-[12px]">
                        <button
                          onClick={() => {
                            setEditingPayment(method);
                            setPaymentModalMode('edit');
                            setShowPaymentModal(true);
                          }}
                          className="text-[#009296] font-['Inter',sans-serif] text-[12px] underline hover:no-underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePayment(method.id)}
                          className="text-[#406c6d] hover:text-[#ff4444] transition-colors cursor-pointer"
                          aria-label="Delete payment method"
                        >
                          <Trash2 className="size-[18px]" />
                        </button>
                      </div>
                    </div>
                    <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] leading-[1.5]">
                      {method.nameOnCard}<br />
                      Expires {method.expiry}
                    </p>
                    {/* Set as Default Button - Only show for non-default payment methods when there are multiple */}
                    {!method.isDefault && paymentMethods.length > 1 && (
                      <button
                        onClick={() => handleSetDefaultPayment(method.id)}
                        className="mt-[12px] inline-flex items-center gap-[6px] text-[#009296] hover:text-[#007d81] transition-colors cursor-pointer focus:outline-none"
                      >
                        <span className="font-['Inter',sans-serif] text-[12px] underline hover:no-underline">
                          Set as Default
                        </span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-[40px]">
                <p className="font-['Inter',sans-serif] text-[#406c6d]">
                  No saved payment methods
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reset Password Modal */}
      {showResetPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[20px]">
          <div className="bg-white rounded-[8px] p-[30px] md:p-[40px] max-w-[500px] w-full">
            <h3 className="font-['Inter',sans-serif] text-[#003b3c] text-[22px] mb-[16px]">
              Reset Password
            </h3>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[24px]">
              We'll send a password reset link to {userEmail}
            </p>
            <div className="flex gap-[12px]">
              <button
                onClick={() => {
                  setPasswordResetSent(true);
                  setShowResetPasswordModal(false);
                  setTimeout(() => setPasswordResetSent(false), 5000);
                }}
                className="flex-1 px-[24px] py-[12px] bg-[#009296] rounded-[8px] hover:bg-[#007d81] transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                  Send Reset Link
                </span>
              </button>
              <button
                onClick={() => setShowResetPasswordModal(false)}
                className="flex-1 px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                  Cancel
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Address Form Modal */}
      {showAddressModal && (
        <AddressFormModal
          isOpen={showAddressModal}
          mode={addressModalMode}
          address={editingAddress}
          onClose={() => {
            setShowAddressModal(false);
            setEditingAddress(undefined);
          }}
          onSave={(newAddress) => {
            if (addressModalMode === 'add') {
              // If this is the first address or isDefault is checked, make it default
              const shouldBeDefault = addresses.length === 0 || newAddress.isDefault;
              
              // If making this default, unset all others
              const updatedAddresses = shouldBeDefault 
                ? addresses.map(addr => ({ ...addr, isDefault: false }))
                : addresses;
              
              const addressWithId = {
                ...newAddress,
                id: `addr-${Date.now()}`,
                isDefault: shouldBeDefault,
              };
              setAddresses([...updatedAddresses, addressWithId]);
              toast.success('Address added successfully');
            } else if (addressModalMode === 'edit' && editingAddress) {
              // If making this default, unset all others
              const updatedAddresses = newAddress.isDefault
                ? addresses.map(addr => ({ ...addr, isDefault: addr.id === editingAddress.id ? newAddress.isDefault : false }))
                : addresses.map(addr => addr.id === editingAddress.id ? { ...newAddress, id: editingAddress.id } : addr);
              
              setAddresses(updatedAddresses);
              toast.success('Address updated successfully');
            }
            setShowAddressModal(false);
            setEditingAddress(undefined);
          }}
        />
      )}

      {/* Payment Method Form Modal */}
      {showPaymentModal && (
        <PaymentMethodFormModal
          isOpen={showPaymentModal}
          mode={paymentModalMode}
          paymentMethod={editingPayment}
          onClose={() => {
            setShowPaymentModal(false);
            setEditingPayment(undefined);
          }}
          onSave={(newPaymentMethod) => {
            if (paymentModalMode === 'add') {
              // If this is the first payment method or isDefault is checked, make it default
              const shouldBeDefault = paymentMethods.length === 0 || newPaymentMethod.isDefault;
              
              // If making this default, unset all others
              const updatedPaymentMethods = shouldBeDefault 
                ? paymentMethods.map(pm => ({ ...pm, isDefault: false }))
                : paymentMethods;
              
              const paymentWithId = {
                ...newPaymentMethod,
                id: `card-${Date.now()}`,
                isDefault: shouldBeDefault,
              };
              setPaymentMethods([...updatedPaymentMethods, paymentWithId]);
              toast.success('Payment method added successfully');
            } else if (paymentModalMode === 'edit' && editingPayment) {
              // If making this default, unset all others
              const updatedPaymentMethods = newPaymentMethod.isDefault
                ? paymentMethods.map(pm => ({ ...pm, isDefault: pm.id === editingPayment.id ? newPaymentMethod.isDefault : false }))
                : paymentMethods.map(pm => pm.id === editingPayment.id ? { ...newPaymentMethod, id: editingPayment.id } : pm);
              
              setPaymentMethods(updatedPaymentMethods);
              toast.success('Payment method updated successfully');
            }
            setShowPaymentModal(false);
            setEditingPayment(undefined);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          title={itemToDelete.type === 'address' ? 'Delete Address?' : 'Delete Payment Method?'}
          message={itemToDelete.type === 'address' 
            ? 'Are you sure you want to delete this address? This action cannot be undone.' 
            : 'Are you sure you want to delete this payment method? This action cannot be undone.'
          }
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            if (itemToDelete.type === 'address') {
              setAddresses(addresses.filter(addr => addr.id !== itemToDelete.id));
              toast.success('Address deleted');
            } else if (itemToDelete.type === 'payment') {
              setPaymentMethods(paymentMethods.filter(pm => pm.id !== itemToDelete.id));
              toast.success('Payment method deleted');
            }
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
}