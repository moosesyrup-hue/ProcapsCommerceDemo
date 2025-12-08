import { Plus, Minus } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import FooterLink from './FooterLink';
import { FooterSection as FooterSectionType } from '../../data/footerData';

interface FooterSectionProps {
  section: FooterSectionType;
  isMobileTablet: boolean;
  onLinkClick: (action: string | null) => void;
}

export default function FooterSection({ section, isMobileTablet, onLinkClick }: FooterSectionProps) {
  if (isMobileTablet) {
    // Mobile/Tablet Accordion Layout
    return (
      <AccordionItem value={section.title.toLowerCase()} className="border-b border-[#0CA9AD]">
        <AccordionTrigger className="group flex items-center justify-between py-[20px] hover:no-underline [&>svg]:hidden">
          <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[20px] text-white">
            {section.title}
          </p>
          <div className="group-data-[state=open]:hidden">
            <Plus className="w-[20px] h-[20px] text-white" />
          </div>
          <div className="hidden group-data-[state=open]:block">
            <Minus className="w-[20px] h-[20px] text-white" />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="font-['Inter',sans-serif] leading-[1.8] text-[14px] text-white pb-[10px]">
            {section.links.map((link, index) => (
              <FooterLink
                key={link.label}
                label={link.label}
                onClick={link.action ? () => onLinkClick(link.action) : undefined}
                isLastItem={index === section.links.length - 1}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  // Desktop Column Layout
  return (
    <div className="flex flex-col gap-[30px] text-white">
      <p className="font-['Inter',sans-serif] font-medium leading-[1.2] text-[24px]">
        {section.title}
      </p>
      <div className="font-['Inter',sans-serif] leading-[1.8] text-[16px]">
        {section.links.map((link, index) => (
          <FooterLink
            key={link.label}
            label={link.label}
            onClick={link.action ? () => onLinkClick(link.action) : undefined}
            isLastItem={index === section.links.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
