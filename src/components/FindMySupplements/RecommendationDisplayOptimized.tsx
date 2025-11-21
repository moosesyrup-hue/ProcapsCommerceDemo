import React from 'react';
import { Product } from '../../data/products';
import { formatPrice, calculateBundleDiscount } from '../../lib/recommendation-engine';
import { Star, ShoppingCart, Sparkles, Check } from 'lucide-react';

interface ProductRecommendation {
  product: Product;
  score: number;
  reasoning: string;
  priority: 'primary' | 'secondary' | 'optional';
}

interface RecommendationDisplayOptimizedProps {
  recommendations: ProductRecommendation[];
  onAddToCart: (productId: string) => void;
  onAddAllToCart: () => void;
  onStartOver: () => void;
}

export function RecommendationDisplayOptimized({
  recommendations,
  onAddToCart,
  onAddAllToCart,
  onStartOver,
}: RecommendationDisplayOptimizedProps) {
  const products = recommendations.map(r => r.product);
  const bundleInfo = calculateBundleDiscount(products);
  
  const primaryRecs = recommendations.filter(r => r.priority === 'primary');
  const secondaryRecs = recommendations.filter(r => r.priority === 'secondary');
  const optionalRecs = recommendations.filter(r => r.priority === 'optional');
  
  return (
    <div>
      {/* Compact Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#009296] to-[#007a7d] text-white px-4 py-1.5 rounded-full mb-3 text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Your Personalized Protocol</span>
        </div>
        <h2 className="text-[#003b3c] text-[24px] mb-2">Here's What I Recommend</h2>
        <p className="text-[#666666]">
          Based on our conversation, these work synergistically for optimal results.
        </p>
      </div>
      
      {/* Compact Product Cards */}
      <div className="space-y-4 mb-6">
        {primaryRecs.map((rec, index) => (
          <ProductCardOptimized
            key={rec.product.id}
            recommendation={rec}
            number={index + 1}
            onAddToCart={onAddToCart}
          />
        ))}
        {secondaryRecs.map((rec, index) => (
          <ProductCardOptimized
            key={rec.product.id}
            recommendation={rec}
            number={primaryRecs.length + index + 1}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      
      {/* Optional */}
      {optionalRecs.length > 0 && (
        <div className="mb-6 pt-4 border-t border-[#e8e4d8]">
          <h3 className="text-[#003b3c] mb-3 text-[18px]">Optional Addition</h3>
          <div className="space-y-4">
            {optionalRecs.map((rec) => (
              <ProductCardOptimized
                key={rec.product.id}
                recommendation={rec}
                isOptional
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Sticky Bundle CTA */}
      <div className="sticky bottom-0 bg-white border-t border-[#e8e4d8] -mx-6 px-6 pt-4 pb-4 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
        {/* Compact Pricing */}
        <div className="bg-gradient-to-br from-[#f5f1e8] to-[#e8e4d8] rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-[#666666]">Individual Total:</span>
            <span className="text-[#666666] line-through">{formatPrice(bundleInfo.originalTotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#009296]" />
              <span className="text-[#003b3c]">Bundle Discount (15%)</span>
            </div>
            <span className="text-[#009296]">-{formatPrice(bundleInfo.savings)}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[#003b3c]/10">
            <span className="text-[#003b3c]">Your Total:</span>
            <span className="text-[#003b3c] text-[24px]">{formatPrice(bundleInfo.discountedTotal)}</span>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onAddAllToCart}
            className="px-6 py-3.5 bg-gradient-to-br from-[#009296] to-[#007a7d] text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add Bundle</span>
          </button>
          <button
            onClick={onStartOver}
            className="px-6 py-3.5 border-2 border-[#009296] text-[#009296] rounded-xl hover:bg-[#009296] hover:text-white transition-all"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductCardOptimized({
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
    <div className="bg-white rounded-xl border-2 border-[#e8e4d8] p-4 hover:border-[#009296] transition-all">
      {/* Compact Header */}
      <div className="flex items-start gap-3 mb-3">
        {number && (
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#009296] to-[#007a7d] text-white flex items-center justify-center text-sm">
            {number}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h4 className="text-[#003b3c] text-[16px] leading-tight">{product.name}</h4>
            <div className="flex-shrink-0 text-[#003b3c]">{formatPrice(price)}</div>
          </div>
          <p className="text-sm text-[#666666] line-clamp-2 mb-2">{product.description}</p>
          
          {/* Compact rating */}
          <div className="flex items-center gap-1 text-xs text-[#999999]">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#009296] text-[#009296]" />
              ))}
            </div>
            <span>(2,{Math.floor(Math.random() * 9 + 1)}00+)</span>
          </div>
        </div>
      </div>
      
      {/* Compact Reasoning */}
      <div className="bg-[#f5f5f5] rounded-lg p-3 mb-3 text-sm">
        <p className="text-[#666666] italic leading-relaxed">
          "{reasoning}"
        </p>
      </div>
      
      {/* Compact Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onAddToCart(product.id)}
          className="flex-1 px-4 py-2 bg-gradient-to-br from-[#009296] to-[#007a7d] text-white rounded-lg hover:shadow-md transition-all text-sm flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
        <button className="px-4 py-2 border-2 border-[#009296] text-[#009296] rounded-lg hover:bg-[#009296] hover:text-white transition-all text-sm">
          Details
        </button>
      </div>
    </div>
  );
}
