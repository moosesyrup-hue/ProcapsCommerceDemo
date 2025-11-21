import { Star } from 'lucide-react';

interface PopularBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function PopularBadge({ className = '', size = 'sm' }: PopularBadgeProps) {
  const sizeClasses = {
    sm: {
      container: 'px-[6px] py-[2px]',
      icon: 'w-[10px] h-[10px]',
      text: 'text-[9px]'
    },
    md: {
      container: 'px-[8px] py-[3px]',
      icon: 'w-[12px] h-[12px]',
      text: 'text-[10px]'
    },
    lg: {
      container: 'px-[10px] py-[4px]',
      icon: 'w-[14px] h-[14px]',
      text: 'text-[11px]'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex items-center gap-[4px] ${currentSize.container} bg-gradient-to-r from-[#FFB800] to-[#FF8800] rounded-full ${className}`}>
      <Star className={`${currentSize.icon} text-white fill-white`} />
      <span className={`font-['Inter',sans-serif] ${currentSize.text} text-white uppercase tracking-[0.3px]`}>
        Popular
      </span>
    </div>
  );
}
