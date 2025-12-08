import { LucideIcon } from 'lucide-react';

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

export default function ContactCard({ 
  icon: Icon, 
  title, 
  description, 
  buttonText, 
  onClick 
}: ContactCardProps) {
  return (
    <div className="bg-[#F6F2EC] rounded-[10px] p-[24px] md:p-[30px]">
      <div className="flex items-start gap-[16px] mb-[20px]">
        <div className="w-[40px] h-[40px] bg-[#009296] rounded-full flex items-center justify-center flex-shrink-0">
          <Icon className="w-[20px] h-[20px] text-white" />
        </div>
        <div>
          <h3 className="font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] text-[18px] md:text-[20px] leading-[1.2] mb-[8px]">
            {title}
          </h3>
          <p className="font-['Inter',sans-serif] text-[#003b3c] text-[14px] md:text-[16px] leading-[1.6]">
            {description}
          </p>
        </div>
      </div>
      <button 
        onClick={onClick}
        className="w-full bg-[#009296] text-white rounded-full px-[24px] py-[14px] font-['Inter:Medium',sans-serif] font-medium text-[15px] md:text-[16px] hover:bg-[#00b4ae] transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
}
