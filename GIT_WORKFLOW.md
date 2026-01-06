# Git Workflow - Quick Reference

## 📝 Daily Git Commands

### 1. Check Status
```bash
git status
```
Melihat file mana yang berubah (modified/added/deleted)

### 2. Stage Changes (Add Files)
```bash
# Add specific file
git add src/routes/index.js

# Add all files in directory
git add src/views/

# Add all changed files
git add .

# Add all js files
git add *.js
```

### 3. Commit Changes
```bash
# Simple commit
git commit -m "Fix protokol blank page issue"

# Commit with detailed description
git commit -m "feat: Add protokol management module

- Add 18 fields to protokol table
- Implement file upload for 7 document types
- Add CRUD operations via API
- Update UI with Bootstrap cards"
```

### 4. Push to GitHub
```bash
# Push to main branch
git push

# Or explicitly
git push origin main

# Force push (use with caution!)
git push -f origin main
```

### 5. Pull Latest Changes
```bash
# Pull from GitHub (if working with team)
git pull origin main
```

## 🔄 Common Workflows

### Workflow 1: Fix Bug & Push
```bash
# 1. Make changes to files...
# 2. Check what changed
git status

# 3. Add changed files
git add .

# 4. Commit with message
git commit -m "fix: Resolve dashboard SQL error on surat.createdAt"

# 5. Push to GitHub
git push
```

### Workflow 2: Add New Feature
```bash
# 1. Create new feature branch (optional, for larger features)
git checkout -b feature/export-excel

# 2. Make changes...
# 3. Add and commit
git add .
git commit -m "feat: Add Excel export functionality for anggaran"

# 4. Switch back to main
git checkout main

# 5. Merge feature branch
git merge feature/export-excel

# 6. Push to GitHub
git push
```

### Workflow 3: Undo Changes (Before Commit)
```bash
# Discard changes to specific file
git checkout -- src/routes/index.js

# Discard all changes
git checkout -- .

# Or use restore (newer git)
git restore src/routes/index.js
```

### Workflow 4: Undo Last Commit (Keep Changes)
```bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Undo last commit and discard changes
git reset --hard HEAD~1
```

## 📋 Commit Message Conventions

Use these prefixes for better organization:

- `feat:` - New feature
  - `feat: Add export to PDF for protokol`
- `fix:` - Bug fix
  - `fix: Resolve blank page on protokol menu`
- `docs:` - Documentation
  - `docs: Update README with installation guide`
- `style:` - Code formatting (no logic change)
  - `style: Format code with prettier`
- `refactor:` - Code refactoring
  - `refactor: Optimize database queries`
- `test:` - Add tests
  - `test: Add unit tests for auth middleware`
- `chore:` - Maintenance
  - `chore: Update dependencies`

## 🌿 Branch Management

### Create New Branch
```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Or (newer syntax)
git switch -c feature/new-feature
```

### Switch Branch
```bash
git checkout main
# or
git switch main
```

### List Branches
```bash
# Local branches
git branch

# All branches (including remote)
git branch -a
```

### Delete Branch
```bash
# Delete local branch
git branch -d feature/old-feature

# Force delete
git branch -D feature/old-feature
```

## 🔍 View History

```bash
# View commit history
git log

# Compact view
git log --oneline

# Graph view
git log --graph --oneline --all

# Last 5 commits
git log -5
```

## 🆘 Emergency Commands

### Stash Changes (Save for Later)
```bash
# Save current changes without committing
git stash

# List stashed changes
git stash list

# Apply stashed changes
git stash pop

# Apply specific stash
git stash apply stash@{0}
```

### View Differences
```bash
# See what changed (unstaged)
git diff

# See staged changes
git diff --staged

# Compare with specific commit
git diff HEAD~1
```

## 📦 Working with .gitignore

File: `.gitignore`
```
# Ignore node_modules
node_modules/

# Ignore .env files
.env
.env.local

# Ignore uploads
uploads/*
!uploads/.gitkeep

# Ignore logs
*.log
npm-debug.log*
```

### Remove Already Tracked Files
```bash
# If you added .env to .gitignore but it's already tracked:
git rm --cached .env
git commit -m "chore: Remove .env from tracking"
git push
```

## 🔧 Configuration

### Set User Info (Per Repository)
```bash
git config user.name "Fadel Muhammad"
git config user.email "your.email@example.com"
```

### Set User Info (Global)
```bash
git config --global user.name "Fadel Muhammad"
git config --global user.email "your.email@example.com"
```

### View Config
```bash
# Local config
git config --list

# Global config
git config --global --list
```

## 🚀 Quick Tips

1. **Commit Often**: Make small, focused commits
2. **Write Clear Messages**: Future you will thank you
3. **Pull Before Push**: Avoid conflicts
4. **Use Branches**: For experimental features
5. **Review Before Commit**: Always check `git status` and `git diff`

## 📚 Learn More

- Official Git Docs: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/
- Interactive Tutorial: https://learngitbranching.js.org/

---

**Repository:** https://github.com/fadelmuhammadgaming-prog/ecc.git
