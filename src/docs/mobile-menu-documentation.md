# Mobile Menu Component Documentation

**Version:** 2.0 (Refactored)  
**Last Updated:** December 8, 2024  
**Status:** ✅ Production-Ready

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [File Structure](#file-structure)
4. [Component Hierarchy](#component-hierarchy)
5. [Data Layer](#data-layer)
6. [State Management](#state-management)
7. [Icon System](#icon-system)
8. [Animation System](#animation-system)
9. [Responsive Behavior](#responsive-behavior)
10. [User Interactions](#user-interactions)
11. [Blazor Migration Guide](#blazor-migration-guide)
12. [Testing Checklist](#testing-checklist)

---

## Overview

The Mobile Menu is a full-screen navigation overlay with a two-level menu system. It provides access to all site navigation on mobile and tablet devices, with special focus on the "Health Goals First" shopping experience.

### Key Features

- **Two-level navigation:** Main menu → Shop submenu
- **Expandable sections:** Categories, Body Parts, Body Functions, Health Issues
- **Smooth animations:** Staggered item reveals, expand/collapse transitions
- **Body scroll locking:** Prevents background scrolling (iOS-compatible)
- **Responsive design:** Full-screen on mobile, 480px sidebar on tablet+
- **Backdrop dismiss:** Click outside to close
- **State preservation:** Maintains scroll position and menu state

### Design Specifications

- **Mobile:** Full-screen overlay (100vw × 100vh)
- **Tablet+:** 480px sidebar from left edge
- **Background:** White (#FFFFFF)
- **Backdrop:** Black with 40% opacity (#000000 @ 40%)
- **Text Primary:** Dark Teal (#003B3C)
- **Button Primary:** Teal (#009296)
- **Button Secondary:** Light Teal (#D9EFEF)
- **Z-Index:** 50 (above all content)

---

## Architecture

The Mobile Menu follows a modular architecture with clear separation of concerns:

```
MobileMenu (Container)
├── Data Layer (/data/mobileMenuData.ts)
│   ├── Menu content
│   ├── Animation configs
│   └── Layout settings
│
├── State Management (/hooks/useMobileMenu.ts)
│   ├── Menu level state
│   ├── Expanded section state
│   └── Body scroll locking
│
├── Icon Components (/components/icons/mobile/*)
│   ├── CloseIcon
│   ├── ChevronRightIcon
│   ├── AddIcon
│   ├── MinusIcon
│   └── MobileMenuLogo
│
└── UI Components (/components/mobile-menu/*)
    ├── MobileMenuHeader
    ├── MobileMenuMain
    ├── MobileMenuShop
    ├── MobileMenuButtons
    └── ExpandableSection
```

---

## File Structure

### Core Files

```
/components/
  MobileMenu.tsx                    # Main container component
  
/components/mobile-menu/
  index.ts                          # Barrel export
  MobileMenuHeader.tsx              # Logo/breadcrumb + close button
  MobileMenuMain.tsx                # Main menu level
  MobileMenuShop.tsx                # Shop submenu level
  MobileMenuButtons.tsx             # Register/Sign In buttons
  ExpandableSection.tsx             # Reusable expandable section
  
/components/icons/mobile/
  index.ts                          # Barrel export
  CloseIcon.tsx                     # Close (X) icon
  ChevronRightIcon.tsx              # Navigation arrow
  AddIcon.tsx                       # Expand (+) icon
  MinusIcon.tsx                     # Collapse (−) icon
  MobileMenuLogo.tsx                # Andrew Lessman logo
  
/data/
  mobileMenuData.ts                 # All menu content and config
  
/hooks/
  useMobileMenu.ts                  # State management hook
```

---

## Component Hierarchy

### MobileMenu (Main Container)

**File:** `/components/MobileMenu.tsx`

**Responsibility:** Root component that manages the overlay structure and coordinates all subcomponents.

**Props:**
```typescript
interface MobileMenuProps {
  isOpen: boolean;                  // Control menu visibility
  onClose: () => void;              // Close handler
  onNavigate?: (category: string) => void;  // Category navigation
  onIngredientsClick?: () => void;  // Ingredients page handler
  onOurStoryClick?: () => void;     // About page handler
  onRegister?: () => void;          // Register button handler
  onSignIn?: () => void;            // Sign In button handler
}
```

**Structure:**
```jsx
<AnimatePresence>
  <Backdrop onClick={handleClose} />
  <Panel>
    <ScrollableContent>
      <MobileMenuHeader />
      {menuLevel === 'main' && <MobileMenuMain />}
      {menuLevel === 'shop' && <MobileMenuShop />}
    </ScrollableContent>
    {menuLevel === 'main' && <MobileMenuButtons />}
  </Panel>
</AnimatePresence>
```

---

### MobileMenuHeader

**File:** `/components/mobile-menu/MobileMenuHeader.tsx`

**Responsibility:** Displays logo (main level) or breadcrumb (shop level) with close button.

**Props:**
```typescript
interface MobileMenuHeaderProps {
  menuLevel: MenuLevel;             // 'main' | 'shop'
  onBackToMain: () => void;         // Back navigation handler
  onClose: () => void;              // Close handler
}
```

**States:**
- **Main Level:** Shows Andrew Lessman logo
- **Shop Level:** Shows "← Shop" breadcrumb (clickable to go back)

**Animations:**
- Logo/breadcrumb transition: 300ms ease-out
- Cross-fade between states

---

### MobileMenuMain

**File:** `/components/mobile-menu/MobileMenuMain.tsx`

**Responsibility:** Displays main menu items with staggered animation.

**Props:**
```typescript
interface MobileMenuMainProps {
  onShopClick: () => void;          // Shop menu handler
  onAboutClick?: () => void;        // About page handler
}
```

**Menu Items:**
1. **Shop** → Navigates to shop submenu (has chevron)
2. **Learn** → Learning resources
3. **About** → Our story page
4. **Help** → Help center
5. **Specials** → Special offers

**Animations:**
- Each item staggers by 50ms
- Slide in from left with fade
- Total animation: ~250ms

---

### MobileMenuShop

**File:** `/components/mobile-menu/MobileMenuShop.tsx`

**Responsibility:** Displays shop submenu with expandable sections and links.

**Props:**
```typescript
interface MobileMenuShopProps {
  expandedSection: ExpandedSection; // Currently expanded section
  onToggleSection: (section: ExpandedSection) => void;
  onNavigate?: (category: string) => void;
  onIngredientsClick?: () => void;
  onClose: () => void;
}
```

**Sections:**
1. **Categories** (expandable) - 22 product categories
2. **Body Part** (expandable) - 26 body parts
3. **Body Function** (expandable) - 19 body functions
4. **Health Issues** (expandable) - 18 health conditions
5. **Ingredients** (link) - Navigates to ingredients page
6. **Shop All Products** (link) - Navigates to all products

---

### ExpandableSection

**File:** `/components/mobile-menu/ExpandableSection.tsx`

**Responsibility:** Reusable component for expandable menu sections.

**Props:**
```typescript
interface ExpandableSectionProps {
  id: ExpandedSection;              // Section identifier
  title: string;                    // Section title
  items: string[];                  // List of items in section
  isExpanded: boolean;              // Expansion state
  onToggle: () => void;             // Toggle handler
  onItemClick?: (item: string) => void;  // Item click handler
  customIndex?: number;             // For animation stagger
}
```

**Animation:**
- Header slides in with stagger
- Content expands with height animation (300ms)
- Items use 2× line-height for spacing

---

### MobileMenuButtons

**File:** `/components/mobile-menu/MobileMenuButtons.tsx`

**Responsibility:** Displays Register and Sign In buttons at bottom of main menu.

**Props:**
```typescript
interface MobileMenuButtonsProps {
  onRegister?: () => void;
  onSignIn?: () => void;
}
```

**Buttons:**
- **Register:** Primary button (teal background, white text)
- **Sign In:** Secondary button (light teal background, dark text)

**Layout:**
- Sticky to bottom of screen
- White background (prevents content showing through)
- 20px padding all around

---

## Data Layer

### File: `/data/mobileMenuData.ts`

All menu content, configuration, and text strings are centralized in this file.

#### Main Menu Items

```typescript
export const mainMenuItems: MainMenuItem[] = [
  { id: 'shop', label: 'Shop', action: 'shop' },
  { id: 'learn', label: 'Learn', action: 'learn' },
  { id: 'about', label: 'About', action: 'about' },
  { id: 'help', label: 'Help', action: 'help' },
  { id: 'specials', label: 'Specials', action: 'specials' }
];
```

#### Shop Sections

```typescript
export const shopSections: ShopSection[] = [
  {
    id: 'categories',
    title: 'Categories',
    items: ['Anti-Aging', 'Antioxidants', ...] // 22 items
  },
  {
    id: 'bodyPart',
    title: 'Body Part',
    items: ['Arteries', 'Bladder', ...] // 26 items
  },
  {
    id: 'bodyFunction',
    title: 'Body Function',
    items: ['Breathing or Respiration', ...] // 19 items
  },
  {
    id: 'healthIssues',
    title: 'Health Issues',
    items: ['Joint Pain and Stiffness', ...] // 18 items
  }
];
```

#### Animation Configuration

```typescript
export const animationConfig = {
  backdropDuration: 0.2,            // 200ms
  menuPanelDuration: 0.2,           // 200ms
  headerTransition: {
    duration: 0.3,                  // 300ms
    ease: 'easeOut'
  },
  itemStagger: {
    delay: 0.05,                    // 50ms between items
    duration: 0.3,
    ease: 'easeOut'
  },
  sectionExpand: {
    duration: 0.3,
    ease: 'easeOut'
  },
  buttonsDelay: 0.3                 // 300ms delay
};
```

#### Layout Configuration

```typescript
export const layoutConfig = {
  panelWidth: '480px',              // Tablet/desktop width
  contentPadding: '20px',
  headerMarginBottom: '30px',
  itemGap: '8px',
  shopBottomSpacer: '60px'          // Scroll padding
};
```

#### Text Content

```typescript
export const textContent = {
  breadcrumb: {
    back: 'Shop'
  },
  ariaLabels: {
    closeMenu: 'Close menu',
    backToMain: 'Back to main menu'
  }
};
```

---

## State Management

### File: `/hooks/useMobileMenu.ts`

Custom React hook that manages all menu state and side effects.

#### State Variables

```typescript
const [menuLevel, setMenuLevel] = useState<MenuLevel>('main');
const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);
```

**MenuLevel:** `'main' | 'shop'`
- `'main'` - Shows main menu items
- `'shop'` - Shows shop submenu with expandable sections

**ExpandedSection:** `'categories' | 'bodyPart' | 'bodyFunction' | 'healthIssues' | null`
- Only one section can be expanded at a time
- `null` when no section is expanded

#### Methods

**handleShopClick()**
- Transitions from main menu to shop submenu
- Sets `menuLevel` to `'shop'`

**handleBackToMain()**
- Returns to main menu from shop submenu
- Resets `menuLevel` to `'main'`
- Collapses any expanded sections

**toggleSection(section)**
- Expands section if collapsed
- Collapses section if already expanded
- Automatically collapses other sections (single-expansion)

**handleClose()**
- Resets all state to defaults
- Calls parent `onClose()` handler
- Restores body scroll position

#### Body Scroll Locking

**iOS-Compatible Implementation:**

```typescript
useEffect(() => {
  if (isOpen) {
    const scrollY = window.scrollY;
    
    // Lock scroll
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Restore scroll
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }
}, [isOpen]);
```

**Why This Approach:**
- Standard `overflow: hidden` doesn't work on iOS Safari
- Using `position: fixed` prevents scroll on all mobile browsers
- Stores and restores scroll position for smooth UX

---

## Icon System

### Directory: `/components/icons/mobile/`

All icons are 24×24px with 2px stroke weight.

#### CloseIcon (X)

**File:** `CloseIcon.tsx`

```svg
<path d="M18 6L6 18" stroke="#003B3C" stroke-width="2" />
<path d="M6 6L18 18" stroke="#003B3C" stroke-width="2" />
```

#### ChevronRightIcon (>)

**File:** `ChevronRightIcon.tsx`

```svg
<path d="M9 6L15 12L9 18" stroke="#003B3C" stroke-width="2" />
```

**Usage:**
- Shop menu item (points right)
- Back navigation (rotated 180° + flipped vertically)

#### AddIcon (+)

**File:** `AddIcon.tsx`

```svg
<path d="M12 5V19" stroke="#003B3C" stroke-width="2" />
<path d="M5 12H19" stroke="#003B3C" stroke-width="2" />
```

#### MinusIcon (−)

**File:** `MinusIcon.tsx`

```svg
<path d="M5 12H19" stroke="#003B3C" stroke-width="2" />
```

#### MobileMenuLogo

**File:** `MobileMenuLogo.tsx`

- Dimensions: 109.074px × 40px
- Color: #009296 (Teal)
- Imported from `/imports/svg-bz2m66y7mp`

---

## Animation System

### Timing Overview

```
Menu Opening Sequence:
├── 0ms: Backdrop fade in (200ms)
├── 0ms: Panel slide in (200ms)
├── 200ms: Logo appears
├── 200ms: First menu item slides in
├── 250ms: Second menu item slides in
├── 300ms: Third menu item slides in
├── 350ms: Fourth menu item slides in
├── 400ms: Fifth menu item slides in
└── 500ms: Buttons fade in (main menu only)
```

### Animation Types

#### 1. Backdrop Fade
- **Duration:** 200ms
- **Opacity:** 0 → 1 (show), 1 → 0 (hide)

#### 2. Panel Slide
- **Duration:** 200ms
- **Motion:** Instant appearance (no slide on current implementation)
- **Note:** Can be enhanced with X-axis slide if desired

#### 3. Header Transition (Logo ↔ Breadcrumb)
- **Duration:** 300ms
- **Easing:** ease-out
- **Motion:** Cross-fade with X-axis slide
  - Outgoing: opacity 1→0, x 0→-20
  - Incoming: opacity 0→1, x 20→0

#### 4. Menu Item Stagger
- **Delay:** 50ms per item
- **Duration:** 300ms per item
- **Easing:** ease-out
- **Motion:** opacity 0→1, x -20→0

#### 5. Section Expand/Collapse
- **Duration:** 300ms
- **Easing:** ease-out
- **Motion:** height 0↔auto, opacity 0↔1

#### 6. Bottom Buttons
- **Delay:** 300ms after menu opens
- **Duration:** 300ms
- **Motion:** opacity 0→1, y 20→0

---

## Responsive Behavior

### Breakpoints

The mobile menu uses a custom breakpoint at **768px** (tablet).

```css
/* Mobile (< 768px) */
.fixed.inset-0                    /* Full screen */

/* Tablet+ (≥ 768px) */
.fixed.inset-y-0.left-0           /* Left sidebar */
.w-[480px]                        /* Fixed width */
```

### Mobile (< 768px)

- **Size:** 100vw × 100vh (full screen)
- **Backdrop:** Hidden (no backdrop on mobile)
- **Position:** Fixed, covers entire viewport
- **Close:** Close button only

### Tablet/Desktop (≥ 768px)

- **Size:** 480px × 100vh (sidebar)
- **Backdrop:** Visible (40% black overlay)
- **Position:** Fixed to left edge
- **Close:** Close button OR click backdrop
- **Shadow:** Large shadow (2xl) for depth

---

## User Interactions

### Opening the Menu

1. User clicks hamburger icon in GlobalHeader
2. Parent component sets `isOpen={true}`
3. Menu animates in:
   - Backdrop fades in (200ms)
   - Panel appears (200ms)
   - Logo displays
   - Menu items stagger in (50ms each)
   - Buttons fade in (300ms delay)
4. Body scroll locks

### Navigating to Shop

1. User clicks "Shop" in main menu
2. `handleShopClick()` called
3. Header transitions:
   - Logo fades out, slides left (150ms)
   - Breadcrumb fades in, slides from right (150ms)
4. Main menu fades out
5. Shop menu fades in with stagger
6. Bottom buttons hide

### Expanding a Section

1. User clicks section header (e.g., "Categories")
2. `toggleSection('categories')` called
3. Add (+) icon changes to Minus (−)
4. Section expands:
   - Height animates from 0 to auto (300ms)
   - Content fades in (300ms)
5. Items appear with 2× line-height spacing

### Navigating Back

1. User clicks "← Shop" breadcrumb
2. `handleBackToMain()` called
3. Shop menu fades out
4. Main menu fades in with stagger
5. Breadcrumb transitions to logo
6. Bottom buttons fade in
7. Any expanded sections collapse

### Closing the Menu

**Method 1: Close Button**
1. User clicks X button
2. `handleClose()` called

**Method 2: Backdrop Click (Tablet+ only)**
1. User clicks dark backdrop
2. `handleClose()` called

**Close Animation:**
1. All content fades out (200ms)
2. Panel disappears (200ms)
3. Backdrop fades out (200ms)
4. State resets to defaults
5. Body scroll unlocks
6. Scroll position restores

### Category Selection

1. User expands "Categories" section
2. User clicks a category (e.g., "Brain Health")
3. `onNavigate?.('Brain Health')` called
4. Menu closes automatically
5. Parent navigates to collection page

---

## Blazor Migration Guide

### Component Mapping

| React Component | Blazor Equivalent | Notes |
|----------------|-------------------|-------|
| `MobileMenu.tsx` | `MobileMenu.razor` | Root component |
| `MobileMenuHeader.tsx` | `MobileMenuHeader.razor` | Header subcomponent |
| `MobileMenuMain.tsx` | `MobileMenuMain.razor` | Main menu subcomponent |
| `MobileMenuShop.tsx` | `MobileMenuShop.razor` | Shop menu subcomponent |
| `MobileMenuButtons.tsx` | `MobileMenuButtons.razor` | Buttons subcomponent |
| `ExpandableSection.tsx` | `ExpandableSection.razor` | Reusable expandable |
| `useMobileMenu.ts` | `MobileMenuService.cs` | State service |
| `mobileMenuData.ts` | `MobileMenuConfig.cs` | Configuration class |

### State Management

**React:**
```typescript
const [menuLevel, setMenuLevel] = useState<MenuLevel>('main');
const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);
```

**Blazor:**
```csharp
public class MobileMenuService
{
    public MenuLevel MenuLevel { get; set; } = MenuLevel.Main;
    public ExpandedSection? ExpandedSection { get; set; } = null;
    
    public event Action? OnStateChanged;
    
    public void SetMenuLevel(MenuLevel level)
    {
        MenuLevel = level;
        NotifyStateChanged();
    }
    
    private void NotifyStateChanged() => OnStateChanged?.Invoke();
}
```

### Body Scroll Locking

**React:**
```typescript
useEffect(() => {
  if (isOpen) {
    document.body.style.position = 'fixed';
    // ...
  }
}, [isOpen]);
```

**Blazor (JavaScript Interop):**

```csharp
// MobileMenu.razor.cs
[Inject] IJSRuntime JS { get; set; }

protected override async Task OnAfterRenderAsync(bool firstRender)
{
    if (IsOpen)
    {
        await JS.InvokeVoidAsync("mobileMenu.lockScroll");
    }
    else
    {
        await JS.InvokeVoidAsync("mobileMenu.unlockScroll");
    }
}
```

```javascript
// wwwroot/js/mobileMenu.js
window.mobileMenu = {
    scrollY: 0,
    
    lockScroll: function() {
        this.scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${this.scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
    },
    
    unlockScroll: function() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, this.scrollY);
    }
};
```

### Animation Implementation

**React (Motion):**
```typescript
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.3 }}
>
```

**Blazor (CSS Animations):**

```csharp
<div class="@GetAnimationClass()">
    @ChildContent
</div>

@code {
    private string GetAnimationClass() => 
        IsVisible ? "animate-slide-in" : "animate-slide-out";
}
```

```css
.animate-slide-in {
    animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
```

### Data Configuration

**React:**
```typescript
// mobileMenuData.ts
export const mainMenuItems = [
  { id: 'shop', label: 'Shop', action: 'shop' },
  // ...
];
```

**Blazor:**
```csharp
// MobileMenuConfig.cs
public class MobileMenuConfig
{
    public List<MainMenuItem> MainMenuItems { get; set; } = new()
    {
        new MainMenuItem { Id = "shop", Label = "Shop", Action = "shop" },
        // ...
    };
}

// Startup.cs or Program.cs
services.AddSingleton<MobileMenuConfig>();
```

### Event Handling

**React:**
```typescript
<div onClick={() => onNavigate?.(category)}>
```

**Blazor:**
```csharp
<div @onclick="() => HandleNavigate(category)">

@code {
    [Parameter] public EventCallback<string> OnNavigate { get; set; }
    
    private async Task HandleNavigate(string category)
    {
        await OnNavigate.InvokeAsync(category);
    }
}
```

### Icon Components

**React:**
```typescript
export default function CloseIcon() {
  return (
    <div className="size-[24px]">
      <svg viewBox="0 0 24 24">
        <path d="M18 6L6 18" stroke="#003B3C" strokeWidth="2" />
      </svg>
    </div>
  );
}
```

**Blazor:**
```csharp
// Icons/CloseIcon.razor
<div class="size-[24px]">
    <svg viewBox="0 0 24 24">
        <path d="M18 6L6 18" stroke="#003B3C" stroke-width="2" />
    </svg>
</div>
```

---

## Testing Checklist

### Visual Testing

- [ ] Menu opens with correct animation on mobile
- [ ] Menu opens with correct animation on tablet/desktop
- [ ] Logo displays correctly in main menu
- [ ] Breadcrumb displays correctly in shop menu
- [ ] All main menu items visible and properly styled
- [ ] All shop sections visible and properly styled
- [ ] Icons render at correct size (24×24px)
- [ ] Icons use correct stroke width (2px)
- [ ] Buttons styled correctly (colors, padding, rounded)

### Interaction Testing

- [ ] Click "Shop" → Navigates to shop menu
- [ ] Click breadcrumb → Returns to main menu
- [ ] Click close button → Menu closes
- [ ] Click backdrop (tablet+) → Menu closes
- [ ] Expand Categories → Section expands smoothly
- [ ] Expand second section → First section auto-collapses
- [ ] Click category item → Navigates and closes menu
- [ ] Click "Ingredients" → Navigates to ingredients page
- [ ] Click "Shop All Products" → Navigates to all products
- [ ] Click "Register" → Opens registration flow
- [ ] Click "Sign In" → Opens sign-in flow

### Animation Testing

- [ ] Backdrop fades in/out smoothly (200ms)
- [ ] Panel appears/disappears correctly (200ms)
- [ ] Logo/breadcrumb transition is smooth (300ms)
- [ ] Menu items stagger correctly (50ms each)
- [ ] Buttons fade in with delay (300ms)
- [ ] Section expand is smooth (300ms)
- [ ] Section collapse is smooth (300ms)
- [ ] No animation jank or stuttering

### Scroll Testing

- [ ] Body scroll locks when menu opens
- [ ] Body scroll unlocks when menu closes
- [ ] Scroll position restores after close
- [ ] iOS Safari: Body doesn't scroll when menu open
- [ ] iOS Safari: Scroll position restores correctly
- [ ] Menu content scrollable if taller than viewport
- [ ] Shop menu shows all content with proper spacing

### Responsive Testing

**Mobile (< 768px)**
- [ ] Menu is full-screen
- [ ] No backdrop visible
- [ ] Close button works
- [ ] All content fits properly

**Tablet (768px - 1024px)**
- [ ] Menu is 480px sidebar
- [ ] Backdrop visible and clickable
- [ ] Backdrop click closes menu
- [ ] Shadow visible on menu panel

**Desktop (> 1024px)**
- [ ] Same as tablet behavior
- [ ] Menu doesn't interfere with desktop header

### State Testing

- [ ] Menu level resets to 'main' on close
- [ ] Expanded section resets to null on close
- [ ] State persists during navigation within menu
- [ ] Opening menu multiple times works correctly
- [ ] Navigating away from page closes menu

### Accessibility Testing

- [ ] Close button has aria-label
- [ ] Breadcrumb has aria-label
- [ ] Keyboard navigation works
- [ ] Focus trap keeps focus in menu when open
- [ ] ESC key closes menu
- [ ] Screen reader announces menu items
- [ ] Screen reader announces expanded/collapsed state

### Performance Testing

- [ ] Menu opens in < 300ms
- [ ] No layout shift on open/close
- [ ] Smooth 60fps animations
- [ ] No memory leaks after multiple open/close
- [ ] Works on low-end mobile devices

---

## Key Differences from GlobalHeader Refactor

### Similarities
1. ✅ Data extraction to `/data/` directory
2. ✅ Icon components in `/components/icons/`
3. ✅ Modular subcomponents
4. ✅ Custom hook for state management
5. ✅ Comprehensive documentation
6. ✅ TypeScript interfaces for all data
7. ✅ Barrel exports for clean imports

### Unique to MobileMenu
1. **Two-level navigation** - Main menu ↔ Shop submenu
2. **Expandable sections** - Accordion-style with single-expansion
3. **Body scroll locking** - iOS-compatible implementation
4. **Animation sequences** - Complex staggered reveals
5. **State preservation** - Scroll position and menu state
6. **Backdrop interaction** - Click-outside-to-close

### Architecture Benefits
- **Maintainability:** Each component has single responsibility
- **Reusability:** ExpandableSection used for all shop sections
- **Testability:** Isolated components easy to test
- **Scalability:** Add new sections by updating data file
- **Blazor-ready:** Clear migration path with 1:1 component mapping

---

## Conclusion

The refactored Mobile Menu represents production-ready code with enterprise-level organization. All hard-coded content has been extracted to data files, complex logic isolated to a custom hook, and UI split into focused subcomponents. This architecture provides a clear blueprint for the Blazor development team while maintaining all functionality of the original implementation.

**Status:** ✅ Complete and production-ready  
**Next Steps:** Begin Blazor migration following this documentation
