/**
 * Add Icon - Mobile Menu
 * 24x24px with 2px stroke
 * Used to indicate expandable sections (collapsed state)
 */
export default function AddIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon add">
      <svg 
        className="block size-full" 
        fill="none" 
        preserveAspectRatio="none" 
        viewBox="0 0 24 24"
      >
        <g>
          <path 
            d="M12 5V19" 
            stroke="#003B3C" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
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
