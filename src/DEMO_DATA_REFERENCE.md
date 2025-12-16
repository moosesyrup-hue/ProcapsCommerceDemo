# Demo Data Reference - Andrew Lessman Account

This document serves as the single source of truth for all demo data used throughout the account section when `demo@andrewlessman.com` is logged in.

## User Profile

**Email:** `demo@andrewlessman.com`  
**Verification Code (Demo):** `123456`

**Personal Information:**
- First Name: `Andrew`
- Last Name: `Lessman`
- Phone: `(555) 123-4567`
- Date of Birth: `1956-03-15` (optional, not used everywhere)
- Gender: `male` (optional, not used everywhere)

---

## Default Payment Method

**Card Type:** Visa  
**Last 4 Digits:** `4242`  
**Name on Card:** `Andrew Lessman`  
**Expiry:** `12/25`  
**Is Default:** `true`

**Display Format:**
- Short: `Visa •••• 4242`
- Full with name: `Visa •••• 4242` + `Andrew Lessman` on separate line

---

## Default Shipping Address

**Name:** `Andrew Lessman`  
**Address Line 1:** `123 Main Street`  
**Address Line 2:** `Apt 4B`  
**City:** `Los Angeles`  
**State:** `CA`  
**ZIP Code:** `90001`  
**Phone:** `(555) 123-4567`  
**Is Default:** `true`

**Display Format:**
```
Andrew Lessman
123 Main Street, Apt 4B
Los Angeles, CA 90001
```

---

## Secondary Shipping Address (if needed)

**Name:** `Andrew Lessman`  
**Address Line 1:** `456 Ocean Avenue`  
**Address Line 2:** _(empty)_  
**City:** `Santa Monica`  
**State:** `CA`  
**ZIP Code:** `90401`  
**Phone:** `(555) 987-6543`  
**Is Default:** `false`

---

## Sample Autoship/Subscription Products

### Subscription 1
- **Product:** Ultimate Anti-Oxidant
- **Count:** 180 capsules
- **Frequency:** Every 30 days
- **Price:** $35.96
- **Quantity:** 1
- **Next Delivery:** January 14, 2025
- **Status:** Active

### Subscription 2
- **Product:** CoQ10 400mg
- **Count:** 120 capsules
- **Frequency:** Every 60 days
- **Price:** $49.95
- **Quantity:** 1
- **Next Delivery:** February 3, 2025
- **Status:** Active

---

## Sample Order History (if needed)

### Recent Order 1
- **Order Number:** #AL-2024-1234
- **Date:** December 10, 2024
- **Total:** $85.91
- **Status:** Delivered
- **Items:** 2 products

### Recent Order 2
- **Order Number:** #AL-2024-1198
- **Date:** November 15, 2024
- **Total:** $122.45
- **Status:** Delivered
- **Items:** 3 products

---

## Data Consistency Rules

1. **Always use the default payment method (Visa 4242) and default address (123 Main Street) when displaying billing/shipping info in autoship, orders, or any checkout-related section.**

2. **Phone number formatting:** Always use `(555) 123-4567` format.

3. **Date formatting:** Use `Month Day, Year` format (e.g., "January 14, 2025") for delivery dates.

4. **Card number display:** Always use `••••` or `ending in` format, never show full card numbers.

5. **Name consistency:** Always use "Andrew Lessman" (not "Andrew L." or "A. Lessman").

6. **State codes:** Always use 2-letter state codes (CA, not California).

7. **New customer state:** When `isNewCustomer = true`, show empty states with appropriate CTAs. When `isNewCustomer = false`, show the full demo data above.

---

## Files Using Demo Data

### Currently Implemented & Verified ✅
- `/components/account/ProfileSection.tsx` - Master source of truth for all user data
- `/components/account/SubscriptionsSection.tsx` - Uses default payment (Visa 4242) & address (123 Main St)
- `/components/account/OrderDetailsView.tsx` - Uses default payment (Visa 4242) & address (123 Main St)
- `/components/CheckoutPage.tsx` - Pre-fills with default address for demo user

### Product-Only (No User Data)
- `/components/account/FavoritesSection.tsx` - Only product data, no user info
- `/components/account/OrdersSection.tsx` - Only order summaries, detailed user data in OrderDetailsView
- `/components/account/AccountOverview.tsx` - Summary cards only

### Future Account Components
- Any new account-related features should reference this document for data consistency

---

## Code Templates for New Components

### Basic Demo User Check
```tsx
// Demo user data - matching ProfileSection
const isDemoUser = true; // Since demo@andrewlessman.com is logged in

// Default address from ProfileSection (matches the default address in profile)
const defaultAddress = {
  firstName: 'Andrew',
  lastName: 'Lessman',
  address: '123 Main Street',
  apartment: 'Apt 4B',
  city: 'Los Angeles',
  state: 'CA',
  zipCode: '90001',
  phone: '(555) 123-4567',
};

// Default payment method from ProfileSection (matches the default payment in profile)
const defaultPayment = {
  type: 'visa' as const,
  last4: '4242',
  nameOnCard: 'Andrew Lessman',
  expiry: '12/25',
};
```

### Displaying Address
```tsx
<p>
  {defaultAddress.firstName} {defaultAddress.lastName}<br />
  {defaultAddress.address}{defaultAddress.apartment && `, ${defaultAddress.apartment}`}<br />
  {defaultAddress.city}, {defaultAddress.state} {defaultAddress.zipCode}
</p>
```

### Displaying Payment Method
```tsx
<p>
  Visa •••• {defaultPayment.last4}<br />
  {defaultPayment.nameOnCard}<br />
  Expires {defaultPayment.expiry}
</p>
```

---

## Important Notes

- All dates should be 2025 (not 2024) for autoship/future deliveries
- Past orders can be dated 2024
- Keep data realistic and consistent across all sections
- This is a demo account - all actions should work but are not persisted
- The demo experience should feel production-ready and polished
- **Always reference this document when building new account features**
- When in doubt, check `/components/account/ProfileSection.tsx` for the master data source
