import { useState, useEffect } from 'react';
import { ChevronDown, Plus, Minus, MessageCircle, Phone, Mail, ArrowLeft, Check, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import customerServiceRep from 'figma:asset/bf0b8e1121e258554f98cce7441d22a3f99dc7f9.png';

interface FAQ {
  question: string;
  answer: string;
}

interface Topic {
  id: string;
  label: string;
  faqs: FAQ[];
}

export default function HelpPage() {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [breakpoint, setBreakpoint] = useState<'S' | 'M' | 'L' | 'XL' | 'HD'>('M');
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    orderNumber: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [focusedField, setFocusedField] = useState<string>('');
  const [showOrderNumberTooltip, setShowOrderNumberTooltip] = useState(false);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1920) {
        setBreakpoint('HD');
      } else if (width >= 1440) {
        setBreakpoint('XL');
      } else if (width >= 1280) {
        setBreakpoint('L');
      } else if (width >= 768) {
        setBreakpoint('M');
      } else {
        setBreakpoint('S');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  // Determine headline size based on breakpoint
  let headlineSize = '';
  let headlineTracking = '';
  if (breakpoint === 'S') {
    headlineSize = 'text-[36px]';
    headlineTracking = 'tracking-[-0.72px]';
  } else if (breakpoint === 'M') {
    headlineSize = 'text-[48px]';
    headlineTracking = 'tracking-[-0.96px]';
  } else if (breakpoint === 'L' || breakpoint === 'XL') {
    headlineSize = 'text-[54px]';
    headlineTracking = 'tracking-[-1.08px]';
  } else {
    // HD
    headlineSize = 'text-[72px]';
    headlineTracking = 'tracking-[-1.44px]';
  }

  // Determine FAQ section title size based on breakpoint
  let faqTitleSize = '';
  if (breakpoint === 'S' || breakpoint === 'M') {
    faqTitleSize = 'text-[20px]';
  } else {
    // L, XL, HD
    faqTitleSize = 'text-[24px]';
  }

  // Global FAQs (shown by default)
  const globalFAQs: FAQ[] = [
    {
      question: 'What makes Andrew Lessman vitamins different from other brands?',
      answer: 'Our vitamins are created with the highest quality ingredients, manufactured in our own facility, and backed by decades of research. We never use artificial colors, fillers, or unnecessary additives.'
    },
    {
      question: 'How do I know which supplements are right for me?',
      answer: 'We recommend using our Find My Supplements tool to get personalized recommendations based on your health goals. You can also reach out to our Vitamin Specialists for one-on-one guidance.'
    },
    {
      question: 'Are your products tested for quality and purity?',
      answer: 'Yes, all our products undergo rigorous testing at every stage of production. We test for purity, potency, and quality to ensure you receive the best supplements possible.'
    },
    {
      question: 'Do you offer a satisfaction guarantee?',
      answer: 'Absolutely. We stand behind our products with a 100% satisfaction guarantee. If you\'re not completely satisfied, we\'ll make it right.'
    }
  ];

  // Topic-specific FAQs
  const topics: Topic[] = [
    {
      id: 'shipping-returns',
      label: 'Shipping & Returns',
      faqs: [
        {
          question: 'What are your shipping options and costs?',
          answer: 'We offer free ground shipping on all orders over $25. Express shipping options are available at checkout for an additional fee.'
        },
        {
          question: 'How long will it take to receive my order?',
          answer: 'Standard shipping typically takes 5-7 business days. Express shipping delivers in 2-3 business days.'
        },
        {
          question: 'What is your return policy?',
          answer: 'We accept returns within 30 days of delivery. Products must be in original condition. Contact our support team to initiate a return.'
        },
        {
          question: 'How do I track my order?',
          answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order from your account dashboard.'
        }
      ]
    },
    {
      id: 'orders-payments',
      label: 'Orders & Payments',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay.'
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'Orders can be modified or cancelled within 1 hour of placement. After that, please contact our support team for assistance.'
        },
        {
          question: 'Do you offer subscription services?',
          answer: 'Yes! Subscribe and save up to 15% on your favorite products. You can adjust frequency or cancel anytime from your account.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Yes, we use industry-standard encryption to protect your payment information. We never store your full credit card details.'
        }
      ]
    },
    {
      id: 'product-info',
      label: 'Product Information',
      faqs: [
        {
          question: 'Are your products suitable for vegetarians/vegans?',
          answer: 'Many of our products are vegetarian-friendly. Look for the vegetarian icon on product pages, or filter by dietary preference in our shop.'
        },
        {
          question: 'Do your products contain allergens?',
          answer: 'All allergen information is clearly listed on each product page. We manufacture in a facility that processes common allergens.'
        },
        {
          question: 'How should I store my supplements?',
          answer: 'Store in a cool, dry place away from direct sunlight. Keep bottles tightly closed when not in use.'
        },
        {
          question: 'What do the expiration dates mean?',
          answer: 'Expiration dates indicate when the product maintains full potency. We recommend using products before this date for maximum effectiveness.'
        }
      ]
    },
    {
      id: 'gift-cards',
      label: 'Gift Cards',
      faqs: [
        {
          question: 'How do I purchase a gift card?',
          answer: 'Gift cards are available for purchase on our website. Simply select the amount, add a personalized message, and check out. The recipient will receive the gift card via email.'
        },
        {
          question: 'Do gift cards expire?',
          answer: 'No, our gift cards never expire. Your recipient can use them whenever they\'re ready to shop.'
        },
        {
          question: 'Can I use multiple gift cards on one order?',
          answer: 'Yes, you can apply multiple gift cards to a single order during checkout.'
        },
        {
          question: 'Can I check my gift card balance?',
          answer: 'Yes, you can check your gift card balance by entering the card number on our gift card balance page or during checkout.'
        }
      ]
    },
    {
      id: 'promo-codes',
      label: 'Promo Codes',
      faqs: [
        {
          question: 'Where do I enter my promo code?',
          answer: 'You can enter your promo code during checkout. Look for the "Promo Code" field in your order summary before completing your purchase.'
        },
        {
          question: 'Can I use multiple promo codes on one order?',
          answer: 'Only one promo code can be applied per order. The system will automatically apply the code that gives you the best discount.'
        },
        {
          question: 'Why isn\'t my promo code working?',
          answer: 'Promo codes may have expiration dates, minimum purchase requirements, or product exclusions. Check the terms of your specific code. If you\'re still having trouble, contact our support team.'
        },
        {
          question: 'Do promo codes work with subscription orders?',
          answer: 'Most promo codes apply to one-time purchases only. Some special subscription codes may be available - check the specific terms of your code.'
        }
      ]
    },
    {
      id: 'money-back-guarantee',
      label: 'Money Back Guarantee',
      faqs: [
        {
          question: 'What is your money back guarantee?',
          answer: 'We stand behind our products with a 100% satisfaction guarantee. If you\'re not completely satisfied with any product, we\'ll provide a full refund or replacement.'
        },
        {
          question: 'How long do I have to request a refund?',
          answer: 'You can request a refund within 30 days of receiving your order. We want you to have enough time to try the product and see results.'
        },
        {
          question: 'Do I need to return the product for a refund?',
          answer: 'For most refund requests, you\'ll need to return the product. Contact our support team to receive return instructions and a prepaid shipping label.'
        },
        {
          question: 'How will I receive my refund?',
          answer: 'Refunds are issued to your original payment method within 5-7 business days after we receive your return.'
        }
      ]
    },
    {
      id: 'account-help',
      label: 'Account Help',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click "Sign In" in the header and select "Create Account". You can also create an account automatically when you place your first order.'
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'Click "Sign In" and then "Forgot Password". Enter your email address and we\'ll send you a verification code to reset your password.'
        },
        {
          question: 'How do I update my account information?',
          answer: 'Log in to your account and navigate to Account Settings. You can update your personal information, addresses, and payment methods there.'
        },
        {
          question: 'Can I view my order history?',
          answer: 'Yes, all your past orders are available in your account dashboard under "Order History".'
        }
      ]
    }
  ];

  const currentFAQs = selectedTopic 
    ? topics.find(t => t.id === selectedTopic)?.faqs || globalFAQs
    : globalFAQs;

  const currentTopicLabel = selectedTopic
    ? topics.find(t => t.id === selectedTopic)?.label
    : '';

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  // Format phone number as user types: (555) 123-4567
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Format: (XXX) XXX-XXXX
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    const errors: {[key: string]: string} = {};
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
      setShowSuccess(true);
      setSubmittedEmail(formData.email);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        orderNumber: '',
        message: ''
      });
      setFormErrors({});
      setShowContactForm(false);
    }, 2000);
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      orderNumber: '',
      message: ''
    });
    setFormErrors({});
    setShowContactForm(false);
  };

  const renderFormField = (field: string, label: string, required = false, type = 'text') => {
    const value = formData[field as keyof typeof formData];
    const error = formErrors[field];
    const isFocused = focusedField === field;
    const hasValue = value.length > 0;
    const showLabel = isFocused || hasValue;
    const fieldId = `contact-${field}`;

    return (
      <div className="relative" key={field}>
        <div className="relative">
          <input
            id={fieldId}
            type={type}
            value={value}
            onChange={(e) => {
              const newValue = field === 'phone' ? formatPhoneNumber(e.target.value) : e.target.value;
              setFormData({ ...formData, [field]: newValue });
              if (formErrors[field]) {
                setFormErrors({ ...formErrors, [field]: '' });
              }
            }}
            onFocus={() => setFocusedField(field)}
            onBlur={() => setFocusedField('')}
            className={`w-full py-[18px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors ${
              error 
                ? 'border-[#D84315] hover:border-[#D84315] focus:border-[#D84315]' 
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
        </div>
        {error && (
          <p id={`${fieldId}-error`} className="font-['Inter',sans-serif] text-[12px] text-[#D84315] mt-[6px]">
            {error}
          </p>
        )}
      </div>
    );
  };

  const renderTextarea = () => {
    const value = formData.message;
    const error = formErrors.message;
    const isFocused = focusedField === 'message';
    const hasValue = value.length > 0;
    const showLabel = isFocused || hasValue;
    const fieldId = 'contact-message';

    return (
      <div className="relative">
        <div className="relative">
          <textarea
            id={fieldId}
            value={value}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (formErrors.message) {
                setFormErrors({ ...formErrors, message: '' });
              }
            }}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField('')}
            rows={5}
            className={`w-full py-[18px] px-[16px] border rounded-[8px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#003b3c] focus:outline-none transition-colors resize-none ${
              error 
                ? 'border-[#D84315] hover:border-[#D84315] focus:border-[#D84315]' 
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
              Message *
            </label>
          )}
          {/* Placeholder label - shown when empty and not focused */}
          {!showLabel && (
            <label 
              htmlFor={fieldId}
              className="absolute left-[16px] top-[18px] font-['Inter',sans-serif] text-[16px] leading-[20px] text-[#406c6d] pointer-events-none transition-all duration-200"
            >
              Message *
            </label>
          )}
        </div>
        {error && (
          <p id={`${fieldId}-error`} className="font-['Inter',sans-serif] text-[12px] text-[#D84315] mt-[6px]">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Hero Section */}
      <div className="w-full bg-[#009296] px-[20px] md:px-[40px] py-[40px] md:py-[60px] lg:py-[80px]">
        <div className="w-full">
          <h1 className={`font-['STIX_Two_Text:Medium',serif] font-medium text-white ${headlineSize} leading-[1.1] ${headlineTracking} mb-[20px] md:mb-[24px]`}>
            We're here to <span className="text-[#48E1DC] not-italic" style={{ fontFamily: "'STIX Two Text', serif", fontStyle: 'italic', fontWeight: 500 }}>help</span>
          </h1>
          <p className="font-['Inter',sans-serif] text-[#D4F1F4] text-[20px] leading-[1.4] max-w-[1200px]">
            Browse our FAQs below or reach out to our Vitamin Specialist team to get all the answers you need.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full px-[20px] md:px-[40px] pt-[40px] lg:pt-[60px] pb-[60px] md:pb-[80px] lg:pb-[100px]">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[80px] xl:gap-[100px]">
            {/* Left Side - FAQs or Contact Form */}
            <div className="flex-1">
              {!showContactForm && !showSuccess ? (
                <>
                  {/* Topic Selector Callout */}
                  <div className="bg-[#F6F2EC] rounded-[10px] p-[24px] md:p-[28px] mb-[40px] md:mb-[48px]">
                    {/* Title */}
                    <h3 className="font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] text-[20px] leading-[1.3] mb-[16px]">
                      Select a topic for quick answers
                    </h3>
                    
                    {/* Topic Dropdown */}
                    <div className="relative">
                      <select
                        value={selectedTopic}
                        onChange={(e) => {
                          setSelectedTopic(e.target.value);
                          setExpandedFAQ(null);
                        }}
                        className="w-full appearance-none bg-white border border-[#D9E2E2] rounded-[8px] px-[16px] md:px-[18px] py-[12px] md:py-[14px] font-['Inter',sans-serif] text-[#003b3c] text-[16px] leading-[1.5] cursor-pointer hover:border-[#009296] focus:outline-none focus:border-[#009296] transition-colors"
                      >
                        <option value="">Choose a topic</option>
                        {topics.map((topic) => (
                          <option key={topic.id} value={topic.id}>
                            {topic.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-[16px] top-1/2 transform -translate-y-1/2 w-[20px] h-[20px] text-[#003b3c] pointer-events-none" />
                    </div>
                  </div>

                  {/* FAQ Section Title */}
                  <h2 className={`font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] ${faqTitleSize} leading-[1.2] mb-[28px] md:mb-[32px]`}>
                    {selectedTopic ? 'Is this what you are looking for?' : 'Most frequently asked...'}
                  </h2>

                  {/* FAQ List */}
                  <div className="space-y-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedTopic}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        {currentFAQs.map((faq, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                              duration: 0.25, 
                              delay: index * 0.05,
                              ease: "easeOut"
                            }}
                          >
                            <button
                              onClick={() => toggleFAQ(index)}
                              className="w-full flex items-center justify-between py-[20px] md:py-[24px] text-left group"
                            >
                              <span className="font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] md:text-[18px] lg:text-[20px] leading-[1.3] pr-[20px] group-hover:text-[#009296] transition-colors text-[20px]">
                                {faq.question}
                              </span>
                              {expandedFAQ === index ? (
                                <Minus className="w-[20px] h-[20px] text-[#003b3c] flex-shrink-0" />
                              ) : (
                                <Plus className="w-[20px] h-[20px] text-[#003b3c] flex-shrink-0" />
                              )}
                            </button>

                            {/* FAQ Answer */}
                            {expandedFAQ === index && (
                              <div className="pb-[24px] md:pb-[28px]">
                                <p className="font-['Inter',sans-serif] text-[#003b3c] text-[15px] md:text-[16px] leading-[1.6] pr-[40px]">
                                  {faq.answer}
                                </p>
                              </div>
                            )}

                            {/* Divider */}
                            {index < currentFAQs.length - 1 && (
                              <div className="w-full h-[1px] bg-[#D9E2E2]" />
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Still Need Help Section */}
                  <div className="mt-[60px] md:mt-[80px] mb-[40px] md:mb-[60px]">
                    <div className="flex items-center gap-[20px] md:gap-[24px]">
                      {/* Circular Image */}
                      <div className="w-[48px] h-[48px] md:w-[60px] md:h-[60px] rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={customerServiceRep}
                          alt="Customer service representative"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Text */}
                      <p className="font-['Inter',sans-serif] text-[#003b3c] text-[20px] leading-[1.4]">
                        <span className="font-['Inter:Medium',sans-serif] font-medium">Still can't find answers to your questions?</span> <span className="text-[#009296] underline">Get personalized help</span> from our Vitamin Specialists!
                      </p>
                    </div>
                  </div>
                </>
              ) : showSuccess ? (
                /* Success State */
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
                  <h2 className={`font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] ${faqTitleSize} leading-[1.2] mb-[16px]`}>
                    Message sent successfully!
                  </h2>
                  <p className="font-['Inter',sans-serif] text-[#406c6d] text-[16px] leading-[1.6] mb-[32px] md:mb-[40px] max-w-[600px] mx-auto">
                    Thank you for contacting us. We'll get back to you within 1 business day at: <span className="font-['Inter:Medium',sans-serif] font-medium text-[#009296]">{submittedEmail}</span>
                  </p>

                  {/* Close Button */}
                  <button
                    onClick={() => {
                      setShowSuccess(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-[#009296] text-white rounded-full px-[32px] py-[14px] font-['Inter:Medium',sans-serif] font-medium text-[15px] md:text-[16px] hover:bg-[#00b4ae] transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                /* Contact Form */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Form Title */}
                  <h2 className={`font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] ${faqTitleSize} leading-[1.2] mb-[8px]`}>
                    Send us a message
                  </h2>
                  <p className="font-['Inter',sans-serif] text-[#406c6d] text-[16px] leading-[1.6] mb-[32px] md:mb-[40px]">
                    Got a question about product, orders, returns, or anything else? Fill out the form below – we'd love to hear from you.
                  </p>

                  {/* Contact Form */}
                  <form onSubmit={handleContactFormSubmit} className="space-y-[20px]">
                    {renderFormField('email', 'Email', true, 'email')}
                    
                    {/* First and Last Name Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                      {renderFormField('firstName', 'First name', true)}
                      {renderFormField('lastName', 'Last name', true)}
                    </div>
                    
                    {renderFormField('phone', 'Phone number (optional)')}
                    {/* Order Number Field with Info Icon */}
                    <div className="relative">
                      <div className="relative">
                        {renderFormField('orderNumber', 'Order number (optional)')}
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
                    {renderTextarea()}

                    {/* Form Buttons */}
                    <div className="flex flex-col sm:flex-row gap-[12px] pt-[12px]">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 bg-white text-[#003b3c] border border-[#D9E2E2] rounded-full px-[24px] py-[14px] font-['Inter:Medium',sans-serif] font-medium text-[15px] md:text-[16px] hover:border-[#003b3c] transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-[#009296] text-white rounded-full px-[24px] py-[14px] font-['Inter:Medium',sans-serif] font-medium text-[15px] md:text-[16px] hover:bg-[#00b4ae] transition-colors"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
                  </form>

                  {/* Success Message */}
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="mt-[20px] bg-[#009296] text-white px-[24px] py-[14px] rounded-[8px] shadow-lg"
                    >
                      <p className="font-['Inter',sans-serif] text-[16px] leading-[1.6]">
                        Thank you for contacting us! We\'ll get back to you within 1 business day at <strong>{submittedEmail}</strong>.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Right Side - Contact Cards */}
            <div className="lg:w-[480px] xl:w-[540px] flex flex-col gap-[20px]">
              {/* Chat Card */}
              <div className="bg-[#F6F2EC] rounded-[10px] p-[24px] md:p-[30px]">
                <div className="flex items-start gap-[16px] mb-[20px]">
                  <div className="w-[40px] h-[40px] bg-[#009296] rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-[20px] h-[20px] text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] text-[18px] md:text-[20px] leading-[1.2] mb-[8px]">
                      Chat with us
                    </h3>
                    <p className="font-['Inter',sans-serif] text-[#003b3c] text-[14px] md:text-[16px] leading-[1.6]">
                      Receive live assistance from one of our Vitamin Specialists available 7 days a week between 6AM and 6PM PST.
                    </p>
                  </div>
                </div>
                <button className="w-full bg-[#009296] text-white rounded-full px-[24px] py-[14px] font-['Inter:Medium',sans-serif] font-medium text-[15px] md:text-[16px] hover:bg-[#00b4ae] transition-colors">
                  Start chatting
                </button>
              </div>

              {/* Phone Card */}
              <div className="bg-[#F6F2EC] rounded-[10px] p-[24px] md:p-[30px]">
                <div className="flex items-start gap-[16px] mb-[20px]">
                  <div className="w-[40px] h-[40px] bg-[#009296] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-[20px] h-[20px] text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] text-[18px] md:text-[20px] leading-[1.2] mb-[8px]">
                      Call our support
                    </h3>
                    <p className="font-['Inter',sans-serif] text-[#003b3c] text-[14px] md:text-[16px] leading-[1.6]">
                      You can call us at +1 800 800 1200 available 7 days a week between 6AM and 6PM PST.
                    </p>
                  </div>
                </div>
                <button className="w-full bg-[#009296] text-white rounded-full px-[24px] py-[14px] font-['Inter:Medium',sans-serif] font-medium text-[15px] md:text-[16px] hover:bg-[#00b4ae] transition-colors">
                  Call us
                </button>
              </div>

              {/* Email Card */}
              <div className="bg-[#F6F2EC] rounded-[10px] p-[24px] md:p-[30px]">
                <div className="flex items-start gap-[16px] mb-[20px]">
                  <div className="w-[40px] h-[40px] bg-[#009296] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-[20px] h-[20px] text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] text-[18px] md:text-[20px] leading-[1.2] mb-[8px]">
                      Email us
                    </h3>
                    <p className="font-['Inter',sans-serif] text-[#003b3c] text-[14px] md:text-[16px] leading-[1.6]">
                      Estimated reply time: 1 business day
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowContactForm(true);
                    // Scroll to top of page
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full bg-[#009296] text-white rounded-full px-[24px] py-[14px] font-['Inter:Medium',sans-serif] font-medium text-[15px] md:text-[16px] hover:bg-[#00b4ae] transition-colors"
                >
                  Email us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}