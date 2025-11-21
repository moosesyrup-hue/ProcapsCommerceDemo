# Procaps Design System
**Complete Style Guide & Component Specifications**

Last Updated: November 14, 2024

---

## 📋 Table of Contents
1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Form Elements](#form-elements)
4. [Buttons](#buttons)
5. [Spacing System](#spacing-system)
6. [Breakpoints](#breakpoints)
7. [Components](#components)

---

## 🎨 Color Palette

### Primary Colors
```css
--primary-teal: #009296          /* Main brand color */
--primary-teal-hover: #007d81    /* Hover state */
--primary-teal-light: #0CA9AD    /* Light variant */

--primary-dark: #003b3c          /* Dark text, backgrounds */
--primary-dark-hover: #005456    /* Dark hover state */
```

### Secondary Colors
```css
--secondary-gray: #406c6d        /* Secondary text */
--secondary-light: #C2CFCF       /* Disabled states */
--border-gray: #D9E2E2           /* Borders, dividers */
--background-light: #F5F9F9      /* Light backgrounds */
```

### Status Colors
```css
--success-green: #4CAF50         /* Valid states */
--error-red: #D84315             /* Errors, alerts */
--sale-red: #D84315              /* Sale prices */
```

### Text Colors
```css
--text-primary: #003b3c          /* Main text */
--text-secondary: #406c6d        /* Secondary text */
--text-white: #ffffff            /* White text */
--text-placeholder: #C2CFCF      /* Placeholder text */
```

---

## ✍️ Typography

### Font Families
```css
/* Primary Font */
font-family: 'Inter', sans-serif;

/* Serif Font (Headings) */
font-family: 'STIX Two Text', serif;
```

### Font Sizes
```css
/* Do NOT use Tailwind text size classes - use these instead */
text-[12px]  /* Small text, captions */
text-[14px]  /* Body text, labels */
text-[16px]  /* Form inputs, buttons */
text-[18px]  /* Product headlines (small screens) */
text-[20px]  /* Product headlines (medium screens) */
text-[24px]  /* Section headings */
text-[34px]  /* Large headings */
```

### Line Heights
```css
leading-[20px]  /* For 16px text in form fields */
leading-[1.4]   /* For body text */
leading-[1.5]   /* Default for most text */
```

### Font Weights
```css
font-normal    /* 400 - Body text */
font-medium    /* 500 - Headings, buttons */
```

---

## 📝 Form Elements

### Text Input Fields

**Specifications:**
```tsx
// Structure
<input className="
  w-full 
  py-[18px] px-[16px]           // Padding (total height: 56px)
  border rounded-[8px]          // 8px border radius
  font-['Inter',sans-serif] 
  text-[16px] leading-[20px]    // Text sizing
  text-[#003b3c]                // Text color
  focus:outline-none 
  transition-colors
  
  // Border states
  border-[#D9E2E2]              // Default
  hover:border-[#003b3c]        // Hover
  focus:border-[#003b3c]        // Focus (1px)
  
  // Error state
  border-[#D84315]              // Error
" />
```

**Floating Label Pattern:**
```tsx
// Placeholder position (when empty, not focused)
className="
  absolute 
  left-[16px] top-[18px]        // Matches input padding
  font-['Inter',sans-serif] 
  text-[16px] leading-[20px]    // MUST match input text
  text-[#406c6d]                // Gray color
  pointer-events-none
"

// Floating position (when focused or has value)
className="
  absolute 
  left-[12px] top-[-8px]        // Moves up and out
  px-[4px] bg-white             // White background for notch
  font-['Inter',sans-serif] 
  text-[12px]                   // Smaller
  text-[#003b3c]                // Dark when focused
  pointer-events-none
"
```

**Field States:**
- **Default:** `border-[#D9E2E2]`
- **Hover:** `border-[#003b3c]`
- **Focus:** `border-[#003b3c]` (1px solid)
- **Error:** `border-[#D84315]`
- **Valid:** Green checkmark icon + `border-[#D9E2E2]`

**Validation Icons:**
```tsx
// Success (right side, centered vertically)
<div className="absolute right-[16px] top-1/2 -translate-y-1/2">
  <div className="w-[20px] h-[20px] rounded-full bg-[#4CAF50] flex items-center justify-center">
    <Check className="w-[12px] h-[12px] text-white" />
  </div>
</div>

// Lock Icon (for secure fields)
<div className="absolute right-[16px] top-1/2 -translate-y-1/2">
  <Lock className="w-[18px] h-[18px] text-[#406c6d]" />
</div>
```

**Error Messages:**
```tsx
<p className="
  font-['Inter',sans-serif] 
  text-[12px] 
  text-[#D84315] 
  mt-[6px]
">
  {error}
</p>
```

---

### Select Dropdowns

**Same as text inputs, plus:**
```tsx
<select className="
  // ... all text input classes ...
  appearance-none bg-white      // Remove default arrow
  h-[56px]                      // Fixed height for selects
" />

// Custom dropdown arrow (absolute positioned, right side)
<svg width="12" height="8" viewBox="0 0 12 8" fill="none">
  <path 
    d="M1 1.5L6 6.5L11 1.5" 
    stroke="#406c6d" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  />
</svg>
```

---

### Checkboxes

**Custom Styled (defined in `/styles/globals.css`):**
```css
.custom-checkout-checkbox {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid #D9E2E2;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
}

.custom-checkout-checkbox:checked {
  background-color: #003b3c;
  border-color: #003b3c;
}

.custom-checkout-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
```

**Usage:**
```tsx
<input 
  type="checkbox" 
  className="custom-checkout-checkbox"
/>
```

---

### Radio Buttons

**Custom Styled (defined in `/styles/globals.css`):**
```css
.custom-checkout-radio {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #D9E2E2;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
}

.custom-checkout-radio:checked {
  background-color: #003b3c;
  border-color: #003b3c;
}

.custom-checkout-radio:checked::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: white;
}
```

**Usage:**
```tsx
<input 
  type="radio" 
  className="custom-checkout-radio"
/>
```

**Radio Button Cards (Shipping options):**
```tsx
<label className={`
  flex items-center justify-between 
  p-[16px] 
  rounded-[8px] 
  cursor-pointer 
  transition-all
  ${selected 
    ? 'bg-[#F5F9F9] border-2 border-[#009296]'  // Selected
    : 'bg-white border-2 border-[#D9E2E2]'      // Default
  }
`}>
  {/* Content */}
</label>
```

---

## 🔘 Buttons

### Primary Button (CTA)
```tsx
<button className="
  h-[56px] px-[24px]
  rounded-[999px]               // Fully rounded
  bg-[#009296]                  // Primary teal
  hover:bg-[#007d81]            // Darker on hover
  text-white 
  font-['Inter',sans-serif] 
  font-medium 
  text-[16px] 
  tracking-[1.92px]             // Letter spacing
  uppercase
  transition-colors
  cursor-pointer
">
  Button Text
</button>
```

### Disabled Button
```tsx
<button className="
  bg-[#C2CFCF]                  // Light gray
  cursor-not-allowed
  // ... rest of button styles ...
" disabled>
  Button Text
</button>
```

### Secondary Button (Text Link)
```tsx
<button className="
  text-[#009296]                // Teal text
  hover:underline
  font-['Inter',sans-serif] 
  text-[14px]
">
  Link Text
</button>
```

### Button with Icon
```tsx
<button className="flex items-center gap-[8px]">
  <span>Button Text</span>
  <Lock className="w-[16px] h-[16px]" />
</button>
```

---

## 📏 Spacing System

**Use exact pixel values:**
```css
gap-[8px]      /* Tight spacing */
gap-[12px]     /* Small spacing */
gap-[16px]     /* Medium spacing */
gap-[20px]     /* Large spacing */
gap-[24px]     /* Extra large spacing */
gap-[40px]     /* Section spacing */
gap-[60px]     /* Major section spacing */

/* Padding */
p-[12px]       /* Small padding */
p-[16px]       /* Medium padding */
p-[20px]       /* Large padding */

/* Margins */
mb-[6px]       /* Error message spacing */
mb-[12px]      /* Small bottom margin */
mb-[20px]      /* Section heading margin */
mt-[24px]      /* Top margin for sections */
```

---

## 📱 Breakpoints

**Defined in `/styles/globals.css`:**
```css
/* Small screens: 375-767px (default mobile) */

/* M breakpoint: 768px and up */
@media (min-width: 768px)

/* L breakpoint: 1280px and up */
@media (min-width: 1280px)

/* XL breakpoint: 1440px and up */
@media (min-width: 1440px)

/* HD breakpoint: 1920px and up */
@media (min-width: 1920px)
```

**Tailwind Custom Variants:**
```tsx
m:text-[20px]     // At 768px+
lg:text-[22px]    // At 1280px+
xl:text-[24px]    // At 1440px+
hd:text-[28px]    // At 1920px+
```

---

## 🧩 Components

### Card Border Radius
```css
rounded-[8px]    /* Small cards, inputs */
rounded-[12px]   /* Medium cards */
rounded-[999px]  /* Pills, buttons */
```

---

### CollectionBanner Component
**Location:** `/components/CollectionBanner.tsx`

**Image Specifications:**
- **Aspect Ratio:** 840 × 413px (approximately 2.03:1)
- **Recommended Size:** 1680 × 826px (2x for retina displays)
- **Minimum Size:** 840 × 413px

**Layout Behavior:**
- 📱 **Mobile/Tablet:** Image stacked above text (full width)
- 💻 **Desktop (1280px+):** Image beside text (side by side)

**Props:**
```tsx
interface CollectionBannerProps {
  title: string;                    // Main heading
  description: string;               // Description text
  imageSrc?: string;                 // Image URL (PNG, JPG)
  svgPath?: string;                  // SVG path data (for inline SVG)
  backgroundColor?: string;          // Banner background (desktop only)
  imageBackgroundColor?: string;     // Image container background
  svgFillColor?: string;             // SVG fill color
}
```

**Usage with Image:**
```tsx
<CollectionBanner
  title="Digestive health"
  description="Maintaining a healthy digestion system is crucial for your overall health."
  imageSrc="/images/digestive-health.png"
  backgroundColor="#efe8de"
  imageBackgroundColor="#e5ddd3"
/>
```

**Usage with SVG:**
```tsx
<CollectionBanner
  title="Heart Health"
  description="Support cardiovascular wellness with targeted nutrition."
  svgPath={heartIconPath}
  backgroundColor="#ffeaea"
  imageBackgroundColor="#ffe0e0"
  svgFillColor="#ff6b6b"
/>
```

**Styling:**
- Title font: `STIX Two Text`, responsive sizing (28px → 72px)
- Description font: `Inter`, 16px (20px on XXL screens)
- Text color: `#003b3c`
- Default backgrounds: `#efe8de` (banner), `#e5ddd3` (image area)

---

## 🎯 Component Patterns

### Progress Bar
```tsx
<div className="relative w-full h-[6px] bg-[#D9E2E2] rounded-full overflow-hidden">
  <div 
    className="absolute left-0 top-0 h-full bg-[#009296] transition-all duration-300 ease-out rounded-full"
    style={{ width: `${progress}%` }}
  />
</div>
```

### Product Card Image
```tsx
<div className="w-[80px] h-[80px] rounded-[8px] overflow-hidden shrink-0">
  <img 
    src={image} 
    alt={name}
    className="w-full h-full object-cover"
  />
</div>
```

### Price Display
```tsx
{/* Sale Price */}
<p className="font-['Inter',sans-serif] font-medium text-[14px] text-[#D84315]">
  ${price.toFixed(2)}
</p>

{/* Original Price (crossed out) */}
<p className="font-['Inter',sans-serif] text-[12px] text-[#406c6d] line-through">
  ${originalPrice.toFixed(2)}
</p>
```

### Section Divider
```tsx
<div className="border-t border-[#D9E2E2]"></div>
```

---

## 📦 Reusable Components

### FormField Component
**Location:** `/components/CheckoutPage.tsx` (lines 40-113)

**Props:**
```tsx
interface FormFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  isValid?: boolean;
  showLockIcon?: boolean;
}
```

**Usage:**
```tsx
<FormField
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
  onBlur={() => handleBlur('email', email)}
  error={errors.email}
  required
  isValid={isFieldValid('email', email)}
/>
```

---

### SelectField Component
**Location:** `/components/CheckoutPage.tsx` (lines 127-199)

**Props:**
```tsx
interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}
```

**Usage:**
```tsx
<SelectField
  label="State"
  value={state}
  onChange={setState}
  error={errors.state}
  required
  options={stateOptions}
/>
```

---

## ♿ Accessibility

### Form Field Accessibility
```tsx
// Input with proper ARIA attributes
<input
  id={fieldId}
  aria-invalid={error ? 'true' : 'false'}
  aria-describedby={error ? `${fieldId}-error` : undefined}
/>

// Label connected to input
<label htmlFor={fieldId}>
  {label}
</label>

// Error message with ID
<p id={`${fieldId}-error`}>
  {error}
</p>
```

### Button Accessibility
```tsx
// Button with aria-label for icon-only
<button aria-label="Customer service chat">
  <MessageCircle />
</button>
```

---

## 🚨 Important Rules

### ❌ DO NOT USE:
- ~~Tailwind font size classes~~ (text-base, text-lg, text-xl, etc.)
- ~~Tailwind font weight classes~~ (font-bold)
- ~~Tailwind line-height classes~~ (leading-normal, leading-tight)
- Generic color names (use hex codes)

### ✅ ALWAYS USE:
- Exact pixel values: `text-[16px]`, `leading-[20px]`
- Exact hex colors: `text-[#003b3c]`
- Font family declarations: `font-['Inter',sans-serif]`
- Consistent spacing values from the spacing system

---

## 📝 Notes for Backend Developers

1. **All measurements are in pixels** - Easy to translate to any backend framework
2. **Colors are hex codes** - Universal across all platforms
3. **Component patterns are well-documented** - Copy-paste ready
4. **Accessibility is built-in** - All ARIA attributes included
5. **No magic values** - Everything is explicit and documented

---

## 🔄 Version History

- **v1.0** - November 14, 2024 - Initial design system documentation

---

**Questions?** Reference this guide for all styling decisions.