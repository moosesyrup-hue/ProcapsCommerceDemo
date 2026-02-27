import { LucideIcon } from 'lucide-react';

interface ContactCard2Props {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

export default function ContactCard2({ 
  icon: Icon, 
  title, 
  description, 
  buttonText, 
  onClick 
}: ContactCard2Props) {
  return (
    <div className="bg-[#F6F2EC] rounded-[10px] p-[32px] md:p-[40px] flex flex-col h-full min-h-[320px]">
      <div className="flex items-start gap-[16px] mb-[24px] flex-grow">
        <div className="w-[44px] h-[44px] bg-[#009296] rounded-full flex items-center justify-center flex-shrink-0">
          <Icon className="w-[22px] h-[22px] text-white" />
        </div>
        <div>
          <h3 className="font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] text-[20px] md:text-[22px] leading-[1.2] mb-[12px]">
            {title}
          </h3>
          <p className="font-['Inter',sans-serif] text-[#003b3c] text-[15px] md:text-[16px] leading-[1.6]">
            {description}
          </p>
        </div>
      </div>
      <button 
        onClick={onClick}
        className="w-full bg-[#009296] text-white rounded-full px-[28px] py-[16px] font-['Inter:Medium',sans-serif] font-medium text-[16px] hover:bg-[#00b4ae] transition-colors mt-auto"
      >
        {buttonText}
      </button>
    </div>
  );
}
