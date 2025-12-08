interface FormTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
  error?: string;
  required?: boolean;
  rows?: number;
}

export default function FormTextarea({
  id,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  isFocused,
  error,
  required = false,
  rows = 5
}: FormTextareaProps) {
  const hasValue = value.length > 0;
  const showLabel = isFocused || hasValue;

  return (
    <div className="relative">
      <div className="relative">
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          rows={rows}
          className={`w-full py-[18px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors resize-none ${
            error 
              ? 'border-[#D84315] hover:border-[#D84315] focus:border-[#D84315]' 
              : 'border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]'
          }`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {/* Floating label - shown when focused or has value */}
        {showLabel && (
          <label 
            htmlFor={id}
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
            htmlFor={id}
            className="absolute left-[16px] top-[18px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#406c6d] pointer-events-none transition-all duration-200"
          >
            {label}{required && ' *'}
          </label>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="font-['Inter',sans-serif] text-[12px] text-[#D84315] mt-[6px]">
          {error}
        </p>
      )}
    </div>
  );
}
