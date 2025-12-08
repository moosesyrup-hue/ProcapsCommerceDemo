/**
 * Minus Icon - Mobile Menu
 * 24x24px with 2px stroke
 * Used to indicate expandable sections (expanded state)
 */
export default function MinusIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon minus">
      <svg 
        className="block size-full" 
        fill="none" 
        preserveAspectRatio="none" 
        viewBox="0 0 24 24"
      >
        <g>
          <path 
            d="M5 12H19" 
            stroke="#003B3C" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </g>
      </svg>
    </div>
  );
}
