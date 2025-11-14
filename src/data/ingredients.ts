export type IngredientCategory = 
  | 'Vitamins'
  | 'Minerals'
  | 'Amino Acids'
  | 'Fatty Acids & Oils'
  | 'Herbs & Botanicals'
  | 'Antioxidants'
  | 'Probiotics & Enzymes'
  | 'Proteins & Collagen'
  | 'Fruits & Vegetables'
  | 'Specialty & Other';

export interface Ingredient {
  name: string;
  category: IngredientCategory;
  commonUses?: string[];
  evidence?: 'gold' | 'silver' | 'emerging';
}

export const ingredients: Ingredient[] = [
  // VITAMINS
  { name: 'B-Complex Vitamins', category: 'Vitamins', commonUses: ['Energy', 'Brain Health', 'Metabolism'], evidence: 'gold' },
  { name: 'Biotin', category: 'Vitamins', commonUses: ['Hair, Skin & Nails', 'Metabolism'], evidence: 'gold' },
  { name: 'Methyl Folate', category: 'Vitamins', commonUses: ['Brain Health', 'Heart Health', 'Cellular Function'], evidence: 'gold' },
  { name: 'Niacin', category: 'Vitamins', commonUses: ['Energy', 'Cholesterol', 'Skin'], evidence: 'gold' },
  { name: 'Vitamin B12', category: 'Vitamins', commonUses: ['Energy', 'Brain Health', 'Red Blood Cells'], evidence: 'gold' },
  { name: 'Vitamin C', category: 'Vitamins', commonUses: ['Immune Health', 'Collagen', 'Antioxidant'], evidence: 'gold' },
  { name: 'Vitamin D3', category: 'Vitamins', commonUses: ['Bone Health', 'Immune', 'Mood'], evidence: 'gold' },
  { name: 'Vitamin E', category: 'Vitamins', commonUses: ['Antioxidant', 'Skin', 'Heart Health'], evidence: 'gold' },
  { name: 'Vitamin K-2 MK-7', category: 'Vitamins', commonUses: ['Bone Health', 'Heart Health', 'Calcium Transport'], evidence: 'gold' },
  { name: 'Natural Vitamin E Complex', category: 'Vitamins', commonUses: ['Antioxidant', 'Heart Health'], evidence: 'gold' },
  { name: 'Gamma Tocopherol', category: 'Vitamins', commonUses: ['Antioxidant', 'Anti-inflammatory'], evidence: 'silver' },
  { name: 'Mixed Tocopherols', category: 'Vitamins', commonUses: ['Antioxidant', 'Cellular Protection'], evidence: 'gold' },
  { name: 'Mixed Tocotrienols', category: 'Vitamins', commonUses: ['Cholesterol', 'Antioxidant'], evidence: 'silver' },

  // MINERALS
  { name: 'Calcium', category: 'Minerals', commonUses: ['Bone Health', 'Muscle Function', 'Nerves'], evidence: 'gold' },
  { name: 'Iodine', category: 'Minerals', commonUses: ['Thyroid Function', 'Metabolism'], evidence: 'gold' },
  { name: 'Iron', category: 'Minerals', commonUses: ['Energy', 'Blood Health', 'Oxygen Transport'], evidence: 'gold' },
  { name: 'Magnesium', category: 'Minerals', commonUses: ['Sleep', 'Muscle Function', 'Stress', 'Heart'], evidence: 'gold' },
  { name: 'Potassium', category: 'Minerals', commonUses: ['Blood Pressure', 'Heart Health', 'Muscle Function'], evidence: 'gold' },
  { name: 'Zinc', category: 'Minerals', commonUses: ['Immune Health', 'Skin', 'Wound Healing'], evidence: 'gold' },

  // AMINO ACIDS
  { name: '5-HTP', category: 'Amino Acids', commonUses: ['Mood', 'Sleep', 'Appetite'], evidence: 'silver' },
  { name: 'Acetyl L-Carnitine', category: 'Amino Acids', commonUses: ['Brain Health', 'Energy', 'Mitochondrial Function'], evidence: 'silver' },
  { name: 'Amino Acid Complex', category: 'Amino Acids', commonUses: ['Muscle Building', 'Recovery', 'Protein Synthesis'], evidence: 'gold' },
  { name: 'Branched Chain Amino Acid Complex', category: 'Amino Acids', commonUses: ['Muscle Recovery', 'Exercise Performance'], evidence: 'gold' },
  { name: 'Carnitine', category: 'Amino Acids', commonUses: ['Energy Production', 'Fat Metabolism'], evidence: 'silver' },
  { name: 'Essential Amino Acids', category: 'Amino Acids', commonUses: ['Protein Building', 'Muscle Health'], evidence: 'gold' },
  { name: 'Glutamine', category: 'Amino Acids', commonUses: ['Gut Health', 'Immune Function', 'Muscle Recovery'], evidence: 'silver' },
  { name: 'Glycine', category: 'Amino Acids', commonUses: ['Sleep', 'Collagen Production', 'Detox'], evidence: 'silver' },
  { name: 'Lysine', category: 'Amino Acids', commonUses: ['Immune Health', 'Collagen', 'Calcium Absorption'], evidence: 'silver' },
  { name: 'Taurine', category: 'Amino Acids', commonUses: ['Heart Health', 'Antioxidant', 'Energy'], evidence: 'silver' },
  { name: 'Theanine', category: 'Amino Acids', commonUses: ['Relaxation', 'Focus', 'Stress'], evidence: 'silver' },

  // FATTY ACIDS & OILS
  { name: 'Algal Oil', category: 'Fatty Acids & Oils', commonUses: ['Omega-3', 'Brain Health', 'Heart Health'], evidence: 'gold' },
  { name: 'DHA', category: 'Fatty Acids & Oils', commonUses: ['Brain Health', 'Vision', 'Heart'], evidence: 'gold' },
  { name: 'DPA', category: 'Fatty Acids & Oils', commonUses: ['Heart Health', 'Inflammation'], evidence: 'silver' },
  { name: 'EPA', category: 'Fatty Acids & Oils', commonUses: ['Heart Health', 'Anti-inflammatory', 'Mood'], evidence: 'gold' },
  { name: 'Evening Primrose Oil', category: 'Fatty Acids & Oils', commonUses: ['Hormonal Balance', 'Skin Health'], evidence: 'silver' },
  { name: 'Fish Oil', category: 'Fatty Acids & Oils', commonUses: ['Heart Health', 'Brain', 'Joints'], evidence: 'gold' },
  { name: 'Omega-3', category: 'Fatty Acids & Oils', commonUses: ['Heart', 'Brain', 'Joints', 'Inflammation'], evidence: 'gold' },
  { name: 'Pumpkin Seed Oil', category: 'Fatty Acids & Oils', commonUses: ['Prostate Health', 'Urinary Function'], evidence: 'silver' },
  { name: 'Soy Lecithin Granules', category: 'Fatty Acids & Oils', commonUses: ['Brain Health', 'Cholesterol'], evidence: 'silver' },
  { name: 'Soy Lecithin Oil', category: 'Fatty Acids & Oils', commonUses: ['Brain Health', 'Liver Support'], evidence: 'silver' },

  // HERBS & BOTANICALS
  { name: 'Ashwagandha', category: 'Herbs & Botanicals', commonUses: ['Stress', 'Energy', 'Hormones'], evidence: 'silver' },
  { name: 'Asian Ginseng', category: 'Herbs & Botanicals', commonUses: ['Energy', 'Mental Performance', 'Vitality'], evidence: 'silver' },
  { name: 'Astragalus', category: 'Herbs & Botanicals', commonUses: ['Immune Support', 'Energy', 'Longevity'], evidence: 'silver' },
  { name: 'Bacopa Monnieri', category: 'Herbs & Botanicals', commonUses: ['Memory', 'Cognitive Function', 'Focus'], evidence: 'silver' },
  { name: 'Bilberry', category: 'Herbs & Botanicals', commonUses: ['Vision Health', 'Circulation'], evidence: 'silver' },
  { name: 'Black Cohosh', category: 'Herbs & Botanicals', commonUses: ['Menopause', 'Hormonal Balance'], evidence: 'silver' },
  { name: 'Butcher\'s Broom', category: 'Herbs & Botanicals', commonUses: ['Circulation', 'Vein Health'], evidence: 'silver' },
  { name: 'Chamomile', category: 'Herbs & Botanicals', commonUses: ['Relaxation', 'Sleep', 'Digestion'], evidence: 'silver' },
  { name: 'Cinnamon', category: 'Herbs & Botanicals', commonUses: ['Blood Sugar', 'Antioxidant', 'Inflammation'], evidence: 'silver' },
  { name: 'Damiana', category: 'Herbs & Botanicals', commonUses: ['Mood', 'Energy', 'Sexual Health'], evidence: 'emerging' },
  { name: 'Dong Quai', category: 'Herbs & Botanicals', commonUses: ['Women\'s Health', 'Hormonal Balance'], evidence: 'silver' },
  { name: 'Echinacea', category: 'Herbs & Botanicals', commonUses: ['Immune Support', 'Cold & Flu'], evidence: 'silver' },
  { name: 'Elderberry', category: 'Herbs & Botanicals', commonUses: ['Immune Support', 'Antioxidant'], evidence: 'silver' },
  { name: 'Eleuthero', category: 'Herbs & Botanicals', commonUses: ['Energy', 'Stress Adaptation', 'Endurance'], evidence: 'silver' },
  { name: 'Garlic', category: 'Herbs & Botanicals', commonUses: ['Heart Health', 'Immune', 'Blood Pressure'], evidence: 'gold' },
  { name: 'Ginger', category: 'Herbs & Botanicals', commonUses: ['Digestion', 'Nausea', 'Inflammation'], evidence: 'silver' },
  { name: 'Ginkgo biloba', category: 'Herbs & Botanicals', commonUses: ['Memory', 'Circulation', 'Brain Health'], evidence: 'silver' },
  { name: 'Goldenseal', category: 'Herbs & Botanicals', commonUses: ['Immune Support', 'Digestive Health'], evidence: 'emerging' },
  { name: 'Hops', category: 'Herbs & Botanicals', commonUses: ['Sleep', 'Relaxation', 'Menopause'], evidence: 'silver' },
  { name: 'Horse Chestnut Seed Extract', category: 'Herbs & Botanicals', commonUses: ['Vein Health', 'Circulation'], evidence: 'silver' },
  { name: 'Oregano', category: 'Herbs & Botanicals', commonUses: ['Antimicrobial', 'Antioxidant', 'Immune'], evidence: 'silver' },
  { name: 'Passionflower', category: 'Herbs & Botanicals', commonUses: ['Anxiety', 'Sleep', 'Relaxation'], evidence: 'silver' },
  { name: 'Peppermint Oil', category: 'Herbs & Botanicals', commonUses: ['Digestion', 'IBS', 'Headaches'], evidence: 'silver' },
  { name: 'Rhodiola rosea', category: 'Herbs & Botanicals', commonUses: ['Stress', 'Energy', 'Mental Performance'], evidence: 'silver' },
  { name: 'Rosemary', category: 'Herbs & Botanicals', commonUses: ['Memory', 'Antioxidant', 'Circulation'], evidence: 'silver' },
  { name: 'Saffron Extract', category: 'Herbs & Botanicals', commonUses: ['Mood', 'Memory', 'Vision'], evidence: 'silver' },
  { name: 'Sage', category: 'Herbs & Botanicals', commonUses: ['Memory', 'Cognitive Function', 'Menopause'], evidence: 'silver' },
  { name: 'Saw Palmetto', category: 'Herbs & Botanicals', commonUses: ['Prostate Health', 'Urinary Function'], evidence: 'silver' },
  { name: 'Spearmint Oil', category: 'Herbs & Botanicals', commonUses: ['Digestion', 'Hormonal Balance'], evidence: 'silver' },
  { name: 'Tea', category: 'Herbs & Botanicals', commonUses: ['Antioxidant', 'Energy', 'Focus'], evidence: 'silver' },
  { name: 'Thyme', category: 'Herbs & Botanicals', commonUses: ['Respiratory', 'Antimicrobial'], evidence: 'silver' },
  { name: 'Turmeric (Curcumin)', category: 'Herbs & Botanicals', commonUses: ['Inflammation', 'Joint Health', 'Brain'], evidence: 'silver' },
  { name: 'Valerian', category: 'Herbs & Botanicals', commonUses: ['Sleep', 'Anxiety', 'Relaxation'], evidence: 'silver' },
  { name: 'Vitex Agnus', category: 'Herbs & Botanicals', commonUses: ['Hormonal Balance', 'PMS', 'Menstrual Health'], evidence: 'silver' },

  // ANTIOXIDANTS
  { name: 'Alpha Lipoic Acid', category: 'Antioxidants', commonUses: ['Blood Sugar', 'Antioxidant', 'Nerve Health'], evidence: 'silver' },
  { name: 'Astaxanthin', category: 'Antioxidants', commonUses: ['Eye Health', 'Skin', 'Antioxidant'], evidence: 'silver' },
  { name: 'Citrus Bioflavonoid Complex', category: 'Antioxidants', commonUses: ['Antioxidant', 'Immune', 'Circulation'], evidence: 'silver' },
  { name: 'Coenzyme Q-10', category: 'Antioxidants', commonUses: ['Heart Health', 'Energy', 'Antioxidant'], evidence: 'gold' },
  { name: 'EGCG', category: 'Antioxidants', commonUses: ['Metabolism', 'Antioxidant', 'Brain Health'], evidence: 'silver' },
  { name: 'Glutathione', category: 'Antioxidants', commonUses: ['Detox', 'Antioxidant', 'Immune'], evidence: 'silver' },
  { name: 'Grape Seed Extract', category: 'Antioxidants', commonUses: ['Heart Health', 'Antioxidant', 'Circulation'], evidence: 'silver' },
  { name: 'Green Tea Extract', category: 'Antioxidants', commonUses: ['Metabolism', 'Antioxidant', 'Brain'], evidence: 'silver' },
  { name: 'Lutein', category: 'Antioxidants', commonUses: ['Eye Health', 'Vision', 'Skin'], evidence: 'gold' },
  { name: 'Lycopene', category: 'Antioxidants', commonUses: ['Prostate', 'Heart Health', 'Antioxidant'], evidence: 'silver' },
  { name: 'N-Acetyl Cysteine', category: 'Antioxidants', commonUses: ['Respiratory', 'Antioxidant', 'Detox'], evidence: 'silver' },
  { name: 'Pine Bark', category: 'Antioxidants', commonUses: ['Circulation', 'Antioxidant', 'Skin'], evidence: 'silver' },
  { name: 'PQQ', category: 'Antioxidants', commonUses: ['Mitochondrial Health', 'Energy', 'Brain'], evidence: 'silver' },
  { name: 'Quercetin', category: 'Antioxidants', commonUses: ['Immune', 'Inflammation', 'Antioxidant'], evidence: 'silver' },
  { name: 'Resveratrol', category: 'Antioxidants', commonUses: ['Longevity', 'Heart Health', 'Antioxidant'], evidence: 'silver' },
  { name: 'Zeaxanthin', category: 'Antioxidants', commonUses: ['Eye Health', 'Vision Protection'], evidence: 'gold' },

  // PROBIOTICS & ENZYMES
  { name: 'Bifidobacterium Lactis', category: 'Probiotics & Enzymes', commonUses: ['Gut Health', 'Immune', 'Digestion'], evidence: 'gold' },
  { name: 'Digestive Enzymes', category: 'Probiotics & Enzymes', commonUses: ['Digestion', 'Nutrient Absorption'], evidence: 'silver' },
  { name: 'Probiotics', category: 'Probiotics & Enzymes', commonUses: ['Gut Health', 'Immune', 'Digestion'], evidence: 'gold' },

  // PROTEINS & COLLAGEN
  { name: 'Collagen', category: 'Proteins & Collagen', commonUses: ['Skin', 'Joints', 'Hair & Nails'], evidence: 'silver' },
  { name: 'Fermented Pea & Rice Protein', category: 'Proteins & Collagen', commonUses: ['Muscle Building', 'Nutrition'], evidence: 'gold' },
  { name: 'Free Range Collagen Peptides', category: 'Proteins & Collagen', commonUses: ['Skin', 'Joints', 'Bone'], evidence: 'silver' },
  { name: 'Marine Collagen Peptides', category: 'Proteins & Collagen', commonUses: ['Skin', 'Anti-Aging'], evidence: 'silver' },
  { name: 'Protein', category: 'Proteins & Collagen', commonUses: ['Muscle Building', 'Recovery', 'Nutrition'], evidence: 'gold' },
  { name: 'Soy Protein', category: 'Proteins & Collagen', commonUses: ['Muscle', 'Heart Health', 'Nutrition'], evidence: 'gold' },
  { name: 'Whey Protein', category: 'Proteins & Collagen', commonUses: ['Muscle Building', 'Recovery', 'Satiety'], evidence: 'gold' },

  // FRUITS & VEGETABLES
  { name: 'Acai Berry', category: 'Fruits & Vegetables', commonUses: ['Antioxidant', 'Energy'], evidence: 'emerging' },
  { name: 'Aloe Vera', category: 'Fruits & Vegetables', commonUses: ['Digestive Health', 'Skin'], evidence: 'silver' },
  { name: 'Apple', category: 'Fruits & Vegetables', commonUses: ['Fiber', 'Antioxidant'], evidence: 'gold' },
  { name: 'Barley Grass', category: 'Fruits & Vegetables', commonUses: ['Nutrition', 'Antioxidant', 'Alkalizing'], evidence: 'emerging' },
  { name: 'Bergamot', category: 'Fruits & Vegetables', commonUses: ['Cholesterol', 'Heart Health'], evidence: 'silver' },
  { name: 'Black Currant', category: 'Fruits & Vegetables', commonUses: ['Immune', 'Antioxidant'], evidence: 'silver' },
  { name: 'Blackberry', category: 'Fruits & Vegetables', commonUses: ['Antioxidant', 'Fiber'], evidence: 'gold' },
  { name: 'Blue-Green Algae', category: 'Fruits & Vegetables', commonUses: ['Nutrition', 'Energy', 'Detox'], evidence: 'emerging' },
  { name: 'Blueberry', category: 'Fruits & Vegetables', commonUses: ['Brain Health', 'Antioxidant', 'Vision'], evidence: 'silver' },
  { name: 'Broccoli', category: 'Fruits & Vegetables', commonUses: ['Detox', 'Antioxidant', 'Cancer Prevention'], evidence: 'gold' },
  { name: 'Brussels Sprouts', category: 'Fruits & Vegetables', commonUses: ['Antioxidant', 'Detox'], evidence: 'gold' },
  { name: 'Cherry', category: 'Fruits & Vegetables', commonUses: ['Inflammation', 'Sleep', 'Recovery'], evidence: 'silver' },
  { name: 'Chlorella', category: 'Fruits & Vegetables', commonUses: ['Detox', 'Nutrition', 'Immune'], evidence: 'emerging' },
  { name: 'Chokeberry', category: 'Fruits & Vegetables', commonUses: ['Antioxidant', 'Heart Health'], evidence: 'silver' },
  { name: 'Cranberry', category: 'Fruits & Vegetables', commonUses: ['Urinary Tract', 'Antioxidant'], evidence: 'silver' },
  { name: 'Grape Skin', category: 'Fruits & Vegetables', commonUses: ['Antioxidant', 'Heart Health'], evidence: 'silver' },
  { name: 'Kale', category: 'Fruits & Vegetables', commonUses: ['Nutrition', 'Antioxidant', 'Detox'], evidence: 'gold' },
  { name: 'Mustard Seed', category: 'Fruits & Vegetables', commonUses: ['Metabolism', 'Antioxidant'], evidence: 'silver' },
  { name: 'Pomegranate', category: 'Fruits & Vegetables', commonUses: ['Heart Health', 'Antioxidant'], evidence: 'silver' },
  { name: 'Raspberry', category: 'Fruits & Vegetables', commonUses: ['Antioxidant', 'Fiber'], evidence: 'gold' },
  { name: 'Red Cabbage', category: 'Fruits & Vegetables', commonUses: ['Antioxidant', 'Digestion'], evidence: 'gold' },
  { name: 'Red Wine', category: 'Fruits & Vegetables', commonUses: ['Heart Health', 'Antioxidant'], evidence: 'silver' },
  { name: 'Spirulina', category: 'Fruits & Vegetables', commonUses: ['Nutrition', 'Energy', 'Immune'], evidence: 'silver' },
  { name: 'Strawberry', category: 'Fruits & Vegetables', commonUses: ['Antioxidant', 'Heart Health'], evidence: 'gold' },
  { name: 'Wasabi', category: 'Fruits & Vegetables', commonUses: ['Antimicrobial', 'Circulation'], evidence: 'emerging' },
  { name: 'Wheat Grass', category: 'Fruits & Vegetables', commonUses: ['Nutrition', 'Detox', 'Alkalizing'], evidence: 'emerging' },
  { name: 'White Tea', category: 'Fruits & Vegetables', commonUses: ['Antioxidant', 'Metabolism'], evidence: 'silver' },

  // SPECIALTY & OTHER
  { name: 'Berberine', category: 'Specialty & Other', commonUses: ['Blood Sugar', 'Metabolism', 'Gut Health'], evidence: 'silver' },
  { name: 'Berberine Phospholipid Complex', category: 'Specialty & Other', commonUses: ['Blood Sugar', 'Enhanced Absorption'], evidence: 'silver' },
  { name: 'Choline', category: 'Specialty & Other', commonUses: ['Brain Health', 'Liver', 'Memory'], evidence: 'gold' },
  { name: 'Chondroitin Sulfate', category: 'Specialty & Other', commonUses: ['Joint Health', 'Cartilage'], evidence: 'silver' },
  { name: 'D-Mannose', category: 'Specialty & Other', commonUses: ['Urinary Tract Health'], evidence: 'silver' },
  { name: 'Daidzein', category: 'Specialty & Other', commonUses: ['Hormonal Balance', 'Bone Health'], evidence: 'silver' },
  { name: 'DHEA', category: 'Specialty & Other', commonUses: ['Hormonal Balance', 'Anti-Aging'], evidence: 'silver' },
  { name: 'Diosmin', category: 'Specialty & Other', commonUses: ['Vein Health', 'Circulation'], evidence: 'silver' },
  { name: 'Genistein', category: 'Specialty & Other', commonUses: ['Hormonal Balance', 'Bone Health'], evidence: 'silver' },
  { name: 'Glucosamine Sulfate', category: 'Specialty & Other', commonUses: ['Joint Health', 'Cartilage Building'], evidence: 'silver' },
  { name: 'Guarana', category: 'Specialty & Other', commonUses: ['Energy', 'Mental Alertness'], evidence: 'silver' },
  { name: 'Hesperidin', category: 'Specialty & Other', commonUses: ['Circulation', 'Antioxidant'], evidence: 'silver' },
  { name: 'Huperzine Extract', category: 'Specialty & Other', commonUses: ['Memory', 'Cognitive Function'], evidence: 'silver' },
  { name: 'Indole-3-Carbinol', category: 'Specialty & Other', commonUses: ['Hormonal Balance', 'Detox'], evidence: 'silver' },
  { name: 'Melatonin', category: 'Specialty & Other', commonUses: ['Sleep', 'Circadian Rhythm'], evidence: 'gold' },
  { name: 'MSM', category: 'Specialty & Other', commonUses: ['Joint Health', 'Inflammation', 'Skin'], evidence: 'silver' },
  { name: 'Mushroom Blend', category: 'Specialty & Other', commonUses: ['Immune', 'Adaptogenic', 'Energy'], evidence: 'silver' },
  { name: 'Parsley Seed, oil', category: 'Specialty & Other', commonUses: ['Detox', 'Antioxidant'], evidence: 'silver' },
  { name: 'Phosphatidyl Choline', category: 'Specialty & Other', commonUses: ['Brain Health', 'Liver', 'Cell Membranes'], evidence: 'silver' },
  { name: 'Phosphatidyl Serine', category: 'Specialty & Other', commonUses: ['Brain Health', 'Memory', 'Stress'], evidence: 'silver' },
  { name: 'Phytoceramides', category: 'Specialty & Other', commonUses: ['Skin Hydration', 'Anti-Aging'], evidence: 'silver' },
  { name: 'Phytosterols', category: 'Specialty & Other', commonUses: ['Cholesterol', 'Heart Health'], evidence: 'gold' },
  { name: 'Psyllium Husk Powder', category: 'Specialty & Other', commonUses: ['Digestive Health', 'Fiber', 'Regularity'], evidence: 'gold' },
  { name: 'Royal Jelly', category: 'Specialty & Other', commonUses: ['Energy', 'Immune', 'Skin'], evidence: 'emerging' },
  { name: 'Rutin', category: 'Specialty & Other', commonUses: ['Circulation', 'Antioxidant'], evidence: 'silver' },
  { name: 'Silymarin', category: 'Specialty & Other', commonUses: ['Liver Health', 'Detox'], evidence: 'silver' },
  { name: 'Soy Isoflavones', category: 'Specialty & Other', commonUses: ['Menopause', 'Bone Health', 'Heart'], evidence: 'silver' },
  { name: 'UC-II® Chicken Cartilage', category: 'Specialty & Other', commonUses: ['Joint Health', 'Flexibility'], evidence: 'silver' },
  { name: 'Vinpocetine', category: 'Specialty & Other', commonUses: ['Brain Health', 'Memory', 'Circulation'], evidence: 'silver' },
];

// Get all unique categories
export const ingredientCategories: IngredientCategory[] = [
  'Vitamins',
  'Minerals',
  'Amino Acids',
  'Fatty Acids & Oils',
  'Herbs & Botanicals',
  'Antioxidants',
  'Probiotics & Enzymes',
  'Proteins & Collagen',
  'Fruits & Vegetables',
  'Specialty & Other',
];

// Helper function to get ingredients by category
export function getIngredientsByCategory(category: IngredientCategory): Ingredient[] {
  return ingredients.filter(ing => ing.category === category);
}
