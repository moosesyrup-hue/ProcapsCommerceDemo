import React from 'react';
import { getRecommendationsFromAnswers } from '../../lib/recommendation-engine';
import { ProductRecommendationCard } from './ProductRecommendationCard';
import { Sparkles, X, ShoppingCart } from 'lucide-react';

interface ResultsScreenProps {
  answers: Record<string, string[]>;
  onStartOver: () => void;
  onClose: () => void;
}

export function ResultsScreen({ answers, onStartOver, onClose }: ResultsScreenProps) {
  const recommendations = getRecommendationsFromAnswers(answers);
  
  const primaryRecs = recommendations.filter(r => r.priority === 'primary');
  const secondaryRecs = recommendations.filter(r => r.priority === 'secondary');
  const optionalRecs = recommendations.filter(r => r.priority === 'optional');
  
  const totalPrice = recommendations.reduce((sum, rec) => sum + (rec.product.salePrice || rec.product.price), 0);
  const bundleDiscount = totalPrice * 0.15;
  const finalPrice = totalPrice - bundleDiscount;
  
  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
    alert('Product added to cart! (Integration point)');
  };
  
  const handleAddAllToCart = () => {
    console.log('Add all to cart');
    alert('Complete protocol added to cart! (Integration point)');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#fafafa] to-[#f5f1e8]">
      {/* Header Bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-[#e8e4d8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center text-white text-xs sm:text-sm flex-shrink-0">
              AL
            </div>
            <div className="min-w-0">
              <div className="text-[#003b3c] text-sm sm:text-base truncate">Your Personalized Protocol</div>
              <div className="text-xs text-[#999999]">{recommendations.length} supplements recommended</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={onStartOver}
              className="px-3 sm:px-6 py-2 sm:py-2.5 border-2 border-[#e8e4d8] text-[#666666] rounded-lg hover:border-[#009296] hover:text-[#009296] transition-all text-xs sm:text-sm whitespace-nowrap"
            >
              Start Over
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-[#999999] hover:text-[#003b3c] hover:bg-[#f5f5f5] rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-32">
        {/* Introduction */}
        <div className="mb-8 sm:mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#009296] to-[#007a7d] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">Your Personalized Protocol</span>
          </div>
          
          <h1 className="text-[#003b3c] text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
            Here's What I Recommend
          </h1>
          
          <p className="text-[#666666] text-base sm:text-lg md:text-xl leading-relaxed">
            Based on what you've shared with me about your health goals and lifestyle, I've carefully selected supplements that work synergistically together for optimal results. Each recommendation is backed by clinical research and formulated to the highest standards.
          </p>
        </div>
        
        {/* Primary Recommendations */}
        {primaryRecs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-[#003b3c] text-2xl mb-6">Essential Foundation</h2>
            <div className="grid grid-cols-1 gap-6">
              {primaryRecs.map((rec, index) => (
                <ProductRecommendationCard
                  key={rec.product.id}
                  recommendation={rec}
                  number={index + 1}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Secondary Recommendations */}
        {secondaryRecs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-[#003b3c] text-2xl mb-6">Targeted Support</h2>
            <div className="grid grid-cols-1 gap-6">
              {secondaryRecs.map((rec, index) => (
                <ProductRecommendationCard
                  key={rec.product.id}
                  recommendation={rec}
                  number={primaryRecs.length + index + 1}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Optional Recommendations */}
        {optionalRecs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-[#003b3c] text-2xl mb-4">Optional Enhancement</h2>
            <p className="text-[#666666] mb-6">For even better results, you might also consider:</p>
            <div className="grid grid-cols-1 gap-6">
              {optionalRecs.map((rec) => (
                <ProductRecommendationCard
                  key={rec.product.id}
                  recommendation={rec}
                  isOptional
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Sticky Bottom Bar - Bundle CTA */}
      <div className="sticky bottom-0 z-40 bg-white border-t border-[#e8e4d8] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between gap-8">
            {/* Pricing */}
            <div className="flex items-center gap-8">
              <div>
                <div className="text-sm text-[#999999] mb-1">Individual Pricing</div>
                <div className="text-2xl text-[#666666] line-through">${totalPrice.toFixed(2)}</div>
              </div>
              
              <div className="w-px h-12 bg-[#e8e4d8]" />
              
              <div>
                <div className="text-sm text-[#009296] mb-1">Complete Protocol (15% Off)</div>
                <div className="text-4xl text-[#003b3c]">${finalPrice.toFixed(2)}</div>
              </div>
              
              <div className="px-4 py-2 bg-[#009296]/10 rounded-lg">
                <div className="text-sm text-[#666666]">You Save</div>
                <div className="text-xl text-[#009296]">${bundleDiscount.toFixed(2)}</div>
              </div>
            </div>
            
            {/* CTA */}
            <button
              onClick={handleAddAllToCart}
              className="px-12 py-5 bg-gradient-to-r from-[#009296] to-[#007a7d] text-white rounded-2xl hover:shadow-2xl transition-all text-xl flex items-center gap-3 whitespace-nowrap"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Add Complete Protocol</span>
            </button>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-[#999999] mb-1">Regular Price</div>
                <div className="text-lg text-[#666666] line-through">${totalPrice.toFixed(2)}</div>
              </div>
              
              <div>
                <div className="text-xs text-[#009296] mb-1">Protocol Price (15% Off)</div>
                <div className="text-2xl text-[#003b3c]">${finalPrice.toFixed(2)}</div>
              </div>
            </div>
            
            <button
              onClick={handleAddAllToCart}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#009296] to-[#007a7d] text-white rounded-2xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add Complete Protocol</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Andrew's Note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#e8e4d8]">
          <div className="flex gap-4 sm:gap-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center text-white text-base sm:text-xl flex-shrink-0">
              AL
            </div>
            <div>
              <h3 className="text-[#003b3c] text-lg sm:text-xl mb-2 sm:mb-3">A Personal Note from Andrew</h3>
              <p className="text-[#666666] text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                These recommendations are based on what you've shared with me and my 40+ years of experience formulating premium supplements. I've selected formulations that work synergistically together for optimal results.
              </p>
              <p className="text-[#666666] text-sm sm:text-base leading-relaxed">
                Remember, supplements work best as part of a healthy lifestyle. Give them at least 2-4 weeks to experience the full benefits, and always consult your healthcare provider if you have specific health concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}