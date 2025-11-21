import React from 'react';
import { Product } from '../../data/products';
import { Star, ShoppingCart, Info } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = product.salePrice || product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  
  const handleAddToCart = () => {
    console.log('Add to cart:', product.id);
    alert('Product added to cart! (Integration point)');
  };
  
  return (
    <div className="bg-gradient-to-br from-[#f5f1e8] to-white border-2 border-[#e8e4d8] rounded-2xl p-6 hover:border-[#009296] hover:shadow-xl transition-all">
      <div className="flex gap-6">
        {/* Product Image Placeholder */}
        <div className="w-32 h-32 rounded-xl bg-white border border-[#e8e4d8] flex items-center justify-center flex-shrink-0">
          <div className="text-4xl">💊</div>
        </div>
        
        {/* Product Info */}
        <div className="flex-1">
          <h4 className="text-[#003b3c] text-xl mb-2">{product.name}</h4>
          <p className="text-[#666666] mb-3 leading-relaxed line-clamp-2">
            {product.description}
          </p>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#009296] text-[#009296]" />
              ))}
            </div>
            <span className="text-sm text-[#666666]">
              ({(2000 + Math.floor(Math.random() * 500)).toLocaleString()})
            </span>
          </div>
          
          {/* Key Ingredients */}
          {product.keyIngredients && product.keyIngredients.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.keyIngredients.slice(0, 4).map((ingredient, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white border border-[#e8e4d8] rounded-full text-xs text-[#003b3c]"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          )}
          
          {/* Price and CTA */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[#003b3c] text-2xl">
                ${price.toFixed(2)}
              </div>
              {hasDiscount && (
                <div className="text-[#999999] line-through text-sm">
                  ${product.price.toFixed(2)}
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <button className="px-4 py-2 border-2 border-[#009296] text-[#009296] rounded-lg hover:bg-[#009296] hover:text-white transition-all text-sm">
                Details
              </button>
              <button
                onClick={handleAddToCart}
                className="px-6 py-2 bg-gradient-to-r from-[#009296] to-[#007a7d] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
