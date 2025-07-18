# 📝 ActionsCounter - To-Do List

This file tracks planned features and improvements for the ActionsCounter GitHub Actions-based project tracking system.

---

## ✅ Completed

### Core System
- [x] GitHub Actions-based API for CRUD operations on projects
- [x] Triple-mode storage architecture (GitHub Variables, Database, Repository Commits)
- [x] Admin password protection for all operations
- [x] Interactive frontend dashboard with real-time analytics
- [x] Automatic storage mode detection and configuration

### Storage Modes
- [x] **GitHub Variables Mode** (STORAGE_MODE=1) - Fast, 48KB limit, recommended
- [x] **Database Mode** (STORAGE_MODE=2) - PostgreSQL via filess.io, unlimited storage
- [x] **Repository Commits Mode** (STORAGE_MODE=3) - Git-based storage with commits

### Security & Configuration
- [x] Repository secrets for sensitive data (passwords, tokens, database credentials)
- [x] Repository variables for storage mode configuration
- [x] GitHub token validation and permission checking
- [x] No sensitive data stored in browser/frontend

### Frontend Features
- [x] Beautiful glassmorphism UI with smooth animations
- [x] Storage mode indicator and automatic detection
- [x] Real-time analytics dashboard (projects, counts, averages)
- [x] Responsive mobile-friendly design
- [x] Admin controls with password protection
- [x] Webhook examples with dynamic repository information

### Documentation
- [x] Comprehensive documentation structure in `docs/` directory
- [x] Quick 5-minute setup guide
- [x] Storage mode comparison and selection guide
- [x] Complete API reference with webhook examples
- [x] Configuration reference for all modes
- [x] Troubleshooting guide with common issues

---

## 🎯 Next Up (Short-Term)

- [ ] **Enhanced Analytics**: Add historical charts showing project activity over time
- [ ] **SVG Badges**: Create workflow endpoint to generate dynamic SVG badges for embedding in READMEs
- [ ] **Batch Operations**: Support for bulk project operations (import/export multiple projects)
- [ ] **Project Categories**: Add tagging/categorization system for better organization
- [ ] **Storage Mode Migration**: Automated migration tools between storage modes

---

## 🚀 Future Ideas (Long-Term)

### Advanced Features
- [ ] **Multi-Repository Support**: Allow tracking projects across multiple repositories
- [ ] **Team Collaboration**: Support for multiple admin users with different permission levels
- [ ] **API Rate Limiting**: Implement rate limiting for webhook/API calls
- [ ] **Custom Analytics**: User-defined metrics and tracking parameters
- [ ] **Notification System**: Alerts for milestones, goals, or unusual activity

### Integrations
- [ ] **GitHub App**: Convert to GitHub App for easier installation and permission management
- [ ] **Slack/Discord Webhooks**: Send notifications to team chat platforms
- [ ] **External Database Providers**: Support for Supabase, Railway, Neon, etc.
- [ ] **CI/CD Integration**: Automatic project tracking from other workflow runs
- [ ] **Third-party APIs**: Integration with project management tools

### Developer Experience
- [ ] **CLI Tool**: Command-line interface for local project management
- [ ] **Browser Extension**: Quick access to project stats from GitHub interface
- [ ] **Mobile App**: Native mobile app for on-the-go project tracking
- [ ] **Desktop Widget**: System tray or desktop widget for quick updates
