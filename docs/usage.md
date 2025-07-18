# 📖 ActionsCounter - Usage Guide

Complete usage guide for GitHub Actions-powered project analytics with triple storage modes.

---

## 🚀 Quick Setup After Fork

### 1. Generate Personal Access Token
**[📝 Create GitHub Token](https://github.com/settings/tokens/new?scopes=repo,workflow&description=ActionsCounter%20Token)**

Required scopes:
- `repo` - Full repository access
- `workflow` - Update workflows and trigger actions

### 2. Configure Repository Secrets
**[🔐 Set Repository Secrets](https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/secrets/actions)**

Required secrets:
```
ADMIN_PASSWORD = your_secure_admin_password
GITHUB_TOKEN = your_personal_access_token_from_step_1
```

Optional secrets (for Database Mode only):
```
DB_HOST = your_postgres_host
DB_NAME = your_database_name
DB_PORT = 5432
DB_USER = your_username
DB_PASS = your_password
DB_SCHEMA = your_schema_name
```

### 3. Set Storage Mode
**[⚙️ Set Repository Variables](https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/variables/actions)**

```
STORAGE_MODE = 1
```

Storage modes:
- `1` = GitHub Variables (48KB, recommended)
- `2` = Database (unlimited, requires setup)
- `3` = Repository Commits (unlimited, creates commits)

---

## 🎯 Usage Examples

### ➕ Add a New Project (Secure Webhook)

```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/dispatches \
  -d '{
    "event_type": "add",
    "client_payload": {
      "project_name": "my-cool-app",
      "description": "An example project",
      "url": "https://github.com/user/my-cool-app"
    }
  }'
```

### 📈 Increment Project Count

```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/dispatches \
  -d '{
    "event_type": "increment",
    "client_payload": {
      "project_name": "my-cool-app"
    }
  }'
```

### 📊 List All Projects

```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/dispatches \
  -d '{
    "event_type": "list",
    "client_payload": {}
  }'
```

### 🗑️ Remove a Project

```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/dispatches \
  -d '{
    "event_type": "remove",
    "client_payload": {
      "project_name": "my-cool-app"
    }
  }'
```

### � Set Specific Count

```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/dispatches \
  -d '{
    "event_type": "set",
    "client_payload": {
      "project_name": "my-cool-app",
      "count_value": "42"
    }
  }'
```

### 📊 Get Analytics & Statistics

```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/dispatches \
  -d '{
    "event_type": "stats",
    "client_payload": {}
  }'
```

---

## 🔒 Security Features

✅ **No admin password in requests** - Uses repository secrets automatically
✅ **GitHub token authentication** - Standard GitHub API security
✅ **Repository-level access control** - Only authorized users can modify
✅ **Encrypted secrets storage** - GitHub handles encryption automatically

## 📱 Frontend Dashboard

After setup, access your analytics dashboard at:
**https://YOUR_USERNAME.github.io/ActionsCounter**

## 🛠️ Manual Actions (GitHub UI)

Alternative to API calls - use GitHub Actions tab:
1. Go to **Actions** → **Handle Projects (Dual Mode)**
2. Click **Run workflow**
3. Select action and enter parameters
4. Click **Run workflow**

---

**Replace `YOUR_USERNAME` and `YOUR_GITHUB_TOKEN` with your actual values.**
