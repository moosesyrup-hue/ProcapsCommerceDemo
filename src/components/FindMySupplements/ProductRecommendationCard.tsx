import React from 'react';
import { Product } from '../../data/products';
import { Star, ShoppingCart, Info } from 'lucide-react';

interface ProductRecommendation {
  product: Product;
  score: number;
  reasoning: string;
  priority: 'primary' | 'secondary' | 'optional';
}

interface ProductRecommendationCardProps {
  recommendation: ProductRecommendation;
  number?: number;
  isOptional?: boolean;
  onAddToCart: (productId: string) => void;
}

export function ProductRecommendationCard({
  recommendation,
  number,
  isOptional = false,
  onAddToCart,
}: ProductRecommendationCardProps) {
  const { product, reasoning } = recommendation;
  const price = product.salePrice || product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  
  return (
    <div className="bg-white rounded-2xl border-2 border-[#e8e4d8] p-8 hover:border-[#009296] hover:shadow-xl transition-all">
      <div className="flex gap-8">
        {/* Number Badge */}
        {number && (
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#009296] to-[#007a7d] text-white flex items-center justify-center text-2xl">
              {number}
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-8 mb-6">
            <div className="flex-1">
              <h3 className="text-[#003b3c] text-2xl mb-3">{product.name}</h3>
              <p className="text-[#666666] leading-relaxed mb-4">{product.description}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#009296] text-[#009296]" />
                  ))}
                </div>
                <span className="text-[#666666]">
                  ({(2000 + Math.floor(Math.random() * 500)).toLocaleString()} reviews)
                </span>
              </div>
            </div>
            
            {/* Pricing */}
            <div className="flex-shrink-0 text-right">
              <div className="text-[#003b3c] text-4xl mb-1">
                ${price.toFixed(2)}
              </div>
              {hasDiscount && (
                <div className="text-[#999999] line-through text-xl">
                  ${product.price.toFixed(2)}
                </div>
              )}
            </div>
          </div>
          
          {/* Why Recommended */}
          <div className="bg-gradient-to-br from-[#f5f1e8] to-[#e8e4d8] rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <Info className="w-5 h-5 text-[#009296] flex-shrink-0 mt-0.5" />
              <p className="text-[#003b3c]">
                <strong>{isOptional ? 'Why this might help:' : 'Why I\'m recommending this:'}</strong>
              </p>
            </div>
            <p className="text-[#666666] leading-relaxed italic pl-8">
              "{reasoning}"
            </p>
          </div>
          
          {/* Key Ingredients */}
          {product.keyIngredients && product.keyIngredients.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-[#666666]">Key ingredients:</span>
              {product.keyIngredients.slice(0, 5).map((ingredient, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 bg-white border border-[#e8e4d8] rounded-full text-[#003b3c] text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          )}
          
          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => onAddToCart(product.id)}
              className="px-8 py-4 bg-gradient-to-r from-[#009296] to-[#007a7d] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 text-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
            
            <button className="px-8 py-4 border-2 border-[#009296] text-[#009296] rounded-xl hover:bg-[#009296] hover:text-white transition-all text-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
