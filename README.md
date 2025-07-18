# 🚀 ActionsCounter

**Secure GitHub Actions-powered project analytics with triple storage modes.**

Track project usage, downloads, API calls, or any events through simple webhook pings. Choose from GitHub Variables, Database, or Repository storage based on your needs.

## ⚡ Quick Start (5 Minutes)

### 1. Fork & Clone
```bash
# Fork this repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/ActionsCounter.git
cd ActionsCounter
```

### 2. Generate Personal Access Token
<strong><a href="https://github.com/settings/tokens/new?scopes=repo,workflow,admin:repo_hook,read:org&description=ActionsCounter%20Standard%20Token&expiration=never" alt="Create GitHub Token" target="_blank">📝 Create GitHub Token</a></strong>

Required scopes:
- ✅ `repo` - Full repository access
- ✅ `workflow` - Update workflows and trigger actions
- ✅ `admin:repo_hook` - Repository webhook access
- ✅ `read:org` - Read organization data

### 3. Set Repository Secrets
**[🔐 Configure Secrets](https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/secrets/actions)**

Replace `{YOUR_USERNAME}` with your GitHub username, then add:

```
ADMIN_PASSWORD = your_secure_password
PAT_TOKEN = your_personal_access_token_from_step_2
```

### 4. Choose Storage Mode
**[⚙️ Set Variables](https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/variables/actions)**

```
STORAGE_MODE = 1
```

**Storage Options:**
- `1` = **GitHub Variables** (48KB, fast, recommended)
- `2` = **Database** (unlimited, requires PostgreSQL setup)
- `3` = **Repository Commits** (unlimited, creates git commits)

### 4. Configure Frontend
Edit `frontend/src/main.ts`:
```typescript
const REPO_OWNER = "YOUR_USERNAME";
const REPO_NAME = "ActionsCounter";
```

### 5. Enable GitHub Pages
**[📄 Setup GitHub Pages](https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/pages)**

Set source to: **Deploy from main branch**

### 6. Test Your Setup
**[🧪 Run Test Workflow](https://github.com/{YOUR_USERNAME}/ActionsCounter/actions/workflows/handle-projects-dual.yml)**

- Click "Run workflow"
- Action: `stats`
- Click "Run workflow" again

### 7. Access Your Dashboard
**[🌐 View Dashboard](https://{YOUR_USERNAME}.github.io/ActionsCounter)**

Replace `{YOUR_USERNAME}` with your actual GitHub username in all URLs above.

## 🎯 Usage

### Via GitHub Actions UI
1. **Actions** tab → **Handle Projects (Dual Mode)**
2. Choose action (`increment`, `add`, `list`, etc.)
3. Enter project name and password
4. Run workflow

### Via Secure Webhook (Recommended)
```bash
curl -X POST \
  -H "Authorization: token YOUR_PAT_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/dispatches \
  -d '{
    "event_type": "increment",
    "client_payload": {
      "project_name": "my-project"
    }
  }'
```

✅ **Secure**: No admin password in request - uses repository secrets automatically!

### Available Actions
- `increment` - Add 1 to project count
- `decrement` - Subtract 1 from project count
- `add` - Create new project
- `remove` - Delete project
- `set` - Set specific count value
- `get` - View project details
- `list` - Show all projects
- `stats` - Display analytics

## 📊 Storage Modes

| Mode                   | Best For      | Capacity  | Speed     | Setup  |
| ---------------------- | ------------- | --------- | --------- | ------ |
| **GitHub Variables**   | Most projects | 48KB      | Very Fast | 5 min  |
| **Database**           | High volume   | Unlimited | Fast      | 15 min |
| **Repository Commits** | Demos/audit   | Unlimited | Slow      | 10 min |

**Recommended**: Start with GitHub Variables (mode 1), upgrade to Database (mode 2) if you need more capacity.

## 🔒 Security Features

- **Password Protection**: All operations require admin password
- **Repository Secrets**: Sensitive data stored securely in GitHub
- **Token Validation**: GitHub token authentication
- **No Browser Storage**: Zero sensitive data in localStorage

## 📚 Documentation

- **[📖 Complete Documentation](./docs/Home.md)** - Comprehensive guides and references
- **[🚀 Fork Setup Guide](./FORK-SETUP.md)** - Fork-specific setup instructions
- **[🎯 Usage Examples](./docs/usage.md)** - Detailed usage examples and patterns
- **[🔑 GitHub Token Scopes](./docs/token-scopes.md)** - Required Token permissions
- **[⚡ Quick Setup](./docs/quick-setup.md)** - Detailed setup walkthrough
- **[🔗 API Reference](./docs/api-reference.md)** - All actions and webhook examples
- **[🗃️ Storage Modes](./docs/storage-overview.md)** - Choose the right storage mode

## 🛠️ Database Setup (Mode 2 Only)

For Database mode, add these secrets:
```
DB_HOST = your_postgres_host
DB_NAME = your_database_name
DB_PORT = 5432
DB_USER = your_username
DB_PASS = your_password
DB_SCHEMA = myschema
```

**Free PostgreSQL Providers:**
- [filess.io](https://filess.io) - 10MB free
- [Supabase](https://supabase.com) - 500MB free
- [Neon](https://neon.tech) - 512MB free

## 🌟 Example Use Cases

- **Download Tracking**: Monitor software/file downloads
- **API Analytics**: Track API endpoint usage
- **Website Metrics**: Count page views and interactions
- **Project Usage**: Monitor tool/library adoption
- **Event Tracking**: Log application events

## 🔧 Support & Community

### 📚 **Documentation**
- **[📖 Complete Setup Guide](./docs/Home.md)** - Comprehensive documentation
- **[❓ FAQ](./docs/faq.md)** - Quick answers to common questions
- **[🛠️ Troubleshooting](./docs/troubleshooting.md)** - Step-by-step problem solving

### 🤝 **Get Help**
- **[💬 GitHub Discussions](https://github.com/Life-Experimentalist/ActionsCounter/discussions)** - Ask questions, share ideas
- **[🐛 Report Bug](https://github.com/Life-Experimentalist/ActionsCounter/issues/new?template=bug_report.yml)** - Found an issue? Let us know
- **[✨ Request Feature](https://github.com/Life-Experimentalist/ActionsCounter/issues/new?template=feature_request.yml)** - Suggest new features
- **[🆘 Support Guide](./docs/support.md)** - Comprehensive support information

### 🌟 **Contributing**
- **[🤝 Contributing Guide](./docs/contributing.md)** - How to contribute to the project
- **[👥 Contributors](https://github.com/Life-Experimentalist/ActionsCounter/graphs/contributors)** - Meet our amazing contributors

**Quick Help:**
- **"Invalid password" error:** Check `ADMIN_PASSWORD` secret is set correctly
- **Analytics not showing:** Run any action to generate initial data & verify GitHub Pages is enabled
- **Need immediate help?** Check our [FAQ](./docs/faq.md) first!

## 📄 License

Apache 2.0 License - see [LICENSE.md](LICENSE.md)

---

**🚀 Ready to start tracking?** Fork this repo and follow the Quick Start guide above!
