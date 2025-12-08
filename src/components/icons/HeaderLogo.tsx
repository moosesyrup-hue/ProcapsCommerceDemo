import svgPaths from "../../imports/svg-vsxzdz3mbf";

interface HeaderLogoProps {
  onClick: () => void;
}

export default function HeaderLogo({ onClick }: HeaderLogoProps) {
  return (
    <button 
      onClick={onClick}
      className="absolute left-1/2 top-[10px] -translate-x-1/2 hover:opacity-80 transition-opacity"
    >
      <div className="h-[40px] w-[109.045px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 38">
          <g>
            <path d={svgPaths.p25a86380} fill="white" />
            <path d={svgPaths.p20c71700} fill="white" />
            <path d={svgPaths.p23d24d80} fill="white" />
            <path d={svgPaths.p5ed1b80} fill="white" />
            <path d={svgPaths.p5733200} fill="white" />
            <path d={svgPaths.p2c85b100} fill="white" />
            <path d={svgPaths.p2a1d4000} fill="white" />
            <path d={svgPaths.p4324d00} fill="white" />
          </g>
        </svg>
      </div>
    </button>
  );
}
