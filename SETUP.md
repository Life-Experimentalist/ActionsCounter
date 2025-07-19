# 🚀 Fork Setup Guide

**Complete setup automation for forked repositories**
## 🎯 **URL Customization Guide**

**📝 Simple Setup Process:**
All GitHub setup URLs follow the same pattern. Just replace ### **Step 2: Configure Repository Secrets**
**Replace `YOUR_USERNAME` with your GitHub username in this URL:**
**[🔐 Go to your fork's secrets page](https://github.com/YOUR_USERNAME/ActionsCounter/settings/secrets/actions)**

**Set these 2 secrets (⚠️ Enter values WITHOUT quotes):**

**Secret #1:**
```
Name: ADMIN_PASSWORD
Value: YourSecurePassword123!
```
*📝 Note: Enter the password directly - no quotes, no spaces before/after*

**Secret #2:**
```
Name: PAT_TOKEN
Value: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
*� Note: Paste your Personal Access Token exactly as generated - starts with `ghp_`*

*💡 Note: PAT_TOKEN is your Personal Access Token for GitHub API access.*ME` with your actual GitHub username in any URL below.

**🛠️ Interactive Tool Available:**
After completing setup, you can use the interactive URL generator at:
`https://Life-Experimentalist.github.io/ActionsCounter/setup-urls.html`

### 📝 **Your GitHub Username:** `_____________`

**🛠️ How to Use:**
1. Find your GitHub username (top-right corner when logged into GitHub)
2. Copy any URL below
3. Replace `YOUR_USERNAME` with your actual username
4. Paste the customized URL into your browser
5. Configure the settings as instructed

### 📋 **Setup URLs (Replace YOUR_USERNAME):**

**📚 Example:** If your username is `Life-Experimentalist`, then:
- `https://github.com/YOUR_USERNAME/ActionsCounter/settings/secrets/actions`
- **becomes:** `https://github.com/Life-Experimentalist/ActionsCounter/settings/secrets/actions`

**🔐 Repository Secrets:**
```
https://github.com/YOUR_USERNAME/ActionsCounter/settings/secrets/actions
```

**⚙️ Repository Variables:**
```
https://github.com/YOUR_USERNAME/ActionsCounter/settings/variables/actions
```

**📄 GitHub Pages Settings:**
```
https://github.com/YOUR_USERNAME/ActionsCounter/settings/pages
```

**🎯 Actions Tab:**
After completing setup, you can use the interactive URL generator at:
`https://Life-Experimentalist.github.io/ActionsCounter/setup-urls.html`

### 📝 **Your GitHub Username:** `_____________`ed repositories**

## 🔗 Quick Setup URLs

### Step 1: Create Personal Access Token
**[📝 Generate ActionsCounter Standard Token](https://github.com/settings/tokens/new?scopes=repo,workflow,admin:repo_hook,read:org&description=ActionsCounter%20Standard%20Token&note=ActionsCounter%20-%20Repository%20management%20and%20GitHub%20Actions%20API%20access&expiration=never)**

### Step 2: Configure Repository Secrets
**Replace `YOUR_USERNAME` with your GitHub username:**
**[🔐 Repository Secrets](https://github.com/YOUR_USERNAME/ActionsCounter/settings/secrets/actions)**

### Step 3: Set Repository Variables
**Replace `YOUR_USERNAME` with your GitHub username:**
**[⚙️ Repository Variables](https://github.com/YOUR_USERNAME/ActionsCounter/settings/variables/actions)**

### Step 4: Enable GitHub Pages
**Replace `YOUR_USERNAME` with your GitHub username:**
**[📄 GitHub Pages Settings](https://github.com/YOUR_USERNAME/ActionsCounter/settings/pages)** for forked repositories**

## 📋 GitHub Token Scopes Required

Your Personal Access Token needs the following scopes:

### 🔑 **Required Scopes:**
- ✅ `repo` - Full control of private repositories
- ✅ `workflow` - Update GitHub Action workflows
- ✅ `admin:repo_hook` - Repository webhook access
- ✅ `read:org` - Read organization data

### 🔧 **Optional Scopes (for advanced features):**
- ⚙️ `admin:org` - Organization administration (if using org repositories)
- ⚙️ `read:packages` - Download packages from GitHub Package Registry

---

## � **Important Formatting Rules**

### 🚨 **GitHub Web Interface (Secrets & Variables)**
- ⚠️ **NEVER use quotes** when entering values in GitHub's web interface
- ✅ **Correct**: `MyPassword123!`
- ❌ **Wrong**: `"MyPassword123!"` or `'MyPassword123!'`

### 💻 **Command Line Interface (GitHub CLI)**
- ✅ **ALWAYS use double quotes** for CLI commands
- ✅ **Correct**: `gh secret set PASSWORD --body "MyPassword123!"`
- ❌ **Wrong**: `gh secret set PASSWORD --body MyPassword123!`

**Remember**: Web UI = No quotes, CLI = Use quotes!

---

## 🎯 **URL Customization Guide**

**� Simple Setup Process:**
All GitHub setup URLs follow the same pattern. Just replace `YOUR_USERNAME` with your actual GitHub username in any URL below.

### 📝 **Your GitHub Username:** `_____________`

**� How to Use:**
1. Find your GitHub username (top-right corner when logged into GitHub)
2. Copy any URL below
3. Replace `YOUR_USERNAME` with your actual username
4. Paste the customized URL into your browser
5. Configure the settings as instructed

### 📋 **Setup URLs (Replace YOUR_USERNAME):**

**📚 Example:** If your username is `Life-Experimentalist`, then:
- `https://github.com/YOUR_USERNAME/ActionsCounter/settings/secrets/actions`
- **becomes:** `https://github.com/Life-Experimentalist/ActionsCounter/settings/secrets/actions`

**🔐 Repository Secrets:**
```
https://github.com/YOUR_USERNAME/ActionsCounter/settings/secrets/actions
```

**⚙️ Repository Variables:**
```
https://github.com/YOUR_USERNAME/ActionsCounter/settings/variables/actions
```

**📄 GitHub Pages Settings:**
```
https://github.com/YOUR_USERNAME/ActionsCounter/settings/pages
```

**🎯 Actions Tab:**
```
https://github.com/YOUR_USERNAME/ActionsCounter/actions
```

**🌐 Your Dashboard (after setup):**
```
https://YOUR_USERNAME.github.io/ActionsCounter
```

*💡 **Tip**: Bookmark these URLs after replacing YOUR_USERNAME for quick access!*

---

## �🔗 Quick Setup URLs

### Step 1: Create Personal Access Token
**[📝 Generate ActionsCounter Standard Token](https://github.com/settings/tokens/new?scopes=repo,workflow,admin:repo_hook,read:org&description=ActionsCounter%20Standard%20Token&note=ActionsCounter%20-%20Repository%20management%20and%20GitHub%20Actions%20API%20access&expiration=never)**

### Step 2: Configure Repository Secrets
**[🔐 Repository Secrets](https://github.com/{OWNER}/{REPO}/settings/secrets/actions)**

### Step 3: Set Repository Variables
**[⚙️ Repository Variables](https://github.com/{OWNER}/{REPO}/settings/variables/actions)**

### Step 4: Enable GitHub Pages
**[📄 GitHub Pages Settings](https://github.com/{OWNER}/{REPO}/settings/pages)**

---

## 🏗️ **Complete Configuration Reference**

### 🔒 **Required Secrets** (Minimum Setup)

| Secret Name      | Required  | Description                      | Example            | Format Rules                              |
| ---------------- | --------- | -------------------------------- | ------------------ | ----------------------------------------- |
| `ADMIN_PASSWORD` | ✅ **YES** | Secure password for admin access | `MySecurePass123!` | ⚠️ **No quotes** - enter password directly |

### 🗄️ **Database Mode Secrets** (Optional - Only for STORAGE_MODE=2)

| Secret Name | Required    | Description                | Example                | Format Rules                         |
| ----------- | ----------- | -------------------------- | ---------------------- | ------------------------------------ |
| `DB_HOST`   | Only Mode 2 | PostgreSQL server hostname | `postgres.example.com` | ⚠️ **No quotes** - hostname only      |
| `DB_NAME`   | Only Mode 2 | Database name              | `actionscounter_db`    | ⚠️ **No quotes** - database name only |
| `DB_PORT`   | Only Mode 2 | Database port              | `5432`                 | ⚠️ **No quotes** - numbers only       |
| `DB_USER`   | Only Mode 2 | Database username          | `postgres`             | ⚠️ **No quotes** - username only      |
| `DB_PASS`   | Only Mode 2 | Database password          | `your_db_password`     | ⚠️ **No quotes** - password only      |
| `DB_SCHEMA` | Only Mode 2 | Database schema            | `public`               | ⚠️ **No quotes** - schema name only   |

### ⚙️ **Repository Variables** (Configuration)

| Variable Name  | Required  | Description               | Allowed Values   | Format Rules                             |
| -------------- | --------- | ------------------------- | ---------------- | ---------------------------------------- |
| `STORAGE_MODE` | ✅ **YES** | Storage backend selection | `1`, `2`, or `3` | ⚠️ **No quotes** - enter number only: `1` |

---

## � **Step-by-Step Setup Process**

### **Step 1: Fork the Repository**
1. Click "Fork" on the original repository
2. Choose your GitHub account/organization
3. Keep the repository name as "ActionsCounter" (recommended)

### **Step 2: Generate Personal Access Token**
1. **[📝 Click here to generate token](https://github.com/settings/tokens/new?scopes=repo,workflow,admin:repo_hook,read:org&description=ActionsCounter%20Token&expiration=never)**
2. Copy the generated token (starts with `ghp_`)
3. ⚠️ **Save it securely** - you won't see it again!

### **Step 3: Configure Repository Secrets**
**Replace `YOUR_USERNAME` with your GitHub username in this URL:**
**[🔐 Go to your fork's secrets page](https://github.com/YOUR_USERNAME/ActionsCounter/settings/secrets/actions)**

**Set these 2 secrets (⚠️ Enter values WITHOUT quotes):**

**Secret #1:**
```
Name: ADMIN_PASSWORD
Value: YourSecurePassword123!
```
*📝 Note: Enter the password directly - no quotes, no spaces before/after*

**Secret #2:**
```
Name: PAT_TOKEN
Value: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
*📝 Note: Paste the token exactly as generated - starts with `ghp_`*

### **Step 3: Configure Repository Variables**
**Replace `YOUR_USERNAME` with your GitHub username in this URL:**
**[⚙️ Go to your fork's variables page](https://github.com/YOUR_USERNAME/ActionsCounter/settings/variables/actions)**

**Set this 1 variable (⚠️ Enter value WITHOUT quotes):**

**Variable:**
```
Name: STORAGE_MODE
Value: 1
```
*📝 Note: Enter just the number `1` - no quotes, no extra text*

### **Step 4: Enable GitHub Pages**
**Replace `YOUR_USERNAME` with your GitHub username in this URL:**
**[📄 Go to your fork's Pages settings](https://github.com/YOUR_USERNAME/ActionsCounter/settings/pages)**

### **Step 6: Configure GitHub Pages to Deploy from Actions**

1.  **Go to your fork's Pages settings:**
	**[📄 GitHub Pages Settings](https://github.com/{OWNER}/{REPO}/settings/pages)**
2.  Under **Source**, select **GitHub Actions**

### **Step 6: Test Your Setup**
1. Go to your repository's Actions tab
2. Look for the "Deploy Pages" workflow
3. If it hasn't run automatically, click "Run workflow"
4. Wait for deployment to complete (usually 2-3 minutes)
5. Visit your dashboard: `https://YOUR_USERNAME.github.io/ActionsCounter`

---

## ⚙️ Repository Variables

Set these in the Variables tab (not Secrets):

```env
# Storage Configuration (REQUIRED)
STORAGE_MODE=1

# Repository Info (OPTIONAL - Auto-detected since v2.0)
# REPO_OWNER=your-github-username  # Auto-detected from GitHub Actions
# REPO_NAME=ActionsCounter          # Auto-detected from GitHub Actions
```

---

## 🚀 **Automated Setup Options**

### 🎯 **Option 1: Zero-Configuration Setup (Recommended)**

With the new auto-detection feature, you only need to set **2 secrets**:

1. **Fork the repository**
2. **Set these 2 secrets only:**
   - `ADMIN_PASSWORD` - Your secure password
   - `PAT_TOKEN` - Your personal access token
3. **Set 1 variable:**
   - `STORAGE_MODE=1` (GitHub Variables mode)
4. **Enable GitHub Pages**

**That's it!** Repository info is auto-detected during deployment.

### 🔧 **Option 2: Bulk Secret Import (Advanced Users)**

You can use GitHub CLI to set multiple secrets at once:

```bash
# Install GitHub CLI first: https://cli.github.com/

# Set secrets in bulk (quotes ARE needed for CLI commands)
gh secret set ADMIN_PASSWORD --body "your_secure_password_here"
gh secret set PAT_TOKEN --body "ghp_your_token_here"

# For Database Mode (Optional - quotes needed for CLI)
gh secret set DB_HOST --body "your.postgres.host.com"
gh secret set DB_NAME --body "your_database_name"
gh secret set DB_PORT --body "5432"
gh secret set DB_USER --body "your_db_username"
gh secret set DB_PASS --body "your_db_password"
gh secret set DB_SCHEMA --body "public"

# Set variables (quotes needed for CLI)
gh variable set STORAGE_MODE --body "1"
```

*📝 Note: GitHub CLI commands require quotes around values, but GitHub web UI does not*

### 📝 **Option 3: Environment File Template**

Create a `.env` file locally for reference (⚠️ **DO NOT COMMIT THIS**):

```env
# Copy this template and set values manually in GitHub
# REPOSITORY SECRETS (https://github.com/YOUR_USERNAME/ActionsCounter/settings/secrets/actions)
# ⚠️ IMPORTANT: When copying to GitHub, DO NOT include quotes

# REQUIRED SECRETS (copy values WITHOUT quotes to GitHub)
ADMIN_PASSWORD=your_secure_admin_password_here_min_8_chars
PAT_TOKEN=ghp_your_token_here

# OPTIONAL SECRETS (Only for Database Mode - STORAGE_MODE=2)
# Copy these values WITHOUT quotes to GitHub
DB_HOST=your.postgres.host.com
DB_NAME=your_database_name
DB_PORT=5432
DB_USER=your_db_username
DB_PASS=your_db_password
DB_SCHEMA=public

# REPOSITORY VARIABLES (https://github.com/YOUR_USERNAME/ActionsCounter/settings/variables/actions)
# Copy this value WITHOUT quotes to GitHub
STORAGE_MODE=1
```

*📝 **Key Point**: This .env file is just for your reference. When entering values in GitHub's web interface, don't include the quotes - just copy the value after the `=` sign.*

---

## 🎯 Storage Mode Selection

| Mode                   | Value | Description                    | Setup Required   |
| ---------------------- | ----- | ------------------------------ | ---------------- |
| **GitHub Variables**   | `1`   | Fast, 48KB limit, recommended  | ✅ Minimal        |
| **Database**           | `2`   | Unlimited, PostgreSQL required | 🔧 Database setup |
| **Repository Commits** | `3`   | Unlimited, creates Git commits | ⚠️ Repo pollution |

**Recommended:** Start with Mode 1 (GitHub Variables)

---

## 🔗 Dynamic Setup URLs

**📋 Customization Instructions:**
1. **Repository Name**: Keep as `ActionsCounter` (recommended for compatibility)
2. **Username**: Replace `YOUR_USERNAME` with your actual GitHub username
3. **Alternative Repo Name**: If you renamed the repository, replace `ActionsCounter` with your repo name

### Personal Access Token Creation
```
https://github.com/settings/tokens/new?scopes=repo,workflow,admin:repo_hook,read:org&description=ActionsCounter%20Token%20for%20YOUR_USERNAME
```

### Repository Secrets Configuration
```
https://github.com/YOUR_USERNAME/ActionsCounter/settings/secrets/actions
```

### Repository Variables Configuration
```
https://github.com/YOUR_USERNAME/ActionsCounter/settings/variables/actions
```

### GitHub Pages Setup
```
https://github.com/YOUR_USERNAME/ActionsCounter/settings/pages
```

### Actions Workflow Test
```
https://github.com/YOUR_USERNAME/ActionsCounter/actions/workflows/handle-projects-dual.yml
```

### Frontend Dashboard
```
https://YOUR_USERNAME.github.io/ActionsCounter
```

**🔧 For Custom Repository Names:**
If you renamed your fork to something other than "ActionsCounter", replace both instances:
- `YOUR_USERNAME/ActionsCounter` → `YOUR_USERNAME/YOUR_REPO_NAME`
- `YOUR_USERNAME.github.io/ActionsCounter` → `YOUR_USERNAME.github.io/YOUR_REPO_NAME`

---

## ✅ **Setup Verification Checklist**

### 🎯 **Quick Verification (2 minutes)**

**Essential Setup:**
- [ ] 🍴 Repository forked successfully
- [ ] 🔐 `ADMIN_PASSWORD` secret set (min 8 characters)
- [ ] 🔑 `PAT_TOKEN` secret set (starts with `ghp_`)
- [ ] ⚙️ `STORAGE_MODE` variable set to `1`
- [ ] 📄 GitHub Pages enabled (Deploy from main branch)

**Test Your Setup:**
- [ ] 🚀 Go to Actions tab - "Deploy Pages" workflow exists
- [ ] ✅ Run the workflow manually (if not auto-triggered)
- [ ] 🌐 Visit `https://YOUR_USERNAME.github.io/ActionsCounter`
- [ ] 📊 Dashboard loads without errors
- [ ] 🔑 Admin panel accessible with your password

### 🔧 **Advanced Verification (Optional)**

**Database Mode (STORAGE_MODE=2):**
- [ ] 🗄️ All `DB_*` secrets configured
- [ ] 🔗 Database connection successful
- [ ] 📊 Data persistence working

**GitHub Actions Integration:**
- [ ] 🎯 Test workflow run successful
- [ ] 📈 Counter increments visible on dashboard
- [ ] 🔄 Real-time updates working

---

## ⚡ **Quick Copy-Paste Commands**

### PowerShell Setup (Windows)
```powershell
# Navigate to your local fork
cd "ActionsCounter"

# Install GitHub CLI if not already installed
# winget install GitHub.cli

# Authenticate (follow prompts)
gh auth login

# Set secrets quickly (double quotes required for PowerShell)
gh secret set ADMIN_PASSWORD --body "YourSecurePassword123!"
gh secret set PAT_TOKEN --body "ghp_your_token_here"

# Set variables (double quotes required for PowerShell)
gh variable set STORAGE_MODE --body "1"

Write-Host "✅ Setup complete! Enable GitHub Pages manually in browser."
```

### Bash Setup (Linux/Mac)
```bash
# Navigate to your local fork
cd ActionsCounter

# Install GitHub CLI if not already installed
# brew install gh  # macOS
# sudo apt install gh  # Ubuntu

# Authenticate
gh auth login

# Set secrets (double quotes required for bash)
gh secret set ADMIN_PASSWORD --body "YourSecurePassword123!"
gh secret set PAT_TOKEN --body "ghp_your_token_here"

# Set variables (double quotes required for bash)
gh variable set STORAGE_MODE --body "1"

echo "✅ Setup complete! Enable GitHub Pages manually in browser."
```

*📝 **Command Line vs Web UI**: Terminal commands require quotes around values, but GitHub's web interface does not. Choose the method that works best for you!*

---

## 🛠️ **Troubleshooting & Common Issues**

### 🚨 **Setup Issues**

**"Repository not found" or "404 errors":**
- ✅ Ensure repository is forked to your account
- ✅ Check repository name is exactly "ActionsCounter"
- ✅ Verify GitHub Pages is enabled for the correct branch

**"Invalid admin password" error:**
- ✅ Verify `ADMIN_PASSWORD` secret is set correctly (case-sensitive)
- ✅ Password must be at least 8 characters
- ✅ **No trailing spaces** in the secret value
- ✅ **No quotes** around the password in GitHub web UI
- ✅ If using GitHub CLI, ensure quotes are in the command: `--body "password"`

**"Authentication failed" or "No permission" errors:**
- ✅ Check `PAT_TOKEN` secret is set correctly
- ✅ Verify token has required scopes: `repo`, `workflow`, `admin:repo_hook`, `read:org`
- ✅ Confirm token hasn't expired
- ✅ Try regenerating the token if issues persist

**"Workflow not found" or Actions not running:**
- ✅ Ensure Actions are enabled in your fork's settings
- ✅ Check if you have the deploy-pages.yml workflow file
- ✅ Manually trigger the workflow from Actions tab

### 📊 **Dashboard Issues**

**Analytics not loading or blank dashboard:**
- ✅ Wait 5-10 minutes after first setup for initial deployment
- ✅ Check browser developer console for JavaScript errors
- ✅ Verify GitHub Pages URL is correct: `https://YOUR_USERNAME.github.io/ActionsCounter`
- ✅ Run a test action to generate initial data

**Counter not updating:**
- ✅ Verify `STORAGE_MODE` variable is set correctly
- ✅ Check that Actions are completing successfully
- ✅ For Database mode, verify all `DB_*` secrets are configured

### 🗄️ **Database Mode Issues (STORAGE_MODE=2)**

**"Database connection failed":**
- ✅ Verify all `DB_*` secrets are set correctly
- ✅ Test database connectivity from external tool
- ✅ Check firewall settings allow connections
- ✅ Ensure database exists and user has proper permissions

**"Table not found" errors:**
- ✅ Database schema is created automatically on first run
- ✅ Ensure `DB_SCHEMA` is set correctly (usually "public")
- ✅ Check database user has CREATE TABLE permissions

### ⚡ **Quick Fixes**

**Reset everything and start fresh:**
```powershell
# Delete all secrets and variables, then re-add them
gh secret delete ADMIN_PASSWORD
gh secret delete PAT_TOKEN
gh variable delete STORAGE_MODE

# Re-add with correct values (quotes required for CLI commands)
gh secret set ADMIN_PASSWORD --body "YourNewPassword123!"
gh secret set PAT_TOKEN --body "ghp_your_new_token"
gh variable set STORAGE_MODE --body "1"
```

**Test minimal setup:**
1. Use only `STORAGE_MODE=1` (GitHub Variables)
2. Set only `ADMIN_PASSWORD` and `PAT_TOKEN`
3. Enable GitHub Pages
4. Run one simple action to test

### 🔍 **Debug Information**

When reporting issues, include:
- Your GitHub username and repository name
- Storage mode you're using
- Error messages from browser console
- Error messages from GitHub Actions logs
- Whether you can access the admin panel

---

## 📞 **Support & Additional Resources**

### 🆘 **Get Help**

**Self-Service Options:**
1. 📖 **[Complete Documentation](./docs/)** - Comprehensive guides and API reference
2. ❓ **[FAQ Section](./docs/faq.md)** - 40+ common questions and answers
3. 🔧 **[Troubleshooting Guide](./docs/troubleshooting.md)** - Step-by-step problem solving
4. 🛠️ **This setup guide** - You're already here!

**Community Support:**
1. 💬 **[GitHub Discussions](https://github.com/Life-Experimentalist/ActionsCounter/discussions)** - Ask questions, share tips
2. 🐛 **[Report Issues](https://github.com/Life-Experimentalist/ActionsCounter/issues/new/choose)** - Bug reports and feature requests
3. 💡 **[Contributing Guide](./docs/contributing.md)** - Help improve the project

### ⚡ **Quick Test Setup**

**Minimal working configuration for testing:**
```env
# Required Secrets (absolute minimum)
ADMIN_PASSWORD=TestPass123!
PAT_TOKEN=ghp_your_token_here

# Required Variable
STORAGE_MODE=1
```

**Test Action (create `.github/workflows/test-counter.yml`):**
```yaml
name: Test Counter
on:
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Update Counter
        uses: Life-Experimentalist/ActionsCounter@main
        with:
          action: 'increment'
          project: 'test-project'
          category: 'testing'
          admin_password: ${{ secrets.ADMIN_PASSWORD }}
          PAT_TOKEN: ${{ secrets.PAT_TOKEN }}
```

### 🎯 **Success Indicators**

**You'll know setup is working when:**
- ✅ Dashboard loads at `https://YOUR_USERNAME.github.io/ActionsCounter`
- ✅ Admin panel opens with your password
- ✅ Test actions complete without errors
- ✅ Counters increment and display correctly
- ✅ No 404 or authentication errors

### 📋 **Pre-Setup Checklist**

**Before you start, ensure you have:**
- [ ] 🍴 A GitHub account with ability to fork repositories
- [ ] 🔑 Ability to create Personal Access Tokens
- [ ] 📄 Understanding of GitHub Pages (or willingness to learn)
- [ ] ⏱️ 10-15 minutes for complete setup
- [ ] 💻 Access to repository settings (Secrets, Variables, Pages)

**Remember:** Replace `{YOUR_USERNAME}` and `{REPO}` with your actual GitHub username and repository name in all URLs and examples.

---

### 🚀 **What's Next?**

After successful setup:
1. �️ **[Setup URL Generator](https://Life-Experimentalist.github.io/ActionsCounter/setup-urls.html)** - Interactive tool for future configuration
2. �📊 **[Usage Guide](./docs/usage.md)** - Learn all available actions and features
3. 🔧 **[Configuration Options](./docs/configuration.md)** - Advanced customization
4. 🔒 **[Security Best Practices](./docs/validation.md)** - Keep your setup secure
5. 📈 **[Analytics Features](./docs/api-reference.md)** - Explore data visualization options

**Happy Counting! 🎉**
