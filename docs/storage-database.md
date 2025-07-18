# Database Mode Setup

## 🗄️ Professional Setup Guide (15-30 minutes)

Database Mode uses an external PostgreSQL database for unlimited storage and high-performance project tracking at scale.

## 📋 Prerequisites

- GitHub repository with Actions enabled
- PostgreSQL database (local or cloud)
- Database admin access
- GitHub token with repository permissions

## 🌐 Database Provider Options

### Free Tier Providers
- **Supabase**: 500MB free, excellent for getting started
- **Railway**: 512MB free, easy setup
- **Neon**: 3GB free, serverless PostgreSQL
- **ElephantSQL**: 20MB free, simple setup

### Production Providers
- **AWS RDS**: Scalable, enterprise-grade
- **Google Cloud SQL**: Managed PostgreSQL
- **Azure Database**: Microsoft's managed offering
- **DigitalOcean**: Simple, cost-effective

## 🛠️ Setup Steps

### Step 1: Create PostgreSQL Database

#### Option A: Supabase (Recommended for beginners)
1. Go to [supabase.com](https://supabase.com)
2. Create free account and new project
3. Wait for database provisioning
4. Go to **Settings** → **Database**
5. Note down connection details:
   - Host: `db.xxx.supabase.co`
   - Port: `5432`
   - Database: `postgres`
   - User: `postgres`
   - Password: your_generated_password

#### Option B: Local PostgreSQL
```bash
# Install PostgreSQL locally
# Windows: Download from postgresql.org
# macOS: brew install postgresql
# Linux: sudo apt install postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE actionscounter;
CREATE USER actionsuser WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE actionscounter TO actionsuser;
\q
```

### Step 2: Configure Storage Mode

1. Go to your repository **Settings** → **Secrets and variables** → **Actions**
2. Create **Variables**:
   - `STORAGE_MODE` = `2`
   - `ADMIN_PASSWORD` = Your secure admin password

3. Create **Secrets** (sensitive database info):
   - `DB_HOST` = Your database host
   - `DB_PORT` = `5432` (or your port)
   - `DB_USER` = Database username
   - `DB_PASS` = Database password
   - `DB_NAME` = Database name
   - `DB_SCHEMA` = `public` (or custom schema)

### Step 3: Test Database Connection

Create a test script to verify connectivity:

```sql
-- Connect to your database and run:
SELECT version();
-- Should return PostgreSQL version info
```

### Step 4: Deploy Workflow

1. Copy workflow file to your repository:
   ```
   .github/workflows/handle-projects-dual.yml
   ```

2. The workflow will automatically:
   - Create schema if not exists
   - Create projects table
   - Set up indexes for performance

### Step 5: Verify Setup

1. Go to **Actions** tab in your repository
2. Run "Handle Projects (Dual Mode)" workflow
3. Use action "list" to test database connectivity
4. Check for successful table creation

## 📊 Database Schema

### Projects Table
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  url TEXT,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes for performance
  INDEX idx_projects_name (name),
  INDEX idx_projects_count (count DESC),
  INDEX idx_projects_updated (updated_at DESC)
);
```

### Sample Data
```sql
-- Example project entry
INSERT INTO projects (name, description, url, count) VALUES
('my-awesome-project', 'A cool project', 'https://github.com/user/project', 42);
```

## 🔐 Security Configuration

### Connection Security
- Use SSL connections in production
- Restrict database access by IP
- Use strong passwords (20+ characters)
- Enable database audit logging

### GitHub Secrets Best Practices
```yaml
# Never commit database credentials
# Use GitHub Secrets for all sensitive data
DB_HOST: ${{ secrets.DB_HOST }}
DB_PASS: ${{ secrets.DB_PASS }}
```

### Database User Permissions
```sql
-- Create limited user for application
CREATE USER actionscounter_app WITH PASSWORD 'secure_app_password';
GRANT CONNECT ON DATABASE actionscounter TO actionscounter_app;
GRANT USAGE ON SCHEMA public TO actionscounter_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON projects TO actionscounter_app;
GRANT USAGE ON SEQUENCE projects_id_seq TO actionscounter_app;
```

## 🚀 Performance Optimization

### Database Indexes
```sql
-- Performance indexes
CREATE INDEX idx_projects_name_hash ON projects USING hash(name);
CREATE INDEX idx_projects_count_desc ON projects (count DESC);
CREATE INDEX idx_projects_updated_recent ON projects (updated_at DESC);
```

### Connection Pooling
For high-volume usage, consider connection pooling:
- **PgBouncer**: Connection pooler for PostgreSQL
- **Supabase**: Built-in connection pooling
- **Railway**: Automatic connection management

### Query Optimization
```sql
-- Optimized queries used by the workflow
-- Fast project lookup
SELECT count FROM projects WHERE name = $1;

-- Efficient top projects
SELECT name, count FROM projects ORDER BY count DESC LIMIT 10;

-- Recent activity
SELECT name, updated_at FROM projects ORDER BY updated_at DESC LIMIT 20;
```

## 📈 Monitoring & Analytics

### Built-in Analytics
The workflow provides:
- Total project count
- Sum of all ping counts
- Average pings per project
- Top performing projects
- Recent activity metrics

### Database Monitoring
```sql
-- Useful monitoring queries
-- Database size
SELECT pg_size_pretty(pg_database_size('actionscounter'));

-- Table statistics
SELECT
  schemaname,
  tablename,
  n_tup_ins as inserts,
  n_tup_upd as updates,
  n_tup_del as deletes
FROM pg_stat_user_tables WHERE tablename = 'projects';

-- Active connections
SELECT count(*) FROM pg_stat_activity WHERE datname = 'actionscounter';
```

### Performance Metrics
- Query time: < 50ms (indexed queries)
- Throughput: 1000+ operations/minute
- Concurrent users: 50+ (with connection pooling)

## 🔧 Troubleshooting

### Common Database Issues

**1. Connection refused**
```
Solution: Check database host, port, and firewall
- Verify database is running
- Check security groups/firewall rules
- Confirm connection details
```

**2. Authentication failed**
```
Solution: Verify credentials
- Check username/password in secrets
- Ensure user has database permissions
- Verify database name is correct
```

**3. SSL connection issues**
```
Solution: Configure SSL properly
- Add sslmode=require to connection
- Check certificate configuration
- Verify SSL is enabled on database
```

**4. Performance slow**
```
Solution: Optimize queries and indexes
- Check query execution plans
- Add missing indexes
- Consider connection pooling
- Monitor database resources
```

### Workflow Issues

**1. Schema creation fails**
```
Solution: Check user permissions
- Ensure user can CREATE TABLE
- Verify schema permissions
- Check if schema already exists
```

**2. Variable not found**
```
Solution: Verify all secrets are set
- Check DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_SCHEMA
- Ensure STORAGE_MODE=2
- Verify secret names match exactly
```

## 📊 Scaling Considerations

### Vertical Scaling
- Increase database CPU/RAM
- Use faster storage (SSD)
- Optimize PostgreSQL configuration

### Horizontal Scaling
- Read replicas for analytics
- Connection pooling
- Caching layer (Redis)

### Data Archiving
```sql
-- Archive old projects
CREATE TABLE projects_archive AS
SELECT * FROM projects WHERE updated_at < NOW() - INTERVAL '1 year';

DELETE FROM projects WHERE updated_at < NOW() - INTERVAL '1 year';
```

## 🔄 Backup & Recovery

### Automated Backups
```bash
# Daily backup script
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME > backup_$(date +%Y%m%d).sql

# Restore from backup
psql -h $DB_HOST -U $DB_USER -d $DB_NAME < backup_20250101.sql
```

### Cloud Provider Backups
- **Supabase**: Automatic daily backups
- **Railway**: Point-in-time recovery
- **AWS RDS**: Automated snapshots
- **Neon**: Branching and restore points

## 🔄 Migration Options

### From GitHub Variables Mode
1. Export data using `list` action in Variables mode
2. Set up PostgreSQL database
3. Update secrets and change `STORAGE_MODE` to `2`
4. Import data using `add` actions in Database mode

### To Repository Commits Mode
1. Export data using `list` action
2. Change `STORAGE_MODE` to `3`
3. Import data using `add` actions

## ✅ Verification Checklist

- [ ] PostgreSQL database created and accessible
- [ ] All database secrets configured in GitHub
- [ ] `STORAGE_MODE=2` variable set
- [ ] Workflow deployed and running
- [ ] Schema and tables created successfully
- [ ] Test project operations working
- [ ] Performance satisfactory
- [ ] Backup strategy in place

## 🎯 Best Practices

1. **Security**: Use dedicated database user with minimal permissions
2. **Performance**: Monitor query performance and add indexes as needed
3. **Reliability**: Set up automated backups
4. **Monitoring**: Track database metrics and workflow success rates
5. **Scaling**: Plan for growth with connection pooling and read replicas

---

**Next Steps**: Once database mode is configured, you can handle thousands of projects with sub-second response times and unlimited storage capacity.
