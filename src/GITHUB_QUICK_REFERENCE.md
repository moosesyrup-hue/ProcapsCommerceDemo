# GitHub Quick Reference Card
## Keep This Handy While You Learn

---

## The 3-Step Daily Workflow

```
1. WORK
   ↓
   Do your work in Figma Make (like normal)

2. SAVE
   ↓
   Copy changed files → GitHub folder
   Open GitHub Desktop
   Write what you changed
   Click "Commit to main"

3. BACKUP
   ↓
   Click "Push origin"
   ✓ Your work is safe forever
```

**Time: 5 minutes**

---

## Emergency Restore (Something Broke!)

```
1. Open GitHub Desktop
2. Click "History" tab
3. Find the working version
4. Right-click → "Revert changes"
5. Copy files back to Figma Make
```

**Time: 30 seconds**

---

## Common Tasks

### How to commit (save a version):
1. Make changes in your code
2. Open GitHub Desktop
3. It shows what changed (green = added, red = removed)
4. Write summary: "Fixed button color"
5. Click "Commit to main"
6. Click "Push origin"

### How to see history:
1. Open GitHub Desktop
2. Click "History" tab
3. See every version you've saved

### How to see what changed:
1. In History tab
2. Click any commit
3. See exactly what changed (green/red highlighting)

### How to share with team:
1. Go to github.com/[your-username]/[your-repo]
2. Copy the URL
3. Send to developers

### How to download from GitHub:
1. Go to your repo on github.com
2. Click green "Code" button
3. Click "Download ZIP"

---

## Your Project Info

**Repository name:** `vitamin-ecommerce-frontend`

**Repository URL:** https://github.com/_______________/vitamin-ecommerce-frontend
(Fill in your username)

**Local folder location:** _______________________________________________
(Fill in where you saved it)

---

## GitHub Desktop Button Guide

| Button | What It Does |
|--------|-------------|
| **Commit to main** | Saves a snapshot of your changes |
| **Push origin** | Uploads snapshot to GitHub.com |
| **Pull origin** | Downloads changes from GitHub.com |
| **Fetch origin** | Checks for changes without downloading |
| **History** | Shows all your saved versions |
| **Changes** | Shows what's different now |
| **Undo** | Reverses your last commit |

---

## File Status Colors (in GitHub Desktop)

| Color | Meaning |
|-------|---------|
| 🟢 Green | New file or added code |
| 🔴 Red | Deleted file or removed code |
| 🟡 Yellow | Modified file |
| ⚪ Gray | Unchanged file |

---

## Git Vocabulary (Simple)

| Term | Simple Meaning |
|------|----------------|
| **Repository** (Repo) | Your project folder |
| **Commit** | Save a snapshot |
| **Push** | Upload to cloud |
| **Pull** | Download from cloud |
| **Branch** | Separate version to experiment |
| **Main** | The primary version |
| **Clone** | Download someone's repo |
| **Fork** | Copy someone's repo to your account |
| **Merge** | Combine two versions |
| **History** | List of all saved snapshots |

---

## Common Error Messages (and what they mean)

### "No changes to commit"
**Meaning:** You haven't changed anything since last commit  
**Action:** Make some changes first

### "Push rejected"
**Meaning:** Someone else pushed changes first  
**Action:** Click "Pull" first, then "Push"

### "Merge conflict"
**Meaning:** Two versions changed the same line differently  
**Action:** Ask your backend team for help (they handle this daily)

### "Authentication failed"
**Meaning:** GitHub Desktop lost your login  
**Action:** File → Options → Sign out → Sign back in

---

## Good Commit Messages vs Bad

### ✅ Good (Descriptive):
- "Added checkout page with shipping options"
- "Fixed button alignment on mobile"
- "Updated product prices to match sale"
- "Removed old homepage hero section"

### ❌ Bad (Too vague):
- "Fixed stuff"
- "Update"
- "Changes"
- "asdf"

**Why it matters:** You'll thank yourself later when looking for a specific version.

---

## Commit Message Template

Use this format:

```
Summary: [What you did in 5-7 words]

Description (optional):
- What changed
- Why you changed it
- What still needs work
```

**Example:**
```
Summary: Added mobile menu with three levels

Description:
- Created MobileMenu.tsx component
- Added smooth animations
- Integrated with GlobalHeader
- Tested on iPhone and Android
- Still need to add tablet breakpoint
```

---

## How Often to Commit?

**Minimum:** End of each work session  
**Better:** After completing each feature  
**Best:** After each logical change

**Example schedule:**
- 10am: Start work
- 11am: Finish adding checkout form → Commit
- 12pm: Fix styling issues → Commit
- 1pm: Lunch break → Commit
- 2pm: Add shipping options → Commit
- 3pm: Test on mobile → Commit
- 4pm: Done for day → Final commit

**Rule of thumb:** If you'd be upset to lose it, commit it.

---

## Folder Structure on Your Computer

```
Documents/
└── vitamin-ecommerce-frontend/     ← Your repository
    ├── .git/                        ← GitHub tracking (don't touch!)
    ├── components/
    │   ├── CheckoutPage.tsx
    │   ├── CollectionPage.tsx
    │   └── ...
    ├── data/
    │   ├── products.ts
    │   └── ...
    ├── imports/
    ├── styles/
    ├── utils/
    ├── App.tsx
    └── README.md
```

**Don't touch `.git` folder!** That's where GitHub stores version history.

---

## Keyboard Shortcuts (GitHub Desktop)

| Shortcut | Action |
|----------|--------|
| **Ctrl/Cmd + 1** | Go to Changes |
| **Ctrl/Cmd + 2** | Go to History |
| **Ctrl/Cmd + N** | New repository |
| **Ctrl/Cmd + ,** | Open preferences |
| **Ctrl/Cmd + Shift + A** | Open in code editor |
| **Ctrl/Cmd + Shift + F** | Open in file explorer |

---

## Safety Tips

### ✅ Safe to do:
- Commit frequently
- Push to GitHub.com
- Revert commits
- Create branches
- Delete branches (not main!)
- Download repository again

### ⚠️ Be careful:
- Deleting "main" branch (you can't)
- Force pushing (you won't do this accidentally)
- Deleting `.git` folder (you lose all history)

### 📝 Can't break anything:
- Almost everything can be undone
- GitHub.com has a copy of everything
- Your local files are separate from Git history

**Bottom line:** It's hard to truly break things. Don't be afraid to experiment.

---

## When to Ask for Help

### You can figure out yourself:
- How to commit
- How to push
- How to see history
- How to restore a file

### Ask backend team:
- Merge conflicts
- Advanced branching
- Weird error messages
- "Force push" questions

### Ask GitHub support:
- Account issues
- Billing (if you upgrade to paid)
- GitHub.com website problems

---

## Resources

**GitHub Desktop:**
- Docs: https://docs.github.com/en/desktop
- Download: https://desktop.github.com

**Learning:**
- GitHub Guides: https://guides.github.com
- GitHub Skills: https://skills.github.com

**Your Guides:**
- Full tutorial: `/GITHUB_SETUP_GUIDE.md`
- Checklist: `/GITHUB_QUICK_START_CHECKLIST.md`
- Explanation: `/GITHUB_SIMPLE_EXPLANATION.md`

---

## Troubleshooting Checklist

Problem: Can't push to GitHub

- [ ] Are you connected to internet?
- [ ] Did you commit first?
- [ ] Are you signed into GitHub Desktop?
- [ ] Did you click "Publish repository"?

Problem: Don't see my changes

- [ ] Did you save files in Figma Make?
- [ ] Did you copy files to GitHub folder?
- [ ] Did you click "Commit to main"?
- [ ] Did you click "Push origin"?

Problem: Lost my work

- [ ] Check GitHub Desktop History tab
- [ ] Check github.com/[you]/[repo]
- [ ] Check local folder
- [ ] Restore from commit

---

## Your First Week Goals

**Day 1 (Setup):**
- [ ] Create GitHub account
- [ ] Install GitHub Desktop
- [ ] Create repository
- [ ] Upload code
- [ ] Verify on GitHub.com

**Day 2-7 (Practice):**
- [ ] Make a change
- [ ] Commit with good message
- [ ] Push to GitHub
- [ ] Check GitHub.com to see it
- [ ] Repeat daily

**End of Week:**
- [ ] Review History tab
- [ ] Share repo with team
- [ ] Celebrate! 🎉

---

## Remember

**It's okay to:**
- Make mistakes
- Commit imperfect code
- Ask questions
- Take time to learn

**The goal:**
- Never lose work
- Track your progress
- Collaborate with team
- Feel confident

---

**You've got this!** Start with the setup guide and check things off as you go.

Print this page and keep it next to your computer. 📌
