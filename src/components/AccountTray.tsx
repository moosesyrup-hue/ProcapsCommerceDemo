import { useState, useEffect } from 'react';
import { X, Eye, EyeOff, User, Package, RefreshCw, Settings, MapPin, CreditCard, LogOut, ArrowLeft, CheckCircle, Sparkles, SkipForward, Pause, Play, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import imgImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";

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
  onNavigateToAccount?: (tab?: 'overview' | 'orders' | 'profile' | 'autoship' | 'favorites') => void;
  onNavigateToHelp?: () => void;
}

export default function AccountTray({
  isOpen,
  onClose,
  isLoggedIn,
  userData,
  onLogin,
  onSignup,
  onLogout,
  onNavigateToAccount,
  onNavigateToHelp
}: AccountTrayProps) {
  // Email entry state
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isRegisteredEmail, setIsRegisteredEmail] = useState(false);
  
  // Verification code state
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Celebration state
  const [showCelebration, setShowCelebration] = useState(false);

  // Skip autoship modal state
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [nextDelivery, setNextDelivery] = useState('December 19, 2025');
  const [autoshipStatus, setAutoshipStatus] = useState<'Active' | 'Paused'>('Active');
  const [undoAction, setUndoAction] = useState<{
    type: 'skip' | 'pause' | 'resume';
    previousNextDelivery?: string;
    previousStatus?: 'Active' | 'Paused';
    timeout: NodeJS.Timeout;
    productName: string;
  } | null>(null);

  // Demo registered user
  const DEMO_REGISTERED_EMAIL = 'demo@andrewlessman.com';
  const DEMO_VERIFICATION_CODE = '123456';

  // Check if current user is the demo user
  const isDemoUser = userData?.email.toLowerCase() === DEMO_REGISTERED_EMAIL.toLowerCase();

  // Mock order data with products for demo user - MATCHES AccountOverview
  const demoLatestOrder = {
    orderNumber: '5641702',
    date: 'December 9, 2025',
    status: 'Shipped',
    total: 149.75,
    products: [
      { name: 'Ultimate Anti-Oxidant', count: '180 capsules', quantity: 2, image: imgImage },
      { name: 'CoQ10 400mg', count: '120 capsules', quantity: 1, image: imgImage },
      { name: 'Omega-3 EPA/DHA', count: '60 softgels', quantity: 1, image: imgImage },
      { name: 'Fibermucil', count: '60 capsules', quantity: 1, image: imgImage },
      { name: 'Probiotic-10', count: '60 capsules', quantity: 1, image: imgImage },
    ],
  };

  // Mock autoship data for demo user - MATCHES AccountOverview
  const demoAutoship = {
    productName: 'Ultimate Anti-Oxidant',
    productCount: '180 capsules',
    productImage: imgImage,
    frequency: 'Every 30 days',
    price: 35.96,
    nextDelivery: 'December 19, 2025',
  };

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
      setEmailSubmitted(true);
      setLoginError('');
      
      // Automatically send verification code for registered users
      setIsSendingCode(true);
      setTimeout(() => {
        setCodeSent(true);
        setIsSendingCode(false);
      }, 800);
    } else {
      setIsRegisteredEmail(false);
      setEmailSubmitted(true);
      setLoginError('');
      
      // Automatically send verification code for new users too
      setIsSendingCode(true);
      setTimeout(() => {
        setCodeSent(true);
        setIsSendingCode(false);
      }, 800);
    }
  };

  // Handle sending verification code (for resending)
  const handleSendCode = () => {
    setIsSendingCode(true);
    setLoginError('');
    
    setTimeout(() => {
      setCodeSent(true);
      setIsSendingCode(false);
    }, 800);
  };

  // Handle verifying login code
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verificationCode !== DEMO_VERIFICATION_CODE) {
      setLoginError('Invalid verification code. Try 123456 for demo.');
      return;
    }
    
    setIsVerifyingCode(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsVerifyingCode(false);
      
      // Call the onLogin function with email (password param is legacy, not used)
      const loginSuccess = onLogin(email, 'verified');
      
      if (loginSuccess) {
        // Only reset form state if login was successful
        setEmail('');
        setEmailSubmitted(false);
        setIsRegisteredEmail(false);
        setVerificationCode('');
        setCodeSent(false);
        setLoginError('');
      } else {
        setLoginError('Login failed. Please try again.');
      }
    }, 800);
  };

  // Handle signup
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Validate verification code
    if (verificationCode !== DEMO_VERIFICATION_CODE) {
      setLoginError('Invalid verification code. Try 123456 for demo.');
      return;
    }

    setIsVerifyingCode(true);

    // Simulate verification
    setTimeout(() => {
      setIsVerifyingCode(false);
      
      onSignup({
        firstName: '',
        lastName: '',
        email: email.trim(),
        password: verificationCode,
        marketingOptIn: false
      });

      // Reset form state but keep tray open to show celebration
      setEmail('');
      setEmailSubmitted(false);
      setIsRegisteredEmail(false);
      setVerificationCode('');
      setLoginError('');
      setShowCelebration(true);
    }, 800);
  };

  // Handle back to email entry
  const handleBack = () => {
    setEmailSubmitted(false);
    setVerificationCode('');
    setCodeSent(false);
    setLoginError('');
  };

  // Calculate next delivery date based on frequency
  const calculateNextDelivery = (currentDate: string, frequency: string): string => {
    const current = new Date(currentDate);
    const days = frequency === 'Every 30 days' ? 30 : frequency === 'Every 60 days' ? 60 : 90;
    current.setDate(current.getDate() + days);
    return current.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Handle Skip Next
  const handleSkipClick = () => {
    setShowSkipModal(true);
  };

  const confirmSkip = () => {
    const newNextDelivery = calculateNextDelivery(nextDelivery, demoAutoship.frequency);
    const previousNextDelivery = nextDelivery;

    // Update delivery date
    setNextDelivery(newNextDelivery);

    // Close modal
    setShowSkipModal(false);

    // Show undo banner
    const timeout = setTimeout(() => {
      setUndoAction(null);
    }, 5000);

    setUndoAction({
      type: 'skip',
      previousNextDelivery,
      timeout,
      productName: demoAutoship.productName,
    });
  };

  // Handle Pause
  const handlePauseClick = () => {
    setShowPauseModal(true);
  };

  const confirmPause = () => {
    const previousStatus = autoshipStatus;
    const previousNextDelivery = nextDelivery;

    // Update status
    setAutoshipStatus('Paused');

    // Close modal
    setShowPauseModal(false);

    // Show undo banner
    const timeout = setTimeout(() => {
      setUndoAction(null);
    }, 5000);

    setUndoAction({
      type: 'pause',
      previousStatus,
      previousNextDelivery,
      timeout,
      productName: demoAutoship.productName,
    });
  };

  // Handle Resume
  const handleResumeClick = () => {
    const previousStatus = autoshipStatus;
    const previousNextDelivery = nextDelivery;

    // Update status
    setAutoshipStatus('Active');

    // Show undo banner
    const timeout = setTimeout(() => {
      setUndoAction(null);
    }, 5000);

    setUndoAction({
      type: 'resume',
      previousStatus,
      previousNextDelivery,
      timeout,
      productName: demoAutoship.productName,
    });
  };

  // Handle Undo
  const handleUndo = () => {
    if (!undoAction) return;

    if (undoAction.timeout) {
      clearTimeout(undoAction.timeout);
    }

    if (undoAction.type === 'skip' && undoAction.previousNextDelivery) {
      // Restore previous delivery date
      setNextDelivery(undoAction.previousNextDelivery);
    }

    if (undoAction.type === 'pause' && undoAction.previousStatus) {
      // Restore previous status
      setAutoshipStatus(undoAction.previousStatus);
    }

    if (undoAction.type === 'resume' && undoAction.previousStatus) {
      // Restore previous status
      setAutoshipStatus(undoAction.previousStatus);
    }

    setUndoAction(null);
  };

  // Clear undo timeout on unmount
  useEffect(() => {
    return () => {
      if (undoAction?.timeout) {
        clearTimeout(undoAction.timeout);
      }
    };
  }, [undoAction]);

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
        setVerificationCode('');
        setLoginError('');
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
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={handleClose}
          />

          {/* Tray - matches MiniCart styling exactly with slide animation */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[560px] sm:max-w-[560px] bg-white shadow-xl z-[70] flex flex-col"
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
                        <button 
                          onClick={() => {
                            if (onNavigateToAccount) {
                              onNavigateToAccount('profile');
                              onClose();
                            }
                          }}
                          className="inline-block"
                        >
                          <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] underline decoration-[#003b3c] underline-offset-[4px]">
                            Profile
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Menu Options - Clean List */}
                  <div className="mb-[24px]">
                    {/* Menu Links */}
                    <div className="space-y-[1px]">
                      <div className="px-[4px] py-[2px]">
                        <button 
                          onClick={() => {
                            if (onNavigateToAccount) {
                              onNavigateToAccount('overview');
                              onClose();
                            }
                          }}
                          className="group transition-colors"
                        >
                          <span className="font-['Inter',sans-serif] text-[20px] font-normal text-[#003b3c] group-hover:text-[#009296] transition-colors">
                            Overview
                          </span>
                        </button>
                      </div>

                      <div className="px-[4px] py-[2px]">
                        <button 
                          onClick={() => {
                            if (onNavigateToAccount) {
                              onNavigateToAccount('orders');
                              onClose();
                            }
                          }}
                          className="group transition-colors"
                        >
                          <span className="font-['Inter',sans-serif] text-[20px] font-normal text-[#003b3c] group-hover:text-[#009296] transition-colors">
                            Orders
                          </span>
                        </button>
                      </div>

                      <div className="px-[4px] py-[2px]">
                        <button 
                          onClick={() => {
                            if (onNavigateToAccount) {
                              onNavigateToAccount('profile');
                              onClose();
                            }
                          }}
                          className="group transition-colors"
                        >
                          <span className="font-['Inter',sans-serif] text-[20px] font-normal text-[#003b3c] group-hover:text-[#009296] transition-colors">
                            Profile
                          </span>
                        </button>
                      </div>

                      <div className="px-[4px] py-[2px]">
                        <button 
                          onClick={() => {
                            if (onNavigateToAccount) {
                              onNavigateToAccount('autoship');
                              onClose();
                            }
                          }}
                          className="group transition-colors"
                        >
                          <span className="font-['Inter',sans-serif] text-[20px] font-normal text-[#003b3c] group-hover:text-[#009296] transition-colors">
                            Autoship
                          </span>
                        </button>
                      </div>

                      <div className="px-[4px] py-[2px]">
                        <button 
                          onClick={() => {
                            if (onNavigateToAccount) {
                              onNavigateToAccount('favorites');
                              onClose();
                            }
                          }}
                          className="group transition-colors"
                        >
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
                    <div className="bg-white border border-[#D9E2E2] rounded-[10px] p-[19px] transition-all flex flex-col">
                      <div className="mb-[10px]">
                        <p className="font-['Inter',sans-serif] text-[14px] font-semibold text-[rgb(0,59,60)] uppercase tracking-[0.5px]">
                          Latest Order
                        </p>
                      </div>
                      
                      {isDemoUser ? (
                        /* Populated State for Demo User */
                        <div>
                          <div className="flex items-start gap-[12px] mb-[12px]">
                            {/* Stacked Product Images - Only show first 3 */}
                            <div className="relative w-[56px] h-[56px] shrink-0">
                              {demoLatestOrder.products.slice(0, 3).map((product, index) => (
                                <div
                                  key={index}
                                  className="absolute rounded-[6px] border-2 border-white overflow-hidden bg-white shadow-sm"
                                  style={{
                                    width: '44px',
                                    height: '44px',
                                    left: `${index * 6}px`,
                                    top: `${index * 6}px`,
                                    zIndex: 3 - index,
                                  }}
                                >
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <p className="font-['Inter',sans-serif] text-[13px] font-medium text-[#003b3c] mb-[2px]">
                                Order #{demoLatestOrder.orderNumber}
                              </p>
                              <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] mb-[2px]">
                                {demoLatestOrder.products.length} {demoLatestOrder.products.length === 1 ? 'item' : 'items'}
                              </p>
                              <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] mb-[6px]">
                                Placed on {demoLatestOrder.date}
                              </p>
                              <div className="inline-flex items-center px-[8px] py-[3px] rounded-[4px] bg-[#E8F5E9]">
                                <span className="font-['Inter',sans-serif] text-[11px] font-medium text-[#2E7D32]">
                                  {demoLatestOrder.status}
                                </span>
                              </div>
                            </div>
                            <p className="font-['Inter',sans-serif] text-[14px] font-medium text-[#003b3c]">
                              ${demoLatestOrder.total.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex gap-[8px] pt-[12px] border-t border-[#D9E2E2]">
                            <button 
                              onClick={() => {
                                if (onNavigateToAccount) {
                                  onNavigateToAccount('orders', demoLatestOrder.orderNumber);
                                  onClose();
                                }
                              }}
                              className="flex-1 px-[12px] py-[8px] rounded-[6px] border border-[#D9E2E2] hover:border-[#003b3c] transition-colors cursor-pointer"
                            >
                              <span className="font-['Inter',sans-serif] text-[13px] font-medium text-[#003b3c]">
                                View Details
                              </span>
                            </button>
                            <button className="flex-1 px-[12px] py-[8px] rounded-[6px] bg-[#009296] hover:bg-[#007d81] transition-colors cursor-pointer">
                              <span className="font-['Inter',sans-serif] text-[13px] font-medium text-white">
                                Reorder
                              </span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Empty State */
                        <div className="text-center flex-1 flex flex-col items-center justify-center py-[20px]">
                          <p className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] leading-[1.5] mb-[10px]">
                            You haven't placed any orders yet.
                          </p>
                          <button className="inline-flex items-center justify-center px-[16px] py-[8px] rounded-[999px] border border-[#009296] hover:bg-[#009296] transition-colors group cursor-pointer">
                            <span className="font-['Inter',sans-serif] text-[14px] font-medium text-[#009296] group-hover:text-white transition-colors">
                              Start Shopping
                            </span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Next Autoship Card */}
                    <div className="bg-white border border-[#D9E2E2] rounded-[10px] p-[19px] transition-all flex flex-col">
                      <div className="mb-[10px]">
                        <p className="font-['Inter',sans-serif] text-[14px] font-semibold text-[rgb(0,59,60)] uppercase tracking-[0.5px]">
                          Next Autoship
                        </p>
                      </div>
                      
                      {isDemoUser ? (
                        /* Populated State for Demo User */
                        <div>
                          <div className="flex items-start gap-[12px] mb-[12px]">
                            {/* Single Product Image */}
                            <div className="w-[56px] h-[56px] rounded-[6px] overflow-hidden bg-white shrink-0">
                              <img
                                src={demoAutoship.productImage}
                                alt={demoAutoship.productName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <p className="font-['Inter',sans-serif] text-[13px] font-medium text-[#003b3c] mb-[2px]">
                                {demoAutoship.productName}
                              </p>
                              <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] mb-[2px]">
                                Next delivery: {nextDelivery}
                              </p>
                              <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] mb-[6px]">
                                {demoAutoship.frequency}
                              </p>
                              <div className={`inline-flex items-center px-[8px] py-[3px] rounded-[4px] ${autoshipStatus === 'Active' ? 'bg-[#E0F7F8]' : 'bg-[#FFF3E0]'}`}>
                                <span className={`font-['Inter',sans-serif] text-[11px] font-medium ${autoshipStatus === 'Active' ? 'text-[#009296]' : 'text-[#E65100]'}`}>
                                  {autoshipStatus}
                                </span>
                              </div>
                            </div>
                            <p className="font-['Inter',sans-serif] text-[14px] font-medium text-[#003b3c]">
                              ${demoAutoship.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex gap-[8px] pt-[12px] border-t border-[#D9E2E2]">
                            <button 
                              onClick={handleSkipClick}
                              className="flex-1 px-[8px] py-[8px] rounded-[6px] border border-[#D9E2E2] hover:border-[#003b3c] transition-colors cursor-pointer"
                            >
                              <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#003b3c]">
                                Skip Next
                              </span>
                            </button>
                            <button 
                              onClick={handlePauseClick}
                              className="flex-1 px-[8px] py-[8px] rounded-[6px] border border-[#D9E2E2] hover:border-[#003b3c] transition-colors cursor-pointer"
                            >
                              <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#003b3c]">
                                Pause
                              </span>
                            </button>
                            <button 
                              onClick={() => {
                                if (onNavigateToAccount) {
                                  onNavigateToAccount('autoship');
                                  onClose();
                                }
                              }}
                              className="flex-1 px-[8px] py-[8px] rounded-[6px] bg-[#009296] hover:bg-[#007d81] transition-colors cursor-pointer"
                            >
                              <span className="font-['Inter',sans-serif] text-[12px] font-medium text-white">
                                Manage
                              </span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Empty State */
                        <div className="text-center flex-1 flex flex-col items-center justify-center py-[20px]">
                          <p className="font-['Inter',sans-serif] text-[14px] text-[rgb(0,59,60)] leading-[1.5] mb-[10px]">
                            No active subscriptions.
                          </p>
                          <button className="inline-flex items-center justify-center px-[16px] py-[8px] rounded-[999px] border border-[#009296] hover:bg-[#009296] transition-colors group cursor-pointer">
                            <span className="font-['Inter',sans-serif] text-[14px] font-medium text-[#009296] group-hover:text-white transition-colors">
                              Learn More
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sign Out */}
                  <div className="flex items-center justify-between gap-[16px]">
                    <p className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] leading-[1.5]">
                      Visit our{' '}
                      <button
                        onClick={() => {
                          if (onNavigateToHelp) {
                            onNavigateToHelp();
                            onClose();
                          }
                        }}
                        className="font-medium underline underline-offset-[4px] hover:text-[#009296] transition-colors cursor-pointer"
                      >
                        Help Center
                      </button>{' '}
                      for returns and refunds.
                    </p>
                    <button
                      onClick={onLogout}
                      className="inline-flex items-center justify-center px-[20px] py-[10px] rounded-[999px] border border-[#009296] hover:bg-[#009296] transition-colors group shrink-0 cursor-pointer"
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
                /* Login Form - Registered Email with Verification Code */
                <div>
                  {/* Headline */}
                  <h2 className="font-['STIX_Two_Text',sans-serif] text-[28px] text-[#003b3c] mb-[8px]" style={{ fontWeight: 500 }}>
                    {codeSent ? 'Enter verification code' : 'Sending code...'}
                  </h2>
                  
                  {/* Instruction text */}
                  <p className="font-['Inter',sans-serif] text-[16px] text-[#406c6d] mb-[32px]">
                    {codeSent ? (
                      <>
                        We've sent a 6-digit code to <span className="font-medium text-[#003b3c]">{email}</span>. 
                        Check your email and enter the code below.
                      </>
                    ) : (
                      'Sending verification code to your email...'
                    )}
                  </p>

                  {codeSent && (
                    <form onSubmit={handleVerifyCode}>
                      {/* Verification Code */}
                      <div className="mb-[8px]">
                        <div className="relative">
                          <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => {
                              // Only allow numbers, max 6 digits
                              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                              setVerificationCode(value);
                              setLoginError('');
                            }}
                            className={`w-full py-[18px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors placeholder:text-transparent ${
                              loginError
                                ? 'border-[#D84315] hover:border-[#D84315] focus:border-[#D84315]'
                                : 'border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]'
                            }`}
                            placeholder="Verification code"
                            maxLength={6}
                            autoComplete="one-time-code"
                            autoFocus
                          />
                          {/* Floating label */}
                          {verificationCode.length > 0 && (
                            <label className={`absolute left-[12px] top-[-8px] px-[4px] bg-white font-['Inter',sans-serif] text-[12px] pointer-events-none ${
                              loginError ? 'text-[#D84315]' : 'text-[#406c6d]'
                            }`}>
                              Verification code
                            </label>
                          )}
                          {/* Placeholder label */}
                          {verificationCode.length === 0 && (
                            <label className="absolute left-[16px] top-[18px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#406c6d] pointer-events-none">
                              Verification code
                            </label>
                          )}
                        </div>
                        {loginError && (
                          <p className="font-['Inter',sans-serif] text-[12px] text-[#D84315] mt-[8px]">
                            {loginError}
                          </p>
                        )}
                      </div>

                      {/* Resend Code Link */}
                      <button
                        type="button"
                        onClick={handleSendCode}
                        disabled={isSendingCode}
                        className="font-['Inter',sans-serif] text-[14px] text-[#009296] hover:text-[#007d81] transition-colors mb-[24px] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSendingCode ? 'Sending...' : 'Resend Code'}
                      </button>

                      <button
                        type="submit"
                        disabled={isVerifyingCode || verificationCode.length !== 6}
                        className="bg-[#009296] hover:bg-[#007d81] transition-colors h-[50px] rounded-[999px] w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#009296]"
                      >
                        <span className="font-['Inter',sans-serif] font-medium text-[16px] text-white tracking-[1.92px] uppercase">
                          {isVerifyingCode ? 'Verifying...' : 'Verify Code'}
                        </span>
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                /* New Email - Not Registered - Create Account */
                <div>
                  {/* Headline */}
                  <h2 className="font-['STIX_Two_Text',sans-serif] text-[28px] text-[#003b3c] mb-[8px]" style={{ fontWeight: 500 }}>
                    {codeSent ? 'Enter verification code' : 'Sending code...'}
                  </h2>
                  
                  {/* Instruction text */}
                  <p className="font-['Inter',sans-serif] text-[16px] text-[#406c6d] mb-[32px]">
                    {codeSent ? (
                      <>
                        We've sent a 6-digit code to <span className="font-medium text-[#003b3c]">{email}</span>. 
                        Enter the code below to create your account.
                      </>
                    ) : (
                      'Sending verification code to your email...'
                    )}
                  </p>

                  {codeSent && (
                    /* Show verification code form */
                    <form onSubmit={handleSignup}>
                      {/* Verification Code */}
                      <div className="mb-[8px]">
                        <div className="relative">
                          <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => {
                              // Only allow numbers, max 6 digits
                              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                              setVerificationCode(value);
                              setLoginError('');
                            }}
                            className={`w-full py-[18px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors placeholder:text-transparent ${
                              loginError
                                ? 'border-[#D84315] hover:border-[#D84315] focus:border-[#D84315]'
                                : 'border-[#D9E2E2] hover:border-[#003b3c] focus:border-[#003b3c]'
                            }`}
                            placeholder="Verification code"
                            maxLength={6}
                            autoComplete="one-time-code"
                            autoFocus
                          />
                          {/* Floating label */}
                          {verificationCode.length > 0 && (
                            <label className={`absolute left-[12px] top-[-8px] px-[4px] bg-white font-['Inter',sans-serif] text-[12px] pointer-events-none ${
                              loginError ? 'text-[#D84315]' : 'text-[#406c6d]'
                            }`}>
                              Verification code
                            </label>
                          )}
                          {/* Placeholder label */}
                          {verificationCode.length === 0 && (
                            <label className="absolute left-[16px] top-[18px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#406c6d] pointer-events-none">
                              Verification code
                            </label>
                          )}
                        </div>
                        {loginError && (
                          <p className="font-['Inter',sans-serif] text-[12px] text-[#D84315] mt-[8px]">
                            {loginError}
                          </p>
                        )}
                      </div>

                      {/* Resend Code Link */}
                      <button
                        type="button"
                        onClick={handleSendCode}
                        disabled={isSendingCode}
                        className="font-['Inter',sans-serif] text-[14px] text-[#009296] hover:text-[#007d81] transition-colors mb-[24px] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSendingCode ? 'Sending...' : 'Resend Code'}
                      </button>

                      <button
                        type="submit"
                        disabled={isVerifyingCode || verificationCode.length !== 6}
                        className="bg-[#009296] hover:bg-[#007d81] transition-colors h-[50px] rounded-[999px] w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#009296]"
                      >
                        <span className="font-['Inter',sans-serif] font-medium text-[16px] text-white tracking-[1.92px] uppercase">
                          {isVerifyingCode ? 'Creating...' : 'Create Account'}
                        </span>
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Skip Next Modal */}
          {showSkipModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] flex items-center justify-center p-[20px]">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-[12px] max-w-[480px] w-full p-[40px] shadow-2xl"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center size-[56px] rounded-full bg-[#E0F7F8] mb-[20px]">
                  <SkipForward className="size-[28px] text-[#009296]" />
                </div>

                {/* Header */}
                <h2 className="font-['Inter',sans-serif] font-medium text-[24px] text-[#003b3c] mb-[12px]">
                  Skip Your Next Delivery?
                </h2>
                <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] leading-[1.6] mb-[24px]">
                  Your autoship will continue—we'll just skip this one shipment.
                </p>

                {/* Current & New Delivery Dates */}
                <div className="bg-[#F5F9F9] border border-[#D9E2E2] rounded-[8px] p-[16px] mb-[24px]">
                  <div className="flex items-start gap-[12px] mb-[12px]">
                    <Calendar className="size-[18px] text-[#009296] mt-[2px] shrink-0" />
                    <div className="flex-1">
                      <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] uppercase tracking-[0.05em] mb-[4px]">
                        Currently Scheduled
                      </p>
                      <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[#003b3c]">
                        {nextDelivery}
                      </p>
                    </div>
                  </div>
                  <div className="h-[1px] bg-[#D9E2E2] mb-[12px]" />
                  <div className="flex items-start gap-[12px]">
                    <Calendar className="size-[18px] text-[#009296] mt-[2px] shrink-0" />
                    <div className="flex-1">
                      <p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] uppercase tracking-[0.05em] mb-[4px]">
                        New Next Delivery
                      </p>
                      <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[#003b3c]">
                        {calculateNextDelivery(nextDelivery, demoAutoship.frequency)}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="font-['Inter',sans-serif] text-[13px] text-[#406c6d] leading-[1.6] mb-[24px]">
                  You won't be charged for this delivery. Your autoship will continue as normal after.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-[12px]">
                  <button
                    onClick={() => setShowSkipModal(false)}
                    className="flex-1 px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
                  >
                    <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                      Cancel
                    </span>
                  </button>
                  <button
                    onClick={confirmSkip}
                    className="flex-1 px-[24px] py-[12px] bg-[#009296] rounded-[8px] hover:bg-[#007d81] transition-colors cursor-pointer focus:outline-none"
                  >
                    <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                      Skip Delivery
                    </span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Pause Modal */}
          {showPauseModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] flex items-center justify-center p-[20px]">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-[12px] max-w-[480px] w-full p-[40px] shadow-2xl"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center size-[56px] rounded-full bg-[#FFF3E0] mb-[20px]">
                  <Pause className="size-[28px] text-[#E65100]" />
                </div>

                {/* Header */}
                <h2 className="font-['Inter',sans-serif] font-medium text-[24px] text-[#003b3c] mb-[12px]">
                  Pause Your Autoship?
                </h2>
                <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] leading-[1.6] mb-[24px]">
                  You can resume anytime—we'll hold your deliveries until you're ready.
                </p>

                {/* Info Box */}
                <div className="bg-[#F5F9F9] border border-[#D9E2E2] rounded-[8px] p-[16px] mb-[24px]">
                  <div className="flex items-start gap-[12px]">
                    <Pause className="size-[18px] text-[#E65100] mt-[2px] shrink-0" />
                    <div className="flex-1">
                      <p className="font-['Inter',sans-serif] text-[13px] text-[#003b3c] leading-[1.6]">
                        Your autoship will be paused immediately. No charges will occur until you resume.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="font-['Inter',sans-serif] text-[13px] text-[#406c6d] leading-[1.6] mb-[24px]">
                  Billing will resume with your next shipment.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-[12px]">
                  <button
                    onClick={() => setShowPauseModal(false)}
                    className="flex-1 px-[24px] py-[12px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none"
                  >
                    <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                      Cancel
                    </span>
                  </button>
                  <button
                    onClick={confirmPause}
                    className="flex-1 px-[24px] py-[12px] bg-[#E65100] rounded-[8px] hover:bg-[#D84315] transition-colors cursor-pointer focus:outline-none"
                  >
                    <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                      Pause Autoship
                    </span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Undo Banner */}
          {undoAction && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="fixed bottom-[20px] sm:bottom-[30px] left-[50%] -translate-x-1/2 z-[80] w-[calc(100%-40px)] sm:w-auto sm:min-w-[400px] max-w-[90%] sm:max-w-[600px]"
            >
              {undoAction.type === 'skip' && (
                <div className="bg-white border-2 border-[#009296] rounded-[12px] p-[16px] sm:p-[20px] flex flex-col sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] shadow-2xl">
                  <div className="flex items-start gap-[12px] sm:gap-[16px] flex-1 min-w-0">
                    <div className="inline-flex items-center justify-center size-[40px] sm:size-[44px] rounded-full bg-[#E0F7F8] shrink-0">
                      <SkipForward className="size-[20px] sm:size-[22px] text-[#009296]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-['Inter',sans-serif] font-medium text-[14px] sm:text-[15px] text-[#003b3c]">
                        Delivery Skipped
                      </p>
                      {undoAction.productName && (
                        <p className="font-['Inter',sans-serif] text-[12px] sm:text-[13px] text-[#406c6d] line-clamp-2 leading-[1.4]">
                          {undoAction.productName}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleUndo}
                    className="px-[20px] sm:px-[24px] py-[10px] sm:py-[12px] bg-[#009296] hover:bg-[#007d81] rounded-[8px] transition-colors shrink-0 w-full sm:w-auto"
                  >
                    <span className="font-['Inter',sans-serif] text-[13px] sm:text-[14px] font-medium text-white uppercase tracking-[0.05em]">
                      Undo
                    </span>
                  </button>
                </div>
              )}

              {undoAction.type === 'pause' && (
                <div className="bg-white border-2 border-[#E65100] rounded-[12px] p-[16px] sm:p-[20px] flex flex-col sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] shadow-2xl">
                  <div className="flex items-start gap-[12px] sm:gap-[16px] flex-1 min-w-0">
                    <div className="inline-flex items-center justify-center size-[40px] sm:size-[44px] rounded-full bg-[#FFF3E0] shrink-0">
                      <Pause className="size-[20px] sm:size-[22px] text-[#E65100]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-['Inter',sans-serif] font-medium text-[14px] sm:text-[15px] text-[#003b3c]">
                        Autoship Paused
                      </p>
                      {undoAction.productName && (
                        <p className="font-['Inter',sans-serif] text-[12px] sm:text-[13px] text-[#406c6d] line-clamp-2 leading-[1.4]">
                          {undoAction.productName}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleUndo}
                    className="px-[20px] sm:px-[24px] py-[10px] sm:py-[12px] bg-[#E65100] hover:bg-[#D84315] rounded-[8px] transition-colors shrink-0 w-full sm:w-auto"
                  >
                    <span className="font-['Inter',sans-serif] text-[13px] sm:text-[14px] font-medium text-white uppercase tracking-[0.05em]">
                      Undo
                    </span>
                  </button>
                </div>
              )}

              {undoAction.type === 'resume' && (
                <div className="bg-white border-2 border-[#2E7D32] rounded-[12px] p-[16px] sm:p-[20px] flex flex-col sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] shadow-2xl">
                  <div className="flex items-start gap-[12px] sm:gap-[16px] flex-1 min-w-0">
                    <div className="inline-flex items-center justify-center size-[40px] sm:size-[44px] rounded-full bg-[#E8F5E9] shrink-0">
                      <Play className="size-[20px] sm:size-[22px] text-[#2E7D32]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-['Inter',sans-serif] font-medium text-[14px] sm:text-[15px] text-[#003b3c]">
                        Autoship Resumed
                      </p>
                      {undoAction.productName && (
                        <p className="font-['Inter',sans-serif] text-[12px] sm:text-[13px] text-[#406c6d] line-clamp-2 leading-[1.4]">
                          {undoAction.productName}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleUndo}
                    className="px-[20px] sm:px-[24px] py-[10px] sm:py-[12px] bg-[#2E7D32] hover:bg-[#1B5E20] rounded-[8px] transition-colors shrink-0 w-full sm:w-auto"
                  >
                    <span className="font-['Inter',sans-serif] text-[13px] sm:text-[14px] font-medium text-white uppercase tracking-[0.05em]">
                      Undo
                    </span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}