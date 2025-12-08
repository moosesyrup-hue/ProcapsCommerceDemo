# Global Header Refactoring Documentation

## Overview

The GlobalHeader component has been refactored from a 365-line monolithic component into a modular, production-ready architecture following the same pattern established for the Help Center and GlobalFooter components.

## Files Created

### Data Layer
- **`/data/headerData.ts`** - Centralized configuration and content for the global header

### Icon Components
- **`/components/icons/GiftIcon.tsx`** - Free shipping gift icon
- **`/components/icons/SearchIcon.tsx`** - Search icon
- **`/components/icons/HeartIcon.tsx`** - Favorites/wishlist heart icon
- **`/components/icons/UserIcon.tsx`** - User account icon
- **`/components/icons/CartIcon.tsx`** - Shopping cart icon
- **`/components/icons/HeaderLogo.tsx`** - Company logo component
- **`/components/icons/index.ts`** - Icon components barrel export

### Header Subcomponents
- **`/components/header/HeaderBanner.tsx`** - Free shipping banner section
- **`/components/header/HeaderNavigation.tsx`** - Desktop navigation menu
- **`/components/header/HeaderIcons.tsx`** - Right-side utility icons
- **`/components/header/index.ts`** - Header components barrel export

### Custom Hooks
- **`/hooks/useBreakpoint.ts`** - Responsive breakpoint detection hook
- **`/hooks/useMegaMenu.ts`** - Mega menu hover/timing logic hook
- **`/hooks/index.ts`** - Hooks barrel export

### Main Component
- **`/components/GlobalHeader.tsx`** - Refactored main header component (reduced from 365 to ~120 lines)

## Architecture Changes

### Before (Monolithic)
```
GlobalHeader.tsx (365 lines)
├── Inline icon components (6 components, ~80 lines)
├── Hard-coded content strings
├── Inline breakpoint logic (~50 lines)
├── Inline megamenu timing logic (~60 lines)
├── Duplicate conditional rendering
└── Props explosion (13+ props)
```

### After (Modular)
```
GlobalHeader.tsx (120 lines)
├── /data/headerData.ts (configuration)
├── /components/icons/* (6 icon components)
├── /components/header/* (3 subcomponents)
├── /hooks/useBreakpoint.ts (responsive logic)
└── /hooks/useMegaMenu.ts (menu timing logic)
```

## Key Improvements

### 1. **Data Separation**
All hard-coded content moved to `/data/headerData.ts`:
- Free shipping banner text
- Navigation menu items
- Breakpoint values
- Mega menu timing configuration

**Benefit**: Easy to update content and configuration without touching component logic.

### 2. **Component Modularity**
Breaking down into focused, single-responsibility components:

#### HeaderBanner
- Displays free shipping promotion
- Handles mobile/desktop text variants
- Self-contained visual component

#### HeaderNavigation
- Desktop navigation menu
- Handles hover states for mega menu
- Click handlers for navigation items
- Active state indicator for SHOP menu

#### HeaderIcons
- Right-side utility icons (search, heart, user, cart)
- Responsive visibility logic
- Icon click handlers

#### HeaderLogo
- Clickable logo component
- Centered positioning
- Hover effects

### 3. **Custom Hooks**

#### useBreakpoint
Centralizes responsive breakpoint detection:
```typescript
const { breakpoint, isMobileTablet, isDesktop } = useBreakpoint();
```
- Returns current breakpoint: 'S' | 'M' | 'L' | 'XL' | 'HD'
- Computed helpers: `isMobileTablet`, `isDesktop`
- Configurable breakpoint values
- Single source of truth for responsive logic

#### useMegaMenu
Encapsulates mega menu hover timing logic:
```typescript
const {
  isOpen,
  handleOpen,
  handleClose,
  handleEnter,
  handleCloseImmediate,
  clearTimers,
} = useMegaMenu({ openDelay: 200, closeDelay: 400 });
```
- Manages open/close timers
- Handles escape key to close
- Prevents race conditions with timer cleanup
- Configurable delays

### 4. **Eliminated Duplicate Code**
**Before**: HeartIcon and UserIcon were rendered twice with identical conditions
```tsx
// Mobile/Tablet (breakpoint === 'M')
{!isMobileTablet && <HeartIcon />}
{breakpoint === 'M' && <HeartIcon />}

// Desktop
{!isMobileTablet && <UserIcon />}
{breakpoint === 'M' && <UserIcon />}
```

**After**: Simplified to single conditional with helper variable
```tsx
const showHeart = breakpoint !== 'S';
const showUser = breakpoint !== 'S';

{showHeart && <HeartIcon />}
{showUser && <UserIcon />}
```

### 5. **Reduced Props Explosion**
Props are now more organized and focused:
- No props passed for content (data file handles it)
- Cleaner prop interface with only necessary callbacks
- Subcomponents receive only what they need

### 6. **Icon Components Extracted**
All inline icon components moved to `/components/icons/`:
- Easier to find and update
- Reusable across the application
- Consistent import pattern
- Type-safe props

### 7. **Barrel Exports**
Added index files for cleaner imports:
```typescript
// Instead of
import HeaderBanner from './components/header/HeaderBanner';
import HeaderNavigation from './components/header/HeaderNavigation';
import HeaderIcons from './components/header/HeaderIcons';

// Can use
import { HeaderBanner, HeaderNavigation, HeaderIcons } from './components/header';
```

## Blazor Migration Guide

### Data Structure
The `headerData.ts` file contains all configurable content:

```typescript
export interface HeaderConfig {
  freeShippingBanner: {
    threshold: number;
    icon: string;
    mobileText: string;
    desktopText: string;
    desktopLinkText: string;
  };
  navigation: NavigationItem[];
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
    xlDesktop: number;
    hdDesktop: number;
  };
  megaMenu: {
    openDelay: number;
    closeDelay: number;
  };
}
```

**Blazor Equivalent**: Create a `HeaderConfiguration.cs` class with these properties.

### Component Hierarchy

**React Structure**:
```
GlobalHeader
├── HeaderBanner
├── Mobile Menu Button (conditional)
├── HeaderNavigation (conditional)
├── HeaderLogo
├── HeaderIcons
└── ShopMegaMenu
```

**Blazor Equivalent**:
```razor
<GlobalHeader>
    <HeaderBanner />
    @if (IsMobileTablet) {
        <button @onclick="OnMenuClick">Menu</button>
    }
    @if (IsDesktop) {
        <HeaderNavigation />
    }
    <HeaderLogo />
    <HeaderIcons />
    <ShopMegaMenu />
</GlobalHeader>
```

### Responsive Breakpoint Logic

**React (useBreakpoint hook)**:
```typescript
const { breakpoint, isMobileTablet, isDesktop } = useBreakpoint();
```

**Blazor Equivalent**:
```csharp
// Create a service or code-behind
public class BreakpointService
{
    public string Breakpoint { get; set; }
    public bool IsMobileTablet => Breakpoint == "S" || Breakpoint == "M";
    public bool IsDesktop => Breakpoint == "L" || Breakpoint == "XL" || Breakpoint == "HD";
}
```

### Mega Menu Timing Logic

**React (useMegaMenu hook)**:
```typescript
const {
  isOpen,
  handleOpen,
  handleClose,
  handleEnter,
  handleCloseImmediate,
} = useMegaMenu({ openDelay: 200, closeDelay: 400 });
```

**Blazor Equivalent**:
```csharp
// Use Timer or Task.Delay for hover delays
private Timer openTimer;
private Timer closeTimer;

private async Task HandleOpen()
{
    ClearTimers();
    openTimer = new Timer(200);
    openTimer.Elapsed += (s, e) => IsOpen = true;
    openTimer.Start();
}
```

## Color Standards

All colors follow the established design system:
- **Header Background**: `#009296` (primary teal)
- **Banner Divider**: `#0CA9AD` (lighter teal)
- **Text**: `white`
- **Hover States**: `opacity-80`

## Testing Checklist

- ✅ Free shipping banner displays correctly on mobile and desktop
- ✅ Mobile menu button shows only on S/M breakpoints
- ✅ Desktop navigation shows only on L/XL/HD breakpoints
- ✅ Logo is centered and clickable
- ✅ Icons respond to clicks (search, heart, user, cart)
- ✅ Heart icon hidden on mobile (S), shown on tablet+ (M/L/XL/HD)
- ✅ User icon hidden on mobile (S), shown on tablet+ (M/L/XL/HD)
- ✅ Mega menu opens with 200ms delay on SHOP hover
- ✅ Mega menu closes with 400ms delay on mouse leave
- ✅ Mega menu stays open when re-entering
- ✅ Mega menu closes immediately on other nav item hover
- ✅ Escape key closes mega menu
- ✅ SHOP nav item shows underline when mega menu open
- ✅ All navigation clicks work correctly
- ✅ Responsive breakpoints match design specs

## Benefits for Development Team

1. **Easier Maintenance**: Changes to content are isolated to data files
2. **Better Testing**: Each component can be tested independently
3. **Improved Readability**: Smaller, focused components are easier to understand
4. **Reusability**: Icon components and hooks can be used elsewhere
5. **Consistency**: Follows the same pattern as Footer and Help Center
6. **Type Safety**: Full TypeScript support with interfaces
7. **Performance**: No duplicate code or unnecessary re-renders
8. **Scalability**: Easy to add new navigation items or icons

## Migration Notes

- All functionality remains identical to the original monolithic component
- No breaking changes to the component's public API
- All props interface remains the same
- Visual output is pixel-perfect to the original
- Component maintains the same responsive behavior
- Mega menu timing and interaction unchanged

## Files to Review for Blazor Implementation

1. **Start Here**: `/data/headerData.ts` - Understand the data structure
2. **Main Component**: `/components/GlobalHeader.tsx` - Component orchestration
3. **Subcomponents**: `/components/header/*` - Individual sections
4. **Icons**: `/components/icons/*` - SVG icon components
5. **Hooks**: `/hooks/useBreakpoint.ts`, `/hooks/useMegaMenu.ts` - Logic patterns

## Questions?

For questions about this refactoring or the Blazor migration:
1. Review the inline code comments in each file
2. Compare the original `/components/GlobalHeader-backup.tsx` (if created)
3. Test the component in the running application
4. Refer to the design system documentation in `/DESIGN_SYSTEM.md`
