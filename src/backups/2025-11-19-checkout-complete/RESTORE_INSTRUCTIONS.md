# Restore Instructions

## Quick Reference

Your working directory already contains all files in their working state. This backup serves as a **reference point and safety net**.

## Restore Scenarios

### Scenario 1: "I just need to reference the backup"
**Action Required:** None - just view files in this backup folder

### Scenario 2: "I need to restore one specific file"
```bash
# Example: Restore CheckoutPage
cp /backups/2025-11-19-checkout-complete/App.tsx /App.tsx

# Or restore a specific component
cp /backups/2025-11-19-checkout-complete/components/CheckoutPage.tsx /components/
```

### Scenario 3: "I want to compare files"
```bash
# Compare current vs backup
diff /App.tsx /backups/2025-11-19-checkout-complete/App.tsx

# See what changed
diff -u /components/CheckoutPage.tsx /backups/2025-11-19-checkout-complete/components/CheckoutPage.tsx
```

### Scenario 4: "I need to restore everything"
**Best Approach:** Use your version control (Git)
```bash
# If using Git (recommended)
git log  # Find the commit from Nov 19, 2025
git checkout <commit-hash>
```

**Alternative:** Manual restore from this backup
1. Review FILE_MANIFEST.txt to see what's backed up
2. Copy files from this backup directory
3. Note: Some files exist only in working directory (see manifest)

## What's In This Backup vs Working Directory

### ✅ Backed Up in This Folder
- App.tsx
- Key component files (as needed)
- Configuration files (as needed)  
- Documentation (README, MANIFEST, etc.)

### ✅ Only in Working Directory
- All /components/ui/ files (40+ ShadCN components)
- All /imports/ files (30+ SVGs)
- All /components/FindMySupplements/ subcomponents
- All /components/AndrewAIChat/ subcomponents
- All /lib/ utility files
- All /data/ files except backed up ones
- All /guidelines/ files
- styles/globals.css

### 💡 Why?
To keep backup size manageable, we focus on files that change frequently or are critical to the current milestone. Standard UI components and imported assets are preserved in your working directory.

## File Locations

```
Current Working Directory Structure:
/
├── App.tsx (backed up)
├── components/
│   ├── CheckoutPage.tsx (backed up)
│   ├── GlobalHeader.tsx (preserved in working dir)
│   ├── GlobalFooter.tsx (preserved in working dir)
│   ├── Homepage.tsx (preserved in working dir)
│   ├── CollectionPage.tsx (preserved in working dir)
│   ├── MiniCart.tsx (preserved in working dir)
│   ├── MobileMenu.tsx (preserved in working dir)
│   ├── ui/ (40+ files - all preserved)
│   ├── FindMySupplements/ (15+ files - all preserved)
│   └── AndrewAIChat/ (6 files - all preserved)
├── config/
│   └── categoryData.ts (can be backed up on request)
├── data/ (10+ files - all preserved)
├── lib/ (3+ files - all preserved)
├── utils/ (2+ files - all preserved)
├── imports/ (30+ files - all preserved)
├── guidelines/ (15+ files - all preserved)
└── styles/
    └── globals.css (preserved in working dir)

Backup Directory Structure:
/backups/2025-11-19-checkout-complete/
├── README.md
├── BACKUP_SUMMARY.md
├── FILE_MANIFEST.txt
├── RESTORE_INSTRUCTIONS.md (this file)
├── App.tsx
└── [additional files as backed up]
```

## Verification Steps

After restoring any files, verify:

```bash
# 1. Check file exists
ls -la /components/CheckoutPage.tsx

# 2. Verify file size (should be ~2000+ lines)
wc -l /components/CheckoutPage.tsx

# 3. Check for syntax errors (if you have Node.js)
npm run build # or your build command

# 4. Test in browser
# Start dev server and manually test the checkout flow
```

## Rollback Strategy

If something goes wrong during restore:

1. **Stop immediately** - Don't make more changes
2. **Document what you tried** - Note which files you copied
3. **Check version control** - If using Git, you can easily revert
4. **Restore from backup** - Use this backup to restore known-good state
5. **Test thoroughly** - After any restore, test all major features

## Safety Tips

✅ **DO:**
- Make a quick backup before restoring: `cp /App.tsx /App.backup.tsx`
- Review files before copying them
- Test after restoring
- Use version control (Git)

❌ **DON'T:**
- Blindly copy all files without checking
- Restore files while the app is running
- Skip testing after restoration
- Delete backups once you think you don't need them

## Need Help?

### "Which file do I restore?"
- Check FILE_MANIFEST.txt for the complete list
- Look at BACKUP_SUMMARY.md to see what each file does

### "How do I know if restore worked?"
- Compare file sizes: `ls -lh /components/CheckoutPage.tsx`
- Check for errors: Try to run the application
- Test the feature: Manually test checkout flow

### "I restored a file but it's not working"
- Check if you copied to the right location
- Verify file permissions: `chmod 644 /components/CheckoutPage.tsx`
- Look for missing dependencies
- Check the browser console for errors

## Testing Checklist After Restore

After restoring files, test these critical features:

- [ ] Homepage loads without errors
- [ ] Header and megamenu work
- [ ] Mobile menu opens and closes
- [ ] Collection page displays products
- [ ] Filters work on collection page
- [ ] Mini cart opens and shows items
- [ ] Checkout page loads
- [ ] Checkout form validation works
- [ ] Saved addresses display (if logged in)
- [ ] Saved payment methods display (if logged in)
- [ ] Footer renders correctly

## Demo Credentials for Testing

Use these to test the logged-in checkout experience:
- **Email:** demo@andrewlessman.com
- **Password:** password123

## Additional Resources

- `FILE_MANIFEST.txt` - Complete list of all files
- `BACKUP_SUMMARY.md` - What's included and why
- `README.md` - High-level backup overview

---

**Backup Date:** November 19, 2025  
**Backup Type:** Checkpoint after JSX fixes  
**Restoration Difficulty:** Easy (all files preserved)
