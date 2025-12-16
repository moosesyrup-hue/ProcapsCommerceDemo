# Component Registry - Single Source of Truth

**CRITICAL RULE:** Before creating ANY new form fields, inputs, dropdowns, buttons, or styled components, CHECK THIS FILE FIRST and reuse existing components.

## 🔒 Shared Form Components (ALWAYS USE THESE)

### **FormField** - `/components/shared/FormFields.tsx`
**When to use:** ANY text input, email, phone, password, etc.
**Features:** Floating labels, error states, validation icons, lock icons
**Import:** `import { FormField } from './components/shared/FormFields'`

```tsx
<FormField
  label="First Name"
  value={firstName}
  onChange={setFirstName}
  required
  error={errorMessage}
  isValid={isValidated}
/>
```

### **SelectField** - `/components/shared/FormFields.tsx`
**When to use:** ANY dropdown/select menu
**Features:** Floating labels, custom arrow, error states
**Import:** `import { SelectField } from './components/shared/FormFields'`

```tsx
<SelectField
  label="State"
  value={state}
  onChange={setState}
  required
  options={[
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' }
  ]}
/>
```

## 🔒 Shared Modal Components (ALWAYS USE THESE)

### **AddressFormModal** - `/components/shared/AddressFormModal.tsx`
**When to use:** Adding or editing addresses (checkout, profile, anywhere)
**Import:** `import AddressFormModal from './components/shared/AddressFormModal'`

```tsx
<AddressFormModal
  isOpen={showModal}
  mode="add" // or "edit"
  address={existingAddress} // for edit mode
  onClose={() => setShowModal(false)}
  onSave={(address) => handleSave(address)}
/>
```

### **PaymentMethodFormModal** - `/components/shared/PaymentMethodFormModal.tsx`
**When to use:** Adding or editing payment methods (checkout, profile, anywhere)
**Import:** `import PaymentMethodFormModal from './components/shared/PaymentMethodFormModal'`

```tsx
<PaymentMethodFormModal
  isOpen={showModal}
  mode="add" // or "edit"
  paymentMethod={existingPayment} // for edit mode
  onClose={() => setShowModal(false)}
  onSave={(payment) => handleSave(payment)}
/>
```

## 🎨 Design System Standards

### Colors (LOCKED)
- **Light borders/lines:** `#D9E2E2`
- **Emphasis/underlines:** `#48E1DC`
- **Buttons/teal accents:** `#009296`
- **Button hover:** `#007d81`
- **Text primary:** `#003b3c`
- **Text secondary:** `#406c6d`
- **Error:** `#D84315`
- **Success:** `#4CAF50`

### Typography
- **Primary font:** `font-['Inter',sans-serif]`
- **Headlines:** `font-['STIX_Two_Text',sans-serif]`
- **Never add:** text-2xl, font-bold, leading-none (unless user specifically asks)

### Form Field Heights
- **Input fields:** `py-[18px]` or `h-[56px]`
- **Buttons:** `h-[48px]`

### Spacing
- **Card padding:** `p-[30px] md:p-[40px]`
- **Form gaps:** `space-y-[16px]` or `gap-[16px]`
- **Section margins:** `mb-[24px]`, `mb-[40px]`

## 🚫 NEVER DO THIS

❌ **Creating inline form field styles**
```tsx
// WRONG - Don't do this!
<input className="w-full h-[56px] px-[16px] border-2..." />
```

✅ **Use shared FormField component**
```tsx
// CORRECT - Do this!
<FormField label="First Name" value={firstName} onChange={setFirstName} />
```

❌ **Creating custom dropdown styles**
```tsx
// WRONG - Don't do this!
<select className="w-full h-[56px]..." />
```

✅ **Use shared SelectField component**
```tsx
// CORRECT - Do this!
<SelectField label="State" value={state} onChange={setState} options={states} />
```

❌ **Creating duplicate modal forms**
```tsx
// WRONG - Don't create a new address form!
<div className="modal">
  <input ... />
  <input ... />
</div>
```

✅ **Use shared modal components**
```tsx
// CORRECT - Use existing modal!
<AddressFormModal isOpen={true} mode="add" onSave={handleSave} />
```

## 📋 Workflow Before Making Changes

1. ✅ **Read COMPONENTS.md** (this file)
2. ✅ **Search for existing component** - Use file_search if needed
3. ✅ **Reuse shared component** - Import and use it
4. ✅ **Only create new** if it's truly unique AND update this file

## 🔄 When to Update This File

- Adding a new shared component
- Discovering a pattern that's being duplicated
- Creating a new design system standard
- User requests a new reusable component

---

**Last Updated:** December 2024  
**Maintained By:** AI Assistant (that's me - and I promise to check this file first! 🙏)
