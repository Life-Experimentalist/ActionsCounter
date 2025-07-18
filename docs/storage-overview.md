# Storage Modes Overview

ActionsCounter supports three storage modes to fit different project needs and scales.

## 🔗 GitHub Variables Mode (STORAGE_MODE=1)

**Best for**: Small to medium projects, personal use, quick setup

### Features
- **Storage**: GitHub Repository Variables (48KB limit per variable)
- **Speed**: Very fast read/write operations
- **Setup**: Minimal configuration required
- **Cost**: Completely free
- **Commits**: No repository commits created
- **Scalability**: Good for 100-500 projects

### Pros
- ✅ Fastest setup (5 minutes)
- ✅ No external dependencies
- ✅ Built-in GitHub integration
- ✅ Free forever
- ✅ No repository spam

### Cons
- ❌ 48KB storage limit per variable
- ❌ Limited to GitHub ecosystem
- ❌ Can't handle extremely large datasets

### When to Use
- Personal project tracking
- Small team analytics
- Prototype/demo projects
- When you want zero external dependencies

---

## 🗄️ Database Mode (STORAGE_MODE=2)

**Best for**: Large projects, production use, high-volume tracking

### Features
- **Storage**: External PostgreSQL database
- **Speed**: Fast with unlimited scalability
- **Setup**: Medium complexity (requires database)
- **Cost**: Free tier available (filess.io, Supabase, etc.)
- **Commits**: No repository commits
- **Scalability**: Supports thousands of projects

### Pros
- ✅ Unlimited storage capacity
- ✅ Professional database features
- ✅ High performance at scale
- ✅ Advanced analytics possible
- ✅ Backup/restore capabilities

### Cons
- ❌ Requires database setup
- ❌ External dependency
- ❌ More complex configuration
- ❌ May have costs at high volume

### When to Use
- Production applications
- High-volume project tracking
- Team/organization use
- When you need advanced analytics
- Projects with 500+ tracked items

---

## 📁 Repository Commits Mode (STORAGE_MODE=3)

**Best for**: Demos, testing, audit trails, simple projects

### Features
- **Storage**: JSON files in repository with Git commits
- **Speed**: Slower (Git operations)
- **Setup**: Simple configuration
- **Cost**: Free (GitHub storage)
- **Commits**: Creates commits for each change
- **Scalability**: Limited (Git performance)

### Pros
- ✅ Full audit trail in Git history
- ✅ Simple to understand and debug
- ✅ No external dependencies
- ✅ Built-in versioning
- ✅ Easy backup (Git clone)

### Cons
- ❌ Creates repository commits (spam)
- ❌ Slower performance
- ❌ Limited scalability
- ❌ Clutters Git history

### When to Use
- Demo/educational projects
- When you need full audit trails
- Testing and development
- Simple personal tracking
- Projects where commit history is desired

---

## 📊 Comparison Table

| Feature                | GitHub Variables  | Database            | Repository Commits |
| ---------------------- | ----------------- | ------------------- | ------------------ |
| **Storage Limit**      | 48KB per variable | Unlimited           | Unlimited          |
| **Speed**              | Very Fast         | Fast                | Slow               |
| **Setup Time**         | 5 minutes         | 15-30 minutes       | 10 minutes         |
| **External Deps**      | None              | Database required   | None               |
| **Commits Created**    | No                | No                  | Yes                |
| **Cost**               | Free              | Free tier available | Free               |
| **Scalability**        | Medium            | High                | Low                |
| **Best Project Count** | 100-500           | 1000+               | 10-100             |
| **Backup**             | GitHub Variables  | Database backup     | Git history        |

## 🎯 Recommendations

### For Most Users: GitHub Variables Mode
- Start here for 90% of use cases
- Easy to set up and maintain
- Handles most project tracking needs
- Upgrade later if needed

### For Production: Database Mode
- Choose when GitHub Variables hit limits
- Better for team/organization use
- More professional and scalable
- Worth the extra setup for serious projects

### For Demos: Repository Commits Mode
- Good for showcasing the system
- Educational purposes
- When you want visible Git history
- Avoid for active production use

## 🔄 Migration Between Modes

You can switch storage modes anytime by changing the `STORAGE_MODE` variable:

1. Export your data using the `list` action in current mode
2. Change `STORAGE_MODE` variable value (1, 2, or 3)
3. Import data using `add` actions in new mode

**Note**: Data doesn't automatically migrate - you'll need to manually recreate projects in the new storage mode.

## 🛠️ Mode-Specific Setup Guides

- [GitHub Variables Setup](./storage-github-variables.md)
- [Database Mode Setup](./storage-database.md)
- [Repository Commits Setup](./storage-repository.md)

---

**Recommendation**: Start with **GitHub Variables Mode** (STORAGE_MODE=1) for fastest setup and best performance for most users.
