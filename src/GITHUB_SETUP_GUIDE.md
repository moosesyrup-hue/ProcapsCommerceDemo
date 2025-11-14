# GitHub Setup Guide for Non-Developers
## Simple Step-by-Step Instructions

---

## What You'll Achieve

By following this guide, you'll:
- ✅ Never lose your work again (automatic version history)
- ✅ Share code easily with your backend team
- ✅ Be able to restore any previous version in 30 seconds
- ✅ Look professional to your development team

**Time to complete:** 30-45 minutes (one-time setup)  
**Cost:** $0 (completely free)

---

## Part 1: Create GitHub Account (5 minutes)

### Step 1: Sign Up
1. Go to: https://github.com
2. Click the green **"Sign up"** button (top right)
3. Enter your email address
4. Create a password (make it strong!)
5. Choose a username (suggestion: use your business name or real name)
6. Complete the verification puzzle
7. Check your email and click the verification link

**✓ Done!** You now have a GitHub account.

---

## Part 2: Install GitHub Desktop (10 minutes)

GitHub Desktop is the "easy button" version of Git. No typing commands!

### Step 2: Download GitHub Desktop
1. Go to: https://desktop.github.com
2. Click **"Download for [Mac/Windows]"**
3. Wait for download to finish
4. Open the downloaded file
5. Follow installation wizard (just click "Next" through everything)

### Step 3: Connect GitHub Desktop to Your Account
1. Open GitHub Desktop app
2. Click **"Sign in to GitHub.com"**
3. A browser window opens
4. Click **"Authorize desktop"**
5. Return to GitHub Desktop app

**✓ Done!** GitHub Desktop is connected to your account.

---

## Part 3: Create Your First Repository (10 minutes)

A "repository" (or "repo") is like a project folder that tracks all changes.

### Step 4: Create Local Repository
1. In GitHub Desktop, click **"Create a New Repository"**
2. Fill in the fields:
   - **Name:** `vitamin-ecommerce-frontend`
   - **Description:** `Frontend specification for Andrew Lessman vitamin ecommerce site`
   - **Local Path:** Choose where to save it (Documents folder is fine)
   - **Initialize with README:** ✅ Check this box
   - **Git Ignore:** Select "Node" from dropdown
   - **License:** None

3. Click **"Create Repository"**

**✓ Done!** You now have a local repository on your computer.

### Step 5: Publish to GitHub.com
1. In GitHub Desktop, click **"Publish repository"** (top right)
2. Uncheck **"Keep this code private"** (unless you want it private)
   - Private = only you can see it
   - Public = anyone can see it (but only you can change it)
3. Click **"Publish Repository"**

**✓ Done!** Your repository is now on GitHub.com for safekeeping.

---

## Part 4: Add Your Code to GitHub (10 minutes)

### Step 6: Export Your Code from Figma Make

1. In Figma Make, you need to manually copy your files to your computer
2. Open the folder where GitHub Desktop created your repository
   - Usually: `Documents/vitamin-ecommerce-frontend/`
3. Create this folder structure inside:
   ```
   vitamin-ecommerce-frontend/
   ├── components/
   ├── data/
   ├── imports/
   ├── styles/
   ├── utils/
   └── App.tsx
   ```

4. Copy ALL your files from Figma Make to these folders:
   - Copy all `.tsx` files from `/components` to `components/`
   - Copy all `.ts` files from `/data` to `data/`
   - Copy all files from `/imports` to `imports/`
   - Copy `globals.css` from `/styles` to `styles/`
   - Copy all `.ts` files from `/utils` to `utils/`
   - Copy `App.tsx` to root

**How to copy from Figma Make:**
- Select all text in each file
- Copy (Ctrl+C or Cmd+C)
- Create new file in your local folder with same name
- Paste (Ctrl+V or Cmd+V)
- Save

*Yes, this is manual. It's a one-time pain, but worth it.*

### Step 7: Commit Your First Version

1. Return to GitHub Desktop
2. You'll see a list of all files you just added (left side)
3. At the bottom left, you'll see:
   - **Summary field** (required)
   - **Description field** (optional)

4. In the Summary field, type:
   ```
   Initial commit - Checkout page complete
   ```

5. In the Description field, type:
   ```
   - Complete checkout page with modern form styling
   - Collection page with full search experience
   - Global header and footer
   - Mobile menu with 3-level navigation
   - Mini cart and quick view modals
   - All product and ingredient data (196 items)
   
   Note: Homepage files need to be re-imported from Figma
   ```

6. Click the blue **"Commit to main"** button

7. Click **"Push origin"** (top right)

**✓ Done!** Your code is now safely backed up on GitHub.com!

---

## Part 5: View Your Code Online (2 minutes)

### Step 8: See Your Repository on GitHub.com

1. Go to: https://github.com/[your-username]/vitamin-ecommerce-frontend
   (Replace [your-username] with your actual GitHub username)

2. You should see:
   - All your folders
   - All your files
   - Your commit message
   - A green checkmark showing everything worked

**✓ Done!** Your code is online and backed up forever.

---

## Daily Workflow: How to Use This Going Forward

### Every Day After Working in Figma Make:

**SIMPLE 5-MINUTE PROCESS:**

1. **Work in Figma Make** (like you always do)

2. **Copy changed files** to your local GitHub folder
   - Only copy files you changed today
   - Overwrite the old versions

3. **Open GitHub Desktop**
   - It automatically detects what changed
   - You'll see a list of modified files

4. **Commit your changes:**
   - Summary: "Added new homepage hero section"
   - Description: (optional details)
   - Click **"Commit to main"**

5. **Push to GitHub:**
   - Click **"Push origin"**

**That's it!** Your work is saved with a snapshot you can return to anytime.

---

## How to Share with Your Backend Team

### Step 9: Send Them the Link

1. Go to your repository on GitHub.com:
   ```
   https://github.com/[your-username]/vitamin-ecommerce-frontend
   ```

2. Send this link to your backend developers

3. Tell them: "This is the frontend spec. You can download it or clone it."

They'll know what to do - this is their daily workflow!

### What They'll See:
- ✅ All your files organized perfectly
- ✅ History of every change you made
- ✅ Ability to download everything with one click
- ✅ Ability to leave comments on your code

---

## Emergency: How to Restore a Previous Version

### If Something Breaks in Figma Make:

1. **Open GitHub Desktop**

2. **Click "History" tab** (top left)
   - You'll see a list of all your commits (versions)
   - Each commit has a date and your description

3. **Find the version that worked**
   - Example: "November 14 - Checkout page complete"

4. **Right-click on that commit**

5. **Select "Revert changes in commit"**
   - This creates a new commit that undoes the bad changes

6. **Copy the restored files back to Figma Make**

**✓ Done!** You're back to a working version.

---

## Alternative: View Old Code Without Reverting

If you just want to see what code looked like before:

1. Go to your repo on GitHub.com
2. Click **"Commits"** link (above the file list)
3. Click on the commit you want to see
4. Browse the code as it was at that point
5. Copy any code you need

---

## Advanced: Branching (Optional - For Later)

Once you're comfortable, you can use "branches" to experiment safely:

**Concept:**
- Main branch = stable, working code
- Experiment branch = trying new things

**How:**
1. In GitHub Desktop, click **"Current Branch"** dropdown
2. Click **"New Branch"**
3. Name it: `experiment-new-homepage`
4. Make changes and commit to this branch
5. If it works: Merge to main
6. If it doesn't: Delete the branch, no harm done

*Don't worry about this yet. Just know it exists for later.*

---

## Troubleshooting

### Problem: "GitHub Desktop can't find my repository"
**Solution:** 
- File → Add Local Repository
- Browse to where you saved it
- Click "Add Repository"

### Problem: "I can't push - it says merge conflict"
**Solution:**
- This happens if you work from multiple computers
- Ask your backend team for help (they deal with this daily)
- Or: Copy your changes elsewhere, delete repo, start fresh

### Problem: "I accidentally committed wrong files"
**Solution:**
- In GitHub Desktop, History tab
- Right-click the bad commit
- Select "Revert this commit"

### Problem: "I want to delete something from GitHub"
**Solution:**
- Delete the file from your local folder
- GitHub Desktop will show it as deleted
- Commit with message: "Removed old file"
- Push

---

## Your First GitHub Commit Checklist

Print this and check off as you go:

- [ ] Created GitHub account
- [ ] Installed GitHub Desktop
- [ ] Signed into GitHub Desktop
- [ ] Created repository: `vitamin-ecommerce-frontend`
- [ ] Published repository to GitHub.com
- [ ] Created folder structure on computer
- [ ] Copied all files from Figma Make to local folder
- [ ] Committed with message "Initial commit - Checkout page complete"
- [ ] Pushed to GitHub.com
- [ ] Verified files appear on GitHub.com
- [ ] Sent link to backend team

---

## Quick Reference Card (Bookmark This)

### Daily Workflow:
1. Work in Figma Make
2. Copy changed files to local GitHub folder
3. Open GitHub Desktop
4. Write commit message
5. Click "Commit to main"
6. Click "Push origin"

### Restore Previous Version:
1. Open GitHub Desktop
2. History tab
3. Right-click old commit
4. "Revert changes"

### Share with Team:
Send them: `https://github.com/[your-username]/vitamin-ecommerce-frontend`

---

## Benefits You'll See Immediately

1. **Peace of Mind**
   - Your work is backed up automatically
   - Can undo mistakes instantly
   - No more "lost work" panic

2. **Professional Workflow**
   - Backend team can access code easily
   - They can see your work in progress
   - Standard development practice

3. **Better Collaboration**
   - Team can leave comments
   - You can see what they changed
   - Everyone works from same source

4. **History & Documentation**
   - Every commit is a mini-backup
   - Your commit messages document what changed
   - Easy to track progress

---

## Next Steps

After completing this guide:

1. **Practice:**
   - Make a small change in Figma Make
   - Copy it to your local folder
   - Commit and push
   - Verify it appears on GitHub.com

2. **Share:**
   - Send GitHub link to backend team
   - Ask them to download it
   - Get their feedback

3. **Make it a Habit:**
   - End of each work session: commit and push
   - Weekly: Review your commit history
   - Monthly: Celebrate never losing work again!

---

## Questions?

**For GitHub help:**
- GitHub docs: https://docs.github.com
- GitHub Desktop docs: https://docs.github.com/en/desktop

**For your project:**
- Ask your backend developers - they use GitHub daily
- GitHub has a friendly community forum

---

## Congratulations!

You've just learned version control - the #1 tool that professional developers use every single day. This skill will save you countless hours and headaches.

**Remember:** 
- The first time is the hardest
- After a few commits, it becomes second nature
- Your future self will thank you!

---

*Created: November 14, 2024*  
*For: Vitamin ecommerce project*  
*By: Your AI assistant*
