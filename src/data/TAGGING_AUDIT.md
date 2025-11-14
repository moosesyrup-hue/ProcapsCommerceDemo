# Search Experience Tagging Audit

## Current Data Structure

### 1. CATEGORIES (21 total)
**File:** `/data/categories.ts`

- Anti-Aging
- Beauty
- Beverages
- Bone & Skeletal Health
- Brain Health
- Cardiovascular Health
- Circulation
- Digestive Health
- Energy
- Immune Health
- Individual Vitamins & Minerals
- Joint Health
- Meals & Proteins
- Multivitamins
- Pet Products
- Sleep & Relaxation
- Stress & Mood
- Sweeteners
- Vision Health
- Weight Management
- Other

**Status:** ✅ Complete - All 21 categories implemented

---

### 2. BODY PARTS (26 total)
**File:** `/data/bodyParts.ts`

Grouped by Systems:
- **Cardiovascular:** Arteries, Blood, Heart, Veins
- **Digestive:** Colon, GI Tract, Liver, Stomach
- **Nervous:** Brain, Nerves
- **Skeletal:** Bones, Joints
- **Urinary:** Bladder, Kidneys, Urinary Tract
- **Respiratory:** Lungs
- **Muscular:** Muscles, Legs
- **Sensory:** Ears, Eyes
- **Reproductive:** Breast, Prostate, Reproductive System
- **Integumentary:** Hair, Skin & Nails
- **Immune:** Immune System
- **Endocrine:** Endocrine System

**Status:** ✅ Complete - All 26 body parts implemented with system grouping

---

### 3. BODY FUNCTIONS (19 total)
**File:** `/data/bodyFunctions.ts`

All include:
- Name
- Description
- Icon
- Color
- Evidence level (gold/silver)

Functions:
1. Breathing or Respiration
2. Cell Protection
3. Circulation
4. Cognitive Function
5. Detoxification
6. Digestion
7. Energy Production
8. Hormone Balancing
9. Immune Defense
10. Memory
11. Metabolism
12. Mood Balancing
13. Movement
14. Skin Protection
15. Sleep
16. Structural Support
17. Urinary Function
18. Vision
19. Waste Removal

**Status:** ✅ Complete - All 19 functions with clinical evidence indicators

---

### 4. HEALTH ISSUES (18 total)
**File:** `/data/healthIssues.ts`

All include:
- Name
- Severity levels
- Category
- Icon
- Common causes
- Supportive approaches

Issues:
1. Joint Pain & Stiffness
2. Heart & Blood Vessel Health
3. High Blood Pressure
4. Type 2 Diabetes
5. Cholesterol Management
6. Anxiety & Stress
7. Depression
8. Memory & Brain Health
9. Sleep Disorders
10. Immune Health
11. Bone Strength
12. Vision Problems
13. Fatigue
14. Menopause Symptoms
15. Liver Health
16. Urinary Tract Infections
17. Digestive Health
18. Breathing Problems

**Status:** ✅ Complete - All 18 health issues with detailed metadata

---

### 5. INGREDIENTS (200+ total)
**File:** `/data/ingredients.ts`

**Categories:**
- Vitamins
- Minerals
- Amino Acids
- Fatty Acids & Oils
- Herbs & Botanicals
- Antioxidants
- Probiotics & Enzymes
- Proteins & Collagen
- Fruits & Vegetables
- Specialty & Other

All include:
- Name
- Category
- Common uses (array of use cases)
- Evidence level (gold/silver/emerging)

**Status:** ✅ Complete - 200+ ingredients with categories and evidence levels

---

## GAPS & TAGGING NEEDS

### 🚨 Critical Tagging Requirements

#### 1. **Product-to-Category Mapping**
**Current State:** No product data exists yet
**Need:** Each product must be tagged with:
- Primary category
- Secondary categories (if applicable)
- Related subcategories

#### 2. **Product-to-Body Part Mapping**
**Current State:** Body parts exist but not linked to products
**Need:** Products must be tagged with:
- Primary body parts they support
- Secondary body parts
- Body systems

#### 3. **Product-to-Function Mapping**
**Current State:** Body functions exist but not linked to products
**Need:** Products must be tagged with:
- Primary functions they support
- Secondary functions
- Evidence level for each function

#### 4. **Product-to-Health Issue Mapping**
**Current State:** Health issues exist but not linked to products
**Need:** Products must be tagged with:
- Primary health issues they address
- Severity levels they're appropriate for
- Supportive approach alignment

#### 5. **Product-to-Ingredient Mapping**
**Current State:** Ingredients exist but not linked to products
**Need:** Products must contain:
- List of all active ingredients
- Dosage per serving
- Bioavailability form (e.g., "Vitamin D3" vs "Vitamin D2")

---

## SEARCH BADGE ANALYSIS

### Where Badges Appear:
Currently, the search experience doesn't display product result "badges" yet because there's no real product data. The mock data only shows:
- Product name
- Product description
- Price

### What Badges SHOULD Show:
Based on the data structure, each product result should display badges for:

1. **Category Badge** (e.g., "Brain Health", "Joint Support")
2. **Evidence Badge** (e.g., "Gold Standard", "Clinically Backed")
3. **Key Function Badges** (e.g., "Energy Production", "Immune Defense")
4. **Key Ingredient Badges** (e.g., "Omega-3", "Vitamin D3")
5. **Body System Badge** (e.g., "Cardiovascular", "Digestive")

---

## RECOMMENDED TAGGING SCHEMA

### Product Data Structure (Proposed)
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  image?: string;
  
  // Primary Classification
  primaryCategory: string; // from categories.ts
  secondaryCategories?: string[];
  
  // Body Parts & Systems
  bodyParts: string[]; // from bodyParts.ts
  bodySystems: string[]; // derived from bodyParts
  
  // Functions Supported
  functions: {
    name: string; // from bodyFunctions.ts
    evidence: 'gold' | 'silver';
  }[];
  
  // Health Issues Addressed
  healthIssues: {
    name: string; // from healthIssues.ts
    severity: string[];
  }[];
  
  // Ingredients
  ingredients: {
    name: string; // from ingredients.ts
    amount: string;
    form?: string;
  }[];
  
  // Evidence & Research
  evidenceLevel: 'gold' | 'silver' | 'emerging';
  studyCount?: number;
  
  // Search Optimization
  searchKeywords: string[];
  popularFor: string[]; // most common search queries that lead here
}
```

---

## ACTION ITEMS

### Immediate Needs:
1. ✅ Verify all data files are complete (DONE)
2. ⚠️  Create product data file with tagging schema
3. ⚠️  Map existing products to categories
4. ⚠️  Map existing products to body parts
5. ⚠️  Map existing products to functions
6. ⚠️  Map existing products to health issues
7. ⚠️  Map existing products to ingredients
8. ⚠️  Design badge UI for search results
9. ⚠️  Implement filtering logic based on tags
10. ⚠️  Add evidence indicators to search results

### Question for Founder:
**"What subcategories were you referring to?"**
Possible interpretations:
- Product subcategories within the 21 main categories?
- Ingredient subcategories within the 10 ingredient categories?
- Health issue subcategories within the condition categories?
- Additional taxonomy we haven't defined yet?

Please clarify which subcategories you'd like me to cross-check against!
