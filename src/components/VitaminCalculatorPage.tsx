import { useState, useEffect } from 'react';
import { X, Download, Plus } from 'lucide-react';
import CollectionBanner from './CollectionBanner';
import vitaminCalculatorBannerImage from "figma:asset/d84eb6d70420a865a54ad43153f0d93b2ad5ddb2.png";
import imgImage from "figma:asset/ca2f3f644a7edcdbe62dc09c7fd5d2712d8e3429.png";
import { Checkbox } from "./ui/checkbox";

// Andrew Lessman ProCaps product list organized alphabetically
const products: { name: string; formulation: string }[] = [
  { name: '5-HTP 100', formulation: 'Capsule' },
  { name: 'A.M. Activator™', formulation: 'Capsule' },
  { name: 'A.M. Activator™ and P.M. Relaxation™ Kit', formulation: 'Kit' },
  { name: 'Acetyl L-Carnitine 400', formulation: 'Capsule' },
  { name: 'Ahiflower® Oil Omega-3 with GLA', formulation: 'Oil' },
  { name: 'ALA + NAC', formulation: 'Capsule' },
  { name: 'Algal DHA 250', formulation: 'Capsule' },
  { name: 'Aloe Vera 200', formulation: 'Capsule' },
  { name: 'Aloe Vera 200 Ginger Root 200', formulation: 'Capsule' },
  { name: 'Aloe Vera 400', formulation: 'Capsule' },
  { name: 'Alpha Lipoic Acid ALA 400', formulation: 'Capsule' },
  { name: 'Andrew\'s Five Favorites™', formulation: 'Kit' },
  { name: 'Ashwagandha', formulation: 'Capsule' },
  { name: 'Ashwagandha + Theanine', formulation: 'Capsule' },
  { name: 'Astaxanthin 12', formulation: 'Capsule' },
  { name: 'Astaxanthin 4000', formulation: 'Capsule' },
  { name: 'Bean & Vegetable Gas Relief', formulation: 'Capsule' },
  { name: 'Berberine Phospholipid Complex', formulation: 'Capsule' },
  { name: 'Bergamot 375', formulation: 'Capsule' },
  { name: 'Body Fuel®', formulation: 'Capsule' },
  { name: 'Bone & Body Factors™', formulation: 'Capsule' },
  { name: 'Bone & Body Factors™ (Packets)', formulation: 'Packets' },
  { name: 'Book Kit - The End of Mental Illness by Daniel G. Amen, MD', formulation: 'Kit' },
  { name: 'Book Kit - Your Brain is Always Listening by Daniel G. Amen, MD', formulation: 'Kit' },
  { name: 'Branched Chain Amino Acids', formulation: 'Capsule' },
  { name: 'Breast Health™', formulation: 'Capsule' },
  { name: 'Breath Plus™', formulation: 'Capsule' },
  { name: 'Calcium Intensive Care™', formulation: 'Capsule' },
  { name: 'Calcium Magnesium Intensive Care™', formulation: 'Capsule' },
  { name: 'CarniSlim™ 250', formulation: 'Capsule' },
  { name: 'ChocoNuvo™ 66% Cacao Mild Dark Chocolate', formulation: 'Chocolate' },
  { name: 'ChocoNuvo™ 74% Cacao Dark Chocolate', formulation: 'Chocolate' },
  { name: 'ChocoNuvo™ 91% Cacao Extreme Dark Chocolate', formulation: 'Chocolate' },
  { name: 'ChocoNuvo™ Café 66% Cacao Mild Dark Chocolate', formulation: 'Chocolate' },
  { name: 'ChocoNuvo™ Café 74% Cacao Dark Chocolate', formulation: 'Chocolate' },
  { name: 'ChocoNuvo™ Café 91% Cacao Extreme Dark Chocolate', formulation: 'Chocolate' },
  { name: 'CholestaCare™', formulation: 'Capsule' },
  { name: 'CholestaCare™ plus Fibermucil™', formulation: 'Capsule' },
  { name: 'Cinnamon 400™', formulation: 'Capsule' },
  { name: 'Circulation & Vein Support™ for Healthy Legs', formulation: 'Capsule' },
  { name: 'CoEnzyme Q-10 100 mg', formulation: 'Capsule' },
  { name: 'CoEnzyme Q-10 200 + PQQ 20', formulation: 'Capsule' },
  { name: 'CoEnzyme Q-10 200 mg', formulation: 'Capsule' },
  { name: 'CoEnzyme Q-10 200 mg with Vitamin D3-1000', formulation: 'Capsule' },
  { name: 'CoEnzyme Q-10 200 mg with Vitamin D3-2000', formulation: 'Capsule' },
  { name: 'CoEnzyme Q-10 300 mg', formulation: 'Capsule' },
  { name: 'Complete Digestion Kit', formulation: 'Kit' },
  { name: 'Complete Joint Effort®', formulation: 'Capsule' },
  { name: 'Complete Tocotrienols with Gamma Vitamin E™', formulation: 'Capsule' },
  { name: 'Cranberry Benefits™', formulation: 'Capsule' },
  { name: 'Cranberry with D-Mannose', formulation: 'Capsule' },
  { name: 'Creatine 5000', formulation: 'Powder' },
  { name: 'Cruciferous Extracts™', formulation: 'Capsule' },
  { name: 'Cruciferous Extracts™ Powder', formulation: 'Powder' },
  { name: 'D-Mannose 500', formulation: 'Capsule' },
  { name: 'Dairy & Lactose Tolerance™', formulation: 'Capsule' },
  { name: 'DHEA 25', formulation: 'Capsule' },
  { name: 'Digest Assure™', formulation: 'Capsule' },
  { name: 'Efficient C™ Mixed Berry', formulation: 'Capsule' },
  { name: 'Efficient C™ plus Cranberry Benefits', formulation: 'Capsule' },
  { name: 'Energy & Fat Metabolism Factors™', formulation: 'Capsule' },
  { name: 'Essential 1™ nuonce® max + CoQ10 100mg', formulation: 'Capsule' },
  { name: 'Essential 1™ nuonce® max with 1000 IU Vitamin D3', formulation: 'Capsule' },
  { name: 'Essential 1™ nuonce® max with 2000 IU Vitamin D3', formulation: 'Capsule' },
  { name: 'Essential 1™ nuonce® max with 3000 IU Vitamin D3', formulation: 'Capsule' },
  { name: 'Essential 1™ nuonce® max with 5000 IU Vitamin D3', formulation: 'Capsule' },
  { name: 'Essential Amino Protein™', formulation: 'Capsule' },
  { name: 'Essential Omega-3™ - No Fishy Taste - Mint', formulation: 'Capsule' },
  { name: 'Essential Omega-3™ - No Fishy Taste - Orange', formulation: 'Capsule' },
  { name: 'Essential Omega-3™ - Unflavored', formulation: 'Capsule' },
  { name: 'Evening Primrose and Black Currant Seed Oil™', formulation: 'Oil' },
  { name: 'Fiber Benefits™', formulation: 'Capsule' },
  { name: 'Fibermucil™', formulation: 'Capsule' },
  { name: 'Free Range Collagen Peptides™', formulation: 'Capsule' },
  { name: 'Free Range Collagen Peptides™ with MSM', formulation: 'Capsule' },
  { name: 'Friendly Flora Probiotic', formulation: 'Capsule' },
  { name: 'Fruit Full Anti-Oxidant Extracts™', formulation: 'Capsule' },
  { name: 'Fruit Full Anti-Oxidant Extracts™ Powder', formulation: 'Powder' },
  { name: 'Gamma Vitamin E', formulation: 'Capsule' },
  { name: 'Garlic Extract', formulation: 'Capsule' },
  { name: 'Ginger 450', formulation: 'Capsule' },
  { name: 'Ginkgo 120 plus Ginseng 200™', formulation: 'Capsule' },
  { name: 'Ginkgo Biloba 120™', formulation: 'Capsule' },
  { name: 'Ginseng 200™', formulation: 'Capsule' },
  { name: 'Glucosamine 1500 Chondroitin 1200', formulation: 'Capsule' },
  { name: 'Glucosamine 1500 Chondroitin 1200 Bulk Powder', formulation: 'Powder' },
  { name: 'Glucosamine 1500 Chondroitin 1200 plus UC-II®', formulation: 'Capsule' },
  { name: 'Glucosamine 1500 Chondroitin 1200 plus UC-II® Bulk Powder', formulation: 'Powder' },
  { name: 'Glucosamine Sulfate 1500™', formulation: 'Capsule' },
  { name: 'Glutamine 500', formulation: 'Capsule' },
  { name: 'Glutathione', formulation: 'Capsule' },
  { name: 'Glycine 600™', formulation: 'Capsule' },
  { name: 'Grape Seed Extract', formulation: 'Capsule' },
  { name: 'Green Foods Complex™', formulation: 'Capsule' },
  { name: 'Green Foods Complex™ Powder', formulation: 'Powder' },
  { name: 'Green Tea EGCG 200™', formulation: 'Capsule' },
  { name: 'Green Tea EGCG and Cranberry™', formulation: 'Capsule' },
  { name: 'Healthy Hair, Skin & Nails™', formulation: 'Capsule' },
  { name: 'High Potency Complete B-Complex', formulation: 'Capsule' },
  { name: 'Immune Factors + Immune Mushroom Complex Kit', formulation: 'Kit' },
  { name: 'Immune Factors™', formulation: 'Capsule' },
  { name: 'Immune Mushroom Complex', formulation: 'Capsule' },
  { name: 'Iron +™', formulation: 'Capsule' },
  { name: 'Lincoln\'s Own™Joint Benefits for Dogs', formulation: 'Capsule' },
  { name: 'Lincoln\'s Own™Joint Benefits for Dogs plus UC-II', formulation: 'Capsule' },
  { name: 'Lion\'s Mane', formulation: 'Capsule' },
  { name: 'Liver Anti-Oxidant Extracts™', formulation: 'Capsule' },
  { name: 'Lutein 12™', formulation: 'Capsule' },
  { name: 'Lycopene 10™', formulation: 'Capsule' },
  { name: 'Lysine 350™', formulation: 'Capsule' },
  { name: 'Magnesium Bisglycinate', formulation: 'Capsule' },
  { name: 'Magnesium Intensive Care™', formulation: 'Capsule' },
  { name: 'Marine & Free Range Collagen Peptides™ with MSM', formulation: 'Capsule' },
  { name: 'Marine Collagen Peptides™', formulation: 'Capsule' },
  { name: 'Marine Collagen Peptides™ with MSM', formulation: 'Capsule' },
  { name: 'Maximum Essential Omega-3™ - Mint', formulation: 'Capsule' },
  { name: 'Maximum Essential Omega-3™ - Orange', formulation: 'Capsule' },
  { name: 'Maximum Essential Omega-3™ - Unflavored', formulation: 'Capsule' },
  { name: 'Maximum Joint Effort®', formulation: 'Capsule' },
  { name: 'Maximum Joint Effort® (Packets)', formulation: 'Packets' },
  { name: 'Maximum L+Z™', formulation: 'Capsule' },
  { name: 'Maximum L+Z™ with Astaxanthin', formulation: 'Capsule' },
  { name: 'Melatonin 3', formulation: 'Capsule' },
  { name: 'Memory & Brain', formulation: 'Capsule' },
  { name: 'Memory & Brain + ALC 400 Kit', formulation: 'Kit' },
  { name: 'Methyl Folate 1000', formulation: 'Capsule' },
  { name: 'Million ORAC™', formulation: 'Capsule' },
  { name: 'MSM 500 Methyl-Sulfonyl-Methane', formulation: 'Capsule' },
  { name: 'Multivitamin - Complete™', formulation: 'Capsule' },
  { name: 'Multivitamin - Elite 100™', formulation: 'Capsule' },
  { name: 'Multivitamin - Men\'s Elite 100™', formulation: 'Capsule' },
  { name: 'Multivitamin - Men\'s Elite 100™ with Maximum Essential Omega-3 1000 mg', formulation: 'Capsule' },
  { name: 'Multivitamin - Men\'s Elite 100™ with Maximum Essential Omega-3 500 mg', formulation: 'Capsule' },
  { name: 'Multivitamin - Men\'s Elite 200™', formulation: 'Capsule' },
  { name: 'Multivitamin - Women\'s Elite-200™', formulation: 'Capsule' },
  { name: 'Multivitamin - Women\'s Founders™', formulation: 'Capsule' },
  { name: 'Multivitamin - Women\'s Founders™ (30 Packet Bag)', formulation: 'Packets' },
  { name: 'NAC 500 N-Acetyl Cysteine', formulation: 'Capsule' },
  { name: 'NightTime™', formulation: 'Capsule' },
  { name: 'Olive Complex™', formulation: 'Capsule' },
  { name: 'Oxy-Energizer™', formulation: 'Capsule' },
  { name: 'PC Liver & Brain Benefits + Liver Anti-Oxidants Kit', formulation: 'Kit' },
  { name: 'Phosphatidyl Choline PC Liver & Brain Benefits™', formulation: 'Capsule' },
  { name: 'Phytoceramides', formulation: 'Capsule' },
  { name: 'Pine Bark OPC', formulation: 'Capsule' },
  { name: 'Pomegranate 40-40 Complex™', formulation: 'Capsule' },
  { name: 'Positive Passage™', formulation: 'Capsule' },
  { name: 'PQQ 20', formulation: 'Capsule' },
  { name: 'Prenatal Essentials™', formulation: 'Capsule' },
  { name: 'Prostate Support™', formulation: 'Capsule' },
  { name: 'PS 100 Phosphatidyl Serine', formulation: 'Capsule' },
  { name: 'PS 200 Phosphatidyl Serine', formulation: 'Capsule' },
  { name: 'Quercetin 500', formulation: 'Capsule' },
  { name: 'Resveratrol 100 with Green Tea 100 Grape Seed 100 Pomegranate 100', formulation: 'Capsule' },
  { name: 'Resveratrol 100™', formulation: 'Capsule' },
  { name: 'Resveratrol 100™ with EGCG 100™', formulation: 'Capsule' },
  { name: 'Resveratrol 200', formulation: 'Capsule' },
  { name: 'Rhodiola 250™', formulation: 'Capsule' },
  { name: 'Saffron 20', formulation: 'Capsule' },
  { name: 'Secure® Bars 40g - Chocolate', formulation: 'Bar' },
  { name: 'Secure® Bars 40g - Coconut', formulation: 'Bar' },
  { name: 'Secure® Bars 40g - Peanut Butter', formulation: 'Bar' },
  { name: 'Secure® Bars 40g - Variety Packs', formulation: 'Packets' },
  { name: 'Secure® Bars 60g - Chocolate Brownie Almond Crunch', formulation: 'Bar' },
  { name: 'Secure® Bars 60g - Coconut Almond Cookie Crunch', formulation: 'Bar' },
  { name: 'Secure® Bars 60g - Peanut Butter Chocolate Chip', formulation: 'Bar' },
  { name: 'Secure® Bars 60g - Variety Packs', formulation: 'Packets' },
  { name: 'Secure® MCP Complete Meal Replacement - Chocolate', formulation: 'Meal Replacement' },
  { name: 'Secure® MCP Complete Meal Replacement - Coffee', formulation: 'Meal Replacement' },
  { name: 'Secure® MCP Complete Meal Replacement - Vanilla', formulation: 'Meal Replacement' },
  { name: 'Secure® Soy Complete Meal Replacement - Chocolate', formulation: 'Meal Replacement' },
  { name: 'Secure® Soy Complete Meal Replacement - Coffee', formulation: 'Meal Replacement' },
  { name: 'Secure® Soy Complete Meal Replacement - Mixed Berry', formulation: 'Meal Replacement' },
  { name: 'Secure® Soy Complete Meal Replacement - Piña Colada', formulation: 'Meal Replacement' },
  { name: 'Secure® Soy Complete Meal Replacement - Vanilla', formulation: 'Meal Replacement' },
  { name: 'Secure® Soy Complete Meal Replacement TS 2026', formulation: 'Meal Replacement' },
  { name: 'Secure® Whey Complete Meal Replacement - Chocolate', formulation: 'Meal Replacement' },
  { name: 'Secure® Whey Complete Meal Replacement - Coffee', formulation: 'Meal Replacement' },
  { name: 'Secure® Whey Complete Meal Replacement - Vanilla', formulation: 'Meal Replacement' },
  { name: 'Spice of Life™', formulation: 'Capsule' },
  { name: 'Sucress™ Non-Caloric Sweetener', formulation: 'Capsule' },
  { name: 'Taurine 600', formulation: 'Capsule' },
  { name: 'Tea - Chamomile and Peppermint Tea', formulation: 'Tea' },
  { name: 'Tea - Earl Grey Green Tea', formulation: 'Tea' },
  { name: 'Tea - Egyptian Golden Chamomile Tea', formulation: 'Tea' },
  { name: 'Tea - Jasmine Infused Green Tea', formulation: 'Tea' },
  { name: 'Tea - Peppermint Sencha Green Tea', formulation: 'Tea' },
  { name: 'Tea - Peppermint Tea', formulation: 'Tea' },
  { name: 'Tea - Sencha Green Tea', formulation: 'Tea' },
  { name: 'Tea - Variety Kit - Earl Grey Green Tea & Peppermint Tea', formulation: 'Kit' },
  { name: 'Tea - Variety Kit - Egyptian Golden Chamomile Tea & Peppermint Tea', formulation: 'Kit' },
  { name: 'Tea - Variety Kit - Green Tea Variety Kit', formulation: 'Kit' },
  { name: 'Tea - Variety Kit - Jasmine Green Tea & Earl Grey Green Tea', formulation: 'Kit' },
  { name: 'Tea - Variety Kit - Jasmine Green Tea & Peppermint Tea', formulation: 'Kit' },
  { name: 'Tea - Variety Kit - Jasmine Green Tea, Earl Grey Green Tea & Peppermint Tea', formulation: 'Kit' },
  { name: 'Theanine', formulation: 'Capsule' },
  { name: 'Turkey Tail', formulation: 'Capsule' },
  { name: 'Turmeric & Ginger Extracts', formulation: 'Capsule' },
  { name: 'Turmeric 400™', formulation: 'Capsule' },
  { name: 'Type 2 Secure® Bars 40g Sweetened with Stevia - Chocolate', formulation: 'Bar' },
  { name: 'Type 2 Secure® Bars 40g Sweetened with Stevia - Coconut', formulation: 'Bar' },
  { name: 'Type 2 Secure® Bars 40g Sweetened with Stevia - Peanut Butter', formulation: 'Bar' },
  { name: 'Type 2 Secure® Bars 40g Sweetened with Stevia - Variety', formulation: 'Packets' },
  { name: 'Type 2 Secure® Bars 40g Sweetened with Sucralose - Chocolate', formulation: 'Bar' },
  { name: 'Type 2 Secure® Bars 40g Sweetened with Sucralose - Coconut', formulation: 'Bar' },
  { name: 'Type 2 Secure® Bars 40g Sweetened with Sucralose - Peanut Butter', formulation: 'Bar' },
  { name: 'Type 2 Secure® Bars 40g Sweetened with Sucralose - Variety', formulation: 'Packets' },
  { name: 'Ultimate Açai Berry Extracts™', formulation: 'Capsule' },
  { name: 'Ultimate Anti-Oxidant Extracts™', formulation: 'Capsule' },
  { name: 'Ultimate Calcium Intensive Care™', formulation: 'Capsule' },
  { name: 'Ultimate Calcium-Magnesium Intensive Care™', formulation: 'Capsule' },
  { name: 'Ultimate Eye Support®', formulation: 'Capsule' },
  { name: 'Ultimate Eye Support® with Astaxanthin', formulation: 'Capsule' },
  { name: 'Ultimate Friendly Flora Probiotic', formulation: 'Capsule' },
  { name: 'Ultimate Gamma Vitamin E™', formulation: 'Capsule' },
  { name: 'Ultimate Oat Bran™', formulation: 'Capsule' },
  { name: 'Ultimate Oatmeal™', formulation: 'Capsule' },
  { name: 'Ultimate Plant Protein™', formulation: 'Capsule' },
  { name: 'Ultimate Whey Protein Isolate™ - Unflavored', formulation: 'Capsule' },
  { name: 'Ultimate Women\'s Wellness™', formulation: 'Capsule' },
  { name: 'Urgent Energy™', formulation: 'Capsule' },
  { name: 'Valerian 250™', formulation: 'Capsule' },
  { name: 'Vitamin B12 100™', formulation: 'Capsule' },
  { name: 'Vitamin B12 250™', formulation: 'Capsule' },
  { name: 'Vitamin B12 500™', formulation: 'Capsule' },
  { name: 'Vitamin C 500 + B-Complex', formulation: 'Capsule' },
  { name: 'Vitamin C 500 Complex™', formulation: 'Capsule' },
  { name: 'Vitamin D3 10,000', formulation: 'Capsule' },
  { name: 'Vitamin D3 1000 plus Calcium Intensive Care™', formulation: 'Capsule' },
  { name: 'Vitamin D3 1000™', formulation: 'Capsule' },
  { name: 'Vitamin D3 2000™', formulation: 'Capsule' },
  { name: 'Vitamin D3 3000™', formulation: 'Capsule' },
  { name: 'Vitamin D3 4000™', formulation: 'Capsule' },
  { name: 'Vitamin D3 5000™', formulation: 'Capsule' },
  { name: 'Vitamin K2 MK-7 120 mcg', formulation: 'Capsule' },
  { name: 'Vitamin K2 MK-7 240 mcg', formulation: 'Capsule' },
  { name: 'Vitamin K2 MK-7 60 mcg', formulation: 'Capsule' },
  { name: 'Wellness Mushroom Complex', formulation: 'Capsule' },
  { name: 'White Mulberry Leaf', formulation: 'Capsule' },
  { name: 'White Mulberry Leaf with Cinnamon', formulation: 'Capsule' },
  { name: 'Women\'s Wellness™', formulation: 'Capsule' },
  { name: 'World Health™', formulation: 'Capsule' },
  { name: 'Zinc 30', formulation: 'Capsule' }
];

export default function VitaminCalculatorPage() {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [showComparison, setShowComparison] = useState(false);
  const [activeLetter, setActiveLetter] = useState<string>('A');
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Group products by first letter
  const productsByLetter: Record<string, typeof products> = {};
  
  products.forEach(product => {
    const firstChar = product.name[0].toUpperCase();
    // Map numbers and special characters to '#'
    const firstLetter = /[A-Z]/.test(firstChar) ? firstChar : '#';
    if (!productsByLetter[firstLetter]) {
      productsByLetter[firstLetter] = [];
    }
    productsByLetter[firstLetter].push(product);
  });
  
  // Sort products within each letter group
  Object.keys(productsByLetter).forEach(letter => {
    productsByLetter[letter].sort((a, b) => a.name.localeCompare(b.name));
  });
  
  // Sort letters with # first
  const allLetters = Object.keys(productsByLetter).sort((a, b) => {
    if (a === '#') return -1;
    if (b === '#') return 1;
    return a.localeCompare(b);
  });

  const nutrients = [
    'Calories',
    'Total Fat',
    'Saturated Fat',
    'Trans Fat',
    'Cholesterol',
    'Sodium',
    'Potassium',
    'Total Carbohydrate',
    'Dietary Fiber',
    'Protein',
    'Vitamin C',
    'Vitamin D3',
    'Vitamin E',
    'Vitamin B1',
    'Vitamin B2',
    'Niacin',
    'Vitamin B6'
  ];

  // Mock nutritional data per serving for each product
  const mockNutritionData: Record<string, Record<string, { amount: string; dailyValue: string }>> = {
    'default': {
      'Calories': { amount: '5', dailyValue: '0%' },
      'Total Fat': { amount: '0g', dailyValue: '0%' },
      'Saturated Fat': { amount: '0g', dailyValue: '0%' },
      'Trans Fat': { amount: '0g', dailyValue: '0%' },
      'Cholesterol': { amount: '0mg', dailyValue: '0%' },
      'Sodium': { amount: '5mg', dailyValue: '0%' },
      'Potassium': { amount: '15mg', dailyValue: '0%' },
      'Total Carbohydrate': { amount: '1g', dailyValue: '0%' },
      'Dietary Fiber': { amount: '0g', dailyValue: '0%' },
      'Protein': { amount: '0g', dailyValue: '0%' },
      'Vitamin C': { amount: '60mg', dailyValue: '100%' },
      'Vitamin D3': { amount: '25mcg', dailyValue: '125%' },
      'Vitamin E': { amount: '30mg', dailyValue: '200%' },
      'Vitamin B1': { amount: '1.5mg', dailyValue: '125%' },
      'Vitamin B2': { amount: '1.7mg', dailyValue: '130%' },
      'Niacin': { amount: '20mg', dailyValue: '125%' },
      'Vitamin B6': { amount: '2mg', dailyValue: '117%' },
    }
  };

  // Scroll to section smoothly
  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const letter of allLetters) {
        const element = document.getElementById(`letter-${letter}`);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLetter(letter);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
      const newQuantities = { ...productQuantities };
      delete newQuantities[productId];
      setProductQuantities(newQuantities);
    } else {
      newSelected.add(productId);
      setProductQuantities({ ...productQuantities, [productId]: 1 });
    }
    setSelectedProducts(newSelected);
  };

  const handleCompare = () => {
    if (selectedProducts.size >= 2) {
      setShowComparison(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeComparison = () => {
    setShowComparison(false);
    document.body.style.overflow = 'auto';
  };

  const removeProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    newSelected.delete(productId);
    setSelectedProducts(newSelected);
    
    const newQuantities = { ...productQuantities };
    delete newQuantities[productId];
    setProductQuantities(newQuantities);
    
    if (newSelected.size < 2) {
      closeComparison();
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    const currentQty = productQuantities[productId] || 1;
    const newQty = Math.max(1, currentQty + delta);
    setProductQuantities({ ...productQuantities, [productId]: newQty });
  };

  const selectedProductsArray = Array.from(selectedProducts)
    .map(productName => {
      const product = products.find(p => p.name === productName);
      return product || { name: productName, formulation: 'Capsule' };
    });

  // Function to format values with units
  const formatValue = (amount: number, unit: string) => {
    if (amount === 0 && unit !== '%') return '-';
    if (unit === '%') return `${Math.round(amount)}%`;
    return `${Math.round(amount)}${unit}`;
  };

  // Calculate combined values for selected products
  const combinedValues: Record<string, { amount: number; dailyValue: number; unit: string }> = {};
  nutrients.forEach(nutrient => {
    combinedValues[nutrient] = { amount: 0, dailyValue: 0, unit: '' };
  });

  selectedProductsArray.forEach(product => {
    const quantity = productQuantities[product.name] || 1;
    nutrients.forEach(nutrient => {
      const productNutrient = mockNutritionData['default'][nutrient];
      if (productNutrient) {
        const amount = parseFloat(productNutrient.amount.replace(/[^\d.]/g, ''));
        const dailyValue = parseFloat(productNutrient.dailyValue.replace(/[^\d.]/g, ''));
        combinedValues[nutrient].amount += amount * quantity;
        combinedValues[nutrient].dailyValue += dailyValue * quantity;
        combinedValues[nutrient].unit = productNutrient.amount.replace(/\d+(\.\d+)?/g, '');
      }
    });
  });

  return (
    <div className="bg-white w-full">
      {/* Banner */}
      <CollectionBanner 
        title="Compare Your Supplements"
        description="See the combined nutritional benefits when taking multiple products together."
        imageSrc={vitaminCalculatorBannerImage}
        backgroundColor="#F6F2EC"
        imageBackgroundColor="#e5ddd3"
      />

      {/* A-Z Navigation Menu */}
      <div className="w-full bg-white sticky top-0 z-40 -mt-[1px]">
        <div className="w-full pt-[20px] md:pt-[24px] pb-[20px] md:pb-[24px] pl-[20px] md:pl-[40px]">
          <div className="flex items-center justify-start gap-[12px] overflow-x-auto scrollbar-hide pr-[20px] md:pr-[40px]">
            {/* Search Box */}
            <div className="relative flex-shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-[200px] lg:w-[240px] h-[32px] md:h-[36px] lg:h-[40px] 
                  px-[12px] md:px-[14px] lg:px-[16px] 
                  bg-[#F5F5F5] text-[#003b3c] placeholder:text-[#003b3c]/40
                  rounded-[6px] font-['Inter',sans-serif] text-[14px] md:text-[15px] lg:text-[16px]
                  border-2 border-transparent
                  focus:outline-none focus:border-[#009296] focus:bg-white
                  transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-[8px] top-1/2 -translate-y-1/2 p-[4px] hover:bg-white/50 rounded-full transition-colors"
                >
                  <X className="w-[16px] h-[16px] text-[#003b3c]" />
                </button>
              )}
            </div>

            {/* Letter Navigation */}
            {allLetters.map((letter) => {
              const isActive = activeLetter === letter;
              
              return (
                <button
                  key={letter}
                  onClick={() => scrollToLetter(letter)}
                  className={`
                    flex-shrink-0 w-[32px] h-[32px] md:w-[36px] md:h-[36px] lg:w-[40px] lg:h-[40px]
                    rounded-[6px] font-['Inter:Medium',sans-serif] font-medium
                    text-[14px] md:text-[15px] lg:text-[16px] transition-all duration-200
                    ${isActive 
                      ? 'bg-[#009296] text-white shadow-sm' 
                      : 'bg-[#F5F5F5] text-[#003b3c] hover:bg-[#EBF6F4] hover:text-[#009296] cursor-pointer'
                    }
                  `}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="w-full px-[20px] md:px-[40px] py-[40px] md:py-[60px] pb-[120px]">
        {allLetters.map((letter) => {
          const letterProducts = productsByLetter[letter] || [];
          
          // Filter products based on search query - match products that START with the search
          const filteredProducts = searchQuery 
            ? letterProducts.filter(p => p.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
            : letterProducts;
          
          // Don't render section if no products match search
          if (filteredProducts.length === 0) return null;
          
          const visibleSections = allLetters.filter(l => {
            const lProducts = productsByLetter[l] || [];
            const fProducts = searchQuery 
              ? lProducts.filter(p => p.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
              : lProducts;
            return fProducts.length > 0;
          });
          
          const currentIndex = visibleSections.indexOf(letter);
          const isLastSection = currentIndex === visibleSections.length - 1;
          
          return (
            <div key={letter} id={`letter-${letter}`}>
              <div className="mb-[40px] md:mb-[50px]">
                <h2 className="font-['STIX_Two_Text:Medium',serif] font-medium text-[#003b3c] text-[48px] md:text-[64px] leading-[1.1] tracking-[-0.96px] md:tracking-[-1.28px] mb-[20px] md:mb-[30px]">
                  {letter}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] md:gap-x-[40px] gap-y-[12px] md:gap-y-[16px]">
                  {filteredProducts.map((product) => (
                    <div key={product.name} className="flex items-start gap-[12px]">
                      <Checkbox
                        id={`product-${product.name}`}
                        checked={selectedProducts.has(product.name)}
                        onCheckedChange={() => toggleProduct(product.name)}
                        className="w-[20px] h-[20px] mt-[2px] rounded-none border-[#003b3c] data-[state=unchecked]:bg-white"
                      />
                      <label
                        htmlFor={`product-${product.name}`}
                        className="font-['Inter',sans-serif] font-normal text-[#003b3c] text-[16px] md:text-[18px] 
                          leading-[1.6] cursor-pointer hover:text-[#009296] transition-colors"
                      >
                        {product.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {!isLastSection && (
                <div className="w-full h-[1px] bg-[#D9E2E2] mb-[40px] md:mb-[50px]" />
              )}
            </div>
          );
        })}
      </div>

      {/* Sticky Bottom Compare Button */}
      {selectedProducts.size > 0 && (
        <div className="fixed bottom-[30px] left-1/2 -translate-x-1/2 z-50 animate-[slideUp_0.4s_ease-out]">
          <button
            onClick={handleCompare}
            disabled={selectedProducts.size < 2}
            className={`
              px-[40px] py-[16px] rounded-full font-['Inter:Medium',sans-serif] font-medium
              text-[16px] tracking-[1.92px] uppercase transition-all duration-200
              ${selectedProducts.size >= 2
                ? 'bg-[#009296] text-white hover:bg-[#007a7e] cursor-pointer shadow-[0_4px_20px_rgba(0,146,150,0.25)]'
                : 'bg-[#D9E2E2] text-[#003b3c]/40 cursor-not-allowed shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
              }
            `}
          >
            Calculate ({selectedProducts.size})
          </button>
        </div>
      )}

      {/* Comparison Overlay */}
      {showComparison && (
        <div className="fixed inset-0 bg-white z-[100] overflow-auto">
          <div className="flex min-h-screen">
            {/* Left Sidebar - Blue Column */}
            <div className="w-[560px] flex-shrink-0 bg-[#EBF6F4]">
              {/* Close Button */}
              <button
                onClick={closeComparison}
                className="absolute top-[30px] right-[30px] p-[5px] hover:bg-white/50 rounded-full transition-colors z-10"
              >
                <X className="w-[34px] h-[34px] text-[#003b3c]" />
              </button>

              {/* Title and Save Button */}
              <div className="h-[460px] pt-[60px] px-[40px] relative">
                <h1 className="font-['STIX_Two_Text:Medium',serif] font-medium text-[#003b3c] text-[60px] leading-[1.1] tracking-[-0.6px] mb-[24px] w-[461px]">
                  Vitamin calculator
                </h1>
                
                <button className="flex items-center justify-center gap-[12px] w-[221px] h-[50px] border border-[#009296] rounded-full text-[#009296] font-['Inter:Medium',sans-serif] font-medium text-[16px] tracking-[1.92px] uppercase hover:bg-[#009296] hover:text-white transition-all duration-200">
                  <Download className="w-[18px] h-[18px]" />
                  Save Results
                </button>

                {/* Table Column Headers */}
                <div className="absolute bottom-[16px] right-0 w-[270px] flex items-end">
                  <div className="w-[120px] pl-[20px]">
                    <p className="font-['Inter:Regular',sans-serif] text-[#003b3c] text-[20px] leading-[1.1] tracking-[-0.2px]">
                      Total<br />amount
                    </p>
                  </div>
                  <div className="w-[130px] pl-[20px]">
                    <p className="font-['Inter:Regular',sans-serif] text-[#003b3c] text-[20px] leading-[1.1] tracking-[-0.2px]">
                      Daily<br />value (%)
                    </p>
                  </div>
                </div>
              </div>

              {/* Nutrition Rows with Continuous Dark Blue Columns */}
              <div className="relative">
                {/* Continuous Dark Blue Column Backgrounds */}
                <div className="absolute top-0 right-0 bottom-0 w-[270px] bg-[#EBF6F4] mix-blend-multiply opacity-70" />
                
                {/* Nutrition Rows Content */}
                <div className="border-t border-[#003b3c] relative z-10">
                  {nutrients.map((nutrient, idx) => (
                    <div 
                      key={nutrient}
                      className={`h-[50px] flex items-center ${idx > 0 ? 'border-t border-[#003b3c]/20' : ''}`}
                    >
                      <div className="flex-1 px-[40px] text-right">
                        <p className="font-['Inter:Medium',sans-serif] text-[#003b3c] text-[16px] tracking-[-0.16px]">
                          {nutrient}
                        </p>
                      </div>
                      <div className="w-[270px] flex items-center">
                        <div className="w-[120px] pl-[20px]">
                          <p className="font-['Inter:Regular',sans-serif] text-[#003b3c] text-[16px] tracking-[-0.16px]">
                            {formatValue(combinedValues[nutrient].amount, combinedValues[nutrient].unit)}
                          </p>
                        </div>
                        <div className="w-[130px] pl-[20px]">
                          <p className="font-['Inter:Regular',sans-serif] text-[#003b3c] text-[16px] tracking-[-0.16px]">
                            {formatValue(combinedValues[nutrient].dailyValue, '%')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-[90px]" />
            </div>

            {/* Right Side - Product Columns */}
            <div className="flex-1 overflow-x-auto bg-white">
              <div className="inline-flex min-w-full gap-[20px] px-[20px]">
                {/* Product Columns */}
                {selectedProductsArray.map((product) => (
                  <div key={product.name} className="w-[250px] flex-shrink-0">
                    {/* Product Card Section */}
                    <div className="h-[460px] flex flex-col">
                      {/* Product Image */}
                      <div className="relative bg-[#F6F2EC] rounded-[10px] h-[240px] mb-[17px] flex items-center justify-center mt-[60px]">
                        <button
                          onClick={() => removeProduct(product.name)}
                          className="absolute top-[12px] right-[12px] p-[5px] bg-white rounded-full hover:bg-[#F5F5F5] transition-colors"
                        >
                          <X className="w-[20px] h-[20px] text-[#003b3c]" />
                        </button>
                        <img 
                          src={imgImage} 
                          alt={product.name} 
                          className="max-w-[200px] max-h-[280px] object-contain" 
                        />
                      </div>

                      {/* Product Name */}
                      <h3 className="font-['Inter:Medium',sans-serif] text-[#003b3c] text-[20px] leading-[1.3] tracking-[-0.2px] mb-[17px] h-[78px] overflow-hidden line-clamp-3">
                        {product.name}
                      </h3>

                      {/* Quantity Selector and Formulation */}
                      <div className="flex items-center gap-[8px] mb-[16px]">
                        <div className="flex items-center justify-center gap-[12px] h-[50px] w-[140px] border border-[#003b3c] rounded-[4px]">
                          <button
                            onClick={() => updateQuantity(product.name, -1)}
                            className="p-[8px] hover:bg-[#F5F5F5] transition-colors"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M6 12H18" stroke="#003B3C" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </button>
                          <span className="font-['Inter:Regular',sans-serif] text-[#003b3c] text-[14px] min-w-[20px] text-center leading-[1.6]">
                            {productQuantities[product.name] || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.name, 1)}
                            className="p-[8px] hover:bg-[#F5F5F5] transition-colors"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M12 6V18M6 12H18" stroke="#003B3C" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </button>
                        </div>
                        <p className="font-['Inter:Regular',sans-serif] text-[#003b3c] text-[14px] leading-[1.6] tracking-[-0.16px]">
                          {product.formulation}
                        </p>
                      </div>
                    </div>

                    {/* Nutrition Values */}
                    <div className="border-t border-[#003b3c]">
                      {nutrients.map((nutrient, idx) => {
                        const quantity = productQuantities[product.name] || 1;
                        const baseData = mockNutritionData['default'][nutrient];
                        const baseAmount = parseFloat(baseData.amount) || 0;
                        const unit = baseData.amount.replace(/[0-9.]/g, '');
                        const calculatedAmount = baseAmount * quantity;
                        
                        return (
                          <div 
                            key={nutrient}
                            className={`h-[50px] flex items-center ${idx > 0 ? 'border-t border-[#003b3c]/20' : ''}`}
                          >
                            <p className="font-['Inter:Regular',sans-serif] text-[#003b3c] text-[16px] tracking-[-0.16px]">
                              {formatValue(calculatedAmount, unit)}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* View Product Button */}
                    <div className="h-[90px] pt-[20px]">
                      <button className="w-full bg-[#009296] text-white h-[50px] rounded-full font-['Inter:Medium',sans-serif] font-medium text-[16px] tracking-[1.92px] uppercase hover:bg-[#007a7e] transition-colors">
                        View Product
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add More Products Column */}
                {selectedProductsArray.length < 4 && (
                  <div className="w-[240px] 2xl:w-[250px] flex-shrink-0">
                    <div className="pt-[110px] flex items-center justify-center">
                      <button
                        onClick={closeComparison}
                        className="w-[140px] h-[140px] rounded-full border-2 border-dashed border-[#D9E2E2] flex items-center justify-center hover:border-[#009296] hover:bg-[#F5F9F9] transition-all duration-200 group"
                      >
                        <Plus className="w-[40px] h-[40px] text-[#003b3c] group-hover:text-[#009296] transition-colors" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}