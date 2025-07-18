# Quick Setup Guide

Get ActionsCounter running in your repository in 5 minutes.

## 🚀 One-Click Setup

### Step 1: Fork the Repository
1. Go to [ActionsCounter GitHub Repository](https://github.com/yourusername/ActionsCounter)
2. Click "Fork" in the top-right corner
3. Choose your account/organization

### Step 2: Enable GitHub Pages
1. In your forked repository, go to **Settings** → **Pages**
2. Under "Source", select **Deploy from a branch**
3. Choose **main** branch and **/ (root)** folder
4. Click **Save**

### Step 3: Configure Repository Secrets
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** and add:

```
Name: ADMIN_PASSWORD
Value: your_secure_password_here
```

```
Name: GITHUB_TOKEN
Value: your_github_personal_access_token
```

### Step 4: Set Storage Mode
1. Go to **Settings** → **Secrets and variables** → **Actions** → **Variables** tab
2. Click **New repository variable** and add:

```
Name: STORAGE_MODE
Value: 1
```

**Storage Mode Options:**
- `1` = GitHub Variables (recommended for most users)
- `2` = External Database (for high-volume projects)
- `3` = Repository Commits (for demos/testing)

### Step 5: Update Frontend Configuration
1. Edit `frontend/src/main.ts` in your repository
2. Update these lines:
```typescript
const REPO_OWNER = "your_github_username";
const REPO_NAME = "ActionsCounter";
```

### Step 6: Test Your Setup
1. Go to **Actions** tab in your repository
2. Click **Handle Projects (Dual Mode)**
3. Click **Run workflow**
4. Fill in:
   - **Action**: `stats`
   - **Password**: your admin password
5. Click **Run workflow**

If successful, you'll see analytics generated!

## 🎯 What's Next?

- **Visit your site**: `https://yourusername.github.io/ActionsCounter`
- **Add your first project**: Use action `add` with a project name
- **Start tracking**: Use action `increment` to count project usage
- **Integrate webhooks**: See [API Reference](./api-reference.md)

## 🔧 Troubleshooting Quick Fixes

**"Invalid password" error:**
- Double-check your `ADMIN_PASSWORD` secret

**"Repository not found" error:**
- Verify your GitHub token has repository access
- Check `REPO_OWNER` and `REPO_NAME` in `main.ts`

**Analytics not showing:**
- Run any action first to generate initial data
- Check that GitHub Pages is enabled and deployed

## 📚 Need More Help?

- [Configuration Guide](./configuration.md) - Detailed configuration options
- [Storage Modes Guide](./storage-overview.md) - Choose the right storage mode
- [Troubleshooting](./troubleshooting.md) - Common issues and solutions

---

**Estimated Setup Time**: 5 minutes
**Recommended Storage Mode**: GitHub Variables (mode 1)
