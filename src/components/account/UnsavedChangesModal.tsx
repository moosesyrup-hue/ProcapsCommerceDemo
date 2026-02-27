import { AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onDiscard: () => void;
  productName?: string;
}

export function UnsavedChangesModal({ 
  isOpen, 
  onCancel, 
  onDiscard,
  productName 
}: UnsavedChangesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[9998]"
            onClick={onCancel}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="bg-white rounded-[12px] shadow-2xl max-w-[440px] w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start gap-3 p-6 pb-4">
                <div className="shrink-0 size-[40px] rounded-full bg-[#FFF4E6] flex items-center justify-center">
                  <AlertCircle className="size-[20px] text-[#F59E0B]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-['Inter',sans-serif] text-[18px] font-semibold text-[#003b3c] mb-1">
                    Unsaved Changes
                  </h3>
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] leading-[1.5]">
                    {productName 
                      ? `You have unsaved changes to your ${productName} subscription.`
                      : 'You have unsaved changes to your subscription.'
                    }
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-5">
                <p className="font-['Inter',sans-serif] text-[13px] text-[#406c6d] leading-[1.5]">
                  If you leave now, your changes will be lost. Would you like to go back and save your changes, or discard them?
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#F7F9F9] border-t border-[#D9E2E2]">
                <button
                  onClick={onDiscard}
                  className="px-5 py-2.5 font-['Inter',sans-serif] text-[14px] font-medium text-[#406c6d] hover:text-[#003b3c] transition-colors rounded-[6px] hover:bg-white"
                >
                  Discard Changes
                </button>
                <button
                  onClick={onCancel}
                  className="px-5 py-2.5 font-['Inter',sans-serif] text-[14px] font-medium text-white bg-[#009296] hover:bg-[#007d81] transition-colors rounded-[6px] shadow-sm"
                >
                  Keep Editing
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
