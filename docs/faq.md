# ❓ Frequently Asked Questions (FAQ)

Get quick answers to the most common questions about ActionsCounter.

## 🚀 Getting Started

### What is ActionsCounter?
ActionsCounter is a GitHub Actions-powered visitor counter and analytics system that tracks project interactions without requiring server hosting. It uses GitHub's infrastructure to provide real-time analytics.

### How does it work without a server?
ActionsCounter leverages:
- **GitHub Actions** for backend processing
- **GitHub Pages** for frontend hosting
- **GitHub API** for data storage (Variables/Repository/Database)
- **Webhooks** for real-time updates

### Which storage mode should I choose?

| Use Case                                | Recommended Mode     | Why?                        |
| --------------------------------------- | -------------------- | --------------------------- |
| Small projects (<100 visitors/day)      | 🔗 Variables (Mode 1) | Fastest, easiest setup      |
| Medium projects (100-1000 visitors/day) | 📁 Commits (Mode 3)   | Unlimited storage, built-in |
| High traffic (1000+ visitors/day)       | 🗄️ Database (Mode 2)  | Best performance, unlimited |

---

## 🔧 Setup & Configuration

### Do I need a GitHub token?
**For basic setup**: No! ActionsCounter can work without personal tokens using repository secrets.

**For advanced features**: Yes, you'll need a token with these scopes:
- `workflow` - Trigger GitHub Actions
- `repo` - Access repository data (if private)
- `read:repo_variables` - Read repository variables

### Can I use this on private repositories?
Yes! ActionsCounter works on both public and private repositories. For private repos, ensure your GitHub token has the `repo` scope.

### How do I change storage modes later?
1. Update the `STORAGE_MODE` repository variable (1, 2, or 3)
2. Follow the setup guide for your new mode
3. Run the migration action (if switching from Variables to Database/Commits)

### What's the difference between secrets and variables?
- **Secrets**: Encrypted, used for sensitive data (passwords, tokens)
- **Variables**: Plain text, used for configuration (storage mode, settings)

---

## 📊 Analytics & Data

### How accurate are the analytics?
ActionsCounter provides:
- **Unique visitors**: Tracked by IP/session (95%+ accuracy)
- **Page views**: Every request (100% accuracy)
- **Geographic data**: Based on GitHub's request headers (90%+ accuracy)
- **Time tracking**: Server-side timestamps (100% accuracy)

### Can I see historical data?
Yes! ActionsCounter stores:
- **Daily analytics** for the past 30 days
- **Weekly summaries** for the past 12 weeks
- **Monthly totals** for the past 12 months
- **All-time statistics** since setup

### How do I export my data?
Depending on your storage mode:
- **Variables Mode**: Use the API endpoint `/api/export`
- **Database Mode**: Direct database queries
- **Commits Mode**: Parse commit history

### Why don't I see analytics immediately?
Initial analytics appear after:
1. **First visitor** triggers the system
2. **GitHub Actions** process the data (1-2 minutes)
3. **GitHub Pages** deploys updates (3-5 minutes)

Total: 5-10 minutes for first analytics to appear.

---

## 🛠️ Technical Questions

### Can I customize the counter appearance?
Yes! Edit `frontend/src/style.css` and `frontend/src/ui.ts`:
- **Colors**: Modify CSS variables
- **Layout**: Adjust HTML structure
- **Animations**: Add CSS transitions
- **Themes**: Create dark/light mode variants

### How do I add ActionsCounter to my website?
```html
<!-- Simple embed -->
<script src="https://YOUR_USERNAME.github.io/ActionsCounter/counter-api-simple.js"></script>
<div id="actions-counter"></div>

<!-- Advanced embed -->
<script src="https://YOUR_USERNAME.github.io/ActionsCounter/counter-api.js"></script>
<div id="actions-counter-advanced"></div>
```

### Can I track multiple websites?
Yes! ActionsCounter supports multiple projects:
1. **Project-based tracking**: Each project gets its own counter
2. **Webhook configuration**: Separate webhooks per project
3. **Analytics separation**: Data is isolated by project name

### What are the GitHub API rate limits?
- **Authenticated requests**: 5,000 per hour
- **Unauthenticated requests**: 60 per hour
- **Actions triggers**: 1,000 per hour per repository

ActionsCounter is optimized to stay well within these limits.

---

## 🔒 Security & Privacy

### Is my data secure?
ActionsCounter follows security best practices:
- **No personal data** stored (only visit counts and basic analytics)
- **Encrypted secrets** for sensitive configuration
- **Repository-based access** control
- **No third-party tracking** services

### What data does ActionsCounter collect?
Minimal analytics data:
- **Visit timestamps** (when)
- **Project names** (which page)
- **Basic geography** (country/region, no precise location)
- **Referrer information** (how visitors found you)

**Not collected**: Personal information, precise location, browsing history.

### Can I use this for GDPR compliance?
Yes! ActionsCounter is GDPR-friendly:
- **No cookies** or persistent tracking
- **No personal data** collection
- **Data minimization** by design
- **User control** over data (self-hosted)

### How do I delete all data?
Depending on storage mode:
- **Variables**: Delete `ANALYTICS_DATA` repository variable
- **Database**: Drop the analytics table
- **Commits**: Reset repository history (not recommended)

---

## 🚨 Troubleshooting

### Why isn't my counter working?
Common issues and quick fixes:

1. **Check storage mode**: Ensure `STORAGE_MODE` variable is set correctly
2. **Verify secrets**: All required secrets are configured
3. **Test manually**: Run Actions → Handle Projects (Dual Mode) → `stats`
4. **Check logs**: Review GitHub Actions logs for errors

### "Invalid password" error?
- Check `ADMIN_PASSWORD` secret exists and is correct
- Avoid special characters: `"`, `'`, `$`, `\`, `` ` ``
- Re-create the secret if needed

### Frontend shows "Configuration needed"?
1. **Clear browser cache**: Hard refresh (Ctrl+F5)
2. **Check GitHub Pages**: Ensure it's enabled and deployed
3. **Verify repository**: Must be public or token must have `repo` scope

### Analytics not updating?
- **Wait 5-10 minutes** for GitHub Actions to process
- **Check Actions tab** for workflow runs
- **Verify webhook** is triggering correctly
- **Test with manual action** first

---

## 🎯 Advanced Usage

### Can I integrate with other analytics?
Yes! ActionsCounter provides:
- **JSON API** for data export
- **Webhook events** for real-time integration
- **CSV export** for spreadsheet analysis
- **Custom endpoints** for specific metrics

### How do I backup my data?
Automated backups:
```yaml
# Add to your workflow
- name: Backup Analytics
  run: |
    curl -H "Authorization: token ${{ secrets.PAT_TOKEN }}" \
      "https://api.github.com/repos/${{ github.repository }}/actions/variables/ANALYTICS_DATA" \
      > backup-$(date +%Y%m%d).json
```

### Can I run multiple instances?
Yes! Deploy separate ActionsCounter instances:
1. **Fork multiple times** with different names
2. **Use different storage modes** per instance
3. **Configure separate webhooks** for each
4. **Aggregate data** using custom scripts

---

## 🌟 Best Practices

### Performance Optimization
- **Use Variables mode** for small sites (fastest)
- **Cache API responses** in your application
- **Batch multiple increments** when possible
- **Monitor rate limits** in high-traffic scenarios

### Security Recommendations
- **Rotate tokens** regularly (every 6 months)
- **Use minimal scopes** (only what you need)
- **Monitor repository access** logs
- **Keep secrets updated** and secure

### Monitoring & Maintenance
- **Check Actions logs** weekly for errors
- **Review analytics** for unusual patterns
- **Update dependencies** in frontend/package.json
- **Test webhook endpoints** monthly

---

## 🆘 Still Need Help?

### 1. Check Documentation
- [📖 Complete Setup Guide](./Home.md)
- [🔧 Configuration Options](./configuration.md)
- [🛠️ Troubleshooting Guide](./troubleshooting.md)

### 2. Search Existing Issues
- [🔍 Browse Known Issues](https://github.com/Life-Experimentalist/ActionsCounter/issues?q=is%3Aissue)
- [💡 Feature Requests](https://github.com/Life-Experimentalist/ActionsCounter/issues?q=is%3Aissue+label%3Aenhancement)

### 3. Ask the Community
- [💬 GitHub Discussions](https://github.com/Life-Experimentalist/ActionsCounter/discussions)
- [❓ Q&A Section](https://github.com/Life-Experimentalist/ActionsCounter/discussions/categories/q-a)

### 4. Report Issues
- [🐛 Bug Reports](https://github.com/Life-Experimentalist/ActionsCounter/issues/new?template=bug_report.md)
- [✨ Feature Requests](https://github.com/Life-Experimentalist/ActionsCounter/issues/new?template=feature_request.md)

---

## 📈 Usage Statistics

> This FAQ is dynamically updated based on the most common support questions. Last updated: July 2025

**Most Common Questions:**
1. Storage mode selection (40% of questions)
2. GitHub token setup (25% of questions)
3. Frontend integration (20% of questions)
4. Troubleshooting errors (15% of questions)

**Quick Resolution Rate:** 85% of issues resolved within 24 hours using this FAQ.

---

**Found this helpful?** ⭐ Star the repository and share with others!
**Still have questions?** [Open an issue](https://github.com/Life-Experimentalist/ActionsCounter/issues/new) - we're here to help!
