# Header Data Structure Reference

## Quick Reference for `/data/headerData.ts`

This document provides a quick reference for updating the Global Header content and configuration.

## Data Structure

### Free Shipping Banner

```typescript
freeShippingBanner: {
  threshold: 25,                                          // Dollar amount for free shipping
  icon: 'gift',                                          // Icon type (currently 'gift')
  mobileText: 'FREE ground shipping on orders over $25', // Text shown on mobile
  desktopText: 'FREE ground shipping on orders over $25  -  ', // Text shown on desktop
  desktopLinkText: 'Details',                           // Underlined link text on desktop
}
```

**To Update**:
- Change `threshold` to update the free shipping minimum
- Update `mobileText` and `desktopText` to change banner messaging
- Modify `desktopLinkText` to change the underlined text

---

### Navigation Items

```typescript
navigation: [
  {
    label: 'SHOP',        // Display text (uppercase)
    key: 'shop',          // Unique identifier
  },
  {
    label: 'QUALITY',
    key: 'quality',
  },
  {
    label: 'OUR STORY',
    key: 'ourStory',
    onClick: 'onOurStoryClick',  // Handler name for clickable items
  },
  {
    label: 'SPECIALS',
    key: 'specials',
    onClick: 'onSpecialsClick',
  },
]
```

**To Add New Navigation Item**:
```typescript
{
  label: 'NEW ITEM',      // Text to display
  key: 'newItem',         // Unique identifier (camelCase)
  onClick: 'onNewItemClick', // Optional: handler name if clickable
}
```

**Navigation Item Behavior**:
- **SHOP**: Opens mega menu on hover
- **QUALITY**: Display only (no action)
- **OUR STORY**: Clickable, navigates to Our Story page
- **SPECIALS**: Clickable, navigates to Specials page

---

### Breakpoints

```typescript
breakpoints: {
  mobile: 768,      // Below this: mobile layout (S)
  tablet: 768,      // At/above this: tablet layout (M)
  desktop: 1280,    // At/above this: desktop layout (L)
  xlDesktop: 1440,  // At/above this: XL layout
  hdDesktop: 1920,  // At/above this: HD layout
}
```

**Breakpoint Mapping**:
- `< 768px` → **S (Mobile)** - Hamburger menu, search + cart only
- `≥ 768px` → **M (Tablet)** - Hamburger menu, search + heart + user + cart
- `≥ 1280px` → **L (Desktop)** - Full navigation, search + heart + user + cart
- `≥ 1440px` → **XL (Desktop)** - Same as L with adjusted spacing
- `≥ 1920px` → **HD (Desktop)** - Same as L/XL with adjusted spacing

**To Adjust Breakpoints**:
Update the pixel values to match your design requirements.

---

### Mega Menu Configuration

```typescript
megaMenu: {
  openDelay: 200,   // Milliseconds before mega menu opens on hover
  closeDelay: 400,  // Milliseconds before mega menu closes on leave
}
```

**To Adjust Timing**:
- Increase `openDelay` to make menu feel less "jumpy"
- Increase `closeDelay` to give users more time before menu disappears
- Recommended range: 100-500ms for both values

---

## Common Update Scenarios

### Scenario 1: Change Free Shipping Threshold to $50
```typescript
freeShippingBanner: {
  threshold: 50,
  mobileText: 'FREE ground shipping on orders over $50',
  desktopText: 'FREE ground shipping on orders over $50  -  ',
  desktopLinkText: 'Details',
}
```

### Scenario 2: Add New Navigation Item "ABOUT"
```typescript
navigation: [
  { label: 'SHOP', key: 'shop' },
  { label: 'QUALITY', key: 'quality' },
  { label: 'ABOUT', key: 'about', onClick: 'onAboutClick' }, // New item
  { label: 'OUR STORY', key: 'ourStory', onClick: 'onOurStoryClick' },
  { label: 'SPECIALS', key: 'specials', onClick: 'onSpecialsClick' },
]
```

**Important**: Also add the prop to GlobalHeader:
```typescript
interface GlobalHeaderProps {
  // ... existing props
  onAboutClick?: () => void; // Add new prop
}
```

And pass it through HeaderNavigation.

### Scenario 3: Make Mega Menu Open/Close Faster
```typescript
megaMenu: {
  openDelay: 100,   // Faster open
  closeDelay: 200,  // Faster close
}
```

### Scenario 4: Change Mobile Breakpoint to 640px
```typescript
breakpoints: {
  mobile: 640,    // Changed from 768
  tablet: 640,    // Changed from 768
  desktop: 1280,
  xlDesktop: 1440,
  hdDesktop: 1920,
}
```

---

## Navigation Item Keys Reference

| Key | Label | Behavior | Notes |
|-----|-------|----------|-------|
| `shop` | SHOP | Opens mega menu | Triggers hover state |
| `quality` | QUALITY | None | Display only |
| `ourStory` | OUR STORY | Navigate to Our Story | Requires `onOurStoryClick` prop |
| `specials` | SPECIALS | Navigate to Specials | Requires `onSpecialsClick` prop |

---

## Icon Visibility by Breakpoint

| Icon | S (Mobile) | M (Tablet) | L+ (Desktop) |
|------|------------|------------|--------------|
| Search | ✅ | ✅ | ✅ |
| Heart | ❌ | ✅ | ✅ |
| User | ❌ | ✅ | ✅ |
| Cart | ✅ | ✅ | ✅ |

---

## Blazor Configuration Class

For Blazor implementation, create a configuration class:

```csharp
public class HeaderConfiguration
{
    public FreeShippingBanner FreeShippingBanner { get; set; }
    public List<NavigationItem> Navigation { get; set; }
    public Breakpoints Breakpoints { get; set; }
    public MegaMenuConfig MegaMenu { get; set; }
}

public class FreeShippingBanner
{
    public int Threshold { get; set; }
    public string Icon { get; set; }
    public string MobileText { get; set; }
    public string DesktopText { get; set; }
    public string DesktopLinkText { get; set; }
}

public class NavigationItem
{
    public string Label { get; set; }
    public string Key { get; set; }
    public string OnClick { get; set; } // Optional
}

public class Breakpoints
{
    public int Mobile { get; set; }
    public int Tablet { get; set; }
    public int Desktop { get; set; }
    public int XlDesktop { get; set; }
    public int HdDesktop { get; set; }
}

public class MegaMenuConfig
{
    public int OpenDelay { get; set; }
    public int CloseDelay { get; set; }
}
```

Store in `appsettings.json`:
```json
{
  "HeaderConfiguration": {
    "FreeShippingBanner": {
      "Threshold": 25,
      "Icon": "gift",
      "MobileText": "FREE ground shipping on orders over $25",
      "DesktopText": "FREE ground shipping on orders over $25  -  ",
      "DesktopLinkText": "Details"
    },
    "Navigation": [
      { "Label": "SHOP", "Key": "shop" },
      { "Label": "QUALITY", "Key": "quality" },
      { "Label": "OUR STORY", "Key": "ourStory", "OnClick": "onOurStoryClick" },
      { "Label": "SPECIALS", "Key": "specials", "OnClick": "onSpecialsClick" }
    ],
    "Breakpoints": {
      "Mobile": 768,
      "Tablet": 768,
      "Desktop": 1280,
      "XlDesktop": 1440,
      "HdDesktop": 1920
    },
    "MegaMenu": {
      "OpenDelay": 200,
      "CloseDelay": 400
    }
  }
}
```

---

## File Locations

- **Data File**: `/data/headerData.ts`
- **Main Component**: `/components/GlobalHeader.tsx`
- **Subcomponents**: `/components/header/*`
- **Icons**: `/components/icons/*`
- **Hooks**: `/hooks/useBreakpoint.ts`, `/hooks/useMegaMenu.ts`
- **Full Documentation**: `/docs/GLOBAL_HEADER_REFACTORING.md`

---

## Quick Tips

1. **Always update both mobile and desktop text** when changing banner messaging
2. **Use uppercase for navigation labels** to match design standards
3. **Keep navigation to 4-5 items** for optimal desktop layout
4. **Test mega menu timing** - too fast feels jumpy, too slow feels unresponsive
5. **Maintain consistent spacing** in navigation gap (currently 40px)
