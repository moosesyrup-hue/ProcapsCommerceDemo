import { footerHeadline } from '../../data/footerData';

interface FooterHeadlineProps {
  breakpoint: 'S' | 'M' | 'L' | 'XL' | 'HD';
}

export default function FooterHeadline({ breakpoint }: FooterHeadlineProps) {
  // Footer headline sizes for each breakpoint
  let headlineSize = '';
  if (breakpoint === 'S') {
    headlineSize = 'text-[28px] tracking-[-0.56px]';
  } else if (breakpoint === 'M') {
    headlineSize = 'text-[38px] tracking-[-0.76px]';
  } else if (breakpoint === 'L') {
    headlineSize = 'text-[48px] tracking-[-0.96px]';
  } else if (breakpoint === 'XL') {
    headlineSize = 'text-[54px] tracking-[-1.08px]';
  } else {
    // HD
    headlineSize = 'text-[72px] tracking-[-1.44px]';
  }

  return (
    <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] ${headlineSize} text-white`}>
      {footerHeadline.beforeItalic}
      <span className="text-[#48E1DC]" style={{ fontFamily: "'STIX Two Text', serif", fontStyle: 'italic', fontWeight: 400 }}>
        {footerHeadline.italicText}
      </span>
      {footerHeadline.afterItalic}
    </p>
  );
}
