import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { useBreakpoint } from '../../hooks/useBreakpoint';

// Custom sharp star component
const SharpStar = ({ filled, size = 48 }: { filled: boolean; size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill={filled ? '#FFA726' : 'none'}
        stroke={filled ? '#FFA726' : '#D9E2E2'}
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
};

interface ProductReviewViewProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    name: string;
    count: string;
    image: string;
  };
  orderId: string;
  existingReview?: {
    rating: number;
    title: string;
    text: string;
  };
}

export default function ProductReviewView({ 
  isOpen, 
  onClose, 
  item, 
  orderId,
  existingReview 
}: ProductReviewViewProps) {
  const { breakpoint } = useBreakpoint();
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState(existingReview?.title || '');
  const [reviewText, setReviewText] = useState(existingReview?.text || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Please select a star rating');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(existingReview ? 'Review updated successfully' : 'Thank you for your review!');
    setIsSubmitting(false);
    onClose();
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const getRatingLabel = (value: number) => {
    switch (value) {
      case 5: return 'Excellent';
      case 4: return 'Good';
      case 3: return 'Average';
      case 2: return 'Fair';
      case 1: return 'Poor';
      default: return '';
    }
  };

  // Get responsive headline sizing based on breakpoint
  const headlineSize = breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[54px]' : breakpoint === 'L' ? 'text-[38px]' : breakpoint === 'M' ? 'text-[34px]' : 'text-[28px]';
  const headlineTracking = breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.08px]' : breakpoint === 'L' ? 'tracking-[-0.76px]' : breakpoint === 'M' ? 'tracking-[-0.68px]' : 'tracking-[-0.56px]';

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={onClose}
        className="inline-flex items-center gap-[8px] mb-[24px] text-[#009296] hover:text-[#007d81] transition-colors cursor-pointer focus:outline-none group"
      >
        <ArrowLeft className="size-[20px] group-hover:-translate-x-[2px] transition-transform" />
        <span className="font-['Inter',sans-serif] text-[16px] font-medium">
          Back to order details
        </span>
      </button>

      {/* Page Title */}
      <div className="mb-[40px]">
        <h1 className={`font-['STIX_Two_Text',sans-serif] font-medium leading-[1.1] ${headlineSize} ${headlineTracking} text-[#003b3c] mb-[16px]`}>
          {existingReview ? 'Edit Your Review' : 'Write a Review'}
        </h1>
        <p className="font-['Inter',sans-serif] text-[16px] text-[#406c6d]">
          Order #{orderId}
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
        {/* Left Column - Review Form (2/3 width) */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-[8px] p-[30px] md:p-[40px]">
            {/* Star Rating */}
            <div className="mb-[32px]">
              <label className="block font-['Inter',sans-serif] text-[18px] font-medium text-[#003b3c] mb-[16px]">
                Overall Rating <span className="text-[#C62828]">*</span>
              </label>
              <div className="flex items-center gap-[12px] mb-[12px]">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleRatingClick(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="cursor-pointer focus:outline-none transition-transform hover:scale-110"
                    aria-label={`Rate ${value} stars`}
                  >
                    <SharpStar
                      filled={value <= (hoverRating || rating)}
                      size={breakpoint === 'HD' ? 44 : 48}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="font-['Inter',sans-serif] text-[16px] text-[#406c6d]">
                  {getRatingLabel(rating)}
                </p>
              )}
            </div>

            {/* Review Title */}
            <div className="mb-[32px]">
              <label 
                htmlFor="review-title" 
                className="block font-['Inter',sans-serif] text-[18px] font-medium text-[#003b3c] mb-[12px]"
              >
                Review Title <span className="text-[#406c6d] font-normal text-[14px]">(optional)</span>
              </label>
              <input
                id="review-title"
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="Summarize your experience in a few words..."
                maxLength={100}
                className="w-full h-[56px] px-[16px] border border-[#D9E2E2] rounded-[8px] font-['Inter',sans-serif] text-[16px] text-[#003b3c] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#003b3c] transition-colors"
              />
              <p className="mt-[8px] font-['Inter',sans-serif] text-[12px] text-[#406c6d] text-right">
                {reviewTitle.length}/100
              </p>
            </div>

            {/* Review Text */}
            <div className="mb-[32px]">
              <label 
                htmlFor="review-text" 
                className="block font-['Inter',sans-serif] text-[18px] font-medium text-[#003b3c] mb-[12px]"
              >
                Your Review <span className="text-[#406c6d] font-normal text-[14px]">(optional)</span>
              </label>
              <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d] mb-[12px]">
                Share your experience with this product to help other customers make informed decisions.
              </p>
              <textarea
                id="review-text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="What did you like or dislike about this product? How has it helped with your health goals?"
                rows={8}
                maxLength={1000}
                className="w-full px-[16px] py-[14px] border border-[#D9E2E2] rounded-[8px] font-['Inter',sans-serif] text-[16px] text-[#003b3c] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#003b3c] transition-colors resize-none leading-[1.6]"
              />
              <p className="mt-[8px] font-['Inter',sans-serif] text-[12px] text-[#406c6d] text-right">
                {reviewText.length}/1,000
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-[12px] pt-[32px] border-t border-[#D9E2E2]">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 sm:flex-initial px-[32px] py-[14px] border border-[#D9E2E2] rounded-[8px] hover:border-[#003b3c] transition-colors cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] uppercase tracking-[0.05em]">
                  Cancel
                </span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting || rating === 0}
                className="flex-1 sm:flex-initial px-[32px] py-[14px] bg-[#009296] rounded-[8px] hover:bg-[#007d81] transition-colors cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-['Inter',sans-serif] text-[14px] text-white uppercase tracking-[0.05em]">
                  {isSubmitting ? 'Submitting...' : existingReview ? 'Update Review' : 'Submit Review'}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column - Product Info & Tips (1/3 width) */}
        <div className="space-y-[24px]">
          {/* Product Card - Sticky on desktop */}
          <div className="bg-white rounded-[8px] p-[30px] md:p-[40px] lg:sticky lg:top-[24px]">
            <h3 className="font-['Inter',sans-serif] font-medium text-[18px] text-[#003b3c] mb-[20px]">
              Product
            </h3>
            <div className="flex flex-col items-center text-center">
              <div className="size-[160px] bg-[#F5F5F5] rounded-[8px] overflow-hidden mb-[16px]">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="size-full object-cover"
                />
              </div>
              <h4 className="font-['Inter',sans-serif] font-medium text-[18px] text-[#003b3c] mb-[6px]">
                {item.name}
              </h4>
              <p className="font-['Inter',sans-serif] text-[14px] text-[#406c6d]">
                {item.count}
              </p>
            </div>
          </div>

          {/* Review Tips */}
          <div className="bg-[#E0F7F8] rounded-[8px] p-[30px] md:p-[40px]">
            <h3 className="font-['Inter',sans-serif] font-medium text-[18px] text-[#003b3c] mb-[16px]">
              Writing Tips
            </h3>
            <ul className="space-y-[12px]">
              <li className="flex items-start gap-[8px]">
                <span className="flex-shrink-0 size-[20px] bg-[#009296] rounded-full flex items-center justify-center mt-[2px]">
                  <span className="text-white text-[12px]">✓</span>
                </span>
                <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] leading-[1.6]">
                  Share specific health benefits you've experienced
                </span>
              </li>
              <li className="flex items-start gap-[8px]">
                <span className="flex-shrink-0 size-[20px] bg-[#009296] rounded-full flex items-center justify-center mt-[2px]">
                  <span className="text-white text-[12px]">✓</span>
                </span>
                <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] leading-[1.6]">
                  Mention how long you've been using the product
                </span>
              </li>
              <li className="flex items-start gap-[8px]">
                <span className="flex-shrink-0 size-[20px] bg-[#009296] rounded-full flex items-center justify-center mt-[2px]">
                  <span className="text-white text-[12px]">✓</span>
                </span>
                <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] leading-[1.6]">
                  Be honest about both positives and areas for improvement
                </span>
              </li>
              <li className="flex items-start gap-[8px]">
                <span className="flex-shrink-0 size-[20px] bg-[#009296] rounded-full flex items-center justify-center mt-[2px]">
                  <span className="text-white text-[12px]">✓</span>
                </span>
                <span className="font-['Inter',sans-serif] text-[14px] text-[#003b3c] leading-[1.6]">
                  Help others understand if this product is right for them
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}