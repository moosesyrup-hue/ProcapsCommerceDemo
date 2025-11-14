// Template-based conversational content generation
// Uses structured data from /data/ files to create warm, educational search responses
// Now with Andrew Lessman's personal founder voice

import { bodyFunctions } from '../data/bodyFunctions';
import { bodyParts, bodyPartsBySystem } from '../data/bodyParts';
import { healthIssues } from '../data/healthIssues';
import { ingredients } from '../data/ingredients';
import { categories } from '../data/categories';
import { founderVoice, founderIntros, founderPhilosophy, getRandomPhrase } from '../data/founderVoice';

export interface ConversationalContent {
  title: string;
  description: string;
  conversationalIntro?: string;
  conversationalBody?: string;
  quickFilters?: {
    label: string;
    value: string;
  }[];
  founderMessage?: boolean; // Indicates this includes founder's voice
}

// ============================================================================
// CORE TEMPLATE PATTERNS (extracted from hand-written examples)
// Now enhanced with Andrew Lessman's personal founder voice
// ============================================================================

const empathyPhrases = {
  sleep: "I hear from customers every day about sleep struggles.",
  energy: "Fatigue is one of the most common concerns I hear about.",
  joints: "I know how joint discomfort can really affect quality of life.",
  brain: "Brain fog and memory concerns—I get questions about this constantly.",
  digestive: "Digestive issues are frustrating, and I've helped thousands of people address them.",
  immune: "Staying healthy is on everyone's mind, and I've spent years formulating immune support.",
  heart: "Heart health is about more than just cholesterol—I've learned this through decades of research.",
  stress: "Stress management is so important. I've developed products specifically to support this.",
  general: "I hear you. Let me help you find what works.",
};

const goodNewsIntros = [
  "The good news is",
  "Here's what's encouraging:",
  "What gives me confidence:",
  "Here's what I've seen work time and again:",
  "The positive side is",
];

const timelineFrames = {
  fast: "Most of my customers notice improvement within 1-2 weeks",
  moderate: "In my experience, people typically feel the difference within 2-4 weeks",
  slow: "I usually tell people to expect benefits building over 6-8 weeks—these work with your body's natural processes",
  ongoing: "Give it time—with consistent use over 2-3 months, you'll see the best results",
};

// ============================================================================
// HEALTH ISSUE TEMPLATES
// ============================================================================

export function generateHealthIssueContent(issueName: string): ConversationalContent | null {
  const issue = healthIssues.find(i => i.name.toLowerCase().includes(issueName.toLowerCase()));
  
  if (!issue) return null;

  const severityFilters = issue.severity.map(sev => ({
    label: sev,
    value: sev.toLowerCase().replace(/\s+/g, '-'),
  }));
  severityFilters.push({ label: 'All', value: 'all' });

  return {
    title: `Let's talk about ${issue.name.toLowerCase()}`,
    description: '',
    conversationalIntro: `I hear about ${issue.name.toLowerCase()} from customers all the time. You're in the right place.`,
    conversationalBody: `In my experience, this is often caused by ${issue.commonCauses?.toLowerCase() || 'a variety of factors'}. My approach has always been to address what's actually happening in your body, not just mask symptoms.\n\nWhat I've found works best includes ${issue.supportiveApproaches?.join(', ').toLowerCase() || 'targeted nutritional support'}. I've organized these products by these different approaches—you can choose based on what resonates most with your situation, or browse everything to see the full picture.`,
    quickFilters: severityFilters,
    founderMessage: true,
  };
}

// ============================================================================
// BODY FUNCTION TEMPLATES
// ============================================================================

export function generateBodyFunctionContent(functionName: string): ConversationalContent | null {
  const func = bodyFunctions.find(f => 
    f.name.toLowerCase().includes(functionName.toLowerCase()) ||
    functionName.toLowerCase().includes(f.name.toLowerCase().split(' ')[0])
  );
  
  if (!func) return null;

  const evidenceText = func.evidence === 'gold' 
    ? 'Gold-standard research backs this, and I\'ve seen it work for thousands of customers' 
    : func.evidence === 'silver'
    ? 'The research is solid, and I trust these approaches'
    : 'Emerging science shows promise here';

  return {
    title: `Supporting your ${func.name.toLowerCase()}`,
    description: '',
    conversationalIntro: `${func.name} is all about ${func.description.toLowerCase()}. Let me help you optimize it.`,
    conversationalBody: `I've formulated products specifically to support ${func.name.toLowerCase()}. ${evidenceText}.\n\nThe products below target different aspects of ${func.name.toLowerCase()}. Some work quickly to address immediate needs, while others build foundational support over time. In my experience, many people find combining approaches works best for comprehensive support.`,
    quickFilters: [
      { label: 'All Products', value: 'all' },
      { label: `${func.evidence === 'gold' ? '🥇' : '🥈'} Top Evidence`, value: 'top' },
    ],
    founderMessage: true,
  };
}

// ============================================================================
// BODY PART TEMPLATES
// ============================================================================

export function generateBodyPartContent(bodyPartName: string): ConversationalContent | null {
  const part = bodyParts.find(p => 
    p.name.toLowerCase() === bodyPartName.toLowerCase() ||
    bodyPartName.toLowerCase().includes(p.name.toLowerCase())
  );
  
  if (!part) return null;

  const system = part.system;
  const relatedParts = bodyParts
    .filter(p => p.system === system && p.name !== part.name)
    .slice(0, 3)
    .map(p => p.name.toLowerCase());

  const systemContext = relatedParts.length > 0
    ? `Your ${part.name.toLowerCase()} is part of your ${system.toLowerCase()} system, which also includes your ${relatedParts.join(', ')}. I've found that supporting one often helps the others.`
    : `Your ${part.name.toLowerCase()} is an essential part of your ${system.toLowerCase()} system.`;

  return {
    title: `Supporting your ${part.name.toLowerCase()}`,
    description: '',
    conversationalIntro: `Looking for ${part.name.toLowerCase()} support? I can help.`,
    conversationalBody: `${systemContext}\n\nI've formulated these products specifically to support ${part.name.toLowerCase()} health and function. Look for ones with clinical evidence indicators if you want the most well-researched options, or browse everything to see the full range of support I offer.`,
    quickFilters: [
      { label: 'All Support', value: 'all' },
      { label: 'Daily Maintenance', value: 'daily' },
      { label: 'Active Support', value: 'active' },
    ],
    founderMessage: true,
  };
}

// ============================================================================
// INGREDIENT TEMPLATES
// ============================================================================

export function generateIngredientContent(ingredientName: string): ConversationalContent | null {
  const ingredient = ingredients.find(ing => 
    ing.name.toLowerCase() === ingredientName.toLowerCase() ||
    ingredientName.toLowerCase().includes(ing.name.toLowerCase())
  );
  
  if (!ingredient) return null;

  const uses = ingredient.commonUses || [];
  const evidenceText = ingredient.evidence === 'gold' 
    ? 'backed by strong clinical evidence that I trust' 
    : ingredient.evidence === 'silver'
    ? 'supported by good research'
    : 'showing promising emerging research';

  const usesText = uses.length > 0
    ? `I use ${ingredient.name} in many of my formulations for ${uses.slice(0, 3).join(', ').toLowerCase()}${uses.length > 3 ? ', and more' : ''}`
    : `${ingredient.name} is a valuable nutritional ingredient I work with`;

  return {
    title: `Products with ${ingredient.name}`,
    description: '',
    conversationalIntro: `You searched for ${ingredient.name}. Smart choice—let me explain why I use it.`,
    conversationalBody: `${usesText}, ${evidenceText}. You'll find it in different forms and combinations below.\n\nSome products feature ${ingredient.name} as the main ingredient for targeted support, while others include it as part of a comprehensive formula I've designed with complementary nutrients for enhanced benefits. Pick based on whether you want focused ${ingredient.name} support or a broader approach.`,
    quickFilters: [
      { label: 'All Forms', value: 'all' },
      { label: 'Single Ingredient', value: 'single' },
      { label: 'Complex Formula', value: 'complex' },
    ],
    founderMessage: true,
  };
}

// ============================================================================
// CATEGORY TEMPLATES
// ============================================================================

export function generateCategoryContent(categoryName: string): ConversationalContent | null {
  const category = categories.find(cat => 
    cat.name.toLowerCase() === categoryName.toLowerCase() ||
    categoryName.toLowerCase().includes(cat.name.toLowerCase().split(' ')[0])
  );
  
  if (!category) return null;

  // Map category names to conversational content
  const categoryTemplates: Record<string, Partial<ConversationalContent>> = {
    'anti-aging': {
      conversationalIntro: `${founderPhilosophy.antiAging}`,
      conversationalBody: "In my formulations, anti-aging means protecting your cells from oxidative stress, supporting collagen production, maintaining brain health, and keeping your cardiovascular system strong. I've organized these products by these different aspects of healthy aging.\n\nSome focus on cellular protection (antioxidants), others on structural support (collagen, bone health), and some on maintaining mental sharpness. In my experience, most people benefit from a combination approach as they age.",
    },
    'beauty': {
      conversationalIntro: `${founderPhilosophy.beauty}`,
      conversationalBody: "I've formulated these products to provide the building blocks your body needs—especially collagen, biotin, and antioxidants that protect from environmental damage.\n\nIn my experience, results typically show up after 6-12 weeks of consistent use, as your body replaces old cells with new, better-nourished ones. Patience and consistency are key here.",
    },
    'bone & skeletal health': {
      conversationalIntro: "Strong bones are your foundation—literally. I've spent years perfecting formulas to keep them that way.",
      conversationalBody: "I've learned that bone health requires more than just calcium. You also need Vitamin D3 to absorb it, Vitamin K2 to direct it to your bones (not your arteries), and Magnesium for bone structure. It's a team effort, and I've designed these formulas to work together.\n\nThe products below provide comprehensive bone support. Some are for prevention and daily maintenance, others for more active support if you're dealing with bone density concerns. Think of it as investing in your skeleton for the long term.",
    },
    'weight management': {
      conversationalIntro: "I've always said healthy weight management is about metabolism, not just calories.",
      conversationalBody: "Your metabolism depends on thyroid function, blood sugar balance, cellular energy production, and gut health. When these are optimized, your body can naturally find its healthy weight.\n\nI've formulated these products to support different aspects: some help with metabolism and energy, others with blood sugar balance or healthy digestion. Let me be honest with you—they work best as part of an overall healthy lifestyle, not as magic bullets.",
    },
    'vision health': {
      conversationalIntro: "Your eyes work hard every day. I've developed specific formulas to support them.",
      conversationalBody: "Vision health depends on specific nutrients—Lutein and Zeaxanthin protect your macula from blue light and oxidative stress, while Omega-3 DHA supports the structural integrity of your retina. These nutrients aren't in most diets, which is why I formulated them.\n\nMost of my customers notice less eye fatigue within weeks, while long-term protection builds over months of consistent use. Think of it as sunscreen for your eyes, but from the inside.",
    },
  };

  const template = categoryTemplates[category.name.toLowerCase()] || {
    conversationalIntro: `Looking for ${category.name.toLowerCase()} products? Let me show you what I've formulated.`,
    conversationalBody: `I've curated our best ${category.name.toLowerCase()} products to give you options for different needs and preferences. Browse below to find what resonates with your health goals.`,
  };

  return {
    title: category.name,
    description: '',
    conversationalIntro: template.conversationalIntro,
    conversationalBody: template.conversationalBody,
    quickFilters: [
      { label: 'All Products', value: 'all' },
      { label: 'Best Sellers', value: 'popular' },
      { label: 'New', value: 'new' },
    ],
    founderMessage: true,
  };
}

// ============================================================================
// SYMPTOM/KEYWORD TEMPLATES
// ============================================================================

export function generateSymptomContent(symptom: string, relatedKeywords: string[]): ConversationalContent {
  const symptomTemplates: Record<string, ConversationalContent> = {
    'tired': {
      title: 'Why you might be feeling tired all the time',
      description: '',
      conversationalIntro: 'Constant fatigue is exhausting (literally). Let\'s figure out what might be going on.',
      conversationalBody: 'Being tired all the time isn\'t normal, even though it\'s common. Your body is trying to tell you something. Most often, it\'s nutrient-related: iron deficiency (especially common in women who menstruate), B-vitamin gaps (especially B12), or poor sleep quality that means you\'re not actually recharging at night.\n\nSometimes it\'s a combination—like not sleeping well because you\'re low on Magnesium, which then affects your energy during the day. The products below address the most common nutritional causes of fatigue.',
      quickFilters: [
        { label: '🌅 Morning Fatigue', value: 'morning' },
        { label: '⚡ All-Day Exhaustion', value: 'allday' },
        { label: 'All', value: 'all' },
      ],
    },
    'inflammation': {
      title: 'Natural approaches to inflammation support',
      description: '',
      conversationalIntro: 'Inflammation is your body\'s defense mechanism, but chronic inflammation needs support.',
      conversationalBody: 'Acute inflammation (like when you twist your ankle) is helpful—it\'s your body healing. But chronic, low-grade inflammation from stress, poor diet, or ongoing issues can affect joints, heart health, and overall wellness.\n\nThe products below provide anti-inflammatory support through different mechanisms: some use herbal compounds like Curcumin (from Turmeric), others use Omega-3 fatty acids, and some provide antioxidants that calm oxidative stress. Many people find combining approaches works best.',
      quickFilters: [
        { label: '🦵 Joint Support', value: 'joint' },
        { label: '❤️ Systemic Support', value: 'systemic' },
        { label: 'All', value: 'all' },
      ],
    },
    'memory': {
      title: 'Supporting your memory and recall',
      description: '',
      conversationalIntro: 'Memory issues can be unsettling. Let\'s support your brain health.',
      conversationalBody: 'Memory depends on several factors: adequate blood flow to your brain, sufficient Omega-3 DHA (which literally builds brain cell membranes), antioxidant protection from oxidative stress, and neurotransmitter balance.\n\nThe products below target these different aspects. Some people notice sharper recall within weeks, while structural brain benefits build over 2-3 months of consistent use. Think of it as gym membership for your brain—consistency matters.',
      quickFilters: [
        { label: '🧠 Memory Support', value: 'memory' },
        { label: '🎯 Focus & Clarity', value: 'focus' },
        { label: 'All', value: 'all' },
      ],
    },
  };

  // Try to find a matching template
  for (const [key, template] of Object.entries(symptomTemplates)) {
    if (symptom.includes(key) || relatedKeywords.some(kw => kw.includes(key))) {
      return template;
    }
  }

  // Generic symptom template
  return {
    title: `Help with "${symptom}"`,
    description: '',
    conversationalIntro: 'We hear you. Let\'s find products that can help.',
    conversationalBody: `Based on your search, we've gathered products that address ${symptom.toLowerCase()} through nutritional support. These work with your body's natural processes to help you feel better.\n\nLook for products with clinical evidence indicators if you want the most well-researched options, or browse everything below to see the full range of support available.`,
    quickFilters: [
      { label: 'All Products', value: 'all' },
      { label: 'Top Rated', value: 'rated' },
    ],
  };
}

// ============================================================================
// LIFE STAGE TEMPLATES
// ============================================================================

export function generateLifeStageContent(stage: string, relatedKeywords: string[]): ConversationalContent {
  const stageTemplates: Record<string, ConversationalContent> = {
    'menopause': {
      title: 'Nutritional support for menopause',
      description: '',
      conversationalIntro: 'Menopause is a major transition. The right nutritional support can make a real difference.',
      conversationalBody: 'During menopause, your body needs extra support for hormonal balance, bone health (as estrogen decline affects bone density), mood stability, and temperature regulation. It\'s a lot happening at once.\n\nThe products below address these different aspects. Some focus on hormonal balance and hot flash relief (like Black Cohosh or Soy Isoflavones), others on bone protection (Calcium + D3 + K2), and some on mood and sleep support. Many women find a combination approach most helpful.',
      quickFilters: [
        { label: '🌸 Hormone Balance', value: 'hormones' },
        { label: '🦴 Bone Health', value: 'bones' },
        { label: '😌 Mood & Sleep', value: 'mood' },
        { label: 'All', value: 'all' },
      ],
    },
    'pregnancy': {
      title: 'Prenatal nutritional support',
      description: '',
      conversationalIntro: 'Growing a baby requires specific nutrients. Let\'s make sure you have what you need.',
      conversationalBody: 'Pregnancy dramatically increases your need for Folate (for neural tube development), Iron (for blood volume expansion), Calcium (for baby\'s bones), DHA (for brain development), and many other nutrients.\n\nThe products below provide comprehensive prenatal nutrition. Some are complete prenatal multivitamins, while others are targeted supplements for specific needs. Always check with your healthcare provider about what\'s right for your pregnancy.',
      quickFilters: [
        { label: '🤰 Complete Prenatal', value: 'complete' },
        { label: '🎯 Targeted Support', value: 'targeted' },
        { label: 'All', value: 'all' },
      ],
    },
    'vegan': {
      title: 'Essential nutrients for plant-based diets',
      description: '',
      conversationalIntro: 'Plant-based eating is wonderful, but some nutrients need extra attention.',
      conversationalBody: 'Vegan diets can be nutritionally complete, but certain nutrients are harder to get from plants alone: B12 (only in animal products or fortified foods), Iron (plant iron is less absorbable), Omega-3 EPA/DHA (ALA from flax doesn\'t convert well), and sometimes Zinc and Iodine.\n\nThe products below fill these common gaps with vegan-friendly sources. Consider these non-negotiables for long-term health on a plant-based diet.',
      quickFilters: [
        { label: '💊 B12', value: 'b12' },
        { label: '🐟 Omega-3 (Algae)', value: 'omega3' },
        { label: '⚡ Iron', value: 'iron' },
        { label: 'All', value: 'all' },
      ],
    },
  };

  const normalizedStage = stage.toLowerCase();
  for (const [key, template] of Object.entries(stageTemplates)) {
    if (normalizedStage.includes(key)) {
      return template;
    }
  }

  // Generic life stage template
  return {
    title: `Nutritional support for ${stage}`,
    description: '',
    conversationalIntro: `Different life stages come with different nutritional needs. Here's what matters for ${stage}.`,
    conversationalBody: `Your nutritional needs change based on life stage. Whether you need comprehensive daily coverage or want to address specific gaps, we've selected products that match the unique demands of ${stage}.\n\nYou can choose complete formulas that cover all your bases, or targeted products that fill specific nutritional gaps common during this stage of life.`,
    quickFilters: [
      { label: 'Complete Coverage', value: 'complete' },
      { label: 'Specific Gaps', value: 'gaps' },
      { label: 'All', value: 'all' },
    ],
  };
}

// ============================================================================
// GENERIC FALLBACK TEMPLATE
// ============================================================================

export function generateFallbackContent(query: string): ConversationalContent {
  return {
    title: `Search results for "${query}"`,
    description: '',
    conversationalIntro: 'We found products that might help based on your search.',
    conversationalBody: `While we didn't find an exact match for "${query}", the products below are related and may support what you're looking for. Browse by category or use the filters to narrow down your options.\n\nIf you're not finding what you need, try searching by health goal (like "better sleep"), body part (like "brain health"), or specific ingredient (like "magnesium"). We're here to help you find the right support.`,
    quickFilters: [
      { label: 'All Results', value: 'all' },
      { label: 'Most Relevant', value: 'relevant' },
    ],
  };
}
