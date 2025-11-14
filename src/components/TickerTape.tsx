// Infinite scrolling ticker tape component for homepage

interface TickerTapeProps {
  fontSize?: string;
  gap?: string;
  lineWidth?: string;
  animationDuration?: string;
}

export default function TickerTape({ 
  fontSize = '34px', 
  gap = '31px',
  lineWidth = '94px',
  animationDuration = '20s'
}: TickerTapeProps) {
  const items = [
    'No preservatives',
    'No artificial colors',
    'No fillers',
    'No lubricants',
    'No stabilizers',
  ];

  const TickerContent = () => (
    <>
      {items.map((item, index) => (
        <div key={index} className="flex items-center shrink-0" style={{ gap }}>
          <p 
            className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] not-italic text-[#009296] text-center text-nowrap"
            style={{ 
              fontSize,
              letterSpacing: `${-parseFloat(fontSize) * 0.01}px`
            }}
          >
            {item}
          </p>
          <div className="flex items-center justify-center shrink-0">
            <div className="flex-none rotate-[180deg]">
              <div className="h-0 relative" style={{ width: lineWidth }}>
                <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={`0 0 ${parseInt(lineWidth)} 1`}>
                    <line stroke="#009296" strokeWidth="1" x1="0" x2={lineWidth} y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="content-stretch relative shrink-0 w-full overflow-hidden" data-name="ticker scroll">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes ticker-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
          .ticker-animate {
            animation: ticker-scroll ${animationDuration} linear infinite;
            will-change: transform;
          }
        `
      }} />
      
      <div className="ticker-animate inline-flex items-center" style={{ gap }}>
        <div className="inline-flex items-center" style={{ gap }}>
          <TickerContent />
        </div>
        <div className="inline-flex items-center" style={{ gap }}>
          <TickerContent />
        </div>
      </div>
    </div>
  );
}
