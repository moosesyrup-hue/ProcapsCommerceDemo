import { motion } from 'motion/react';
import type { UserData } from '../chat/ChatWithAndrew';
import { getRecommendedProducts } from '../../data/productRecommendations';

interface WellnessGuideResultsProps {
  userData: UserData;
  onStartOver: () => void;
}

export default function WellnessGuideResults({ userData, onStartOver }: WellnessGuideResultsProps) {
  const recommendations = getRecommendedProducts(userData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-[#009296] to-[#007a7d] text-white rounded-2xl p-8 shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-white text-[24px]">Your Personalized Plan</h2>
          </div>
        </div>
        <p className="text-white/90 text-[15px] leading-[1.7]">
          Based on your profile, Andrew has identified {recommendations.length} supplements that align with your 
          health goals. Each recommendation includes detailed explanations in the chat to help you understand 
          why it's right for you.
        </p>
      </div>

      {/* Products */}
      <div className="space-y-4">
        {recommendations.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
            className="bg-white rounded-2xl border-2 border-[#D9E2E2] overflow-hidden hover:border-[#48E1DC] transition-colors shadow-sm hover:shadow-md"
          >
            <div className="flex gap-4 p-5">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-[#F7F2EC] rounded-xl overflow-hidden border border-[#D9E2E2]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <h3 className="text-[#003b3c] text-[16px] mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-[13px] text-[#003b3c]/60">{product.count}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[#009296] text-[18px]">${product.price.toFixed(2)}</div>
                  </div>
                </div>

                {/* Why This Product */}
                <div className="bg-[#FFF9E6] border border-[#FFE599] rounded-lg p-3 mb-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#009296] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[13px] text-[#003b3c]/80 leading-[1.6]">
                      {product.reason}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full bg-[#009296] text-white text-[14px] py-2.5 rounded-lg hover:bg-[#007a7d] transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add All CTA */}
      <div className="bg-white rounded-2xl p-6 border-2 border-[#D9E2E2] shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-[#003b3c] mb-1">Complete Wellness Package</h3>
            <p className="text-[14px] text-[#003b3c]/70">
              Get all {recommendations.length} recommended supplements
            </p>
          </div>
          <div className="text-right">
            <div className="text-[#003b3c]/50 text-[14px] line-through mb-1">
              ${recommendations.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
            </div>
            <div className="text-[#009296] text-[24px]">
              ${(recommendations.reduce((sum, p) => sum + p.price, 0) * 0.85).toFixed(2)}
            </div>
            <div className="text-[12px] text-[#009296]">Save 15%</div>
          </div>
        </div>
        <button className="w-full bg-[#009296] text-white text-[16px] py-3.5 rounded-xl hover:bg-[#007a7d] transition-colors shadow-md hover:shadow-lg">
          Add Complete Package to Cart
        </button>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-br from-[#F7F2EC] to-[#EDE7DD] rounded-2xl p-6 border-2 border-[#D9E2E2]">
        <h3 className="text-[#003b3c] mb-3">What Happens Next?</h3>
        <div className="space-y-2.5">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-[#48E1DC] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-[14px] text-[#003b3c]/80 leading-[1.6]">
              <strong>Week 1-2:</strong> Your body begins absorbing these essential nutrients
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-[#48E1DC] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-[14px] text-[#003b3c]/80 leading-[1.6]">
              <strong>Week 3-4:</strong> Most people start noticing positive changes in energy and wellbeing
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-[#48E1DC] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-[14px] text-[#003b3c]/80 leading-[1.6]">
              <strong>8-12 Weeks:</strong> Full benefits become apparent as nutrients build to optimal levels
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-white rounded-xl p-5 border border-[#D9E2E2]/60">
        <p className="text-[12px] text-[#003b3c]/50 leading-[1.5] text-center">
          <strong className="text-[#003b3c]/70">Important:</strong> This tool provides educational information based 
          on general wellness principles, not medical advice. These statements have not been evaluated by the FDA. 
          These products are not intended to diagnose, treat, cure, or prevent any disease. Always consult your 
          healthcare provider before starting any new supplement regimen.
        </p>
      </div>

      {/* Start Over */}
      <div className="text-center pt-2">
        <button
          onClick={onStartOver}
          className="text-[#009296] text-[14px] underline hover:text-[#007a7d] transition-colors"
        >
          Start a New Consultation
        </button>
      </div>
    </motion.div>
  );
}
