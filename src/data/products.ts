// Mock product data with full tagging for smart search
export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string; // Detailed product description for PDP
  price: number;
  salePrice?: number;
  image?: string;
  
  // Tagging for search
  primaryCategory: string;
  secondaryCategories?: string[];
  bodyParts: string[];
  bodySystems: string[];
  functions: {
    name: string;
    evidence: 'gold' | 'silver' | 'emerging';
  }[];
  healthIssues: string[];
  keyIngredients: string[];
  
  // Search optimization
  searchKeywords: string[];
  popularFor: string[];
  
  // Additional metadata
  formulation: string; // e.g., "Capsule", "Gummy", "Powder"
  servingSize: string;
  servingsPerContainer: number;
}

export const products: Product[] = [
  // SLEEP PRODUCTS
  {
    id: 'sleep-support-mag',
    name: 'Sleep Support Formula',
    description: 'Magnesium Glycinate with L-Theanine and Glycine',
    longDescription: 'A comprehensive sleep support formula combining highly bioavailable Magnesium Glycinate with synergistic L-Theanine and Glycine to naturally promote relaxation, support healthy sleep patterns, and help you wake refreshed. This gentle, non-habit forming formula works with your body\'s natural sleep mechanisms to support both falling asleep and staying asleep throughout the night.',
    price: 19.90,
    salePrice: 24.90,
    primaryCategory: 'Sleep & Relaxation',
    secondaryCategories: ['Stress & Mood'],
    bodyParts: ['Brain', 'Nerves', 'Muscles'],
    bodySystems: ['Nervous'],
    functions: [
      { name: 'Sleep', evidence: 'gold' },
      { name: 'Mood Balancing', evidence: 'silver' },
    ],
    healthIssues: ['Sleep Disorders', 'Anxiety & Stress'],
    keyIngredients: ['Magnesium', 'Theanine', 'Glycine'],
    searchKeywords: ['sleep', 'insomnia', 'falling asleep', 'relaxation', 'calm', 'rest', 'magnesium'],
    popularFor: ['better sleep', 'trouble sleeping', 'cant sleep', 'sleep quality'],
    formulation: 'Capsule',
    servingSize: '2 capsules',
    servingsPerContainer: 30,
  },
  {
    id: 'complete-sleep-stack',
    name: 'Complete Sleep Stack',
    description: 'Multi-pathway sleep support with Magnesium, GABA, and Glycine',
    price: 29.90,
    salePrice: 34.90,
    primaryCategory: 'Sleep & Relaxation',
    bodyParts: ['Brain', 'Nerves'],
    bodySystems: ['Nervous'],
    functions: [
      { name: 'Sleep', evidence: 'gold' },
      { name: 'Mood Balancing', evidence: 'gold' },
    ],
    healthIssues: ['Sleep Disorders', 'Anxiety & Stress'],
    keyIngredients: ['Magnesium', 'Glycine'],
    searchKeywords: ['sleep', 'deep sleep', 'staying asleep', 'sleep maintenance', 'waking up'],
    popularFor: ['better sleep', 'sleep quality', 'staying asleep'],
    formulation: 'Capsule',
    servingSize: '3 capsules',
    servingsPerContainer: 30,
  },
  {
    id: 'melatonin-plus',
    name: 'Melatonin Plus',
    description: 'Time-release melatonin with L-Theanine for natural sleep cycles',
    price: 14.90,
    salePrice: 18.90,
    primaryCategory: 'Sleep & Relaxation',
    bodyParts: ['Brain', 'Endocrine System'],
    bodySystems: ['Nervous', 'Endocrine'],
    functions: [
      { name: 'Sleep', evidence: 'gold' },
    ],
    healthIssues: ['Sleep Disorders'],
    keyIngredients: ['Theanine'],
    searchKeywords: ['sleep', 'melatonin', 'jet lag', 'sleep schedule', 'circadian rhythm'],
    popularFor: ['better sleep', 'falling asleep', 'sleep schedule'],
    formulation: 'Tablet',
    servingSize: '1 tablet',
    servingsPerContainer: 60,
  },

  // ENERGY PRODUCTS
  {
    id: 'energy-b-complex',
    name: 'Energy B-Complex',
    description: 'Complete B-vitamin complex for natural energy production',
    price: 16.90,
    salePrice: 21.90,
    primaryCategory: 'Energy',
    secondaryCategories: ['Brain Health'],
    bodyParts: ['Blood', 'Brain', 'Nerves'],
    bodySystems: ['Nervous', 'Cardiovascular'],
    functions: [
      { name: 'Energy Production', evidence: 'gold' },
      { name: 'Cognitive Function', evidence: 'gold' },
      { name: 'Metabolism', evidence: 'gold' },
    ],
    healthIssues: ['Fatigue'],
    keyIngredients: ['B-Complex Vitamins', 'Vitamin B12'],
    searchKeywords: ['energy', 'tired', 'fatigue', 'exhaustion', 'b vitamins', 'b12'],
    popularFor: ['more energy', 'always tired', 'low energy', 'fatigue'],
    formulation: 'Capsule',
    servingSize: '1 capsule',
    servingsPerContainer: 60,
  },
  {
    id: 'iron-plus',
    name: 'Gentle Iron Plus',
    description: 'Easy-to-digest iron with Vitamin C for optimal absorption',
    price: 13.90,
    salePrice: 17.90,
    primaryCategory: 'Energy',
    secondaryCategories: ['Individual Vitamins & Minerals'],
    bodyParts: ['Blood'],
    bodySystems: ['Cardiovascular'],
    functions: [
      { name: 'Energy Production', evidence: 'gold' },
    ],
    healthIssues: ['Fatigue'],
    keyIngredients: ['Iron', 'Vitamin C'],
    searchKeywords: ['iron', 'anemia', 'tired', 'fatigue', 'energy', 'blood health'],
    popularFor: ['always tired', 'low energy', 'iron deficiency'],
    formulation: 'Capsule',
    servingSize: '1 capsule',
    servingsPerContainer: 90,
  },

  // JOINT HEALTH PRODUCTS
  {
    id: 'joint-support-advanced',
    name: 'Advanced Joint Support',
    description: 'Glucosamine, Chondroitin, and MSM for joint health and mobility',
    price: 34.90,
    salePrice: 42.90,
    primaryCategory: 'Joint Health',
    bodyParts: ['Joints', 'Bones'],
    bodySystems: ['Skeletal'],
    functions: [
      { name: 'Movement', evidence: 'gold' },
      { name: 'Structural Support', evidence: 'gold' },
    ],
    healthIssues: ['Joint Pain & Stiffness'],
    keyIngredients: [],
    searchKeywords: ['joint', 'joints', 'arthritis', 'stiffness', 'mobility', 'glucosamine', 'knees', 'pain'],
    popularFor: ['joint pain', 'joint support', 'knee pain', 'arthritis'],
    formulation: 'Capsule',
    servingSize: '3 capsules',
    servingsPerContainer: 30,
  },
  {
    id: 'turmeric-curcumin',
    name: 'Turmeric Curcumin Complex',
    description: 'High-potency turmeric with BioPerine for inflammation support',
    price: 24.90,
    salePrice: 29.90,
    primaryCategory: 'Joint Health',
    secondaryCategories: ['Anti-Aging'],
    bodyParts: ['Joints', 'Immune System'],
    bodySystems: ['Skeletal', 'Immune'],
    functions: [
      { name: 'Movement', evidence: 'silver' },
      { name: 'Cell Protection', evidence: 'gold' },
    ],
    healthIssues: ['Joint Pain & Stiffness'],
    keyIngredients: [],
    searchKeywords: ['turmeric', 'curcumin', 'inflammation', 'anti-inflammatory', 'joint pain', 'antioxidant'],
    popularFor: ['joint pain', 'inflammation', 'anti-inflammatory'],
    formulation: 'Capsule',
    servingSize: '2 capsules',
    servingsPerContainer: 30,
  },

  // BRAIN HEALTH PRODUCTS
  {
    id: 'brain-focus-formula',
    name: 'Brain Focus Formula',
    description: 'Omega-3 DHA, Bacopa, and Ginkgo for cognitive support',
    price: 32.90,
    salePrice: 39.90,
    primaryCategory: 'Brain Health',
    bodyParts: ['Brain'],
    bodySystems: ['Nervous'],
    functions: [
      { name: 'Cognitive Function', evidence: 'gold' },
      { name: 'Memory', evidence: 'gold' },
    ],
    healthIssues: ['Memory & Brain Health'],
    keyIngredients: ['DHA', 'Omega-3', 'Bacopa Monnieri', 'Ginkgo biloba'],
    searchKeywords: ['brain', 'memory', 'focus', 'concentration', 'cognitive', 'brain fog', 'mental clarity'],
    popularFor: ['mental clarity', 'brain fog', 'memory', 'focus'],
    formulation: 'Softgel',
    servingSize: '2 softgels',
    servingsPerContainer: 30,
  },
  {
    id: 'omega-3-brain-heart',
    name: 'Omega-3 Brain & Heart',
    description: 'High-potency EPA and DHA fish oil for brain and cardiovascular health',
    price: 27.90,
    salePrice: 34.90,
    primaryCategory: 'Brain Health',
    secondaryCategories: ['Cardiovascular Health'],
    bodyParts: ['Brain', 'Heart'],
    bodySystems: ['Nervous', 'Cardiovascular'],
    functions: [
      { name: 'Cognitive Function', evidence: 'gold' },
      { name: 'Circulation', evidence: 'gold' },
    ],
    healthIssues: ['Memory & Brain Health', 'Heart & Blood Vessel Health'],
    keyIngredients: ['Fish Oil', 'Omega-3', 'EPA', 'DHA'],
    searchKeywords: ['omega 3', 'fish oil', 'brain health', 'heart health', 'epa', 'dha'],
    popularFor: ['brain health', 'heart health', 'omega 3'],
    formulation: 'Softgel',
    servingSize: '2 softgels',
    servingsPerContainer: 60,
  },

  // DIGESTIVE HEALTH
  {
    id: 'probiotic-daily',
    name: 'Daily Probiotic 50 Billion',
    description: '10 probiotic strains for digestive and immune health',
    price: 29.90,
    salePrice: 36.90,
    primaryCategory: 'Digestive Health',
    secondaryCategories: ['Immune Health'],
    bodyParts: ['GI Tract', 'Immune System'],
    bodySystems: ['Digestive', 'Immune'],
    functions: [
      { name: 'Digestion', evidence: 'gold' },
      { name: 'Immune Defense', evidence: 'gold' },
    ],
    healthIssues: ['Digestive Health', 'Immune Health'],
    keyIngredients: [],
    searchKeywords: ['probiotic', 'probiotics', 'gut health', 'digestion', 'digestive', 'bloating', 'ibs'],
    popularFor: ['digestive health', 'gut health', 'probiotics', 'bloating'],
    formulation: 'Capsule',
    servingSize: '1 capsule',
    servingsPerContainer: 30,
  },
  {
    id: 'digestive-enzymes',
    name: 'Digestive Enzyme Complex',
    description: 'Full-spectrum enzymes for protein, fat, and carb digestion',
    price: 22.90,
    salePrice: 27.90,
    primaryCategory: 'Digestive Health',
    bodyParts: ['GI Tract', 'Stomach'],
    bodySystems: ['Digestive'],
    functions: [
      { name: 'Digestion', evidence: 'gold' },
    ],
    healthIssues: ['Digestive Health'],
    keyIngredients: [],
    searchKeywords: ['digestive enzymes', 'digestion', 'bloating', 'gas', 'indigestion'],
    popularFor: ['digestive health', 'bloating', 'poor digestion'],
    formulation: 'Capsule',
    servingSize: '1 capsule',
    servingsPerContainer: 90,
  },
  {
    id: 'fibermucil',
    name: 'Fibermucil',
    description: 'Natural Psyllium Fiber',
    longDescription: 'A natural, encapsulated Psyllium Husk powder that contains no additives of any kind and provides an unparalleled natural source of both water-soluble fiber and bulk fiber to support a healthy digestive tract, as well as helping to support healthy blood cholesterol levels already in the normal range.',
    price: 19.90,
    salePrice: 14.90,
    primaryCategory: 'Digestive Health',
    bodyParts: ['GI Tract', 'Heart'],
    bodySystems: ['Digestive', 'Cardiovascular'],
    functions: [
      { name: 'Digestion', evidence: 'gold' },
      { name: 'Cholesterol Support', evidence: 'gold' },
    ],
    healthIssues: ['Digestive Health', 'Cholesterol'],
    keyIngredients: ['Psyllium Husk'],
    searchKeywords: ['fiber', 'psyllium', 'digestion', 'regularity', 'cholesterol', 'constipation'],
    popularFor: ['digestive health', 'fiber', 'regularity', 'cholesterol support'],
    formulation: 'Capsule',
    servingSize: '5 capsules',
    servingsPerContainer: 60,
  },

  // IMMUNE HEALTH
  {
    id: 'immune-defense',
    name: 'Immune Defense Complex',
    description: 'Vitamin C, D3, Zinc, and Elderberry for immune support',
    price: 19.90,
    salePrice: 24.90,
    primaryCategory: 'Immune Health',
    bodyParts: ['Immune System'],
    bodySystems: ['Immune'],
    functions: [
      { name: 'Immune Defense', evidence: 'gold' },
      { name: 'Cell Protection', evidence: 'gold' },
    ],
    healthIssues: ['Immune Health'],
    keyIngredients: ['Vitamin C', 'Vitamin D3', 'Zinc', 'Elderberry'],
    searchKeywords: ['immune', 'immunity', 'cold', 'flu', 'sick', 'vitamin c', 'zinc'],
    popularFor: ['immune support', 'immune health', 'getting sick'],
    formulation: 'Capsule',
    servingSize: '2 capsules',
    servingsPerContainer: 30,
  },

  // HEART HEALTH
  {
    id: 'heart-support',
    name: 'Heart Support Formula',
    description: 'CoQ10, Omega-3, and Magnesium for cardiovascular wellness',
    price: 34.90,
    salePrice: 42.90,
    primaryCategory: 'Cardiovascular Health',
    bodyParts: ['Heart', 'Arteries', 'Blood'],
    bodySystems: ['Cardiovascular'],
    functions: [
      { name: 'Circulation', evidence: 'gold' },
      { name: 'Cell Protection', evidence: 'gold' },
    ],
    healthIssues: ['Heart & Blood Vessel Health', 'Cholesterol Management'],
    keyIngredients: ['Omega-3', 'Magnesium'],
    searchKeywords: ['heart', 'cardiovascular', 'coq10', 'heart health', 'circulation'],
    popularFor: ['heart health', 'cardiovascular health', 'circulation'],
    formulation: 'Softgel',
    servingSize: '2 softgels',
    servingsPerContainer: 30,
  },

  // STRESS & MOOD
  {
    id: 'stress-ashwagandha',
    name: 'Ashwagandha Stress Relief',
    description: 'Adaptogenic herb for stress, mood, and energy balance',
    price: 21.90,
    salePrice: 26.90,
    primaryCategory: 'Stress & Mood',
    secondaryCategories: ['Energy'],
    bodyParts: ['Brain', 'Endocrine System'],
    bodySystems: ['Nervous', 'Endocrine'],
    functions: [
      { name: 'Mood Balancing', evidence: 'silver' },
      { name: 'Hormone Balancing', evidence: 'silver' },
    ],
    healthIssues: ['Anxiety & Stress', 'Fatigue'],
    keyIngredients: ['Ashwagandha'],
    searchKeywords: ['stress', 'anxiety', 'ashwagandha', 'adaptogen', 'mood', 'stressed out'],
    popularFor: ['stress relief', 'stressed out', 'anxiety'],
    formulation: 'Capsule',
    servingSize: '2 capsules',
    servingsPerContainer: 30,
  },
];