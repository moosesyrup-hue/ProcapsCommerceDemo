import { useState } from 'react';
import { Edit2 } from 'lucide-react';

interface AccountSettingsProps {
  userEmail: string;
}

export default function AccountSettings({ userEmail }: AccountSettingsProps) {
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [passwordResetSent, setPasswordResetSent] = useState(false);

  const handleResetPassword = () => {
    // Password reset logic here
    setPasswordResetSent(true);
    setTimeout(() => {
      setPasswordResetSent(false);
      setIsResettingPassword(false);
    }, 3000);
  };

  return (
    <div className="max-w-[600px] space-y-[30px]">
      {/* Email Section */}
      <div className="bg-white rounded-[8px] p-[30px] md:p-[40px]">
        <div className="flex items-start justify-between mb-[24px]">
          <h2 className="font-['Inter',sans-serif] text-[#003b3c] text-[20px] md:text-[22px]">
            Email address
          </h2>
          <button
            className="text-[#666666] hover:text-[#003b3c] transition-colors cursor-pointer"
            aria-label="Edit email"
          >
            <Edit2 className="size-[20px]" />
          </button>
        </div>

        <div>
          <label className="block text-[#666666] text-[13px] uppercase tracking-[0.05em] mb-[6px]">
            Email
          </label>
          <p className="text-[#003b3c] text-[15px]">
            {userEmail}
          </p>
        </div>
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-[8px] p-[30px] md:p-[40px]">
        <h2 className="font-['Inter',sans-serif] text-[#003b3c] text-[20px] md:text-[22px] mb-[24px]">
          Password
        </h2>

        <div className="space-y-[20px]">
          <div>
            <label className="block text-[#666666] text-[13px] uppercase tracking-[0.05em] mb-[6px]">
              Email
            </label>
            <p className="text-[#003b3c] text-[15px]">
              {userEmail}
            </p>
          </div>

          <div>
            <label className="block text-[#666666] text-[13px] uppercase tracking-[0.05em] mb-[6px]">
              Password
            </label>
            <p className="text-[#003b3c] text-[15px]">
              ••••••••
            </p>
          </div>

          {passwordResetSent ? (
            <div className="bg-[#E8F8F5] border border-[#48E1DC] rounded-[4px] p-[16px]">
              <p className="text-[#003b3c] text-[14px]">
                Password reset link sent to {userEmail}
              </p>
            </div>
          ) : (
            <button
              onClick={() => setIsResettingPassword(true)}
              className="text-[#003b3c] text-[14px] uppercase tracking-[0.05em] border-b-[1.5px] border-[#003b3c] hover:text-[#009296] hover:border-[#009296] transition-colors cursor-pointer"
            >
              Reset password
            </button>
          )}
        </div>
      </div>

      {/* Reset Password Modal Overlay */}
      {isResettingPassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[20px]">
          <div className="bg-white rounded-[8px] p-[30px] md:p-[40px] max-w-[500px] w-full">
            <h3 className="font-['Inter',sans-serif] text-[#003b3c] text-[22px] mb-[16px]">
              Reset password
            </h3>
            <p className="text-[#666666] text-[15px] mb-[24px]">
              We'll send a password reset link to {userEmail}
            </p>
            <div className="flex gap-[12px]">
              <button
                onClick={handleResetPassword}
                className="flex-1 px-[24px] py-[12px] bg-[#009296] rounded-[8px] hover:bg-[#007d81] transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                  Send reset link
                </span>
              </button>
              <button
                onClick={() => setIsResettingPassword(false)}
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
    </div>
  );
}