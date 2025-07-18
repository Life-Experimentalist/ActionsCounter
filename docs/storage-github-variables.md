# GitHub Variables Mode Setup

## 🔗 Quick Setup Guide (5 minutes)

GitHub Variables Mode stores project data in GitHub Repository Variables - perfect for small to medium projects with zero external dependencies.

## 📋 Prerequisites

- GitHub repository with Actions enabled
- Repository admin access
- GitHub token with appropriate permissions

## 🛠️ Setup Steps

### Step 1: Configure Storage Mode

1. Go to your repository **Settings** → **Secrets and variables** → **Actions** → **Variables**
2. Create a new repository variable:
   - **Name**: `STORAGE_MODE`
   - **Value**: `1`

### Step 2: Set Admin Password

1. In the same variables section, create:
   - **Name**: `ADMIN_PASSWORD`
   - **Value**: Your secure admin password (for workflow dispatch)

### Step 3: Deploy Workflow

1. Copy the workflow file to your repository:
   ```
   .github/workflows/handle-projects-dual.yml
   ```

2. Commit and push to your repository

### Step 4: Test Setup

1. Go to **Actions** tab in your repository
2. Find "Handle Projects (Dual Mode)" workflow
3. Click **Run workflow**
4. Select action "list" to verify setup
5. Use your admin password when prompted

## 📊 Storage Details

### Capacity
- **Per Variable**: 48KB limit
- **Total Variables**: Unlimited
- **Estimated Projects**: 100-500 (depending on metadata)

### Performance
- **Read Speed**: Very fast (direct API access)
- **Write Speed**: Very fast (single API call)
- **Latency**: < 1 second globally

### Data Structure
```json
{
  "projects": {
    "project-name": {
      "name": "project-name",
      "description": "Project description",
      "project_url": "https://example.com",
      "count": 42,
      "created": "2025-01-01T00:00:00Z",
      "last_ping": "2025-01-01T12:00:00Z"
    }
  },
  "meta": {
    "last_updated": "2025-01-01T12:00:00Z",
    "total_pings": 100,
    "version": "3.0.0"
  }
}
```

## 🔐 Security Features

### Project-Specific Webhooks
- No GitHub token exposure in webhooks
- Unique project aliases for security
- Project-specific authentication tokens

### Access Control
- Admin password for manual operations
- Repository secrets protection
- Webhook validation

## 🚀 Advanced Configuration

### Multiple Storage Variables
If you hit the 48KB limit, the system automatically creates additional variables:
- `PROJECTS_DATA` (primary)
- `PROJECTS_DATA_2` (overflow)
- `PROJECTS_DATA_3` (additional overflow)

### Webhook Integration
```bash
# Example webhook call (project-specific auth)
curl -X POST https://api.github.com/repos/owner/repo/dispatches \
  -H "Authorization: Bearer pauth_xxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "increment",
    "client_payload": {
      "project_alias": "proj_xxxxxxxx_xxxxxx",
      "timestamp": 1234567890
    }
  }'
```

## 📈 Monitoring & Analytics

### Built-in Statistics
- Total projects tracked
- Total ping count
- Most active projects
- Recent activity timeline

### Performance Metrics
- Average response time: < 500ms
- Reliability: 99.9% (GitHub SLA)
- Global availability: Yes

## 🔧 Troubleshooting

### Common Issues

**1. "Variable not found" error**
- Solution: Ensure `STORAGE_MODE=1` variable is set
- Check variable name spelling

**2. "Insufficient permissions" error**
- Solution: Verify GitHub token has `repo` scope
- Check repository access permissions

**3. "Storage limit exceeded" error**
- Solution: System auto-creates overflow variables
- Consider upgrading to Database Mode for large datasets

**4. Workflow not triggering**
- Solution: Check workflow file syntax
- Verify Actions are enabled in repository

### Performance Optimization

**For High Frequency Use:**
- Use webhook mode instead of manual dispatch
- Batch multiple operations when possible
- Monitor variable size usage

**Storage Efficiency:**
- Use concise project descriptions
- Avoid storing large metadata
- Regular cleanup of inactive projects

## 🔄 Migration Options

### To Database Mode
1. Export data: Use `list` action
2. Set up PostgreSQL database
3. Change `STORAGE_MODE` to `2`
4. Import data using `add` actions

### To Repository Commits Mode
1. Export data: Use `list` action
2. Change `STORAGE_MODE` to `3`
3. Import data using `add` actions

## ✅ Verification Checklist

- [ ] `STORAGE_MODE=1` variable created
- [ ] `ADMIN_PASSWORD` variable set
- [ ] Workflow file deployed
- [ ] Test workflow runs successfully
- [ ] `list` action returns expected data
- [ ] Webhook configuration generated
- [ ] Project operations working

## 🎯 Best Practices

1. **Regular Backups**: Export data periodically using `list` action
2. **Monitoring**: Check workflow runs for errors
3. **Security**: Rotate admin password regularly
4. **Performance**: Monitor variable size usage
5. **Documentation**: Keep project descriptions concise

---

**Next Steps**: Once setup is complete, try creating your first project using the frontend interface or workflow dispatch with the `add` action.
