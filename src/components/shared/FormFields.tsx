/**
 * Shared Form Field Components
 * Extracted from CheckoutPage - the SINGLE source of truth for form styling
 * Used across Checkout, Account Profile, and anywhere we need form inputs
 */

import { useState } from 'react';
import { Check } from 'lucide-react';

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

export function FormField({ label, type = 'text', value, onChange, onBlur, error, required = false, isValid = false, showLockIcon = false }: FormFieldProps) {
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

export function SelectField({ label, value, onChange, onBlur, error, required = false, options }: SelectFieldProps) {
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
        {/* Dropdown arrow icon */}
        <div className="absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#406c6d]">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
