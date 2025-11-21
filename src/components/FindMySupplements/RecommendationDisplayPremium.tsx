import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../../data/products';
import { formatPrice, calculateBundleDiscount } from '../../lib/recommendation-engine';
import { Star, ShoppingCart, Info, Sparkles, Check } from 'lucide-react';

interface ProductRecommendation {
  product: Product;
  score: number;
  reasoning: string;
  priority: 'primary' | 'secondary' | 'optional';
}

interface RecommendationDisplayPremiumProps {
  recommendations: ProductRecommendation[];
  onAddToCart: (productId: string) => void;
  onAddAllToCart: () => void;
  onStartOver: () => void;
}

export function RecommendationDisplayPremium({
  recommendations,
  onAddToCart,
  onAddAllToCart,
  onStartOver,
}: RecommendationDisplayPremiumProps) {
  const products = recommendations.map(r => r.product);
  const bundleInfo = calculateBundleDiscount(products);
  
  const primaryRecs = recommendations.filter(r => r.priority === 'primary');
  const secondaryRecs = recommendations.filter(r => r.priority === 'secondary');
  const optionalRecs = recommendations.filter(r => r.priority === 'optional');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#009296] to-[#007a7d] text-white px-6 py-2 rounded-full mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">Your Personalized Protocol</span>
        </motion.div>
        <h2 className="text-[#003b3c] mb-3">Here's What I Recommend</h2>
        <p className="text-[#666666] max-w-2xl mx-auto">
          Based on our conversation, I've put together a protocol specifically for you. These work synergistically for optimal results.
        </p>
      </div>
      
      {/* Primary Recommendations */}
      {primaryRecs.length > 0 && (
        <div className="space-y-6 mb-8">
          {primaryRecs.map((rec, index) => (
            <RecommendationCardPremium
              key={rec.product.id}
              recommendation={rec}
              number={index + 1}
              onAddToCart={onAddToCart}
              delay={index * 0.1}
            />
          ))}
        </div>
      )}
      
      {/* Secondary Recommendations */}
      {secondaryRecs.length > 0 && (
        <div className="space-y-6 mb-8">
          {secondaryRecs.map((rec, index) => (
            <RecommendationCardPremium
              key={rec.product.id}
              recommendation={rec}
              number={primaryRecs.length + index + 1}
              onAddToCart={onAddToCart}
              delay={(primaryRecs.length + index) * 0.1}
            />
          ))}
        </div>
      )}
      
      {/* Optional Recommendations */}
      {optionalRecs.length > 0 && (
        <div className="mt-10 pt-8 border-t border-[#e8e4d8]">
          <h3 className="text-[#003b3c] mb-2 flex items-center gap-2">
            <span>Optional Addition</span>
            <span className="text-sm text-[#666666] font-normal">(For enhanced results)</span>
          </h3>
          <div className="space-y-6">
            {optionalRecs.map((rec, index) => (
              <RecommendationCardPremium
                key={rec.product.id}
                recommendation={rec}
                isOptional
                onAddToCart={onAddToCart}
                delay={(primaryRecs.length + secondaryRecs.length + index) * 0.1}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Bundle CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-10 pt-8 border-t border-[#e8e4d8]"
      >
        {/* Pricing summary */}
        <div className="bg-gradient-to-br from-[#f5f1e8] to-[#e8e4d8] rounded-3xl p-8 mb-6 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#009296] opacity-5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#003b3c]/10">
              <span className="text-[#666666]">Individual Pricing:</span>
              <span className="text-[#666666] line-through text-[20px]">
                {formatPrice(bundleInfo.originalTotal)}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#009296] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#003b3c]">Complete Protocol Discount (15%)</span>
              </div>
              <span className="text-[#009296] text-[20px]">
                -{formatPrice(bundleInfo.savings)}
              </span>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-[#003b3c]/10">
              <span className="text-[#003b3c]">Your Total Today:</span>
              <span className="text-[#003b3c] text-[32px]">
                {formatPrice(bundleInfo.discountedTotal)}
              </span>
            </div>
          </div>
        </div>
        
        {/* CTA buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={onAddAllToCart}
            className="group relative px-8 py-5 bg-gradient-to-br from-[#009296] to-[#007a7d] text-white rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Shimmer effect */}
            <motion.div
              animate={{ x: ['0%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            
            <div className="relative flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Add Complete Protocol</span>
            </div>
          </button>
          
          <button
            onClick={onStartOver}
            className="px-8 py-5 border-2 border-[#009296] text-[#009296] rounded-2xl hover:bg-[#009296] hover:text-white transition-all duration-300"
          >
            Start Over
          </button>
        </div>
        
        {/* Educational note */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#e8e4d8]">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center">
              <span className="text-sm text-white">AL</span>
            </div>
            <div>
              <p className="text-[#003b3c] mb-1">A Note from Andrew</p>
              <p className="text-sm text-[#666666] leading-relaxed">
                These recommendations are based on what you've shared with me and my 40+ years of experience. Remember, supplements work best as part of a healthy lifestyle. Give them at least 2-4 weeks to see results, and always consult your healthcare provider if you have specific health concerns.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function RecommendationCardPremium({
  recommendation,
  number,
  isOptional = false,
  onAddToCart,
  delay = 0,
}: {
  recommendation: ProductRecommendation;
  number?: number;
  isOptional?: boolean;
  onAddToCart: (productId: string) => void;
  delay?: number;
}) {
  const { product, reasoning } = recommendation;
  const price = product.salePrice || product.price;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className="group bg-white rounded-3xl border-2 border-[#e8e4d8] p-8 hover:border-[#009296] hover:shadow-xl transition-all duration-300 relative overflow-hidden"
    >
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#009296]/0 via-[#009296]/0 to-[#009296]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-6 mb-6">
          {/* Number badge */}
          {number && (
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#009296] to-[#007a7d] text-white flex items-center justify-center shadow-lg">
              <span className="text-[20px]">{number}</span>
            </div>
          )}
          
          <div className="flex-1">
            {/* Product name and pricing */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h4 className="text-[#003b3c] mb-2">{product.name}</h4>
                <p className="text-[#666666] leading-relaxed">{product.description}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-[24px] text-[#003b3c]">{formatPrice(price)}</div>
                {product.salePrice && (
                  <div className="text-[#999999] line-through">
                    {formatPrice(product.price)}
                  </div>
                )}
              </div>
            </div>
            
            {/* Star rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#009296] text-[#009296]" />
                ))}
              </div>
              <span className="text-sm text-[#666666]">
                (2,{Math.floor(Math.random() * 9 + 1)}00+ reviews)
              </span>
            </div>
          </div>
        </div>
        
        {/* Reasoning */}
        <div className="bg-gradient-to-br from-[#f5f1e8] to-[#e8e4d8] rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#009296] opacity-5 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-start gap-3 mb-2">
              <Info className="w-5 h-5 text-[#009296] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#003b3c]">
                <strong>{isOptional ? 'Why this might help:' : 'Why I\'m recommending this:'}</strong>
              </p>
            </div>
            <p className="text-[#666666] leading-relaxed italic pl-8">
              "{reasoning}"
            </p>
          </div>
        </div>
        
        {/* Key ingredients */}
        {product.keyIngredients.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="text-sm text-[#666666]">Key ingredients:</span>
            {product.keyIngredients.slice(0, 4).map((ingredient, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white border border-[#e8e4d8] rounded-full text-sm text-[#003b3c]"
              >
                {ingredient}
              </span>
            ))}
          </div>
        )}
        
        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => onAddToCart(product.id)}
            className="flex-1 px-6 py-3 bg-gradient-to-br from-[#009296] to-[#007a7d] text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
          <button className="px-6 py-3 border-2 border-[#009296] text-[#009296] rounded-xl hover:bg-[#009296] hover:text-white transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
}
