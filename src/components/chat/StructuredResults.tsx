import { UserData } from './ChatWithAndrew';
import { getUserProductNames } from '../../data/purchaseHistory';
import { Check } from 'lucide-react';

interface ProductRecommendation {
  name: string;
  image: string;
  why: string;
  details: string;
}

interface StructuredResultsProps {
  userData: UserData;
  products: ProductRecommendation[];
  analysis: string;
  education: string;
  synergy: string;
  expectations: string;
  safety: string | null;
  onStartOver: () => void;
}

// Helper to get approach message
function getApproachMessage(userData: UserData): string {
  const supplementHistory = {
    'none': "I love that you're starting fresh - we can build a proper foundation from the ground up. I'm recommending things that work TOGETHER. This isn't about taking everything - it's about the right combination for YOU.",
    'few': "You're already taking some steps, which is great. Let me help you optimize what you're doing. I'm focusing on the most important nutrients for your specific situation - things that work synergistically together.",
    'several': "You're clearly committed to your health, and I respect that. But more isn't always better. Let me share what I consider the CORE essentials for your goals - the supplements that give you the most benefit."
  }[userData.supplements || 'none'] || "Let me share my approach for your specific situation.";

  return supplementHistory;
}

export default function StructuredResults({
  userData,
  products,
  analysis,
  education,
  synergy,
  expectations,
  safety,
  onStartOver
}: StructuredResultsProps) {
  // Get user's purchase history
  const userEmail = localStorage.getItem('userEmail');
  const purchasedProducts = userEmail ? getUserProductNames(userEmail) : [];
  
  // Helper to check if user owns a product
  const userOwnsProduct = (productName: string) => {
    return purchasedProducts.some(purchased => 
      productName.toLowerCase().includes(purchased.toLowerCase()) || 
      purchased.toLowerCase().includes(productName.toLowerCase())
    );
  };

  return (
    <div className="animate-fade-in">
      {/* Structured Content Card */}
      <div className="bg-white rounded-2xl px-5 py-4 space-y-5">
        
        {/* Section: Your Situation */}
        <div>
          <h3 className="text-[#003b3c] mb-2 font-['Inter',sans-serif] font-semibold text-base xl:text-lg">Your Situation</h3>
          <p className="text-[14px] xl:text-base leading-[1.6] text-[#003b3c]/90 whitespace-pre-line">
            {analysis}
          </p>
        </div>

        {/* Section: What You Need to Know */}
        <div className="pt-3 border-t border-[#D9E2E2]">
          <h3 className="text-[#003b3c] mb-2 font-['Inter',sans-serif] font-semibold text-base xl:text-lg">What You Need to Know</h3>
          <p className="text-[14px] xl:text-base leading-[1.6] text-[#003b3c]/90 whitespace-pre-line">
            {education}
          </p>
        </div>

        {/* Section: My Approach */}
        <div className="pt-3 border-t border-[#D9E2E2]">
          <h3 className="text-[#003b3c] mb-2 font-['Inter',sans-serif] font-semibold text-base xl:text-lg">My Approach</h3>
          <p className="text-[14px] xl:text-base leading-[1.6] text-[#003b3c]/90 whitespace-pre-line">
            {getApproachMessage(userData)}
          </p>
        </div>

        {/* Section: My Recommendations */}
        <div className="pt-3 border-t border-[#D9E2E2]">
          <h3 className="text-[#003b3c] mb-3 font-['Inter',sans-serif] font-semibold text-base xl:text-lg">My Recommendations for You</h3>
          
          <div className="space-y-3">
            {products.map((product, index) => {
              const isOwned = userOwnsProduct(product.name);
              
              return (
              <div key={index} className="bg-[#F7F2EC] rounded-[10px] p-4 relative">
                {/* "You're using this" Badge */}
                {isOwned && (
                  <div className="absolute top-3 right-3 bg-[#48E1DC] text-[#003b3c] text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>You're using this</span>
                  </div>
                )}
                
                {/* Product Layout */}
                <div className="flex gap-4 items-start mb-3">
                  {/* Larger Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#003b3c] text-[15px] xl:text-[17px] mb-1.5 font-['Inter',sans-serif] font-semibold pr-24">{product.name}</h4>
                    <p className="text-[13px] xl:text-[15px] text-[#003b3c]/70 leading-[1.5] mb-2">
                      {product.why}
                    </p>
                    {isOwned && (
                      <p className="text-[13px] xl:text-[15px] leading-[1.5] text-[#009296] font-medium mb-2">
                        Great! You're already getting the benefits. Let's make sure you're taking it consistently for the best results.
                      </p>
                    )}
                    <p className="text-[13px] xl:text-[15px] leading-[1.5] text-[#003b3c]/80">
                      {product.details}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {isOwned ? (
                    <>
                      <button className="flex-1 border border-[#009296] text-[#009296] text-[13px] xl:text-[15px] py-2.5 px-4 rounded-lg hover:bg-[#009296]/5 transition-colors font-medium">
                        View Product
                      </button>
                      <button className="flex-1 bg-[#009296] text-white text-[13px] xl:text-[15px] py-2.5 px-4 rounded-lg hover:bg-[#007a7d] transition-colors font-medium">
                        Reorder
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="flex-1 border border-[#009296] text-[#009296] text-[13px] xl:text-[15px] py-2.5 px-4 rounded-lg hover:bg-[#009296]/5 transition-colors font-medium">
                        Learn More
                      </button>
                      <button className="flex-1 bg-[#009296] text-white text-[13px] xl:text-[15px] py-2.5 px-4 rounded-lg hover:bg-[#007a7d] transition-colors font-medium">
                        Add to Cart
                      </button>
                    </>
                  )}
                </div>
              </div>
            )})
            }
          </div>
        </div>

        {/* Section: How These Work Together */}
        <div className="pt-3 border-t border-[#D9E2E2]">
          <h3 className="text-[#003b3c] mb-2 font-['Inter',sans-serif] font-semibold text-base xl:text-lg">How These Work Together</h3>
          <p className="text-[14px] xl:text-base leading-[1.6] text-[#003b3c]/90 whitespace-pre-line">
            {synergy}
          </p>
        </div>

        {/* Section: What to Expect */}
        <div className="pt-3 border-t border-[#D9E2E2]">
          <h3 className="text-[#003b3c] mb-2 font-['Inter',sans-serif] font-semibold text-base xl:text-lg">What to Expect</h3>
          <p className="text-[14px] xl:text-base leading-[1.6] text-[#003b3c]/90 whitespace-pre-line">
            {expectations}
          </p>
        </div>

        {/* Section: Important Safety Notes (conditional) */}
        {safety && (
          <div className="pt-3 border-t border-[#D9E2E2] bg-[#FFF9E6] -mx-5 -mb-4 px-5 py-4 rounded-b-2xl border-b-0">
            <h3 className="text-[#003b3c] mb-2 text-base xl:text-lg">Important Safety Notes</h3>
            <p className="text-[14px] xl:text-base leading-[1.6] text-[#003b3c]/90 whitespace-pre-line">
              {safety}
            </p>
          </div>
        )}

        {/* Final Disclaimer */}
        <div className={`pt-3 ${!safety ? 'border-t border-[#D9E2E2]' : 'bg-[#FFF9E6] -mx-5 px-5 pb-4'}`}>
          <p className="text-[13px] xl:text-[15px] leading-[1.5] text-[#003b3c]/60">
            <strong>Please note:</strong> These recommendations are based on general wellness principles and what you've shared with me. Always consult your healthcare provider before starting new supplements, especially if you take medications or have health conditions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className={`pt-4 space-y-2 ${safety ? 'bg-[#FFF9E6] -mx-5 px-5 pb-4 -mb-4 rounded-b-2xl' : ''}`}>
          <button className="w-full bg-[#009296] text-white text-[14px] xl:text-base py-3 px-4 rounded-lg hover:bg-[#007a7d] transition-colors">
            View All Products
          </button>
          <button
            onClick={onStartOver}
            className="w-full bg-white border border-[#D9E2E2] text-[#003b3c] text-[14px] xl:text-base py-3 px-4 rounded-lg hover:border-[#009296] hover:bg-[#009296]/5 transition-colors"
          >
            Start a New Consultation
          </button>
        </div>
      </div>
    </div>
  );
}