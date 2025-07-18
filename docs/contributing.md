# 🤝 Contributing to ActionsCounter

Thank you for your interest in contributing to ActionsCounter! This guide will help you get started with contributing to the project.

## 🌟 How to Contribute

We welcome contributions of all kinds:

### 📝 **Documentation**
- Fix typos or improve clarity
- Add examples and use cases
- Translate documentation
- Create video tutorials

### 🐛 **Bug Reports**
- Report issues you encounter
- Provide detailed reproduction steps
- Test and verify fixes

### ✨ **Feature Requests**
- Suggest new functionality
- Propose improvements
- Share use case scenarios

### 💻 **Code Contributions**
- Fix bugs and issues
- Implement new features
- Improve performance
- Add tests and validation

---

## 🚀 Getting Started

### 1. Fork the Repository
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ActionsCounter.git
cd ActionsCounter

# Add upstream remote
git remote add upstream https://github.com/Life-Experimentalist/ActionsCounter.git
```

### 2. Set Up Development Environment
```bash
# Frontend development
cd frontend
npm install
npm run dev

# Python reference (if contributing to backend)
cd reference
pip install -r requirements.txt
```

### 3. Create a Feature Branch
```bash
# Create and switch to feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description
```

---

## 📋 Contribution Guidelines

### 🐛 **Reporting Bugs**

**Before reporting:**
1. ✅ Search [existing issues](https://github.com/Life-Experimentalist/ActionsCounter/issues)
2. ✅ Check the [FAQ](./faq.md) and [troubleshooting guide](./troubleshooting.md)
3. ✅ Test with the latest version

**Bug Report Template:**
```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- Storage Mode: [1/2/3]
- Browser: [e.g., Chrome 91]
- Repository: [public/private]
- ActionsCounter Version: [commit hash]

**Logs/Screenshots**
Include relevant GitHub Actions logs or browser console errors.
```

**[🐛 Report a Bug](https://github.com/Life-Experimentalist/ActionsCounter/issues/new?labels=bug&template=bug_report.md)**

### ✨ **Feature Requests**

**Before requesting:**
1. ✅ Check [existing feature requests](https://github.com/Life-Experimentalist/ActionsCounter/issues?q=is%3Aissue+label%3Aenhancement)
2. ✅ Consider if it fits the project scope
3. ✅ Think about implementation complexity

**[🐛 Report a Bug](https://github.com/Life-Experimentalist/ActionsCounter/issues/new?template=bug_report.yml)**

**Feature Request Template:**
```markdown
**Feature Summary**
A brief description of the feature you'd like to see.

**Problem/Use Case**
What problem does this solve? Who would benefit?

**Proposed Solution**
How do you envision this working?

**Alternatives Considered**
Other approaches you've thought about.

**Additional Context**
Screenshots, mockups, or examples that help explain.
```

**[✨ Request a Feature](https://github.com/Life-Experimentalist/ActionsCounter/issues/new?template=feature_request.yml)**

### 💻 **Code Contributions**

#### Code Style
- **Frontend (TypeScript)**: Follow existing style, use meaningful variable names
- **Workflows (YAML)**: Consistent indentation, clear comments
- **Documentation (Markdown)**: Clear headings, proper formatting

#### Testing Your Changes
```bash
# Test frontend changes
cd frontend
npm run build
npm run preview

# Test workflows manually
# Go to Actions tab → Run workflow with your changes

# Validate documentation
# Check that all links work and formatting is correct
```

#### Pull Request Process
1. **Create descriptive commits**:
   ```bash
   git commit -m "feat: add project-specific authentication"
   git commit -m "fix: resolve XSS vulnerability in UI"
   git commit -m "docs: update storage mode comparison"
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**:
   - Use the PR template
   - Link to related issues
   - Provide testing instructions
   - Request review from maintainers

**Pull Request Template:**
```markdown
**Description**
Brief description of changes made.

**Type of Change**
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work)
- [ ] Documentation update

**Related Issues**
Fixes #123, Related to #456

**Testing**
- [ ] Tested locally
- [ ] All existing tests pass
- [ ] Added new tests (if applicable)

**Screenshots**
If applicable, add screenshots showing the changes.

**Checklist**
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated (if needed)
- [ ] No breaking changes (or clearly documented)
```

---

## 🎯 Priority Areas

We especially welcome contributions in these areas:

### 🔥 **High Priority**
- **Performance optimizations** for high-traffic scenarios
- **Mobile responsiveness** improvements
- **Accessibility** enhancements (ARIA labels, keyboard navigation)
- **Test coverage** expansion

### 🚀 **Medium Priority**
- **New storage modes** (Redis, MongoDB, etc.)
- **Advanced analytics** (user journeys, conversion tracking)
- **Internationalization** (i18n) support
- **Plugin system** for extensibility

### 💡 **Low Priority**
- **UI themes** and customization options
- **Export formats** (PDF reports, Excel)
- **Integration examples** with popular frameworks
- **Video tutorials** and guides

---

## 🏷️ **Issue Labels**

Understanding our labeling system:

| Label              | Description             | Good for New Contributors |
| ------------------ | ----------------------- | ------------------------- |
| `good first issue` | Easy to implement       | ✅ Perfect for beginners   |
| `help wanted`      | Community input needed  | ✅ Great for contributors  |
| `bug`              | Something isn't working | ⚡ Quick wins available    |
| `enhancement`      | New feature request     | 🎯 Larger projects         |
| `documentation`    | Docs need improvement   | ✅ Non-code contributions  |
| `priority: high`   | Urgent fixes needed     | 🔥 Important impact        |
| `priority: low`    | Nice to have            | 💡 Future improvements     |

**[🔍 Browse Good First Issues](https://github.com/Life-Experimentalist/ActionsCounter/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)**

---

## 💬 **Community & Support**

### 📞 Getting Help
- **[💬 Discussions](https://github.com/Life-Experimentalist/ActionsCounter/discussions)** - General questions and ideas
- **[❓ Q&A](https://github.com/Life-Experimentalist/ActionsCounter/discussions/categories/q-a)** - Technical help
- **[💡 Ideas](https://github.com/Life-Experimentalist/ActionsCounter/discussions/categories/ideas)** - Feature brainstorming

### 🌍 Community Guidelines
- **Be respectful** and inclusive
- **Help others** learn and grow
- **Provide constructive** feedback
- **Follow** [GitHub's Community Guidelines](https://docs.github.com/en/site-policy/github-terms/github-community-guidelines)

### 🏆 Recognition
Contributors are recognized in:
- **README.md** contributors section
- **Release notes** for significant contributions
- **GitHub Discussions** for helpful community members

---

## 📚 **Development Resources**

### 🔧 **Technical Documentation**
- [🏗️ Project Overview](./Home.md)
- [🔗 API Reference](./api-reference.md)
- [⚙️ Configuration Guide](./configuration.md)
- [🛠️ Workflow Files](../.github/workflows/)

### 🎓 **Learning Resources**
- **GitHub Actions**: [Official Documentation](https://docs.github.com/en/actions)
- **TypeScript**: [Handbook](https://www.typescriptlang.org/docs/)
- **Vite**: [Guide](https://vitejs.dev/guide/)
- **GitHub API**: [REST API Docs](https://docs.github.com/en/rest)

### 🛠️ **Development Tools**
- **Code Editor**: VS Code with recommended extensions
- **Browser DevTools**: For frontend debugging
- **GitHub CLI**: For repository management
- **Postman Collection**: Available in `/postman/` directory

---

## 🎉 **Release Process**

### 📋 Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### 🚀 Release Schedule
- **Patch releases**: As needed for critical bugs
- **Minor releases**: Monthly for new features
- **Major releases**: Quarterly for significant changes

### 📝 Changelog
All changes are documented in:
- **GitHub Releases** - [View all releases](https://github.com/Life-Experimentalist/ActionsCounter/releases)
- **GitHub Issues** - [Closed issues by milestone](https://github.com/Life-Experimentalist/ActionsCounter/issues?q=is%3Aissue+is%3Aclosed)
- **[Discussions](https://github.com/Life-Experimentalist/ActionsCounter/discussions/categories/announcements)** - Major announcements

---

## 🙏 **Thank You!**

### 🌟 **Current Contributors**
Special thanks to all our contributors:
- **[@VKrishna04](https://github.com/VKrishna04)** - Project Creator & Maintainer
- **[All Contributors](https://github.com/Life-Experimentalist/ActionsCounter/graphs/contributors)** - Everyone who has contributed

### 💝 **Your Impact**
Every contribution matters:
- **Bug reports** help us improve stability
- **Feature requests** guide our roadmap
- **Code contributions** make the project better
- **Documentation** helps users succeed

### 🚀 **Join Us**
Ready to contribute? Here's how to start:

1. **⭐ Star the repository** to show your support
2. **🍴 Fork the project** to your GitHub account
3. **📋 Pick an issue** from our [issue tracker](https://github.com/Life-Experimentalist/ActionsCounter/issues)
4. **💻 Make your contribution** following this guide
5. **🔄 Submit a pull request** when ready

**Together, we can make ActionsCounter even better!**

---

## 📞 **Contact**

- **Project Maintainer**: [@VKrishna04](https://github.com/VKrishna04)
- **Email**: [Submit through GitHub Issues](https://github.com/Life-Experimentalist/ActionsCounter/issues)
- **Website**: [VKrishna04.github.io](https://vkrishna04.github.io)

---

**Last Updated**: July 2025
**Contributing Guidelines Version**: 1.0
**Next Review**: August 2025
