# Claude MCP Integration Guide

## Overview
Integrate Claude directly into your MCP server to enable automatic code changes and deployments through a simple web interface.

## How It Would Work

1. **Web Interface**: Add a "Request Changes" button on your CMS
2. **Change Request**: Type what you want changed (e.g., "Update the chairman's bio to...")
3. **Claude Processing**: Claude receives the request, makes the changes
4. **Auto Deployment**: Changes are committed to git and deployed automatically

## Implementation Approach

### Option 1: Direct MCP Integration (Recommended)
```javascript
// Add to your MCP server (server.cjs)
app.post('/api/claude-request', authMiddleware, async (req, res) => {
  const { request, context } = req.body;
  
  // Send request to Claude API
  const claudeResponse = await processWithClaude(request, context);
  
  // Execute the suggested changes
  const result = await executeChanges(claudeResponse);
  
  // Commit and push if successful
  if (result.success) {
    await gitCommitAndPush(result.changes);
  }
  
  res.json(result);
});
```

### Option 2: Claude Desktop App with MCP
1. Install Claude Desktop app
2. Configure MCP server connection
3. Use Claude's built-in MCP tools to:
   - Read and edit files
   - Run git commands
   - Deploy changes

## Benefits

1. **Instant Updates**: Change content without touching code
2. **Natural Language**: Just describe what you want
3. **Version Control**: All changes tracked in git
4. **No Technical Skills**: Anyone can request changes
5. **Audit Trail**: Complete history of all modifications

## Example Workflow

1. **From CMS**: "Change the sugar production capacity from 8000 to 9000 TCD"
2. **Claude**: 
   - Finds relevant files
   - Updates the content
   - Commits with descriptive message
   - Pushes to GitHub
3. **Result**: Website updates automatically

## Security Considerations

1. **Authentication**: Require admin login for change requests
2. **Validation**: Claude validates changes before applying
3. **Rollback**: Easy to revert if issues arise
4. **Limits**: Set boundaries on what can be changed

## Quick Start Implementation

### Step 1: Add Request Interface
```jsx
// Add to SimpleCMS.jsx
const [changeRequest, setChangeRequest] = useState('');

const handleClaudeRequest = async () => {
  const response = await fetch(`${API_URL}/claude-request`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      request: changeRequest,
      context: 'website-content-update'
    })
  });
  
  const result = await response.json();
  toast({
    title: result.success ? 'Changes Applied!' : 'Request Failed',
    description: result.message
  });
};
```

### Step 2: Backend Handler
```javascript
// Add to server.cjs
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

app.post('/api/claude-request', authMiddleware, async (req, res) => {
  try {
    const { request } = req.body;
    
    // For now, return instructions
    // In full implementation, this would connect to Claude API
    res.json({
      success: true,
      message: 'Change request received',
      instructions: `To implement: "${request}"`,
      nextSteps: [
        '1. Claude analyzes the request',
        '2. Identifies files to change',
        '3. Makes the updates',
        '4. Commits and pushes to git',
        '5. Deployment triggered automatically'
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Use Cases

1. **Content Updates**: "Update the CSR section with new initiatives"
2. **Data Changes**: "Change ethanol capacity to 500 KLPD"
3. **Add Sections**: "Add a new sustainability page"
4. **Fix Typos**: "Fix spelling error in about section"
5. **Update Images**: "Replace chairman photo with new one"

## Future Enhancements

1. **Preview Mode**: See changes before applying
2. **Batch Changes**: Multiple updates at once
3. **Scheduled Updates**: Plan changes for future dates
4. **Approval Workflow**: Require approval for major changes
5. **AI Suggestions**: Claude suggests improvements

This integration would make your website truly dynamic and easy to maintain!