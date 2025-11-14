// Andrew Lessman's Founder Voice - Personal phrases and tone
// Use these to make content feel like it's coming directly from Andrew

export const founderVoice = {
  name: "Andrew Lessman",
  credentials: "Founder & Formulator",
  
  // Personal signature phrases Andrew uses
  signatures: {
    intro: [
      "I've spent decades studying",
      "In my years formulating supplements, I've learned",
      "After years of research and customer feedback, I've found",
      "My philosophy has always been",
      "I've always believed",
    ],
    empathy: [
      "I understand how frustrating this can be",
      "I hear this from customers all the time",
      "This is one of the most common concerns I hear about",
      "I get questions about this every day",
      "So many people tell me they struggle with",
    ],
    recommendation: [
      "Here's what I recommend:",
      "My approach has always been:",
      "I formulated these products specifically to:",
      "I've designed these to address:",
      "What I've found works best is:",
    ],
    quality: [
      "I refuse to compromise on quality",
      "Every ingredient is carefully sourced",
      "I personally oversee every formulation",
      "These meet my own high standards",
      "I wouldn't sell anything I wouldn't take myself",
    ],
    science: [
      "The science is clear on this:",
      "Research shows us that:",
      "Clinical studies have demonstrated:",
      "What we know from decades of research is:",
      "The evidence supports:",
    ],
    honesty: [
      "Let me be honest with you:",
      "I'll tell you straight:",
      "Here's the truth:",
      "I believe in being transparent:",
      "I want you to have realistic expectations:",
    ],
    timeline: [
      "Most of my customers notice",
      "In my experience, people typically see",
      "I usually tell people to expect",
      "Give it time—usually",
      "Patience is important here; typically",
    ],
  },
  
  // First-person conversational transitions
  transitions: {
    explaining: [
      "Let me explain why this matters:",
      "Here's what's happening in your body:",
      "Think of it this way:",
      "I like to explain it like this:",
      "The way I see it:",
    ],
    encouraging: [
      "The good news is",
      "Here's what's encouraging:",
      "What gives me confidence:",
      "The positive side:",
      "What I've seen work time and again:",
    ],
    guiding: [
      "My recommendation is to look for:",
      "I suggest starting with:",
      "Consider these options:",
      "What I'd do in your situation:",
      "Here's how I'd approach this:",
    ],
  },
  
  // Personal stories/anecdotes (use sparingly for authenticity)
  anecdotes: {
    experience: [
      "Over my decades in this industry",
      "Throughout my career formulating supplements",
      "In my years working with customers",
      "After formulating thousands of products",
    ],
    philosophy: [
      "I've always believed in educating people, not just selling to them",
      "My goal has always been to help people make informed choices",
      "I started this company because I wanted to create supplements I could trust",
      "Quality and transparency have been my guiding principles",
    ],
  },
  
  // Closing thoughts that build trust
  closings: [
    "I hope this helps you make the right choice for your health",
    "As always, I'm here to help you find what works for you",
    "Your health is worth investing in properly",
    "I want you to feel confident in your choice",
    "Remember, consistency is key to seeing results",
  ],
};

// Helper function to get a random phrase from an array
export function getRandomPhrase(phrases: string[]): string {
  return phrases[Math.floor(Math.random() * phrases.length)];
}

// Helper function to add founder voice to content
export function addFounderVoice(content: {
  intro?: string;
  body?: string;
}, context: 'empathy' | 'recommendation' | 'science' | 'honesty' | 'quality' = 'recommendation'): {
  intro?: string;
  body?: string;
} {
  const signature = getRandomPhrase(founderVoice.signatures[context]);
  
  return {
    intro: content.intro ? `${signature} ${content.intro.toLowerCase()}` : content.intro,
    body: content.body,
  };
}

// Personal intro variants for different search contexts
export const founderIntros = {
  sleep: "I hear from customers every day about sleep struggles. After years of formulating sleep support products, here's what I've learned works:",
  energy: "Fatigue is one of the most common concerns I hear about. Let me share what I've learned from decades of helping people regain their energy:",
  joints: "Joint discomfort affects so many of my customers. I've spent years developing formulas that address the root causes:",
  brain: "Brain health is close to my heart—I've formulated countless products to support cognitive function. Here's my approach:",
  digestive: "Digestive health is foundational to everything else. I've always believed in addressing gut health first, and here's why:",
  immune: "In my years formulating immune support products, I've learned what truly makes a difference:",
  heart: "Heart health requires a comprehensive approach. Here's what decades of research and formulation have taught me:",
  stress: "Stress management is so important, and I've developed products specifically to support your body's stress response. Here's my philosophy:",
  
  // Generic fallbacks
  healthGoal: "I've formulated products for this specific health goal. Let me share what I've learned:",
  ingredient: "I use this ingredient in many of my formulations. Here's why I believe in it:",
  symptom: "This is one of the most common concerns I hear from customers. Let me help you understand what's happening:",
};

// Andrew's philosophy statements (use for category pages)
export const founderPhilosophy = {
  antiAging: "I believe aging well isn't about fighting nature—it's about giving your body the tools it needs to thrive through every decade. I've formulated these products to support healthy aging from the cellular level up.",
  beauty: "True beauty starts from within. I've always said that the best skincare is the nutrients you put *in* your body. These formulations support your body's natural ability to create beautiful, healthy skin, hair, and nails.",
  quality: "I've built my reputation on one simple principle: I won't sell anything I wouldn't take myself. Every product meets standards that I personally set and oversee.",
  education: "My goal has never been just to sell supplements—it's to educate people so they can make informed choices about their health. That's why I want you to understand not just what to take, but why it works.",
  transparency: "I believe you deserve to know exactly what you're putting in your body and why. No proprietary blends hiding ingredient amounts, no questionable additives. Just pure, potent nutrition.",
};
