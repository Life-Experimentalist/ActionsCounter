# Configuration Guide

Complete configuration reference for ActionsCounter.

## 🔧 Repository Secrets

Configure these in **Settings → Secrets and variables → Actions → Secrets**.

### Required Secrets (All Modes)

#### `ADMIN_PASSWORD`
- **Purpose**: Authentication for all admin operations
- **Format**: Strong password string
- **Example**: `MySecurePassword123!`
- **Security**: Used to validate all write operations

#### `GITHUB_TOKEN`
- **Purpose**: GitHub API access for workflow operations
- **Format**: GitHub Personal Access Token
- **Scopes Required**: `workflow`, `repo` (if private)
- **Example**: `ghp_xxxxxxxxxxxxxxxxxxxx`

### Database Mode Secrets (STORAGE_MODE=2)

Only required when using Database storage mode:

#### `DB_HOST`
- **Purpose**: PostgreSQL server hostname
- **Format**: Hostname or IP address
- **Example**: `nejnc.h.filess.io`

#### `DB_NAME`
- **Purpose**: Database name
- **Format**: Database identifier
- **Example**: `ProjectCounter_fewercourt`

#### `DB_PORT`
- **Purpose**: Database port number
- **Format**: Port number
- **Example**: `5434` (PostgreSQL default: 5432)

#### `DB_USER`
- **Purpose**: Database username
- **Format**: Username string
- **Example**: `ProjectCounter_fewercourt`

#### `DB_PASS`
- **Purpose**: Database password
- **Format**: Password string
- **Example**: `3f3005ee97161745c7ac9c4620f6ac3f904d785a`

#### `DB_SCHEMA`
- **Purpose**: Database schema name
- **Format**: Schema identifier
- **Example**: `myschema`

---

## 📊 Repository Variables

Configure these in **Settings → Secrets and variables → Actions → Variables**.

### Storage Mode Configuration

#### `STORAGE_MODE`
- **Purpose**: Determines which storage backend to use
- **Format**: Number (1, 2, or 3)
- **Values**:
  - `1` = GitHub Variables mode
  - `2` = Database mode
  - `3` = Repository Commits mode
- **Default**: `1` (GitHub Variables)
- **Example**: `1`

### Auto-Generated Variables

These are created automatically by the system:

#### `ANALYTICS_DATA`
- **Purpose**: Stores system analytics as JSON
- **Format**: JSON string
- **Auto-created**: Yes
- **Example**: `{"total_projects":5,"total_count":150,...}`

#### `PROJECTS_DATA` (GitHub Variables Mode Only)
- **Purpose**: Stores project data for GitHub Variables mode
- **Format**: JSON string with project information
- **Auto-created**: Yes (when using mode 1)
- **Size Limit**: 48KB

---

## 🛠️ Frontend Configuration

### Required Changes

Edit `frontend/src/main.ts` and update:

```typescript
// Configuration - Update these values for your repository
const REPO_OWNER = "YOUR_GITHUB_USERNAME";  // ← Change this
const REPO_NAME = "ActionsCounter";          // ← Change if different
```

### Example Configuration

```typescript
// For user "johnsmith" with repository "my-project-tracker"
const REPO_OWNER = "johnsmith";
const REPO_NAME = "my-project-tracker";
```

---

## 🌐 GitHub Pages Setup

### Enable GitHub Pages

1. **Go to Repository Settings**
2. **Navigate to Pages** section
3. **Source**: Deploy from a branch
4. **Branch**: `main` / `master` (your default branch)
5. **Folder**: `/ (root)`
6. **Click Save**

### Custom Domain (Optional)

1. **Add CNAME file** to repository root:
   ```
   your-domain.com
   ```

2. **Configure DNS** with your domain provider:
   ```
   CNAME record: www → yourusername.github.io
   ```

3. **Enable in Settings**:
   - Pages → Custom domain → Enter your domain
   - Check "Enforce HTTPS"

---

## 🔒 Security Configuration

### GitHub Token Scopes

Your Personal Access Token needs these scopes:

#### For Public Repositories:
- `workflow` - Trigger GitHub Actions
- `repo:public_repo` - Access public repository data

#### For Private Repositories:
- `workflow` - Trigger GitHub Actions
- `repo` - Full repository access
- `read:repo_variables` - Read repository variables

### Token Security Best Practices

1. **Minimal Scopes**: Only grant required permissions
2. **Expiration**: Set reasonable expiration dates (90 days recommended)
3. **Rotation**: Regularly rotate tokens
4. **Monitoring**: Monitor token usage in GitHub settings

### Password Security

1. **Strong Passwords**: Use complex admin passwords
2. **Unique**: Don't reuse passwords from other services
3. **Special Characters**: Avoid shell-problematic characters: `"`, `'`, `$`, `\`
4. **Length**: Minimum 12 characters recommended

---

## 🗄️ Database Configuration

### Supported Databases

ActionsCounter supports any PostgreSQL-compatible database:

- **PostgreSQL 12+** (recommended)
- **AWS RDS PostgreSQL**
- **Google Cloud SQL PostgreSQL**
- **Azure Database for PostgreSQL**

### Free PostgreSQL Providers

#### filess.io (Recommended)
- **Free Tier**: 10MB storage
- **Connection**: Direct PostgreSQL protocol
- **Setup**: Instant, no credit card required
- **URL**: [filess.io](https://filess.io)

#### Supabase
- **Free Tier**: 500MB storage, 2 weeks inactivity limit
- **Connection**: Standard PostgreSQL
- **Setup**: Requires account creation
- **URL**: [supabase.com](https://supabase.com)

#### Neon
- **Free Tier**: 512MB storage
- **Connection**: PostgreSQL with connection pooling
- **Setup**: Quick signup process
- **URL**: [neon.tech](https://neon.tech)

### Database Schema

The system automatically creates this schema:

```sql
CREATE SCHEMA IF NOT EXISTS myschema;

CREATE TABLE IF NOT EXISTS myschema.projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  url TEXT,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Connection Testing

Use the provided test scripts:

```bash
# Linux/Mac
./test-database.sh

# Windows PowerShell
./test-database.ps1
```

---

## ⚙️ Advanced Configuration

### Workflow Customization

#### Custom Analytics
Modify analytics generation in `.github/workflows/handle-projects-dual.yml`:

```yaml
# Add custom metrics to analytics JSON
ANALYTICS=$(psql -h "${{ secrets.DB_HOST }}" ... -c "
  SELECT json_build_object(
    'total_projects', COUNT(*),
    'total_count', COALESCE(SUM(count), 0),
    'custom_metric', YOUR_CUSTOM_QUERY
  ) FROM ${{ secrets.DB_SCHEMA }}.projects;
")
```

#### Custom Actions
Add new action types by modifying the case statement:

```yaml
case "${{ github.event.inputs.action }}" in
  "increment"|"decrement"|"add"|...)
    # Existing actions
    ;;
  "your_custom_action")
    # Your custom logic here
    ;;
esac
```

### Environment-Specific Configuration

#### Development vs Production

Create separate repositories for different environments:

- `ActionsCounter-dev` (development)
- `ActionsCounter-staging` (staging)
- `ActionsCounter` (production)

Each with their own:
- Database credentials
- Storage modes
- Admin passwords

#### Multiple Storage Backends

You can run different modes simultaneously:

1. **Primary**: Database mode for production data
2. **Backup**: Repository commits mode for audit trail
3. **Testing**: GitHub Variables mode for development

---

## 🔧 Troubleshooting Configuration

### Validate Configuration

#### Check Secrets
```bash
# This should show your secrets (values hidden)
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/actions/secrets
```

#### Check Variables
```bash
# This should show STORAGE_MODE variable
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/actions/variables/STORAGE_MODE
```

#### Test Database Connection
```bash
# Use provided test script
./test-database.sh
```

### Common Configuration Errors

#### "Secret not found"
- Secret name is case-sensitive
- Check exact spelling: `ADMIN_PASSWORD`, not `admin_password`
- Verify secret exists in repository (not organization)

#### "Invalid credentials"
- Check database connection details
- Verify PostgreSQL service is running
- Test connection with database client

#### "Permission denied"
- GitHub token needs correct scopes
- For private repos, need `repo` scope
- For workflow dispatch, need `workflow` scope

---

## 📋 Configuration Checklist

### Basic Setup
- [ ] Repository forked/cloned
- [ ] `ADMIN_PASSWORD` secret set
- [ ] `GITHUB_TOKEN` secret set with correct scopes
- [ ] `STORAGE_MODE` variable set (1, 2, or 3)
- [ ] Frontend configured (`REPO_OWNER`, `REPO_NAME`)
- [ ] GitHub Pages enabled

### Database Mode (if using)
- [ ] Database created
- [ ] `DB_HOST` secret set
- [ ] `DB_NAME` secret set
- [ ] `DB_PORT` secret set
- [ ] `DB_USER` secret set
- [ ] `DB_PASS` secret set
- [ ] `DB_SCHEMA` secret set
- [ ] Database connection tested

### Verification
- [ ] `stats` action runs successfully
- [ ] Analytics appear in frontend
- [ ] Storage mode indicator shows correctly
- [ ] Webhook examples work
- [ ] GitHub Pages site loads

**When all items are checked, your ActionsCounter is fully configured!**

---

**Last Updated**: July 2025
**For more help**: See [Troubleshooting Guide](./troubleshooting.md)
