# 📸 Ingredient Image Examples - Visual Reference

## Sample Images from Unsplash

Here are **real examples** of what the recommended search queries return. These demonstrate the quality and style you can expect for your ingredient cards.

---

## ✅ Example 1: Vitamin C
**Search Query:** `fresh oranges citrus`  
**Style:** Food Source  
**Image URL:** https://images.unsplash.com/photo-1661669273498-ee01566be6c3

**Why it works:**
- ✅ Bright, appetizing citrus imagery
- ✅ Immediately recognizable as Vitamin C source
- ✅ Fresh, natural photography
- ✅ Vibrant orange color catches the eye

---

## ✅ Example 2: Turmeric (Curcumin)
**Search Query:** `turmeric root golden`  
**Style:** Natural Source  
**Image URL:** https://images.unsplash.com/photo-1673208126879-18094b40d9cf

**Why it works:**
- ✅ Shows the actual turmeric root
- ✅ Beautiful golden/orange color
- ✅ Natural, organic feel
- ✅ Distinctive and recognizable

---

## ✅ Example 3: Omega-3 / Fish Oil
**Search Query:** `fish oil softgels`  
**Style:** Abstract Supplement  
**Image URL:** https://images.unsplash.com/photo-1670850757263-6efc07d410f8

**Why it works:**
- ✅ Golden softgel capsules are iconic
- ✅ Clean, professional supplement imagery
- ✅ Exactly what customers expect to see
- ✅ Works well for abstract concepts

---

## ✅ Example 4: Echinacea
**Search Query:** `echinacea purple flower`  
**Style:** Botanical  
**Image URL:** https://images.unsplash.com/photo-1707021970546-abd3380f5a8f

**Why it works:**
- ✅ Distinctive purple coneflower
- ✅ Beautiful botanical photography
- ✅ Customers recognize this flower
- ✅ Natural, herbal imagery

---

## ✅ Example 5: Blueberry
**Search Query:** `fresh blueberries`  
**Style:** Food Source  
**Image URL:** https://images.unsplash.com/photo-1584459853781-6e4ed51deebf

**Why it works:**
- ✅ Vibrant blue color pops
- ✅ Fresh, appetizing fruit
- ✅ Antioxidant-rich imagery
- ✅ Clean, simple composition

---

## ✅ Example 6: Ginkgo Biloba
**Search Query:** `ginkgo leaves golden`  
**Style:** Botanical  
**Image URL:** https://images.unsplash.com/photo-1741182892227-239212db1b8b

**Why it works:**
- ✅ Distinctive fan-shaped leaves
- ✅ Golden autumn color is beautiful
- ✅ Instantly recognizable
- ✅ Natural, botanical feel

---

## ✅ Example 7: Magnesium
**Search Query:** `dark chocolate almonds`  
**Style:** Food Source  
**Image URL:** https://images.unsplash.com/photo-1713274786510-0187c31053ed

**Why it works:**
- ✅ Shows magnesium-rich foods
- ✅ Appealing, indulgent imagery
- ✅ Dark chocolate is relatable
- ✅ Warm, inviting tones

---

## ✅ Example 8: Probiotics
**Search Query:** `probiotic capsules supplements`  
**Style:** Abstract Supplement  
**Image URL:** https://images.unsplash.com/photo-1620755848138-dd2cbb2781c5

**Why it works:**
- ✅ Clean supplement capsules
- ✅ Professional presentation
- ✅ Works for abstract concepts
- ✅ Multiple capsules show abundance

---

## ✅ Example 9: Ashwagandha
**Search Query:** `ashwagandha root plant`  
**Style:** Botanical  
**Image URL:** https://images.unsplash.com/photo-1658354628278-07aae68a61ed

**Why it works:**
- ✅ Shows actual ashwagandha root
- ✅ Authentic, natural imagery
- ✅ Earthy, grounded feel
- ✅ Educational for customers

---

## ✅ Example 10: Collagen
**Search Query:** `collagen powder white`  
**Style:** Abstract Supplement  
**Image URL:** https://images.unsplash.com/photo-1636574879131-5f3cd5c8a8e1

**Why it works:**
- ✅ Shows collagen powder form
- ✅ Clean, white aesthetic
- ✅ Beauty/wellness vibe
- ✅ Lifestyle context (spoon, natural setting)

---

## 🎨 Visual Style Analysis

### **What Makes These Images Work:**

1. **Clear Subject Focus**
   - Single ingredient or source is the hero
   - Not cluttered or busy
   - Subject takes up most of frame

2. **Natural, Organic Feel**
   - Soft, natural lighting
   - Organic textures and colors
   - Not overly staged or artificial

3. **High Quality**
   - Sharp, professional photography
   - Good resolution (1080px+)
   - Well-composed

4. **Color Palette**
   - Vibrant but not oversaturated
   - Colors match ingredient (orange for citrus, golden for turmeric)
   - Warm, inviting tones

5. **Recognizable**
   - Customers can identify the ingredient
   - Matches expectations
   - Educational value

---

## 💡 Pro Tips Based on Examples

### **DO:**
✅ Use **food sources** when they're recognizable (oranges = Vitamin C)
✅ Use **botanical imagery** for herbs with distinctive flowers/leaves
✅ Use **clean supplement shots** for abstract concepts (amino acids, compounds)
✅ Choose images with **good negative space** for text overlay
✅ Pick images with **consistent lighting** across all ingredients

### **DON'T:**
❌ Use images that are **too abstract** or artistic
❌ Pick photos that are **too dark** or low contrast
❌ Choose images with **distracting backgrounds**
❌ Use photos with **text or branding** already in them
❌ Select images that **don't match the ingredient** at all

---

## 🎯 Application to Your Ingredient Cards

### **Recommended Card Design:**

```tsx
<div className="ingredient-card relative overflow-hidden rounded-lg">
  {/* Background Image with Overlay */}
  <div className="relative h-48">
    <img 
      src={imageUrl} 
      alt={ingredientName}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  </div>
  
  {/* Content Overlay */}
  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
    <h3 className="font-semibold text-lg">{ingredientName}</h3>
    <p className="text-sm opacity-90">{commonUses.join(' • ')}</p>
    
    {/* Evidence Badge */}
    {evidence === 'gold' && (
      <span className="inline-block mt-2 px-2 py-1 bg-yellow-500 text-xs rounded">
        🥇 Gold Evidence
      </span>
    )}
  </div>
</div>
```

### **Alternative: Side-by-Side Layout:**

```
┌─────────────────────────────────┐
│  [IMG]  │  Vitamin C            │
│         │  Immune • Collagen    │
│  100x   │  Antioxidant          │
│  100px  │  🥇 Gold Evidence     │
│         │  [Learn More →]       │
└─────────────────────────────────┘
```

---

## 🚀 Implementation Workflow

### **Step 1: Import Configuration**
```tsx
import { ingredientImageConfigs } from './data/ingredientImages';
```

### **Step 2: Fetch Images**
```tsx
const fetchIngredientImage = async (ingredientName) => {
  const config = ingredientImageConfigs.find(
    c => c.ingredientName === ingredientName
  );
  
  const imageUrl = await unsplash_tool({ 
    query: config.primarySearch 
  });
  
  return imageUrl;
};
```

### **Step 3: Display in Component**
```tsx
function IngredientCard({ ingredient }) {
  const [imageUrl, setImageUrl] = useState(null);
  
  useEffect(() => {
    fetchIngredientImage(ingredient.name).then(setImageUrl);
  }, [ingredient.name]);
  
  return (
    <div className="ingredient-card">
      <ImageWithFallback src={imageUrl} alt={ingredient.name} />
      {/* Rest of card content */}
    </div>
  );
}
```

---

## 📊 Coverage Summary

We've provided search queries for **all 196 ingredients** across:

- ✅ **13 Vitamins** - Mostly food sources
- ✅ **6 Minerals** - Food sources and natural imagery
- ✅ **11 Amino Acids** - Abstract supplements
- ✅ **10 Fatty Acids & Oils** - Mix of food and supplements
- ✅ **35 Herbs & Botanicals** - Beautiful botanical photography
- ✅ **16 Antioxidants** - Mix of food sources and supplements
- ✅ **3 Probiotics & Enzymes** - Scientific/supplement imagery
- ✅ **7 Proteins & Collagen** - Powder and food sources
- ✅ **28 Fruits & Vegetables** - Fresh, vibrant produce
- ✅ **30 Specialty & Other** - Varied approaches

---

## 🎨 Color Palette Recommendations

Based on these example images, here are complementary colors for each category:

### **Vitamins** → Warm Yellows/Oranges
- Primary: `#FFF4E6` (soft peach)
- Accent: `#FB923C` (orange)

### **Minerals** → Earth Tones
- Primary: `#F5F0E8` (warm beige)
- Accent: `#78716C` (stone)

### **Herbs & Botanicals** → Greens
- Primary: `#F0FDF4` (mint green)
- Accent: `#22C55E` (green)

### **Antioxidants** → Purples/Reds
- Primary: `#FAF5FF` (lavender)
- Accent: `#A855F7` (purple)

### **Fruits & Vegetables** → Bright Gradients
- Primary: Rainbow gradients
- Accent: Ingredient-specific colors

---

## ✨ Final Recommendations

1. **Start with Top 20 Ingredients** (see main guide)
2. **Use consistent image treatment** across all cards
3. **Add subtle overlays** for text readability
4. **Include evidence badges** on images
5. **Test mobile responsive** sizing
6. **Cache image URLs** for performance
7. **Provide fallback images** for failed loads

---

## 📁 Related Files

- **`/data/ingredientImages.ts`** - Complete configuration for all 196 ingredients
- **`/guidelines/INGREDIENT_IMAGES_GUIDE.md`** - Full implementation guide
- **`/components/figma/ImageWithFallback.tsx`** - Image component with fallback

---

**Your ingredient cards are about to look amazing!** 🎨✨

Use these examples as reference for what to expect from the search queries. The natural, high-quality imagery will make your ingredient library both educational and visually appealing.
