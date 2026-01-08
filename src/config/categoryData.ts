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
import imgVisionHealth from "figma:asset/d6a744d8ff1946177a6e3fd0edd10cda227a66ef.png";
import imgImmuneHealth from "figma:asset/d6e6effceb1fb77e5c6a6a0ac379f2bb5591c63f.png";
import imgBrainHealth from "figma:asset/c447cb3e25fcd1681138aa0f348aad64e91dd9f3.png";
import imgBoneHealth from "figma:asset/1cd75b7612ae19799db9dcf39ef4a2d0c46078d1.png";
import imgMealsProteins from "figma:asset/24015ce33a8c9c777617585ae6c02b8af07dcf53.png";
import imgPetProducts from "figma:asset/8cf9f27a24a62e93d951934dd85e06242bbfe2c4.png";
import imgJointHealth from "figma:asset/dc0933e5ceae50cab915956e70858e8a6041c0b1.png";
import imgSleepRelaxation from "figma:asset/5be05455bd83a47649ecf082fc4f6317e7ad1bb6.png";
import imgStressMood from "figma:asset/4c50e6ade2b5b9683b7b518c68cbf78d6558e528.png";
import imgIndividualVitamins from "figma:asset/6cfddcd51398a2f5267c3dbe88b1e23b74d73f9c.png";
import imgSweeteners from "figma:asset/d36cd87dc04a7e4651f4ee5e3ce2134b23d663cd.png";

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
    imageSrc: imgBoneHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  // BRAIN HEALTH - Placeholder (ready for content)
  'brain-health': {
    title: 'Brain Health',
    description: 'Support cognitive function, memory, and mental clarity.',
    imageSrc: imgBrainHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
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
    imageSrc: imgImmuneHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  // INDIVIDUAL VITAMINS & MINERALS - Placeholder (ready for content)
  'individual-vitamins-and-minerals': {
    title: 'Individual Vitamins & Minerals',
    description: 'Essential nutrients in their most effective forms.',
    imageSrc: imgIndividualVitamins,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  // JOINT HEALTH - Placeholder (ready for content)
  'joint-health': {
    title: 'Joint Health',
    description: 'Support joint comfort, flexibility, and mobility.',
    imageSrc: imgJointHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  // MEALS & PROTEINS - Placeholder (ready for content)
  'meals-and-proteins': {
    title: 'Meals & Proteins',
    description: 'Complete nutrition to fuel your body.',
    imageSrc: imgMealsProteins,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
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
    imageSrc: imgPetProducts,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  // SLEEP & RELAXATION - Placeholder (ready for content)
  'sleep-and-relaxation': {
    title: 'Sleep & Relaxation',
    description: 'Natural support for restful sleep and relaxation.',
    imageSrc: imgSleepRelaxation,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  // STRESS & MOOD - Placeholder (ready for content)
  'stress-and-mood': {
    title: 'Stress & Mood',
    description: 'Support emotional balance and stress resilience.',
    imageSrc: imgStressMood,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  // SWEETENERS - Placeholder (ready for content)
  'sweeteners': {
    title: 'Sweeteners',
    description: 'Healthy alternatives to refined sugar.',
    imageSrc: imgSweeteners,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  // VISION HEALTH - Placeholder (ready for content)
  'vision-health': {
    title: 'Vision Health',
    description: 'Protect and support your eye health.',
    imageSrc: imgVisionHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
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

  // BODY PART - Parent category
  'body-part': {
    title: 'Body Part',
    description: 'Target specific areas of your body with supplements designed to support optimal function and health.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // Body Part Subcategories
  'body-part/brain-and-nerves': {
    title: 'Brain & Nerves',
    description: 'Support cognitive function, mental clarity, and nervous system health.',
    imageSrc: imgBrainHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'body-part/cardiovascular-system': {
    title: 'Cardiovascular System',
    description: 'Comprehensive support for your heart and circulatory health.',
    imageSrc: imgCardiovascular,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'body-part/digestive-system': {
    title: 'Digestive System',
    description: 'Maintain optimal digestive function and gut health.',
    imageSrc: imgDigestiveHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'body-part/eyes': {
    title: 'Eyes',
    description: 'Protect and nourish your vision with targeted eye health support.',
    imageSrc: imgVisionHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'body-part/hair-skin-and-nails': {
    title: 'Hair, Skin & Nails',
    description: 'Nourish your beauty from within with essential nutrients.',
    imageSrc: imgBeauty,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'body-part/heart': {
    title: 'Heart',
    description: 'Support your heart\'s vital function with science-backed nutrients.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-part/immune-system': {
    title: 'Immune System',
    description: 'Strengthen your body\'s natural defenses and immune response.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-part/joints-and-bones': {
    title: 'Joints & Bones',
    description: 'Maintain strong bones and flexible joints for lifelong mobility.',
    imageSrc: imgBoneHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'body-part/kidneys': {
    title: 'Kidneys',
    description: 'Support kidney function and urinary tract health.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-part/liver': {
    title: 'Liver',
    description: 'Support your liver\'s vital detoxification and metabolic functions.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-part/lungs': {
    title: 'Lungs',
    description: 'Support respiratory health and optimal lung function.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-part/muscles': {
    title: 'Muscles',
    description: 'Support muscle strength, recovery, and performance.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-part/prostate': {
    title: 'Prostate',
    description: 'Targeted support for prostate health and function.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-part/thyroid': {
    title: 'Thyroid',
    description: 'Support healthy thyroid function and metabolic balance.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // BODY FUNCTION - Parent category
  'body-function': {
    title: 'Body Function',
    description: 'Support your body\'s essential functions with targeted nutritional supplements designed to optimize performance.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // Body Function Subcategories
  'body-function/antioxidant-protection': {
    title: 'Antioxidant Protection',
    description: 'Defend against oxidative stress and free radical damage.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-function/blood-sugar-support': {
    title: 'Blood Sugar Support',
    description: 'Maintain healthy blood sugar levels naturally.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-function/bone-density': {
    title: 'Bone Density',
    description: 'Support strong, healthy bones throughout life.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-function/cellular-energy': {
    title: 'Cellular Energy',
    description: 'Fuel your cells for optimal energy production.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-function/circulation': {
    title: 'Circulation',
    description: 'Support healthy blood flow and cardiovascular function.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-function/detoxification': {
    title: 'Detoxification',
    description: 'Support your body\'s natural cleansing processes.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-function/digestive-health': {
    title: 'Digestive Health',
    description: 'Optimize digestive function and gut wellness.',
    imageSrc: imgDigestiveHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'body-function/hormonal-balance': {
    title: 'Hormonal Balance',
    description: 'Support healthy hormone levels naturally.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-function/immune-function': {
    title: 'Immune Function',
    description: 'Strengthen your body\'s natural immune response.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-function/joint-flexibility': {
    title: 'Joint Flexibility',
    description: 'Maintain joint mobility and comfort.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-function/memory-and-focus': {
    title: 'Memory & Focus',
    description: 'Support cognitive performance and mental clarity.',
    imageSrc: imgAllProducts, // TODO: Replace with actual image
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'body-function/metabolism': {
    title: 'Metabolism',
    description: 'Support healthy metabolic function and energy balance.',
    imageSrc: imgWeightManagement,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'body-function/muscle-recovery': {
    title: 'Muscle Recovery',
    description: 'Support muscle repair and post-exercise recovery.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'body-function/vision-health': {
    title: 'Vision Health',
    description: 'Support healthy vision and eye function.',
    imageSrc: imgVisionHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  // HEALTH ISSUES - Parent category
  'health-issues': {
    title: 'Health Issues',
    description: 'Address specific health concerns with targeted nutritional support designed to help you feel your best.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // Health Issues Subcategories
  'health-issues/allergies': {
    title: 'Allergies',
    description: 'Support your body\'s response to environmental allergens.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'health-issues/anxiety-and-stress': {
    title: 'Anxiety & Stress',
    description: 'Natural support for emotional balance and stress management.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'health-issues/arthritis': {
    title: 'Arthritis',
    description: 'Support joint comfort and mobility.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'health-issues/blood-pressure': {
    title: 'Blood Pressure',
    description: 'Support healthy blood pressure levels naturally.',
    imageSrc: imgCardiovascular,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'health-issues/cholesterol': {
    title: 'Cholesterol',
    description: 'Support healthy cholesterol levels and cardiovascular wellness.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'health-issues/cognitive-decline': {
    title: 'Cognitive Decline',
    description: 'Support brain health and cognitive function as you age.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'health-issues/diabetes-support': {
    title: 'Diabetes Support',
    description: 'Nutritional support for healthy blood sugar management.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'health-issues/fatigue': {
    title: 'Fatigue',
    description: 'Natural energy support to help you power through your day.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'health-issues/inflammation': {
    title: 'Inflammation',
    description: 'Support your body\'s healthy inflammatory response.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'health-issues/insomnia': {
    title: 'Insomnia',
    description: 'Natural support for restful, restorative sleep.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'health-issues/joint-pain': {
    title: 'Joint Pain',
    description: 'Support joint comfort and reduce discomfort naturally.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'health-issues/poor-circulation': {
    title: 'Poor Circulation',
    description: 'Support healthy blood flow throughout your body.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'health-issues/weight-management': {
    title: 'Weight Management',
    description: 'Support healthy weight goals with balanced nutrition.',
    imageSrc: imgWeightManagement,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'health-issues/weak-immunity': {
    title: 'Weak Immunity',
    description: 'Strengthen your immune system naturally.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // PRODUCT CATEGORY - Parent category
  'product-category': {
    title: 'Product Categories',
    description: 'Explore our complete range of premium supplements organized by category to help you find exactly what you need.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  // Product Category Subcategories (reusing existing category data)
  'product-category/anti-aging': {
    title: 'Anti-Aging',
    description: 'Support healthy aging with scientifically formulated nutrients.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'product-category/beauty': {
    title: 'Beauty',
    description: 'Nourish your skin, hair, and nails from within.',
    imageSrc: imgBeauty,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'product-category/beverages': {
    title: 'Beverages',
    description: 'Delicious and nutritious drinks to support your wellness.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'product-category/bone-and-skeletal-health': {
    title: 'Bone & Skeletal Health',
    description: 'Build and maintain strong bones throughout your life.',
    imageSrc: imgBoneHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'product-category/brain-health': {
    title: 'Brain Health',
    description: 'Support cognitive function, memory, and mental clarity.',
    imageSrc: imgBrainHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'product-category/cardiovascular-health': {
    title: 'Cardiovascular Health',
    description: 'Promote heart health and circulatory system wellness.',
    imageSrc: imgCardiovascular,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'product-category/circulation': {
    title: 'Circulation',
    description: 'Support healthy blood flow throughout your body.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'product-category/digestive-health': {
    title: 'Digestive Health',
    description: 'Maintaining a healthy digestive system is crucial for your overall health.',
    imageSrc: imgDigestiveHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'product-category/energy': {
    title: 'Energy',
    description: 'Natural energy support for your active lifestyle.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'product-category/immune-health': {
    title: 'Immune Health',
    description: 'Strengthen your body\'s natural defense system.',
    imageSrc: imgImmuneHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'product-category/individual-vitamins-and-minerals': {
    title: 'Individual Vitamins & Minerals',
    description: 'Essential nutrients in their most effective forms.',
    imageSrc: imgIndividualVitamins,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'product-category/joint-health': {
    title: 'Joint Health',
    description: 'Support joint comfort, flexibility, and mobility.',
    imageSrc: imgJointHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'product-category/meals-and-proteins': {
    title: 'Meals & Proteins',
    description: 'Complete nutrition to fuel your body.',
    imageSrc: imgMealsProteins,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'product-category/multivitamins': {
    title: 'Multivitamins',
    description: 'Comprehensive daily nutrition in one formula.',
    svgPath: svgPaths.pdc9e330,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
    svgFillColor: '#B9B1A8',
  },

  'product-category/pet-products': {
    title: 'Pet Products',
    description: 'Premium supplements for your furry family members.',
    imageSrc: imgPetProducts,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'product-category/sleep-and-relaxation': {
    title: 'Sleep & Relaxation',
    description: 'Natural support for restful sleep and relaxation.',
    imageSrc: imgSleepRelaxation,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'product-category/stress-and-mood': {
    title: 'Stress & Mood',
    description: 'Support emotional balance and stress resilience.',
    imageSrc: imgStressMood,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'product-category/sweeteners': {
    title: 'Sweeteners',
    description: 'Healthy alternatives to refined sugar.',
    imageSrc: imgSweeteners,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'product-category/vision-health': {
    title: 'Vision Health',
    description: 'Protect and support your eye health.',
    imageSrc: imgVisionHealth,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'product-category/weight-management': {
    title: 'Weight Management',
    description: 'Healthy weight support through balanced nutrition.',
    imageSrc: imgWeightManagement,
    backgroundColor: '#F6F2EC',
    imageBackgroundColor: '#e5ddd3',
  },

  'product-category/other': {
    title: 'Other',
    description: 'Additional specialized formulas for unique health needs.',
    svgPath: svgPaths.pdc9e330,
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