import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Video, Clock, ArrowRight, Search } from 'lucide-react';

type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

// Goal-specific content data
const GOAL_CONTENT: Record<string, {
  title: string;
  description: string;
  longDescription: string;
  heroImage: string;
  articles: Array<{
    id: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: number;
    image: string;
  }>;
  videos: Array<{
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
    category: string;
  }>;
  products: Array<{
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
  }>;
}> = {
  'heart-health': {
    title: 'Heart Health',
    description: 'Support cardiovascular wellness and healthy circulation',
    longDescription: 'Your heart works tirelessly every second of your life. Supporting cardiovascular health through proper nutrition and targeted supplementation can help maintain healthy circulation, blood pressure, and overall heart function. Our heart health supplements are formulated with research-backed ingredients at meaningful doses.',
    heroImage: 'https://images.unsplash.com/photo-1750032517124-33af79f5fd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW1lcmljYW4lMjB3b21hbiUyMGpvZ2dpbmclMjBleGVyY2lzZSUyMGNhcmRpb3xlbnwxfHx8fDE3NzE4NjM1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    articles: [
      {
        id: 'coq10-heart',
        title: 'CoQ10 and Heart Health: The Connection',
        excerpt: 'Discover why CoQ10 is essential for cardiovascular function and why the 100mg dose matters.',
        category: 'Ingredient Science',
        readTime: 6,
        image: 'https://images.unsplash.com/photo-1576669801838-1b1c52121e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwbGVtZW50JTIwcmVzZWFyY2glMjBsYWJvcmF0b3J5JTIwc2NpZW5jZXxlbnwxfHx8fDE3NzE2MDk0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: 'omega-3-benefits',
        title: 'Omega-3 Fatty Acids: EPA and DHA Explained',
        excerpt: 'Learn about the different types of omega-3s and their specific roles in heart health.',
        category: 'Ingredient Spotlight',
        readTime: 7,
        image: 'https://images.unsplash.com/photo-1576437293196-fc3080b75964?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbWVnYSUyMDMlMjBmaXNoJTIwb2lsJTIwc3VwcGxlbWVudHxlbnwxfHx8fDE3NzE1NDkwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: 'vitamin-k2-heart',
        title: 'Vitamin K2: The Heart-Calcium Connection',
        excerpt: 'Understanding how vitamin K2 helps direct calcium to your bones and away from your arteries.',
        category: 'Wellness Guide',
        readTime: 5,
        image: 'https://images.unsplash.com/photo-1763668444855-401b58dceb20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwY2Fwc3VsZXMlMjBuYXR1cmFsJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzcxNjA5NDkyfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: 'blood-pressure-natural',
        title: "Andrew's Approach to Healthy Blood Pressure",
        excerpt: 'Natural ways to support healthy blood pressure levels through diet, lifestyle, and targeted nutrition.',
        category: 'Wellness Guide',
        readTime: 8,
        image: 'https://images.unsplash.com/photo-1635367216109-aa3353c0c22e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbGlmZXN0eWxlJTIwd2VsbG5lc3MlMjBsaXZpbmd8ZW58MXx8fHwxNzcxNjA5NDkzfDA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    videos: [
      {
        id: 'coq10-explained',
        title: 'Andrew Explains CoQ10',
        duration: '2:34',
        thumbnail: 'https://images.unsplash.com/photo-1576669801838-1b1c52121e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwbGVtZW50JTIwcmVzZWFyY2glMjBsYWJvcmF0b3J5JTIwc2NpZW5jZXxlbnwxfHx8fDE3NzE2MDk0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'Product Science'
      },
      {
        id: 'heart-health-tour',
        title: 'Heart Health Product Tour',
        duration: '5:42',
        thumbnail: 'https://images.unsplash.com/photo-1623134915837-d2fdb4f59035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFydCUyMGhlYWx0aCUyMGNhcmRpb3Zhc2N1bGFyJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzcxNjA5NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'Product Tour'
      }
    ],
    products: [
      {
        id: 'coq10-100',
        name: 'CoQ10 100mg',
        description: 'High-potency Coenzyme Q10 for heart health and cellular energy',
        image: 'https://images.unsplash.com/photo-1576669801838-1b1c52121e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwbGVtZW50JTIwcmVzZWFyY2glMjBsYWJvcmF0b3J5JTIwc2NpZW5jZXxlbnwxfHx8fDE3NzE2MDk0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        price: 29.95
      },
      {
        id: 'omega-3',
        name: 'Omega-3 EPA/DHA',
        description: 'Pure fish oil with optimal ratios of EPA and DHA',
        image: 'https://images.unsplash.com/photo-1576437293196-fc3080b75964?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbWVnYSUyMDMlMjBmaXNoJTIwb2lsJTIwc3VwcGxlbWVudHxlbnwxfHx8fDE3NzE1NDkwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        price: 34.95
      }
    ]
  },
  'sleep-support': {
    title: 'Sleep Support',
    description: 'Rest and recovery solutions for better sleep quality',
    longDescription: 'Quality sleep is fundamental to health, yet many struggle to achieve consistent, restorative rest. Our sleep support supplements use natural ingredients to help you fall asleep naturally, stay asleep longer, and wake refreshed—without morning grogginess or dependency.',
    heroImage: 'https://images.unsplash.com/photo-1721073956820-644a71ba075e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMHNsZWVwJTIwYmVkcm9vbSUyMHJlc3R8ZW58MXx8fHwxNzcxNjA5NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    articles: [
      {
        id: 'sleep-guide',
        title: "Andrew's Guide to Better Sleep",
        excerpt: 'A comprehensive look at the science of sleep and how the right supplements can support healthy sleep patterns.',
        category: 'Wellness Guide',
        readTime: 8,
        image: 'https://images.unsplash.com/photo-1635367216109-aa3353c0c22e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbGlmZXN0eWxlJTIwd2VsbG5lc3MlMjBsaXZpbmd8ZW58MXx8fHwxNzcxNjA5NDkzfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: 'melatonin-myths',
        title: 'Melatonin: Separating Fact from Fiction',
        excerpt: 'Understanding melatonin dosing, timing, and why less is often more.',
        category: 'Myth Busters',
        readTime: 6,
        image: 'https://images.unsplash.com/photo-1721073956820-644a71ba075e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMHNsZWVwJTIwYmVkcm9vbSUyMHJlc3R8ZW58MXx8fHwxNzcxNjA5NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    videos: [
      {
        id: 'sleep-science',
        title: 'The Science of Sleep',
        duration: '4:15',
        thumbnail: 'https://images.unsplash.com/photo-1721073956820-644a71ba075e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMHNsZWVwJTIwYmVkcm9vbSUyMHJlc3R8ZW58MXx8fHwxNzcxNjA5NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'Educational'
      }
    ],
    products: [
      {
        id: 'sleep-support',
        name: 'Sleep Support Complex',
        description: 'Natural sleep support with melatonin, magnesium, and calming herbs',
        image: 'https://images.unsplash.com/photo-1721073956820-644a71ba075e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMHNsZWVwJTIwYmVkcm9vbSUyMHJlc3R8ZW58MXx8fHwxNzcxNjA5NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        price: 24.95
      }
    ]
  },
  'joint-health': {
    title: 'Joint Health',
    description: 'Mobility and flexibility support for active living',
    longDescription: 'Healthy joints are essential for an active, independent life. Our joint health formulas combine glucosamine, chondroitin, and other research-backed ingredients to support cartilage health, joint comfort, and flexibility at every age.',
    heroImage: 'https://images.unsplash.com/photo-1758599879161-aa3d234ecb74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwam9pbnRzJTIwZmxleGliaWxpdHklMjB5b2dhfGVufDF8fHx8MTc3MTYwOTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    articles: [
      {
        id: 'glucosamine-guide',
        title: 'Glucosamine and Chondroitin: What You Need to Know',
        excerpt: 'Understanding the science behind these popular joint health ingredients.',
        category: 'Ingredient Science',
        readTime: 7,
        image: 'https://images.unsplash.com/photo-1729708273852-b63222c8b35d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbHVjb3NhbWluZSUyMGpvaW50JTIwc3VwcGxlbWVudCUyMGJvdHRsZXxlbnwxfHx8fDE3NzE2MTE1MzF8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    videos: [
      {
        id: 'joint-health-basics',
        title: 'Joint Health Basics',
        duration: '3:45',
        thumbnail: 'https://images.unsplash.com/photo-1758599879161-aa3d234ecb74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwam9pbnRzJTIwZmxleGliaWxpdHklMjB5b2dhfGVufDF8fHx8MTc3MTYwOTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'Educational'
      }
    ],
    products: [
      {
        id: 'joint-formula',
        name: 'Complete Joint Formula',
        description: 'Comprehensive joint support with glucosamine, chondroitin, and MSM',
        image: 'https://images.unsplash.com/photo-1729708273852-b63222c8b35d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbHVjb3NhbWluZSUyMGpvaW50JTIwc3VwcGxlbWVudCUyMGJvdHRsZXxlbnwxfHx8fDE3NzE2MTE1MzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        price: 39.95
      }
    ]
  },
  // Additional goals with minimal content for now
  'brain-health': {
    title: 'Brain Health',
    description: 'Focus and mental clarity support',
    longDescription: 'Support cognitive function, memory, and mental clarity with targeted brain health nutrients.',
    heroImage: 'https://images.unsplash.com/photo-1614492898637-435e0f87cef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwbWFuJTIwc3R1ZHlpbmclMjBmb2N1cyUyMGNvbmNlbnRyYXRpb258ZW58MXx8fHwxNzcxODYzNTk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    articles: [],
    videos: [],
    products: []
  },
  'energy-focus': {
    title: 'Energy & Focus',
    description: 'Stay active and energized throughout your day',
    longDescription: 'Natural energy support without crashes or jitters. Our formulas help you maintain steady energy levels.',
    heroImage: 'https://images.unsplash.com/photo-1631899560971-394ded28a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwd29tYW4lMjBydW5uaW5nJTIwZW5lcmd5JTIwYWN0aXZlfGVufDF8fHx8MTc3MTg2MzU5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    articles: [],
    videos: [],
    products: []
  },
  'immune-support': {
    title: 'Immune Support',
    description: 'Strengthen your natural defenses',
    longDescription: 'Support your immune system with vitamin C, zinc, and other immune-boosting nutrients.',
    heroImage: 'https://images.unsplash.com/photo-1767656193453-3ab70acfc66d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGhlYWx0aHklMjBsaWZlc3R5bGUlMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NzE4NjM1OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    articles: [],
    videos: [],
    products: []
  },
  'digestive-health': {
    title: 'Digestive Health',
    description: 'Gut wellness and balance',
    longDescription: 'Support digestive comfort and gut health with probiotics, enzymes, and fiber.',
    heroImage: 'https://images.unsplash.com/photo-1683106063169-741e57034d19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMG1hbiUyMGNvb2tpbmclMjBoZWFsdGh5JTIwZm9vZCUyMGtpdGNoZW58ZW58MXx8fHwxNzcxODYzNTk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    articles: [],
    videos: [],
    products: []
  },
  'healthy-aging': {
    title: 'Healthy Aging',
    description: 'Vitality at every age',
    longDescription: 'Age gracefully with antioxidants and nutrients that support cellular health and longevity.',
    heroImage: 'https://images.unsplash.com/photo-1761472084994-61d80b8f4053?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBhc2lhbiUyMGNvdXBsZSUyMGFjdGl2ZSUyMGhpa2luZyUyMG91dGRvb3JzfGVufDF8fHx8MTc3MTg2MzU5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    articles: [],
    videos: [],
    products: []
  }
};

interface WellnessHubGoalPageProps {
  goalId: string;
  onBack?: () => void;
  onNavigateToArticle?: (articleId: string) => void;
  onNavigateToVideo?: (videoId: string) => void;
  onNavigateToProduct?: (productId: string) => void;
}

export default function WellnessHubGoalPage({
  goalId,
  onBack,
  onNavigateToArticle,
  onNavigateToVideo,
  onNavigateToProduct
}: WellnessHubGoalPageProps) {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('XL');

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

  const content = GOAL_CONTENT[goalId];

  if (!content) {
    return (
      <div className="w-full min-h-screen bg-[#F7F2EC] flex items-center justify-center">
        <div className="text-center">
          <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[24px] mb-[20px]">
            Goal not found
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

      {/* Hero Section */}
      <GoalHero content={content} breakpoint={breakpoint} />

      {/* Overview Section */}
      <OverviewSection content={content} breakpoint={breakpoint} />

      {/* Articles Section */}
      {content.articles.length > 0 && (
        <ArticlesSection
          articles={content.articles}
          breakpoint={breakpoint}
          onNavigateToArticle={onNavigateToArticle}
        />
      )}

      {/* Videos Section */}
      {content.videos.length > 0 && (
        <VideosSection
          videos={content.videos}
          breakpoint={breakpoint}
          onNavigateToVideo={onNavigateToVideo}
        />
      )}

      {/* Products Section */}
      {content.products.length > 0 && (
        <ProductsSection
          products={content.products}
          goalTitle={content.title}
          breakpoint={breakpoint}
          onNavigateToProduct={onNavigateToProduct}
        />
      )}

      {/* CTA Section */}
      <CTASection breakpoint={breakpoint} />
    </div>
  );
}

// Back Button Component
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

// Goal Hero Component
function GoalHero({ content, breakpoint }: { content: typeof GOAL_CONTENT[string]; breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[20px] py-[40px]' : isTablet ? 'px-[30px] py-[60px]' : 'px-[40px] py-[80px]';
  const headlineSize = isMobile ? 'text-[40px]' : isTablet ? 'text-[48px]' : breakpoint === 'HD' ? 'text-[72px]' : breakpoint === 'XL' ? 'text-[64px]' : 'text-[56px]';
  const headlineTracking = isMobile ? 'tracking-[-0.8px]' : isTablet ? 'tracking-[-0.96px]' : breakpoint === 'HD' ? 'tracking-[-1.44px]' : breakpoint === 'XL' ? 'tracking-[-1.28px]' : 'tracking-[-1.12px]';

  return (
    <div className={`relative w-full ${padding} bg-white`}>
      <div className="mx-auto" style={{ maxWidth: '1440px' }}>
        <div className={`flex ${isMobile || isTablet ? 'flex-col gap-[30px]' : 'flex-row gap-[60px]'} items-center`}>
          <div className={`${isMobile || isTablet ? 'w-full' : 'w-1/2'}`}>
            <p className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[#009296] ${headlineSize} ${headlineTracking} mb-[20px]`}>
              {content.title}
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] text-[#003b3c] text-[20px] tracking-[-0.2px]">
              {content.description}
            </p>
          </div>
          <div className={`${isMobile || isTablet ? 'w-full aspect-[16/10]' : 'w-1/2 aspect-[4/3]'} rounded-[20px] overflow-hidden`}>
            <img
              src={content.heroImage}
              alt={content.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Overview Section
function OverviewSection({ content, breakpoint }: { content: typeof GOAL_CONTENT[string]; breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[20px] py-[40px]' : isTablet ? 'px-[30px] py-[60px]' : 'px-[40px] py-[60px]';

  return (
    <div className={`relative w-full ${padding}`}>
      <div className="mx-auto" style={{ maxWidth: '900px' }}>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] text-[18px] tracking-[-0.18px]">
          {content.longDescription}
        </p>
      </div>
    </div>
  );
}

// Articles Section
function ArticlesSection({
  articles,
  breakpoint,
  onNavigateToArticle
}: {
  articles: typeof GOAL_CONTENT[string]['articles'];
  breakpoint: Breakpoint;
  onNavigateToArticle?: (articleId: string) => void;
}) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[20px] py-[40px]' : isTablet ? 'px-[30px] py-[60px]' : 'px-[40px] py-[80px]';
  const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div className={`relative w-full ${padding} bg-white`}>
      <div className="mx-auto" style={{ maxWidth: '1440px' }}>
        <div className="flex items-center gap-[12px] mb-[30px]">
          <BookOpen className="w-[24px] h-[24px] text-[#009296]" />
          <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] text-[28px] tracking-[-0.56px]">
            Articles & Guides
          </p>
        </div>
        <div className={`grid ${gridCols} gap-[20px]`}>
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
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
  onClick
}: {
  article: typeof GOAL_CONTENT[string]['articles'][0];
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

// Videos Section
function VideosSection({
  videos,
  breakpoint,
  onNavigateToVideo
}: {
  videos: typeof GOAL_CONTENT[string]['videos'];
  breakpoint: Breakpoint;
  onNavigateToVideo?: (videoId: string) => void;
}) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[20px] py-[40px]' : isTablet ? 'px-[30px] py-[60px]' : 'px-[40px] py-[80px]';
  const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4';

  return (
    <div className={`relative w-full ${padding}`}>
      <div className="mx-auto" style={{ maxWidth: '1440px' }}>
        <div className="flex items-center gap-[12px] mb-[30px]">
          <Video className="w-[24px] h-[24px] text-[#009296]" />
          <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] text-[28px] tracking-[-0.56px]">
            Video Library
          </p>
        </div>
        <div className={`grid ${gridCols} gap-[20px]`}>
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
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
  onClick
}: {
  video: typeof GOAL_CONTENT[string]['videos'][0];
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
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

// Products Section
function ProductsSection({
  products,
  goalTitle,
  breakpoint,
  onNavigateToProduct
}: {
  products: typeof GOAL_CONTENT[string]['products'];
  goalTitle: string;
  breakpoint: Breakpoint;
  onNavigateToProduct?: (productId: string) => void;
}) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[20px] py-[40px]' : isTablet ? 'px-[30px] py-[60px]' : 'px-[40px] py-[80px]';
  const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div className={`relative w-full ${padding} bg-white`}>
      <div className="mx-auto" style={{ maxWidth: '1440px' }}>
        <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] text-[28px] tracking-[-0.56px] mb-[16px]">
          Recommended for {goalTitle}
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#003b3c]/80 text-[16px] leading-[1.5] tracking-[-0.16px] mb-[30px]">
          Shop our targeted supplements formulated to support your {goalTitle.toLowerCase()} goals.
        </p>
        <div className={`grid ${gridCols} gap-[20px]`}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onNavigateToProduct?.(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Product Card
function ProductCard({
  product,
  onClick
}: {
  product: typeof GOAL_CONTENT[string]['products'][0];
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative w-full flex flex-col rounded-[10px] overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg bg-white text-left"
      style={{ border: '1px solid #D9E2E2' }}
    >
      <div className="relative w-full aspect-square bg-[#F7F2EC]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-[20px]">
        <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[20px] leading-[1.3] tracking-[-0.4px] mb-[8px]">
          {product.name}
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#003b3c]/70 text-[14px] leading-[1.5] tracking-[-0.14px] mb-[16px]">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="font-['Inter:Medium',sans-serif] font-medium text-[#009296] text-[24px]">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center gap-[6px] text-[#009296] font-['Inter:Medium',sans-serif] font-medium text-[14px]">
            Shop Now
            <ArrowRight className="w-[14px] h-[14px]" />
          </div>
        </div>
      </div>
    </button>
  );
}

// CTA Section
function CTASection({ breakpoint }: { breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[20px] py-[60px]' : isTablet ? 'px-[30px] py-[80px]' : 'px-[40px] py-[100px]';

  return (
    <div className={`relative w-full ${padding} bg-[#EFF6F4]`}>
      <div className="flex flex-col items-center justify-center text-center gap-[30px] mx-auto" style={{ maxWidth: '800px' }}>
        <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] text-[34px] tracking-[-0.68px]">
          Have questions about your health goals?
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#003b3c] text-[18px] tracking-[-0.18px]">
          Our Vitamin Specialists are here to provide personalized guidance and product recommendations.
        </p>
        <button className="bg-[#009296] hover:bg-[#007b7f] text-white font-['Inter:Medium',sans-serif] font-medium text-[16px] tracking-[1.92px] uppercase px-[39px] py-[15px] rounded-[999px] transition-colors">
          CONTACT A SPECIALIST
        </button>
      </div>
    </div>
  );
}