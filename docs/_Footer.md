# 📚 ActionsCounter Wiki

Welcome to the complete documentation for ActionsCounter - GitHub Actions-powered project analytics with triple storage modes.

## 🏠 Navigation

### 📖 **Getting Started**
- [🚀 Quick Setup Guide](./quick-setup.md) - Get started in 5 minutes
- [🔧 Fork Setup Guide](../FORK-SETUP.md) - Fork-specific setup instructions
- [📋 Usage Examples](./usage.md) - API and webhook examples

### 🎯 **Core Documentation**
- [🗃️ Storage Overview](./storage-overview.md) - Compare storage modes 1, 2, 3
- [⚙️ Configuration Guide](./configuration.md) - Complete setup reference
- [🔗 API Reference](./api-reference.md) - All actions and webhook examples

### 🛠️ **Advanced Topics**
- [🔍 Troubleshooting](./troubleshooting.md) - Common issues and solutions
- [🔑 Token Scopes](./token-scopes.md) - GitHub Token requirements
- [🌐 Setup URLs](./setup-urls.md) - Dynamic configuration links

### 🎨 **Frontend & Configuration**
- [⚙️ Configuration Guide](./configuration.md) - Complete setup reference
- [🗃️ Storage Overview](./storage-overview.md) - Storage mode comparison
- [🤖 API Reference](./api-reference.md) - Complete API documentation

### 🔧 **Setup & Documentation**
- [🚀 Quick Setup Guide](./quick-setup.md) - Get started in 5 minutes
- [🔧 Fork Setup Guide](../FORK-SETUP.md) - Fork-specific setup instructions
- [📋 Usage Examples](./usage.md) - API and webhook examples

---

## 🚀 Quick Links

| Action                 | Link                                                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| 📝 Generate GitHub Token  | [Create Token](https://github.com/settings/tokens/new?scopes=repo,workflow&description=ActionsCounter%20Token) |
| 🔐 Repository Secrets   | `https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/secrets/actions`                                   |
| ⚙️ Repository Variables | `https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/variables/actions`                                 |
| 📄 GitHub Pages         | `https://github.com/{YOUR_USERNAME}/ActionsCounter/settings/pages`                                             |
| 🎯 Dashboard            | `https://{YOUR_USERNAME}.github.io/ActionsCounter`                                                             |

## 📊 Storage Mode Quick Reference

| Mode                         | Description          | Capacity  | Speed     | Setup Time |
| ---------------------------- | -------------------- | --------- | --------- | ---------- |
| 🔗 **GitHub Variables (1)**   | Repository variables | 48KB      | Very Fast | 5 minutes  |
| 🗄️ **Database (2)**           | External PostgreSQL  | Unlimited | Fast      | 15 minutes |
| 📁 **Repository Commits (3)** | Git-based storage    | Unlimited | Slow      | 10 minutes |

**Recommended:** Start with Mode 1, upgrade to Mode 2 if needed.

---

## 🎯 Common Use Cases

### 📱 **App Download Tracking**
Track mobile app downloads across platforms:
```bash
# iOS download
curl -X POST https://api.github.com/repos/user/counter/dispatches \
  -H "Authorization: token $TOKEN" \
  -d '{"event_type":"increment","client_payload":{"project_name":"ios-downloads"}}'
```

### 🌐 **API Usage Analytics**
Monitor API endpoint hits:
```bash
# API call tracker
curl -X POST https://api.github.com/repos/user/counter/dispatches \
  -H "Authorization: token $TOKEN" \
  -d '{"event_type":"increment","client_payload":{"project_name":"api-v1-users"}}'
```

### 🎮 **Game Statistics**
Track game events and player actions:
```bash
# Player login counter
curl -X POST https://api.github.com/repos/user/counter/dispatches \
  -H "Authorization: token $TOKEN" \
  -d '{"event_type":"increment","client_payload":{"project_name":"player-logins"}}'
```

---

## 🆘 Support & Community

- 📖 **Documentation**: Browse all guides in this wiki
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Life-Experimentalist/ActionsCounter/issues)
- 💡 **Feature Requests**: [Discussions](https://github.com/Life-Experimentalist/ActionsCounter/discussions)
- 🤝 **Community**: Join the project community for help and updates

---

**💡 Pro Tip:** Bookmark this page and replace `{YOUR_USERNAME}` with your actual GitHub username in all links!

*Last updated: {{ current_date }}*
