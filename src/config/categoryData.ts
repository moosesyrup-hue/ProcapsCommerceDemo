/**
 * Category Banner Configuration
 * 
 * This file contains all the banner content for each product category.
 * Each category has its own title, description, image, and styling.
 * 
 * Update this file as new category content is provided.
 */

import svgPaths from "../imports/svg-vsxzdz3mbf";
import imgDigestiveHealth from "figma:asset/b7fb994faa19e600c2f396a1821c1f45aa48dfe7.png";
import imgBeauty from "figma:asset/3fa6bfb0faf85914075f07ca7348c21a8ed08040.png";
import imgCardiovascular from "figma:asset/b1f564f479c6c5508b63df5d116b737af344df3f.png";
import imgWeightManagement from "figma:asset/e22a5dae0c39c44393e94eabfc13c48b707c7e06.png";
import imgAllProducts from "figma:asset/c3a51cf5e0f05ab9016327d22ec28ea4ef6fcd02.png";

export interface CategoryBannerConfig {
  title: string;
  description: string;
  imageSrc?: string;
  svgPath?: string;
  backgroundColor?: string;
  imageBackgroundColor?: string;
  svgFillColor?: string;
}

export const categoryData: Record<string, CategoryBannerConfig> = {
  // ALL PRODUCTS
  'all-products': {
    title: 'All Products',
    description: 'Explore our complete collection of premium supplements designed to support your health and wellness goals.',
    imageSrc: imgAllProducts,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  // PLACEHOLDER: Default fallback for any category not yet configured
  default: {
    title: 'Our Products',
    description: 'Discover our science-backed supplements designed to support your health goals.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // SPECIALS - Placeholder (ready for content)
  'specials': {
    title: 'Specials',
    description: 'Discover our best values and limited-time offers on premium supplements.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // Today's Specials
  'todays-specials': {
    title: "Today's Specials",
    description: 'Limited time offers available today only. Don\'t miss out on these incredible deals!',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // Monthly Specials
  'monthly-specials': {
    title: 'Monthly Specials',
    description: 'Exceptional values on our most popular supplements, available all month long.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // Winter Specials
  'winter-specials': {
    title: 'Winter Specials',
    description: 'Seasonal favorites to support your health through the winter months.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // DIGESTIVE HEALTH - Currently configured
  'digestive-health': {
    title: 'Digestive health',
    description: 'Maintaining a healthy digestion system is crucial for your overall health.',
    imageSrc: imgDigestiveHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  // ANTI-AGING - Placeholder (ready for content)
  'anti-aging': {
    title: 'Anti-Aging',
    description: 'Support healthy aging with scientifically formulated nutrients.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // BEAUTY - Placeholder (ready for content)
  'beauty': {
    title: 'Beauty',
    description: 'Nourish your skin, hair, and nails from within.',
    imageSrc: imgBeauty,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  // BEVERAGES - Placeholder (ready for content)
  'beverages': {
    title: 'Beverages',
    description: 'Delicious and nutritious drinks to support your wellness.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // BONE & SKELETAL HEALTH - Placeholder (ready for content)
  'bone-and-skeletal-health': {
    title: 'Bone & Skeletal Health',
    description: 'Build and maintain strong bones throughout your life.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // BRAIN HEALTH - Placeholder (ready for content)
  'brain-health': {
    title: 'Brain Health',
    description: 'Support cognitive function, memory, and mental clarity.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // CARDIOVASCULAR HEALTH - Placeholder (ready for content)
  'cardiovascular-health': {
    title: 'Cardiovascular Health',
    description: 'Promote heart health and circulatory system wellness.',
    imageSrc: imgCardiovascular,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  // CIRCULATION - Placeholder (ready for content)
  'circulation': {
    title: 'Circulation',
    description: 'Support healthy blood flow throughout your body.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // ENERGY - Placeholder (ready for content)
  'energy': {
    title: 'Energy',
    description: 'Natural energy support for your active lifestyle.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // IMMUNE HEALTH - Placeholder (ready for content)
  'immune-health': {
    title: 'Immune Health',
    description: 'Strengthen your body\'s natural defense system.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // INDIVIDUAL VITAMINS & MINERALS - Placeholder (ready for content)
  'individual-vitamins-and-minerals': {
    title: 'Individual Vitamins & Minerals',
    description: 'Essential nutrients in their most effective forms.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // JOINT HEALTH - Placeholder (ready for content)
  'joint-health': {
    title: 'Joint Health',
    description: 'Support joint comfort, flexibility, and mobility.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // MEALS & PROTEINS - Placeholder (ready for content)
  'meals-and-proteins': {
    title: 'Meals & Proteins',
    description: 'Complete nutrition to fuel your body.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // MULTIVITAMINS - Placeholder (ready for content)
  'multivitamins': {
    title: 'Multivitamins',
    description: 'Comprehensive daily nutrition in one formula.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // PET PRODUCTS - Placeholder (ready for content)
  'pet-products': {
    title: 'Pet Products',
    description: 'Premium supplements for your furry family members.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // SLEEP & RELAXATION - Placeholder (ready for content)
  'sleep-and-relaxation': {
    title: 'Sleep & Relaxation',
    description: 'Natural support for restful sleep and relaxation.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // STRESS & MOOD - Placeholder (ready for content)
  'stress-and-mood': {
    title: 'Stress & Mood',
    description: 'Support emotional balance and stress resilience.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // SWEETENERS - Placeholder (ready for content)
  'sweeteners': {
    title: 'Sweeteners',
    description: 'Healthy alternatives to refined sugar.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // VISION HEALTH - Placeholder (ready for content)
  'vision-health': {
    title: 'Vision Health',
    description: 'Protect and support your eye health.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // WEIGHT MANAGEMENT - Placeholder (ready for content)
  'weight-management': {
    title: 'Weight Management',
    description: 'Healthy weight support through balanced nutrition.',
    imageSrc: imgWeightManagement,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  // OTHER - Placeholder (ready for content)
  'other': {
    title: 'Other',
    description: 'Additional specialized formulas for unique health needs.',
    svgPath: svgPaths.pdc9e330, // TODO: Replace with actual SVG/image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },
};

/**
 * Helper function to get category banner data
 * Returns default if category not found
 */
export function getCategoryBanner(categorySlug: string): CategoryBannerConfig {
  return categoryData[categorySlug] || categoryData.default;
}