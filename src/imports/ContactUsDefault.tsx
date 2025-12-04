import svgPaths from "./svg-kt2390wgdv";
import imgRectangle24413 from "figma:asset/710094d13d1bbdb990b1d486672c8db18758a400.png";
import imgRectangle24414 from "figma:asset/960b2a4287af8f7936d487e65946d207d87aedc3.png";

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start not-italic relative shrink-0 text-[#003b3c] w-full">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[20px] w-full">Chat with us</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[16px] w-full">Receive live assistance from one of our Vitamin Specialists available 7 days a week between 6AM and 6PM PST.</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#009296] box-border content-stretch flex gap-[10px] h-[50px] items-center justify-center px-[39px] py-[15px] relative rounded-[999px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#009296] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white whitespace-pre">Start chatting</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-full">
      <Frame1 />
      <Button />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#f5f9f9] relative rounded-[10px] shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pl-[30px] pr-[60px] py-[30px] relative w-full">
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start not-italic relative shrink-0 text-[#003b3c] w-full">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[20px] w-full">Call our support</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[16px] w-full">You can call us at +1 800 800 1200 available 7 days a week between 6AM and 6PM PST.</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#009296] box-border content-stretch flex gap-[10px] h-[50px] items-center justify-center px-[39px] py-[15px] relative rounded-[999px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#009296] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white whitespace-pre">Call us</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-full">
      <Frame7 />
      <Button1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#f5f9f9] relative rounded-[10px] shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pl-[30px] pr-[60px] py-[30px] relative w-full">
          <Frame8 />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start not-italic relative shrink-0 text-[#003b3c] w-full">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[20px] w-full">Email us</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[16px] w-full">Estimated reply time: 1 business day</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#009296] box-border content-stretch flex gap-[10px] h-[50px] items-center justify-center px-[39px] py-[15px] relative rounded-[999px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#009296] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white whitespace-pre">Email us</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-full">
      <Frame9 />
      <Button2 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#f5f9f9] relative rounded-[10px] shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pl-[30px] pr-[60px] py-[30px] relative w-full">
          <Frame10 />
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[calc(66.67%+1px)] top-[486px] w-[439px]">
      <Frame3 />
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative size-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.pa1eb970} fill="var(--fill-0, #003B3C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TopicsDropdown() {
  return (
    <div className="absolute contents left-[72px] top-[522px]" data-name="topics dropdown">
      <div className="absolute h-[58px] left-[72px] top-[522px] w-[723px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 723 58">
          <path d={svgPaths.p4987c00} fill="var(--fill-0, white)" id="Rectangle 24411" stroke="var(--stroke-0, #D9E2E2)" />
        </svg>
      </div>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.2] left-[calc(12.5%-85px)] not-italic text-[#003b3c] text-[20px] text-nowrap top-[539px] whitespace-pre">How can we help you today?</p>
      <div className="absolute flex items-center justify-center left-[calc(50%+35px)] size-[24px] top-[540px]" style={{ "--transform-inner-width": "23.984375", "--transform-inner-height": "23.984375" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute left-[calc(50%+81px)] size-[24px] top-[792px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p2a6e0600} fill="var(--fill-0, #003B3C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute left-[calc(50%+81px)] size-[24px] top-[876px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p2a6e0600} fill="var(--fill-0, #003B3C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute left-[calc(50%+81px)] size-[24px] top-[959px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p2a6e0600} fill="var(--fill-0, #003B3C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute left-[calc(50%+81px)] size-[24px] top-[1036px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p2a6e0600} fill="var(--fill-0, #003B3C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function ContactUsDefault() {
  return (
    <div className="bg-white relative size-full" data-name="contact us default">
      <div className="absolute h-[129px] left-[41px] top-[486px] w-[784px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 784 129">
          <path d={svgPaths.pd662180} fill="var(--fill-0, #F5F9F9)" id="Rectangle 24412" />
        </svg>
      </div>
      <p className="absolute font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] left-[calc(12.5%-141px)] text-[#003b3c] text-[54px] text-nowrap top-[237px] tracking-[-1.08px] whitespace-pre">Contact us</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[1.4] left-[40px] not-italic text-[#003b3c] text-[32px] top-[316px] w-[1051px]">We’re here to help. Browse our FAQs below or reach out to our Vitamin Specialist team to get all the answers you need.</p>
      <Frame6 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[1.2] left-[calc(12.5%-139px)] not-italic text-[#003b3c] text-[32px] text-nowrap top-[695px] whitespace-pre">Frequently asked questions</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.2] left-[calc(12.5%-139px)] not-italic text-[#003b3c] text-[20px] text-nowrap top-[793px] whitespace-pre">Frequently asked question 1?</p>
      <div className="absolute h-0 left-[41px] top-[845px] w-[784px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 784 1">
            <line id="Line 269" stroke="var(--stroke-0, #D9E2E2)" x2="784" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.2] left-[calc(12.5%-139px)] not-italic text-[#003b3c] text-[20px] text-nowrap top-[876px] whitespace-pre">Frequently asked question 2?</p>
      <div className="absolute h-0 left-[41px] top-[928px] w-[784px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 784 1">
            <line id="Line 269" stroke="var(--stroke-0, #D9E2E2)" x2="784" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.2] left-[calc(12.5%-139px)] not-italic text-[#003b3c] text-[20px] text-nowrap top-[956px] whitespace-pre">Frequently asked question 3?</p>
      <div className="absolute h-0 left-[41px] top-[1008px] w-[784px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 784 1">
            <line id="Line 269" stroke="var(--stroke-0, #D9E2E2)" x2="784" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.2] left-[calc(12.5%-139px)] not-italic text-[#003b3c] text-[20px] text-nowrap top-[1038px] whitespace-pre">Frequently asked question 4?</p>
      <div className="absolute h-0 left-[41px] top-[1091px] w-[784px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 784 1">
            <line id="Line 269" stroke="var(--stroke-0, #D9E2E2)" x2="784" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <TopicsDropdown />
      <Frame11 />
      <Frame12 />
      <Frame13 />
      <Frame14 />
      <div className="absolute h-[142px] left-0 top-0 w-[1440px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle24413} />
      </div>
      <div className="absolute bottom-0 h-[802px] left-0 w-[1440px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle24414} />
      </div>
    </div>
  );
}