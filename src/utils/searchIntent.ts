// Search intent detection and matching utilities
import { categories } from '../data/categories';
import { bodyParts } from '../data/bodyParts';
import { bodyFunctions } from '../data/bodyFunctions';
import { healthIssues } from '../data/healthIssues';
import { ingredients } from '../data/ingredients';
import { products, type Product } from '../data/products';
import {
  generateHealthIssueContent,
  generateBodyFunctionContent,
  generateBodyPartContent,
  generateIngredientContent,
  generateCategoryContent,
  generateSymptomContent,
  generateLifeStageContent,
  generateFallbackContent,
} from './contentTemplates';

export type SearchIntentType = 
  | 'health-goal'
  | 'symptom'
  | 'body-part'
  | 'ingredient'
  | 'life-stage'
  | 'product-name'
  | 'general';

export interface SearchIntent {
  type: SearchIntentType;
  query: string;
  matchedEntity?: any;
  confidence: number;
  suggestions: string[];
}

export interface SearchContext {
  title: string;
  description: string;
  conversationalIntro?: string;
  conversationalBody?: string;
  quickFilters?: {
    label: string;
    value: string;
  }[];
  educationalContent?: {
    whatItInvolves?: string[];
    commonCauses?: string[];
    approaches?: string[];
    keyIngredients?: string[];
  };
}

// Symptom keywords mapping
const symptomKeywords = {
  'always tired': ['fatigue', 'energy', 'exhaustion'],
  'brain fog': ['cognitive function', 'mental clarity', 'focus'],
  'poor digestion': ['digestive health', 'gut health', 'bloating'],
  'joint discomfort': ['joint pain', 'stiffness', 'mobility'],
  'trouble sleeping': ['sleep', 'insomnia', 'rest'],
  'stressed out': ['stress', 'anxiety', 'mood'],
  'low energy': ['fatigue', 'energy production', 'vitality'],
  'cant sleep': ['sleep', 'insomnia', 'falling asleep'],
  'sleep problems': ['sleep disorders', 'sleep quality'],
  'stomach issues': ['digestive health', 'gut health'],
  'memory problems': ['memory', 'cognitive function', 'brain health'],
  'getting sick': ['immune health', 'immunity'],
  'inflammation': ['anti-inflammatory', 'joint health'],
};

// Life stage keywords
const lifeStageKeywords = {
  'pregnant': ['prenatal', 'pregnancy'],
  'pregnancy': ['prenatal', 'pregnancy'],
  'menopause': ['hormonal balance', 'hot flash'],
  'vegetarian': ['b12', 'iron', 'protein'],
  'vegan': ['b12', 'iron', 'omega-3', 'protein'],
  'athlete': ['energy', 'recovery', 'protein', 'performance'],
  'aging': ['anti-aging', 'longevity', 'brain health', 'joint health'],
  'getting older': ['anti-aging', 'longevity', 'brain health'],
};

// Detect search intent
export function detectSearchIntent(query: string): SearchIntent {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Check for exact category match
  const categoryMatch = categories.find(cat => 
    cat.name.toLowerCase() === normalizedQuery
  );
  if (categoryMatch) {
    return {
      type: 'health-goal',
      query,
      matchedEntity: categoryMatch,
      confidence: 1.0,
      suggestions: [],
    };
  }

  // Check for body part match
  const bodyPartMatch = bodyParts.find(part =>
    part.name.toLowerCase() === normalizedQuery ||
    normalizedQuery.includes(part.name.toLowerCase())
  );
  if (bodyPartMatch) {
    return {
      type: 'body-part',
      query,
      matchedEntity: bodyPartMatch,
      confidence: 0.9,
      suggestions: [],
    };
  }

  // Check for body function match
  const functionMatch = bodyFunctions.find(func =>
    func.name.toLowerCase().includes(normalizedQuery) ||
    normalizedQuery.includes(func.name.toLowerCase().split(' ')[0])
  );
  if (functionMatch) {
    return {
      type: 'health-goal',
      query,
      matchedEntity: functionMatch,
      confidence: 0.85,
      suggestions: [],
    };
  }

  // Check for health issue match
  const issueMatch = healthIssues.find(issue =>
    issue.name.toLowerCase().includes(normalizedQuery) ||
    normalizedQuery.includes(issue.name.toLowerCase().split(' ')[0])
  );
  if (issueMatch) {
    return {
      type: 'symptom',
      query,
      matchedEntity: issueMatch,
      confidence: 0.9,
      suggestions: [],
    };
  }

  // Check for ingredient match
  const ingredientMatch = ingredients.find(ing =>
    ing.name.toLowerCase() === normalizedQuery ||
    normalizedQuery.includes(ing.name.toLowerCase())
  );
  if (ingredientMatch) {
    return {
      type: 'ingredient',
      query,
      matchedEntity: ingredientMatch,
      confidence: 0.95,
      suggestions: [],
    };
  }

  // Check for symptom keywords
  for (const [symptom, keywords] of Object.entries(symptomKeywords)) {
    if (normalizedQuery.includes(symptom) || symptom.includes(normalizedQuery)) {
      return {
        type: 'symptom',
        query,
        matchedEntity: { symptom, keywords },
        confidence: 0.8,
        suggestions: keywords,
      };
    }
  }

  // Check for life stage keywords
  for (const [stage, keywords] of Object.entries(lifeStageKeywords)) {
    if (normalizedQuery.includes(stage)) {
      return {
        type: 'life-stage',
        query,
        matchedEntity: { stage, keywords },
        confidence: 0.85,
        suggestions: keywords,
      };
    }
  }

  // Check if it matches product names
  const productMatch = products.find(p =>
    p.name.toLowerCase().includes(normalizedQuery) ||
    normalizedQuery.includes(p.name.toLowerCase().split(' ')[0])
  );
  if (productMatch) {
    return {
      type: 'product-name',
      query,
      matchedEntity: productMatch,
      confidence: 0.95,
      suggestions: [],
    };
  }

  // Default to general search
  return {
    type: 'general',
    query,
    confidence: 0.5,
    suggestions: ['Sleep & Relaxation', 'Energy', 'Brain Health', 'Joint Health'],
  };
}

// Generate search context based on intent
// Uses hand-written "gold standard" content for top searches, templates for the rest
export function generateSearchContext(intent: SearchIntent): SearchContext {
  switch (intent.type) {
    case 'health-goal':
      if (intent.matchedEntity?.name) {
        const name = intent.matchedEntity.name;
        
        // ============================================================
        // GOLD STANDARD: Hand-written content for top 8 searches
        // These are premium responses that represent our best work
        // ============================================================
        
        if (name.toLowerCase().includes('sleep')) {
          return {
            title: 'Let\'s talk about better sleep',
            description: '',
            conversationalIntro: 'I hear from customers every day about sleep struggles. Here\'s what I\'ve learned actually works:',
            conversationalBody: 'Quality sleep isn\'t just about being tired—it\'s a complex dance between minerals (especially Magnesium, which most of us don\'t get enough of), brain chemicals like GABA and Serotonin that help you feel calm, and your body\'s natural sleep-wake rhythm. \n\nI\'ve formulated products that address these different pieces of the sleep puzzle. Some help you fall asleep faster, others help you stay asleep through the night, and some improve how deeply you sleep so you wake up actually feeling rested. The best part? These work with your body\'s natural processes—no grogginess the next day.',
            quickFilters: [
              { label: '😴 Falling Asleep', value: 'onset' },
              { label: '🌙 Staying Asleep', value: 'maintenance' },
              { label: '⭐ Sleep Quality', value: 'quality' },
              { label: 'All', value: 'all' },
            ],
          };
        }
        
        if (name.toLowerCase().includes('energy')) {
          return {
            title: 'Let\'s figure out your energy',
            description: '',
            conversationalIntro: 'Fatigue is one of the most common concerns I hear about. Let me help you get to the bottom of it.',
            conversationalBody: 'Low energy is your body trying to tell you something. Often it\'s simple nutrient gaps—B vitamins (especially B12) that help turn food into fuel, or iron that carries oxygen to every cell. Sometimes it\'s deeper, like your cellular power plants (mitochondria) needing support.\n\nThe good news? Once we address what\'s actually missing, most of my customers feel the difference within a few weeks. I\'m showing you products based on the most common energy gaps I see. Look for ones that match how your fatigue shows up—is it worst in the morning? Do you crash after lunch? Or is it a constant, all-day exhaustion?',
            quickFilters: [
              { label: '🌅 Morning Energy', value: 'morning' },
              { label: '⚡ All-Day Vitality', value: 'sustained' },
              { label: '🏃 Athletic Performance', value: 'athletic' },
              { label: 'All', value: 'all' },
            ],
          };
        }

        if (name.toLowerCase().includes('joint')) {
          return {
            title: 'Supporting your joints',
            description: '',
            conversationalIntro: 'I know how joint discomfort can really affect quality of life. Here\'s my approach:',
            conversationalBody: 'Your joints are asking for help, and there are two main things they need: building blocks to repair cartilage (like Glucosamine), and support to calm inflammation that causes pain and stiffness.\n\nI like to explain it like this: it\'s like maintaining a house—you need both materials to fix what\'s worn down AND ways to prevent further damage. The products I\'ve formulated tackle both. Some focus on rebuilding (these take 6-8 weeks to really feel), while others help with comfort more quickly by addressing inflammation. In my experience, many people find combining both approaches works best.',
            quickFilters: [
              { label: '🦵 Knees', value: 'knees' },
              { label: '🖐️ Hands', value: 'hands' },
              { label: '🔙 Back', value: 'back' },
              { label: 'All Joints', value: 'all' },
            ],
          };
        }

        if (name.toLowerCase().includes('brain') || name.toLowerCase().includes('cognitive')) {
          return {
            title: 'Let\'s support your brain health',
            description: '',
            conversationalIntro: 'Brain fog, memory slips, trouble focusing? I\'ve formulated products specifically for this.',
            conversationalBody: 'Here\'s something interesting I always share: your brain is about 60% fat, and the type of fat matters hugely. DHA (from Omega-3) literally builds your brain cells and helps them communicate. When you\'re low on it, thinking feels harder.\n\nBeyond that, your brain needs good blood flow (so oxygen and nutrients can get there) and protection from oxidative stress. The products I\'ve developed support these different aspects. Some of my customers notice sharper thinking within weeks, while structural benefits (like memory) build over 2-3 months of consistent use.',
            quickFilters: [
              { label: '🧠 Memory', value: 'memory' },
              { label: '🎯 Focus', value: 'focus' },
              { label: '🌫️ Mental Clarity', value: 'clarity' },
              { label: 'All', value: 'all' },
            ],
          };
        }

        if (name.toLowerCase().includes('digestive') || name.toLowerCase().includes('digestion')) {
          return {
            title: 'Getting your digestion back on track',
            description: '',
            conversationalIntro: 'Digestive issues are frustrating, and I\'ve helped thousands of people address them.',
            conversationalBody: 'Your gut is home to trillions of bacteria that help digest food, make vitamins, and even influence your mood. When that balance gets disrupted (stress, antibiotics, diet changes), you might feel bloated, irregular, or just "off."\n\nGood news: probiotics can help restore that balance. Digestive enzymes help if your body isn\'t breaking down food well (ever feel heavy after meals?). And some nutrients help heal and strengthen the gut lining itself. I\'ve organized these by what they do, so you can pick what matches your specific issue.',
            quickFilters: [
              { label: '🦠 Gut Flora', value: 'probiotic' },
              { label: '⚡ Enzyme Support', value: 'enzyme' },
              { label: '🛡️ Gut Lining', value: 'barrier' },
              { label: 'All', value: 'all' },
            ],
          };
        }

        if (name.toLowerCase().includes('immune')) {
          return {
            title: 'Strengthening your immune system',
            description: '',
            conversationalIntro: 'Staying healthy is on everyone\'s mind. Here\'s what I\'ve learned actually helps.',
            conversationalBody: 'Your immune system is like a security team that needs specific tools to work well. Vitamin C helps immune cells function, Vitamin D3 acts as a master regulator (most people are low in winter!), and Zinc is crucial for immune response—deficiency can make you more vulnerable.\n\nInterestingly, about 70% of your immune system lives in your gut, which is why I include probiotics in my immune formulas too. Below you\'ll find products for daily prevention, seasonal support (hello, cold and flu season), and active support when you feel something coming on. Think of it as different levels of backup for your immune team.',
            quickFilters: [
              { label: '🛡️ Daily Support', value: 'daily' },
              { label: '❄️ Seasonal', value: 'seasonal' },
              { label: '🦠 Active Support', value: 'active' },
              { label: 'All', value: 'all' },
            ],
          };
        }

        if (name.toLowerCase().includes('heart') || name.toLowerCase().includes('cardiovascular')) {
          return {
            title: 'Taking care of your heart',
            description: '',
            conversationalIntro: 'I\'ve always said heart health is about more than just cholesterol. Let\'s look at the full picture.',
            conversationalBody: 'Your cardiovascular system needs several things to thrive: flexible, strong blood vessels; smooth blood flow; healthy cholesterol balance; and a heart muscle that has enough cellular energy to keep beating 100,000 times a day.\n\nOmega-3s from fish oil are gold-standard for heart and circulation support—I use them in many of my formulas. CoQ10 helps your heart muscle produce energy (especially important if you take statins, which deplete it). Magnesium helps with rhythm and blood pressure. The products below target these different aspects—in my experience, many people benefit from a combination approach.',
            quickFilters: [
              { label: '💓 Circulation', value: 'circulation' },
              { label: '📊 Cholesterol', value: 'cholesterol' },
              { label: '🩺 Blood Pressure', value: 'bp' },
              { label: 'All', value: 'all' },
            ],
          };
        }

        if (name.toLowerCase().includes('stress') || name.toLowerCase().includes('mood')) {
          return {
            title: 'Supporting your stress and mood',
            description: '',
            conversationalIntro: 'Feeling stressed or anxious? I\'ve developed products specifically to support you during tough times.',
            conversationalBody: 'Stress and mood are about more than just willpower—they\'re deeply tied to brain chemistry, hormone balance, and nutrient status. When you\'re running on empty (especially with B vitamins, Magnesium, or Omega-3s), your stress response gets stuck in overdrive.\n\nI\'ve formulated these products to support your body\'s stress response in different ways. Adaptogens like Ashwagandha help you adapt to stress more smoothly. Magnesium and L-Theanine promote calm without sedation. B vitamins support neurotransmitter production. Many of my customers find the most relief with a combination approach.',
            quickFilters: [
              { label: '😌 Calm & Relaxation', value: 'calm' },
              { label: '🧘 Stress Adaptation', value: 'adaptation' },
              { label: '💭 Mood Support', value: 'mood' },
              { label: 'All', value: 'all' },
            ],
          };
        }
        
        // ============================================================
        // TEMPLATE-BASED: For all other categories and functions
        // Uses structured data to generate conversational content
        // ============================================================
        
        // Try body function template (e.g., "memory", "circulation", "metabolism")
        const functionContent = generateBodyFunctionContent(name);
        if (functionContent) return functionContent;
        
        // Try category template (e.g., "anti-aging", "beauty", "vision health")
        const categoryContent = generateCategoryContent(name);
        if (categoryContent) return categoryContent;
      }
      
      // Generic fallback for health goals
      return {
        title: `Products for ${intent.query}`,
        description: 'Browse products that support your health goals.',
        quickFilters: [{ label: 'All', value: 'all' }],
      };

    case 'symptom':
      // ============================================================
      // GOLD STANDARD: Hand-written symptom content
      // ============================================================
      
      if (intent.matchedEntity?.symptom) {
        const symptom = intent.matchedEntity.symptom;
        
        if (symptom.includes('tired') || symptom.includes('energy')) {
          return {
            title: 'Why you might be feeling tired all the time',
            description: '',
            conversationalIntro: 'Constant fatigue is exhausting (literally). Let\'s figure out what might be going on.',
            conversationalBody: 'Being tired all the time isn\'t normal, even though it\'s common. Your body is trying to tell you something. Most often, it\'s nutrient-related: iron deficiency (especially common in women who menstruate), B-vitamin gaps (especially B12), or poor sleep quality that means you\'re not actually recharging at night.\n\nSometimes it\'s a combination—like not sleeping well because you\'re low on Magnesium, which then affects your energy during the day. The products below address the most common nutritional causes of fatigue. Pay attention to when your tiredness is worst—mornings? All day? After exercise? That can help point to what you need.',
            quickFilters: [
              { label: '🌅 Morning Fatigue', value: 'morning' },
              { label: '⚡ All-Day Exhaustion', value: 'allday' },
              { label: '🏃 After Exercise', value: 'exercise' },
              { label: 'All', value: 'all' },
            ],
          };
        }

        if (symptom.includes('sleep')) {
          return {
            title: 'Let\'s help you sleep better',
            description: '',
            conversationalIntro: 'Trouble sleeping is frustrating—you\'re tired but can\'t rest. Here\'s what often helps.',
            conversationalBody: 'Sleep problems usually fall into one of three categories: can\'t fall asleep (your brain won\'t shut off), can\'t stay asleep (you wake up at 2am and can\'t get back), or you sleep but don\'t feel rested. Each points to different underlying issues.\n\nOften it\'s Magnesium deficiency (very common and affects muscle relaxation and brain calm), elevated stress hormones, or disrupted circadian rhythm. The products below support different aspects of sleep. Tell us which problem sounds most like yours using the buttons below, or browse everything if you\'re not sure.',
            quickFilters: [
              { label: '😴 Can\'t Fall Asleep', value: 'onset' },
              { label: '🌙 Wake During Night', value: 'maintenance' },
              { label: '⭐ Poor Quality', value: 'quality' },
              { label: 'All', value: 'all' },
            ],
          };
        }

        if (symptom.includes('brain fog')) {
          return {
            title: 'Clearing up that brain fog',
            description: '',
            conversationalIntro: 'Brain fog is that frustrating feeling where your mind just isn\'t sharp. Let\'s clear it up.',
            conversationalBody: 'You know that feeling—like you\'re thinking through molasses, forgetting words, can\'t focus on what someone\'s saying. Brain fog usually points to inflammation, poor blood flow to the brain, or missing nutrients your brain desperately needs (especially B12 and Omega-3 DHA).\n\nThe good news? It\'s usually very responsive to the right support. Most people notice a difference within 2-4 weeks when they address the root cause. The products below help with different aspects: some boost circulation, others provide brain-building fats, some support neurotransmitter balance. Many people find combining approaches works best.',
            quickFilters: [
              { label: '🎯 Focus', value: 'focus' },
              { label: '🧠 Clarity', value: 'clarity' },
              { label: '📝 Memory', value: 'memory' },
              { label: 'All', value: 'all' },
            ],
          };
        }
        
        // Template for other symptoms
        return generateSymptomContent(symptom, intent.suggestions);
      }
      
      // ============================================================
      // TEMPLATE-BASED: Health issue matches
      // ============================================================
      
      if (intent.matchedEntity?.name) {
        // Try health issue template (uses commonCauses + supportiveApproaches)
        const healthIssueContent = generateHealthIssueContent(intent.matchedEntity.name);
        if (healthIssueContent) return healthIssueContent;
        
        // Fallback for health issues without template
        return {
          title: intent.matchedEntity.name,
          description: intent.matchedEntity.commonCauses || 'Find products that support this health concern.',
          quickFilters: intent.matchedEntity.severity?.map((sev: string) => ({
            label: sev,
            value: sev.toLowerCase(),
          })) || [{ label: 'All', value: 'all' }],
          educationalContent: {
            commonCauses: intent.matchedEntity.commonCauses ? [intent.matchedEntity.commonCauses] : undefined,
            approaches: intent.matchedEntity.supportiveApproaches,
          },
        };
      }
      
      return generateSymptomContent(intent.query, intent.suggestions);

    case 'body-part':
      // Use template for all body parts
      const bodyPartContent = generateBodyPartContent(intent.matchedEntity?.name || intent.query);
      if (bodyPartContent) return bodyPartContent;
      
      // Fallback
      const bodyPart = intent.matchedEntity;
      return {
        title: `Supporting your ${bodyPart?.name?.toLowerCase() || intent.query}`,
        description: '',
        conversationalIntro: `Looking for ${bodyPart?.name?.toLowerCase() || intent.query} support? You're in the right place.`,
        conversationalBody: `Your ${bodyPart?.name?.toLowerCase() || intent.query} needs specific nutrients to function at its best. We've gathered products that are specifically formulated to support ${bodyPart?.name?.toLowerCase() || intent.query} health, backed by clinical research.\n\nLook for products with Gold evidence if you want the most well-researched options, or browse everything below to see the full range of support available.`,
        quickFilters: [
          { label: 'All Products', value: 'all' },
          { label: 'Gold Evidence', value: 'gold' },
        ],
      };

    case 'ingredient':
      // Use template for all ingredients
      const ingredientContent = generateIngredientContent(intent.matchedEntity?.name || intent.query);
      if (ingredientContent) return ingredientContent;
      
      // Fallback
      const ingredient = intent.matchedEntity;
      const uses = ingredient?.commonUses ? ingredient.commonUses.join(', ') : '';
      return {
        title: `Products with ${ingredient?.name || intent.query}`,
        description: '',
        conversationalIntro: `You searched for ${ingredient?.name || intent.query}. Smart choice—here's why people use it.`,
        conversationalBody: uses 
          ? `${ingredient?.name || intent.query} is commonly used for ${uses}. You'll find it in different forms and combinations below. Some products feature it as the main ingredient, while others include it as part of a comprehensive formula.\n\nPick based on whether you want ${ingredient?.name || intent.query} on its own, or combined with complementary nutrients for enhanced benefits.`
          : `${ingredient?.name || intent.query} appears in several of our formulations. Browse the products below to find the right form and combination for your needs.`,
        quickFilters: [{ label: 'All Forms', value: 'all' }],
      };

    case 'life-stage':
      // Use template for life stages
      const stage = intent.matchedEntity?.stage || intent.query;
      const lifeStageContent = generateLifeStageContent(stage, intent.suggestions);
      if (lifeStageContent) return lifeStageContent;
      
      // Fallback already in template, but just in case
      return {
        title: `Nutritional support for ${stage}`,
        description: '',
        conversationalIntro: `Your nutritional needs change based on life stage. Here's what matters for ${stage}.`,
        conversationalBody: `Different life stages come with different nutritional demands. Whether you need comprehensive daily coverage or want to address specific gaps, we've selected products that match the unique needs of ${stage}.\n\nYou can choose complete formulas that cover all your bases, or targeted products that fill specific nutritional gaps common during this stage of life.`,
        quickFilters: [
          { label: 'Complete Coverage', value: 'complete' },
          { label: 'Specific Gaps', value: 'gaps' },
          { label: 'All', value: 'all' },
        ],
      };

    default:
      // Use fallback template
      return generateFallbackContent(intent.query);
  }
}

// Match products to search query
export function matchProducts(query: string): Product[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  return products.filter(product => {
    // Check name
    if (product.name.toLowerCase().includes(normalizedQuery)) return true;
    
    // Check description
    if (product.description.toLowerCase().includes(normalizedQuery)) return true;
    
    // Check categories
    if (product.primaryCategory.toLowerCase().includes(normalizedQuery)) return true;
    if (product.secondaryCategories?.some(cat => cat.toLowerCase().includes(normalizedQuery))) return true;
    
    // Check body parts
    if (product.bodyParts.some(part => part.toLowerCase().includes(normalizedQuery))) return true;
    
    // Check functions
    if (product.functions.some(func => func.name.toLowerCase().includes(normalizedQuery))) return true;
    
    // Check health issues
    if (product.healthIssues.some(issue => issue.toLowerCase().includes(normalizedQuery))) return true;
    
    // Check key ingredients
    if (product.keyIngredients.some(ing => ing.toLowerCase().includes(normalizedQuery))) return true;
    
    // Check search keywords
    if (product.searchKeywords.some(kw => kw.includes(normalizedQuery) || normalizedQuery.includes(kw))) return true;
    
    // Check popular searches
    if (product.popularFor.some(pop => pop.includes(normalizedQuery) || normalizedQuery.includes(pop))) return true;
    
    return false;
  });
}

// Generate "why this matches" text for a product (conversational style)
export function generateMatchReason(product: Product, query: string, intent: SearchIntent): string {
  const normalizedQuery = query.toLowerCase();
  
  // Check functions first
  for (const func of product.functions) {
    if (func.name.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(func.name.toLowerCase().split(' ')[0])) {
      const evidenceText = func.evidence === 'gold' ? '🥇 Strong clinical evidence' : func.evidence === 'silver' ? '🥈 Good evidence' : '🥉 Emerging research';
      return `This helps with ${func.name.toLowerCase()} — ${evidenceText} supports this use.`;
    }
  }
  
  // Check key ingredients
  for (const ing of product.keyIngredients) {
    if (ing.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(ing.toLowerCase())) {
      return `Contains ${ing}, which is exactly what you searched for.`;
    }
  }
  
  // Check health issues
  for (const issue of product.healthIssues) {
    if (issue.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(issue.toLowerCase().split(' ')[0])) {
      return `Specifically formulated to help with ${issue.toLowerCase()}.`;
    }
  }
  
  // Check body parts
  for (const part of product.bodyParts) {
    if (part.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(part.toLowerCase())) {
      return `Supports your ${part.toLowerCase()} health and function.`;
    }
  }
  
  // Check category
  if (product.primaryCategory.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(product.primaryCategory.toLowerCase().split(' ')[0])) {
    return `One of our top ${product.primaryCategory} products.`;
  }
  
  // Check popular searches
  for (const pop of product.popularFor) {
    if (pop.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(pop.toLowerCase())) {
      return `Popular choice for people searching "${pop}".`;
    }
  }
  
  return 'We think this could help based on your search.';
}
