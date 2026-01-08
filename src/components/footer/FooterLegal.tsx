import { legalContent } from '../../data/footerData';

interface FooterLegalProps {
  onTermsOfUseClick?: () => void;
  onPrivacyPolicyClick?: () => void;
  onWellnessGuideClick?: () => void;
}

export default function FooterLegal({ onTermsOfUseClick, onPrivacyPolicyClick, onWellnessGuideClick }: FooterLegalProps) {
  return (
    <p className="font-['Inter',sans-serif] leading-[1.8] text-[14px] text-white">
      <span 
        className="cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onWellnessGuideClick}
      >
        {legalContent.copyright}
      </span>
      <span 
        className="underline cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onTermsOfUseClick}
      >
        {legalContent.termsText}
      </span>{' '}
      <span 
        className="underline cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onPrivacyPolicyClick}
      >
        {legalContent.privacyText}
      </span>
    </p>
  );
}