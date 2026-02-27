import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Clock, Calendar, Eye, Share2, Bookmark, ChevronDown, ChevronUp, Video as VideoIcon } from 'lucide-react';

type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

// Mock video data
const VIDEO_DATA: Record<string, {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  durationSeconds: number;
  publishDate: string;
  views: string;
  thumbnail: string;
  videoUrl?: string; // Placeholder for actual video
  transcript: string;
  chapters: Array<{ time: string; title: string; seconds: number }>;
  keyPoints: string[];
  relatedVideos: Array<{
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
    category: string;
  }>;
}> = {
  'coq10-explained': {
    id: 'coq10-explained',
    title: 'Andrew Explains CoQ10',
    description: 'Join Andrew Lessman as he breaks down the science behind Coenzyme Q10 and explains why this powerful nutrient is essential for heart health and cellular energy. Learn about proper dosing, absorption, and why quality matters when choosing a CoQ10 supplement.',
    category: 'Product Science',
    duration: '2:34',
    durationSeconds: 154,
    publishDate: 'February 10, 2026',
    views: '12.4K',
    thumbnail: 'https://images.unsplash.com/photo-1576669801838-1b1c52121e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwbGVtZW50JTIwcmVzZWFyY2glMjBsYWJvcmF0b3J5JTIwc2NpZW5jZXxlbnwxfHx8fDE3NzE2MDk0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    transcript: `Hello, I'm Andrew Lessman, and today I want to talk to you about one of the most important nutrients for heart health: Coenzyme Q10, or CoQ10.

Your heart is the hardest-working muscle in your body. It beats about 100,000 times every single day, pumping blood to every cell, every tissue, every organ. That incredible workload requires enormous amounts of energy.

That's where CoQ10 comes in. Think of CoQ10 as the spark plug for your cellular engines—your mitochondria. Without adequate CoQ10, your cells simply cannot produce energy efficiently. And your heart, which never rests, has the highest concentration of CoQ10 of any tissue in your body.

But here's what most people don't realize: your body's natural production of CoQ10 peaks in your 20s and declines steadily from there. By age 40, you may have 30% less CoQ10 than you had in your youth. By 60, that decline can reach 50% or more.

This is precisely why I formulate all my CoQ10 products at 100 milligrams. That's the dose supported by research—the dose that actually makes a difference in your CoQ10 blood levels. I see products on the market with 10mg, 30mg, even 50mg, and I have to tell you: those doses simply won't move the needle on your health.

CoQ10 is also fat-soluble, which means it's best absorbed when taken with food containing some fat. That's why I deliver our CoQ10 in an oil-based softgel—for optimal absorption and effectiveness.

Your heart deserves the best support you can give it. After four decades of formulating supplements, CoQ10 remains one of the nutrients I'm most passionate about, because I've seen the profound difference it makes in people's lives.

Thank you for watching, and remember: if you're going to take a supplement, take enough to matter.`,
    chapters: [
      { time: '0:00', title: 'Introduction to CoQ10', seconds: 0 },
      { time: '0:35', title: 'Why Your Heart Needs CoQ10', seconds: 35 },
      { time: '1:12', title: 'Age-Related CoQ10 Decline', seconds: 72 },
      { time: '1:48', title: 'The Importance of Proper Dosing', seconds: 108 },
      { time: '2:15', title: 'Absorption & Quality Matters', seconds: 135 }
    ],
    keyPoints: [
      'CoQ10 is essential for cellular energy production in the mitochondria',
      'The heart has the highest concentration of CoQ10 in the body',
      'CoQ10 levels decline 30-50% by age 40-60',
      '100mg is the research-backed effective dose',
      'Oil-based softgels provide optimal absorption'
    ],
    relatedVideos: [
      {
        id: 'heart-health-tour',
        title: 'Heart Health Product Tour',
        duration: '5:42',
        thumbnail: 'https://images.unsplash.com/photo-1623134915837-d2fdb4f59035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFydCUyMGhlYWx0aCUyMGNhcmRpb3Zhc2N1bGFyJTIwd2VsbmVzc3xlbnwxfHx8fDE3NzE2MDk0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'Product Tour'
      },
      {
        id: 'omega-3-video',
        title: 'The Truth About Omega-3',
        duration: '4:18',
        thumbnail: 'https://images.unsplash.com/photo-1576437293196-fc3080b75964?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbWVnYSUyMDMlMjBmaXNoJTIwb2lsJTIwc3VwcGxlbWVudHxlbnwxfHx8fDE3NzE1NDkwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'Ingredient Science'
      },
      {
        id: 'supplement-quality',
        title: 'What Makes a Quality Supplement?',
        duration: '3:56',
        thumbnail: 'https://images.unsplash.com/photo-1763668444855-401b58dceb20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwbGVtZW50JTIwY2Fwc3VsZXMlMjB2aXRhbWlucyUyMG5hdHVyYWx8ZW58MXx8fHwxNzcxODczNjkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'Quality & Manufacturing'
      },
      {
        id: 'daily-routine',
        title: 'Andrew\'s Daily Supplement Routine',
        duration: '6:23',
        thumbnail: 'https://images.unsplash.com/photo-1590905707155-17c680dd7867?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwd29tYW4lMjBzbWlsaW5nJTIwcG9ydHJhaXQlMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NzE4NzM2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'Wellness Guide'
      }
    ]
  }
};

interface WellnessHubVideoPageProps {
  videoId: string;
  onBack?: () => void;
  onNavigateToVideo?: (videoId: string) => void;
}

export default function WellnessHubVideoPage({
  videoId,
  onBack,
  onNavigateToVideo
}: WellnessHubVideoPageProps) {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('XL');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) setBreakpoint('S');
      else if (width < 1280) setBreakpoint('M');
      else if (width < 1440) setBreakpoint('L');
      else if (width < 1920) setBreakpoint('XL');
      else setBreakpoint('HD');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  const video = VIDEO_DATA[videoId];

  if (!video) {
    return (
      <div className="w-full min-h-screen bg-[#F7F2EC] flex items-center justify-center">
        <div className="text-center">
          <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[24px] mb-[20px]">
            Video not found
          </p>
          <button
            onClick={onBack}
            className="font-['Inter:Medium',sans-serif] font-medium text-[#009296] text-[14px] hover:underline"
          >
            Back to Wellness Hub
          </button>
        </div>
      </div>
    );
  }

  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';

  return (
    <div className="w-full bg-[#F7F2EC]">
      {/* Back Button */}
      <BackButton breakpoint={breakpoint} onBack={onBack} />

      {/* Video Player Section */}
      <VideoPlayer 
        video={video} 
        breakpoint={breakpoint}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
      />

      {/* Video Info & Metadata */}
      <VideoInfo 
        video={video} 
        breakpoint={breakpoint}
        isBookmarked={isBookmarked}
        onToggleBookmark={() => setIsBookmarked(!isBookmarked)}
      />

      {/* Key Points */}
      <KeyPoints points={video.keyPoints} breakpoint={breakpoint} />

      {/* Main Content Area */}
      <div className={`relative w-full ${isMobile ? 'px-[20px] py-[40px]' : isTablet ? 'px-[30px] py-[60px]' : 'px-[40px] py-[60px]'}`}>
        <div className="mx-auto" style={{ maxWidth: '1440px' }}>
          <div className={`flex ${isMobile || isTablet ? 'flex-col' : 'flex-row'} gap-[40px]`}>
            {/* Main Content */}
            <div className="flex-1">
              {/* Description */}
              <VideoDescription description={video.description} breakpoint={breakpoint} />

              {/* Chapters */}
              <VideoChapters 
                chapters={video.chapters} 
                currentTime={currentTime}
                breakpoint={breakpoint}
              />

              {/* Transcript */}
              <VideoTranscript 
                transcript={video.transcript}
                showTranscript={showTranscript}
                onToggle={() => setShowTranscript(!showTranscript)}
                breakpoint={breakpoint}
              />
            </div>

            {/* Sidebar - Related Videos */}
            {!isMobile && (
              <RelatedVideosSidebar 
                videos={video.relatedVideos}
                onNavigateToVideo={onNavigateToVideo}
                breakpoint={breakpoint}
              />
            )}
          </div>
        </div>
      </div>

      {/* Related Videos - Mobile Only */}
      {isMobile && (
        <RelatedVideosGrid 
          videos={video.relatedVideos}
          onNavigateToVideo={onNavigateToVideo}
          breakpoint={breakpoint}
        />
      )}

      {/* CTA Section */}
      <VideoCTA breakpoint={breakpoint} />
    </div>
  );
}

// Back Button
function BackButton({ breakpoint, onBack }: { breakpoint: Breakpoint; onBack?: () => void }) {
  const isMobile = breakpoint === 'S';
  const padding = isMobile ? 'px-[20px] py-[20px]' : 'px-[40px] py-[30px]';

  return (
    <div className={`w-full ${padding} bg-white`}>
      <div className="mx-auto" style={{ maxWidth: '1440px' }}>
        <button
          onClick={onBack}
          className="flex items-center gap-[8px] text-[#009296] font-['Inter:Medium',sans-serif] font-medium text-[14px] hover:underline transition-all group"
        >
          <ArrowLeft className="w-[16px] h-[16px] group-hover:-translate-x-1 transition-transform" />
          Back to Wellness Hub
        </button>
      </div>
    </div>
  );
}

// Video Player
function VideoPlayer({ 
  video, 
  breakpoint,
  isPlaying,
  onPlayPause
}: { 
  video: typeof VIDEO_DATA[string]; 
  breakpoint: Breakpoint;
  isPlaying: boolean;
  onPlayPause: () => void;
}) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[20px] pb-[30px]' : isTablet ? 'px-[30px] pb-[40px]' : 'px-[40px] pb-[50px]';

  return (
    <div className={`relative w-full ${padding} bg-white`}>
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Video Player Placeholder */}
        <div className="relative w-full aspect-[16/9] rounded-[12px] overflow-hidden bg-black">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          
          {/* Play Button Overlay */}
          <button
            onClick={onPlayPause}
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group"
          >
            <div className="w-[80px] h-[80px] rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-[32px] h-[32px] text-[#009296] ml-[4px]" fill="#009296" />
            </div>
          </button>

          {/* Video Duration Badge */}
          <div className="absolute bottom-[16px] right-[16px] bg-black/80 text-white text-[14px] font-['Inter:Medium',sans-serif] px-[12px] py-[6px] rounded-[6px]">
            {video.duration}
          </div>

          {/* Placeholder Text */}
          <div className="absolute top-[16px] left-[16px] bg-black/60 text-white text-[12px] font-['Inter:Medium',sans-serif] px-[12px] py-[6px] rounded-[6px]">
            Video Player Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}

// Video Info
function VideoInfo({ 
  video, 
  breakpoint,
  isBookmarked,
  onToggleBookmark
}: { 
  video: typeof VIDEO_DATA[string]; 
  breakpoint: Breakpoint;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}) {
  const isMobile = breakpoint === 'S';
  const padding = isMobile ? 'px-[20px] py-[30px]' : 'px-[40px] py-[40px]';

  return (
    <div className={`relative w-full ${padding} bg-white border-b border-[#D9E2E2]`}>
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Category Badge */}
        <div className="inline-block mb-[16px]">
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[#009296] text-[11px] tracking-[1.1px] uppercase bg-[#EFF6F4] px-[12px] py-[6px] rounded-[4px]">
            {video.category}
          </span>
        </div>

        {/* Title */}
        <h1 className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] mb-[16px] ${
          isMobile ? 'text-[32px] tracking-[-0.64px]' : 'text-[40px] tracking-[-0.8px]'
        }`}>
          {video.title}
        </h1>

        {/* Meta & Actions */}
        <div className={`flex ${isMobile ? 'flex-col gap-[20px]' : 'flex-row items-center justify-between'}`}>
          {/* Metadata */}
          <div className="flex items-center gap-[16px] text-[#003b3c]/60 text-[14px]">
            <span className="flex items-center gap-[6px]">
              <Eye className="w-[16px] h-[16px]" />
              {video.views} views
            </span>
            <span>•</span>
            <span className="flex items-center gap-[6px]">
              <Calendar className="w-[16px] h-[16px]" />
              {video.publishDate}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-[12px]">
            <button
              onClick={onToggleBookmark}
              className={`flex items-center gap-[6px] px-[16px] py-[8px] rounded-[6px] border transition-colors ${
                isBookmarked 
                  ? 'border-[#009296] bg-[#EFF6F4] text-[#009296]' 
                  : 'border-[#D9E2E2] bg-white text-[#003b3c]/60 hover:border-[#009296] hover:text-[#009296]'
              }`}
            >
              <Bookmark className={`w-[16px] h-[16px] ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px]">
                {isBookmarked ? 'Saved' : 'Save'}
              </span>
            </button>
            <button className="flex items-center gap-[6px] px-[16px] py-[8px] rounded-[6px] border border-[#D9E2E2] bg-white text-[#003b3c]/60 hover:border-[#009296] hover:text-[#009296] transition-colors">
              <Share2 className="w-[16px] h-[16px]" />
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px]">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Key Points
function KeyPoints({ points, breakpoint }: { points: string[]; breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[20px] py-[40px]' : isTablet ? 'px-[30px] py-[50px]' : 'px-[40px] py-[60px]';

  return (
    <div className={`relative w-full ${padding}`}>
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        <div className="bg-[#EFF6F4] rounded-[12px] p-[30px]" style={{ border: '1px solid #D9E2E2' }}>
          <div className="flex items-center gap-[10px] mb-[20px]">
            <VideoIcon className="w-[20px] h-[20px] text-[#009296]" />
            <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[20px] tracking-[-0.4px]">
              Key Points from This Video
            </p>
          </div>
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-[16px]`}>
            {points.map((point, index) => (
              <div key={index} className="flex items-start gap-[12px]">
                <div className="flex-shrink-0 w-[24px] h-[24px] rounded-[6px] bg-[#009296] flex items-center justify-center text-white font-['Inter:Medium',sans-serif] text-[12px] mt-[2px]">
                  {index + 1}
                </div>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#003b3c] text-[15px] leading-[1.5] tracking-[-0.15px]">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Video Description
function VideoDescription({ description, breakpoint }: { description: string; breakpoint: Breakpoint }) {
  return (
    <div className="mb-[40px]">
      <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[20px] tracking-[-0.4px] mb-[12px]">
        About This Video
      </p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] text-[16px] tracking-[-0.16px]">
        {description}
      </p>
    </div>
  );
}

// Video Chapters
function VideoChapters({ 
  chapters, 
  currentTime,
  breakpoint 
}: { 
  chapters: typeof VIDEO_DATA[string]['chapters']; 
  currentTime: number;
  breakpoint: Breakpoint;
}) {
  const isMobile = breakpoint === 'S';

  return (
    <div className="mb-[40px]">
      <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[20px] tracking-[-0.4px] mb-[16px]">
        Chapters
      </p>
      <div className="bg-white rounded-[10px] p-[4px]" style={{ border: '1px solid #D9E2E2' }}>
        {chapters.map((chapter, index) => (
          <button
            key={index}
            className="w-full flex items-center justify-between px-[16px] py-[12px] rounded-[6px] hover:bg-[#EFF6F4] transition-colors group text-left"
          >
            <div className="flex items-center gap-[16px]">
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[#009296] text-[14px] min-w-[48px]">
                {chapter.time}
              </span>
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[#003b3c] text-[15px] leading-[1.4]">
                {chapter.title}
              </span>
            </div>
            <Play className="w-[14px] h-[14px] text-[#003b3c]/40 group-hover:text-[#009296] transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}

// Video Transcript
function VideoTranscript({ 
  transcript, 
  showTranscript, 
  onToggle,
  breakpoint 
}: { 
  transcript: string; 
  showTranscript: boolean;
  onToggle: () => void;
  breakpoint: Breakpoint;
}) {
  return (
    <div className="mb-[40px]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-[20px] py-[16px] bg-white rounded-[10px] hover:bg-[#EFF6F4] transition-colors"
        style={{ border: '1px solid #D9E2E2' }}
      >
        <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[20px] tracking-[-0.4px]">
          Video Transcript
        </p>
        {showTranscript ? (
          <ChevronUp className="w-[20px] h-[20px] text-[#003b3c]" />
        ) : (
          <ChevronDown className="w-[20px] h-[20px] text-[#003b3c]" />
        )}
      </button>
      
      {showTranscript && (
        <div className="mt-[16px] bg-white rounded-[10px] p-[24px]" style={{ border: '1px solid #D9E2E2' }}>
          <div className="whitespace-pre-line font-['Inter:Regular',sans-serif] font-normal leading-[1.7] text-[#003b3c] text-[15px] tracking-[-0.15px]">
            {transcript}
          </div>
        </div>
      )}
    </div>
  );
}

// Related Videos Sidebar (Desktop)
function RelatedVideosSidebar({ 
  videos, 
  onNavigateToVideo,
  breakpoint 
}: { 
  videos: typeof VIDEO_DATA[string]['relatedVideos']; 
  onNavigateToVideo?: (videoId: string) => void;
  breakpoint: Breakpoint;
}) {
  return (
    <div className="w-[360px] flex-shrink-0">
      <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[20px] tracking-[-0.4px] mb-[20px]">
        Related Videos
      </p>
      <div className="space-y-[16px]">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => onNavigateToVideo?.(video.id)}
            className="w-full flex gap-[12px] rounded-[10px] overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-md text-left"
            style={{ border: '1px solid #D9E2E2' }}
          >
            <div className="relative w-[140px] aspect-[16/10] flex-shrink-0">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[32px] h-[32px] rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-[12px] h-[12px] text-[#009296] ml-[1px]" fill="#009296" />
                </div>
              </div>
              <div className="absolute bottom-[8px] right-[8px] bg-black/70 text-white text-[10px] font-['Inter:Medium',sans-serif] px-[6px] py-[3px] rounded-[4px]">
                {video.duration}
              </div>
            </div>
            <div className="flex-1 p-[12px]">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[#009296] text-[10px] tracking-[1px] uppercase mb-[6px]">
                {video.category}
              </p>
              <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[14px] leading-[1.3] tracking-[-0.28px] line-clamp-2">
                {video.title}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Related Videos Grid (Mobile)
function RelatedVideosGrid({ 
  videos, 
  onNavigateToVideo,
  breakpoint 
}: { 
  videos: typeof VIDEO_DATA[string]['relatedVideos']; 
  onNavigateToVideo?: (videoId: string) => void;
  breakpoint: Breakpoint;
}) {
  const isMobile = breakpoint === 'S';
  const padding = isMobile ? 'px-[20px] py-[40px]' : 'px-[30px] py-[60px]';

  return (
    <div className={`relative w-full ${padding} bg-white`}>
      <div className="mx-auto" style={{ maxWidth: '1440px' }}>
        <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[24px] tracking-[-0.48px] mb-[20px]">
          Related Videos
        </p>
        <div className="grid grid-cols-1 gap-[16px]">
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={() => onNavigateToVideo?.(video.id)}
              className="w-full flex gap-[12px] rounded-[10px] overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-md text-left"
              style={{ border: '1px solid #D9E2E2' }}
            >
              <div className="relative w-[140px] aspect-[16/10] flex-shrink-0">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[36px] h-[36px] rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-[14px] h-[14px] text-[#009296] ml-[2px]" fill="#009296" />
                  </div>
                </div>
                <div className="absolute bottom-[8px] right-[8px] bg-black/70 text-white text-[11px] font-['Inter:Medium',sans-serif] px-[8px] py-[4px] rounded-[4px]">
                  {video.duration}
                </div>
              </div>
              <div className="flex-1 p-[12px]">
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[#009296] text-[11px] tracking-[1.1px] uppercase mb-[8px]">
                  {video.category}
                </p>
                <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[16px] leading-[1.3] tracking-[-0.32px]">
                  {video.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Video CTA
function VideoCTA({ breakpoint }: { breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[20px] py-[60px]' : isTablet ? 'px-[30px] py-[80px]' : 'px-[40px] py-[100px]';

  return (
    <div className={`relative w-full ${padding} bg-[#EFF6F4]`}>
      <div className="flex flex-col items-center justify-center text-center gap-[30px] mx-auto" style={{ maxWidth: '700px' }}>
        <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] text-[34px] tracking-[-0.68px]">
          Want to learn more?
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#003b3c] text-[18px] tracking-[-0.18px]">
          Explore our complete video library for more educational content from Andrew Lessman.
        </p>
        <button className="bg-[#009296] hover:bg-[#007b7f] text-white font-['Inter:Medium',sans-serif] font-medium text-[16px] tracking-[1.92px] uppercase px-[39px] py-[15px] rounded-[999px] transition-colors">
          VIEW ALL VIDEOS
        </button>
      </div>
    </div>
  );
}
