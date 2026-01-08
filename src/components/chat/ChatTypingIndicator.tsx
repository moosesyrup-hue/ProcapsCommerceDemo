import andrewAvatar from "figma:asset/dc03ce14c468b809b3b5450c8c3da25788a57c15.png";

export default function ChatTypingIndicator() {
  return (
    <div className="flex gap-3 items-start animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-[#F7F2EC] flex items-center justify-center overflow-hidden flex-shrink-0">
        <img 
          src={andrewAvatar} 
          alt="Andrew"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white rounded-2xl px-4 py-3">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-[#003b3c]/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-[#003b3c]/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-[#003b3c]/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}