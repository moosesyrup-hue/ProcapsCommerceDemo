import { useState } from 'react';
import { Info } from 'lucide-react';
import { motion } from 'motion/react';
import FormField from './FormField';
import FormTextarea from './FormTextarea';

interface ContactFormProps {
  onCancel: () => void;
  onSubmitSuccess: (email: string) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  orderNumber: string;
  message: string;
}

export default function ContactForm({ onCancel, onSubmitSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    orderNumber: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [focusedField, setFocusedField] = useState<string>('');
  const [showOrderNumberTooltip, setShowOrderNumberTooltip] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format phone number as user types: (555) 123-4567
  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Submit form (demo - just console log)
    setIsSubmitting(true);
    console.log('Form submitted:', formData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(formData.email);
    }, 2000);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: '' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Form Title */}
      <h2 className="font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] text-[20px] md:text-[28px] leading-[1.2] mb-[8px]">
        Send us a message
      </h2>
      <p className="font-['Inter',sans-serif] text-[#406c6d] text-[16px] leading-[1.6] mb-[32px] md:mb-[40px]">
        Got a question about product, orders, returns, or anything else? Fill out the form below – we'd love to hear from you.
      </p>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-[20px]">
        <FormField
          id="contact-email"
          label="Email"
          value={formData.email}
          onChange={(value) => updateField('email', value)}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField('')}
          isFocused={focusedField === 'email'}
          error={formErrors.email}
          required
          type="email"
        />
        
        {/* First and Last Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
          <FormField
            id="contact-firstName"
            label="First name"
            value={formData.firstName}
            onChange={(value) => updateField('firstName', value)}
            onFocus={() => setFocusedField('firstName')}
            onBlur={() => setFocusedField('')}
            isFocused={focusedField === 'firstName'}
            error={formErrors.firstName}
            required
          />
          <FormField
            id="contact-lastName"
            label="Last name"
            value={formData.lastName}
            onChange={(value) => updateField('lastName', value)}
            onFocus={() => setFocusedField('lastName')}
            onBlur={() => setFocusedField('')}
            isFocused={focusedField === 'lastName'}
            error={formErrors.lastName}
            required
          />
        </div>
        
        <FormField
          id="contact-phone"
          label="Phone number (optional)"
          value={formData.phone}
          onChange={(value) => updateField('phone', formatPhoneNumber(value))}
          onFocus={() => setFocusedField('phone')}
          onBlur={() => setFocusedField('')}
          isFocused={focusedField === 'phone'}
          type="tel"
        />

        {/* Order Number Field with Info Icon */}
        <div className="relative">
          <div className="relative">
            <FormField
              id="contact-orderNumber"
              label="Order number (optional)"
              value={formData.orderNumber}
              onChange={(value) => updateField('orderNumber', value)}
              onFocus={() => setFocusedField('orderNumber')}
              onBlur={() => setFocusedField('')}
              isFocused={focusedField === 'orderNumber'}
            />
            {/* Info Icon */}
            <div 
              className="absolute right-[16px] top-[18px] z-10"
              onMouseEnter={() => setShowOrderNumberTooltip(true)}
              onMouseLeave={() => setShowOrderNumberTooltip(false)}
            >
              <Info className="w-[18px] h-[18px] text-[#406c6d] hover:text-[#009296] transition-colors cursor-pointer" />
            </div>
          </div>
          {/* Tooltip */}
          {showOrderNumberTooltip && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute z-20 right-0 mt-[8px] w-[280px] md:w-[320px] bg-[#003b3c] text-white px-[16px] py-[12px] rounded-[8px] shadow-lg"
            >
              <p className="font-['Inter',sans-serif] text-[14px] leading-[1.5]">
                Your order number can be found in your order confirmation email or in your account under "Order History".
              </p>
              {/* Arrow */}
              <div className="absolute top-[-6px] right-[20px] w-[12px] h-[12px] bg-[#003b3c] transform rotate-45" />
            </motion.div>
          )}
        </div>

        <FormTextarea
          id="contact-message"
          label="Message"
          value={formData.message}
          onChange={(value) => updateField('message', value)}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField('')}
          isFocused={focusedField === 'message'}
          error={formErrors.message}
          required
        />

        {/* Form Buttons */}
        <div className="flex flex-col sm:flex-row gap-[12px] pt-[12px]">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-white text-[#003b3c] border border-[#D9E2E2] rounded-full px-[24px] py-[14px] font-['Inter:Medium',sans-serif] font-medium text-[15px] md:text-[16px] hover:border-[#003b3c] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#009296] text-white rounded-full px-[24px] py-[14px] font-['Inter:Medium',sans-serif] font-medium text-[15px] md:text-[16px] hover:bg-[#00b4ae] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
