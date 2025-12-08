import { Check } from 'lucide-react';
import { motion } from 'motion/react';

interface SuccessMessageProps {
  email: string;
  onClose: () => void;
}

export default function SuccessMessage({ email, onClose }: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-center py-[40px] md:py-[60px]"
    >
      {/* Success Icon */}
      <motion.div 
        className="w-[80px] h-[80px] md:w-[96px] md:h-[96px] bg-[#009296] rounded-full flex items-center justify-center mx-auto mb-[24px] md:mb-[32px]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1
        }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 12,
            delay: 0.3
          }}
        >
          <Check className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>

      {/* Success Message */}
      <h2 className="font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] text-[20px] md:text-[28px] leading-[1.2] mb-[16px]">
        Message sent successfully!
      </h2>
      <p className="font-['Inter',sans-serif] text-[#406c6d] text-[16px] leading-[1.6] mb-[32px] md:mb-[40px] max-w-[600px] mx-auto">
        Thank you for contacting us. We'll get back to you within 1 business day at: <span className="font-['Inter:Medium',sans-serif] font-medium text-[#009296]">{email}</span>
      </p>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="bg-[#009296] text-white rounded-full px-[32px] py-[14px] font-['Inter:Medium',sans-serif] font-medium text-[15px] md:text-[16px] hover:bg-[#00b4ae] transition-colors"
      >
        Close
      </button>
    </motion.div>
  );
}
