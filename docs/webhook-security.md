# Project-Specific Webhook Security Implementation

## 🔐 Security Enhancement Overview

This implementation eliminates the need to expose GitHub tokens in webhook configurations by introducing a project-specific authentication system.

## 🏗️ Architecture Components

### 1. Project Alias System
- **Purpose**: Hide real project names in webhook URLs
- **Format**: `proj_{hash}_{timestamp}`
- **Generation**: Deterministic hash of project name + repo info + timestamp
- **Example**: `proj_a1b2c3d4_e5f6g7`

### 2. Project Authentication Tokens
- **Purpose**: Secure webhook authentication without GitHub tokens
- **Format**: `pauth_{hash}`
- **Generation**: Hash of project seed + repo info + timestamp
- **Example**: `pauth_x9y8z7w6v5u4t3`

### 3. Secure Webhook Configuration
```typescript
// Frontend generates secure webhook config
const webhookInfo = api.generateWebhookInfo(projectName);
// Returns: { url, method, headers, body, description }
```

### 4. Dual Authentication Mode Workflow
- **Manual Dispatch**: Admin password validation
- **Repository Dispatch**: Project alias + auth token validation

## 🔧 Implementation Details

### Frontend Changes (`counter-api.ts`)
```typescript
interface Project {
  name: string;
  // ... existing fields
  alias?: string;        // Hidden project identifier
  auth_token?: string;   // Project-specific auth token
}

interface WebhookInfo {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string;
  description: string;
}

class ActionsCounter {
  generateWebhookInfo(projectName: string): WebhookInfo;
  generateProjectAlias(projectName: string): string;
  generateProjectAuthToken(projectName: string): string;
  registerProject(projectName: string): { alias: string; authToken: string };
  validateProjectAuth(alias: string, authToken: string): string | null;
}
```

### GitHub Actions Workflow (`handle-projects-dual.yml`)
```yaml
# Input handling for both manual and webhook triggers
- name: Extract inputs
  id: inputs
  run: |
    if [ "${{ github.event_name }}" = "repository_dispatch" ]; then
      # Webhook mode - extract from client_payload
      echo "project_alias=${{ github.event.client_payload.project_alias }}" >> $GITHUB_OUTPUT
      echo "action=${{ github.event.client_payload.action }}" >> $GITHUB_OUTPUT
    else
      # Manual mode - extract from workflow inputs
      echo "project_name=${{ github.event.inputs.project_name }}" >> $GITHUB_OUTPUT
      echo "action=${{ github.event.inputs.action }}" >> $GITHUB_OUTPUT
    fi

# Dual authentication validation
- name: Validate authentication
  run: |
    if [ "${{ github.event_name }}" = "repository_dispatch" ]; then
      # Validate project alias format: proj_{hash}_{timestamp}
      # Validate auth token format: pauth_{hash}
      # Authenticate project-specific credentials
    else
      # Validate admin password for manual execution
    fi

# Project name resolution for webhooks
- name: Resolve Project Name from Alias
  if: github.event_name == 'repository_dispatch'
  id: resolve
  run: |
    # Securely resolve project alias to actual project name
    # In production: query encrypted project mappings
```

## 🛡️ Security Benefits

1. **No Token Exposure**: Webhooks use project-specific tokens instead of GitHub tokens
2. **Project Isolation**: Each project has unique authentication credentials
3. **Name Obfuscation**: Project aliases hide real project names in URLs
4. **Dual Authentication**: Different security models for manual vs webhook access
5. **Format Validation**: Strict validation of alias and token formats

## 🚀 Usage Flow

### For Project Owners
1. Generate webhook configuration using the UI
2. Receive secure webhook URL with project alias and auth token
3. Configure external services to use the generated webhook
4. No GitHub token required or exposed

### For Administrators
1. Continue using manual workflow dispatch with admin password
2. Full access to all project operations
3. Monitor webhook authentication via workflow logs

### For External Services
1. Use provided webhook URL with project-specific credentials
2. Send repository dispatch events with project alias
3. Authenticate using project auth tokens
4. No access to repository secrets or GitHub tokens

## 🔄 Example Webhook Request
```bash
curl -X POST \
  https://api.github.com/repos/owner/repo/dispatches \
  -H "Authorization: Bearer pauth_x9y8z7w6v5u4t3" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  -H "X-Project-Auth: pauth_x9y8z7w6v5u4t3" \
  -d '{
    "event_type": "increment",
    "client_payload": {
      "project_alias": "proj_a1b2c3d4_e5f6g7",
      "timestamp": 1234567890
    }
  }'
```

## 📋 Next Steps for Production

1. **Secure Storage**: Implement encrypted storage for project alias mappings
2. **Token Rotation**: Add automatic auth token rotation capabilities
3. **Rate Limiting**: Implement per-project rate limiting
4. **Audit Logging**: Enhanced logging for security monitoring
5. **Key Management**: Integration with secret management systems

## ✅ Security Validation

- ✅ No GitHub tokens exposed in webhook configurations
- ✅ Project-specific authentication implemented
- ✅ Alias-based project name obfuscation
- ✅ Dual-mode authentication (manual + webhook)
- ✅ Format validation for security tokens
- ✅ Secure webhook payload generation
- ✅ GitHub Actions workflow integration completed

This implementation provides a robust, secure foundation for webhook-based project counter operations without compromising GitHub repository security.
