// Conversational question flow with Andrew's voice

export interface ConversationOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  tags: string[];
}

export interface ConversationQuestion {
  id: string;
  andrewIntro: string; // What Andrew says before the question
  question: string; // The actual question
  subtitle?: string; // Optional clarification
  type: 'single' | 'multiple';
  options: ConversationOption[];
  acknowledgment?: (selectedOptions: string[]) => string; // What Andrew says after you answer
}

export const conversationalQuestions: ConversationQuestion[] = [
  {
    id: 'primary-goal',
    andrewIntro: "Hi, I'm Andrew Lessman. I've spent over 40 years formulating premium supplements, and I'd love to help you find exactly what you need.",
    question: "What brings you here today?",
    subtitle: "Let me know your primary health focus",
    type: 'single',
    options: [
      {
        id: 'heart-health',
        label: 'Heart & Cardiovascular Health',
        icon: '❤️',
        description: 'Support healthy circulation, blood pressure, and heart function',
        tags: ['cardiovascular', 'heart', 'circulation'],
      },
      {
        id: 'energy-vitality',
        label: 'Energy & Vitality',
        icon: '⚡',
        description: 'Combat fatigue and increase daily energy levels',
        tags: ['energy', 'vitality', 'fatigue'],
      },
      {
        id: 'brain-cognitive',
        label: 'Brain Health & Mental Clarity',
        icon: '🧠',
        description: 'Enhance focus, memory, and cognitive performance',
        tags: ['brain', 'cognitive', 'focus', 'memory'],
      },
      {
        id: 'immune-support',
        label: 'Immune System Support',
        icon: '🛡️',
        description: 'Strengthen your body\'s natural defenses',
        tags: ['immune', 'defense', 'wellness'],
      },
      {
        id: 'joint-mobility',
        label: 'Joint Health & Mobility',
        icon: '🦴',
        description: 'Maintain healthy joints and comfortable movement',
        tags: ['joint', 'mobility', 'flexibility'],
      },
      {
        id: 'beauty-skin',
        label: 'Beauty & Skin Health',
        icon: '✨',
        description: 'Support healthy skin, hair, and nails from within',
        tags: ['beauty', 'skin', 'hair', 'nails'],
      },
      {
        id: 'digestive-health',
        label: 'Digestive Health',
        icon: '🌿',
        description: 'Promote comfortable digestion and gut wellness',
        tags: ['digestive', 'gut', 'stomach'],
      },
      {
        id: 'healthy-aging',
        label: 'Healthy Aging',
        icon: '🌟',
        description: 'Support vitality and wellness through the years',
        tags: ['aging', 'longevity', 'vitality'],
      },
    ],
    acknowledgment: (selected) => {
      const responses: Record<string, string> = {
        'heart-health': "Heart health is so important - it affects every aspect of your wellbeing. I'm glad you're being proactive about it.",
        'energy-vitality': "I completely understand. Persistent fatigue affects everything - your work, relationships, and quality of life. Let's find what's causing it.",
        'brain-cognitive': "Brain health is critical, and the right nutrients can make a remarkable difference in focus and memory. I'm here to help.",
        'immune-support': "A strong immune system is your body's first line of defense. Smart approach to support it proactively.",
        'joint-mobility': "Joint health is essential for staying active and independent. The good news is that the right supplements can make a real difference.",
        'beauty-skin': "True beauty starts from within - when your body has the right nutrients, it shows in your skin, hair, and nails.",
        'digestive-health': "Digestive health is foundational. When your gut is healthy, it positively affects your entire body, even your mood.",
        'healthy-aging': "Healthy aging is about maintaining vitality and independence. With the right nutritional support, you can feel your best at any age.",
      };
      return responses[selected[0]] || "Thank you for sharing that with me.";
    },
  },
  {
    id: 'specific-concerns',
    andrewIntro: "Now let me dig a little deeper.",
    question: "Are you experiencing any specific concerns?",
    subtitle: "Select all that apply - or skip if none apply",
    type: 'multiple',
    options: [
      {
        id: 'sleep-quality',
        label: 'Sleep Quality',
        icon: '😴',
        tags: ['sleep', 'rest', 'insomnia'],
      },
      {
        id: 'stress-anxiety',
        label: 'Stress & Occasional Anxiety',
        icon: '😌',
        tags: ['stress', 'anxiety', 'calm'],
      },
      {
        id: 'inflammation',
        label: 'Inflammation & Discomfort',
        icon: '🔥',
        tags: ['inflammation', 'discomfort'],
      },
      {
        id: 'blood-sugar',
        label: 'Blood Sugar Balance',
        icon: '📊',
        tags: ['blood-sugar', 'glucose', 'metabolic'],
      },
      {
        id: 'weight-management',
        label: 'Weight Management',
        icon: '⚖️',
        tags: ['weight', 'metabolism'],
      },
      {
        id: 'eye-health',
        label: 'Eye Health & Vision',
        icon: '👁️',
        tags: ['eyes', 'vision'],
      },
      {
        id: 'bone-density',
        label: 'Bone Density',
        icon: '🦴',
        tags: ['bone', 'density', 'calcium'],
      },
      {
        id: 'hormone-balance',
        label: 'Hormone Balance',
        icon: '⚖️',
        tags: ['hormones', 'balance'],
      },
    ],
    acknowledgment: (selected) => {
      if (selected.length === 0) {
        return "Got it - we'll focus on your primary goal. Let me learn about your lifestyle next.";
      } else if (selected.length === 1) {
        return "This is helpful context. Understanding these details allows me to fine-tune my recommendations specifically for you.";
      } else {
        return "I appreciate you sharing these details. They're all connected, and I'll make sure my recommendations address these concerns holistically.";
      }
    },
  },
  {
    id: 'lifestyle',
    andrewIntro: "Your lifestyle plays a big role in determining what your body needs.",
    question: "Tell me about your lifestyle",
    subtitle: "This helps me recommend the right potencies and formulations",
    type: 'multiple',
    options: [
      {
        id: 'very-active',
        label: 'Very Active (Exercise 4+ times/week)',
        icon: '💪',
        tags: ['active', 'exercise', 'athletic'],
      },
      {
        id: 'moderately-active',
        label: 'Moderately Active (Exercise 1-3 times/week)',
        icon: '🚶',
        tags: ['moderate', 'exercise'],
      },
      {
        id: 'sedentary',
        label: 'Mostly Sedentary (Desk job, limited exercise)',
        icon: '💺',
        tags: ['sedentary', 'desk'],
      },
      {
        id: 'vegetarian-vegan',
        label: 'Vegetarian or Vegan Diet',
        icon: '🥗',
        tags: ['vegetarian', 'vegan', 'plant-based'],
      },
      {
        id: 'high-stress',
        label: 'High-Stress Environment',
        icon: '💼',
        tags: ['stress', 'busy'],
      },
      {
        id: 'outdoor-sun',
        label: 'Limited Sun Exposure',
        icon: '☀️',
        tags: ['vitamin-d', 'indoor'],
      },
    ],
    acknowledgment: (selected) => {
      return "This is very helpful. Your activity level and environment significantly affect your nutritional needs.";
    },
  },
  {
    id: 'demographics',
    andrewIntro: "Just one more question to help me personalize your protocol.",
    question: "A few quick details",
    subtitle: "This is optional, but it helps me tailor recommendations to your specific needs",
    type: 'single',
    options: [
      {
        id: 'female-under-40',
        label: 'Female, Under 40',
        tags: ['female', 'young-adult'],
      },
      {
        id: 'female-40-55',
        label: 'Female, 40-55',
        tags: ['female', 'middle-age'],
      },
      {
        id: 'female-over-55',
        label: 'Female, Over 55',
        tags: ['female', 'senior'],
      },
      {
        id: 'male-under-40',
        label: 'Male, Under 40',
        tags: ['male', 'young-adult'],
      },
      {
        id: 'male-40-55',
        label: 'Male, 40-55',
        tags: ['male', 'middle-age'],
      },
      {
        id: 'male-over-55',
        label: 'Male, Over 55',
        tags: ['male', 'senior'],
      },
      {
        id: 'prefer-not-to-say',
        label: 'Prefer not to say',
        tags: [],
      },
    ],
    acknowledgment: () => {
      return "Perfect. I have everything I need to create your personalized supplement protocol. Give me just a moment to analyze your answers.";
    },
  },
];
