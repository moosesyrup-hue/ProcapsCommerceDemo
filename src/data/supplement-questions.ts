export interface QuestionOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  tags: string[];
}

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  type: 'single' | 'multiple';
  options: QuestionOption[];
  educationalNote?: string;
}

export const questions: Question[] = [
  {
    id: 'primary-goal',
    title: 'What brings you here today?',
    subtitle: 'Select your primary health focus',
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
    educationalNote: 'Your primary goal helps me understand what\'s most important to you right now.',
  },
  {
    id: 'specific-concerns',
    title: 'Any specific concerns?',
    subtitle: 'Select all that apply - or skip if none apply',
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
    educationalNote: 'These details help me fine-tune my recommendations to your specific needs.',
  },
  {
    id: 'lifestyle',
    title: 'Tell me about your lifestyle',
    subtitle: 'This helps me recommend the right potencies and formulations',
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
    educationalNote: 'Your lifestyle affects your nutritional needs. For example, athletes need different support than desk workers.',
  },
  {
    id: 'demographics',
    title: 'A few quick details',
    subtitle: 'Optional - but helps me personalize your protocol',
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
    educationalNote: 'Age and gender can influence nutritional needs. Women over 40 may benefit from different formulations than men under 40, for example.',
  },
];
