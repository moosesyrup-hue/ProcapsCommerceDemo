import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark, ChevronRight, Check } from 'lucide-react';

type Breakpoint = 'S' | 'M' | 'L' | 'XL' | 'HD';

// Mock article data
const ARTICLE_DATA: Record<string, {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: number;
  author: string;
  authorTitle: string;
  publishDate: string;
  heroImage: string;
  keyTakeaways: string[];
  tableOfContents: Array<{ id: string; title: string }>;
  content: Array<{
    type: 'paragraph' | 'heading' | 'image' | 'quote' | 'list';
    content: string | string[];
    imageUrl?: string;
    imageCaption?: string;
  }>;
  relatedArticles: Array<{
    id: string;
    title: string;
    category: string;
    readTime: number;
    image: string;
  }>;
}> = {
  'coq10-heart': {
    id: 'coq10-heart',
    title: 'CoQ10 and Heart Health: The Connection',
    subtitle: 'Understanding why Coenzyme Q10 is essential for cardiovascular function and why dosage matters',
    category: 'Ingredient Science',
    readTime: 6,
    author: 'Andrew Lessman',
    authorTitle: 'Founder & Formulator',
    publishDate: 'February 15, 2026',
    heroImage: 'https://images.unsplash.com/photo-1576669801838-1b1c52121e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwbGVtZW50JTIwcmVzZWFyY2glMjBsYWJvcmF0b3J5JTIwc2NpZW5jZXxlbnwxfHx8fDE3NzE2MDk0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    keyTakeaways: [
      'CoQ10 is essential for cellular energy production in every cell of your body',
      'The heart has the highest concentration of CoQ10 due to its constant energy demands',
      'CoQ10 levels naturally decline with age and certain medications',
      'Quality and dosage matter—100mg is the research-backed effective dose'
    ],
    tableOfContents: [
      { id: 'what-is-coq10', title: 'What is CoQ10?' },
      { id: 'heart-connection', title: 'The Heart-CoQ10 Connection' },
      { id: 'age-and-decline', title: 'Age and CoQ10 Decline' },
      { id: 'dosage-matters', title: 'Why Dosage Matters' },
      { id: 'choosing-supplement', title: 'Choosing a Quality Supplement' }
    ],
    content: [
      {
        type: 'paragraph',
        content: 'If I could recommend just one supplement for heart health, Coenzyme Q10 (CoQ10) would be at the top of my list. After decades of research and formulation, I\'ve seen firsthand how this remarkable nutrient supports cardiovascular wellness—but only when taken at the right dose and in the right form.'
      },
      {
        type: 'heading',
        content: 'What is CoQ10?'
      },
      {
        type: 'paragraph',
        content: 'Coenzyme Q10 is a naturally occurring compound found in virtually every cell of your body. Think of it as the spark plug for your cellular engines—the mitochondria. Without adequate CoQ10, your cells simply cannot produce energy efficiently.'
      },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1707944745900-ae9f750f2c69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbnRpc3QlMjBsYWJvcmF0b3J5JTIwcmVzZWFyY2glMjBtaWNyb3Njb3BlfGVufDF8fHx8MTc3MTg3MzY5MHww&ixlib=rb-4.1.0&q=80&w=1080',
        imageCaption: 'CoQ10 research has demonstrated its critical role in cellular energy production'
      },
      {
        type: 'paragraph',
        content: 'But CoQ10 is more than just an energy molecule. It\'s also a powerful antioxidant, protecting your cells from oxidative damage—particularly important for your cardiovascular system, which is under constant oxidative stress.'
      },
      {
        type: 'heading',
        content: 'The Heart-CoQ10 Connection'
      },
      {
        type: 'paragraph',
        content: 'Your heart is the hardest-working muscle in your body, beating roughly 100,000 times per day, every day of your life. This incredible workload requires enormous amounts of energy, which is why your heart muscle contains the highest concentration of CoQ10 of any tissue in your body.'
      },
      {
        type: 'quote',
        content: 'The heart never rests, and neither does its need for CoQ10. Supporting your heart with this essential nutrient is one of the most important things you can do for cardiovascular wellness.'
      },
      {
        type: 'paragraph',
        content: 'Research has consistently shown that individuals with cardiovascular concerns often have significantly lower levels of CoQ10 in their heart tissue. This isn\'t coincidental—it\'s a clear indication of how vital this nutrient is for heart function.'
      },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1584913855963-e0b0229af61d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwaGVhcnQlMjBmb29kcyUyMG51dHJpdGlvbiUyMHNhbG1vbnxlbnwxfHx8fDE3NzE4NzM2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        imageCaption: 'While some foods contain CoQ10, supplementation ensures adequate levels for heart health'
      },
      {
        type: 'heading',
        content: 'Age and CoQ10 Decline'
      },
      {
        type: 'paragraph',
        content: 'Here\'s what most people don\'t realize: your body\'s natural production of CoQ10 peaks in your 20s and begins a steady decline thereafter. By age 40, your CoQ10 levels may be 30% lower than they were in your youth. By age 60, that decline can reach 50% or more.'
      },
      {
        type: 'list',
        content: [
          'Age 20-30: Peak CoQ10 production',
          'Age 40: ~30% decline from peak levels',
          'Age 60+: ~50% or greater decline',
          'Statin medications can further reduce CoQ10 by 25-40%'
        ]
      },
      {
        type: 'paragraph',
        content: 'This age-related decline happens precisely when your cardiovascular system needs CoQ10 most. Add in the fact that certain medications—particularly statins—can further deplete CoQ10 levels, and you begin to understand why supplementation becomes increasingly important as we age.'
      },
      {
        type: 'heading',
        content: 'Why Dosage Matters'
      },
      {
        type: 'paragraph',
        content: 'This is where I see many supplements fall short. The research is clear: to achieve meaningful blood levels of CoQ10, you need at least 100mg per day. Yet I see products on the market with 10mg, 30mg, or 50mg—doses that simply won\'t move the needle on your CoQ10 levels.'
      },
      {
        type: 'paragraph',
        content: 'I formulate all my CoQ10 products at 100mg because that\'s what the science supports. It\'s not about using more to charge more—it\'s about using enough to make a real difference in your health.'
      },
      {
        type: 'quote',
        content: 'If you\'re going to take a supplement, take enough to matter. Inadequate doses are a waste of your money and your hope for better health.'
      },
      {
        type: 'heading',
        content: 'Choosing a Quality Supplement'
      },
      {
        type: 'paragraph',
        content: 'Not all CoQ10 supplements are created equal. Here\'s what to look for:'
      },
      {
        type: 'list',
        content: [
          'Minimum 100mg per serving (the research-backed dose)',
          'Delivered in an oil-based softgel for better absorption',
          'Pharmaceutical-grade purity and manufacturing standards',
          'Third-party testing for quality and potency',
          'No unnecessary fillers, binders, or artificial ingredients'
        ]
      },
      {
        type: 'paragraph',
        content: 'CoQ10 is fat-soluble, which means it\'s best absorbed when taken with food containing some fat. I always recommend taking your CoQ10 with a meal for optimal absorption.'
      },
      {
        type: 'paragraph',
        content: 'Your heart deserves the best support you can give it. CoQ10 isn\'t just another supplement—it\'s foundational nutrition for cardiovascular wellness. After four decades of formulating supplements, it remains one of the nutrients I\'m most passionate about, because I\'ve seen what a profound difference it can make in people\'s lives.'
      }
    ],
    relatedArticles: [
      {
        id: 'omega-3-benefits',
        title: 'Omega-3 Fatty Acids: EPA and DHA Explained',
        category: 'Ingredient Spotlight',
        readTime: 7,
        image: 'https://images.unsplash.com/photo-1576437293196-fc3080b75964?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbWVnYSUyMDMlMjBmaXNoJTIwb2lsJTIwc3VwcGxlbWVudHxlbnwxfHx8fDE3NzE1NDkwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: 'vitamin-k2-heart',
        title: 'Vitamin K2: The Heart-Calcium Connection',
        category: 'Wellness Guide',
        readTime: 5,
        image: 'https://images.unsplash.com/photo-1763668444855-401b58dceb20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwbGVtZW50JTIwY2Fwc3VsZXMlMjB2aXRhbWlucyUyMG5hdHVyYWx8ZW58MXx8fHwxNzcxODczNjkxfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: 'blood-pressure-natural',
        title: "Andrew's Approach to Healthy Blood Pressure",
        category: 'Wellness Guide',
        readTime: 8,
        image: 'https://images.unsplash.com/photo-1635367216109-aa3353c0c22e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbGlmZXN0eWxlJTIwd2VsbmVzc3MlMjBsaXZpbmd8ZW58MXx8fHwxNzcxNjA5NDkzfDA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ]
  }
};

interface WellnessHubArticlePageProps {
  articleId: string;
  onBack?: () => void;
  onNavigateToArticle?: (articleId: string) => void;
}

export default function WellnessHubArticlePage({
  articleId,
  onBack,
  onNavigateToArticle
}: WellnessHubArticlePageProps) {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('XL');
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

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

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const progress = (scrollTop / trackLength) * 100;

      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const article = ARTICLE_DATA[articleId];

  if (!article) {
    return (
      <div className="w-full min-h-screen bg-[#F7F2EC] flex items-center justify-center">
        <div className="text-center">
          <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[24px] mb-[20px]">
            Article not found
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
    <div className="w-full bg-[#F7F2EC]" ref={contentRef}>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-[#D9E2E2] z-50">
        <div
          className="h-full bg-[#009296] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back Button */}
      <BackButton breakpoint={breakpoint} onBack={onBack} />

      {/* Hero Section */}
      <ArticleHero article={article} breakpoint={breakpoint} />

      {/* Article Metadata */}
      <ArticleMetadata 
        article={article} 
        breakpoint={breakpoint}
        isBookmarked={isBookmarked}
        onToggleBookmark={() => setIsBookmarked(!isBookmarked)}
      />

      {/* Key Takeaways */}
      <KeyTakeaways takeaways={article.keyTakeaways} breakpoint={breakpoint} />

      {/* Main Content Area */}
      <div className={`relative w-full ${isMobile ? 'px-[20px] py-[40px]' : isTablet ? 'px-[30px] py-[60px]' : 'px-[40px] py-[60px]'}`}>
        <div className="mx-auto" style={{ maxWidth: '1440px' }}>
          <div className={`flex ${isMobile || isTablet ? 'flex-col' : 'flex-row'} gap-[60px]`}>
            {/* Table of Contents - Desktop Only */}
            {!isMobile && !isTablet && (
              <TableOfContents 
                items={article.tableOfContents} 
                activeSection={activeSection}
              />
            )}

            {/* Article Content */}
            <ArticleContent content={article.content} breakpoint={breakpoint} />
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <RelatedArticles 
        articles={article.relatedArticles}
        breakpoint={breakpoint}
        onNavigateToArticle={onNavigateToArticle}
      />

      {/* CTA Section */}
      <ArticleCTA breakpoint={breakpoint} />
    </div>
  );
}

// Back Button
function BackButton({ breakpoint, onBack }: { breakpoint: Breakpoint; onBack?: () => void }) {
  const isMobile = breakpoint === 'S';
  const padding = isMobile ? 'px-[20px] py-[20px]' : 'px-[40px] py-[30px]';

  return (
    <div className={`w-full ${padding} bg-white mt-[3px]`}>
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

// Article Hero
function ArticleHero({ article, breakpoint }: { article: typeof ARTICLE_DATA[string]; breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[20px] py-[40px]' : isTablet ? 'px-[30px] py-[50px]' : 'px-[40px] py-[60px]';

  return (
    <div className={`relative w-full ${padding} bg-white`}>
      <div className="mx-auto" style={{ maxWidth: '900px' }}>
        {/* Category Badge */}
        <div className="inline-block mb-[20px]">
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[#009296] text-[11px] tracking-[1.1px] uppercase bg-[#EFF6F4] px-[12px] py-[6px] rounded-[4px]">
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h1 className={`font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.1] text-[#003b3c] mb-[20px] ${
          isMobile ? 'text-[36px] tracking-[-0.72px]' : isTablet ? 'text-[44px] tracking-[-0.88px]' : 'text-[52px] tracking-[-1.04px]'
        }`}>
          {article.title}
        </h1>

        {/* Subtitle */}
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] text-[#003b3c]/80 text-[20px] tracking-[-0.2px] mb-[30px]">
          {article.subtitle}
        </p>

        {/* Hero Image */}
        <div className="w-full aspect-[16/9] rounded-[12px] overflow-hidden mb-[30px]">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

// Article Metadata
function ArticleMetadata({ 
  article, 
  breakpoint,
  isBookmarked,
  onToggleBookmark
}: { 
  article: typeof ARTICLE_DATA[string]; 
  breakpoint: Breakpoint;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}) {
  const isMobile = breakpoint === 'S';
  const padding = isMobile ? 'px-[20px] pb-[30px]' : 'px-[40px] pb-[40px]';

  return (
    <div className={`relative w-full ${padding} bg-white border-b border-[#D9E2E2]`}>
      <div className="mx-auto" style={{ maxWidth: '900px' }}>
        <div className={`flex ${isMobile ? 'flex-col gap-[20px]' : 'flex-row items-center justify-between'}`}>
          {/* Author & Meta */}
          <div className="flex items-center gap-[20px]">
            <div className="w-[48px] h-[48px] rounded-full bg-[#009296] flex items-center justify-center text-white font-['Inter:Medium',sans-serif] text-[20px]">
              AL
            </div>
            <div>
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] text-[14px]">
                {article.author}
              </p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#003b3c]/60 text-[12px]">
                {article.authorTitle}
              </p>
            </div>
            <div className="h-[30px] w-[1px] bg-[#D9E2E2]" />
            <div className="flex items-center gap-[16px] text-[#003b3c]/60 text-[12px]">
              <span className="flex items-center gap-[6px]">
                <Calendar className="w-[14px] h-[14px]" />
                {article.publishDate}
              </span>
              <span className="flex items-center gap-[6px]">
                <Clock className="w-[14px] h-[14px]" />
                {article.readTime} min read
              </span>
            </div>
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
              {!isMobile && <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px]">Save</span>}
            </button>
            <button className="flex items-center gap-[6px] px-[16px] py-[8px] rounded-[6px] border border-[#D9E2E2] bg-white text-[#003b3c]/60 hover:border-[#009296] hover:text-[#009296] transition-colors">
              <Share2 className="w-[16px] h-[16px]" />
              {!isMobile && <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px]">Share</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Key Takeaways
function KeyTakeaways({ takeaways, breakpoint }: { takeaways: string[]; breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[20px] py-[40px]' : isTablet ? 'px-[30px] py-[50px]' : 'px-[40px] py-[60px]';

  return (
    <div className={`relative w-full ${padding}`}>
      <div className="mx-auto" style={{ maxWidth: '900px' }}>
        <div className="bg-[#EFF6F4] rounded-[12px] p-[30px]" style={{ border: '1px solid #D9E2E2' }}>
          <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[24px] tracking-[-0.48px] mb-[20px]">
            Key Takeaways
          </p>
          <div className="space-y-[16px]">
            {takeaways.map((takeaway, index) => (
              <div key={index} className="flex items-start gap-[12px]">
                <div className="flex-shrink-0 w-[20px] h-[20px] rounded-full bg-[#009296] flex items-center justify-center mt-[2px]">
                  <Check className="w-[12px] h-[12px] text-white" />
                </div>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#003b3c] text-[16px] leading-[1.5] tracking-[-0.16px]">
                  {takeaway}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Table of Contents
function TableOfContents({ 
  items, 
  activeSection 
}: { 
  items: Array<{ id: string; title: string }>; 
  activeSection: string;
}) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-[280px] flex-shrink-0 sticky top-[120px] self-start">
      <div className="bg-white rounded-[12px] p-[24px]" style={{ border: '1px solid #D9E2E2' }}>
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#003b3c] text-[14px] tracking-[1.4px] uppercase mb-[16px]">
          In This Article
        </p>
        <div className="space-y-[8px]">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left px-[12px] py-[8px] rounded-[6px] transition-colors group ${
                activeSection === item.id 
                  ? 'bg-[#EFF6F4] text-[#009296]' 
                  : 'text-[#003b3c]/60 hover:bg-[#EFF6F4] hover:text-[#009296]'
              }`}
            >
              <div className="flex items-center gap-[8px]">
                <ChevronRight className={`w-[14px] h-[14px] transition-transform ${
                  activeSection === item.id ? 'translate-x-1' : ''
                }`} />
                <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[1.4]">
                  {item.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Article Content
function ArticleContent({ content, breakpoint }: { content: typeof ARTICLE_DATA[string]['content']; breakpoint: Breakpoint }) {
  return (
    <div className="flex-1" style={{ maxWidth: '680px' }}>
      <div className="space-y-[24px]">
        {content.map((block, index) => {
          if (block.type === 'paragraph') {
            return (
              <p 
                key={index}
                className="font-['Inter:Regular',sans-serif] font-normal leading-[1.7] text-[#003b3c] text-[18px] tracking-[-0.18px]"
              >
                {block.content}
              </p>
            );
          }

          if (block.type === 'heading') {
            return (
              <h2
                key={index}
                id={String(block.content).toLowerCase().replace(/\s+/g, '-')}
                className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] text-[32px] tracking-[-0.64px] mt-[40px] mb-[20px]"
              >
                {block.content}
              </h2>
            );
          }

          if (block.type === 'image') {
            return (
              <div key={index} className="my-[40px]">
                <div className="w-full rounded-[12px] overflow-hidden mb-[12px]">
                  <img
                    src={block.imageUrl}
                    alt={block.imageCaption || ''}
                    className="w-full h-auto"
                  />
                </div>
                {block.imageCaption && (
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[#003b3c]/60 text-[14px] leading-[1.5] tracking-[-0.14px] text-center italic">
                    {block.imageCaption}
                  </p>
                )}
              </div>
            );
          }

          if (block.type === 'quote') {
            return (
              <div 
                key={index}
                className="my-[40px] bg-[#EFF6F4] rounded-[12px] p-[30px] border-l-[4px] border-[#009296]"
              >
                <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.5] text-[#003b3c] text-[22px] tracking-[-0.44px] italic">
                  "{block.content}"
                </p>
              </div>
            );
          }

          if (block.type === 'list' && Array.isArray(block.content)) {
            return (
              <ul key={index} className="space-y-[12px] my-[24px]">
                {block.content.map((item, itemIndex) => (
                  <li 
                    key={itemIndex}
                    className="flex items-start gap-[12px] font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#003b3c] text-[18px] tracking-[-0.18px]"
                  >
                    <span className="text-[#009296] mt-[8px]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}

// Related Articles
function RelatedArticles({ 
  articles, 
  breakpoint,
  onNavigateToArticle
}: { 
  articles: typeof ARTICLE_DATA[string]['relatedArticles']; 
  breakpoint: Breakpoint;
  onNavigateToArticle?: (articleId: string) => void;
}) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[20px] py-[60px]' : isTablet ? 'px-[30px] py-[80px]' : 'px-[40px] py-[80px]';
  const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div className={`relative w-full ${padding} bg-white`}>
      <div className="mx-auto" style={{ maxWidth: '1440px' }}>
        <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] text-[32px] tracking-[-0.64px] mb-[30px]">
          Related Articles
        </p>
        <div className={`grid ${gridCols} gap-[20px]`}>
          {articles.map((article) => (
            <button
              key={article.id}
              onClick={() => onNavigateToArticle?.(article.id)}
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
                <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium text-[#003b3c] text-[18px] leading-[1.3] tracking-[-0.36px]">
                  {article.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Article CTA
function ArticleCTA({ breakpoint }: { breakpoint: Breakpoint }) {
  const isMobile = breakpoint === 'S';
  const isTablet = breakpoint === 'M';
  const padding = isMobile ? 'px-[20px] py-[60px]' : isTablet ? 'px-[30px] py-[80px]' : 'px-[40px] py-[100px]';

  return (
    <div className={`relative w-full ${padding} bg-[#EFF6F4]`}>
      <div className="flex flex-col items-center justify-center text-center gap-[30px] mx-auto" style={{ maxWidth: '700px' }}>
        <p className="font-['STIX_Two_Text:Medium',sans-serif] font-medium leading-[1.2] text-[#003b3c] text-[34px] tracking-[-0.68px]">
          Ready to support your heart health?
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#003b3c] text-[18px] tracking-[-0.18px]">
          Explore our research-backed CoQ10 formulas, crafted with the quality and potency you deserve.
        </p>
        <button className="bg-[#009296] hover:bg-[#007b7f] text-white font-['Inter:Medium',sans-serif] font-medium text-[16px] tracking-[1.92px] uppercase px-[39px] py-[15px] rounded-[999px] transition-colors">
          SHOP COQ10
        </button>
      </div>
    </div>
  );
}
