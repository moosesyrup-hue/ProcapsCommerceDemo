# Template System Examples 🎨

This document shows **real examples** of how the template system generates conversational content from your structured data.

---

## Example 1: Ingredient Search - "Magnesium"

### **User searches:** `magnesium`

### **Detection:**
```typescript
detectSearchIntent("magnesium")
// Returns:
{
  type: 'ingredient',
  matchedEntity: {
    name: 'Magnesium',
    category: 'Minerals',
    commonUses: ['Sleep', 'Muscle Function', 'Stress', 'Heart'],
    evidence: 'gold'
  },
  confidence: 0.95
}
```

### **Template Used:**
`generateIngredientContent("Magnesium")`

### **Generated Output:**
```
Title: "Products with Magnesium"

Intro: "You searched for Magnesium. Smart choice—here's why people use it."

Body: "Magnesium is commonly used for sleep, muscle function, stress, heart, 
backed by strong clinical evidence. You'll find it in different forms and 
combinations below.

Some products feature Magnesium as the main ingredient for targeted support, 
while others include it as part of a comprehensive formula with complementary 
nutrients for enhanced benefits. Pick based on whether you want focused 
Magnesium support or a broader approach."

Quick Filters:
- All Forms
- Single Ingredient  
- Complex Formula
```

**Coverage:** Works for **ALL 196 ingredients** automatically! 🎯

---

## Example 2: Health Issue - "Cholesterol Management"

### **User searches:** `cholesterol`

### **Detection:**
```typescript
detectSearchIntent("cholesterol")
// Returns:
{
  type: 'symptom',
  matchedEntity: {
    name: 'Cholesterol Management',
    severity: ['Mild', 'Moderate'],
    category: 'Cardiovascular',
    commonCauses: 'Diet, genetics, liver function, inflammation',
    supportiveApproaches: ['Lipid balance', 'Liver support', 'Antioxidant protection']
  },
  confidence: 0.9
}
```

### **Template Used:**
`generateHealthIssueContent("Cholesterol Management")`

### **Generated Output:**
```
Title: "Let's talk about cholesterol management"

Intro: "Cholesterol Management can feel overwhelming, but you're in the right place."

Body: "This is often caused by diet, genetics, liver function, inflammation. 
The key is addressing what's actually happening in your body, not just 
masking symptoms.

Approaches that help include lipid balance, liver support, antioxidant protection. 
The products below are organized by these different approaches—you can choose 
based on what resonates most with your situation, or browse everything to see 
the full picture."

Quick Filters:
- Mild
- Moderate
- All
```

**Coverage:** Works for **ALL 18 health issues**! 🎯

---

## Example 3: Body Part - "Liver"

### **User searches:** `liver health`

### **Detection:**
```typescript
detectSearchIntent("liver health")
// Returns:
{
  type: 'body-part',
  matchedEntity: {
    name: 'Liver',
    icon: '🫀',
    system: 'Digestive'
  },
  confidence: 0.9
}
```

### **Template Used:**
`generateBodyPartContent("Liver")`

### **Generated Output:**
```
Title: "Supporting your liver"

Intro: "Looking for liver support? You're in the right place."

Body: "Your liver is part of your digestive system, which also includes your 
colon, GI tract, stomach. Supporting one often helps the others.

The products below are specifically formulated to support liver health and 
function. Look for ones with clinical evidence indicators if you want the most 
well-researched options, or browse everything to see the full range of support 
available."

Quick Filters:
- All Support
- Daily Maintenance
- Active Support
```

**Coverage:** Works for **ALL 26 body parts**! 🎯

---

## Example 4: Body Function - "Detoxification"

### **User searches:** `detox`

### **Detection:**
```typescript
detectSearchIntent("detox")
// Returns:
{
  type: 'health-goal',
  matchedEntity: {
    name: 'Detoxification',
    description: 'Cleansing and toxin elimination',
    icon: '🧹',
    color: '#8bc34a',
    evidence: 'silver'
  },
  confidence: 0.85
}
```

### **Template Used:**
`generateBodyFunctionContent("Detoxification")`

### **Generated Output:**
```
Title: "Supporting your detoxification"

Intro: "Detoxification is all about cleansing and toxin elimination. 
Let's help you optimize it."

Body: "Your body relies on specific nutrients to support detoxification. 
Well-researched and effective, so you can feel confident in what you're choosing.

The products below target different aspects of detoxification. Some work quickly 
to address immediate needs, while others build foundational support over time. 
Many people find combining approaches works best for comprehensive support."

Quick Filters:
- All Products
- 🥈 Top Evidence
```

**Coverage:** Works for **ALL 19 body functions**! 🎯

---

## Example 5: Category - "Anti-Aging"

### **User searches:** `anti-aging`

### **Detection:**
```typescript
detectSearchIntent("anti-aging")
// Returns:
{
  type: 'health-goal',
  matchedEntity: {
    name: 'Anti-Aging',
    icon: '⏳',
    color: '#e91e63'
  },
  confidence: 1.0
}
```

### **Template Used:**
`generateCategoryContent("Anti-Aging")`

### **Generated Output:**
```
Title: "Anti-Aging"

Intro: "Aging well isn't about stopping time—it's about supporting your body's 
systems as they change."

Body: "Anti-aging from a nutritional perspective means protecting your cells from 
oxidative stress, supporting collagen production, maintaining brain health, and 
keeping your cardiovascular system strong. The products below target these different 
aspects of healthy aging.

Some focus on cellular protection (antioxidants), others on structural support 
(collagen, bone health), and some on maintaining mental sharpness. Most people 
benefit from a combination approach as they age."

Quick Filters:
- All Products
- Best Sellers
- New
```

**Coverage:** Works for **ALL 21 categories** (with custom templates for some)! 🎯

---

## Example 6: Life Stage - "Menopause"

### **User searches:** `menopause`

### **Detection:**
```typescript
detectSearchIntent("menopause")
// Returns:
{
  type: 'life-stage',
  matchedEntity: {
    stage: 'menopause',
    keywords: ['hormonal balance', 'hot flash']
  },
  confidence: 0.85
}
```

### **Template Used:**
`generateLifeStageContent("menopause", keywords)`

### **Generated Output:**
```
Title: "Nutritional support for menopause"

Intro: "Menopause is a major transition. The right nutritional support can make 
a real difference."

Body: "During menopause, your body needs extra support for hormonal balance, bone 
health (as estrogen decline affects bone density), mood stability, and temperature 
regulation. It's a lot happening at once.

The products below address these different aspects. Some focus on hormonal balance 
and hot flash relief (like Black Cohosh or Soy Isoflavones), others on bone 
protection (Calcium + D3 + K2), and some on mood and sleep support. Many women 
find a combination approach most helpful."

Quick Filters:
- 🌸 Hormone Balance
- 🦴 Bone Health
- 😌 Mood & Sleep
- All
```

**Coverage:** Pre-written templates for top life stages, generic for others! 🎯

---

## Example 7: Symptom - "Brain Fog" (Hand-Written)

### **User searches:** `brain fog`

### **Detection:**
```typescript
detectSearchIntent("brain fog")
// Returns:
{
  type: 'symptom',
  matchedEntity: {
    symptom: 'brain fog',
    keywords: ['cognitive function', 'mental clarity', 'focus']
  },
  confidence: 0.8
}
```

### **Template Used:**
**GOLD STANDARD** - Hand-written in `searchIntent.ts`

### **Generated Output:**
```
Title: "Clearing up that brain fog"

Intro: "Brain fog is that frustrating feeling where your mind just isn't sharp. 
Let's clear it up."

Body: "You know that feeling—like you're thinking through molasses, forgetting words, 
can't focus on what someone's saying. Brain fog usually points to inflammation, poor 
blood flow to the brain, or missing nutrients your brain desperately needs (especially 
B12 and Omega-3 DHA).

The good news? It's usually very responsive to the right support. Most people notice 
a difference within 2-4 weeks when they address the root cause. The products below 
help with different aspects: some boost circulation, others provide brain-building 
fats, some support neurotransmitter balance. Many people find combining approaches 
works best."

Quick Filters:
- 🎯 Focus
- 🧠 Clarity
- 📝 Memory
- All
```

**This is HAND-WRITTEN** because it's a top search. Premium quality! ✨

---

## Example 8: Long-Tail Search - "circulation in legs"

### **User searches:** `circulation in legs`

### **Detection:**
```typescript
detectSearchIntent("circulation in legs")
// Returns:
{
  type: 'body-part',
  matchedEntity: {
    name: 'Legs',
    system: 'Musculoskeletal'
  },
  confidence: 0.9
}
```

### **Template Used:**
`generateBodyPartContent("Legs")`

### **Generated Output:**
```
Title: "Supporting your legs"

Intro: "Looking for legs support? You're in the right place."

Body: "Your legs is part of your musculoskeletal system, which also includes your 
muscles. Supporting one often helps the others.

The products below are specifically formulated to support legs health and function. 
Look for ones with clinical evidence indicators if you want the most well-researched 
options, or browse everything to see the full range of support available."

Quick Filters:
- All Support
- Daily Maintenance  
- Active Support
```

**This demonstrates long-tail coverage!** Even obscure searches get conversational content. 🎯

---

## Example 9: Multiple Matches - "omega-3 for brain"

### **User searches:** `omega-3 for brain`

### **Detection:**
```typescript
detectSearchIntent("omega-3 for brain")
// Returns:
{
  type: 'ingredient',  // Omega-3 is matched first
  matchedEntity: {
    name: 'Omega-3',
    category: 'Fatty Acids & Oils',
    commonUses: ['Heart', 'Brain', 'Joints', 'Inflammation'],
    evidence: 'gold'
  },
  confidence: 0.95
}
```

### **Template Used:**
`generateIngredientContent("Omega-3")`

### **Generated Output:**
```
Title: "Products with Omega-3"

Intro: "You searched for Omega-3. Smart choice—here's why people use it."

Body: "Omega-3 is commonly used for heart, brain, joints, inflammation, backed by 
strong clinical evidence. You'll find it in different forms and combinations below.

Some products feature Omega-3 as the main ingredient for targeted support, while 
others include it as part of a comprehensive formula with complementary nutrients 
for enhanced benefits. Pick based on whether you want focused Omega-3 support or 
a broader approach."

Quick Filters:
- All Forms
- Single Ingredient
- Complex Formula
```

**Notice:** The template naturally mentions "brain" in the uses list! Smart matching. 🎯

---

## Example 10: Fallback - "help me feel better"

### **User searches:** `help me feel better`

### **Detection:**
```typescript
detectSearchIntent("help me feel better")
// Returns:
{
  type: 'general',
  query: 'help me feel better',
  confidence: 0.5,
  suggestions: ['Sleep & Relaxation', 'Energy', 'Brain Health', 'Joint Health']
}
```

### **Template Used:**
`generateFallbackContent("help me feel better")`

### **Generated Output:**
```
Title: "Search results for 'help me feel better'"

Intro: "We found products that might help based on your search."

Body: "While we didn't find an exact match for 'help me feel better', the products 
below are related and may support what you're looking for. Browse by category or use 
the filters to narrow down your options.

If you're not finding what you need, try searching by health goal (like 'better sleep'), 
body part (like 'brain health'), or specific ingredient (like 'magnesium'). We're here 
to help you find the right support."

Quick Filters:
- All Results
- Most Relevant
```

**Even vague searches get helpful, friendly guidance!** 🎯

---

## 📊 Coverage Summary

| Search Type | Example | Template Used | Data Source |
|------------|---------|---------------|-------------|
| **Ingredient** | "magnesium" | `generateIngredientContent()` | `ingredients.ts` |
| **Health Issue** | "cholesterol" | `generateHealthIssueContent()` | `healthIssues.ts` |
| **Body Part** | "liver health" | `generateBodyPartContent()` | `bodyParts.ts` |
| **Body Function** | "detox" | `generateBodyFunctionContent()` | `bodyFunctions.ts` |
| **Category** | "anti-aging" | `generateCategoryContent()` | `categories.ts` |
| **Life Stage** | "menopause" | `generateLifeStageContent()` | Manual keywords |
| **Symptom (Top)** | "brain fog" | Hand-written ✨ | `searchIntent.ts` |
| **Symptom (Other)** | "inflammation" | `generateSymptomContent()` | Templates |
| **Long-tail** | "circulation in legs" | Auto-matches body part | Smart detection |
| **Fallback** | "help me feel better" | `generateFallbackContent()` | Generic |

---

## 🎯 Key Takeaways

1. **196 ingredients** → Instant conversational content for each
2. **18 health issues** → Auto-generated from structured data
3. **26 body parts** → System-aware explanations
4. **19 body functions** → Evidence-based descriptions
5. **21 categories** → Mix of custom + generic templates
6. **Top symptoms** → Hand-written premium content
7. **Life stages** → Pre-written for common ones
8. **Fallbacks** → Friendly even when no match

**Result:** 400+ searches covered with warm, educational, data-driven content! 🚀

---

## 💡 Testing Your Templates

### **Quick Tests You Can Run:**

1. Search for any ingredient: `"Vitamin D3"`, `"Turmeric"`, `"CoQ10"`
2. Search for any body part: `"heart"`, `"joints"`, `"brain"`
3. Search for any health issue: `"fatigue"`, `"anxiety"`, `"joint pain"`
4. Search for any function: `"digestion"`, `"metabolism"`, `"circulation"`
5. Search for a symptom: `"tired"`, `"brain fog"`, `"can't sleep"`

All should give you conversational, helpful content! ✅
