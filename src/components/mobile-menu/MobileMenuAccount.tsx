/**
 * Mobile Menu Account Section Component
 * 
 * Displays a simple account section with visual separation.
 * Logged out: Opens account tray for sign in
 * Logged in: Shows user info and navigates to account dashboard
 */

import { motion } from 'motion/react';
import { User } from 'lucide-react';

interface MobileMenuAccountProps {
  isLoggedIn: boolean;
  userData?: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  onAccountClick: () => void;
}

export default function MobileMenuAccount({
  isLoggedIn,
  userData,
  onAccountClick
}: MobileMenuAccountProps) {
  const displayName = userData ? `${userData.firstName} ${userData.lastName}` : 'Account';
  const displayEmail = userData?.email;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: 0.35, 
        duration: 0.3 
      }}
      className="w-full sticky bottom-0 bg-white pt-[20px] pb-[20px] px-[20px]"
    >
      {/* Divider Line */}
      <div className="w-full h-[1px] bg-[#D9E2E2] mb-[20px]" />

      {/* Account Item */}
      <div 
        className="flex items-center gap-3 w-full cursor-pointer"
        onClick={onAccountClick}
      >
        <div className="shrink-0 size-[24px] text-[#009296]">
          <User className="size-full" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic text-[#003b3c] text-[26px] tracking-[-0.52px]">
            {displayName}
          </p>
          {isLoggedIn && displayEmail && (
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#009296] text-[14px] leading-[1.4] truncate">
              {displayEmail}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}