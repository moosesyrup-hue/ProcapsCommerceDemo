import { ChevronDown } from 'lucide-react';
import { Topic } from '../../data/helpCenterFAQs';

interface TopicSelectorProps {
  topics: Topic[];
  selectedTopic: string;
  onTopicChange: (topicId: string) => void;
}

export default function TopicSelector({ topics, selectedTopic, onTopicChange }: TopicSelectorProps) {
  return (
    <div className="bg-[#F6F2EC] rounded-[10px] p-[24px] md:p-[28px] mb-[40px] md:mb-[48px]">
      {/* Title */}
      <h3 className="font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] text-[20px] leading-[1.3] mb-[16px]">
        Select a topic for quick answers
      </h3>
      
      {/* Topic Dropdown */}
      <div className="relative">
        <select
          value={selectedTopic}
          onChange={(e) => onTopicChange(e.target.value)}
          className="w-full appearance-none bg-white border border-[#D9E2E2] rounded-[8px] px-[16px] md:px-[18px] py-[12px] md:py-[14px] font-['Inter',sans-serif] text-[#003b3c] text-[16px] leading-[1.5] cursor-pointer hover:border-[#009296] focus:outline-none focus:border-[#009296] transition-colors"
        >
          <option value="">Choose a topic</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-[16px] top-1/2 transform -translate-y-1/2 w-[20px] h-[20px] text-[#003b3c] pointer-events-none" />
      </div>
    </div>
  );
}
