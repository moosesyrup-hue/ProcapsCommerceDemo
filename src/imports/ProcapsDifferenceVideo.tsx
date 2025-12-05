import svgPaths from "./svg-vnvo42bcpl";

function Top() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-center relative shrink-0 w-full" data-name="top">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#009296] text-[34px] text-center text-nowrap tracking-[-0.34px] whitespace-pre">The Procaps Difference</p>
      <div className="h-0 relative shrink-0 w-[100px]" data-name="line">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 1">
            <line id="line" stroke="var(--stroke-0, #009296)" x2="100" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Copy() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 text-[#003b3c] text-center w-full" data-name="copy">
      <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] relative shrink-0 text-[54px] tracking-[-1.08px] w-full">Evolving with science, maximizing efficacy for you.</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[20px] tracking-[-0.4px] w-full">At Procaps Labs, innovation is at the heart of everything we do. Just as science is always advancing, we remain committed to evolving alongside it. With each new discovery, we refine our formulas to ensure they reflect the latest scientific breakthroughs. Our dedication to progress allows us to create the most effective, research-backed products possible.</p>
    </div>
  );
}

function Button() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[50px] items-center justify-center px-[39px] py-[15px] relative rounded-[999px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#009296] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#009296] text-[16px] text-center text-nowrap tracking-[1.92px] uppercase whitespace-pre">LEARN MORE</p>
    </div>
  );
}

function HeaderGroup() {
  return (
    <div className="relative shrink-0 w-full" data-name="header GROUP">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[50px] items-center px-[170px] py-0 relative w-full">
          <Top />
          <Copy />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Play() {
  return (
    <div className="relative shrink-0 size-[91px]" data-name="play">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 91 91">
        <g id="play">
          <circle cx="45.5" cy="45.5" fill="var(--fill-0, white)" fillOpacity="0.15" id="Ellipse 263" r="44" stroke="var(--stroke-0, white)" strokeWidth="3" />
          <path d={svgPaths.p3f714600} fill="var(--fill-0, white)" id="Vector 39" />
        </g>
      </svg>
    </div>
  );
}

function Video() {
  return (
    <div className="aspect-[1060/658] bg-[#c4c4c4] relative rounded-[20px] shrink-0 w-full" data-name="video">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="aspect-[1060/658] box-border content-stretch flex gap-[10px] items-center justify-center px-[288px] py-[339px] relative size-full">
          <Play />
        </div>
      </div>
    </div>
  );
}

function Columns() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[120px] grow items-center min-h-px min-w-[1060px] relative shrink-0" data-name="columns">
      <HeaderGroup />
      <Video />
    </div>
  );
}

export default function ProcapsDifferenceVideo() {
  return (
    <div className="relative size-full" data-name="Procaps Difference +Video">
      <div className="flex flex-row justify-center size-full">
        <div className="box-border content-stretch flex gap-[140px] items-start justify-center px-[310px] py-[60px] relative size-full">
          <Columns />
        </div>
      </div>
    </div>
  );
}