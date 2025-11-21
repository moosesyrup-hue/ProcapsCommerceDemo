# Restore Instructions

## How to Restore This Backup

If you need to restore the website to this state, follow these steps:

### Option 1: Manual Restoration (Recommended)

1. **Identify the files you need to restore** by checking `FILE_MANIFEST.txt`

2. **Copy individual files** from this backup folder to your project root:
   ```
   Copy: /backups/2025-11-18-megamenu-spacing-update/[file]
   To:   /[file]
   ```

3. **Verify the restoration** by checking that the app runs correctly

### Option 2: Full Restoration

1. **Backup your current state** (if you want to preserve any changes)

2. **Copy all files** from this backup to your project root

3. **Test the application** to ensure everything works

### Key Files to Restore

If you only need specific functionality, here are the key files:

#### For Megamenu Issues:
- `/components/ShopMegaMenu.tsx`
- `/components/GlobalHeader.tsx`

#### For Layout Issues:
- `/App.tsx`
- `/components/GlobalHeader.tsx`
- `/components/GlobalFooter.tsx`

#### For Product Display Issues:
- `/components/CollectionPage.tsx`
- `/components/FilterSidebar.tsx`
- `/config/categoryData.ts`

#### For Checkout Issues:
- `/components/CheckoutPage.tsx`
- `/components/MiniCart.tsx`

#### For Styling Issues:
- `/styles/globals.css`

### Verification Checklist

After restoring, verify:

- [ ] App loads without errors
- [ ] Header displays correctly
- [ ] Megamenu opens and functions properly
- [ ] Mobile menu works
- [ ] Collection page displays products
- [ ] Filters work correctly
- [ ] Cart functionality works
- [ ] Checkout page displays
- [ ] Footer displays correctly
- [ ] Responsive design works on mobile

### Troubleshooting

**If components don't render:**
- Check that all files were copied correctly
- Verify import paths are correct
- Clear browser cache

**If styling looks wrong:**
- Ensure `/styles/globals.css` was restored
- Check that Tailwind classes are loading

**If data doesn't display:**
- Verify `/data/products.ts` and other data files were restored
- Check `/config/categoryData.ts` is present

## Need Help?

Refer to the main README.md in this backup folder for more context about what this backup contains and the state of the application.
