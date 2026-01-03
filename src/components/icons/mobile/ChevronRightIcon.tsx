/**
 * Chevron Right Icon - Mobile Menu
 * 32x32px with light blue circle background and dark teal arrow icon
 * Used for the Shop navigation item
 */
export default function ChevronRightIcon() {
  return (
    <div className="relative shrink-0 size-[32px] rounded-full bg-[#E5F8F8] flex items-center justify-center" data-name="icon chevron right">
      <svg 
        className="block size-[18px]" 
        fill="none" 
        viewBox="0 0 18 18"
      >
        <g>
          <path 
            d="M6.75 4.5L11.25 9L6.75 13.5" 
            stroke="#009296" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </g>
      </svg>
    </div>
  );
}