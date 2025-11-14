/**
 * Ingredient Card Demo Component
 * 
 * This demonstrates ingredient cards with real Unsplash images.
 * Shows the Top 10 most visually appealing ingredients with photography.
 */

import { ArrowRight, Pill } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DemoIngredient {
  name: string;
  category: string;
  commonUses: string[];
  evidence: 'gold' | 'silver' | 'emerging';
  imageUrl: string;
  notes: string;
}

// Top 10 ingredients with pre-fetched Unsplash images
const demoIngredients: DemoIngredient[] = [
  {
    name: 'Vitamin C',
    category: 'Vitamins',
    commonUses: ['Immune Health', 'Collagen', 'Antioxidant'],
    evidence: 'gold',
    imageUrl: 'https://images.unsplash.com/photo-1661669273498-ee01566be6c3?w=400',
    notes: 'Bright citrus fruits - vibrant and iconic!'
  },
  {
    name: 'Turmeric (Curcumin)',
    category: 'Herbs & Botanicals',
    commonUses: ['Inflammation', 'Joint Health', 'Brain'],
    evidence: 'silver',
    imageUrl: 'https://images.unsplash.com/photo-1673208126879-18094b40d9cf?w=400',
    notes: 'Golden turmeric root - distinctive color'
  },
  {
    name: 'Omega-3',
    category: 'Fatty Acids & Oils',
    commonUses: ['Heart', 'Brain', 'Joints', 'Inflammation'],
    evidence: 'gold',
    imageUrl: 'https://images.unsplash.com/photo-1670850757263-6efc07d410f8?w=400',
    notes: 'Golden softgel capsules - classic supplement look'
  },
  {
    name: 'Echinacea',
    category: 'Herbs & Botanicals',
    commonUses: ['Immune Support', 'Cold & Flu'],
    evidence: 'silver',
    imageUrl: 'https://images.unsplash.com/photo-1707021970546-abd3380f5a8f?w=400',
    notes: 'Purple coneflower - beautiful and recognizable'
  },
  {
    name: 'Blueberry',
    category: 'Fruits & Vegetables',
    commonUses: ['Brain Health', 'Antioxidant', 'Vision'],
    evidence: 'silver',
    imageUrl: 'https://images.unsplash.com/photo-1584459853781-6e4ed51deebf?w=400',
    notes: 'Vibrant blue berries - antioxidant-rich'
  },
  {
    name: 'Ginkgo biloba',
    category: 'Herbs & Botanicals',
    commonUses: ['Memory', 'Circulation', 'Brain Health'],
    evidence: 'silver',
    imageUrl: 'https://images.unsplash.com/photo-1741182892227-239212db1b8b?w=400',
    notes: 'Distinctive fan-shaped golden leaves'
  },
  {
    name: 'Magnesium',
    category: 'Minerals',
    commonUses: ['Sleep', 'Muscle Function', 'Stress', 'Heart'],
    evidence: 'gold',
    imageUrl: 'https://images.unsplash.com/photo-1713274786510-0187c31053ed?w=400',
    notes: 'Dark chocolate and almonds - appealing!'
  },
  {
    name: 'Probiotics',
    category: 'Probiotics & Enzymes',
    commonUses: ['Gut Health', 'Immune', 'Digestion'],
    evidence: 'gold',
    imageUrl: 'https://images.unsplash.com/photo-1620755848138-dd2cbb2781c5?w=400',
    notes: 'Clean supplement capsules'
  },
  {
    name: 'Ashwagandha',
    category: 'Herbs & Botanicals',
    commonUses: ['Stress', 'Energy', 'Hormones'],
    evidence: 'silver',
    imageUrl: 'https://images.unsplash.com/photo-1658354628278-07aae68a61ed?w=400',
    notes: 'Authentic ashwagandha root'
  },
  {
    name: 'Collagen',
    category: 'Proteins & Collagen',
    commonUses: ['Skin', 'Joints', 'Hair & Nails'],
    evidence: 'silver',
    imageUrl: 'https://images.unsplash.com/photo-1636574879131-5f3cd5c8a8e1?w=400',
    notes: 'White collagen powder - beauty/wellness vibe'
  }
];

export function IngredientCardDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] to-[#efe8de] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#003b3c] mb-4">
            ✨ Ingredient Photography Preview
          </h1>
          <p className="text-lg text-[#003b3c]/70 mb-2">
            Top 10 Most Visually Appealing Ingredients with Real Unsplash Images
          </p>
          <p className="text-sm text-[#009296]">
            All 196 ingredients have curated search queries in <code className="bg-white px-2 py-1 rounded">/data/ingredientImages.ts</code>
          </p>
        </div>

        {/* Ingredient Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {demoIngredients.map((ingredient, index) => (
            <div
              key={index}
              className="bg-white hover:shadow-2xl rounded-[12px] overflow-hidden transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
            >
              {/* Image Section */}
              <div className="relative h-[160px] w-full overflow-hidden">
                <ImageWithFallback
                  src={ingredient.imageUrl}
                  alt={ingredient.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Evidence Badge */}
                <div className="absolute top-3 right-3">
                  {ingredient.evidence === 'gold' && (
                    <div className="px-2 py-1 rounded-full bg-[#ffd700] text-white text-[10px] font-bold shadow-lg flex items-center gap-1">
                      <span>🥇</span> Gold
                    </div>
                  )}
                  {ingredient.evidence === 'silver' && (
                    <div className="px-2 py-1 rounded-full bg-[#c0c0c0] text-white text-[10px] font-bold shadow-lg flex items-center gap-1">
                      <span>🥈</span> Silver
                    </div>
                  )}
                </div>

                {/* Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-['Inter',sans-serif] font-bold text-[17px] text-white drop-shadow-lg">
                    {ingredient.name}
                  </h3>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="px-2 py-1 rounded-[6px] bg-[#009296]/10 font-['Inter',sans-serif] text-[11px] text-[#009296] font-semibold">
                    {ingredient.category}
                  </span>
                </div>

                {/* Common Uses */}
                <div className="flex flex-wrap gap-1.5 mb-3 min-h-[56px]">
                  {ingredient.commonUses.map((use, j) => (
                    <span 
                      key={j} 
                      className="px-2 py-1 rounded-[4px] bg-[#efe8de] font-['Inter',sans-serif] text-[10px] text-[#003b3c]"
                    >
                      {use}
                    </span>
                  ))}
                </div>

                {/* Image Note */}
                <p className="text-[10px] text-[#003b3c]/50 font-['Inter',sans-serif] mb-3 line-clamp-2 min-h-[32px]">
                  💡 {ingredient.notes}
                </p>

                {/* CTA */}
                <div className="pt-3 border-t border-[#003b3c]/10">
                  <span className="font-['Inter',sans-serif] text-[12px] text-[#009296] group-hover:underline flex items-center gap-1 font-medium">
                    View products <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Implementation Guide */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-[#003b3c] mb-4">
            🚀 How to Implement
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#003b3c] mb-2">
                1. Import the Configuration
              </h3>
              <pre className="bg-[#003b3c] text-white p-4 rounded-lg overflow-x-auto text-sm">
{`import { getIngredientImageConfig } from './data/ingredientImages';`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#003b3c] mb-2">
                2. Fetch Image Using Unsplash
              </h3>
              <pre className="bg-[#003b3c] text-white p-4 rounded-lg overflow-x-auto text-sm">
{`const config = getIngredientImageConfig('Vitamin C');
// Returns: { primarySearch: 'fresh oranges citrus', imageStyle: 'food-source' }

// Use with unsplash_tool:
const imageUrl = await unsplash_tool({ query: config.primarySearch });`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#003b3c] mb-2">
                3. All 196 Ingredients Ready
              </h3>
              <div className="bg-[#f0fdf4] border-2 border-[#22c55e] rounded-lg p-4">
                <p className="text-[#003b3c] mb-2">
                  ✅ <strong>Complete coverage:</strong> Every ingredient has curated image searches
                </p>
                <p className="text-[#003b3c] mb-2">
                  ✅ <strong>5 visual styles:</strong> Natural, Botanical, Food, Abstract, Scientific
                </p>
                <p className="text-[#003b3c] mb-2">
                  ✅ <strong>Primary + Alternative:</strong> Backup searches if primary doesn't work
                </p>
                <p className="text-[#003b3c]">
                  ✅ <strong>Implementation guides:</strong> See <code className="bg-white px-2 py-0.5 rounded">/guidelines/</code> folder
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#003b3c] mb-2">
                📊 Style Distribution
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="bg-[#fff4e6] p-3 rounded-lg text-center">
                  <div className="text-2xl mb-1">🌿</div>
                  <div className="text-sm font-semibold text-[#003b3c]">Natural</div>
                  <div className="text-xs text-[#003b3c]/60">59 items</div>
                </div>
                <div className="bg-[#eff6ff] p-3 rounded-lg text-center">
                  <div className="text-2xl mb-1">💊</div>
                  <div className="text-sm font-semibold text-[#003b3c]">Abstract</div>
                  <div className="text-xs text-[#003b3c]/60">50 items</div>
                </div>
                <div className="bg-[#f0fdf4] p-3 rounded-lg text-center">
                  <div className="text-2xl mb-1">🌺</div>
                  <div className="text-sm font-semibold text-[#003b3c]">Botanical</div>
                  <div className="text-xs text-[#003b3c]/60">52 items</div>
                </div>
                <div className="bg-[#fef3c7] p-3 rounded-lg text-center">
                  <div className="text-2xl mb-1">🍎</div>
                  <div className="text-sm font-semibold text-[#003b3c]">Food</div>
                  <div className="text-xs text-[#003b3c]/60">35 items</div>
                </div>
                <div className="bg-[#faf5ff] p-3 rounded-lg text-center">
                  <div className="text-2xl mb-1">🔬</div>
                  <div className="text-sm font-semibold text-[#003b3c]">Scientific</div>
                  <div className="text-xs text-[#003b3c]/60">3 items</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#003b3c] mb-2">
                📁 Reference Files
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#009296]">→</span>
                  <span className="text-[#003b3c]">
                    <code className="bg-[#efe8de] px-2 py-0.5 rounded text-sm">/data/ingredientImages.ts</code> - 
                    <span className="text-sm ml-2">TypeScript config for all 196 ingredients</span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#009296]">→</span>
                  <span className="text-[#003b3c]">
                    <code className="bg-[#efe8de] px-2 py-0.5 rounded text-sm">/guidelines/INGREDIENT_IMAGES_GUIDE.md</code> - 
                    <span className="text-sm ml-2">Complete implementation strategy</span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#009296]">→</span>
                  <span className="text-[#003b3c]">
                    <code className="bg-[#efe8de] px-2 py-0.5 rounded text-sm">/guidelines/INGREDIENT_IMAGES_EXAMPLES.md</code> - 
                    <span className="text-sm ml-2">Visual examples with analysis</span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#009296]">→</span>
                  <span className="text-[#003b3c]">
                    <code className="bg-[#efe8de] px-2 py-0.5 rounded text-sm">/data/ingredient-images-reference.csv</code> - 
                    <span className="text-sm ml-2">Spreadsheet for easy reference</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-[#003b3c]/60">
          <p>All images from Unsplash • Free to use • High quality photography</p>
        </div>
      </div>
    </div>
  );
}
