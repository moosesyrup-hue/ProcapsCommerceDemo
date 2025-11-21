import React from 'react';
import { Product } from '../../data/products';
import { formatPrice, calculateBundleDiscount } from '../../lib/recommendation-engine';
import { Star, ShoppingCart, Sparkles, Check, Info } from 'lucide-react';

interface ProductRecommendation {
  product: Product;
  score: number;
  reasoning: string;
  priority: 'primary' | 'secondary' | 'optional';
}

interface RecommendationDisplayProps {
  recommendations: ProductRecommendation[];
  onAddToCart: (productId: string) => void;
  onAddAllToCart: () => void;
  onStartOver: () => void;
}

export function RecommendationDisplay({
  recommendations,
  onAddToCart,
  onAddAllToCart,
  onStartOver,
}: RecommendationDisplayProps) {
  const products = recommendations.map(r => r.product);
  const bundleInfo = calculateBundleDiscount(products);
  
  const primaryRecs = recommendations.filter(r => r.priority === 'primary');
  const secondaryRecs = recommendations.filter(r => r.priority === 'secondary');
  const optionalRecs = recommendations.filter(r => r.priority === 'optional');
  
  return (
    <div className="pb-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#009296] to-[#007a7d] text-white px-5 py-2 rounded-full mb-4">
          <Sparkles className="w-5 h-5" />
          <span>Your Personalized Protocol</span>
        </div>
        <h2 className="text-[#003b3c] text-3xl mb-3">Here's What I Recommend</h2>
        <p className="text-[#666666] text-lg leading-relaxed">
          Based on our conversation, I've selected supplements that work synergistically for optimal results.
        </p>
      </div>
      
      {/* Product Cards */}
      <div className="space-y-6 mb-8">
        {primaryRecs.map((rec, index) => (
          <ProductCard
            key={rec.product.id}
            recommendation={rec}
            number={index + 1}
            onAddToCart={onAddToCart}
          />
        ))}
        {secondaryRecs.map((rec, index) => (
          <ProductCard
            key={rec.product.id}
            recommendation={rec}
            number={primaryRecs.length + index + 1}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      
      {/* Optional */}
      {optionalRecs.length > 0 && (
        <div className="mb-8 pt-8 border-t border-[#e8e4d8]">
          <h3 className="text-[#003b3c] text-xl mb-2">Optional Addition</h3>
          <p className="text-[#666666] mb-6">For enhanced results, you might also consider:</p>
          <div className="space-y-6">
            {optionalRecs.map((rec) => (
              <ProductCard
                key={rec.product.id}
                recommendation={rec}
                isOptional
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Bundle CTA */}
      <div className="bg-gradient-to-br from-[#f5f1e8] to-[#e8e4d8] rounded-2xl p-8 mb-6">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#003b3c]/10">
          <span className="text-[#666666] text-lg">Individual Pricing:</span>
          <span className="text-[#666666] line-through text-2xl">
            {formatPrice(bundleInfo.originalTotal)}
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#009296] flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#003b3c] text-lg">Complete Protocol Discount (15%)</span>
          </div>
          <span className="text-[#009296] text-2xl">
            -{formatPrice(bundleInfo.savings)}
          </span>
        </div>
        
        <div className="flex items-center justify-between pt-6 border-t border-[#003b3c]/10">
          <span className="text-[#003b3c] text-xl">Your Total Today:</span>
          <span className="text-[#003b3c] text-4xl">
            {formatPrice(bundleInfo.discountedTotal)}
          </span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={onAddAllToCart}
          className="px-8 py-5 bg-gradient-to-br from-[#009296] to-[#007a7d] text-white rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
        >
          <ShoppingCart className="w-6 h-6" />
          <span>Add Complete Protocol</span>
        </button>
        
        <button
          onClick={onStartOver}
          className="px-8 py-5 border-2 border-[#009296] text-[#009296] rounded-xl hover:bg-[#009296] hover:text-white transition-all text-lg"
        >
          Start Over
        </button>
      </div>
      
      {/* Educational Note */}
      <div className="bg-white border border-[#e8e4d8] rounded-2xl p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center">
            <span className="text-white text-lg">AL</span>
          </div>
          <div>
            <p className="text-[#003b3c] mb-2 text-lg">A Note from Andrew</p>
            <p className="text-[#666666] leading-relaxed">
              These recommendations are based on what you've shared with me and my 40+ years of experience formulating supplements. Remember, supplements work best as part of a healthy lifestyle. Give them at least 2-4 weeks to see results, and always consult your healthcare provider if you have specific health concerns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  recommendation,
  number,
  isOptional = false,
  onAddToCart,
}: {
  recommendation: ProductRecommendation;
  number?: number;
  isOptional?: boolean;
  onAddToCart: (productId: string) => void;
}) {
  const { product, reasoning } = recommendation;
  const price = product.salePrice || product.price;
  
  return (
    <div className="bg-white border-2 border-[#e8e4d8] rounded-2xl p-8 hover:border-[#009296] hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex items-start gap-6 mb-6">
        {number && (
          <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-[#009296] to-[#007a7d] text-white flex items-center justify-center text-2xl">
            {number}
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-start justify-between gap-6 mb-3">
            <div>
              <h4 className="text-[#003b3c] text-xl mb-2">{product.name}</h4>
              <p className="text-[#666666] leading-relaxed">{product.description}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-[#003b3c] text-3xl">{formatPrice(price)}</div>
              {product.salePrice && (
                <div className="text-[#999999] line-through text-lg">
                  {formatPrice(product.price)}
                </div>
              )}
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#009296] text-[#009296]" />
              ))}
            </div>
            <span className="text-[#666666]">
              (2,{Math.floor(Math.random() * 9 + 1)}00+ reviews)
            </span>
          </div>
        </div>
      </div>
      
      {/* Reasoning */}
      <div className="bg-gradient-to-br from-[#f5f1e8] to-[#e8e4d8] rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-2">
          <Info className="w-5 h-5 text-[#009296] flex-shrink-0 mt-1" />
          <p className="text-[#003b3c]">
            <strong>{isOptional ? 'Why this might help:' : 'Why I\'m recommending this:'}</strong>
          </p>
        </div>
        <p className="text-[#666666] leading-relaxed italic pl-8">
          "{reasoning}"
        </p>
      </div>
      
      {/* Key Ingredients */}
      {product.keyIngredients.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="text-[#666666]">Key ingredients:</span>
          {product.keyIngredients.slice(0, 4).map((ingredient, index) => (
            <span
              key={index}
              className="px-4 py-1.5 bg-white border border-[#e8e4d8] rounded-full text-[#003b3c]"
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
          className="flex-1 px-6 py-4 bg-gradient-to-br from-[#009296] to-[#007a7d] text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-lg"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
        <button className="px-6 py-4 border-2 border-[#009296] text-[#009296] rounded-xl hover:bg-[#009296] hover:text-white transition-all text-lg">
          Learn More
        </button>
      </div>
    </div>
  );
}
