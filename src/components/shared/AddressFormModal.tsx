/**
 * Shared Address Form Modal
 * Used in both Checkout and Account Profile sections
 * Supports both "add" and "edit" modes with consistent UX
 */

import { useState, useEffect } from 'react';
import { FormField, SelectField } from './FormFields';

interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault?: boolean;
}

interface AddressFormModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit';
  address?: Address;
  onClose: () => void;
  onSave: (address: Address) => void;
  title?: string;
  description?: string;
}

export default function AddressFormModal({ 
  isOpen,
  mode,
  address, 
  onClose, 
  onSave,
  title,
  description
}: AddressFormModalProps) {
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editApartment, setEditApartment] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editState, setEditState] = useState('');
  const [editZipCode, setEditZipCode] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editIsDefault, setEditIsDefault] = useState(false);

  useEffect(() => {
    if (address && mode === 'edit') {
      setEditFirstName(address.firstName || '');
      setEditLastName(address.lastName || '');
      setEditAddress(address.address || '');
      setEditApartment(address.apartment || '');
      setEditCity(address.city || '');
      setEditState(address.state || '');
      setEditZipCode(address.zipCode || '');
      setEditPhone(address.phone || '');
      setEditIsDefault(address.isDefault || false);
    } else {
      setEditFirstName('');
      setEditLastName('');
      setEditAddress('');
      setEditApartment('');
      setEditCity('');
      setEditState('');
      setEditZipCode('');
      setEditPhone('');
      setEditIsDefault(false);
    }
  }, [address, mode, isOpen]);

  const handleEditPhoneChange = (value: string) => {
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
      ...(address || {}),
      firstName: editFirstName,
      lastName: editLastName,
      address: editAddress,
      apartment: editApartment,
      city: editCity,
      state: editState,
      zipCode: editZipCode,
      phone: editPhone,
      isDefault: editIsDefault,
    });
  };

  if (!isOpen) return null;
  
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
            {title || (mode === 'add' ? 'Add New Address' : 'Edit Address')}
          </h2>
          <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
            {description || (mode === 'add' ? 'Enter your address details below.' : 'Update your address details below.')}
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

            {/* Set as Default checkbox - only show in profile mode */}
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
                  Set as default address
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
                {mode === 'add' ? 'Add Address' : 'Save Changes'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}