/**
 * Order Confirmation Page Component
 * Best-practice confirmation experience following top ecommerce patterns
 * Features:
 * - Clear order confirmation with number
 * - Email confirmation message
 * - Order summary with items and pricing
 * - Shipping and billing information
 * - Estimated delivery date
 * - Next steps and support options
 * - Print receipt functionality
 * - Continue shopping CTA
 */

import { Check, Printer, Download, Truck, Mail, Phone, MessageCircle, Calendar, MapPin, CreditCard, Package } from 'lucide-react';
import { Button } from './ui/button';
import GlobalHeader from './GlobalHeader';
import GlobalFooter from './GlobalFooter';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useState } from 'react';

interface OrderItem {
  id: string;
  name: string;
  count: string;
  price: number;
  quantity: number;
  image: string;
  frequency?: string;
}

interface OrderConfirmationPageProps {
  orderData: {
    orderNumber: string;
    email: string;
    estimatedDelivery: string;
    shippingAddress: {
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
    };
    paymentMethod: {
      type: string;
      lastFour: string;
    };
    totals: {
      subtotal: number;
      shipping: number;
      tax: number;
      total: number;
    };
    items: OrderItem[];
  } | null;
  onContinueShopping: () => void;
  onMenuClick: () => void;
  onCartClick: () => void;
  onLogoClick: () => void;
  onSpecialsClick: () => void;
  onNavigateToCollection: (category: string) => void;
  onAccountClick: () => void;
  isLoggedIn?: boolean;
  userFirstName?: string;
}

export default function OrderConfirmationPage({
  orderData,
  onContinueShopping,
  onMenuClick,
  onCartClick,
  onLogoClick,
  onSpecialsClick,
  onNavigateToCollection,
  onAccountClick,
  isLoggedIn,
  userFirstName
}: OrderConfirmationPageProps) {
  // Current delivery stage (for animation)
  const [currentStage, setCurrentStage] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animate delivery progress on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStage(1); // Move to processing after mount
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Show loading or error state if no order data
  if (!orderData) {
    return (
      <div className="min-h-screen bg-[#F5F9F9] flex items-center justify-center">
        <div className="text-center">
          <p className="font-['Inter',sans-serif] text-[18px] text-[#406c6d]">
            No order data available
          </p>
          <button
            onClick={onContinueShopping}
            className="mt-[24px] px-[24px] py-[12px] bg-[#003b3c] rounded-[8px] font-['Inter',sans-serif] text-[14px] font-medium text-white hover:bg-[#005355] transition-colors"
          >
            Return to Shopping
          </button>
        </div>
      </div>
    );
  }

  const { orderNumber, email, estimatedDelivery, shippingAddress, paymentMethod, totals, items } = orderData;

  // Determine health category based on products
  const getHealthCategories = () => {
    const categories = new Set<string>();
    
    items.forEach(item => {
      const name = item.name.toLowerCase();
      
      if (name.includes('fiber') || name.includes('digest')) {
        categories.add('digestive');
      }
      if (name.includes('anti-oxidant') || name.includes('antioxidant')) {
        categories.add('antioxidant');
      }
      if (name.includes('energy') || name.includes('vitamin b')) {
        categories.add('energy');
      }
      if (name.includes('heart') || name.includes('coq10')) {
        categories.add('heart');
      }
      if (name.includes('joint') || name.includes('glucosamine')) {
        categories.add('joint');
      }
      if (name.includes('vitamin c') || name.includes('immune')) {
        categories.add('immune');
      }
      if (name.includes('omega') || name.includes('fish oil')) {
        categories.add('omega');
      }
    });
    
    // If no specific categories detected, default to general
    if (categories.size === 0) {
      categories.add('general');
    }
    
    return Array.from(categories);
  };

  const healthCategories = getHealthCategories();
  const isSingleCategory = healthCategories.length === 1;
  const isMultiCategory = healthCategories.length > 1;

  // Get formatted product names for personalization
  const getProductNames = () => {
    if (items.length === 1) {
      return items[0].name;
    } else if (items.length === 2) {
      return `${items[0].name} and ${items[1].name}`;
    } else {
      const allButLast = items.slice(0, -1).map(item => item.name).join(', ');
      return `${allButLast}, and ${items[items.length - 1].name}`;
    }
  };

  const productNames = getProductNames();

  // Expected results content based on health category
  const getExpectedResults = () => {
    // Multi-category journey (for carts with multiple health focus areas)
    if (isMultiCategory) {
      // Get product names for personalization
      const productList = items.map(item => item.name).join(', ');
      
      // Build specific combination insights based on what they ordered
      let combinationInsight = "";
      const hasDigestive = healthCategories.includes('digestive');
      const hasAntioxidant = healthCategories.includes('antioxidant');
      const hasEnergy = healthCategories.includes('energy');
      const hasHeart = healthCategories.includes('heart');
      const hasJoint = healthCategories.includes('joint');
      const hasImmune = healthCategories.includes('immune');
      const hasOmega = healthCategories.includes('omega');
      
      // Generate specific combination insights
      if (hasDigestive && hasAntioxidant) {
        combinationInsight = "Digestive health and cellular protection work hand-in-hand. When your digestive system is functioning optimally with proper fiber support, your body can better absorb and utilize the protective antioxidants. A healthy gut is essential for nutrient absorption—it's the gateway to all the benefits your supplements can provide.";
      } else if (hasHeart && hasOmega) {
        combinationInsight = "Heart health and omega-3 support are a perfect pairing. The essential fatty acids work directly with cardiovascular nutrients to support healthy circulation, reduce inflammation, and promote optimal heart function. This is one of the most powerful combinations for long-term cardiovascular wellness.";
      } else if (hasEnergy && hasAntioxidant) {
        combinationInsight = "Energy production and cellular protection complement each other beautifully. B-vitamins support your mitochondria's energy production, while antioxidants protect those same cellular powerhouses from oxidative stress. Together, they help you feel energized while protecting your cells from the inside out.";
      } else if (hasDigestive && hasImmune) {
        combinationInsight = "Did you know that 70% of your immune system lives in your gut? By supporting digestive health alongside immune function, you're addressing wellness at its foundation. A healthy digestive system helps your immune cells communicate effectively and respond to challenges.";
      } else if (hasJoint && hasOmega) {
        combinationInsight = "Joint comfort and omega-3s are natural partners. The anti-inflammatory properties of essential fatty acids work synergistically with joint-supporting nutrients to reduce stiffness and support healthy connective tissue. This combination addresses joint health from multiple angles.";
      } else if (hasHeart && hasAntioxidant) {
        combinationInsight = "Cardiovascular health and antioxidant protection are intimately connected. Antioxidants help protect your cardiovascular system from oxidative damage, while heart-specific nutrients support healthy circulation and heart muscle function. Together, they provide comprehensive cardiovascular support.";
      } else if (hasImmune && hasAntioxidant) {
        combinationInsight = "Immune support and antioxidant protection work together to fortify your body's natural defenses. Antioxidants neutralize free radicals that can weaken immune function, while immune-supporting nutrients strengthen your body's ability to respond to challenges. It's a powerful defensive combination.";
      } else {
        // Generic multi-category for other combinations
        combinationInsight = "I've formulated each of these supplements to work together harmoniously. When you combine targeted formulas from different health categories, you're giving your body comprehensive nutritional support that addresses multiple aspects of wellness simultaneously.";
      }
      
      return {
        greeting: `Thank you for choosing ${productList}. I'm thrilled you're taking a comprehensive approach to your wellness.`,
        intro: combinationInsight,
        week1: "In the first week, your body begins absorbing these complementary nutrients. I've designed each formula to work at the cellular level, and when combined, they support multiple aspects of your health simultaneously—each one enhancing the others' effectiveness.",
        weeks2to4: "By weeks 2-4, most of my customers tell me they're noticing real improvements. This is when the complementary benefits really begin to show. Your body is using these nutrients together, exactly as I intended when I formulated them.",
        days30to60: "At 30-60 days, you should experience the full benefits of your personalized supplement regimen. This is when I typically hear from customers about sustained improvements—not just in one area, but across all the health goals these formulas address together.",
        closing: "Remember, consistency is key. I've always believed that the best results come from making supplements a daily habit, especially when you're taking a comprehensive approach like this."
      };
    }

    // Single category journeys (existing)
    const categories: Record<string, {
      greeting: string;
      intro: string;
      week1: string;
      weeks2to4: string;
      days30to60: string;
      closing: string;
    }> = {
      digestive: {
        greeting: "Thank you for choosing my digestive health formula.",
        intro: "I've spent over 40 years perfecting formulas that support optimal digestive function. Digestive health is truly the foundation of overall wellness.",
        week1: "In the first week, you may notice improved regularity and reduced bloating. My formula is designed to help your digestive system begin adjusting to a healthier balance.",
        weeks2to4: "By weeks 2-4, most customers report consistent digestive comfort and better nutrient absorption. This is when the beneficial effects really start to compound.",
        days30to60: "At 30-60 days, you should experience optimal digestive health with balanced gut flora and sustained regularity. This is the transformation I designed this formula to deliver.",
        closing: "Take it consistently with food and water—your digestive system will thank you."
      },
      antioxidant: {
        greeting: "Thank you for investing in cellular protection.",
        intro: "Antioxidants are my passion. I formulated this to provide comprehensive free radical defense at the cellular level—exactly what your body needs in today's world.",
        week1: "In the first week, your body begins neutralizing free radicals and supporting cellular protection. This foundational work is invisible but incredibly important.",
        weeks2to4: "By weeks 2-4, many customers notice improved vitality and better recovery from exercise. Your cells are getting the protection they need to function optimally.",
        days30to60: "At 30-60 days, you should experience peak antioxidant benefits—comprehensive cellular protection and sustained energy. This is when you'll really feel the difference.",
        closing: "You're giving your cells the tools they need to stay healthy and resilient."
      },
      energy: {
        greeting: "Thank you for choosing my energy support formula.",
        intro: "I've always believed energy should come from proper nutrition, not stimulants. This formula provides the B-vitamins and nutrients your body needs for natural, sustained energy.",
        week1: "In the first week, you may experience improved mental clarity and reduced afternoon fatigue. These B-vitamins get to work quickly supporting your energy metabolism.",
        weeks2to4: "By weeks 2-4, most customers report sustained energy throughout the day—no crashes, no jitters. Just consistent, natural vitality.",
        days30to60: "At 30-60 days, you should experience optimal energy balance with consistent all-day vitality and mental sharpness. This is the natural energy I designed this formula to provide.",
        closing: "This is how energy is supposed to feel—natural, sustained, and healthy."
      },
      heart: {
        greeting: "Thank you for prioritizing your cardiovascular health.",
        intro: "Heart health has been a cornerstone of my formulations for decades. This formula provides the precise nutrients your cardiovascular system needs to thrive.",
        week1: "In the first week, cardiovascular support begins at the cellular level, promoting healthy circulation and heart muscle function. The work starts immediately.",
        weeks2to4: "By weeks 2-4, many customers notice improved stamina during physical activity and better recovery. Your heart is getting the nutritional support it deserves.",
        days30to60: "At 30-60 days, you should experience optimal heart health support with sustained cardiovascular function and circulation. This is the level of support I designed this formula to deliver.",
        closing: "Your heart works 24/7 for you—give it the nutritional support it needs."
      },
      joint: {
        greeting: "Thank you for choosing my joint support formula.",
        intro: "I've formulated this with the precise nutrients your joints, cartilage, and connective tissues need to stay healthy and comfortable.",
        week1: "In the first week, these key nutrients begin reaching your cartilage and connective tissues. Joint support takes time, but the foundation is being built.",
        weeks2to4: "By weeks 2-4, most customers report improved flexibility, reduced stiffness, and better mobility. This is when you start feeling the difference in daily activities.",
        days30to60: "At 30-60 days, you should experience optimal joint health with sustained comfort, flexibility, and freedom of movement. This is the level of support I designed this formula to provide.",
        closing: "Stay consistent—your joints will reward you with improved comfort and mobility."
      },
      immune: {
        greeting: "Thank you for investing in your immune health.",
        intro: "I've spent years perfecting immune support formulas that provide your body's natural defenses with exactly what they need to function optimally.",
        week1: "In the first week, your immune system begins receiving enhanced support as these key nutrients boost your body's natural defenses.",
        weeks2to4: "By weeks 2-4, many customers notice improved resilience and faster recovery from everyday stressors. Your immune system is getting stronger.",
        days30to60: "At 30-60 days, you should experience optimal immune function with comprehensive year-round protection and vitality. This is the immune support I designed this formula to deliver.",
        closing: "A strong immune system is your best defense—you're giving yours the support it needs."
      },
      omega: {
        greeting: "Thank you for choosing my omega-3 formula.",
        intro: "Essential fatty acids are critical for brain, heart, and overall cellular health. I've formulated this to provide the purest, most effective omega-3s available.",
        week1: "In the first week, these essential fatty acids begin supporting your brain function, heart health, and reducing inflammation at the cellular level.",
        weeks2to4: "By weeks 2-4, many customers notice improved mental clarity, mood balance, and cardiovascular wellness. Omega-3s are powerful nutrients.",
        days30to60: "At 30-60 days, you should experience optimal omega-3 benefits with sustained brain health, heart function, and healthy inflammatory response. This is the transformation I designed this formula to deliver.",
        closing: "Your brain and heart need these essential fats—you're giving them the best."
      },
      general: {
        greeting: "Thank you for your order.",
        intro: "I've dedicated my life to creating supplements that provide your body with essential nutrients in their most effective forms. You're making a smart investment in your health.",
        week1: "In the first week, your body begins absorbing these essential nutrients, supporting overall wellness at the cellular level. Good nutrition starts from within.",
        weeks2to4: "By weeks 2-4, most customers notice improved vitality, better sleep quality, and enhanced daily wellness. This is when proper nutrition really shows.",
        days30to60: "At 30-60 days, you should experience optimal benefits with comprehensive nutritional support and balanced health. This is the level of wellness I designed these formulas to deliver.",
        closing: "You're giving your body what it needs to thrive—stay consistent and you'll feel the difference."
      }
    };

    return categories[healthCategories[0]] || categories.general;
  };

  const expectedResults = getExpectedResults();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In production, this would generate a PDF
    alert('Receipt download would be triggered here');
  };

  return (
    <div className="min-h-screen bg-[rgb(255,255,255)]">
      <GlobalHeader
        onMenuClick={onMenuClick}
        onCartClick={onCartClick}
        onLogoClick={onLogoClick}
        onSpecialsClick={onSpecialsClick}
        onNavigateToCollection={onNavigateToCollection}
        onAccountClick={onAccountClick}
        isLoggedIn={isLoggedIn}
        userFirstName={userFirstName}
      />
      
      {/* Success Header */}
      <div className="bg-white">
        <div className="max-w-[1400px] mx-auto px-[20px] m:px-[40px] pt-[40px] m:pt-[60px] pb-[30px] m:pb-[40px]">
          {/* Success Message - Centered */}
          <div className="text-center max-w-[800px] mx-auto mb-[40px]">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-[80px] h-[80px] bg-[#00a651] rounded-full mb-[24px] animate-[success-pop_0.6s_cubic-bezier(0.34,1.56,0.64,1)]">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-[check-draw_0.5s_cubic-bezier(0.65,0,0.45,1)_0.4s_forwards]"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-dasharray-[24] stroke-dashoffset-[24] animate-[check-stroke_0.5s_cubic-bezier(0.65,0,0.45,1)_0.4s_forwards]"
                  style={{
                    strokeDasharray: '24',
                    strokeDashoffset: '24',
                  }}
                />
              </svg>
            </div>

            {/* Success Message */}
            <h1 className="font-['STIX_Two_Text',serif] text-[#003b3c] mb-[16px] text-[34px] s:text-[34px] m:text-[38px] l:text-[54px] xl:text-[72px] hd:text-[72px]">
              Thank you, {shippingAddress.firstName.charAt(0).toUpperCase() + shippingAddress.firstName.slice(1).toLowerCase()}!
            </h1>
            
            <p className="font-['Inter',sans-serif] text-[20px] text-[#406c6d]">
              Your order <span className="font-medium text-[#003b3c] whitespace-nowrap">#{orderNumber}</span> has been confirmed and will be shipped soon.
            </p>
          </div>

          {/* Horizontal Delivery Timeline - FULL WIDTH */}
          <div className="bg-[rgb(235,246,244)] rounded-[12px] p-[24px] s:p-[32px] m:p-[40px]">
            <div className="relative max-w-full mx-auto">
              {/* Progress bar background */}
              <div className="absolute left-[5%] right-[5%] top-[16px] h-[3px] bg-[#c9d9da] rounded-full"></div>
              
              {/* Active progress bar (animated to processing stage) */}
              <div 
                className="absolute left-[5%] top-[16px] h-[3px] bg-[#009296] rounded-full transition-all duration-1000 ease-out"
                style={{ width: currentStage >= 1 ? '28.33%' : '0%' }}
              ></div>
              
              <div className="relative grid grid-cols-4 gap-[8px] s:gap-[12px]">
                {/* Stage 1: Order Confirmed */}
                <div className="flex flex-col items-center">
                  <div className="w-[36px] h-[36px] rounded-full bg-[#00a651] flex items-center justify-center shadow-md mb-[12px] s:mb-[16px] ring-4 ring-white relative z-10">
                    <Check className="w-[18px] h-[18px] text-white" strokeWidth={3} />
                  </div>
                  <p className="font-['Inter',sans-serif] text-[16px] m:text-[20px] font-medium text-[#003b3c] mb-[4px] s:mb-[6px] text-center">
                    Confirmed
                  </p>
                  <p className="font-['Inter',sans-serif] text-[11px] s:text-[12px] m:text-[13px] l:text-[14px] text-[#406c6d] text-center leading-tight px-[4px]">
                    Confirmation sent to <span className="font-medium text-[#003b3c]">{email}</span>
                  </p>
                </div>

                {/* Stage 2: Processing */}
                <div className="flex flex-col items-center">
                  <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center shadow-md mb-[12px] s:mb-[16px] ring-4 ring-white relative z-10 transition-all duration-500 ${
                    currentStage >= 1 
                      ? 'bg-[#009296]' 
                      : 'bg-white border-[3px] border-[#c9d9da]'
                  }`}>
                    {currentStage >= 1 ? (
                      <div className="w-[10px] h-[10px] rounded-full bg-white animate-[pulse-grow_1.5s_ease-in-out_infinite]"></div>
                    ) : (
                      <div className="w-[10px] h-[10px] rounded-full bg-[#c9d9da]"></div>
                    )}
                  </div>
                  <p className={`font-['Inter',sans-serif] text-[16px] m:text-[20px] font-medium mb-[4px] s:mb-[6px] text-center transition-colors duration-500 ${
                    currentStage >= 1 ? 'text-[#003b3c]' : 'text-[#7a9394]'
                  }`}>
                    Processing
                  </p>
                  <p className="font-['Inter',sans-serif] text-[11px] s:text-[12px] m:text-[13px] l:text-[14px] text-[#406c6d] text-center leading-tight px-[4px]">
                    Your order is being prepared
                  </p>
                </div>

                {/* Stage 3: Shipped */}
                <div className="flex flex-col items-center">
                  <div className="w-[36px] h-[36px] rounded-full bg-white border-[3px] border-[#c9d9da] flex items-center justify-center shadow-md mb-[12px] s:mb-[16px] ring-4 ring-white relative z-10">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#c9d9da]"></div>
                  </div>
                  <p className="font-['Inter',sans-serif] text-[16px] m:text-[20px] font-medium text-[#7a9394] mb-[4px] s:mb-[6px] text-center">
                    Shipped
                  </p>
                  <p className="font-['Inter',sans-serif] text-[11px] s:text-[12px] m:text-[13px] l:text-[14px] text-[#406c6d] text-center leading-tight px-[4px]">
                    You'll receive tracking info via email
                  </p>
                </div>

                {/* Stage 4: Delivered */}
                <div className="flex flex-col items-center">
                  <div className="w-[36px] h-[36px] rounded-full bg-white border-[3px] border-[#c9d9da] flex items-center justify-center shadow-md mb-[12px] s:mb-[16px] ring-4 ring-white relative z-10">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#c9d9da]"></div>
                  </div>
                  <p className="font-['Inter',sans-serif] text-[16px] m:text-[20px] font-medium text-[#7a9394] mb-[4px] s:mb-[6px] text-center">
                    Delivered
                  </p>
                  <p className="font-['Inter',sans-serif] text-[11px] s:text-[12px] m:text-[13px] l:text-[14px] text-[#406c6d] text-center leading-tight px-[4px]">
                    Estimated <span className="font-medium text-[#003b3c]">{estimatedDelivery}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-[20px] m:px-[40px] pt-[40px] pb-[60px] lg:pb-[80px]">
        <div className="grid lg:grid-cols-3 gap-[24px] xl:gap-[32px]">
          
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-[24px]">
            
            {/* Order Items Card */}
            <div className="bg-white rounded-[12px] border border-[#e0e0e0] p-[24px] m:p-[32px]">
              <div className="flex items-center gap-[12px] mb-[24px]">
                <Package className="w-[24px] h-[24px] text-[#003b3c]" />
                <h2 className="font-['Inter',sans-serif] text-[24px] font-medium text-[#003b3c]">
                  Order Items
                </h2>
              </div>

              <div className="space-y-[20px]">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-[16px]">
                    <div className="w-[80px] h-[80px] bg-[#fafafa] rounded-[8px] overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-['Inter',sans-serif] text-[16px] font-medium text-[#003b3c] mb-[4px]">
                        {item.name}
                      </h3>
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[4px]">
                        {item.count}
                      </p>
                      {item.frequency && (
                        <p className="font-['Inter',sans-serif] text-[12px] text-[#00a651]">
                          Auto-Ship: {item.frequency}
                        </p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[4px]">
                        Qty: {item.quantity}
                      </p>
                      <p className="font-['Inter',sans-serif] text-[16px] font-medium text-[#003b3c]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="border-t border-[#e0e0e0] mt-[24px] pt-[24px] space-y-[12px]">
                <div className="flex justify-between">
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">Subtotal</p>
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#003b3c]">${totals.subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">Shipping</p>
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#003b3c]">
                    {totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">Tax</p>
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#003b3c]">${totals.tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between pt-[12px] border-t border-[#e0e0e0]">
                  <p className="font-['Inter',sans-serif] text-[20px] font-medium text-[#003b3c]">Total</p>
                  <p className="font-['Inter',sans-serif] text-[20px] font-medium text-[#003b3c]">${totals.total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Shipping & Payment Info */}
            <div className="grid m:grid-cols-2 gap-[24px]">
              {/* Shipping Address */}
              <div className="bg-white rounded-[12px] border border-[#e0e0e0] p-[24px]">
                <div className="flex items-center gap-[12px] mb-[16px]">
                  <MapPin className="w-[20px] h-[20px] text-[#003b3c]" />
                  <h3 className="font-['Inter',sans-serif] text-[20px] font-medium text-[#003b3c]">
                    Shipping Address
                  </h3>
                </div>
                <div className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] space-y-[4px]">
                  <p className="text-[#003b3c] font-medium">
                    {shippingAddress.firstName} {shippingAddress.lastName}
                  </p>
                  <p>{shippingAddress.address}</p>
                  <p>
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-[12px] border border-[#e0e0e0] p-[24px]">
                <div className="flex items-center gap-[12px] mb-[16px]">
                  <CreditCard className="w-[20px] h-[20px] text-[#003b3c]" />
                  <h3 className="font-['Inter',sans-serif] text-[20px] font-medium text-[#003b3c]">
                    Payment Method
                  </h3>
                </div>
                <div className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                  <p className="text-[#003b3c] font-medium mb-[4px]">
                    {paymentMethod.type}
                  </p>
                  <p>
                    •••• {paymentMethod.lastFour}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Support */}
          <div className="space-y-[24px]">
            
            {/* Actions Card */}
            <div className="bg-white rounded-[12px] border border-[#e0e0e0] p-[24px]">
              <h3 className="font-['Inter',sans-serif] text-[20px] font-medium text-[#003b3c] mb-[16px]">
                Order Actions
              </h3>
              
              <div className="space-y-[12px]">
                <button
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-[8px] px-[16px] py-[12px] border border-[#d9e2e2] rounded-[8px] font-['Inter',sans-serif] text-[16px] font-medium text-[#003b3c] hover:bg-[#fafafa] transition-colors"
                >
                  <Printer className="w-[16px] h-[16px]" />
                  Print Receipt
                </button>

                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-[8px] px-[16px] py-[12px] border border-[#d9e2e2] rounded-[8px] font-['Inter',sans-serif] text-[16px] font-medium text-[#003b3c] hover:bg-[#fafafa] transition-colors"
                >
                  <Download className="w-[16px] h-[16px]" />
                  Download PDF
                </button>

                <button
                  onClick={onContinueShopping}
                  className="w-full px-[16px] py-[12px] bg-[#009296] rounded-[8px] font-['Inter',sans-serif] text-[16px] font-medium text-white hover:bg-[#007a7d] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Order Status & Account Card */}
            <div className="bg-white rounded-[12px] border border-[#e0e0e0] p-[24px]">
              <h3 className="font-['Inter',sans-serif] text-[20px] font-medium text-[#003b3c] mb-[16px]">
                Order Status & Account
              </h3>
              
              <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[20px] leading-relaxed">
                You can check your order status anytime by logging in with your email address.
              </p>

              <button
                onClick={onAccountClick}
                className="w-full px-[16px] py-[12px] bg-[#009296] rounded-[8px] font-['Inter',sans-serif] text-[16px] font-medium text-white hover:bg-[#007a7d] transition-colors"
              >
                Log In
              </button>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-[12px] border border-[#e0e0e0] p-[24px]">
              <h3 className="font-['Inter',sans-serif] text-[20px] font-medium text-[#003b3c] mb-[16px]">
                Need Help?
              </h3>
              
              <div className="space-y-[12px]">
                <a 
                  href="tel:1-800-800-1200"
                  className="flex items-center gap-[12px] p-[12px] rounded-[8px] hover:bg-[#fafafa] transition-colors group"
                >
                  <div className="w-[36px] h-[36px] rounded-full bg-[rgb(235,246,244)] flex items-center justify-center group-hover:bg-[#e8f5f0] transition-colors">
                    <Phone className="w-[18px] h-[18px] text-[#003b3c]" />
                  </div>
                  <div>
                    <p className="font-['Inter',sans-serif] text-[16px] font-medium text-[#003b3c]">
                      Call Us
                    </p>
                    <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                      1-800-800-1200
                    </p>
                  </div>
                </a>

                <a 
                  href="/chat"
                  className="flex items-center gap-[12px] p-[12px] rounded-[8px] hover:bg-[#fafafa] transition-colors group"
                >
                  <div className="w-[36px] h-[36px] rounded-full bg-[rgb(235,246,244)] flex items-center justify-center group-hover:bg-[#e8f5f0] transition-colors">
                    <MessageCircle className="w-[18px] h-[18px] text-[#003b3c]" />
                  </div>
                  <div>
                    <p className="font-['Inter',sans-serif] text-[16px] font-medium text-[#003b3c]">
                      Live Chat
                    </p>
                    <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                      Talk to one of our vitamin specialists
                    </p>
                  </div>
                </a>

                <a 
                  href="mailto:support@procapslabs.com"
                  className="flex items-center gap-[12px] p-[12px] rounded-[8px] hover:bg-[#fafafa] transition-colors group"
                >
                  <div className="w-[36px] h-[36px] rounded-full bg-[rgb(235,246,244)] flex items-center justify-center group-hover:bg-[#e8f5f0] transition-colors">
                    <Mail className="w-[18px] h-[18px] text-[#003b3c]" />
                  </div>
                  <div>
                    <p className="font-['Inter',sans-serif] text-[16px] font-medium text-[#003b3c]">
                      Email Us
                    </p>
                    <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                      support@procapslabs.com
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @keyframes success-pop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes check-stroke {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes pulse-grow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.7;
          }
        }
        
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
      
      <GlobalFooter />
    </div>
  );
}