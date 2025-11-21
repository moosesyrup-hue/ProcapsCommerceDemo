import { useState, useEffect } from 'react';
import { X, Eye, EyeOff, User, Package, RefreshCw, Settings, MapPin, CreditCard, LogOut, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AccountTrayProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  userData: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  onLogin: (email: string, password: string) => boolean;
  onSignup: (data: { firstName: string; lastName: string; email: string; password: string; marketingOptIn: boolean }) => void;
  onLogout: () => void;
}

export default function AccountTray({
  isOpen,
  onClose,
  isLoggedIn,
  userData,
  onLogin,
  onSignup,
  onLogout
}: AccountTrayProps) {
  // Email entry state
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isRegisteredEmail, setIsRegisteredEmail] = useState(false);
  
  // Login state
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Signup state
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  
  // Celebration state
  const [showCelebration, setShowCelebration] = useState(false);

  // Demo registered user
  const DEMO_REGISTERED_EMAIL = 'demo@andrewlessman.com';
  const DEMO_PASSWORD = 'password123';

  // Handle close - just calls onClose, form reset happens in useEffect
  const handleClose = () => {
    onClose();
  };

  // Handle email continue
  const handleEmailContinue = () => {
    const trimmedEmail = email.trim().toLowerCase();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setLoginError('Please enter a valid email address');
      return;
    }
    
    // Check if email is registered
    if (trimmedEmail === DEMO_REGISTERED_EMAIL.toLowerCase()) {
      setIsRegisteredEmail(true);
    } else {
      setIsRegisteredEmail(false);
    }
    
    setEmailSubmitted(true);
    setLoginError('');
  };

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = onLogin(email, password);
    
    if (!success) {
      setLoginError('Incorrect password. Please try again.');
    } else {
      // Reset form state but keep tray open to show logged-in menu
      setEmail('');
      setEmailSubmitted(false);
      setIsRegisteredEmail(false);
      setPassword('');
      setLoginError('');
    }
  };

  // Handle signup
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    // Validation
    if (!signupPassword || !confirmPassword) {
      setSignupError('Please fill in all fields');
      return;
    }

    if (signupPassword !== confirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }

    onSignup({
      firstName: '',
      lastName: '',
      email: email.trim(),
      password: signupPassword,
      marketingOptIn: marketingOptIn
    });

    // Reset form state but keep tray open to show logged-in menu
    setEmail('');
    setEmailSubmitted(false);
    setIsRegisteredEmail(false);
    setSignupPassword('');
    setConfirmPassword('');
    setSignupError('');
    setMarketingOptIn(false);
    setShowCelebration(true);
  };

  // Handle back to email entry
  const handleBack = () => {
    setEmailSubmitted(false);
    setPassword('');
    setLoginError('');
    setSignupPassword('');
    setConfirmPassword('');
    setSignupError('');
  };

  // Auto-transition from celebration to logged-in state
  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [showCelebration]);

  // Handle Escape key to close tray
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Reset form when tray closes (after animation completes)
  useEffect(() => {
    if (!isOpen) {
      // Small delay to let the exit animation complete
      const timer = setTimeout(() => {
        setEmail('');
        setEmailSubmitted(false);
        setIsRegisteredEmail(false);
        setPassword('');
        setLoginError('');
        setSignupPassword('');
        setConfirmPassword('');
        setSignupError('');
        setMarketingOptIn(false);
        setShowCelebration(false);
      }, 300); // Matches the exit animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleClose}
          />

          {/* Tray - matches MiniCart styling exactly with slide animation */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[560px] sm:max-w-[560px] bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header - minimal for logged in, standard for forms */}
            {isLoggedIn ? (
              /* Minimal header for logged in - just close button */
              <div className="absolute top-[16px] right-[16px] z-10">
                <button
                  onClick={handleClose}
                  className="p-[8px] hover:bg-[#f5f5f5] rounded-full transition-colors bg-white/80 backdrop-blur-sm"
                  aria-label="Close"
                >
                  <X className="w-[24px] h-[24px] text-[#003b3c]" />
                </button>
              </div>
            ) : (
              /* Standard header for forms */
              <div className="sticky top-0 z-10 bg-white px-[30px] py-[24px]">
                <div className="flex items-center justify-between gap-[20px]">
                  {/* Left side - Back button or empty space */}
                  <div className="w-[40px]">
                    {emailSubmitted && (
                      <button
                        onClick={handleBack}
                        className="p-[8px] hover:bg-[#f5f5f5] rounded-full transition-colors"
                        aria-label="Back"
                      >
                        <ArrowLeft className="w-[24px] h-[24px] text-[#003b3c]" />
                      </button>
                    )}
                  </div>
                  
                  {/* Right side - Close button */}
                  <button
                    onClick={handleClose}
                    className="p-[8px] hover:bg-[#f5f5f5] rounded-full transition-colors ml-auto"
                    aria-label="Close"
                  >
                    <X className="w-[24px] h-[24px] text-[#003b3c]" />
                  </button>
                </div>
              </div>
            )}

            {/* Content */}
            <div className={`flex-1 overflow-y-auto px-[30px] ${isLoggedIn ? 'pt-[40px] pb-[30px] 2xl:pt-[32px] 2xl:pb-[24px]' : 'py-[24px]'}`}>
              {showCelebration ? (
                /* Celebration Screen - New User Welcome */
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    {/* Animated Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 15,
                        duration: 0.6
                      }}
                      className="mb-[24px]"
                    >
                      <div className="relative inline-block">
                        <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-br from-[#009296] to-[#007d81] flex items-center justify-center">
                          <CheckCircle className="w-[44px] h-[44px] text-white" strokeWidth={2.5} />
                        </div>
                        {/* Sparkles around the checkmark */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: [0, 1, 0], scale: [0, 1, 1.2] }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="absolute -top-[8px] -right-[8px]"
                        >
                          <Sparkles className="w-[24px] h-[24px] text-[#009296]" fill="#009296" />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: [0, 1, 0], scale: [0, 1, 1.2] }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          className="absolute -bottom-[4px] -left-[4px]"
                        >
                          <Sparkles className="w-[20px] h-[20px] text-[#009296]" fill="#009296" />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="font-['STIX_Two_Text',sans-serif] text-[32px] text-[#003b3c] mb-[12px]"
                      style={{ fontWeight: 500 }}
                    >
                      Welcome aboard!
                    </motion.h2>

                    {/* Supporting text */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="font-['Inter',sans-serif] text-[16px] text-[#406c6d] leading-[1.6] max-w-[320px] mx-auto"
                    >
                      We're excited to have you join us.
                    </motion.p>
                  </div>
                </div>
              ) : isLoggedIn ? (
                /* Account Menu - Logged In State */
                <div>
                  {/* User Info Section - Compact */}
                  <div className="mb-[20px]">
                    <div className="flex items-center gap-[12px]">
                      {/* Avatar Circle with Initials */}
                      <div className="w-[40px] h-[40px] rounded-full bg-[#E8F5F5] flex items-center justify-center shrink-0">
                        <User className="w-[20px] h-[20px] text-[#003b3c]" />
                      </div>
                      
                      {/* Email and Profile Button */}
                      <div className="flex-1 min-w-0">
                        <p className="font-['Inter',sans-serif] text-[16px] font-medium text-[#003b3c] mb-[6px] truncate">
                          {userData?.email}
                        </p>
                        <a href="#" className="inline-block">
                          <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] underline decoration-[#003b3c] underline-offset-[4px]">
                            Profile
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Menu Options - Clean List */}
                  <div className="mb-[24px]">
                    {/* Menu Links */}
                    <div className="space-y-[1px]">
                      <div className="px-[4px] py-[2px]">
                        <button className="group transition-colors">
                          <span className="font-['Inter',sans-serif] text-[20px] font-normal text-[#003b3c] group-hover:text-[#009296] transition-colors">
                            Account
                          </span>
                        </button>
                      </div>

                      <div className="px-[4px] py-[2px]">
                        <button className="group transition-colors">
                          <span className="font-['Inter',sans-serif] text-[20px] font-normal text-[#003b3c] group-hover:text-[#009296] transition-colors">
                            Orders
                          </span>
                        </button>
                      </div>

                      <div className="px-[4px] py-[2px]">
                        <button className="group transition-colors">
                          <span className="font-['Inter',sans-serif] text-[20px] font-normal text-[#003b3c] group-hover:text-[#009296] transition-colors">
                            Profile
                          </span>
                        </button>
                      </div>

                      <div className="px-[4px] py-[2px]">
                        <button className="group transition-colors">
                          <span className="font-['Inter',sans-serif] text-[20px] font-normal text-[#003b3c] group-hover:text-[#009296] transition-colors">
                            Subscriptions
                          </span>
                        </button>
                      </div>

                      <div className="px-[4px] py-[2px]">
                        <button className="group transition-colors">
                          <span className="font-['Inter',sans-serif] text-[20px] font-normal text-[#003b3c] group-hover:text-[#009296] transition-colors">
                            Favorites
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Cards - Full Width Stacked for Real Content */}
                  <div className="space-y-[12px] mb-[20px]">
                    {/* Latest Order Card */}
                    <div className="bg-white border border-[#D9E2E2] rounded-[10px] p-[19px] transition-all h-[175px] flex flex-col">
                      <div className="mb-[10px]">
                        <p className="font-['Inter',sans-serif] text-[14px] font-semibold text-[rgb(0,59,60)] uppercase tracking-[0.5px]">
                          Latest Order
                        </p>
                      </div>
                      
                      {/* Empty State */}
                      <div className="text-center flex-1 flex flex-col items-center justify-center">
                        <p className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] leading-[1.5] mb-[10px]">
                          You haven't placed any orders yet.
                        </p>
                        <button className="inline-flex items-center justify-center px-[16px] py-[8px] rounded-[999px] border border-[#009296] hover:bg-[#009296] transition-colors group">
                          <span className="font-['Inter',sans-serif] text-[14px] font-medium text-[#009296] group-hover:text-white transition-colors">
                            Start Shopping
                          </span>
                        </button>
                      </div>

                      {/* Populated State Example (commented out)
                      <div>
                        <div className="flex items-start gap-[12px] mb-[12px]">
                          <div className="w-[56px] h-[56px] rounded-[6px] bg-white flex items-center justify-center shrink-0">
                            <Package className="w-[24px] h-[24px] text-[#406c6d]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-['Inter',sans-serif] text-[13px] font-medium text-[#003b3c] mb-[2px]">
                              Order #12345
                            </p>
                            <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] mb-[6px]">
                              Placed on March 15, 2024
                            </p>
                            <div className="inline-flex items-center px-[8px] py-[3px] rounded-[4px] bg-[#E8F5E9]">
                              <span className="font-['Inter',sans-serif] text-[11px] font-medium text-[#2E7D32]">
                                Delivered
                              </span>
                            </div>
                          </div>
                          <p className="font-['Inter',sans-serif] text-[14px] font-medium text-[#003b3c]">
                            $89.95
                          </p>
                        </div>
                        <div className="flex gap-[8px] pt-[12px] border-t border-[#D9E2E2]">
                          <button className="flex-1 px-[12px] py-[8px] rounded-[6px] border border-[#D9E2E2] hover:bg-white transition-colors">
                            <span className="font-['Inter',sans-serif] text-[13px] font-medium text-[#003b3c]">
                              View Details
                            </span>
                          </button>
                          <button className="flex-1 px-[12px] py-[8px] rounded-[6px] bg-[#009296] hover:bg-[#007d81] transition-colors">
                            <span className="font-['Inter',sans-serif] text-[13px] font-medium text-white">
                              Reorder
                            </span>
                          </button>
                        </div>
                      </div>
                      */}
                    </div>

                    {/* Latest Subscription Card */}
                    <div className="bg-white border border-[#D9E2E2] rounded-[10px] p-[19px] transition-all h-[175px] flex flex-col">
                      <div className="mb-[10px]">
                        <p className="font-['Inter',sans-serif] text-[14px] font-semibold text-[rgb(0,59,60)] uppercase tracking-[0.5px]">
                          Active Subscriptions
                        </p>
                      </div>
                      
                      {/* Empty State */}
                      <div className="text-center flex-1 flex flex-col items-center justify-center">
                        <p className="font-['Inter',sans-serif] text-[14px] text-[rgb(0,59,60)] leading-[1.5] mb-[10px]">
                          No active subscriptions.
                        </p>
                        <button className="inline-flex items-center justify-center px-[16px] py-[8px] rounded-[999px] border border-[#009296] hover:bg-[#009296] transition-colors group">
                          <span className="font-['Inter',sans-serif] text-[14px] font-medium text-[#009296] group-hover:text-white transition-colors">
                            Learn More
                          </span>
                        </button>
                      </div>

                      {/* Populated State Example (commented out)
                      <div>
                        <div className="flex items-start gap-[12px] mb-[12px]">
                          <div className="w-[56px] h-[56px] rounded-[6px] bg-white flex items-center justify-center shrink-0">
                            <RefreshCw className="w-[24px] h-[24px] text-[#406c6d]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-['Inter',sans-serif] text-[13px] font-medium text-[#003b3c] mb-[2px]">
                              Ultimate B-Complex
                            </p>
                            <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] mb-[2px]">
                              Next delivery: April 1, 2024
                            </p>
                            <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] mb-[6px]">
                              Every 30 days
                            </p>
                            <div className="inline-flex items-center px-[8px] py-[3px] rounded-[4px] bg-[#E0F7F8]">
                              <span className="font-['Inter',sans-serif] text-[11px] font-medium text-[#009296]">
                                Active
                              </span>
                            </div>
                          </div>
                          <p className="font-['Inter',sans-serif] text-[14px] font-medium text-[#003b3c]">
                            $39.96
                          </p>
                        </div>
                        <div className="flex gap-[8px] pt-[12px] border-t border-[#D9E2E2]">
                          <button className="flex-1 px-[12px] py-[8px] rounded-[6px] border border-[#D9E2E2] hover:bg-white transition-colors">
                            <span className="font-['Inter',sans-serif] text-[13px] font-medium text-[#003b3c]">
                              Skip Next
                            </span>
                          </button>
                          <button className="flex-1 px-[12px] py-[8px] rounded-[6px] bg-[#009296] hover:bg-[#007d81] transition-colors">
                            <span className="font-['Inter',sans-serif] text-[13px] font-medium text-white">
                              Manage
                            </span>
                          </button>
                        </div>
                      </div>
                      */}
                    </div>
                  </div>

                  {/* Sign Out */}
                  <div className="flex items-center justify-between gap-[16px]">
                    <p className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] leading-[1.5]">
                      Visit our <span className="font-medium underline underline-offset-[4px]">Help Center</span> for returns and refunds.
                    </p>
                    <button
                      onClick={onLogout}
                      className="inline-flex items-center justify-center px-[20px] py-[10px] rounded-[999px] border border-[#009296] hover:bg-[#009296] transition-colors group shrink-0"
                    >
                      <span className="font-['Inter',sans-serif] text-[14px] text-[#009296] font-medium group-hover:text-white transition-colors">
                        Log Out
                      </span>
                    </button>
                  </div>
                </div>
              ) : !emailSubmitted ? (
                /* Email Entry - Initial State */
                <div>
                  {/* Headline */}
                  <h2 className="font-['STIX_Two_Text',sans-serif] text-[28px] text-[#003b3c] mb-[8px]" style={{ fontWeight: 500 }}>
                    Log in or create account
                  </h2>
                  
                  {/* Instruction text */}
                  <p className="font-['Inter',sans-serif] text-[16px] text-[#406c6d] mb-[32px]">
                    Enter your email to sign up or log in.
                  </p>

                  <div className="mb-[24px]">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setLoginError('');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleEmailContinue();
                          }
                        }}
                        className={`w-full py-[18px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors placeholder:text-transparent ${
                          loginError
                            ? 'border-[#D84315] hover:border-[#D84315] focus:border-[#D84315]'
                            : 'border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]'
                        }`}
                        placeholder="Email"
                        autoFocus
                      />
                      {/* Floating label */}
                      {email.length > 0 && (
                        <label className="absolute left-[12px] top-[-8px] px-[4px] bg-white font-['Inter',sans-serif] text-[12px] text-[#406c6d] pointer-events-none">
                          Email
                        </label>
                      )}
                      {/* Placeholder label */}
                      {email.length === 0 && (
                        <label className="absolute left-[16px] top-[18px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#406c6d] pointer-events-none">
                          Email
                        </label>
                      )}
                    </div>
                    {loginError && (
                      <p className="font-['Inter',sans-serif] text-[12px] text-[#D84315] mt-[8px]">
                        {loginError}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleEmailContinue}
                    className="bg-[#009296] hover:bg-[#007d81] transition-colors h-[50px] rounded-[999px] w-full"
                  >
                    <span className="font-['Inter',sans-serif] font-medium text-[16px] text-white tracking-[1.92px] uppercase">
                      Continue
                    </span>
                  </button>
                </div>
              ) : isRegisteredEmail ? (
                /* Login Form - Registered Email */
                <div>
                  {/* Headline */}
                  <h2 className="font-['STIX_Two_Text',sans-serif] text-[28px] text-[#003b3c] mb-[8px]" style={{ fontWeight: 500 }}>
                    Enter password
                  </h2>
                  
                  {/* Instruction text */}
                  <p className="font-['Inter',sans-serif] text-[16px] text-[#406c6d] mb-[32px]">
                    Welcome back! Enter your password to log in.
                  </p>

                  <form onSubmit={handleLogin}>
                    {/* Email (read-only) */}
                    <div className="mb-[16px]">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          disabled
                          className="w-full py-[18px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors bg-[#F5F9F9] border-[#D9E2E2]"
                        />
                        <label className="absolute left-[12px] top-[-8px] px-[4px] bg-white font-['Inter',sans-serif] text-[12px] text-[#406c6d] pointer-events-none">
                          Email
                        </label>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="mb-[8px]">
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setLoginError('');
                          }}
                          className={`w-full py-[18px] px-[16px] pr-[48px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors placeholder:text-transparent ${
                            loginError
                              ? 'border-[#D84315] hover:border-[#D84315] focus:border-[#D84315]'
                              : 'border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]'
                          }`}
                          placeholder="Password"
                          autoFocus
                        />
                        {/* Floating label */}
                        {password.length > 0 && (
                          <label className={`absolute left-[12px] top-[-8px] px-[4px] bg-white font-['Inter',sans-serif] text-[12px] pointer-events-none ${
                            loginError ? 'text-[#D84315]' : 'text-[#406c6d]'
                          }`}>
                            Password
                          </label>
                        )}
                        {/* Placeholder label */}
                        {password.length === 0 && (
                          <label className="absolute left-[16px] top-[18px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#406c6d] pointer-events-none">
                            Password
                          </label>
                        )}
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#406c6d] hover:text-[#003b3c] transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-[20px] h-[20px]" />
                          ) : (
                            <Eye className="w-[20px] h-[20px]" />
                          )}
                        </button>
                      </div>
                      {loginError && (
                        <p className="font-['Inter',sans-serif] text-[12px] text-[#D84315] mt-[8px]">
                          {loginError}
                        </p>
                      )}
                    </div>

                    {/* Forgot Password */}
                    <button
                      type="button"
                      className="font-['Inter',sans-serif] text-[14px] text-[#009296] hover:text-[#007d81] transition-colors mb-[24px]"
                    >
                      Forgot Password?
                    </button>

                    <button
                      type="submit"
                      className="bg-[#009296] hover:bg-[#007d81] transition-colors h-[50px] rounded-[999px] w-full"
                    >
                      <span className="font-['Inter',sans-serif] font-medium text-[16px] text-white tracking-[1.92px] uppercase">
                        Log In
                      </span>
                    </button>
                  </form>
                </div>
              ) : (
                /* Signup Form - New Email */
                <div>
                  {/* Headline */}
                  <h2 className="font-['STIX_Two_Text',sans-serif] text-[28px] text-[#003b3c] mb-[8px]" style={{ fontWeight: 500 }}>
                    Enter password
                  </h2>
                  
                  {/* Instruction text */}
                  <p className="font-['Inter',sans-serif] text-[16px] text-[#406c6d] mb-[32px]">
                    Create a password for your account.
                  </p>

                  <form onSubmit={handleSignup}>
                    {/* Email (read-only) */}
                    <div className="mb-[16px]">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          disabled
                          className="w-full py-[18px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors bg-[#F5F9F9] border-[#D9E2E2]"
                        />
                        <label className="absolute left-[12px] top-[-8px] px-[4px] bg-white font-['Inter',sans-serif] text-[12px] text-[#406c6d] pointer-events-none">
                          Email
                        </label>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="mb-[16px]">
                      <div className="relative">
                        <input
                          type={showSignupPassword ? 'text' : 'password'}
                          value={signupPassword}
                          onChange={(e) => {
                            setSignupPassword(e.target.value);
                            setSignupError('');
                          }}
                          className="w-full py-[18px] px-[16px] pr-[48px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors placeholder:text-transparent border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]"
                          placeholder="Password"
                          autoFocus
                        />
                        {/* Floating label */}
                        {signupPassword.length > 0 && (
                          <label className="absolute left-[12px] top-[-8px] px-[4px] bg-white font-['Inter',sans-serif] text-[12px] text-[#406c6d] pointer-events-none">
                            Password
                          </label>
                        )}
                        {/* Placeholder label */}
                        {signupPassword.length === 0 && (
                          <label className="absolute left-[16px] top-[18px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#406c6d] pointer-events-none">
                            Password
                          </label>
                        )}
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#406c6d] hover:text-[#003b3c] transition-colors"
                        >
                          {showSignupPassword ? (
                            <EyeOff className="w-[20px] h-[20px]" />
                          ) : (
                            <Eye className="w-[20px] h-[20px]" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-[24px]">
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setSignupError('');
                          }}
                          className="w-full py-[18px] px-[16px] pr-[48px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors placeholder:text-transparent border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]"
                          placeholder="Confirm Password"
                        />
                        {/* Floating label */}
                        {confirmPassword.length > 0 && (
                          <label className="absolute left-[12px] top-[-8px] px-[4px] bg-white font-['Inter',sans-serif] text-[12px] text-[#406c6d] pointer-events-none">
                            Confirm Password
                          </label>
                        )}
                        {/* Placeholder label */}
                        {confirmPassword.length === 0 && (
                          <label className="absolute left-[16px] top-[18px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#406c6d] pointer-events-none">
                            Confirm Password
                          </label>
                        )}
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#406c6d] hover:text-[#003b3c] transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-[20px] h-[20px]" />
                          ) : (
                            <Eye className="w-[20px] h-[20px]" />
                          )}
                        </button>
                      </div>
                      {signupError && (
                        <p className="font-['Inter',sans-serif] text-[12px] text-[#D84315] mt-[8px]">
                          {signupError}
                        </p>
                      )}
                    </div>

                    {/* Marketing Opt-In */}
                    <div className="mb-[24px]">
                      <label className="flex items-start gap-[12px] cursor-pointer">
                        <div className="relative mt-[2px] w-[18px] h-[18px]">
                          <input
                            type="checkbox"
                            checked={marketingOptIn}
                            onChange={(e) => setMarketingOptIn(e.target.checked)}
                            className="w-full h-full bg-white border border-[#003b3c] cursor-pointer appearance-none checked:bg-[#009296] checked:border-[#009296]"
                          />
                          {marketingOptIn && (
                            <svg
                              className="absolute top-0 left-0 w-full h-full pointer-events-none"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 9L7.5 12.5L14 6"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] leading-[1.5]">
                          Stay in the loop, with exclusive offers and product previews.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="bg-[#009296] hover:bg-[#007d81] transition-colors h-[50px] rounded-[999px] w-full"
                    >
                      <span className="font-['Inter',sans-serif] font-medium text-[16px] text-white tracking-[1.92px] uppercase">
                        Create Account
                      </span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}