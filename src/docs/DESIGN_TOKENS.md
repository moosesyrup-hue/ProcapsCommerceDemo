# Andrew Lessman Design System - Developer Handoff Documentation

**Last Updated:** December 8, 2024  
**Status:** Production Ready  
**Target:** Blazor/Azure Development Team

---

## 📋 Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing System](#spacing-system)
4. [Border Radius](#border-radius)
5. [Breakpoints](#breakpoints)
6. [Components](#components)
7. [Layout Patterns](#layout-patterns)
8. [Interactive States](#interactive-states)

---

## 🎨 Color Palette

### Brand Colors

| Token Name | Hex Value | CSS Variable | Usage |
|------------|-----------|--------------|-------|
| **Teal Dark** | `#009296` | `--color-teal-dark` | Primary buttons, CTAs, icons, links |
| **Teal Bright** | `#48E1DC` | `--color-teal-bright` | Emphasis text, underlines, accents |
| **Navy Dark** | `#003b3c` | `--color-navy-dark` | Body text, headings, dark elements |
| **Navy Medium** | `#406c6d` | `--color-navy-medium` | Secondary text, labels |
| **Cream** | `#f6f2ec` | `--color-cream` | Section backgrounds, cards |
| **Gray Light** | `#D9E2E2` | `--color-gray-light` | Borders, dividers (LOCKED STANDARD) |
| **Gray Medium** | `#C2CFCF` | `--color-gray-medium` | Hover states for borders |
| **Gold** | `#F1A33A` | `--color-gold` | Star ratings, special badges |
| **Error Red** | `#D84315` | `--color-error` | Error states, validation |
| **White** | `#FFFFFF` | N/A | Backgrounds, button text |

### Color Usage Rules

```css
/* Primary Actions */
background-color: #009296;
color: #ffffff;

/* Secondary Actions */
background-color: #ffffff;
border: 1px solid #009296;
color: #009296;

/* Emphasis Text (Italic Headlines) */
color: #48E1DC;
font-style: italic;

/* Standard Borders (ALWAYS USE) */
border-color: #D9E2E2;

/* Text */
color: #003b3c; /* Primary text */
color: #406c6d; /* Secondary text */
```

---

## ✍️ Typography

### Font Families

```css
/* Headlines */
font-family: 'STIX Two Text', serif;

/* Body Copy, Labels, Buttons */
font-family: 'Inter', sans-serif;
```

### Headline Scale

| Token | Size | Letter Spacing | Line Height | When to Use |
|-------|------|----------------|-------------|-------------|
| `--text-headline-hd` | 72px | -1.44px | 1.1 | HD displays (1920px+) |
| `--text-headline-xl` | 54px | -1.08px | 1.1 | Large desktop (1440-1919px) |
| `--text-headline-lg` | 38px | -0.76px | 1.1 | Desktop (1280-1439px) |
| `--text-headline-md` | 34px | -0.68px | 1.1 | Tablet/Mobile (768px+) |
| `--text-headline-sm` | 24px | -0.48px | 1.1 | Small headlines |

### Body Text Scale

| Token | Size | Letter Spacing | Line Height | When to Use |
|-------|------|----------------|-------------|-------------|
| `--text-body-xl` | 28px | -0.4px | 1.4 | Large quotes, featured text |
| `--text-body-lg` | 20px | -0.2px | 1.4 | Desktop body text |
| `--text-body-md` | 16px | -0.16px | 1.4 | Mobile/tablet body text |
| `--text-body-sm` | 14px | -0.14px | 1.4 | Small text, captions |
| `--text-body-xs` | 12px | -0.12px | 1.4 | Labels, helper text |

### Typography Examples

```css
/* Headline - Desktop */
h1 {
  font-family: 'STIX Two Text', serif;
  font-size: 54px;
  font-weight: 500;
  letter-spacing: -1.08px;
  line-height: 1.1;
  color: #003b3c;
}

/* Headline with Italic Emphasis */
.headline-with-emphasis span.italic {
  font-family: 'STIX Two Text', serif;
  font-style: italic;
  font-weight: 400;
  color: #48E1DC;
}

/* Body Text - Desktop */
p {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.2px;
  line-height: 1.4;
  color: #003b3c;
}

/* Button Text */
.button-text {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1.92px;
  text-transform: uppercase;
}
```

---

## 📏 Spacing System

### Spacing Scale

| Token | Value | Common Usage |
|-------|-------|--------------|
| `--spacing-xs` | 20px | Small gaps, mobile padding |
| `--spacing-sm` | 30px | Medium gaps, tablet padding |
| `--spacing-md` | 40px | Component gaps, section padding |
| `--spacing-lg` | 60px | Large gaps, section spacing |
| `--spacing-xl` | 80px | Extra large gaps, hero sections |
| `--spacing-2xl` | 100px | Maximum spacing |
| `--spacing-3xl` | 120px | Rare, very large spacing |

### Spacing Usage Examples

```css
/* Section Padding - Mobile */
padding: 60px 20px;

/* Section Padding - Desktop */
padding: 80px 40px;

/* Component Gaps */
gap: 40px; /* Standard */
gap: 60px; /* Large */

/* Card Internal Padding */
padding: 30px; /* Mobile */
padding: 40px; /* Desktop */
```

---

## 🔘 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-button` | 999px | Buttons (pill shape) |
| `--radius-card` | 20px | Cards, modules (desktop) |
| `--radius-card-mobile` | 10px | Cards, modules (mobile) |
| `--radius-input` | 8px | Form inputs, text fields |
| `--radius-small` | 4px | Small elements, badges |

### Border Radius Examples

```css
/* Button */
border-radius: 999px;

/* Card - Desktop */
border-radius: 20px;

/* Card - Mobile */
border-radius: 10px;

/* Input Field */
border-radius: 8px;
```

---

## 📱 Breakpoints

### Breakpoint Values

| Breakpoint | Min Width | Token | Target Device |
|------------|-----------|-------|---------------|
| **S (Mobile)** | 0px | N/A | Phones (< 768px) |
| **M (Tablet)** | 768px | `@media (min-width: 768px)` | Tablets (768-1279px) |
| **L (Desktop)** | 1280px | `@media (min-width: 1280px)` | Small desktop (1280-1439px) |
| **XL (Large)** | 1440px | `@media (min-width: 1440px)` | Large desktop (1440-1919px) |
| **HD (Extra Large)** | 1920px | `@media (min-width: 1920px)` | HD displays (1920px+) |

### Responsive Patterns

#### Stacking Pattern (Mobile → Desktop)
```css
/* Mobile: Stack vertically */
@media (max-width: 767px) {
  .container {
    flex-direction: column;
    gap: 40px;
    padding: 0 20px;
  }
}

/* Tablet+: Side by side */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
    gap: 60px;
    padding: 0 30px;
  }
}

/* Desktop: Wider gaps */
@media (min-width: 1280px) {
  .container {
    gap: 80px;
    padding: 0 40px;
  }
}
```

#### Typography Scaling
```css
/* Mobile */
font-size: 34px;
letter-spacing: -0.68px;

/* Tablet (768px+) */
@media (min-width: 768px) {
  font-size: 38px;
  letter-spacing: -0.76px;
}

/* Desktop (1440px+) */
@media (min-width: 1440px) {
  font-size: 54px;
  letter-spacing: -1.08px;
}

/* HD (1920px+) */
@media (min-width: 1920px) {
  font-size: 72px;
  letter-spacing: -1.44px;
}
```

---

## 🧩 Components

### Button Component

#### Primary Button
```html
<!-- HTML Structure -->
<button class="btn-primary">
  SHOP NOW
</button>
```

```css
/* CSS Styles */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 15px 39px;
  border-radius: 999px;
  background-color: #009296;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1.92px;
  text-transform: uppercase;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 200ms ease-out;
}

.btn-primary:hover {
  background-color: #007a7d;
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 2px #009296;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

#### Secondary Button (White with Border)
```css
.btn-secondary {
  background-color: #ffffff;
  border: 1px solid #009296;
  color: #009296;
}

.btn-secondary:hover {
  background-color: #f6f2ec;
}
```

#### Outline Button (Transparent with Border)
```css
.btn-outline {
  background-color: transparent;
  border: 1px solid #009296;
  color: #009296;
}

.btn-outline:hover {
  background-color: #009296;
  color: #ffffff;
}
```

### Form Input Field

```html
<!-- HTML Structure -->
<div class="form-field">
  <input 
    type="text" 
    id="email" 
    placeholder=" "
    class="form-input"
  />
  <label for="email" class="form-label">
    Email Address *
  </label>
</div>
```

```css
/* CSS Styles */
.form-field {
  position: relative;
}

.form-input {
  width: 100%;
  height: 56px;
  padding: 18px 16px;
  border: 1px solid #D9E2E2;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #003b3c;
  transition: border-color 200ms ease-out;
}

.form-input:hover {
  border-color: #003b3c;
}

.form-input:focus {
  outline: none;
  border-color: #003b3c;
}

.form-input.error {
  border-color: #D84315;
}

/* Floating Label */
.form-label {
  position: absolute;
  left: 12px;
  top: -8px;
  padding: 0 4px;
  background-color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #406c6d;
  pointer-events: none;
  transition: color 200ms ease-out;
}

.form-input:focus + .form-label {
  color: #003b3c;
}

.form-input.error + .form-label {
  color: #D84315;
}
```

### Checkbox (Checkout Style)

```css
.custom-checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid #D9E2E2;
  border-radius: 4px;
  background-color: #ffffff;
  cursor: pointer;
  position: relative;
}

.custom-checkbox:checked {
  background-color: #003b3c;
  border-color: #003b3c;
}

.custom-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 5px;
  height: 9px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
```

### Radio Button (Checkout Style)

```css
.custom-radio {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #D9E2E2;
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
  position: relative;
}

.custom-radio:checked {
  background-color: #009296;
  border-color: #009296;
}

.custom-radio:checked::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ffffff;
}
```

---

## 📐 Layout Patterns

### Video Section (Homepage)

**Responsive Behavior:**
- **Mobile (< 768px):** Vertical stack, left-aligned text, 10px border radius, 20px padding
- **Tablet (768-1279px):** 50/50 side-by-side, left-aligned text, 20px border radius, 30px padding, 60px gap
- **Desktop (1280px+):** 50/50 side-by-side, progressive gaps (180px → 190px → 200px), 20px border radius

```css
/* Mobile */
.video-section {
  background-color: #f6f2ec;
  padding: 60px 0;
}

.video-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0 20px;
}

.video-image {
  width: 100%;
  border-radius: 10px;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .video-container {
    flex-direction: row;
    gap: 60px;
    padding: 0 30px;
  }
  
  .video-image {
    flex: 1;
    border-radius: 20px;
  }
  
  .video-content {
    flex: 1;
  }
}

/* Desktop (1280px+) */
@media (min-width: 1280px) {
  .video-container {
    gap: 180px;
    padding: 60px 40px;
  }
}

/* Large Desktop (1440px+) */
@media (min-width: 1440px) {
  .video-container {
    gap: 190px;
    padding: 70px 40px;
  }
}

/* HD (1920px+) */
@media (min-width: 1920px) {
  .video-container {
    gap: 200px;
    padding: 80px 40px;
  }
}
```

### Two-Column Module Cards

```css
/* Mobile: Stack */
.module-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
}

.module-card {
  width: 100%;
  border-radius: 10px;
}

/* Tablet (768px+): Side by side */
@media (min-width: 768px) {
  .module-cards {
    flex-direction: row;
    gap: 20px;
    padding: 0 30px;
  }
  
  .module-card {
    flex: 1;
    border-radius: 20px;
  }
}

/* Desktop (1280px+) */
@media (min-width: 1280px) {
  .module-cards {
    padding: 0 40px;
  }
}
```

---

## 🎯 Interactive States

### Hover States

```css
/* Buttons */
.button:hover {
  background-color: #007a7d; /* Darker teal */
}

/* Links */
a:hover {
  color: #007a7d; /* Darker teal */
  text-decoration: underline;
  text-decoration-color: #48E1DC; /* Bright teal underline */
}

/* Cards/Images */
.card:hover img {
  transform: scale(1.05);
  transition: transform 300ms ease-out;
}

/* Borders */
.input:hover {
  border-color: #003b3c; /* Navy dark */
}
```

### Focus States

```css
/* Inputs */
.input:focus {
  outline: none;
  border-color: #003b3c;
}

/* Buttons */
.button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #009296;
  box-shadow: 0 0 0 2px var(--color-teal-dark);
}
```

### Active States

```css
/* Buttons */
.button:active {
  transform: scale(0.98);
}
```

### Disabled States

```css
/* Buttons */
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Inputs */
.input:disabled {
  background-color: #f6f2ec;
  cursor: not-allowed;
}
```

---

## 🔧 Developer Notes

### Critical Rules

1. **ALWAYS use `#D9E2E2` for light-colored borders** (locked standard)
2. **ALWAYS use `#48E1DC` for emphasis styling with underlines** (bright teal)
3. **ALWAYS use `#009296` for buttons** (dark teal)
4. **Font families:**
   - Headlines: `'STIX Two Text', serif`
   - Body/Buttons: `'Inter', sans-serif`
5. **Line heights:**
   - Headlines: `1.1`
   - Body text: `1.4`
6. **Button text:**
   - Always uppercase
   - Always `letter-spacing: 1.92px`

### Common Patterns

#### Headline with Italic Emphasis
```html
<h2>
  The supplement brand 
  <span class="italic-emphasis">trusted</span> 
  for over 45 years.
</h2>
```

```css
.italic-emphasis {
  font-family: 'STIX Two Text', serif;
  font-style: italic;
  font-weight: 400;
  color: #48E1DC;
}
```

#### Section Divider
```html
<div class="section-divider"></div>
```

```css
.section-divider {
  width: 100%;
  height: 1px;
  background-color: #D9E2E2;
}
```

---

## 📦 Quick Reference

### Colors
- Primary: `#009296`
- Accent: `#48E1DC`
- Text: `#003b3c`
- Background: `#f6f2ec`
- Border: `#D9E2E2`

### Fonts
- Headlines: `'STIX Two Text', serif`
- Body: `'Inter', sans-serif`

### Spacing
- Mobile padding: `20px`
- Tablet padding: `30px`
- Desktop padding: `40px`
- Section gap: `60px` (mobile), `80px` (desktop)

### Border Radius
- Buttons: `999px`
- Cards (desktop): `20px`
- Cards (mobile): `10px`
- Inputs: `8px`

---

**For questions or clarifications, reference the React codebase in the GitHub repository.**
