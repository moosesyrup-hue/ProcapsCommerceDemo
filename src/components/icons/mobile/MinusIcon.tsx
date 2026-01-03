/**
 * Minus Icon - Mobile Menu
 * 32x32px with light blue circle background and dark teal - icon
 * Used to indicate expandable sections (expanded state)
 */
export default function MinusIcon() {
  return (
    <div className="relative shrink-0 size-[32px] rounded-full bg-[#E5F8F8] flex items-center justify-center" data-name="icon minus">
      <svg 
        className="block size-[18px]" 
        fill="none" 
        viewBox="0 0 18 18"
      >
        <g>
          <path 
            d="M3.75 9H14.25" 
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