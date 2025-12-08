# Mobile Menu - Quick Reference Guide

**For Blazor Developers** | **Version 2.0** | **December 8, 2024**

---

## 📁 File Locations

### Main Component
```
/components/MobileMenu.tsx
```

### Subcomponents
```
/components/mobile-menu/
  ├── MobileMenuHeader.tsx       # Logo/breadcrumb + close
  ├── MobileMenuMain.tsx         # Main menu items
  ├── MobileMenuShop.tsx         # Shop submenu
  ├── MobileMenuButtons.tsx      # Register/Sign In
  └── ExpandableSection.tsx      # Reusable accordion
```

### Icons
```
/components/icons/mobile/
  ├── CloseIcon.tsx              # X icon
  ├── ChevronRightIcon.tsx       # > icon
  ├── AddIcon.tsx                # + icon
  ├── MinusIcon.tsx              # − icon
  └── MobileMenuLogo.tsx         # Andrew Lessman logo
```

### Data & Logic
```
/data/mobileMenuData.ts          # All menu content
/hooks/useMobileMenu.ts          # State management
```

---

## 🎯 Component Props

### MobileMenu
```typescript
{
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (category: string) => void;
  onIngredientsClick?: () => void;
  onOurStoryClick?: () => void;
  onRegister?: () => void;
  onSignIn?: () => void;
}
```

---

## 📊 Data Structure

### Main Menu Items (5 items)
```
Shop → Learn → About → Help → Specials
```

### Shop Sections (4 expandable)
```
Categories (22 items)
Body Part (26 items)
Body Function (19 items)
Health Issues (18 items)
```

### Shop Links (2 items)
```
Ingredients
Shop All Products
```

---

## 🔄 State Flow

```
Main Menu (Level 1)
├── Shop, Learn, About, Help, Specials
├── Register + Sign In buttons
└── Click "Shop" →

Shop Menu (Level 2)
├── Categories (expandable)
├── Body Part (expandable)
├── Body Function (expandable)
├── Health Issues (expandable)
├── Ingredients (link)
└── Shop All Products (link)
```

---

## ⏱️ Animation Timing

| Element | Delay | Duration | Total |
|---------|-------|----------|-------|
| Backdrop | 0ms | 200ms | 200ms |
| Panel | 0ms | 200ms | 200ms |
| Item 1 | 0ms | 300ms | 300ms |
| Item 2 | 50ms | 300ms | 350ms |
| Item 3 | 100ms | 300ms | 400ms |
| Item 4 | 150ms | 300ms | 450ms |
| Item 5 | 200ms | 300ms | 500ms |
| Buttons | 300ms | 300ms | 600ms |
| Section Expand | 0ms | 300ms | 300ms |

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Backdrop | Position |
|-----------|-------|----------|----------|
| Mobile (< 768px) | 100vw | Hidden | Full screen |
| Tablet/Desktop (≥ 768px) | 480px | Visible | Left sidebar |

---

## 🎨 Design Tokens

```css
/* Colors */
--text-primary: #003B3C;
--button-primary: #009296;
--button-secondary: #D9EFEF;
--backdrop: rgba(0, 0, 0, 0.4);

/* Spacing */
--content-padding: 20px;
--header-margin: 30px;
--item-gap: 8px;
--shop-bottom-spacer: 60px;

/* Layout */
--panel-width: 480px;
--icon-size: 24px;
--icon-stroke: 2px;
--button-height: 50px;
```

---

## 🔧 Key Functions (useMobileMenu hook)

```typescript
handleShopClick()      // Main → Shop
handleBackToMain()     // Shop → Main
toggleSection(id)      // Expand/collapse section
handleClose()          // Close menu + reset state
```

---

## 📝 To Modify Menu Content

**Step 1:** Edit `/data/mobileMenuData.ts`

```typescript
// Add main menu item
export const mainMenuItems = [
  // ... existing items
  { id: 'new', label: 'New Item', action: 'new' }
];

// Add shop section
export const shopSections = [
  // ... existing sections
  {
    id: 'newSection',
    title: 'New Section',
    items: ['Item 1', 'Item 2', 'Item 3']
  }
];
```

**Step 2:** Update types in `/hooks/useMobileMenu.ts`

```typescript
export type ExpandedSection = 
  | 'categories' 
  | 'bodyPart' 
  | 'bodyFunction' 
  | 'healthIssues' 
  | 'newSection'  // Add new section here
  | null;
```

**Step 3:** Done! Component auto-updates.

---

## 🐛 Common Issues & Solutions

### Issue: Menu doesn't scroll on iOS
**Solution:** Check body scroll locking is implemented
```typescript
document.body.style.position = 'fixed';
document.body.style.top = `-${scrollY}px`;
```

### Issue: Animation stutters
**Solution:** Ensure GPU acceleration
```css
transform: translateZ(0);
will-change: transform, opacity;
```

### Issue: Backdrop click doesn't close
**Solution:** Check z-index layering
```css
backdrop: z-50
panel: z-50 (same layer, panel must come after in DOM)
```

### Issue: State doesn't reset on close
**Solution:** Verify handleClose is called
```typescript
const handleClose = () => {
  setMenuLevel('main');
  setExpandedSection(null);
  onClose();
};
```

---

## ✅ Pre-Migration Checklist

### Code Review
- [ ] All components use TypeScript
- [ ] All props have interfaces
- [ ] No hard-coded content in components
- [ ] All icons are 24×24px with 2px stroke
- [ ] Animation timings match config

### Data Validation
- [ ] All menu items in mobileMenuData.ts
- [ ] All text strings in textContent
- [ ] All configs in animationConfig/layoutConfig
- [ ] No magic numbers in components

### Testing
- [ ] Menu opens/closes smoothly
- [ ] All navigation works
- [ ] Body scroll locks correctly
- [ ] Responsive design verified
- [ ] Animations smooth on mobile

### Documentation
- [ ] All components documented
- [ ] Props documented with JSDoc
- [ ] Complex logic explained
- [ ] Blazor migration notes included

---

## 🚀 Blazor Migration Priority

### Phase 1: Core Structure (Week 1)
1. Create MobileMenu.razor (main container)
2. Implement body scroll locking (JS interop)
3. Create MobileMenuService.cs (state management)
4. Port mobileMenuData.ts → MobileMenuConfig.cs

### Phase 2: Subcomponents (Week 2)
1. MobileMenuHeader.razor
2. MobileMenuMain.razor
3. MobileMenuShop.razor
4. ExpandableSection.razor
5. MobileMenuButtons.razor

### Phase 3: Icons & Animations (Week 3)
1. Port all icon components
2. Implement CSS animations
3. Add stagger effects
4. Test animation performance

### Phase 4: Testing & Polish (Week 4)
1. Cross-browser testing
2. Mobile device testing
3. Accessibility audit
4. Performance optimization

---

## 📞 Support Contacts

**React Implementation:** See `/components/MobileMenu.tsx`  
**Full Documentation:** See `/docs/mobile-menu-documentation.md`  
**Design System:** See `/docs/design-system.md`  
**Global Header:** See `/docs/global-header-documentation.md`

---

## 🔗 Related Components

- **GlobalHeader:** Desktop navigation with mega menu
- **ShopMegaMenu:** Desktop shop dropdown
- **AccountTray:** User account dropdown
- **MiniCart:** Shopping cart sidebar

---

**Last Updated:** December 8, 2024  
**Status:** ✅ Production-Ready  
**Next:** Begin Blazor migration
