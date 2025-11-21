// Recommendation engine that matches conversation tags to products

import { products, Product } from '../data/products';
import { questions } from '../data/supplement-questions';
import { conversationalQuestions } from '../data/conversational-questions';

interface UserProfile {
  tags: string[];
}

export interface ProductRecommendation {
  product: Product;
  score: number;
  reasoning: string;
  priority: 'primary' | 'secondary' | 'optional';
}

// Mapping of conversation tags to product matching criteria
const tagToProductMapping: Record<string, {
  healthIssues?: string[];
  categories?: string[];
  functions?: string[];
  keywords?: string[];
}> = {
  // PRIMARY GOAL MAPPINGS
  'cardiovascular': {
    healthIssues: ['Cardiovascular Health'],
    categories: ['Heart Health'],
    functions: ['Cardiovascular Health'],
    keywords: ['heart', 'coq10', 'omega 3', 'cardiovascular'],
  },
  'heart': {
    healthIssues: ['Cardiovascular Health'],
    categories: ['Heart Health'],
    keywords: ['heart', 'coq10', 'cardiovascular'],
  },
  'circulation': {
    healthIssues: ['Cardiovascular Health'],
    keywords: ['circulation', 'heart', 'blood flow'],
  },
  'energy': {
    healthIssues: ['Fatigue'],
    functions: ['Energy Production'],
    categories: ['Energy'],
    keywords: ['energy', 'b vitamins', 'b12', 'iron'],
  },
  'vitality': {
    functions: ['Energy Production', 'Vitality'],
    keywords: ['energy', 'vitality', 'b vitamins'],
  },
  'fatigue': {
    healthIssues: ['Fatigue'],
    functions: ['Energy Production'],
    keywords: ['energy', 'fatigue', 'b vitamins', 'iron'],
  },
  'brain': {
    healthIssues: ['Memory & Brain Health'],
    categories: ['Brain Health'],
    functions: ['Cognitive Function', 'Memory'],
    keywords: ['brain', 'cognitive', 'omega 3', 'dha'],
  },
  'cognitive': {
    healthIssues: ['Memory & Brain Health'],
    functions: ['Cognitive Function', 'Memory'],
    keywords: ['cognitive', 'brain', 'focus', 'memory'],
  },
  'focus': {
    functions: ['Cognitive Function'],
    keywords: ['focus', 'concentration', 'brain'],
  },
  'memory': {
    healthIssues: ['Memory & Brain Health'],
    functions: ['Memory'],
    keywords: ['memory', 'brain', 'cognitive'],
  },
  'immune': {
    healthIssues: ['Immune Health'],
    categories: ['Immune Health'],
    functions: ['Immune Defense'],
    keywords: ['immune', 'vitamin c', 'vitamin d', 'zinc'],
  },
  'defense': {
    healthIssues: ['Immune Health'],
    functions: ['Immune Defense'],
    keywords: ['immune', 'defense'],
  },
  'wellness': {
    categories: ['Immune Health', 'Individual Vitamins & Minerals'],
    keywords: ['wellness', 'health', 'vitamin d', 'omega 3'],
  },
  'joint': {
    healthIssues: ['Joint Pain & Stiffness'],
    categories: ['Joint Health'],
    functions: ['Movement'],
    keywords: ['joint', 'glucosamine', 'turmeric', 'mobility'],
  },
  'mobility': {
    healthIssues: ['Joint Pain & Stiffness'],
    functions: ['Movement'],
    keywords: ['mobility', 'joint', 'flexibility'],
  },
  'flexibility': {
    functions: ['Movement'],
    keywords: ['flexibility', 'joint', 'mobility'],
  },
  'beauty': {
    categories: ['Beauty & Skin'],
    keywords: ['beauty', 'skin', 'collagen', 'hair'],
  },
  'skin': {
    categories: ['Beauty & Skin'],
    keywords: ['skin', 'beauty', 'collagen'],
  },
  'hair': {
    categories: ['Beauty & Skin'],
    keywords: ['hair', 'beauty', 'biotin'],
  },
  'nails': {
    categories: ['Beauty & Skin'],
    keywords: ['nails', 'beauty', 'biotin'],
  },
  'digestive': {
    healthIssues: ['Digestive Health'],
    categories: ['Digestive Health'],
    functions: ['Digestion'],
    keywords: ['digestive', 'probiotic', 'enzyme', 'gut'],
  },
  'gut': {
    healthIssues: ['Digestive Health'],
    functions: ['Digestion'],
    keywords: ['gut', 'digestive', 'probiotic'],
  },
  'stomach': {
    healthIssues: ['Digestive Health'],
    keywords: ['stomach', 'digestive', 'digestion'],
  },
  'aging': {
    categories: ['Healthy Aging'],
    keywords: ['aging', 'longevity', 'antioxidant'],
  },
  'longevity': {
    categories: ['Healthy Aging'],
    keywords: ['longevity', 'aging', 'antioxidant'],
  },
  
  // SPECIFIC CONCERNS MAPPINGS
  'sleep': {
    healthIssues: ['Sleep Disorders'],
    categories: ['Sleep & Relaxation'],
    functions: ['Sleep'],
    keywords: ['sleep', 'melatonin', 'magnesium'],
  },
  'rest': {
    healthIssues: ['Sleep Disorders'],
    keywords: ['sleep', 'rest'],
  },
  'insomnia': {
    healthIssues: ['Sleep Disorders'],
    keywords: ['sleep', 'insomnia', 'melatonin'],
  },
  'stress': {
    healthIssues: ['Anxiety & Stress'],
    categories: ['Stress & Mood'],
    keywords: ['stress', 'ashwagandha', 'magnesium', 'theanine'],
  },
  'anxiety': {
    healthIssues: ['Anxiety & Stress'],
    categories: ['Stress & Mood'],
    keywords: ['anxiety', 'stress', 'calm'],
  },
  'calm': {
    categories: ['Stress & Mood'],
    keywords: ['calm', 'stress', 'relaxation'],
  },
  'inflammation': {
    healthIssues: ['Joint Pain & Stiffness'],
    keywords: ['inflammation', 'turmeric', 'curcumin'],
  },
  'discomfort': {
    healthIssues: ['Joint Pain & Stiffness'],
    keywords: ['discomfort', 'comfort', 'pain'],
  },
  'blood-sugar': {
    healthIssues: ['Blood Sugar'],
    keywords: ['blood sugar', 'glucose', 'metabolic'],
  },
  'glucose': {
    healthIssues: ['Blood Sugar'],
    keywords: ['glucose', 'blood sugar'],
  },
  'metabolic': {
    functions: ['Metabolism'],
    keywords: ['metabolic', 'metabolism'],
  },
  'weight': {
    categories: ['Weight Management'],
    keywords: ['weight', 'metabolism'],
  },
  'metabolism': {
    functions: ['Metabolism'],
    categories: ['Weight Management'],
    keywords: ['metabolism', 'weight'],
  },
  'eyes': {
    healthIssues: ['Eye Health'],
    categories: ['Eye Health'],
    keywords: ['eye', 'vision', 'lutein'],
  },
  'vision': {
    healthIssues: ['Eye Health'],
    keywords: ['vision', 'eye', 'sight'],
  },
  'bone': {
    healthIssues: ['Bone Health'],
    categories: ['Bone Health'],
    keywords: ['bone', 'calcium', 'vitamin d', 'density'],
  },
  'density': {
    healthIssues: ['Bone Health'],
    keywords: ['density', 'bone', 'calcium'],
  },
  'calcium': {
    healthIssues: ['Bone Health'],
    keywords: ['calcium', 'bone', 'vitamin d'],
  },
  'hormones': {
    categories: ['Hormone Balance'],
    keywords: ['hormone', 'balance'],
  },
  'balance': {
    keywords: ['balance'],
  },
  
  // LIFESTYLE MAPPINGS
  'active': {
    keywords: ['energy', 'recovery', 'protein', 'electrolyte'],
  },
  'exercise': {
    keywords: ['energy', 'recovery', 'muscle'],
  },
  'athletic': {
    keywords: ['energy', 'recovery', 'performance'],
  },
  'moderate': {
    keywords: ['energy', 'wellness'],
  },
  'sedentary': {
    keywords: ['energy', 'vitamin d', 'movement'],
  },
  'desk': {
    keywords: ['vitamin d', 'energy', 'posture'],
  },
  'vegetarian': {
    keywords: ['b12', 'iron', 'protein', 'vitamin d'],
  },
  'vegan': {
    keywords: ['b12', 'iron', 'protein', 'vitamin d', 'omega 3'],
  },
  'plant-based': {
    keywords: ['b12', 'iron', 'protein'],
  },
  'busy': {
    keywords: ['stress', 'energy', 'b vitamins'],
  },
  'vitamin-d': {
    keywords: ['vitamin d', 'd3'],
  },
  'indoor': {
    keywords: ['vitamin d', 'd3'],
  },
  
  // DEMOGRAPHICS MAPPINGS
  'female': {
    keywords: ['women', 'iron', 'calcium'],
  },
  'male': {
    keywords: ['men', 'prostate'],
  },
  'young-adult': {
    keywords: ['energy', 'wellness'],
  },
  'middle-age': {
    keywords: ['heart', 'joint', 'energy'],
  },
  'senior': {
    keywords: ['joint', 'heart', 'bone', 'cognitive'],
  },
};

// Reasoning templates for why products are recommended
const reasoningTemplates: Record<string, string> = {
  'Energy B-Complex': "This is my comprehensive B-vitamin formula. The B vitamins are essential for converting food into energy at the cellular level. Take this with breakfast for all-day energy support.",
  'Gentle Iron Plus': "Iron carries oxygen to every cell in your body. Low iron is one of the most common causes of fatigue. This gentle formula won't upset your stomach and includes Vitamin C for optimal absorption.",
  'Sleep Support Formula': "I've combined Magnesium Glycinate with L-Theanine and Glycine - three ingredients that work synergistically to calm your mind and help you fall asleep naturally. Take 30-60 minutes before bed.",
  'Complete Sleep Stack': "For those who need more comprehensive sleep support, this formula addresses multiple sleep pathways. It includes everything in the basic formula plus additional compounds I've found effective for staying asleep through the night.",
  'Melatonin Plus': "Melatonin is your body's natural sleep signal. As we age, production decreases. This time-release formula helps you fall asleep and stay asleep without grogginess.",
  'Advanced Joint Support': "This is my complete joint formula with Glucosamine, Chondroitin, and MSM - the three most research-backed ingredients for joint health. These compounds provide the building blocks your joints need to repair and maintain healthy cartilage.",
  'Turmeric Curcumin Complex': "Turmeric is one of nature's most powerful anti-inflammatory compounds. I've combined it with BioPerine (black pepper extract) because studies show it increases curcumin absorption by up to 2000%.",
  'Brain Focus Formula': "Your brain needs specific nutrients to function optimally. This formula combines Omega-3 DHA (which makes up a large portion of brain structure) with Bacopa and Ginkgo - herbs with centuries of traditional use and modern research backing.",
  'Omega-3 Brain & Heart': "High-potency EPA and DHA fish oil for both cognitive and cardiovascular health. These essential fatty acids reduce inflammation, support brain function, and promote heart health.",
  'Daily Probiotic 50 Billion': "Your gut health affects everything - digestion, immunity, even mood. This formula contains 10 different probiotic strains and 50 billion CFU per capsule for comprehensive digestive and immune support.",
  'Digestive Enzyme Complex': "As we age, our body produces fewer digestive enzymes. This full-spectrum formula helps you break down proteins, fats, and carbohydrates so you can absorb nutrients and reduce bloating.",
  'Immune Defense Complex': "This combines the four most important immune nutrients: Vitamin C, D3, Zinc, and Elderberry. I formulated this to provide comprehensive immune support year-round.",
  'Ashwagandha Stress Relief': "Ashwagandha is an adaptogenic herb that helps your body manage stress more effectively. It supports healthy cortisol levels and promotes calm energy without drowsiness.",
  'Heart Support Formula': "CoQ10, Omega-3, and Magnesium work together to support cardiovascular health. CoQ10 is especially important - your heart muscle has the highest concentration of CoQ10 in your body, but production decreases with age.",
};

function getProductReasoning(product: Product, userProfile: UserProfile): string {
  // Check for specific reasoning template
  if (reasoningTemplates[product.name]) {
    return reasoningTemplates[product.name];
  }
  
  // Generate generic reasoning
  const functions = product.functions.map(f => f.name).join(', ');
  return `This formula supports ${functions.toLowerCase()} with key ingredients including ${product.keyIngredients.slice(0, 3).join(', ')}.`;
}

function calculateProductScore(product: Product, userProfile: UserProfile): number {
  let score = 0;
  const { tags } = userProfile;
  
  // Check each tag against product
  tags.forEach(tag => {
    const mapping = tagToProductMapping[tag];
    if (!mapping) return;
    
    // Health issues match (highest weight)
    if (mapping.healthIssues) {
      mapping.healthIssues.forEach(issue => {
        if (product.healthIssues.includes(issue)) {
          score += 10;
        }
      });
    }
    
    // Category match
    if (mapping.categories) {
      mapping.categories.forEach(category => {
        if (product.primaryCategory === category || product.secondaryCategories?.includes(category)) {
          score += 7;
        }
      });
    }
    
    // Function match
    if (mapping.functions) {
      mapping.functions.forEach(func => {
        if (product.functions.some(f => f.name === func)) {
          score += 8;
        }
      });
    }
    
    // Keyword match
    if (mapping.keywords) {
      mapping.keywords.forEach(keyword => {
        const lowerKeyword = keyword.toLowerCase();
        const productSearchText = [
          product.name,
          product.description,
          ...product.searchKeywords,
          ...product.keyIngredients,
        ].join(' ').toLowerCase();
        
        if (productSearchText.includes(lowerKeyword)) {
          score += 5;
        }
      });
    }
  });
  
  return score;
}

function determinePriority(score: number, index: number): 'primary' | 'secondary' | 'optional' {
  if (index === 0 || score >= 30) return 'primary';
  if (index === 1 || score >= 20) return 'secondary';
  return 'optional';
}

export function getRecommendations(
  userProfile: UserProfile,
  options?: {
    minProducts?: number;
    maxProducts?: number;
  }
): ProductRecommendation[] {
  const { minProducts = 2, maxProducts = 4 } = options || {};
  
  // Calculate scores for all products
  const scoredProducts = products
    .map(product => ({
      product,
      score: calculateProductScore(product, userProfile),
      reasoning: getProductReasoning(product, userProfile),
      priority: 'optional' as 'primary' | 'secondary' | 'optional',
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
  
  // Take top recommendations
  const recommendations = scoredProducts.slice(0, maxProducts);
  
  // Ensure minimum products
  if (recommendations.length < minProducts && scoredProducts.length >= minProducts) {
    return scoredProducts.slice(0, minProducts).map((item, index) => ({
      ...item,
      priority: determinePriority(item.score, index),
    }));
  }
  
  // Set priorities
  return recommendations.map((item, index) => ({
    ...item,
    priority: determinePriority(item.score, index),
  }));
}

// Helper to convert answers to tags
export function getRecommendationsFromAnswers(answers: Record<string, string[]>): ProductRecommendation[] {
  // Extract all tags from answers
  const tags: string[] = [];
  
  Object.entries(answers).forEach(([questionId, optionIds]) => {
    // Try conversational questions first
    let question = conversationalQuestions.find(q => q.id === questionId);
    
    // Fallback to original questions if not found
    if (!question) {
      question = questions.find(q => q.id === questionId) as any;
    }
    
    if (!question) return;
    
    optionIds.forEach(optionId => {
      const option = question.options.find(opt => opt.id === optionId);
      if (option && option.tags) {
        tags.push(...option.tags);
      }
    });
  });
  
  const userProfile: UserProfile = { tags };
  return getRecommendations(userProfile, { minProducts: 3, maxProducts: 5 });
}

// Helper to format price
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

// Helper to calculate bundle discount
export function calculateBundleDiscount(products: Product[]): {
  originalTotal: number;
  discountedTotal: number;
  savings: number;
  discountPercent: number;
} {
  const originalTotal = products.reduce((sum, p) => sum + (p.salePrice || p.price), 0);
  const discountPercent = 15; // 15% bundle discount
  const discountedTotal = originalTotal * (1 - discountPercent / 100);
  const savings = originalTotal - discountedTotal;
  
  return {
    originalTotal,
    discountedTotal,
    savings,
    discountPercent,
  };
}