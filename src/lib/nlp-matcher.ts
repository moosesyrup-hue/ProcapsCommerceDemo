// Simple NLP matching for free-text input
// Maps user input to conversation tags

interface KeywordMatch {
  keywords: string[];
  tags: string[];
  nextNodeId: string;
}

const keywordMatches: KeywordMatch[] = [
  // FATIGUE / ENERGY
  {
    keywords: ['tired', 'exhausted', 'fatigue', 'energy', 'sleepy', 'drowsy', 'worn out', 'drained', 'no energy', 'low energy', 'always tired'],
    tags: ['concern:fatigue'],
    nextNodeId: 'fatigue-1',
  },
  
  // SLEEP
  {
    keywords: ['sleep', 'insomnia', 'cant sleep', "can't sleep", 'falling asleep', 'staying asleep', 'waking up', 'restless', 'tossing and turning'],
    tags: ['concern:sleep'],
    nextNodeId: 'sleep-1',
  },
  
  // JOINT PAIN
  {
    keywords: ['joint', 'joints', 'arthritis', 'stiff', 'stiffness', 'knee pain', 'back pain', 'aching', 'sore joints', 'inflammation'],
    tags: ['concern:joint'],
    nextNodeId: 'joint-1',
  },
  
  // COGNITIVE / BRAIN
  {
    keywords: ['brain fog', 'memory', 'focus', 'concentration', 'forgetful', 'cognitive', 'mental clarity', 'cant focus', "can't focus", 'foggy', 'confused'],
    tags: ['concern:cognitive'],
    nextNodeId: 'cognitive-1',
  },
  
  // DIGESTIVE
  {
    keywords: ['digestion', 'digestive', 'bloating', 'bloated', 'gas', 'constipation', 'stomach', 'gut health', 'ibs', 'indigestion'],
    tags: ['concern:digestive'],
    nextNodeId: 'digestive-1',
  },
  
  // STRESS / ANXIETY
  {
    keywords: ['stress', 'stressed', 'anxiety', 'anxious', 'nervous', 'worried', 'overwhelmed', 'tense'],
    tags: ['concern:sleep', 'symptom:stress-high'],
    nextNodeId: 'sleep-1', // Often related to sleep
  },
  
  // IMMUNE
  {
    keywords: ['immune', 'immunity', 'sick', 'cold', 'flu', 'getting sick', 'illness', 'infection'],
    tags: ['concern:wellness', 'wellness:immune'],
    nextNodeId: 'wellness-immune',
  },
  
  // HEART / CARDIOVASCULAR
  {
    keywords: ['heart', 'cardiovascular', 'circulation', 'blood pressure', 'cholesterol'],
    tags: ['concern:wellness', 'wellness:heart'],
    nextNodeId: 'wellness-heart',
  },
  
  // GENERAL WELLNESS
  {
    keywords: ['healthy', 'wellness', 'prevention', 'multivitamin', 'general health', 'stay healthy', 'longevity', 'aging'],
    tags: ['concern:wellness'],
    nextNodeId: 'wellness-1',
  },
];

export function matchUserInput(input: string): { tags: string[]; nextNodeId: string } | null {
  const normalizedInput = input.toLowerCase().trim();
  
  // Find the best match
  for (const match of keywordMatches) {
    for (const keyword of match.keywords) {
      if (normalizedInput.includes(keyword)) {
        return {
          tags: match.tags,
          nextNodeId: match.nextNodeId,
        };
      }
    }
  }
  
  // No match found - return null to show options
  return null;
}
