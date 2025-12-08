/**
 * Close Icon - Mobile Menu
 * 24x24px with 2px stroke
 */
export default function CloseIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon close">
      <svg 
        className="block size-full" 
        fill="none" 
        preserveAspectRatio="none" 
        viewBox="0 0 24 24"
      >
        <g>
          <path 
            d="M18 6L6 18" 
            stroke="#003B3C" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M6 6L18 18" 
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
