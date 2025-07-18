# Troubleshooting Guide

Common issues and solutions for ActionsCounter.

## 🚨 Setup Issues

### "Invalid password" Error

**Symptoms:**
- Workflow fails with "❌ Invalid password provided"
- Actions show authentication errors

**Solutions:**
1. **Check Repository Secret**:
   - Go to Settings → Secrets and variables → Actions
   - Verify `ADMIN_PASSWORD` secret exists and is correct
   - No extra spaces or special characters

2. **Password Requirements**:
   - Use strong passwords without quotes
   - Avoid special shell characters: `"`, `'`, `$`, `\`, `` ` ``
   - Recommended: Use alphanumeric + basic symbols

3. **Re-create Secret**:
   - Delete existing `ADMIN_PASSWORD` secret
   - Create new one with simple, strong password

### "Repository not found" Error

**Symptoms:**
- API calls return 404 errors
- Frontend can't fetch data
- Workflow dispatch fails

**Solutions:**
1. **Check Repository Configuration**:
   ```typescript
   // In frontend/src/main.ts
   const REPO_OWNER = "YOUR_ACTUAL_USERNAME";
   const REPO_NAME = "ActionsCounter";  // Exact repo name
   ```

2. **Verify GitHub Token**:
   - Token has `workflow` scope
   - Token has access to the repository
   - Token hasn't expired

3. **Repository Visibility**:
   - For private repos, ensure token has `repo` scope
   - For public repos, `workflow` scope is sufficient

### "Workflow not found" Error

**Symptoms:**
- 404 when trying to dispatch workflows
- Actions tab shows no workflows

**Solutions:**
1. **File Location**: Ensure workflow files are in `.github/workflows/`
2. **File Names**: Check exact names:
   - `handle-projects-dual.yml`
   - `handle-projects-database.yml`
3. **Push to Main**: Workflows must be on the main/default branch
4. **YAML Syntax**: Validate YAML syntax is correct

---

## 📊 Storage Mode Issues

### GitHub Variables Mode (STORAGE_MODE=1)

**"Variable not found" Error:**
```bash
# Check if STORAGE_MODE variable exists
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/actions/variables/STORAGE_MODE
```

**Solutions:**
1. Create `STORAGE_MODE` repository variable (not secret)
2. Set value to `1` for GitHub Variables mode
3. Ensure variable is public (not environment-specific)

**"48KB Limit Exceeded":**
- Switch to Database mode (STORAGE_MODE=2)
- Or clean up old project data

### Database Mode (STORAGE_MODE=2)

**"Database connection failed":**

**Check Database Secrets:**
```
DB_HOST     = your_postgres_host
DB_NAME     = your_database_name
DB_PORT     = 5432 (or your port)
DB_USER     = your_username
DB_PASS     = your_password
DB_SCHEMA   = myschema
```

**Test Connection:**
```bash
# Use the test script
./test-database.sh
# or PowerShell version
./test-database.ps1
```

**Common Database Issues:**
1. **Host unreachable**: Check firewall/network settings
2. **Authentication failed**: Verify username/password
3. **Database doesn't exist**: Create database first
4. **Schema issues**: Ensure schema exists or use default

### Repository Commits Mode (STORAGE_MODE=3)

**"Git operation failed":**
- Ensure `GITHUB_TOKEN` has `contents:write` permission
- Check repository isn't at storage limits
- Verify default branch is `main`

---

## 🌐 Frontend Issues

### Analytics Not Showing

**Symptoms:**
- Dashboard shows "No analytics available"
- Storage mode indicator shows "Unknown"

**Solutions:**
1. **Run Initial Action**:
   - Actions → Handle Projects (Dual Mode)
   - Action: `stats`
   - This generates initial analytics data

2. **Check GitHub Pages**:
   - Settings → Pages → Ensure enabled
   - Wait for deployment to complete
   - Visit your site URL

3. **Browser Cache**:
   - Hard refresh (Ctrl+F5 / Cmd+Shift+R)
   - Clear browser cache
   - Try incognito/private mode

### Configuration Notice Keeps Showing

**Solution:**
Clear localStorage and reconfigure:
```javascript
// In browser console
localStorage.clear();
location.reload();
```

### "Repository Variables Access" Error

**Symptoms:**
- Can't detect storage mode
- Frontend defaults to database mode

**Solutions:**
1. **Make Repository Public** (if acceptable)
2. **Or use GitHub Token** with proper scopes
3. **Check Variable Names**: Must be exact:
   - `STORAGE_MODE` (repository variable)
   - `ANALYTICS_DATA` (auto-generated)

---

## 🔧 API/Webhook Issues

### Webhook Not Triggering

**Check Workflow Dispatch URL:**
```bash
# Correct format:
https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/actions/workflows/handle-projects-dual.yml/dispatches
```

**Common Issues:**
1. **Wrong workflow name**: Must be exact filename
2. **Missing .yml extension**: Include `.yml` in URL
3. **Repository case**: Use exact case for username/repo

### Rate Limiting

**Symptoms:**
- HTTP 429 responses
- "API rate limit exceeded"

**Solutions:**
1. **Reduce frequency** of API calls
2. **Batch operations** when possible
3. **Use authenticated requests** (higher limits)
4. **Wait for reset** (check `X-RateLimit-Reset` header)

### Authentication Errors

**Token Scopes Required:**
- `workflow` - Trigger workflows
- `repo` - Access private repositories (if needed)
- `read:repo_variables` - Read repository variables

**Create New Token:**
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token with required scopes
3. Update `GITHUB_TOKEN` secret

---

## 🐛 Debug Strategies

### Enable Debug Logging

**In Workflows:**
Add debug steps:
```yaml
- name: Debug Information
  run: |
    echo "Storage Mode: ${{ steps.mode.outputs.mode }}"
    echo "Action: ${{ github.event.inputs.action }}"
    echo "Project: ${{ github.event.inputs.project_name }}"
```

### Check Workflow Logs

1. **Actions tab** → Select failed workflow
2. **Expand failing step** for detailed output
3. **Look for error messages** and stack traces

### Test Components Individually

**Test Storage Mode Detection:**
```bash
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/actions/variables/STORAGE_MODE
```

**Test Database Connection (if using database mode):**
```bash
# Run test script
./test-database.sh
```

**Test Simple Action:**
- Use `stats` action first (read-only)
- Then try `list` (also read-only)
- Finally try `increment` (write operation)

---

## 🆘 Getting Help

### Before Asking for Help

1. **Check this troubleshooting guide**
2. **Review setup documentation**
3. **Check GitHub Actions logs** for specific errors
4. **Try with a simple action** (`stats`) first

### Information to Include

When reporting issues, include:

1. **Storage mode** you're using (1, 2, or 3)
2. **Exact error message** from workflow logs
3. **Steps to reproduce** the issue
4. **Repository configuration** (public/private, etc.)
5. **Browser/environment** if frontend issue

### Support Channels

- **GitHub Issues**: [Report bugs](https://github.com/yourusername/ActionsCounter/issues)
- **GitHub Discussions**: [Ask questions](https://github.com/yourusername/ActionsCounter/discussions)
- **Documentation**: [Check docs](./Home.md)

---

## ✅ Success Checklist

When everything works correctly:

- ✅ Storage mode detected and displayed in frontend
- ✅ `stats` action returns analytics data
- ✅ `increment` action increases project counts
- ✅ Analytics update after operations
- ✅ GitHub Pages site loads correctly
- ✅ No authentication errors in workflows

**If all items check out, your ActionsCounter is working perfectly!**

---

**Last Updated**: July 2025
**Need more help?** Check the [complete documentation](./Home.md) or [open an issue](https://github.com/yourusername/ActionsCounter/issues).
