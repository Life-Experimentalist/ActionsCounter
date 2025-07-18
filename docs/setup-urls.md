# 🔗 Dynamic Setup URLs

**Automatically generate setup URLs for your forked repository**

## 📋 URL Templates

Replace `{YOUR_USERNAME}` with your GitHub username in all URLs below:

### 🔑 **Personal Access Token Creation**
```
https://github.com/settings/tokens/new?scopes=repo,workflow,admin:repo_hook,read:org&description=ActionsCounter%20Token%20for%20{YOUR_USERNAME}&note=ActionsCounter%20API%20access%20token
```

### 🔐 **Repository Secrets Configuration**
```
https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/secrets/actions
```

### ⚙️ **Repository Variables Configuration**
```
https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/variables/actions
```

### 📄 **GitHub Pages Setup**
```
https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/pages
```

### 🧪 **Test Workflow Execution**
```
https://github.com/{YOUR_USERNAME}/ActionsCounter/actions/workflows/handle-projects-dual.yml
```

### 🌐 **Frontend Dashboard Access**
```
https://{YOUR_USERNAME}.github.io/ActionsCounter
```

### 📊 **Repository Actions Tab**
```
https://github.com/{YOUR_USERNAME}/ActionsCounter/actions
```

### ⚙️ **Repository Settings Home**
```
https://github.com/{YOUR_USERNAME}/ActionsCounter/settings
```

## 🎯 **Quick Copy Templates**

### For README/Documentation
```markdown
## 🚀 Quick Setup Links

- [📝 Create Token](https://github.com/settings/tokens/new?scopes=repo,workflow&description=ActionsCounter%20Token)
- [🔐 Setup Secrets](https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/secrets/actions)
- [⚙️ Configure Variables](https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/variables/actions)
- [📄 Enable Pages](https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/pages)
- [🌐 View Dashboard](https://{YOUR_USERNAME}.github.io/ActionsCounter)
```

### For Issue Templates
```markdown
**Setup URLs for this repository:**
- Secrets: https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/secrets/actions
- Variables: https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/variables/actions
- Pages: https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/pages
- Actions: https://github.com/{YOUR_USERNAME}/ActionsCounter/actions
```

### For Support/Help
```markdown
**Please check these setup URLs:**
1. Personal Access Token: [Create here](https://github.com/settings/tokens/new?scopes=repo,workflow&description=ActionsCounter)
2. Repository Secrets: https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/secrets/actions
3. Repository Variables: https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/variables/actions
4. GitHub Pages: https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/pages
```

## 🔄 **Dynamic URL Generation**

### JavaScript Function
```javascript
function generateSetupUrls(username, repoName = 'ActionsCounter') {
  const baseUrl = `https://github.com/${username}/${repoName}`;

  return {
    secrets: `${baseUrl}/settings/secrets/actions`,
    variables: `${baseUrl}/settings/variables/actions`,
    pages: `${baseUrl}/settings/pages`,
    actions: `${baseUrl}/actions`,
    workflow: `${baseUrl}/actions/workflows/handle-projects-dual.yml`,
    dashboard: `https://${username}.github.io/${repoName}`,
    createToken: `https://github.com/settings/tokens/new?scopes=repo,workflow&description=${repoName}%20Token%20for%20${username}`
  };
}

// Usage
const urls = generateSetupUrls('your-username');
console.log(urls.secrets); // Repository secrets URL
```

### Python Function
```python
def generate_setup_urls(username, repo_name='ActionsCounter'):
    """Generate setup URLs for a forked repository"""
    base_url = f"https://github.com/{username}/{repo_name}"

    return {
        'secrets': f"{base_url}/settings/secrets/actions",
        'variables': f"{base_url}/settings/variables/actions",
        'pages': f"{base_url}/settings/pages",
        'actions': f"{base_url}/actions",
        'workflow': f"{base_url}/actions/workflows/handle-projects-dual.yml",
        'dashboard': f"https://{username}.github.io/{repo_name}",
        'create_token': f"https://github.com/settings/tokens/new?scopes=repo,workflow&description={repo_name}%20Token%20for%20{username}"
    }

# Usage
urls = generate_setup_urls('your-username')
print(urls['secrets'])  # Repository secrets URL
```

### Bash Function
```bash
#!/bin/bash
generate_setup_urls() {
    local username="$1"
    local repo_name="${2:-ActionsCounter}"
    local base_url="https://github.com/${username}/${repo_name}"

    echo "Secrets: ${base_url}/settings/secrets/actions"
    echo "Variables: ${base_url}/settings/variables/actions"
    echo "Pages: ${base_url}/settings/pages"
    echo "Actions: ${base_url}/actions"
    echo "Workflow: ${base_url}/actions/workflows/handle-projects-dual.yml"
    echo "Dashboard: https://${username}.github.io/${repo_name}"
    echo "Create Token: https://github.com/settings/tokens/new?scopes=repo,workflow&description=${repo_name}%20Token"
}

# Usage
generate_setup_urls "your-username"
```

## 📝 **URL Components Explained**

### GitHub Settings URLs
- `/settings/secrets/actions` - Repository secrets configuration
- `/settings/variables/actions` - Repository variables configuration
- `/settings/pages` - GitHub Pages deployment settings
- `/settings` - General repository settings

### GitHub Actions URLs
- `/actions` - Actions tab with workflow runs
- `/actions/workflows/{workflow-file}` - Specific workflow page
- `/actions/workflows/{workflow-file}/runs` - Workflow run history

### GitHub Pages URLs
- `https://{username}.github.io/{repo}` - Standard GitHub Pages URL
- `https://{username}.github.io/{repo}/` - With trailing slash
- Custom domains also supported if configured

### GitHub API URLs (for webhooks)
- `https://api.github.com/repos/{owner}/{repo}/dispatches` - Repository dispatch endpoint
- `https://api.github.com/repos/{owner}/{repo}/actions/workflows/{workflow}/dispatches` - Workflow dispatch endpoint

## ✅ **Validation Checklist**

Before sharing URLs, verify:
- [ ] Username is correct (case-sensitive)
- [ ] Repository name matches exactly
- [ ] URLs are properly encoded (spaces as `%20`)
- [ ] Repository is public or user has access
- [ ] GitHub Pages is enabled for dashboard URLs
- [ ] Token scopes match requirements

---

**💡 Pro Tip:** Bookmark these URL patterns and create browser bookmarks with `{YOUR_USERNAME}` placeholder for quick access!
