/**
 * OUR STORY PAGE - CONTENT SNAPSHOT
 * 
 * This file contains all copy, headlines, and content for the Our Story page.
 * Created as a content snapshot to preserve finalized copy across future updates.
 * 
 * Last updated: December 17, 2024
 */

// ============================================================================
// HERO SECTION
// ============================================================================

export const heroContent = {
  headline: {
    line1: "Made",
    line1Emphasis: "differently.",
    line2: "For a reason."
  },
  subheadline: "Founded by Andrew Lessman in 1979. Still owner-operated. The only facility in the world creating 100% pure, additive-free supplements powered entirely by solar energy.",
  pillTabs: [
    "Founded 1979",
    "100% Solar Powered",
    "Owner-Operated"
  ]
};

// ============================================================================
// FOUNDER SECTION
// ============================================================================

export const founderContent = {
  eyebrow: "MEET ANDREW LESSMAN",
  headline: {
    line1: "Founder owned.",
    line2: "Always.",
    line2Color: "#009296" // teal
  },
  body: [
    "Andrew Lessman—biochemist, law student, and elite decathlon athlete—founded ProCaps in 1979 after realizing most supplements were low quality and made without regard to scientific research.",
    "He created the world's first 100% pure, additive-free vitamins for his own athletic needs. The company remains privately owned with no shareholders or board of directors—just Andrew's unwavering commitment to your health."
  ],
  quote: {
    text: "\"I'd rather focus on prevention than illness.\"",
    author: "- Andrew Lessman"
  }
};

// ============================================================================
// VALUES SECTION
// ============================================================================

export const valuesContent = {
  eyebrow: "WHAT SETS US APART",
  headline: {
    line1: "Changing times,",
    line2: "enduring",
    line2Suffix: " values."
  },
  cards: {
    row1: [
      {
        title: "100% pure & additive-free",
        description: "The only vitamins in the world completely free of additives, fillers, and artificial ingredients.",
        icon: "shield" as const
      },
      {
        title: "Solar-powered manufacturing",
        description: "One of the largest private solar installations powers our entire facility—the only supplement manufacturer to do so.",
        icon: "sun" as const
      }
    ],
    row2: [
      {
        title: "We make what we sell",
        description: "Complete control from formulation to manufacturing in our Henderson, Nevada facility ensures unmatched quality.",
        icon: "flask" as const
      },
      {
        title: "Environmental excellence",
        description: "LEED Gold certified for green energy, environmental responsibility, and an outstanding work environment.",
        icon: "leaf" as const
      }
    ]
  }
};

// ============================================================================
// BY THE NUMBERS SECTION
// ============================================================================

export const byTheNumbersContent = {
  eyebrow: "BY THE NUMBERS",
  headline: "Proven impact.\nMeasurable results.",
  stats: [
    {
      value: 45,
      suffix: "+",
      label: "Years in Business"
    },
    {
      value: 500,
      suffix: "M+",
      label: "Supplements Manufactured"
    },
    {
      value: 25,
      suffix: "M+",
      label: "kWh Solar Energy Generated"
    },
    {
      value: 15,
      suffix: "K+",
      label: "Tons CO₂ Emissions Prevented"
    }
  ]
};

// ============================================================================
// ENVIRONMENTAL SECTION
// ============================================================================

export const environmentalContent = {
  eyebrow: "ENVIRONMENTAL LEADERSHIP",
  headline: {
    line1: "Solar powered.",
    line2: "Future focused.",
    line2Color: "#009296" // teal
  },
  body: [
    "Our Henderson, Nevada facility features one of the largest private solar installations in the world, generating over 25 million kWh of clean energy annually.",
    "LEED Gold certified for environmental excellence, our operations prevent over 15,000 tons of CO₂ emissions each year—equivalent to taking 3,000 cars off the road."
  ],
  quote: {
    text: "\"We're not just making supplements. We're protecting the planet for future generations.\"",
    author: "- Andrew Lessman"
  }
};

// ============================================================================
// TIMELINE SECTION
// ============================================================================

export const timelineContent = {
  eyebrow: "OUR JOURNEY",
  headline: "Four decades\nof excellence.",
  items: [
    {
      year: "1979",
      title: "Founded by Andrew Lessman",
      description: "Created the world's first 100% pure, additive-free vitamins for elite athletes and health professionals.",
      side: "left" as const
    },
    {
      year: "1980s",
      title: "Television Pioneer",
      description: "First to bring nutritional supplements to QVC with education-based presentations.",
      side: "right" as const
    },
    {
      year: "1996",
      title: "State-of-the-Art Facility",
      description: "Moved to HSN and built a 125,000 sq ft manufacturing facility in Henderson, Nevada.",
      side: "left" as const
    },
    {
      year: "TODAY",
      title: "ProCaps Laboratories",
      description: "Still founder-owned. Solar-powered. Dedicated to the world's finest supplements.",
      side: "right" as const
    }
  ]
};

// ============================================================================
// EDUCATION SECTION
// ============================================================================

export const educationContent = {
  eyebrow: "EDUCATION & TRANSPARENCY",
  headline: {
    line1: "Knowledge is",
    line2: "power.",
    line2Color: "#009296" // teal
  },
  body: [
    "Andrew personally hosts over 100 educational videos, explaining the science behind every product. No secrets. No hidden ingredients. Complete transparency.",
    "Every label lists every ingredient in plain English. Every product comes with Andrew's personal guarantee. Because when you understand what you're taking, you can make better decisions for your health."
  ],
  quote: {
    text: "\"I believe an informed customer is the best customer.\"",
    author: "- Andrew Lessman"
  }
};

// ============================================================================
// DESIGN SPECIFICATIONS
// ============================================================================

export const designSpecs = {
  colors: {
    teal: "#009296",
    tealLight: "#48E1DC",
    tealLighter: "#e8f9f9",
    darkGreen: "#003b3c",
    beige: "#f6f2ec",
    lineColor: "#D9E2E2",
    white: "#ffffff"
  },
  timeline: {
    circleDiameter: 140, // px
    circleBorderWidth: 2, // px
    verticalLineHeight: 200, // px
    verticalLineWidth: 1.5, // px
    yearFontSize: 20, // px
    titleFontSize: 28, // px
    descriptionFontSize: 20 // px
  },
  animations: {
    scrollMargin: "-100px",
    once: true,
    circleDuration: 0.5, // seconds
    contentDuration: 0.6, // seconds
    lineDuration: 0.6, // seconds
    circleDelay: 0, // seconds
    contentDelay: 0.2, // seconds
    lineDelay: 0.3 // seconds
  }
};
