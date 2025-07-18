# 🔑 GitHub Personal Access Token Scopes

Complete reference for GitHub Token scopes required by ActionsCounter.

## 🎯 **Required Scopes**

### ✅ `repo` - Full control of private repositories
**What it enables:**
- Read/write access to repository content
- Access to repository secrets and variables
- Trigger GitHub Actions workflows
- Read repository metadata and settings

**Why ActionsCounter needs it:**
- Update repository variables (storage mode 1)
- Access workflow files and configuration
- Read/write project data in repository mode

### ✅ `workflow` - Update GitHub Action workflows
**What it enables:**
- Trigger workflow runs via API
- Read workflow configuration
- Access workflow run logs and status

**Why ActionsCounter needs it:**
- Trigger project operations via repository_dispatch
- Enable webhook integration
- Execute increment/decrement/stats operations

### ✅ `admin:repo_hook` - Full control of repository hooks
**What it enables:**
- Create, read, update, delete repository webhooks
- Access webhook delivery data
- Configure webhook events

**Why ActionsCounter needs it:**
- Advanced webhook integration
- Custom event handling
- Repository dispatch events

### ✅ `read:org` - Read organization data
**What it enables:**
- Read organization membership
- Access organization repositories
- Read organization settings

**Why ActionsCounter needs it:**
- Support for organization repositories
- Team-based access control
- Organization-wide analytics

## ⚙️ **Optional Scopes**

### 🔧 `admin:org` - Full control of orgs and teams
**What it enables:**
- Manage organization settings
- Create/delete organization repositories
- Manage team membership

**When you might need it:**
- Setting up ActionsCounter for entire organization
- Managing multiple team repositories
- Advanced organization-wide deployment

### 🔧 `read:packages` - Download packages from GitHub Package Registry
**What it enables:**
- Access GitHub Container Registry
- Download npm/docker packages
- Read package metadata

**When you might need it:**
- Using containerized database setup
- Advanced deployment configurations
- Package-based integrations

## 🚫 **Scopes You DON'T Need**

### ❌ `user:email` - Access user email addresses
- **Not required** - ActionsCounter doesn't need user emails

### ❌ `public_repo` - Access public repositories
- **Redundant** - `repo` scope includes public repo access

### ❌ `gist` - Create gists
- **Not used** - ActionsCounter doesn't create gists

### ❌ `notifications` - Access notifications
- **Not needed** - No notification management features

### ❌ `write:packages` - Upload packages to GitHub Package Registry
- **Not used** - ActionsCounter doesn't publish packages

## 🔗 **Quick Setup URLs**

### 1. Minimal Setup (Most Users)
**Scopes:** `repo`, `workflow`
**Best for:** Basic functionality, personal repositories

**[🚀 Generate Minimal Token](https://github.com/settings/tokens/new?scopes=repo,workflow&description=ActionsCounter%20Basic%20Token&expiration=never)**

### 2. Standard Setup (Recommended)
**Scopes:** `repo`, `workflow`, `admin:repo_hook`, `read:org`
**Best for:** Full functionality, webhook integration, team repositories

**[⭐ Generate Standard Token](https://github.com/settings/tokens/new?scopes=repo,workflow,admin:repo_hook,read:org&description=ActionsCounter%20Standard%20Token&expiration=never)**

### 3. Organization Setup (Advanced)
**Scopes:** `repo`, `workflow`, `admin:repo_hook`, `read:org`, `admin:org`
**Best for:** Organization-wide deployment, admin control

**[🏢 Generate Organization Token](https://github.com/settings/tokens/new?scopes=repo,workflow,admin:repo_hook,read:org,admin:org&description=ActionsCounter%20Organization%20Token&expiration=never)**

### How to Use These Links:
1. **Click your preferred link above** - GitHub opens with pre-filled scopes
2. **(Optional)** Set token expiration for better security
3. **Click "Generate token"** at the bottom of the page
4. **Copy the token** and store it in your repository secrets

**💡 Pro Tip:** Start with the **Standard Setup**. You can always revoke and create a new token if you need different scopes later.

## 🔒 **Security Best Practices**

### ✅ **Do:**
- Use minimal required scopes for your use case
- Set expiration dates on tokens (90 days recommended)
- Use descriptive token names
- Store tokens in repository secrets (never commit to code)
- Regularly audit and rotate tokens

### ❌ **Don't:**
- Use more scopes than necessary
- Share tokens between multiple applications
- Store tokens in plain text files
- Use tokens without expiration dates
- Grant organization admin rights unless required

## 🧪 **Scope Testing**

After creating your token, test scope access:

### Test Repository Access
```bash
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/YOUR_USERNAME/ActionsCounter
```

### Test Workflow Access
```bash
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/actions/workflows
```

### Test Repository Variables
```bash
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/actions/variables
```

## ❓ **Troubleshooting**

### "Bad credentials" error
- Check token is copied correctly
- Verify token hasn't expired
- Ensure token has required scopes

### "Not Found" errors
- Verify repository name is correct
- Check if repository is private (requires `repo` scope)
- Ensure token has access to the specific repository

### Permission errors
- Review scope requirements above
- Create new token with additional scopes if needed
- Check organization permissions for organization repos

---

**💡 Pro Tip:** Start with the Standard Setup scopes. You can always create a new token with additional scopes if needed later!
