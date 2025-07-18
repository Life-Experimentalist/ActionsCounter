# API Reference

Complete reference for ActionsCounter API operations and webhook integration.

## 🎯 Available Actions

All actions require admin password authentication via the `password` parameter.

### Core Operations

#### `increment`
Increase project count by 1.

**Parameters:**
- `project_name` (required): Name of the project to increment
- `password` (required): Admin password

**Example:**
```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/actions/workflows/handle-projects-dual.yml/dispatches \
  -d '{
    "ref": "main",
    "inputs": {
      "action": "increment",
      "project_name": "my-awesome-project",
      "password": "your_admin_password"
    }
  }'
```

#### `decrement`
Decrease project count by 1 (minimum 0).

**Parameters:**
- `project_name` (required): Name of the project to decrement
- `password` (required): Admin password

#### `add`
Create a new project.

**Parameters:**
- `project_name` (required): Name of the new project
- `project_description` (optional): Project description
- `project_url` (optional): Project URL
- `password` (required): Admin password

#### `remove`
Delete a project completely.

**Parameters:**
- `project_name` (required): Name of the project to remove
- `password` (required): Admin password

#### `get`
Retrieve details for a specific project.

**Parameters:**
- `project_name` (required): Name of the project to retrieve
- `password` (required): Admin password

#### `set`
Set project count to a specific value.

**Parameters:**
- `project_name` (required): Name of the project
- `count_value` (required): New count value (number)
- `password` (required): Admin password

### Analytics Operations

#### `list`
Show all projects and their counts.

**Parameters:**
- `password` (required): Admin password

**Returns:** All projects with names, counts, and metadata

#### `stats`
Display system analytics and statistics.

**Parameters:**
- `password` (required): Admin password

**Returns:** System-wide statistics including total projects, counts, averages, etc.

## 🔗 Webhook Integration

### 🔒 Secure Repository Dispatch (Recommended)

**POST** `https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/dispatches`

✅ **Security**: No admin password in request body - uses repository secrets automatically.

**Required Headers:**
```bash
-H "Authorization: token YOUR_GITHUB_TOKEN"
-H "Accept: application/vnd.github.v3+json"
-H "Content-Type: application/json"
```

### Webhook Examples

#### Increment Project Count
```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/dispatches \
  -d '{
    "event_type": "increment",
    "client_payload": {
      "project_name": "my-awesome-project"
    }
  }'
```

#### JavaScript Example
```javascript
// Secure webhook - no password in request body
const incrementProject = async (projectName) => {
  const response = await fetch('https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/dispatches', {
    method: 'POST',
    headers: {
      'Authorization': 'token YOUR_GITHUB_TOKEN',
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      event_type: 'increment',
      client_payload: {
        project_name: projectName
      }
    })
  });

  return response.status_code === 204;
};
```

#### Python Example
```python
import requests

def increment_project(project_name, github_token):
    """Secure increment - admin password from repository secrets"""
    url = "https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/dispatches"

    headers = {
        "Authorization": f"token {github_token}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
    }

    data = {
        "event_type": "increment",
        "client_payload": {
            "project_name": project_name
        }
    }

    response = requests.post(url, headers=headers, json=data)
    return response.status_code == 204
```

### ⚠️ Legacy Workflow Dispatch (Less Secure)

**POST** `https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/actions/workflows/handle-projects-dual.yml/dispatches`

⚠️ **Security Warning**: Requires admin password in request body (less secure).

#### Legacy Example (Not Recommended)
```javascript
// Legacy method - requires admin password in request
const response = await fetch('https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/actions/workflows/handle-projects-dual.yml/dispatches', {
    method: 'POST',
    headers: {
      'Authorization': 'token YOUR_GITHUB_TOKEN',
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ref: 'main',
      inputs: {
        action: 'increment',
        project_name: projectName,
        password: 'your_admin_password'  // ⚠️ Security risk
      }
    })
  });
```

#### PHP Example
```php
<?php
function incrementProject($projectName, $githubToken, $adminPassword) {
    $url = "https://api.github.com/repos/YOUR_USERNAME/ActionsCounter/actions/workflows/handle-projects-dual.yml/dispatches";

    $data = [
        "ref" => "main",
        "inputs" => [
            "action" => "increment",
            "project_name" => $projectName,
            "password" => $adminPassword
        ]
    ];

    $options = [
        "http" => [
            "header" => [
                "Authorization: token " . $githubToken,
                "Accept: application/vnd.github.v3+json",
                "Content-Type: application/json"
            ],
            "method" => "POST",
            "content" => json_encode($data)
        ]
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    return $result !== false;
}
?>
```

## 📊 Response Formats

### Success Response
HTTP Status: `204 No Content` (for workflow dispatch)

### Error Responses
- `401 Unauthorized`: Invalid GitHub token
- `404 Not Found`: Repository or workflow not found
- `422 Unprocessable Entity`: Invalid parameters

### Analytics Data Format
Analytics are stored in GitHub Variables as JSON:

```json
{
  "total_projects": 25,
  "total_count": 150,
  "average_count": 6.0,
  "max_count": 45,
  "min_count": 0,
  "last_updated": "2025-07-18T10:30:00.000Z",
  "storage_mode": "github_variables"
}
```

## 🔒 Security Considerations

### Authentication Layers
1. **GitHub Token**: Repository access control
2. **Admin Password**: Action execution control
3. **Repository Secrets**: Secure storage of credentials

### Best Practices
- Use repository secrets for all sensitive data
- Rotate admin passwords regularly
- Use minimal scope GitHub tokens
- Monitor workflow execution logs
- Implement rate limiting in external integrations

### Token Scopes Required
Your GitHub Personal Access Token needs:
- `workflow` - To trigger GitHub Actions
- `repo` - To access repository data (if private)

## 🚀 Integration Examples

### Website Analytics
Track page views by incrementing project counts:

```html
<script>
// Track page visit
fetch('/api/track-visit', {
  method: 'POST',
  body: JSON.stringify({ page: window.location.pathname })
});
</script>
```

### Download Tracking
Monitor software downloads:

```bash
# In your download endpoint
curl -X POST ... -d '{
  "inputs": {
    "action": "increment",
    "project_name": "software-download-v1.2.3"
  }
}'
```

### API Usage Monitoring
Track API endpoint usage:

```javascript
// Middleware to track API calls
app.use('/api/*', (req, res, next) => {
  // Track API usage
  trackUsage(req.path);
  next();
});
```

## 📈 Rate Limits

### GitHub API Limits
- **Authenticated**: 5,000 requests per hour
- **Workflow Dispatches**: No specific limit (within general API limits)

### Recommended Patterns
- Batch operations when possible
- Cache results for read-heavy operations
- Use database mode for high-frequency tracking

## 🛠️ Error Handling

### Common Errors

**"Invalid password"**
```bash
# Check your admin password in repository secrets
```

**"Repository not found"**
```bash
# Verify token permissions and repository access
```

**"Workflow not found"**
```bash
# Ensure workflow files are pushed to main branch
```

### Debugging Tips
1. Check GitHub Actions logs for detailed error messages
2. Verify all required secrets are set
3. Test with simple actions (`stats`) first
4. Confirm repository and workflow names are correct

---

**API Version**: 3.0.0
**Last Updated**: July 2025
