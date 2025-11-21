import imgSpecialsPromo from "figma:asset/6e11d16f3d62989eeec3e390ce2438fea0b1d179.png";

interface SpecialsPromoProps {
  onNavigate?: (path: string) => void;
}

export default function SpecialsPromo({ onNavigate }: SpecialsPromoProps) {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* Promo Image */}
      <div className="w-full aspect-square rounded-[10px] overflow-hidden">
        <img 
          src={imgSpecialsPromo} 
          alt="Save on trusted formulas" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Link */}
      <button
        onClick={() => onNavigate?.('specials')}
        className="font-['Inter',sans-serif] text-[16px] text-[#003b3c] underline decoration-solid hover:text-[#009296] transition-colors text-left"
      >
        Explore Our Specials
      </button>
    </div>
  );
}