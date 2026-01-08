import type { UserData } from '../components/chat/ChatWithAndrew';

export interface ProductRecommendation {
  id: string;
  name: string;
  count: string;
  price: number;
  image: string;
  reason: string;
}

export function getRecommendedProducts(userData: UserData): ProductRecommendation[] {
  const products: ProductRecommendation[] = [];
  const goal = userData.goal;
  const age = userData.age;

  // Base recommendation - Everyone gets a multivitamin
  products.push({
    id: 'ultimate-one-per-day',
    name: 'Ultimate One Per Day Multi-Vitamin',
    count: '30 Capsules',
    price: 19.95,
    image: 'https://images.unsplash.com/photo-1550572017-4814632d0e27?w=400&h=400&fit=crop',
    reason: 'Essential nutritional foundation for your age and activity level. Fills gaps in your diet with all essential vitamins and minerals.',
  });

  // Goal-specific recommendations
  switch (goal) {
    case 'energy':
      products.push({
        id: 'coq10',
        name: 'CoQ10 200mg',
        count: '60 Capsules',
        price: 29.95,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
        reason: 'Supports cellular energy production. CoQ10 is essential for creating ATP, the energy currency your cells use.',
      });
      products.push({
        id: 'b-complex',
        name: 'B-Complex with All Eight B-Vitamins',
        count: '60 Capsules',
        price: 16.95,
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
        reason: 'B vitamins are critical for converting food into energy and supporting your nervous system.',
      });
      break;

    case 'brain':
      products.push({
        id: 'omega-3',
        name: 'Omega-3 EPA-DHA with Vitamin E',
        count: '60 Capsules',
        price: 24.95,
        image: 'https://images.unsplash.com/photo-1505575967455-4016fcc2c625?w=400&h=400&fit=crop',
        reason: 'Omega-3s are the building blocks of brain cell membranes. Essential for cognitive function and focus.',
      });
      products.push({
        id: 'phosphatidyl-serine',
        name: 'Phosphatidyl Serine & Choline',
        count: '60 Capsules',
        price: 34.95,
        image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop',
        reason: 'Supports memory and mental clarity. These phospholipids are concentrated in brain tissue.',
      });
      break;

    case 'heart':
      products.push({
        id: 'coq10-heart',
        name: 'CoQ10 300mg',
        count: '60 Capsules',
        price: 39.95,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
        reason: 'Your heart muscle has the highest concentration of CoQ10 in the body. Supports cardiovascular function.',
      });
      products.push({
        id: 'omega-3-heart',
        name: 'Omega-3 EPA-DHA 1000mg',
        count: '60 Capsules',
        price: 29.95,
        image: 'https://images.unsplash.com/photo-1505575967455-4016fcc2c625?w=400&h=400&fit=crop',
        reason: 'Supports healthy triglyceride levels and overall cardiovascular wellness.',
      });
      break;

    case 'joints':
      products.push({
        id: 'glucosamine',
        name: 'Glucosamine & Chondroitin with MSM',
        count: '180 Capsules',
        price: 34.95,
        image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=400&h=400&fit=crop',
        reason: 'Provides building blocks for cartilage health. Supports joint comfort and flexibility.',
      });
      products.push({
        id: 'curcumin',
        name: 'Curcumin Turmeric Complex',
        count: '60 Capsules',
        price: 27.95,
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop',
        reason: 'Natural support for healthy inflammation response. Helps maintain comfortable joint function.',
      });
      break;

    case 'immune':
      products.push({
        id: 'vitamin-c',
        name: 'Vitamin C 1000mg with Bioflavonoids',
        count: '250 Tablets',
        price: 19.95,
        image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&h=400&fit=crop',
        reason: 'Essential for immune cell function. Your immune system uses vitamin C at a high rate.',
      });
      products.push({
        id: 'zinc',
        name: 'Zinc 30mg with Copper',
        count: '180 Capsules',
        price: 14.95,
        image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=400&fit=crop',
        reason: 'Critical for immune cell development and function. Zinc deficiency impairs immunity.',
      });
      break;

    case 'stress':
      products.push({
        id: 'b-complex-stress',
        name: 'B-Complex with All Eight B-Vitamins',
        count: '60 Capsules',
        price: 16.95,
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
        reason: 'Stress depletes B vitamins rapidly. These support your nervous system during stressful times.',
      });
      products.push({
        id: 'magnesium',
        name: 'Magnesium 400mg',
        count: '120 Capsules',
        price: 17.95,
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
        reason: 'Magnesium supports calm and relaxation. Many people are deficient and stress depletes it further.',
      });
      break;

    case 'sleep':
      products.push({
        id: 'magnesium-sleep',
        name: 'Magnesium 400mg',
        count: '120 Capsules',
        price: 17.95,
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
        reason: 'Magnesium promotes relaxation and helps prepare your body for restful sleep.',
      });
      products.push({
        id: 'melatonin',
        name: 'Melatonin 3mg with B-6',
        count: '60 Capsules',
        price: 12.95,
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
        reason: 'Helps regulate your sleep-wake cycle naturally. Especially helpful for occasional sleeplessness.',
      });
      break;

    case 'wellness':
    default:
      products.push({
        id: 'omega-3-wellness',
        name: 'Omega-3 EPA-DHA with Vitamin E',
        count: '60 Capsules',
        price: 24.95,
        image: 'https://images.unsplash.com/photo-1505575967455-4016fcc2c625?w=400&h=400&fit=crop',
        reason: 'Supports heart, brain, and overall cellular health. One of the most well-researched nutrients.',
      });
      products.push({
        id: 'vitamin-d',
        name: 'Vitamin D-3 5000 IU',
        count: '250 Capsules',
        price: 14.95,
        image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
        reason: 'Most people are deficient in vitamin D. Essential for immune health, bone health, and mood.',
      });
      break;
  }

  // Age-specific additions
  if (age === '50-65' || age === '65+') {
    // Add calcium for older adults if not already included
    const hasCalcium = products.some(p => p.id.includes('calcium'));
    if (!hasCalcium) {
      products.push({
        id: 'calcium',
        name: 'Calcium Citrate 1000mg with Vitamin D-3',
        count: '180 Capsules',
        price: 21.95,
        image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400&h=400&fit=crop',
        reason: 'Bone health becomes increasingly important with age. Calcium citrate is highly absorbable.',
      });
    }
  }

  return products;
}
