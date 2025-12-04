import { useState, useEffect } from 'react';
import { ChevronDown, Plus, Minus, MessageCircle, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Hero Section */}
      <div className="w-full bg-[#009296] px-[20px] md:px-[40px] py-[40px] md:py-[60px] lg:py-[80px]">
        <div className="w-full">
          <h1 className={`font-['STIX_Two_Text:Medium',serif] font-medium text-white ${headlineSize} leading-[1.1] ${headlineTracking} mb-[20px] md:mb-[24px]`}>
            Contact us
          </h1>
          <p className="font-['Inter',sans-serif] text-[#D4F1F4] text-[20px] leading-[1.4] max-w-[1200px]">
            We're here to help. Browse our FAQs below or reach out to our Vitamin Specialist team to get all the answers you need.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full px-[20px] md:px-[40px] pt-[40px] lg:pt-[60px] pb-[60px] md:pb-[80px] lg:pb-[100px]">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[80px] xl:gap-[100px]">
            {/* Left Side - FAQs */}
            <div className="flex-1">
              {/* Topic Selector Callout */}
              <div className="bg-[#F6F2EC] rounded-[10px] p-[24px] md:p-[28px] mb-[40px] md:mb-[48px]">
                {/* Title */}
                <h3 className="font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] text-[20px] leading-[1.3] mb-[16px]">
                  What can we help you with today?
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
                <button className="w-full bg-[#009296] text-white rounded-full px-[24px] py-[14px] font-['Inter:Medium',sans-serif] font-medium text-[15px] md:text-[16px] hover:bg-[#00b4ae] transition-colors">
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