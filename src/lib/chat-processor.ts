import { ConversationState, ChatResponse } from '../types/chat';
import { products, Product } from '../data/products';

// Keywords and patterns for different health concerns
const healthPatterns = {
  fatigue: /tired|fatigue|energy|exhausted|sleepy|drained|low.?energy/i,
  sleep: /sleep|insomnia|rest|wake|sleeping|fall.?asleep|stay.?asleep/i,
  stress: /stress|anxiety|anxious|worried|nervous|overwhelm|tension/i,
  joint: /joint|arthritis|stiff|mobility|knee|hip|back.?pain|inflammation/i,
  heart: /heart|cardiovascular|blood.?pressure|circulation|cholesterol/i,
  brain: /brain|memory|focus|concentration|fog|cognitive|mental.?clarity/i,
  immune: /immune|sick|cold|flu|infection|immunity|defense/i,
  digestive: /digestive|digestion|bloat|stomach|gut|ibs|constipation|probiotic/i,
  skin: /skin|beauty|collagen|wrinkle|aging|hair|nails/i,
  bone: /bone|calcium|osteoporosis|density/i,
  eye: /eye|vision|sight|macular/i,
  weight: /weight|metabolism|metabolic|lose.?weight|diet/i,
};

// Tag extraction from user message
function extractTags(message: string): string[] {
  const tags: string[] = [];
  const lowerMessage = message.toLowerCase();
  
  for (const [tag, pattern] of Object.entries(healthPatterns)) {
    if (pattern.test(lowerMessage)) {
      tags.push(tag);
    }
  }
  
  // Lifestyle tags
  if (/vegetarian|vegan|plant.?based/i.test(lowerMessage)) tags.push('vegetarian');
  if (/active|exercise|gym|workout|athletic/i.test(lowerMessage)) tags.push('active');
  if (/desk|sedentary|sit/i.test(lowerMessage)) tags.push('sedentary');
  
  return tags;
}

// Get relevant products based on tags
function getRelevantProducts(tags: string[], limit: number = 3): Product[] {
  if (tags.length === 0) return [];
  
  // Score products based on tag matches
  const scoredProducts = products.map(product => {
    let score = 0;
    
    tags.forEach(tag => {
      const searchText = [
        product.name,
        product.description,
        ...product.searchKeywords,
        ...product.keyIngredients,
        ...product.healthIssues,
        product.primaryCategory,
        ...(product.secondaryCategories || []),
      ].join(' ').toLowerCase();
      
      // Direct matches
      if (searchText.includes(tag)) score += 10;
      
      // Specific product mappings
      if (tag === 'fatigue' && searchText.includes('b-complex')) score += 15;
      if (tag === 'fatigue' && searchText.includes('iron')) score += 15;
      if (tag === 'sleep' && searchText.includes('melatonin')) score += 15;
      if (tag === 'sleep' && searchText.includes('magnesium')) score += 12;
      if (tag === 'joint' && searchText.includes('turmeric')) score += 15;
      if (tag === 'joint' && searchText.includes('glucosamine')) score += 15;
      if (tag === 'brain' && searchText.includes('omega')) score += 15;
      if (tag === 'brain' && searchText.includes('dha')) score += 12;
      if (tag === 'heart' && searchText.includes('coq10')) score += 15;
      if (tag === 'heart' && searchText.includes('omega')) score += 12;
      if (tag === 'immune' && searchText.includes('vitamin c')) score += 12;
      if (tag === 'immune' && searchText.includes('zinc')) score += 10;
      if (tag === 'digestive' && searchText.includes('probiotic')) score += 15;
      if (tag === 'stress' && searchText.includes('ashwagandha')) score += 15;
      if (tag === 'stress' && searchText.includes('magnesium')) score += 10;
    });
    
    return { product, score };
  });
  
  return scoredProducts
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.product);
}

// Generate Andrew's response
function generateResponse(tags: string[], products: Product[], previousTags: string[]): string {
  const isFirstMessage = previousTags.length === 0;
  
  // No tags detected - ask clarifying questions
  if (tags.length === 0) {
    return "I'd love to help you find the right supplements. Could you tell me a bit more about what you're experiencing? For example:\n\n• Are you dealing with fatigue or low energy?\n• Having trouble sleeping?\n• Concerned about joint health or mobility?\n• Looking to support your heart or brain health?\n• Wanting to boost your immune system?\n\nThe more specific you can be, the better I can guide you.";
  }
  
  // Generate response based on detected concerns
  let response = '';
  
  // Fatigue
  if (tags.includes('fatigue')) {
    response += "I hear you on the fatigue - it's one of the most common concerns I help people with. Low energy usually comes down to a few key factors:\n\n";
    response += "**B vitamins** are essential for cellular energy production. Your body can't convert food into energy without them.\n\n";
    response += "**Iron** carries oxygen to every cell. Even mild iron deficiency can cause significant fatigue.\n\n";
    if (products.length > 0) {
      response += "Let me show you what I'd recommend:\n";
    }
  }
  
  // Sleep
  else if (tags.includes('sleep')) {
    response += "Sleep issues are incredibly frustrating, and I've formulated several products specifically for this. Here's what I've learned works:\n\n";
    response += "**Magnesium Glycinate** - The glycinate form is absorbed better and helps calm your nervous system. Most people are deficient.\n\n";
    response += "**Melatonin** - Your body's natural sleep signal, but production decreases with age. A time-release formula works best.\n\n";
    response += "**L-Theanine** - Promotes relaxation without drowsiness.\n\n";
    if (products.length > 0) {
      response += "Here's what I'd suggest based on your needs:\n";
    }
  }
  
  // Joint
  else if (tags.includes('joint')) {
    response += "Joint discomfort is something I take very seriously. The good news is that with the right nutrients, you can support healthy joint function and comfortable movement.\n\n";
    response += "**Glucosamine & Chondroitin** - These provide the building blocks your joints need to maintain healthy cartilage.\n\n";
    response += "**Turmeric/Curcumin** - One of nature's most powerful anti-inflammatory compounds. I use BioPerine to increase absorption by up to 2000%.\n\n";
    if (products.length > 0) {
      response += "Let me recommend the formulas that I've seen work best:\n";
    }
  }
  
  // Heart
  else if (tags.includes('heart')) {
    response += "Cardiovascular health is foundational to everything. Your heart is the hardest-working muscle in your body, and it needs specific nutrients.\n\n";
    response += "**CoQ10** - Your heart has the highest concentration of CoQ10 in your body, but production decreases with age and statin use.\n\n";
    response += "**Omega-3 EPA/DHA** - Reduces inflammation and supports healthy circulation.\n\n";
    if (products.length > 0) {
      response += "Here's what I formulated specifically for cardiovascular support:\n";
    }
  }
  
  // Brain
  else if (tags.includes('brain')) {
    response += "Mental clarity and cognitive function are so important, especially as we age. Your brain needs specific nutrients to perform optimally.\n\n";
    response += "**Omega-3 DHA** - Makes up a significant portion of your brain structure. Essential for cognitive function.\n\n";
    response += "**B Vitamins** - Particularly B12, which supports nerve health and cognitive performance.\n\n";
    if (products.length > 0) {
      response += "Let me show you what I recommend for brain health:\n";
    }
  }
  
  // Stress
  else if (tags.includes('stress')) {
    response += "Stress management is crucial for overall health. I've formulated supplements with adaptogens and minerals that help your body cope with stress more effectively.\n\n";
    response += "**Ashwagandha** - An adaptogenic herb that helps regulate cortisol and promote calm energy.\n\n";
    response += "**Magnesium** - Depleted by stress, but essential for nervous system function.\n\n";
    if (products.length > 0) {
      response += "Here's what can help:\n";
    }
  }
  
  // Immune
  else if (tags.includes('immune')) {
    response += "Supporting your immune system year-round is one of the smartest things you can do for your health.\n\n";
    response += "**Vitamin D3** - Most people are deficient, and it's critical for immune function.\n\n";
    response += "**Vitamin C & Zinc** - Essential nutrients for immune defense.\n\n";
    if (products.length > 0) {
      response += "Here's my immune support protocol:\n";
    }
  }
  
  // Digestive
  else if (tags.includes('digestive')) {
    response += "Gut health affects everything - digestion, immunity, even mood. I've spent years perfecting my digestive formulas.\n\n";
    response += "**Probiotics** - Beneficial bacteria that support digestive health and immunity. Look for multiple strains.\n\n";
    response += "**Digestive Enzymes** - Help break down food so you can absorb nutrients properly.\n\n";
    if (products.length > 0) {
      response += "Here's what I recommend for digestive wellness:\n";
    }
  }
  
  // Generic response for other tags
  else {
    response += `I can definitely help with ${tags.join(', ')}. Let me recommend some formulas that address your specific needs.\n\n`;
  }
  
  // No products found
  if (products.length === 0) {
    response += "\n\nCould you tell me more about your specific symptoms or goals? That will help me make more targeted recommendations.";
  } else {
    response += "\n\nI've included my recommended products below. Each one is formulated to the highest standards with ingredients backed by clinical research.";
  }
  
  return response;
}

// Main processor
export async function processUserMessage(
  message: string,
  currentState: ConversationState
): Promise<ChatResponse> {
  // Extract tags from message
  const newTags = extractTags(message);
  const allTags = [...new Set([...currentState.userTags, ...newTags])];
  
  // Get relevant products
  const relevantProducts = getRelevantProducts(newTags.length > 0 ? newTags : allTags, 3);
  
  // Generate response
  const responseMessage = generateResponse(newTags, relevantProducts, currentState.userTags);
  
  // Update state
  const newState: ConversationState = {
    userTags: allTags,
    recommendedProducts: [...currentState.recommendedProducts, ...relevantProducts],
    currentTopic: newTags.length > 0 ? newTags[0] : currentState.currentTopic,
  };
  
  return {
    message: responseMessage,
    products: relevantProducts.length > 0 ? relevantProducts : undefined,
    newState,
  };
}
