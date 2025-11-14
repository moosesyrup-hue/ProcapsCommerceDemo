// Unsplash search queries and image recommendations for ingredient cards
// Use these queries with the unsplash_tool to fetch appropriate images

export interface IngredientImageConfig {
  ingredientName: string;
  primarySearch: string; // Best Unsplash search query
  alternativeSearch?: string; // Backup if primary doesn't work well
  imageStyle: 'natural-source' | 'abstract-supplement' | 'botanical' | 'food-source' | 'scientific';
  notes?: string; // Visual guidance
}

export const ingredientImageConfigs: IngredientImageConfig[] = [
  // ========================================
  // VITAMINS (13 ingredients)
  // ========================================
  {
    ingredientName: 'B-Complex Vitamins',
    primarySearch: 'whole grains seeds',
    alternativeSearch: 'vitamin pills supplements',
    imageStyle: 'food-source',
    notes: 'Show variety of B-rich foods: whole grains, seeds, leafy greens'
  },
  {
    ingredientName: 'Biotin',
    primarySearch: 'eggs almonds',
    alternativeSearch: 'hair growth healthy',
    imageStyle: 'food-source',
    notes: 'Biotin-rich foods like eggs, nuts, or hair health imagery'
  },
  {
    ingredientName: 'Methyl Folate',
    primarySearch: 'leafy greens spinach',
    alternativeSearch: 'green vegetables nutrition',
    imageStyle: 'food-source',
    notes: 'Dark leafy greens, folate-rich vegetables'
  },
  {
    ingredientName: 'Niacin',
    primarySearch: 'chicken breast nuts',
    alternativeSearch: 'protein nutrition',
    imageStyle: 'food-source',
    notes: 'Niacin-rich foods: chicken, fish, nuts'
  },
  {
    ingredientName: 'Vitamin B12',
    primarySearch: 'salmon fish nutrition',
    alternativeSearch: 'red supplement capsules',
    imageStyle: 'food-source',
    notes: 'B12 sources: fish, meat, or red capsules'
  },
  {
    ingredientName: 'Vitamin C',
    primarySearch: 'fresh oranges citrus',
    alternativeSearch: 'colorful fruits vitamin',
    imageStyle: 'food-source',
    notes: 'Bright citrus fruits, oranges, or colorful produce'
  },
  {
    ingredientName: 'Vitamin D3',
    primarySearch: 'sunlight vitamin supplements',
    alternativeSearch: 'sunshine rays light',
    imageStyle: 'natural-source',
    notes: 'Sunlight, golden rays, or vitamin D capsules'
  },
  {
    ingredientName: 'Vitamin E',
    primarySearch: 'almonds nuts seeds',
    alternativeSearch: 'vitamin e oil',
    imageStyle: 'food-source',
    notes: 'Nuts, seeds, or vitamin E oil'
  },
  {
    ingredientName: 'Vitamin K-2 MK-7',
    primarySearch: 'fermented foods natto',
    alternativeSearch: 'green leafy vegetables',
    imageStyle: 'food-source',
    notes: 'Fermented foods or dark leafy greens'
  },
  {
    ingredientName: 'Natural Vitamin E Complex',
    primarySearch: 'mixed nuts seeds',
    alternativeSearch: 'natural supplements',
    imageStyle: 'food-source',
    notes: 'Variety of nuts and seeds'
  },
  {
    ingredientName: 'Gamma Tocopherol',
    primarySearch: 'sesame seeds oil',
    alternativeSearch: 'natural oils wellness',
    imageStyle: 'food-source',
    notes: 'Seeds, nuts, or golden oil'
  },
  {
    ingredientName: 'Mixed Tocopherols',
    primarySearch: 'variety nuts wellness',
    alternativeSearch: 'supplement capsules natural',
    imageStyle: 'food-source',
    notes: 'Mixed nuts or natural vitamin E sources'
  },
  {
    ingredientName: 'Mixed Tocotrienols',
    primarySearch: 'palm oil rice',
    alternativeSearch: 'golden supplements',
    imageStyle: 'abstract-supplement',
    notes: 'Golden oil or abstract vitamin imagery'
  },

  // ========================================
  // MINERALS (6 ingredients)
  // ========================================
  {
    ingredientName: 'Calcium',
    primarySearch: 'dairy milk yogurt',
    alternativeSearch: 'bones health strong',
    imageStyle: 'food-source',
    notes: 'Dairy products or bone health imagery'
  },
  {
    ingredientName: 'Iodine',
    primarySearch: 'seaweed ocean kelp',
    alternativeSearch: 'sea vegetables',
    imageStyle: 'natural-source',
    notes: 'Seaweed, kelp, or ocean-sourced imagery'
  },
  {
    ingredientName: 'Iron',
    primarySearch: 'spinach leafy greens',
    alternativeSearch: 'red meat nutrition',
    imageStyle: 'food-source',
    notes: 'Dark leafy greens or iron-rich foods'
  },
  {
    ingredientName: 'Magnesium',
    primarySearch: 'dark chocolate almonds',
    alternativeSearch: 'green leafy vegetables',
    imageStyle: 'food-source',
    notes: 'Magnesium-rich foods: dark chocolate, nuts, greens'
  },
  {
    ingredientName: 'Potassium',
    primarySearch: 'bananas avocado nutrition',
    alternativeSearch: 'fresh fruits vegetables',
    imageStyle: 'food-source',
    notes: 'Bananas, avocados, or potassium-rich produce'
  },
  {
    ingredientName: 'Zinc',
    primarySearch: 'oysters seafood nutrition',
    alternativeSearch: 'pumpkin seeds nuts',
    imageStyle: 'food-source',
    notes: 'Oysters, seeds, or zinc-rich foods'
  },

  // ========================================
  // AMINO ACIDS (11 ingredients)
  // ========================================
  {
    ingredientName: '5-HTP',
    primarySearch: 'supplement capsules wellness',
    alternativeSearch: 'abstract brain health',
    imageStyle: 'abstract-supplement',
    notes: 'Supplement capsules or calming wellness imagery'
  },
  {
    ingredientName: 'Acetyl L-Carnitine',
    primarySearch: 'energy supplements capsules',
    alternativeSearch: 'brain energy wellness',
    imageStyle: 'abstract-supplement',
    notes: 'Capsules or energy/brain health imagery'
  },
  {
    ingredientName: 'Amino Acid Complex',
    primarySearch: 'protein powder fitness',
    alternativeSearch: 'molecular structure abstract',
    imageStyle: 'abstract-supplement',
    notes: 'Protein powder or molecular structure'
  },
  {
    ingredientName: 'Branched Chain Amino Acid Complex',
    primarySearch: 'fitness protein supplements',
    alternativeSearch: 'muscle recovery wellness',
    imageStyle: 'abstract-supplement',
    notes: 'Fitness supplements or athletic recovery imagery'
  },
  {
    ingredientName: 'Carnitine',
    primarySearch: 'energy supplement capsules',
    alternativeSearch: 'red meat nutrition',
    imageStyle: 'abstract-supplement',
    notes: 'Red capsules or energy imagery'
  },
  {
    ingredientName: 'Essential Amino Acids',
    primarySearch: 'protein sources variety',
    alternativeSearch: 'nutrition wellness supplements',
    imageStyle: 'food-source',
    notes: 'Variety of protein sources'
  },
  {
    ingredientName: 'Glutamine',
    primarySearch: 'white powder supplement',
    alternativeSearch: 'gut health wellness',
    imageStyle: 'abstract-supplement',
    notes: 'White powder or gut health imagery'
  },
  {
    ingredientName: 'Glycine',
    primarySearch: 'collagen powder white',
    alternativeSearch: 'sleep wellness supplement',
    imageStyle: 'abstract-supplement',
    notes: 'White powder or calming sleep imagery'
  },
  {
    ingredientName: 'Lysine',
    primarySearch: 'supplement capsules health',
    alternativeSearch: 'immune wellness',
    imageStyle: 'abstract-supplement',
    notes: 'Capsules or immune health imagery'
  },
  {
    ingredientName: 'Taurine',
    primarySearch: 'energy supplement wellness',
    alternativeSearch: 'heart health capsules',
    imageStyle: 'abstract-supplement',
    notes: 'Energy or heart health imagery'
  },
  {
    ingredientName: 'Theanine',
    primarySearch: 'green tea leaves',
    alternativeSearch: 'calm relaxation wellness',
    imageStyle: 'natural-source',
    notes: 'Green tea leaves or calming imagery'
  },

  // ========================================
  // FATTY ACIDS & OILS (10 ingredients)
  // ========================================
  {
    ingredientName: 'Algal Oil',
    primarySearch: 'algae spirulina green',
    alternativeSearch: 'omega supplement vegan',
    imageStyle: 'natural-source',
    notes: 'Algae, spirulina, or green plant-based imagery'
  },
  {
    ingredientName: 'DHA',
    primarySearch: 'fish oil omega',
    alternativeSearch: 'brain health supplements',
    imageStyle: 'natural-source',
    notes: 'Fish oil or brain health imagery'
  },
  {
    ingredientName: 'DPA',
    primarySearch: 'omega fatty acids',
    alternativeSearch: 'golden oil capsules',
    imageStyle: 'abstract-supplement',
    notes: 'Golden oil or omega capsules'
  },
  {
    ingredientName: 'EPA',
    primarySearch: 'salmon fish omega',
    alternativeSearch: 'fish oil capsules',
    imageStyle: 'food-source',
    notes: 'Salmon or fish oil supplements'
  },
  {
    ingredientName: 'Evening Primrose Oil',
    primarySearch: 'primrose flower yellow',
    alternativeSearch: 'golden oil wellness',
    imageStyle: 'botanical',
    notes: 'Evening primrose flowers or golden oil'
  },
  {
    ingredientName: 'Fish Oil',
    primarySearch: 'omega capsules golden',
    alternativeSearch: 'salmon fish nutrition',
    imageStyle: 'abstract-supplement',
    notes: 'Golden softgel capsules or fish'
  },
  {
    ingredientName: 'Omega-3',
    primarySearch: 'fish oil softgels',
    alternativeSearch: 'salmon nutrition omega',
    imageStyle: 'abstract-supplement',
    notes: 'Golden omega softgels or salmon'
  },
  {
    ingredientName: 'Pumpkin Seed Oil',
    primarySearch: 'pumpkin seeds green',
    alternativeSearch: 'green oil wellness',
    imageStyle: 'natural-source',
    notes: 'Pumpkin seeds or green oil'
  },
  {
    ingredientName: 'Soy Lecithin Granules',
    primarySearch: 'soy lecithin granules',
    alternativeSearch: 'soybean nutrition',
    imageStyle: 'food-source',
    notes: 'Lecithin granules or soybeans'
  },
  {
    ingredientName: 'Soy Lecithin Oil',
    primarySearch: 'soybean oil golden',
    alternativeSearch: 'plant oil wellness',
    imageStyle: 'food-source',
    notes: 'Golden soy oil or soybeans'
  },

  // ========================================
  // HERBS & BOTANICALS (35 ingredients)
  // ========================================
  {
    ingredientName: 'Ashwagandha',
    primarySearch: 'ashwagandha root plant',
    alternativeSearch: 'adaptogen herbs wellness',
    imageStyle: 'botanical',
    notes: 'Ashwagandha root or plant'
  },
  {
    ingredientName: 'Asian Ginseng',
    primarySearch: 'ginseng root asian',
    alternativeSearch: 'herbal energy wellness',
    imageStyle: 'botanical',
    notes: 'Ginseng root - distinctive shape'
  },
  {
    ingredientName: 'Astragalus',
    primarySearch: 'astragalus root herb',
    alternativeSearch: 'immune herbs wellness',
    imageStyle: 'botanical',
    notes: 'Astragalus root slices'
  },
  {
    ingredientName: 'Bacopa Monnieri',
    primarySearch: 'bacopa plant green',
    alternativeSearch: 'brain herbs wellness',
    imageStyle: 'botanical',
    notes: 'Bacopa plant with small leaves'
  },
  {
    ingredientName: 'Bilberry',
    primarySearch: 'bilberry blue berries',
    alternativeSearch: 'blueberries fresh fruit',
    imageStyle: 'natural-source',
    notes: 'Fresh bilberries or similar blue berries'
  },
  {
    ingredientName: 'Black Cohosh',
    primarySearch: 'black cohosh plant',
    alternativeSearch: 'herbal medicine wellness',
    imageStyle: 'botanical',
    notes: 'Black cohosh plant or root'
  },
  {
    ingredientName: 'Butcher\'s Broom',
    primarySearch: 'butchers broom plant',
    alternativeSearch: 'herbal circulation wellness',
    imageStyle: 'botanical',
    notes: 'Butcher\'s broom plant'
  },
  {
    ingredientName: 'Chamomile',
    primarySearch: 'chamomile flowers white',
    alternativeSearch: 'herbal tea relaxation',
    imageStyle: 'botanical',
    notes: 'White chamomile flowers - very recognizable'
  },
  {
    ingredientName: 'Cinnamon',
    primarySearch: 'cinnamon sticks spice',
    alternativeSearch: 'cinnamon bark powder',
    imageStyle: 'natural-source',
    notes: 'Cinnamon sticks or bark - warm tones'
  },
  {
    ingredientName: 'Damiana',
    primarySearch: 'damiana plant leaves',
    alternativeSearch: 'herbal wellness botanical',
    imageStyle: 'botanical',
    notes: 'Damiana plant leaves'
  },
  {
    ingredientName: 'Dong Quai',
    primarySearch: 'dong quai root',
    alternativeSearch: 'angelica root herb',
    imageStyle: 'botanical',
    notes: 'Dong quai root slices'
  },
  {
    ingredientName: 'Echinacea',
    primarySearch: 'echinacea purple flower',
    alternativeSearch: 'coneflower immune wellness',
    imageStyle: 'botanical',
    notes: 'Purple echinacea flowers - distinctive'
  },
  {
    ingredientName: 'Elderberry',
    primarySearch: 'elderberry dark berries',
    alternativeSearch: 'black berries immune',
    imageStyle: 'natural-source',
    notes: 'Dark elderberries on branch'
  },
  {
    ingredientName: 'Eleuthero',
    primarySearch: 'eleuthero root ginseng',
    alternativeSearch: 'adaptogen root herb',
    imageStyle: 'botanical',
    notes: 'Eleuthero root or plant'
  },
  {
    ingredientName: 'Garlic',
    primarySearch: 'fresh garlic bulb',
    alternativeSearch: 'garlic cloves white',
    imageStyle: 'food-source',
    notes: 'Fresh garlic bulbs or cloves'
  },
  {
    ingredientName: 'Ginger',
    primarySearch: 'ginger root fresh',
    alternativeSearch: 'ginger sliced spice',
    imageStyle: 'natural-source',
    notes: 'Fresh ginger root - golden/tan color'
  },
  {
    ingredientName: 'Ginkgo biloba',
    primarySearch: 'ginkgo leaves golden',
    alternativeSearch: 'ginkgo biloba tree',
    imageStyle: 'botanical',
    notes: 'Distinctive fan-shaped ginkgo leaves'
  },
  {
    ingredientName: 'Goldenseal',
    primarySearch: 'goldenseal root yellow',
    alternativeSearch: 'herbal medicine wellness',
    imageStyle: 'botanical',
    notes: 'Goldenseal root - yellow color'
  },
  {
    ingredientName: 'Hops',
    primarySearch: 'hops flower green',
    alternativeSearch: 'hop cones brewing',
    imageStyle: 'botanical',
    notes: 'Green hop cones - distinctive shape'
  },
  {
    ingredientName: 'Horse Chestnut Seed Extract',
    primarySearch: 'horse chestnut seed',
    alternativeSearch: 'conker seed brown',
    imageStyle: 'botanical',
    notes: 'Brown horse chestnut seeds'
  },
  {
    ingredientName: 'Oregano',
    primarySearch: 'fresh oregano leaves',
    alternativeSearch: 'oregano herb green',
    imageStyle: 'botanical',
    notes: 'Fresh oregano plant with leaves'
  },
  {
    ingredientName: 'Passionflower',
    primarySearch: 'passionflower purple bloom',
    alternativeSearch: 'passiflora flower exotic',
    imageStyle: 'botanical',
    notes: 'Exotic purple passionflower - very distinctive'
  },
  {
    ingredientName: 'Peppermint Oil',
    primarySearch: 'peppermint leaves fresh',
    alternativeSearch: 'mint essential oil',
    imageStyle: 'botanical',
    notes: 'Fresh peppermint leaves or oil bottle'
  },
  {
    ingredientName: 'Rhodiola rosea',
    primarySearch: 'rhodiola plant yellow',
    alternativeSearch: 'rhodiola root adaptogen',
    imageStyle: 'botanical',
    notes: 'Rhodiola plant with yellow flowers'
  },
  {
    ingredientName: 'Rosemary',
    primarySearch: 'fresh rosemary herb',
    alternativeSearch: 'rosemary sprigs green',
    imageStyle: 'botanical',
    notes: 'Fresh rosemary sprigs - needle-like leaves'
  },
  {
    ingredientName: 'Saffron Extract',
    primarySearch: 'saffron threads red',
    alternativeSearch: 'saffron spice golden',
    imageStyle: 'natural-source',
    notes: 'Red saffron threads - luxury spice'
  },
  {
    ingredientName: 'Sage',
    primarySearch: 'sage leaves fresh',
    alternativeSearch: 'sage herb green',
    imageStyle: 'botanical',
    notes: 'Fresh sage leaves - soft green/gray'
  },
  {
    ingredientName: 'Saw Palmetto',
    primarySearch: 'saw palmetto berries',
    alternativeSearch: 'palmetto plant wellness',
    imageStyle: 'botanical',
    notes: 'Saw palmetto berries or plant'
  },
  {
    ingredientName: 'Spearmint Oil',
    primarySearch: 'spearmint leaves fresh',
    alternativeSearch: 'mint leaves green',
    imageStyle: 'botanical',
    notes: 'Fresh spearmint leaves'
  },
  {
    ingredientName: 'Tea',
    primarySearch: 'tea leaves green',
    alternativeSearch: 'tea plantation natural',
    imageStyle: 'natural-source',
    notes: 'Fresh tea leaves or tea plantation'
  },
  {
    ingredientName: 'Thyme',
    primarySearch: 'fresh thyme herb',
    alternativeSearch: 'thyme sprigs green',
    imageStyle: 'botanical',
    notes: 'Fresh thyme sprigs with small leaves'
  },
  {
    ingredientName: 'Turmeric (Curcumin)',
    primarySearch: 'turmeric root golden',
    alternativeSearch: 'turmeric powder orange',
    imageStyle: 'natural-source',
    notes: 'Fresh turmeric root or golden powder'
  },
  {
    ingredientName: 'Valerian',
    primarySearch: 'valerian root plant',
    alternativeSearch: 'valerian flower pink',
    imageStyle: 'botanical',
    notes: 'Valerian root or pink flowers'
  },
  {
    ingredientName: 'Vitex Agnus',
    primarySearch: 'vitex chasteberry purple',
    alternativeSearch: 'vitex plant berries',
    imageStyle: 'botanical',
    notes: 'Purple vitex berries or plant'
  },

  // ========================================
  // ANTIOXIDANTS (16 ingredients)
  // ========================================
  {
    ingredientName: 'Alpha Lipoic Acid',
    primarySearch: 'supplement capsules yellow',
    alternativeSearch: 'antioxidant wellness abstract',
    imageStyle: 'abstract-supplement',
    notes: 'Yellow capsules or abstract antioxidant imagery'
  },
  {
    ingredientName: 'Astaxanthin',
    primarySearch: 'red algae astaxanthin',
    alternativeSearch: 'salmon red pigment',
    imageStyle: 'natural-source',
    notes: 'Red algae or salmon - source of astaxanthin'
  },
  {
    ingredientName: 'Citrus Bioflavonoid Complex',
    primarySearch: 'citrus fruits colorful',
    alternativeSearch: 'orange peel vitamins',
    imageStyle: 'food-source',
    notes: 'Variety of citrus fruits or orange peel'
  },
  {
    ingredientName: 'Coenzyme Q-10',
    primarySearch: 'coq10 supplements capsules',
    alternativeSearch: 'heart health wellness',
    imageStyle: 'abstract-supplement',
    notes: 'CoQ10 capsules or heart health imagery'
  },
  {
    ingredientName: 'EGCG',
    primarySearch: 'green tea matcha',
    alternativeSearch: 'tea leaves antioxidant',
    imageStyle: 'natural-source',
    notes: 'Green tea or matcha powder'
  },
  {
    ingredientName: 'Glutathione',
    primarySearch: 'antioxidant supplement capsules',
    alternativeSearch: 'detox wellness health',
    imageStyle: 'abstract-supplement',
    notes: 'White capsules or detox imagery'
  },
  {
    ingredientName: 'Grape Seed Extract',
    primarySearch: 'grape seeds extract',
    alternativeSearch: 'red grapes antioxidant',
    imageStyle: 'natural-source',
    notes: 'Grape seeds or red grapes'
  },
  {
    ingredientName: 'Green Tea Extract',
    primarySearch: 'green tea leaves',
    alternativeSearch: 'matcha powder green',
    imageStyle: 'natural-source',
    notes: 'Fresh green tea leaves or matcha'
  },
  {
    ingredientName: 'Lutein',
    primarySearch: 'yellow capsules supplements',
    alternativeSearch: 'eye health wellness',
    imageStyle: 'abstract-supplement',
    notes: 'Yellow/orange capsules or eye health imagery'
  },
  {
    ingredientName: 'Lycopene',
    primarySearch: 'tomatoes red fresh',
    alternativeSearch: 'watermelon red fruit',
    imageStyle: 'food-source',
    notes: 'Red tomatoes or watermelon'
  },
  {
    ingredientName: 'N-Acetyl Cysteine',
    primarySearch: 'white supplement capsules',
    alternativeSearch: 'respiratory wellness health',
    imageStyle: 'abstract-supplement',
    notes: 'White capsules or respiratory imagery'
  },
  {
    ingredientName: 'Pine Bark',
    primarySearch: 'pine bark texture',
    alternativeSearch: 'pine tree forest',
    imageStyle: 'botanical',
    notes: 'Pine bark texture or pine tree'
  },
  {
    ingredientName: 'PQQ',
    primarySearch: 'energy supplement capsules',
    alternativeSearch: 'mitochondria wellness abstract',
    imageStyle: 'abstract-supplement',
    notes: 'Capsules or cellular energy imagery'
  },
  {
    ingredientName: 'Quercetin',
    primarySearch: 'onions apples quercetin',
    alternativeSearch: 'yellow supplement capsules',
    imageStyle: 'food-source',
    notes: 'Onions, apples, or yellow capsules'
  },
  {
    ingredientName: 'Resveratrol',
    primarySearch: 'red wine grapes',
    alternativeSearch: 'purple grapes antioxidant',
    imageStyle: 'food-source',
    notes: 'Red wine or purple grapes'
  },
  {
    ingredientName: 'Zeaxanthin',
    primarySearch: 'orange peppers vegetables',
    alternativeSearch: 'eye health supplements',
    imageStyle: 'food-source',
    notes: 'Orange bell peppers or eye health imagery'
  },

  // ========================================
  // PROBIOTICS & ENZYMES (3 ingredients)
  // ========================================
  {
    ingredientName: 'Bifidobacterium Lactis',
    primarySearch: 'probiotic bacteria microscope',
    alternativeSearch: 'gut health wellness',
    imageStyle: 'scientific',
    notes: 'Microscopic bacteria or gut health imagery'
  },
  {
    ingredientName: 'Digestive Enzymes',
    primarySearch: 'digestive enzymes capsules',
    alternativeSearch: 'digestion wellness health',
    imageStyle: 'abstract-supplement',
    notes: 'Capsules or digestive wellness imagery'
  },
  {
    ingredientName: 'Probiotics',
    primarySearch: 'probiotic capsules supplements',
    alternativeSearch: 'fermented foods yogurt',
    imageStyle: 'abstract-supplement',
    notes: 'Probiotic capsules or fermented foods'
  },

  // ========================================
  // PROTEINS & COLLAGEN (7 ingredients)
  // ========================================
  {
    ingredientName: 'Collagen',
    primarySearch: 'collagen powder white',
    alternativeSearch: 'skin health beauty',
    imageStyle: 'abstract-supplement',
    notes: 'White collagen powder or skin health imagery'
  },
  {
    ingredientName: 'Fermented Pea & Rice Protein',
    primarySearch: 'pea protein powder',
    alternativeSearch: 'plant protein vegan',
    imageStyle: 'food-source',
    notes: 'Pea protein powder or legumes'
  },
  {
    ingredientName: 'Free Range Collagen Peptides',
    primarySearch: 'collagen peptides powder',
    alternativeSearch: 'grass fed wellness',
    imageStyle: 'abstract-supplement',
    notes: 'Collagen powder or natural wellness imagery'
  },
  {
    ingredientName: 'Marine Collagen Peptides',
    primarySearch: 'fish collagen ocean',
    alternativeSearch: 'marine wellness supplements',
    imageStyle: 'natural-source',
    notes: 'Ocean/fish imagery or collagen powder'
  },
  {
    ingredientName: 'Protein',
    primarySearch: 'protein powder fitness',
    alternativeSearch: 'protein sources variety',
    imageStyle: 'abstract-supplement',
    notes: 'Protein powder or variety of protein sources'
  },
  {
    ingredientName: 'Soy Protein',
    primarySearch: 'soybeans edamame nutrition',
    alternativeSearch: 'soy protein powder',
    imageStyle: 'food-source',
    notes: 'Soybeans or soy protein powder'
  },
  {
    ingredientName: 'Whey Protein',
    primarySearch: 'whey protein powder',
    alternativeSearch: 'milk dairy nutrition',
    imageStyle: 'abstract-supplement',
    notes: 'Whey protein powder or dairy sources'
  },

  // ========================================
  // FRUITS & VEGETABLES (28 ingredients)
  // ========================================
  {
    ingredientName: 'Acai Berry',
    primarySearch: 'acai berries purple',
    alternativeSearch: 'acai bowl superfood',
    imageStyle: 'natural-source',
    notes: 'Dark purple acai berries'
  },
  {
    ingredientName: 'Aloe Vera',
    primarySearch: 'aloe vera plant',
    alternativeSearch: 'aloe leaf green',
    imageStyle: 'botanical',
    notes: 'Fresh aloe vera plant or leaf'
  },
  {
    ingredientName: 'Apple',
    primarySearch: 'fresh red apples',
    alternativeSearch: 'green apples nutrition',
    imageStyle: 'food-source',
    notes: 'Fresh whole apples'
  },
  {
    ingredientName: 'Barley Grass',
    primarySearch: 'barley grass green',
    alternativeSearch: 'wheat grass juice',
    imageStyle: 'botanical',
    notes: 'Fresh green barley grass'
  },
  {
    ingredientName: 'Bergamot',
    primarySearch: 'bergamot citrus fruit',
    alternativeSearch: 'bergamot orange green',
    imageStyle: 'natural-source',
    notes: 'Bergamot citrus fruit'
  },
  {
    ingredientName: 'Black Currant',
    primarySearch: 'black currant berries',
    alternativeSearch: 'dark berries antioxidant',
    imageStyle: 'natural-source',
    notes: 'Dark black currant berries'
  },
  {
    ingredientName: 'Blackberry',
    primarySearch: 'fresh blackberries',
    alternativeSearch: 'blackberry fruit dark',
    imageStyle: 'food-source',
    notes: 'Fresh blackberries'
  },
  {
    ingredientName: 'Blue-Green Algae',
    primarySearch: 'spirulina algae blue',
    alternativeSearch: 'blue green algae powder',
    imageStyle: 'natural-source',
    notes: 'Blue-green algae or spirulina'
  },
  {
    ingredientName: 'Blueberry',
    primarySearch: 'fresh blueberries',
    alternativeSearch: 'blueberry fruit antioxidant',
    imageStyle: 'food-source',
    notes: 'Fresh blueberries'
  },
  {
    ingredientName: 'Broccoli',
    primarySearch: 'fresh broccoli green',
    alternativeSearch: 'broccoli florets nutrition',
    imageStyle: 'food-source',
    notes: 'Fresh green broccoli'
  },
  {
    ingredientName: 'Brussels Sprouts',
    primarySearch: 'brussels sprouts fresh',
    alternativeSearch: 'brussels sprouts green',
    imageStyle: 'food-source',
    notes: 'Fresh Brussels sprouts'
  },
  {
    ingredientName: 'Cherry',
    primarySearch: 'fresh cherries red',
    alternativeSearch: 'cherry fruit antioxidant',
    imageStyle: 'food-source',
    notes: 'Fresh red cherries'
  },
  {
    ingredientName: 'Chlorella',
    primarySearch: 'chlorella algae green',
    alternativeSearch: 'chlorella powder supplement',
    imageStyle: 'natural-source',
    notes: 'Green chlorella algae or powder'
  },
  {
    ingredientName: 'Chokeberry',
    primarySearch: 'chokeberry aronia dark',
    alternativeSearch: 'dark berries superfood',
    imageStyle: 'natural-source',
    notes: 'Dark aronia/chokeberries'
  },
  {
    ingredientName: 'Cranberry',
    primarySearch: 'fresh cranberries red',
    alternativeSearch: 'cranberry fruit health',
    imageStyle: 'food-source',
    notes: 'Fresh red cranberries'
  },
  {
    ingredientName: 'Grape Skin',
    primarySearch: 'red grape skin',
    alternativeSearch: 'purple grapes fresh',
    imageStyle: 'food-source',
    notes: 'Red/purple grape skins or grapes'
  },
  {
    ingredientName: 'Kale',
    primarySearch: 'fresh kale leaves',
    alternativeSearch: 'kale superfood green',
    imageStyle: 'food-source',
    notes: 'Fresh curly kale leaves'
  },
  {
    ingredientName: 'Mustard Seed',
    primarySearch: 'mustard seeds yellow',
    alternativeSearch: 'mustard seeds brown',
    imageStyle: 'natural-source',
    notes: 'Yellow or brown mustard seeds'
  },
  {
    ingredientName: 'Pomegranate',
    primarySearch: 'pomegranate seeds red',
    alternativeSearch: 'pomegranate fruit fresh',
    imageStyle: 'food-source',
    notes: 'Red pomegranate seeds or fruit'
  },
  {
    ingredientName: 'Raspberry',
    primarySearch: 'fresh raspberries red',
    alternativeSearch: 'raspberry fruit antioxidant',
    imageStyle: 'food-source',
    notes: 'Fresh red raspberries'
  },
  {
    ingredientName: 'Red Cabbage',
    primarySearch: 'red cabbage purple',
    alternativeSearch: 'purple cabbage fresh',
    imageStyle: 'food-source',
    notes: 'Purple/red cabbage'
  },
  {
    ingredientName: 'Red Wine',
    primarySearch: 'red wine glass',
    alternativeSearch: 'wine grapes antioxidant',
    imageStyle: 'food-source',
    notes: 'Red wine in glass or red grapes'
  },
  {
    ingredientName: 'Spirulina',
    primarySearch: 'spirulina powder blue',
    alternativeSearch: 'spirulina algae superfood',
    imageStyle: 'natural-source',
    notes: 'Blue-green spirulina powder'
  },
  {
    ingredientName: 'Strawberry',
    primarySearch: 'fresh strawberries red',
    alternativeSearch: 'strawberry fruit nutrition',
    imageStyle: 'food-source',
    notes: 'Fresh red strawberries'
  },
  {
    ingredientName: 'Wasabi',
    primarySearch: 'wasabi root green',
    alternativeSearch: 'wasabi paste japanese',
    imageStyle: 'natural-source',
    notes: 'Fresh wasabi root or paste'
  },
  {
    ingredientName: 'Wheat Grass',
    primarySearch: 'wheat grass green',
    alternativeSearch: 'wheatgrass juice powder',
    imageStyle: 'botanical',
    notes: 'Fresh green wheat grass'
  },
  {
    ingredientName: 'White Tea',
    primarySearch: 'white tea leaves',
    alternativeSearch: 'tea leaves delicate',
    imageStyle: 'natural-source',
    notes: 'Delicate white tea leaves'
  },

  // ========================================
  // SPECIALTY & OTHER (30 ingredients)
  // ========================================
  {
    ingredientName: 'Berberine',
    primarySearch: 'berberine yellow supplement',
    alternativeSearch: 'goldenseal barberry root',
    imageStyle: 'botanical',
    notes: 'Yellow berberine or source plants'
  },
  {
    ingredientName: 'Berberine Phospholipid Complex',
    primarySearch: 'supplement capsules yellow',
    alternativeSearch: 'berberine wellness health',
    imageStyle: 'abstract-supplement',
    notes: 'Yellow capsules or supplement imagery'
  },
  {
    ingredientName: 'Choline',
    primarySearch: 'eggs lecithin nutrition',
    alternativeSearch: 'brain health supplements',
    imageStyle: 'food-source',
    notes: 'Eggs or choline-rich foods'
  },
  {
    ingredientName: 'Chondroitin Sulfate',
    primarySearch: 'joint health supplements',
    alternativeSearch: 'cartilage health wellness',
    imageStyle: 'abstract-supplement',
    notes: 'Joint health capsules or imagery'
  },
  {
    ingredientName: 'D-Mannose',
    primarySearch: 'white powder supplement',
    alternativeSearch: 'urinary health wellness',
    imageStyle: 'abstract-supplement',
    notes: 'White powder or urinary health imagery'
  },
  {
    ingredientName: 'Daidzein',
    primarySearch: 'soy isoflavones supplement',
    alternativeSearch: 'soybean nutrition wellness',
    imageStyle: 'food-source',
    notes: 'Soybeans or isoflavone supplements'
  },
  {
    ingredientName: 'DHEA',
    primarySearch: 'hormone supplement capsules',
    alternativeSearch: 'wellness aging health',
    imageStyle: 'abstract-supplement',
    notes: 'Capsules or wellness imagery'
  },
  {
    ingredientName: 'Diosmin',
    primarySearch: 'citrus bioflavonoid supplement',
    alternativeSearch: 'vein health wellness',
    imageStyle: 'abstract-supplement',
    notes: 'Supplement or vein health imagery'
  },
  {
    ingredientName: 'Genistein',
    primarySearch: 'soy isoflavones nutrition',
    alternativeSearch: 'edamame soybeans fresh',
    imageStyle: 'food-source',
    notes: 'Soybeans or soy products'
  },
  {
    ingredientName: 'Glucosamine Sulfate',
    primarySearch: 'glucosamine supplement capsules',
    alternativeSearch: 'joint health wellness',
    imageStyle: 'abstract-supplement',
    notes: 'White capsules or joint health imagery'
  },
  {
    ingredientName: 'Guarana',
    primarySearch: 'guarana seeds red',
    alternativeSearch: 'guarana plant energy',
    imageStyle: 'botanical',
    notes: 'Red guarana seeds or plant'
  },
  {
    ingredientName: 'Hesperidin',
    primarySearch: 'orange peel citrus',
    alternativeSearch: 'citrus bioflavonoids supplement',
    imageStyle: 'food-source',
    notes: 'Orange peel or citrus'
  },
  {
    ingredientName: 'Huperzine Extract',
    primarySearch: 'supplement capsules brain',
    alternativeSearch: 'memory wellness health',
    imageStyle: 'abstract-supplement',
    notes: 'Capsules or brain health imagery'
  },
  {
    ingredientName: 'Indole-3-Carbinol',
    primarySearch: 'cruciferous vegetables broccoli',
    alternativeSearch: 'broccoli cabbage nutrition',
    imageStyle: 'food-source',
    notes: 'Broccoli, cabbage, or cruciferous veggies'
  },
  {
    ingredientName: 'Melatonin',
    primarySearch: 'melatonin supplement sleep',
    alternativeSearch: 'sleep wellness night',
    imageStyle: 'abstract-supplement',
    notes: 'Melatonin tablets or sleep imagery'
  },
  {
    ingredientName: 'MSM',
    primarySearch: 'msm supplement powder',
    alternativeSearch: 'joint health wellness',
    imageStyle: 'abstract-supplement',
    notes: 'White MSM powder or capsules'
  },
  {
    ingredientName: 'Mushroom Blend',
    primarySearch: 'medicinal mushrooms variety',
    alternativeSearch: 'reishi shiitake mushrooms',
    imageStyle: 'botanical',
    notes: 'Variety of medicinal mushrooms'
  },
  {
    ingredientName: 'Parsley Seed, oil',
    primarySearch: 'fresh parsley herb',
    alternativeSearch: 'parsley seeds green',
    imageStyle: 'botanical',
    notes: 'Fresh parsley or seeds'
  },
  {
    ingredientName: 'Phosphatidyl Choline',
    primarySearch: 'lecithin supplement capsules',
    alternativeSearch: 'brain health wellness',
    imageStyle: 'abstract-supplement',
    notes: 'Softgel capsules or brain imagery'
  },
  {
    ingredientName: 'Phosphatidyl Serine',
    primarySearch: 'brain supplement capsules',
    alternativeSearch: 'memory wellness health',
    imageStyle: 'abstract-supplement',
    notes: 'Capsules or cognitive health imagery'
  },
  {
    ingredientName: 'Phytoceramides',
    primarySearch: 'skin supplement wellness',
    alternativeSearch: 'beauty wellness capsules',
    imageStyle: 'abstract-supplement',
    notes: 'Capsules or skin health imagery'
  },
  {
    ingredientName: 'Phytosterols',
    primarySearch: 'plant sterols supplement',
    alternativeSearch: 'heart health wellness',
    imageStyle: 'abstract-supplement',
    notes: 'Capsules or heart health imagery'
  },
  {
    ingredientName: 'Psyllium Husk Powder',
    primarySearch: 'psyllium husk fiber',
    alternativeSearch: 'fiber powder supplement',
    imageStyle: 'natural-source',
    notes: 'Psyllium husk or fiber powder'
  },
  {
    ingredientName: 'Royal Jelly',
    primarySearch: 'royal jelly honeycomb',
    alternativeSearch: 'bee royal jelly',
    imageStyle: 'natural-source',
    notes: 'Royal jelly or honeycomb'
  },
  {
    ingredientName: 'Rutin',
    primarySearch: 'buckwheat rutin nutrition',
    alternativeSearch: 'citrus bioflavonoids supplement',
    imageStyle: 'food-source',
    notes: 'Buckwheat or citrus sources'
  },
  {
    ingredientName: 'Silymarin',
    primarySearch: 'milk thistle purple',
    alternativeSearch: 'milk thistle seeds',
    imageStyle: 'botanical',
    notes: 'Purple milk thistle flower'
  },
  {
    ingredientName: 'Soy Isoflavones',
    primarySearch: 'soybeans edamame nutrition',
    alternativeSearch: 'soy supplement capsules',
    imageStyle: 'food-source',
    notes: 'Soybeans or edamame'
  },
  {
    ingredientName: 'UC-II® Chicken Cartilage',
    primarySearch: 'joint health supplements',
    alternativeSearch: 'cartilage wellness health',
    imageStyle: 'abstract-supplement',
    notes: 'Capsules or joint health imagery'
  },
  {
    ingredientName: 'Vinpocetine',
    primarySearch: 'brain supplement capsules',
    alternativeSearch: 'periwinkle plant purple',
    imageStyle: 'abstract-supplement',
    notes: 'Capsules or source plant (periwinkle)'
  },
];

// Helper to get image config by ingredient name
export function getIngredientImageConfig(ingredientName: string): IngredientImageConfig | undefined {
  return ingredientImageConfigs.find(config => 
    config.ingredientName.toLowerCase() === ingredientName.toLowerCase()
  );
}

// Group configs by image style for easy browsing
export function getIngredientsByImageStyle(style: IngredientImageConfig['imageStyle']): IngredientImageConfig[] {
  return ingredientImageConfigs.filter(config => config.imageStyle === style);
}
