interface Option {
  value: string;
  label: string;
  icon?: string;
}

interface ChatOptionsProps {
  options: Option[];
  onSelect: (value: string, label: string) => void;
}

export default function ChatOptions({ options, onSelect }: ChatOptionsProps) {
  return (
    <div className="flex flex-col gap-2 animate-fade-in">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value, option.label)}
          className="w-full bg-white border-2 border-[#D9E2E2] rounded-xl px-4 py-3 text-left hover:border-[#009296] hover:bg-[#EFF6F4] transition-all duration-200 active:scale-[0.98] min-h-[44px] flex items-center gap-3"
        >
          {option.icon && <span className="text-[20px] sm:text-[24px] xl:text-[28px] flex-shrink-0">{option.icon}</span>}
          <span className="text-[14px] sm:text-base xl:text-lg text-[#003b3c] leading-[1.4]">{option.label}</span>
        </button>
      ))}
    </div>
  );
}