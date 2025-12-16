import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning',
  isLoading = false,
}: ConfirmationModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const getConfirmButtonStyles = () => {
    switch (variant) {
      case 'danger':
        return 'bg-[#dc2626] hover:bg-[#b91c1c] text-white';
      case 'warning':
        return 'bg-[#f59e0b] hover:bg-[#d97706] text-white';
      case 'info':
        return 'bg-[#009296] hover:bg-[#007d81] text-white';
      default:
        return 'bg-[#009296] hover:bg-[#007d81] text-white';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[20px]"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-[8px] p-[30px] md:p-[40px] max-w-[500px] w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Icon */}
        {variant !== 'info' && (
          <div className="flex justify-center mb-[20px]">
            <div className="w-[56px] h-[56px] rounded-full bg-[#FFF4E5] flex items-center justify-center">
              <AlertTriangle className="size-[28px] text-[#f59e0b]" />
            </div>
          </div>
        )}

        {/* Title */}
        <h3 
          id="modal-title"
          className="font-['Inter',sans-serif] text-[#003b3c] text-[22px] mb-[12px] text-center"
        >
          {title}
        </h3>

        {/* Message */}
        <p className="text-[#406c6d] text-[15px] mb-[28px] text-center">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-[12px]">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-[24px] py-[12px] border border-[#D9E2E2] text-[#003b3c] text-[14px] uppercase tracking-[0.05em] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-[24px] py-[12px] text-[14px] uppercase tracking-[0.05em] rounded-[8px] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none ${getConfirmButtonStyles()}`}
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}