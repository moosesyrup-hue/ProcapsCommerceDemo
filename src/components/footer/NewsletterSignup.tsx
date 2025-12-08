import { newsletterContent } from '../../data/footerData';

interface NewsletterSignupProps {
  isMobileTablet: boolean;
}

export default function NewsletterSignup({ isMobileTablet }: NewsletterSignupProps) {
  const headlineSize = isMobileTablet ? 'text-[20px]' : 'text-[24px]';
  const descriptionSize = isMobileTablet ? 'text-[14px]' : 'text-[16px]';
  const gap = isMobileTablet ? 'gap-[20px]' : 'gap-[30px]';

  return (
    <div className={`flex flex-col ${gap}`}>
      <p className={`font-['Inter',sans-serif] font-medium leading-[1.2] ${headlineSize} text-white`}>
        {newsletterContent.headline}
      </p>
      <p className={`font-['Inter',sans-serif] leading-[1.8] ${descriptionSize} text-white`}>
        {newsletterContent.description}
      </p>
      <div className="bg-white max-w-[555px]">
        <div className="box-border flex items-center justify-between leading-[1.8] px-[20px] py-[11px] text-[16px]">
          <p className="font-['Inter',sans-serif] text-[#003b3c]">
            {newsletterContent.placeholder}
          </p>
          <p className="font-['Inter',sans-serif] font-medium text-[#009296] tracking-[1.6px]">
            {newsletterContent.submitText}
          </p>
        </div>
      </div>
    </div>
  );
}
