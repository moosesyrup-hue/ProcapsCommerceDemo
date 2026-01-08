interface ChatStartButtonProps {
  onStart: () => void;
}

export default function ChatStartButton({ onStart }: ChatStartButtonProps) {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="flex flex-col gap-2">
        <button
          onClick={onStart}
          className="bg-[#009296] text-white text-[14px] sm:text-[16px] xl:text-[18px] py-3 sm:py-3.5 px-6 sm:px-8 rounded-lg hover:bg-[#007a7d] transition-all duration-200 active:scale-[0.98] font-medium shadow-sm"
        >
          Start My Consultation
        </button>
        <p className="text-[12px] sm:text-[13px] text-[#003b3c]/60 px-1">
          Trusted by millions for over 45 years
        </p>
      </div>
    </div>
  );
}