import andrewAvatar from "figma:asset/dc03ce14c468b809b3b5450c8c3da25788a57c15.png";

interface ChatIntroProps {
  onBegin: () => void;
}

export default function ChatIntro({ onBegin }: ChatIntroProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 sm:p-8 bg-[#F6F2EC] animate-fade-in">
      <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Andrew's Photo */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 xl:w-32 xl:h-32 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden bg-[#F7F2EC]">
          <img 
            src={andrewAvatar} 
            alt="Andrew Lessman"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Intro Content */}
        <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <h2 className="text-[#003b3c] font-['STIX_Two_Text',sans-serif] text-2xl sm:text-3xl xl:text-4xl" style={{ fontWeight: 500 }}>
            Hi, I'm Andrew Lessman
          </h2>
          
          <div className="space-y-2 sm:space-y-3">
            <p className="text-[14px] sm:text-base xl:text-lg text-[#003b3c]/80 leading-relaxed">
              <strong className="text-[#003b3c]">Vitamin pioneer with over 40 years of research.</strong> I've helped millions of people find the right supplements for their unique needs.
            </p>
            
            <p className="text-[14px] sm:text-base xl:text-lg text-[#003b3c]/80 leading-relaxed">
              I'll ask you a few quick questions about your health goals and lifestyle—then provide personalized recommendations based on what works together, not just what sells.
            </p>

            <p className="text-[13px] sm:text-[15px] xl:text-base text-[#003b3c]/60 leading-relaxed">
              Takes about 2 minutes. No obligation to buy anything.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onBegin}
          className="w-full bg-[#009296] text-white text-[15px] sm:text-base xl:text-lg py-3.5 sm:py-4 px-6 rounded-lg hover:bg-[#007a7d] transition-all duration-200 active:scale-[0.98] font-medium"
        >
          Start My Consultation
        </button>

        {/* Trust Indicator */}
        <p className="text-center text-[11px] sm:text-xs xl:text-sm text-[#003b3c]/50 mt-4 sm:mt-5">
          Trusted by millions since 1979
        </p>
      </div>
    </div>
  );
}