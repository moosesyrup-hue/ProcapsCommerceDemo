# Andrew Lessman Vitamin Supplements - Frontend Specification

Production-ready React frontend serving as a pixel-perfect specification for Blazor development team handoff. This is a comprehensive ecommerce platform for Andrew Lessman's vitamin supplement company, featuring a "Health Goals First" search experience.

## Project Status

**200+ files | 60+ React components | Zero errors | Production-ready**

This application is a complete frontend specification with real company data, authentic brand voice, and production-grade design system.

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS v4** (CSS variables, no config file)
- **Motion/React** (formerly Framer Motion) for animations
- **Recharts** for data visualization
- **Lucide React** for icons
- **Vite** for build tooling

## Design System

### Locked Standard Colors
```css
#009296  /* Primary buttons and CTAs */
#48E1DC  /* Emphasis styling and underlines */
#D9E2E2  /* Standard light lines and borders */
#003b3c  /* Primary text color */
#e8f9f9  /* Light teal background */
#f6f2ec  /* Beige background */
```

### Typography
- **Headlines**: STIX Two Text (Regular, Medium, Italic)
- **Body**: Inter (Regular, Medium)
- **System**: CSS variables in `/styles/globals.css`

### Component Library
Reusable Button components with consistent variant system documented in `/components/design-system/`

## Key Features

### 1. Health Goals First Search
Customers search by health goals and symptoms rather than product names. Intelligent search system with autocomplete and category filtering.

### 2. Complete Pages
- Home page with hero, featured products, and education sections
- Our Story page with timeline, solar energy animation, and founder story
- Product collection pages
- Complete checkout flow with multi-step process
- Passwordless authentication system

### 3. Authentication
**Demo Credentials:**
- Email: `demo@andrewlessman.com`
- Verification Code: `123456`

Uses 6-digit verification code system (no passwords).

### 4. Global Components
- Responsive navigation with mobile menu
- Cart system with persistent state
- Footer with comprehensive links
- Product cards with consistent styling

## Project Structure

```
/
├── components/
│   ├── design-system/       # Reusable Button components
│   ├── global/               # Navigation, Footer, Cart
│   ├── OurStoryPage.tsx      # Complete Our Story page
│   └── [feature components]
├── imports/                  # Figma-imported assets and SVGs
├── styles/
│   └── globals.css           # CSS variables and typography tokens
├── App.tsx                   # Main application entry point
└── main.tsx
```

## Component Architecture

### Reusable Patterns
- **SectionHeadline**: Consistent section headers with eyebrow text
- **TwoColumnSection**: Flexible layout component with sticky content support
- **AnimatedImageColumn**: Scroll-triggered animations
- **QuoteBlock**: Branded quote styling
- **Button**: Comprehensive variant system (primary, secondary, outline, ghost)

### Animation System
- Scroll-triggered animations using Motion's `useInView`
- Consistent timing and easing functions
- Staggered delays for visual polish
- Performance-optimized with `once: true`

## Setup Instructions

```bash
# Install dependencies
npm i

# Start development server
npm run dev

# Build for production
npm run build
```

The application will run at `http://localhost:5173`

## Important Notes for Blazor Team

### 1. Asset Imports
- Raster images use `figma:asset/` virtual module scheme
- SVGs are in `/imports/` directory with relative paths
- All images are production-ready and optimized

### 2. Typography Classes
**Do not use Tailwind font size/weight classes** - Typography is controlled via CSS variables in `globals.css` to maintain consistency.

### 3. Color Standards
The three locked colors (#D9E2E2, #48E1DC, #009296) are used consistently throughout. Do not deviate from these standards.

### 4. Responsive Design
All components are desktop-first with mobile breakpoints. The mobile menu is fully implemented and tested.

### 5. State Management
- Cart state uses React context
- Authentication state persists in localStorage
- Search filtering uses URL params for deep linking

### 6. Mock Data
Products, testimonials, and user data use realistic mock data structures that match expected API response formats.

## Brand Voice

Content throughout reflects Andrew Lessman's authentic voice:
- Science-based and educational
- No sensationalism or celebrity endorsements
- Focus on purity, solar energy, and founder ownership
- Professional yet approachable tone

## Solar Energy Animation

The Our Story hero section features a custom solar energy animation inside the pill capsule using:
- SVG mask with feathered edges (Figma-traced path)
- Flowing golden shimmer effects
- Rising particle system
- Overlay blend mode for natural integration

## Contact

This frontend specification represents the complete user interface and interaction design. All components are production-ready and follow established design system standards.

---

**Last Updated**: December 2024
