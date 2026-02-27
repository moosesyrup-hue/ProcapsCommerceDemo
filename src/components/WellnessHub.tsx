import { useState, useEffect } from 'react';
import { Search, BookOpen, Video, Clock, ArrowRight, X } from 'lucide-react';

type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

// Health Goal Data
const HEALTH_GOALS = [
  {
    id: 'heart-health',
    title: 'Heart Health',
    description: 'Support cardiovascular wellness',
    image: 'https://images.unsplash.com/photo-1750032517124-33af79f5fd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW1lcmljYW4lMjB3b21hbiUyMGpvZ2dpbmclMjBleGVyY2lzZSUyMGNhcmRpb3xlbnwxfHx8fDE3NzE4NjM1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    articleCount: 12,
    videoCount: 8
  },
  {
    id: 'sleep-support',
    title: 'Sleep Support',
    description: 'Rest and recovery solutions',
    image: 'https://images.unsplash.com/photo-1632680264885-8335c365dfff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbiUyMHNsZWVwaW5nJTIwcGVhY2VmdWwlMjBiZWRyb29tJTIwcmVzdHxlbnwxfHx8fDE3NzE4NjM1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    articleCount: 10,
    videoCount: 6
  },
  {
    id: 'joint-health',
    title: 'Joint Health',
    description: 'Mobility and flexibility',
    image: 'https://images.unsplash.com/photo-1613205594527-e8b7bec5f7f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRpbmElMjB3b21hbiUyMHlvZ2ElMjBzdHJldGNoaW5nJTIwZmxleGliaWxpdHl8ZW58MXx8fHwxNzcxODYzNTk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    articleCount: 9,
    videoCount: 5
  },
  {
    id: 'brain-health',
    title: 'Brain Health',
    description: 'Focus and mental clarity',
    image: 'https://images.unsplash.com/photo-1614492898637-435e0f87cef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwbWFuJTIwc3R1ZHlpbmclMjBmb2N1cyUyMGNvbmNlbnRyYXRpb258ZW58MXx8fHwxNzcxODYzNTk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    articleCount: 15,
    videoCount: 10
  },
  {
    id: 'energy-focus',
    title: 'Energy & Focus',
    description: 'Stay active and energized',
    image: 'https://images.unsplash.com/photo-1631899560971-394ded28a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwd29tYW4lMjBydW5uaW5nJTIwZW5lcmd5JTIwYWN0aXZlfGVufDF8fHx8MTc3MTg2MzU5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    articleCount: 11,
    videoCount: 7
  },
  {
    id: 'immune-support',
    title: 'Immune Support',
    description: 'Strengthen natural defenses',
    image: 'https://images.unsplash.com/photo-1767656193453-3ab70acfc66d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGhlYWx0aHklMjBsaWZlc3R5bGUlMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NzE4NjM1OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    articleCount: 13,
    videoCount: 9
  },
  {
    id: 'digestive-health',
    title: 'Digestive Health',
    description: 'Gut wellness and balance',
    image: 'https://images.unsplash.com/photo-1683106063169-741e57034d19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMG1hbiUyMGNvb2tpbmclMjBoZWFsdGh5JTIwZm9vZCUyMGtpdGNoZW58ZW58MXx8fHwxNzcxODYzNTk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    articleCount: 8,
    videoCount: 4
  },
  {
    id: 'healthy-aging',
    title: 'Healthy Aging',
    description: 'Vitality at every age',
    image: 'https://images.unsplash.com/photo-1761472084994-61d80b8f4053?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBhc2lhbiUyMGNvdXBsZSUyMGFjdGl2ZSUyMGhpa2luZyUyMG91dGRvb3JzfGVufDF8fHx8MTc3MTg2MzU5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    articleCount: 14,
    videoCount: 11
  }
];

// Featured article
const FEATURED_ARTICLE = {
  id: 'coq10-heart',
  title: "CoQ10 and Heart Health: The Connection",
  excerpt: "Discover why Coenzyme Q10 is essential for cardiovascular function and why the 100mg dose matters.",
  category: 'Ingredient Science',
  readTime: 6,
  image: 'https://images.unsplash.com/photo-1576669801838-1b1c52121e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwbGVtZW50JTIwcmVzZWFyY2glMjBsYWJvcmF0b3J5JTIwc2NpZW5jZXxlbnwxfHx8fDE3NzE2MDk0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  author: 'Andrew Lessman',
  date: 'February 15, 2026'
};

// Popular Articles Data
const POPULAR_ARTICLES = [
  FEATURED_ARTICLE,
  {
    id: 'vitamin-k2',
    title: 'Vitamin K2-MK7: Why Form Matters More Than Dosage',
    excerpt: 'Not all vitamin K is created equal. Discover why we use the MK-7 form and what makes it superior.',
    category: 'Ingredient Science',
    readTime: 4,
    image: 'https://images.unsplash.com/photo-1763668444855-401b58dceb20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwY2Fwc3VsZXMlMjBuYXR1cmFsJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzcxNjA5NDkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  },
  {
    id: 'sleep-guide',
    title: "Andrew's Guide to Better Sleep",
    excerpt: 'A comprehensive look at the science of sleep and how the right supplements can support healthy sleep patterns.',
    category: 'Wellness Guide',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1635367216109-aa3353c0c22e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbGlmZXN0eWxlJTIwd2VsbG5lc3MlMjBsaXZpbmd8ZW58MXx8fHwxNzcxNjA5NDkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  },
  {
    id: 'reading-labels',
    title: 'Reading a Multivitamin Label: What Those Numbers Really Mean',
    excerpt: "Learn how to decode supplement facts panels and understand what you're really getting in your multivitamin.",
    category: 'Label Decoder',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1566827886142-75787ba140a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb24lMjBlZHVjYXRpb24lMjBsZWFybmluZyUyMGhlYWx0aHxlbnwxfHx8fDE3NzE2MDk0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false
  }
];

// Video Data
const FEATURED_VIDEOS = [
  {
    id: 'coq10-explained',
    title: 'Andrew Explains CoQ10',
    duration: '2:34',
    thumbnail: 'https://images.unsplash.com/photo-1576669801838-1b1c52121e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwbGVtZW50JTIwcmVzZWFyY2glMjBsYWJvcmF0b3J5JTIwc2NpZW5jZXxlbnwxfHx8fDE3NzE2MDk0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Product Science'
  },
  {
    id: 'no-fillers',
    title: 'Why We Never Use Fillers',
    duration: '3:15',
    thumbnail: 'https://images.unsplash.com/photo-1763668444855-401b58dceb20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwY2Fwc3VsZXMlMjBuYXR1cmFsJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzcxNjA5NDkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Quality Standards'
  },
  {
    id: 'heart-health-tour',
    title: 'Heart Health Product Tour',
    duration: '5:42',
    thumbnail: 'https://images.unsplash.com/photo-1623134915837-d2fdb4f59035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFydCUyMGhlYWx0aCUyMGNhcmRpb3Zhc2N1bGFyJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzcxNjA5NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Product Tour'
  },
  {
    id: 'supplement-myths',
    title: 'Debunking Supplement Myths',
    duration: '4:20',
    thumbnail: 'https://images.unsplash.com/photo-1566827886142-75787ba140a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb24lMjBlZHVjYXRpb24lMjBsZWFybmluZyUyMGhlYWx0aHxlbnwxfHx8fDE3NzE2MDk0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Myth Busters'
  }
];

interface WellnessHubProps {
  onNavigateToGoal?: (goalId: string) => void;
  onNavigateToArticle?: (articleId: string) => void;
  onNavigateToVideo?: (videoId: string) => void;
}

export default function WellnessHub({ 
  onNavigateToGoal, 
  onNavigateToArticle, 
  onNavigateToVideo 
}: WellnessHubProps) {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('XL');
  const [searchQuery, setSearchQuery] = useState('');
  const [contentFilter, setContentFilter] = useState<'all' | 'articles' | 'videos'>('all');

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

  // Filter content based on search query
  const filteredArticles = POPULAR_ARTICLES.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVideos = FEATURED_VIDEOS.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasResults = filteredArticles.length > 0 || filteredVideos.length > 0;
  const isSearching = searchQuery.length > 0;

  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const isDesktop = breakpoint === 'L' || breakpoint === 'XL' || breakpoint === 'HD';

  return (
    <div className="w-full bg-[#F7F2EC]">
      {/* Hero Section with Search */}
      <HeroSection 
        breakpoint={breakpoint} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Conditionally render based on search state */}
      {isSearching ? (
        // Search Results View
        <>
          <SearchResultsHeader 
            breakpoint={breakpoint}
            query={searchQuery}
            articleCount={filteredArticles.length}
            videoCount={filteredVideos.length}
            onClearSearch={() => setSearchQuery('')}
          />
          {hasResults ? (
            <>
              {/* Filtered Articles */}
              {filteredArticles.length > 0 && (
                <PopularTopicsSection 
                  breakpoint={breakpoint} 
                  articles={filteredArticles}
                  onNavigateToArticle={onNavigateToArticle}
                  title="Articles"
                />
              )}
              {/* Filtered Videos */}
              {filteredVideos.length > 0 && (
                <VideoLibrarySection 
                  breakpoint={breakpoint} 
                  videos={filteredVideos}
                  onNavigateToVideo={onNavigateToVideo}
                  title="Videos"
                />
              )}
            </>
          ) : (
            <NoResultsSection 
              breakpoint={breakpoint}
              query={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          )}
        </>
      ) : (
        // Default View (no search)
        <>
          {/* Browse by Health Goal */}
          <BrowseByGoalSection 
            breakpoint={breakpoint} 
            goals={HEALTH_GOALS}
            onNavigateToGoal={onNavigateToGoal}
          />

          {/* Featured Content */}
          <FeaturedContentSection 
            breakpoint={breakpoint} 
            article={POPULAR_ARTICLES[0]}
            onNavigateToArticle={onNavigateToArticle}
          />

          {/* Popular Topics Grid */}
          <PopularTopicsSection 
            breakpoint={breakpoint} 
            articles={POPULAR_ARTICLES.slice(1)}
            onNavigateToArticle={onNavigateToArticle}
          />

          {/* Video Library Preview */}
          <VideoLibrarySection 
            breakpoint={breakpoint} 
            videos={FEATURED_VIDEOS}
            onNavigateToVideo={onNavigateToVideo}
          />
        </>
      )}

      {/* CTA Section - always shown */}
      <CTASection breakpoint={breakpoint} />
    </div>
  );
}

// Hero Section Component
function HeroSection({ breakpoint, searchQuery, onSearchChange }: { breakpoint: Breakpoint, searchQuery: string, onSearchChange: (query: string) => void }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  
  const padding = isMobile ? 'px-[20px] py-[60px]' : isTablet ? 'px-[30px] py-[80px]' : 'px-[40px] py-[100px]';
  const headlineSize = isMobile ? 'text-[40px]' : isTablet ? 'text-[48px]' : breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[64px]' : 'text-[56px]';
  const headlineTracking = isMobile ? 'tracking-[-0.8px]' : isTablet ? 'tracking-[-0.96px]' : breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.28px]' : 'tracking-[-1.12px]';
  const subTextSize = isMobile || isTablet ? 'text-[18px]' : breakpoint === 'HD' ? 'text-[24px]' : 'text-[20px]';
  const subTextTracking = isMobile || isTablet ? 'tracking-[-0.18px]' : breakpoint === 'HD' ? 'tracking-[-0.24px]' : 'tracking-[-0.2px]';
  const maxWidth = breakpoint === 'HD' ? 'max-w-[900px]' : breakpoint === 'XL' ? 'max-w-[800px]' : breakpoint === 'L' ? 'max-w-[700px]' : 'max-w-none';

  return (
    <div className={`relative w-full ${padding}`}>
      <div className="flex flex-col items-center justify-center text-center gap-[20px] mx-auto" style={{ maxWidth: breakpoint === 'S' || breakpoint === 'M' ? '100%' : '1200px' }}>
        <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[#003b3c] ${headlineSize} ${headlineTracking}`}>
          The Science Behind
          <br />
          <span className="font-['STIX_Two_Text:Italic',sans-serif] font-normal italic text-[#009296]">Wellness</span>
        </p>
        <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#003b3c] ${subTextSize} ${subTextTracking} ${maxWidth}`}>
          Your trusted source for supplement education, research-backed insights, and Andrew Lessman's expert guidance on optimal health and wellness.
        </p>
        <div className="relative w-full max-w-[500px] mt-[20px]">
          <input 
            type="text" 
            placeholder="Search articles, videos, and more..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-[20px] py-[10px] bg-[#F7F2EC] border-[#D9E2E2] border-[1px] rounded-[20px] focus:outline-none focus:border-[#009296] transition-colors"
          />
          <Search className="absolute top-[10px] right-[10px] w-[16px] h-[16px] text-[#003b3c] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

// Search Results Header
function SearchResultsHeader({ breakpoint, query, articleCount, videoCount, onClearSearch }: { breakpoint: Breakpoint, query: string, articleCount: number, videoCount: number, onClearSearch: () => void }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  
  const padding = isMobile ? 'px-[20px] py-[40px]' : isTablet ? 'px-[30px] py-[60px]' : 'px-[40px] py-[80px]';
  const sectionTitleSize = isMobile ? 'text-[28px]' : isTablet ? 'text-[32px]' : breakpoint === 'HD' ? 'text-[48px]' : breakpoint === 'XL' ? 'text-[42px]' : 'text-[38px]';
  const sectionTitleTracking = isMobile ? 'tracking-[-0.56px]' : isTablet ? 'tracking-[-0.64px]' : breakpoint === 'HD' ? 'tracking-[-0.96px]' : breakpoint === 'XL' ? 'tracking-[-0.84px]' : 'tracking-[-0.76px]';
  
  const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4';
  const gap = isMobile ? 'gap-[20px]' : 'gap-[20px]';

  return (
    <div className={`relative w-full ${padding} bg-white`}>
      <div className="mx-auto" style={{ maxWidth: '1440px' }}>
        <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] ${sectionTitleSize} ${sectionTitleTracking} mb-[40px] text-center`}>
          Search Results for "{query}"
        </p>
        <div className="flex items-center justify-between mb-[20px]">
          <p className="font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] text-[16px] tracking-[0.5px]">
            {articleCount} articles, {videoCount} videos
          </p>
          <button 
            className="font-['Inter:Medium',sans-serif] font-medium text-[#009296] text-[14px] tracking-[0.5px] hover:underline"
            onClick={onClearSearch}
          >
            Clear Search
          </button>
        </div>
      </div>
    </div>
  );
}

// No Results Section
function NoResultsSection({ breakpoint, query, onClearSearch }: { breakpoint: Breakpoint, query: string, onClearSearch: () => void }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  
  const padding = isMobile ? 'px-[20px] py-[40px]' : isTablet ? 'px-[30px] py-[60px]' : 'px-[40px] py-[80px]';
  const sectionTitleSize = isMobile ? 'text-[28px]' : isTablet ? 'text-[32px]' : breakpoint === 'HD' ? 'text-[48px]' : breakpoint === 'XL' ? 'text-[42px]' : 'text-[38px]';
  const sectionTitleTracking = isMobile ? 'tracking-[-0.56px]' : isTablet ? 'tracking-[-0.64px]' : breakpoint === 'HD' ? 'tracking-[-0.96px]' : breakpoint === 'XL' ? 'tracking-[-0.84px]' : 'tracking-[-0.76px]';
  
  const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4';
  const gap = isMobile ? 'gap-[20px]' : 'gap-[20px]';

  return (
    <div className={`relative w-full ${padding} bg-white`}>
      <div className="mx-auto" style={{ maxWidth: '1440px' }}>
        <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] ${sectionTitleSize} ${sectionTitleTracking} mb-[40px] text-center`}>
          No Results for "{query}"
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#003b3c] text-[18px] tracking-[-0.18px] text-center mb-[20px]">
          Try searching for something else or browse our content below.
        </p>
        <button 
          className="font-['Inter:Medium',sans-serif] font-medium text-[#009296] text-[14px] tracking-[0.5px] hover:underline"
          onClick={onClearSearch}
        >
          Clear Search
        </button>
      </div>
    </div>
  );
}

// Browse by Goal Section
function BrowseByGoalSection({ 
  breakpoint, 
  goals,
  onNavigateToGoal 
}: { 
  breakpoint: Breakpoint; 
  goals: typeof HEALTH_GOALS;
  onNavigateToGoal?: (goalId: string) => void;
}) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  
  const padding = isMobile ? 'px-[20px] py-[40px]' : isTablet ? 'px-[30px] py-[60px]' : 'px-[40px] py-[80px]';
  const sectionTitleSize = isMobile ? 'text-[28px]' : isTablet ? 'text-[32px]' : breakpoint === 'HD' ? 'text-[48px]' : breakpoint === 'XL' ? 'text-[42px]' : 'text-[38px]';
  const sectionTitleTracking = isMobile ? 'tracking-[-0.56px]' : isTablet ? 'tracking-[-0.64px]' : breakpoint === 'HD' ? 'tracking-[-0.96px]' : breakpoint === 'XL' ? 'tracking-[-0.84px]' : 'tracking-[-0.76px]';
  
  const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4';
  const gap = isMobile ? 'gap-[20px]' : 'gap-[20px]';

  return (
    <div className={`relative w-full ${padding} bg-white`}>
      <div className="mx-auto" style={{ maxWidth: '1440px' }}>
        <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] ${sectionTitleSize} ${sectionTitleTracking} mb-[40px] text-center`}>
          Browse by Health Goal
        </p>
        <div className={`grid ${gridCols} ${gap}`}>
          {goals.map((goal) => (
            <HealthGoalCard 
              key={goal.id} 
              goal={goal} 
              breakpoint={breakpoint}
              onClick={() => onNavigateToGoal?.(goal.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Health Goal Card
function HealthGoalCard({ 
  goal, 
  breakpoint,
  onClick 
}: { 
  goal: typeof HEALTH_GOALS[0]; 
  breakpoint: Breakpoint;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = breakpoint === 'S';
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full aspect-[4/5] rounded-[10px] overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg"
      style={{ 
        backgroundColor: isHovered ? '#EFF6F4' : 'transparent',
        border: '1px solid #D9E2E2'
      }}
    >
      <div className="relative w-full h-full">
        <img 
          src={goal.image} 
          alt={goal.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-[20px] text-left">
          <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-white text-[24px] leading-[1.2] tracking-[-0.48px] mb-[8px]">
            {goal.title}
          </p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-white/90 text-[14px] leading-[1.4] tracking-[-0.14px] mb-[12px]">
            {goal.description}
          </p>
          <div className="flex items-center gap-[16px] text-white/80 text-[12px]">
            <span className="flex items-center gap-[4px]">
              <BookOpen className="w-[14px] h-[14px]" />
              {goal.articleCount} articles
            </span>
            <span className="flex items-center gap-[4px]">
              <Video className="w-[14px] h-[14px]" />
              {goal.videoCount} videos
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

// Featured Content Section
function FeaturedContentSection({ 
  breakpoint, 
  article,
  onNavigateToArticle 
}: { 
  breakpoint: Breakpoint; 
  article: typeof POPULAR_ARTICLES[0];
  onNavigateToArticle?: (articleId: string) => void;
}) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  
  const padding = isMobile ? 'px-[20px] py-[40px]' : isTablet ? 'px-[30px] py-[60px]' : 'px-[40px] py-[80px]';
  const flexDirection = isMobile || isTablet ? 'flex-col' : 'flex-row';
  const gap = isMobile ? 'gap-[20px]' : isTablet ? 'gap-[30px]' : 'gap-[40px]';

  return (
    <div className={`relative w-full ${padding}`}>
      <div className="mx-auto" style={{ maxWidth: '1440px' }}>
        <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] text-[28px] tracking-[-0.56px] mb-[30px]">
          Featured Content
        </p>
        <FeaturedArticleCard 
          article={article} 
          breakpoint={breakpoint}
          onClick={() => onNavigateToArticle?.(article.id)}
        />
      </div>
    </div>
  );
}

// Featured Article Card
function FeaturedArticleCard({ 
  article, 
  breakpoint,
  onClick 
}: { 
  article: typeof POPULAR_ARTICLES[0]; 
  breakpoint: Breakpoint;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const flexDirection = isMobile || isTablet ? 'flex-col' : 'flex-row';
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full flex ${flexDirection} rounded-[20px] overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl bg-white`}
      style={{ border: '1px solid #D9E2E2' }}
    >
      <div className={`relative ${isMobile || isTablet ? 'w-full aspect-[16/9]' : 'w-1/2 h-auto'}`}>
        <img 
          src={article.image} 
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className={`flex flex-col justify-center ${isMobile || isTablet ? 'p-[30px]' : 'p-[50px] w-1/2'}`}>
        <div className="flex items-center gap-[12px] mb-[16px]">
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[#009296] text-[12px] tracking-[1.2px] uppercase">
            {article.category}
          </span>
          <span className="flex items-center gap-[4px] text-[#003b3c]/60 text-[14px]">
            <Clock className="w-[14px] h-[14px]" />
            {article.readTime} min read
          </span>
        </div>
        <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[34px] leading-[1.2] tracking-[-0.68px] mb-[16px]">
          {article.title}
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#003b3c]/80 text-[18px] leading-[1.5] tracking-[-0.18px] mb-[24px]">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-[8px] text-[#009296] font-['Inter:Medium',sans-serif] font-medium text-[14px] tracking-[0.5px] group-hover:gap-[12px] transition-all">
          Read Article
          <ArrowRight className="w-[16px] h-[16px]" />
        </div>
      </div>
    </button>
  );
}

// Popular Topics Section
function PopularTopicsSection({ 
  breakpoint, 
  articles,
  onNavigateToArticle,
  title
}: { 
  breakpoint: Breakpoint; 
  articles: typeof POPULAR_ARTICLES;
  onNavigateToArticle?: (articleId: string) => void;
  title?: string;
}) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  
  const padding = isMobile ? 'px-[20px] py-[40px]' : isTablet ? 'px-[30px] py-[60px]' : 'px-[40px] py-[80px]';
  const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3';
  const gap = isMobile ? 'gap-[20px]' : 'gap-[20px]';

  return (
    <div className={`relative w-full ${padding} bg-white`}>
      <div className="mx-auto" style={{ maxWidth: '1440px' }}>
        {title && (
          <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] text-[28px] tracking-[-0.56px] mb-[30px]">
            {title}
          </p>
        )}
        <div className={`grid ${gridCols} ${gap}`}>
          {articles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              breakpoint={breakpoint}
              onClick={() => onNavigateToArticle?.(article.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Article Card
function ArticleCard({ 
  article, 
  breakpoint,
  onClick 
}: { 
  article: typeof POPULAR_ARTICLES[0]; 
  breakpoint: Breakpoint;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full flex flex-col rounded-[10px] overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg bg-white text-left"
      style={{ border: '1px solid #D9E2E2' }}
    >
      <div className="relative w-full aspect-[16/10]">
        <img 
          src={article.image} 
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-[20px]">
        <div className="flex items-center gap-[12px] mb-[12px]">
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[#009296] text-[11px] tracking-[1.1px] uppercase">
            {article.category}
          </span>
          <span className="flex items-center gap-[4px] text-[#003b3c]/60 text-[12px]">
            <Clock className="w-[12px] h-[12px]" />
            {article.readTime} min
          </span>
        </div>
        <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[20px] leading-[1.3] tracking-[-0.4px] mb-[8px]">
          {article.title}
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#003b3c]/70 text-[14px] leading-[1.5] tracking-[-0.14px]">
          {article.excerpt}
        </p>
      </div>
    </button>
  );
}

// Video Library Section
function VideoLibrarySection({ 
  breakpoint, 
  videos,
  onNavigateToVideo,
  title
}: { 
  breakpoint: Breakpoint; 
  videos: typeof FEATURED_VIDEOS;
  onNavigateToVideo?: (videoId: string) => void;
  title?: string;
}) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  
  const padding = isMobile ? 'px-[20px] py-[40px]' : isTablet ? 'px-[30px] py-[60px]' : 'px-[40px] py-[80px]';
  const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4';
  const gap = isMobile ? 'gap-[20px]' : 'gap-[20px]';

  return (
    <div className={`relative w-full ${padding}`}>
      <div className="mx-auto" style={{ maxWidth: '1440px' }}>
        {title && (
          <div className="flex items-center justify-between mb-[30px]">
            <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] text-[28px] tracking-[-0.56px]">
              {title}
            </p>
            <button className="font-['Inter:Medium',sans-serif] font-medium text-[#009296] text-[14px] tracking-[0.5px] hover:underline">
              See All Videos
            </button>
          </div>
        )}
        <div className={`grid ${gridCols} ${gap}`}>
          {videos.map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              breakpoint={breakpoint}
              onClick={() => onNavigateToVideo?.(video.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Video Card
function VideoCard({ 
  video, 
  breakpoint,
  onClick 
}: { 
  video: typeof FEATURED_VIDEOS[0]; 
  breakpoint: Breakpoint;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full flex flex-col rounded-[10px] overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg text-left"
      style={{ border: '1px solid #D9E2E2' }}
    >
      <div className="relative w-full aspect-[16/10]">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[50px] h-[50px] rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-[#009296] border-b-[8px] border-b-transparent ml-[3px]" />
          </div>
        </div>
        <div className="absolute top-[12px] right-[12px] bg-black/70 text-white text-[12px] font-['Inter:Medium',sans-serif] px-[8px] py-[4px] rounded-[4px]">
          {video.duration}
        </div>
      </div>
      <div className="p-[16px] bg-white">
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#009296] text-[11px] tracking-[1.1px] uppercase mb-[8px]">
          {video.category}
        </p>
        <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[16px] leading-[1.3] tracking-[-0.32px]">
          {video.title}
        </p>
      </div>
    </button>
  );
}

// CTA Section
function CTASection({ breakpoint }: { breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  
  const padding = isMobile ? 'px-[20px] py-[60px]' : isTablet ? 'px-[30px] py-[80px]' : 'px-[40px] py-[100px]';
  const headlineSize = isMobile ? 'text-[28px]' : isTablet ? 'text-[34px]' : breakpoint === 'HD' ? 'text-[48px]' : 'text-[40px]';
  const headlineTracking = isMobile ? 'tracking-[-0.56px]' : isTablet ? 'tracking-[-0.68px]' : breakpoint === 'HD' ? 'tracking-[-0.96px]' : 'tracking-[-0.8px]';

  return (
    <div className={`relative w-full ${padding} bg-[#EFF6F4]`}>
      <div className="flex flex-col items-center justify-center text-center gap-[30px] mx-auto" style={{ maxWidth: '800px' }}>
        <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] ${headlineSize} ${headlineTracking}`}>
          Can't find what you're looking for?
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#003b3c] text-[18px] tracking-[-0.18px]">
          Our Vitamin Specialists are here to help guide you to the right products for your health goals.
        </p>
        <button className="bg-[#009296] hover:bg-[#007b7f] text-white font-['Inter:Medium',sans-serif] font-medium text-[16px] tracking-[1.92px] uppercase px-[39px] py-[15px] rounded-[999px] transition-colors">
          CONTACT US
        </button>
      </div>
    </div>
  );
}