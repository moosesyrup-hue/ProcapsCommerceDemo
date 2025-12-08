# Design System Usage Examples

Quick reference for using the Andrew Lessman Design System components in your React code.

---

## 🔘 Button Component

### Import
```tsx
import { Button } from './components/ui/Button';
// or
import { PrimaryButton, SecondaryButton, OutlineButton } from './components/ui/Button';
```

### Usage Examples

#### Primary Button (Default)
```tsx
<Button>Shop Now</Button>
// or
<Button variant="primary">Shop Now</Button>
// or
<PrimaryButton>Shop Now</PrimaryButton>
```

**Result:**
- Background: Teal (#009296)
- Text: White
- Height: 50px
- Hover: Darker teal (#007a7d)

---

#### Secondary Button
```tsx
<Button variant="secondary">Learn More</Button>
// or
<SecondaryButton>Learn More</SecondaryButton>
```

**Result:**
- Background: White
- Border: Teal (#009296)
- Text: Teal
- Hover: Cream background (#f6f2ec)

---

#### Outline Button
```tsx
<Button variant="outline">View Details</Button>
// or
<OutlineButton>View Details</OutlineButton>
```

**Result:**
- Background: Transparent
- Border: Teal (#009296)
- Text: Teal
- Hover: Fills with teal, text turns white

---

#### Ghost Button (No Border)
```tsx
<Button variant="ghost">Close</Button>
```

**Result:**
- Background: Transparent
- No border
- Text: Teal
- Hover: Cream background

---

### Button Sizes

```tsx
{/* Small - 40px height */}
<Button size="sm">Small</Button>

{/* Medium - 50px height (default) */}
<Button size="md">Medium</Button>
<Button>Medium</Button>

{/* Large - 60px height */}
<Button size="lg">Large</Button>
```

---

### Button Props

```tsx
{/* Click handler */}
<Button onClick={() => console.log('Clicked!')}>
  Click Me
</Button>

{/* Disabled state */}
<Button disabled>
  Unavailable
</Button>

{/* Custom className */}
<Button className="my-custom-class">
  Custom Styled
</Button>

{/* Submit button in form */}
<Button type="submit">
  Submit Form
</Button>

{/* All props combined */}
<Button 
  variant="secondary"
  size="lg"
  onClick={handleClick}
  disabled={isLoading}
  className="w-full"
>
  {isLoading ? 'Loading...' : 'Continue'}
</Button>
```

---

## 🎨 Using CSS Variables

### In Tailwind Classes

```tsx
{/* Background color */}
<div className="bg-[var(--color-teal-dark)]">
  Using CSS variable
</div>

{/* Or use hex directly (both work) */}
<div className="bg-[#009296]">
  Using hex value
</div>
```

### In Custom CSS

```css
/* In your CSS file */
.my-custom-button {
  background-color: var(--color-teal-dark);
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--radius-button);
}

.my-custom-headline {
  font-family: var(--font-headline);
  font-size: var(--text-headline-lg);
  letter-spacing: var(--tracking-headline-lg);
  color: var(--color-navy-dark);
}
```

---

## 📝 Before & After Examples

### Old Way (Hardcoded)
```tsx
// ❌ Before: Verbose, hard to maintain
<div className="bg-[#009296] box-border content-stretch flex gap-[10px] h-[50px] items-center justify-center px-[39px] py-[15px] relative rounded-[999px] shrink-0">
  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[1.92px] uppercase whitespace-pre">
    SHOP NOW
  </p>
</div>
```

### New Way (Design System)
```tsx
// ✅ After: Clean, consistent, fast
<Button>Shop Now</Button>
```

**Benefits:**
- 95% less code
- Automatic consistency
- Easy to update globally
- Type-safe with TypeScript
- Accessible by default

---

## 🚀 Real-World Examples

### Call-to-Action Section
```tsx
function CTASection() {
  return (
    <div className="flex gap-[20px] items-center justify-center">
      <Button variant="primary" onClick={handleShopNow}>
        Shop Now
      </Button>
      <Button variant="outline" onClick={handleLearnMore}>
        Learn More
      </Button>
    </div>
  );
}
```

### Product Card
```tsx
function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-[20px] p-[30px]">
      <img src={product.image} alt={product.name} />
      <h3 className="mt-[20px]">{product.name}</h3>
      <p className="mt-[10px] text-[#406c6d]">{product.description}</p>
      <Button 
        variant="primary" 
        className="mt-[20px] w-full"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </Button>
    </div>
  );
}
```

### Modal Footer
```tsx
function ModalFooter({ onCancel, onConfirm, isLoading }) {
  return (
    <div className="flex gap-[12px] justify-end border-t border-[#D9E2E2] pt-[20px]">
      <Button 
        variant="ghost" 
        onClick={onCancel}
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button 
        variant="primary" 
        onClick={onConfirm}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Confirm'}
      </Button>
    </div>
  );
}
```

---

## 💡 Pro Tips

### Tip 1: Use Named Exports for Clarity
```tsx
// ✅ Clear intent
<PrimaryButton>Shop Now</PrimaryButton>
<SecondaryButton>Learn More</SecondaryButton>

// Also OK
<Button variant="primary">Shop Now</Button>
```

### Tip 2: Combine with Tailwind for Layout
```tsx
// Use Button for styling, Tailwind for layout
<Button className="w-full">Full Width Button</Button>
<Button className="mt-[20px]">Button with Top Margin</Button>
```

### Tip 3: Destructure Props for Cleaner Code
```tsx
function MyComponent({ handleClick, isDisabled, buttonText }) {
  return (
    <Button 
      onClick={handleClick}
      disabled={isDisabled}
    >
      {buttonText}
    </Button>
  );
}
```

---

## 📚 Next Steps

1. **Explore the Button component** - Start using it in new features
2. **Reference DESIGN_TOKENS.md** - For Blazor/CSS conversion
3. **Keep existing code** - No need to refactor immediately
4. **Use for new work** - Speeds up development 3-5x

---

**Questions?** Check `/components/ui/Button.tsx` for the full implementation or `/docs/DESIGN_TOKENS.md` for design specifications.
