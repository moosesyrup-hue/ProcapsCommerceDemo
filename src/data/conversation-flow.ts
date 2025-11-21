// Conversation flow for Find My Supplements
// Rule-based conversational tree with Andrew Lessman's voice

export interface ConversationNode {
  id: string;
  type: 'question' | 'explanation' | 'recommendation';
  
  // Andrew's message
  message: string;
  
  // For explanations, additional detail
  detail?: string;
  
  // Response options
  options?: {
    text: string;
    nextNodeId: string;
    tags?: string[]; // Track what we learn about the user
  }[];
  
  // Allow free text input?
  allowFreeText?: boolean;
  freeTextPlaceholder?: string;
  
  // For recommendation nodes
  recommendationLogic?: {
    primaryTags: string[]; // Must match one of these
    secondaryTags?: string[]; // Bonus points
    excludeTags?: string[]; // Exclude if present
    minProducts?: number;
    maxProducts?: number;
  };
  
  // Progress indicator
  progressStep?: number;
  totalSteps?: number;
}

export const conversationFlow: ConversationNode[] = [
  // START NODE
  {
    id: 'start',
    type: 'question',
    message: "Hi, I'm Andrew Lessman. I've been formulating vitamins and supplements for over 40 years, and I'd love to help you find exactly what you need.",
    detail: "Tell me - what brought you here today? Feel free to describe how you're feeling in your own words, or choose from the common concerns below.",
    allowFreeText: true,
    freeTextPlaceholder: "Describe how you're feeling...",
    options: [
      { text: "I'm always tired or low energy", nextNodeId: 'fatigue-1', tags: ['concern:fatigue'] },
      { text: "I can't sleep well", nextNodeId: 'sleep-1', tags: ['concern:sleep'] },
      { text: "Joint pain or stiffness", nextNodeId: 'joint-1', tags: ['concern:joint'] },
      { text: "Brain fog or memory issues", nextNodeId: 'cognitive-1', tags: ['concern:cognitive'] },
      { text: "Digestive problems", nextNodeId: 'digestive-1', tags: ['concern:digestive'] },
      { text: "General wellness & prevention", nextNodeId: 'wellness-1', tags: ['concern:wellness'] },
    ],
    progressStep: 1,
    totalSteps: 4,
  },

  // FATIGUE BRANCH
  {
    id: 'fatigue-1',
    type: 'question',
    message: "I understand - fatigue is one of the most common concerns I hear about. But the underlying cause can vary quite a bit.",
    detail: "When do you typically feel most tired?",
    options: [
      { text: "All day long", nextNodeId: 'fatigue-allday', tags: ['fatigue:chronic'] },
      { text: "Mornings (hard to wake up)", nextNodeId: 'fatigue-morning', tags: ['fatigue:morning'] },
      { text: "Afternoon crash (usually after lunch)", nextNodeId: 'fatigue-afternoon', tags: ['fatigue:afternoon'] },
      { text: "After meals", nextNodeId: 'fatigue-postmeal', tags: ['fatigue:postmeal'] },
    ],
    progressStep: 2,
    totalSteps: 4,
  },

  {
    id: 'fatigue-morning',
    type: 'question',
    message: "Morning fatigue often tells me something specific about what your body needs.",
    detail: "How would you describe your sleep quality?",
    options: [
      { text: "I sleep well but still wake up tired", nextNodeId: 'fatigue-morning-sleepok', tags: ['sleep:quality-good', 'fatigue:not-sleep-related'] },
      { text: "I don't sleep well - trouble falling or staying asleep", nextNodeId: 'fatigue-sleep-issue', tags: ['sleep:quality-poor'] },
      { text: "I wake up multiple times during the night", nextNodeId: 'fatigue-sleep-interrupted', tags: ['sleep:interrupted'] },
    ],
    progressStep: 3,
    totalSteps: 4,
  },

  {
    id: 'fatigue-morning-sleepok',
    type: 'question',
    message: "Interesting - this is a pattern I've seen thousands of times. You're sleeping through the night but still waking up exhausted.",
    detail: "One more question: do you work primarily indoors or outdoors?",
    options: [
      { text: "Mostly indoors", nextNodeId: 'fatigue-morning-rec', tags: ['lifestyle:indoor'] },
      { text: "Mostly outdoors", nextNodeId: 'fatigue-morning-outdoor-rec', tags: ['lifestyle:outdoor'] },
      { text: "Mix of both", nextNodeId: 'fatigue-morning-rec', tags: ['lifestyle:mixed'] },
    ],
    progressStep: 4,
    totalSteps: 4,
  },

  {
    id: 'fatigue-morning-rec',
    type: 'explanation',
    message: "Here's what I think is happening - and why.",
    detail: "You're sleeping through the night, but still waking up exhausted. This tells me you're likely dealing with two common deficiencies: Vitamin D and B vitamins.\n\nLet me explain the science: Vitamin D isn't just for bones - it's crucial for energy production at the cellular level. When you work indoors, you're not getting the sunlight your body needs to produce it naturally. Studies show up to 42% of Americans are Vitamin D deficient.\n\nThe B-Complex vitamins are your energy vitamins - they help convert food into cellular energy. If you're low, you'll feel it most in the morning when your body is trying to 'turn on' for the day.",
    options: [
      { text: "That makes sense - show me what you recommend", nextNodeId: 'fatigue-morning-products' },
    ],
  },

  {
    id: 'fatigue-morning-products',
    type: 'recommendation',
    message: "Based on everything you've told me, here's the protocol I'd recommend:",
    recommendationLogic: {
      primaryTags: ['concern:fatigue', 'fatigue:morning'],
      secondaryTags: ['lifestyle:indoor'],
      minProducts: 2,
      maxProducts: 3,
    },
  },

  {
    id: 'fatigue-allday',
    type: 'question',
    message: "All-day fatigue can have several causes. Let me narrow this down.",
    detail: "Are you also experiencing any of these symptoms?",
    options: [
      { text: "Brain fog or difficulty concentrating", nextNodeId: 'fatigue-allday-brainfog', tags: ['symptom:brain-fog'] },
      { text: "Feeling cold often", nextNodeId: 'fatigue-allday-cold', tags: ['symptom:cold-sensitivity'] },
      { text: "Digestive issues", nextNodeId: 'fatigue-allday-digestive', tags: ['symptom:digestive'] },
      { text: "None of the above", nextNodeId: 'fatigue-allday-simple', tags: [] },
    ],
    progressStep: 3,
    totalSteps: 4,
  },

  {
    id: 'fatigue-allday-brainfog',
    type: 'explanation',
    message: "The combination of fatigue and brain fog is very telling.",
    detail: "In my experience, this pattern often points to B-vitamin deficiency and possibly low iron. Your brain uses about 20% of your body's energy, so when you're deficient in the nutrients that produce cellular energy, you feel it mentally and physically.\n\nIron is especially important - it carries oxygen to every cell in your body. Low iron means less oxygen delivery, which equals fatigue and foggy thinking.",
    options: [
      { text: "Show me your recommendations", nextNodeId: 'fatigue-allday-brainfog-products' },
    ],
  },

  {
    id: 'fatigue-allday-brainfog-products',
    type: 'recommendation',
    message: "Here's what I'd suggest for all-day fatigue with brain fog:",
    recommendationLogic: {
      primaryTags: ['concern:fatigue', 'fatigue:chronic', 'symptom:brain-fog'],
      minProducts: 2,
      maxProducts: 4,
    },
  },

  {
    id: 'fatigue-afternoon',
    type: 'question',
    message: "The afternoon crash - I hear about this all the time. It's usually related to blood sugar or nutrient absorption.",
    detail: "Tell me about your typical lunch:",
    options: [
      { text: "Carb-heavy (pasta, bread, etc.)", nextNodeId: 'fatigue-afternoon-carbs', tags: ['diet:high-carb'] },
      { text: "Balanced meal", nextNodeId: 'fatigue-afternoon-balanced', tags: ['diet:balanced'] },
      { text: "I usually skip lunch", nextNodeId: 'fatigue-afternoon-skip', tags: ['diet:skip-meals'] },
    ],
    progressStep: 3,
    totalSteps: 4,
  },

  {
    id: 'fatigue-afternoon-carbs',
    type: 'explanation',
    message: "That's exactly what I suspected - and here's what's happening.",
    detail: "When you eat a carb-heavy lunch, your blood sugar spikes, then crashes a few hours later. That crash is what you're feeling as fatigue.\n\nBut here's what most people don't know: B vitamins, Chromium, and Magnesium all help regulate blood sugar and convert those carbs into sustained energy instead of a spike-and-crash cycle.\n\nI've also found that many people with afternoon crashes are low in iron, which compounds the problem.",
    options: [
      { text: "Show me what can help", nextNodeId: 'fatigue-afternoon-products' },
    ],
  },

  {
    id: 'fatigue-afternoon-products',
    type: 'recommendation',
    message: "Here's my recommended protocol for afternoon energy crashes:",
    recommendationLogic: {
      primaryTags: ['concern:fatigue', 'fatigue:afternoon'],
      secondaryTags: ['diet:high-carb'],
      minProducts: 2,
      maxProducts: 3,
    },
  },

  // SLEEP BRANCH
  {
    id: 'sleep-1',
    type: 'question',
    message: "Sleep issues can be incredibly frustrating. I've helped thousands of people improve their sleep, but first I need to understand your specific situation.",
    detail: "What's your main sleep challenge?",
    options: [
      { text: "Trouble falling asleep (racing mind)", nextNodeId: 'sleep-falling', tags: ['sleep:falling-asleep', 'symptom:racing-mind'] },
      { text: "Waking up during the night", nextNodeId: 'sleep-waking', tags: ['sleep:staying-asleep'] },
      { text: "Waking up too early and can't go back", nextNodeId: 'sleep-early-wake', tags: ['sleep:early-wake'] },
      { text: "All of the above", nextNodeId: 'sleep-multiple', tags: ['sleep:multiple-issues'] },
    ],
    progressStep: 2,
    totalSteps: 4,
  },

  {
    id: 'sleep-falling',
    type: 'question',
    message: "Racing mind at bedtime is one of the most common sleep issues - and it's very fixable.",
    detail: "Are you also experiencing stress or anxiety during the day?",
    options: [
      { text: "Yes, I'm stressed most of the time", nextNodeId: 'sleep-falling-stressed', tags: ['symptom:stress-high'] },
      { text: "Sometimes, but not constantly", nextNodeId: 'sleep-falling-moderate', tags: ['symptom:stress-moderate'] },
      { text: "Not really, just can't turn my brain off at night", nextNodeId: 'sleep-falling-night-only', tags: ['symptom:stress-nighttime'] },
    ],
    progressStep: 3,
    totalSteps: 4,
  },

  {
    id: 'sleep-falling-stressed',
    type: 'explanation',
    message: "Here's what's happening - and it's more common than you think.",
    detail: "When you're stressed throughout the day, your body produces cortisol. That cortisol should drop at night to let you sleep, but chronic stress keeps it elevated.\n\nAt the same time, stress depletes your magnesium - which is nature's relaxation mineral. Low magnesium means tense muscles, racing thoughts, and difficulty falling asleep.\n\nL-Theanine (from green tea) is remarkable for this. It promotes alpha brain waves - the relaxed-but-alert state that transitions to sleep. I've combined it with Magnesium Glycinate in a formula specifically for stress-related sleep issues.",
    options: [
      { text: "Show me your sleep recommendations", nextNodeId: 'sleep-falling-stressed-products' },
    ],
  },

  {
    id: 'sleep-falling-stressed-products',
    type: 'recommendation',
    message: "For stress-related sleep issues, here's what I recommend:",
    recommendationLogic: {
      primaryTags: ['concern:sleep', 'sleep:falling-asleep', 'symptom:stress-high'],
      minProducts: 2,
      maxProducts: 3,
    },
  },

  {
    id: 'sleep-waking',
    type: 'question',
    message: "Waking up during the night often indicates a different issue than trouble falling asleep.",
    detail: "When you wake up, what happens?",
    options: [
      { text: "Wide awake, hard to fall back asleep", nextNodeId: 'sleep-waking-alert', tags: ['sleep:alert-waking'] },
      { text: "Need to use the bathroom", nextNodeId: 'sleep-waking-bathroom', tags: ['sleep:bathroom-waking'] },
      { text: "Just briefly, then fall back asleep", nextNodeId: 'sleep-waking-brief', tags: ['sleep:brief-waking'] },
    ],
    progressStep: 3,
    totalSteps: 4,
  },

  {
    id: 'sleep-waking-alert',
    type: 'explanation',
    message: "Waking up wide awake in the middle of the night is often a blood sugar issue.",
    detail: "Here's the science: When your blood sugar drops too low during the night, your body releases stress hormones to raise it back up. Those stress hormones wake you up - sometimes at the exact same time every night (often 2-3am).\n\nMagnesium helps regulate blood sugar overnight, and Glycine (an amino acid) has been shown in studies to improve sleep quality and reduce night-time wakings.\n\nIf you're over 40, I'd also consider Melatonin - our natural production decreases with age.",
    options: [
      { text: "That makes sense - what do you suggest?", nextNodeId: 'sleep-waking-products' },
    ],
  },

  {
    id: 'sleep-waking-products',
    type: 'recommendation',
    message: "For staying asleep through the night, here's my protocol:",
    recommendationLogic: {
      primaryTags: ['concern:sleep', 'sleep:staying-asleep'],
      minProducts: 2,
      maxProducts: 3,
    },
  },

  // JOINT PAIN BRANCH
  {
    id: 'joint-1',
    type: 'question',
    message: "Joint pain and stiffness - I've formulated several products specifically for this over the years. Let me understand your situation better.",
    detail: "Which joints are affected most?",
    options: [
      { text: "Knees", nextNodeId: 'joint-knees', tags: ['joint:knees'] },
      { text: "Hands or fingers", nextNodeId: 'joint-hands', tags: ['joint:hands'] },
      { text: "Back or spine", nextNodeId: 'joint-back', tags: ['joint:back'] },
      { text: "Multiple joints", nextNodeId: 'joint-multiple', tags: ['joint:multiple'] },
    ],
    progressStep: 2,
    totalSteps: 4,
  },

  {
    id: 'joint-multiple',
    type: 'question',
    message: "Multiple joint involvement often points to systemic inflammation rather than just wear-and-tear.",
    detail: "When is the stiffness/pain worst?",
    options: [
      { text: "Morning stiffness (gets better with movement)", nextNodeId: 'joint-morning', tags: ['joint:morning-stiffness'] },
      { text: "Gets worse throughout the day", nextNodeId: 'joint-progressive', tags: ['joint:progressive'] },
      { text: "After activity or exercise", nextNodeId: 'joint-activity', tags: ['joint:post-activity'] },
      { text: "Constant, all day", nextNodeId: 'joint-constant', tags: ['joint:constant'] },
    ],
    progressStep: 3,
    totalSteps: 4,
  },

  {
    id: 'joint-morning',
    type: 'explanation',
    message: "Morning stiffness that improves with movement is classic inflammatory joint discomfort.",
    detail: "Here's what's happening: During the night, inflammatory compounds accumulate in your joints. When you start moving, circulation increases and helps clear them out - that's why you feel better after moving around.\n\nThe good news? This is very responsive to the right nutrients. Turmeric Curcumin is one of nature's most powerful anti-inflammatory compounds. I've combined it with BioPerine (black pepper extract) because studies show it increases curcumin absorption by up to 2000%.\n\nGlucosamine and Chondroitin provide the building blocks your joints need to repair and maintain healthy cartilage. And MSM reduces inflammation while supporting joint flexibility.",
    options: [
      { text: "Show me your joint health recommendations", nextNodeId: 'joint-morning-products' },
    ],
  },

  {
    id: 'joint-morning-products',
    type: 'recommendation',
    message: "For inflammatory joint discomfort, here's my recommended protocol:",
    recommendationLogic: {
      primaryTags: ['concern:joint', 'joint:morning-stiffness'],
      minProducts: 2,
      maxProducts: 3,
    },
  },

  // COGNITIVE BRANCH
  {
    id: 'cognitive-1',
    type: 'question',
    message: "Brain fog and memory issues are incredibly common - especially in our modern, overstimulated world.",
    detail: "What are you experiencing most?",
    options: [
      { text: "Difficulty concentrating or focusing", nextNodeId: 'cognitive-focus', tags: ['cognitive:focus'] },
      { text: "Memory issues (forgetting names, words)", nextNodeId: 'cognitive-memory', tags: ['cognitive:memory'] },
      { text: "Mental fatigue or 'brain fog'", nextNodeId: 'cognitive-fog', tags: ['cognitive:fog'] },
      { text: "All of the above", nextNodeId: 'cognitive-all', tags: ['cognitive:multiple'] },
    ],
    progressStep: 2,
    totalSteps: 4,
  },

  {
    id: 'cognitive-fog',
    type: 'question',
    message: "Brain fog is frustrating - it's like you can't think clearly through a mental haze.",
    detail: "Is this brain fog constant, or does it come and go?",
    options: [
      { text: "Constant, all day", nextNodeId: 'cognitive-fog-constant', tags: ['cognitive:fog-constant'] },
      { text: "Worse in afternoons", nextNodeId: 'cognitive-fog-afternoon', tags: ['cognitive:fog-afternoon'] },
      { text: "Comes and goes unpredictably", nextNodeId: 'cognitive-fog-variable', tags: ['cognitive:fog-variable'] },
    ],
    progressStep: 3,
    totalSteps: 4,
  },

  {
    id: 'cognitive-fog-constant',
    type: 'explanation',
    message: "Constant brain fog often indicates your brain isn't getting the nutrients it needs to function optimally.",
    detail: "Your brain uses 20% of your body's energy and 25% of its oxygen. It also depends heavily on B vitamins (especially B12, B6, and Folate) for neurotransmitter production.\n\nOmega-3 fatty acids - specifically DHA - make up a large portion of your brain's structure. Studies show that DHA supplementation improves cognitive function and mental clarity.\n\nI've also found that many people with brain fog are low in iron, which reduces oxygen delivery to the brain, or have poor circulation.",
    options: [
      { text: "Show me what can help", nextNodeId: 'cognitive-fog-products' },
    ],
  },

  {
    id: 'cognitive-fog-products',
    type: 'recommendation',
    message: "For mental clarity and brain fog, here's what I recommend:",
    recommendationLogic: {
      primaryTags: ['concern:cognitive', 'cognitive:fog'],
      minProducts: 2,
      maxProducts: 4,
    },
  },

  // DIGESTIVE BRANCH
  {
    id: 'digestive-1',
    type: 'question',
    message: "Digestive health is foundational - when your digestion isn't working properly, nothing else can work optimally.",
    detail: "What's your main digestive concern?",
    options: [
      { text: "Bloating or gas", nextNodeId: 'digestive-bloating', tags: ['digestive:bloating'] },
      { text: "Irregularity or constipation", nextNodeId: 'digestive-constipation', tags: ['digestive:constipation'] },
      { text: "Upset stomach or indigestion", nextNodeId: 'digestive-indigestion', tags: ['digestive:indigestion'] },
      { text: "Multiple digestive issues", nextNodeId: 'digestive-multiple', tags: ['digestive:multiple'] },
    ],
    progressStep: 2,
    totalSteps: 4,
  },

  {
    id: 'digestive-bloating',
    type: 'question',
    message: "Bloating is uncomfortable and often indicates that food isn't being properly broken down.",
    detail: "When does the bloating typically occur?",
    options: [
      { text: "After meals", nextNodeId: 'digestive-bloating-postmeal', tags: ['digestive:postmeal-bloating'] },
      { text: "Throughout the day", nextNodeId: 'digestive-bloating-constant', tags: ['digestive:constant-bloating'] },
      { text: "Mainly in the evening", nextNodeId: 'digestive-bloating-evening', tags: ['digestive:evening-bloating'] },
    ],
    progressStep: 3,
    totalSteps: 4,
  },

  {
    id: 'digestive-bloating-postmeal',
    type: 'explanation',
    message: "Post-meal bloating usually means you're not producing enough digestive enzymes.",
    detail: "Here's what happens: As we age, our body produces fewer digestive enzymes. Without enough enzymes, food sits in your digestive tract longer, fermenting and creating gas.\n\nDigestive enzymes break down proteins, fats, and carbohydrates so your body can absorb the nutrients. When you take them with meals, you'll often notice less bloating within days.\n\nProbiotics are also crucial - they're the beneficial bacteria that help with digestion and reduce gas production. I recommend a high-potency formula with multiple strains.",
    options: [
      { text: "Show me your digestive health recommendations", nextNodeId: 'digestive-bloating-products' },
    ],
  },

  {
    id: 'digestive-bloating-products',
    type: 'recommendation',
    message: "For digestive comfort and reducing bloating:",
    recommendationLogic: {
      primaryTags: ['concern:digestive', 'digestive:bloating'],
      minProducts: 2,
      maxProducts: 3,
    },
  },

  // WELLNESS BRANCH
  {
    id: 'wellness-1',
    type: 'question',
    message: "I love that you're thinking about prevention! It's so much easier to maintain health than to recover it.",
    detail: "What's your main focus for general wellness?",
    options: [
      { text: "Overall health & vitality", nextNodeId: 'wellness-general', tags: ['wellness:general'] },
      { text: "Immune support", nextNodeId: 'wellness-immune', tags: ['wellness:immune'] },
      { text: "Healthy aging & longevity", nextNodeId: 'wellness-aging', tags: ['wellness:aging'] },
      { text: "Heart & cardiovascular health", nextNodeId: 'wellness-heart', tags: ['wellness:heart'] },
    ],
    progressStep: 2,
    totalSteps: 4,
  },

  {
    id: 'wellness-general',
    type: 'question',
    message: "A solid nutritional foundation is key to feeling your best every day.",
    detail: "Tell me about your current routine:",
    options: [
      { text: "I take a multivitamin already", nextNodeId: 'wellness-has-multi', tags: ['wellness:has-multi'] },
      { text: "I don't take any supplements currently", nextNodeId: 'wellness-no-supplements', tags: ['wellness:no-supplements'] },
      { text: "I take some supplements but want to optimize", nextNodeId: 'wellness-optimize', tags: ['wellness:optimize'] },
    ],
    progressStep: 3,
    totalSteps: 4,
  },

  {
    id: 'wellness-no-supplements',
    type: 'explanation',
    message: "Starting a supplement routine can seem overwhelming, but it doesn't have to be.",
    detail: "Here's my philosophy: Start with the essentials that almost everyone is deficient in, then build from there.\n\nVitamin D is deficient in up to 42% of Americans - it's crucial for immunity, bone health, mood, and energy. Most people need supplementation, especially if you work indoors.\n\nOmega-3s (EPA and DHA) are essential for brain health, heart health, and reducing inflammation. Most Americans don't eat enough fatty fish to get adequate amounts.\n\nA quality B-Complex supports energy, brain function, and stress response. These are water-soluble, so your body doesn't store them - you need them daily.",
    options: [
      { text: "Show me the essential supplements to start with", nextNodeId: 'wellness-essentials-products' },
    ],
  },

  {
    id: 'wellness-essentials-products',
    type: 'recommendation',
    message: "Here are the essential supplements I recommend everyone start with:",
    recommendationLogic: {
      primaryTags: ['concern:wellness', 'wellness:no-supplements'],
      minProducts: 3,
      maxProducts: 4,
    },
  },

  {
    id: 'wellness-immune',
    type: 'explanation',
    message: "Supporting your immune system is one of the smartest things you can do for your overall health.",
    detail: "Your immune system works 24/7 to protect you, but it needs specific nutrients to function optimally.\n\nVitamin D3 is perhaps the most important immune nutrient - receptors for vitamin D are found on immune cells throughout your body. Studies show that adequate vitamin D levels significantly reduce susceptibility to illness.\n\nVitamin C supports immune cell function and is a powerful antioxidant. Zinc is essential for immune cell development and communication. And Elderberry has been used for centuries and is backed by modern research for immune support.",
    options: [
      { text: "Show me your immune support recommendations", nextNodeId: 'wellness-immune-products' },
    ],
  },

  {
    id: 'wellness-immune-products',
    type: 'recommendation',
    message: "For comprehensive immune support:",
    recommendationLogic: {
      primaryTags: ['concern:wellness', 'wellness:immune'],
      minProducts: 2,
      maxProducts: 3,
    },
  },
];

// Helper function to find node by ID
export function getNodeById(nodeId: string): ConversationNode | undefined {
  return conversationFlow.find(node => node.id === nodeId);
}

// Helper function to get starting node
export function getStartNode(): ConversationNode {
  return conversationFlow[0];
}
