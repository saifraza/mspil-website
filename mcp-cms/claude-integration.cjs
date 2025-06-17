const fs = require('fs');
const path = require('path');

// Claude API integration for content management
class ClaudeContentManager {
  constructor() {
    this.apiKey = process.env.ANTHROPIC_API_KEY;
    this.projectRoot = path.join(__dirname, '..');
  }

  async makeContentChange(request, userContext = {}) {
    console.log('🧠 Claude processing request:', request);
    
    try {
      // Simulate Claude's decision making for now
      // In real implementation, this would call Claude API
      const changes = await this.analyzeRequest(request);
      
      const results = [];
      for (const change of changes) {
        const result = await this.executeChange(change);
        results.push(result);
      }
      
      return {
        success: true,
        message: `Applied ${results.length} change(s)`,
        changes: results,
        requestAnalysis: changes
      };
      
    } catch (error) {
      console.error('❌ Claude content change failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async analyzeRequest(request) {
    const requestLower = request.toLowerCase();
    const changes = [];
    
    // Pattern matching for common content changes
    if (requestLower.includes('update') && requestLower.includes('chairman') && requestLower.includes('bio')) {
      changes.push({
        type: 'content-update',
        file: 'src/locales/en.json',
        key: 'aboutFounderBio',
        action: 'extract-from-request',
        description: 'Update chairman bio'
      });
    }
    
    if (requestLower.includes('change') && requestLower.includes('capacity') && requestLower.includes('sugar')) {
      changes.push({
        type: 'content-update',
        file: 'src/locales/en.json',
        key: 'aboutSugarMillDesc',
        action: 'extract-capacity',
        description: 'Update sugar mill capacity'
      });
    }
    
    if (requestLower.includes('add') && requestLower.includes('director') || requestLower.includes('board member')) {
      changes.push({
        type: 'content-add',
        file: 'src/locales/en.json',
        section: 'leadership',
        action: 'add-board-member',
        description: 'Add new board member'
      });
    }

    if (requestLower.includes('update') && requestLower.includes('contact')) {
      changes.push({
        type: 'content-update',
        file: 'src/locales/en.json',
        section: 'contact',
        action: 'update-contact-info',
        description: 'Update contact information'
      });
    }
    
    // If no specific patterns match, try general content search
    if (changes.length === 0) {
      changes.push({
        type: 'general-search',
        action: 'search-and-suggest',
        description: 'Search for relevant content to update'
      });
    }
    
    return changes;
  }

  async executeChange(change) {
    switch (change.type) {
      case 'content-update':
        return await this.updateContent(change);
      case 'content-add':
        return await this.addContent(change);
      case 'general-search':
        return await this.searchContent(change);
      default:
        throw new Error(`Unknown change type: ${change.type}`);
    }
  }

  async updateContent(change) {
    const filePath = path.join(this.projectRoot, change.file);
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${change.file}`);
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    let data = JSON.parse(content);
    
    if (change.key && data[change.key]) {
      const oldValue = data[change.key];
      let newValue = oldValue;
      
      // Extract new content based on action type
      if (change.action === 'extract-from-request') {
        newValue = this.extractContentFromRequest(change.originalRequest, change.key);
      } else if (change.action === 'extract-capacity') {
        newValue = this.extractCapacityFromRequest(change.originalRequest, oldValue);
      }
      
      // Only update if we successfully extracted new content
      if (newValue && newValue !== oldValue) {
        data[change.key] = newValue;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        return {
          success: true,
          file: change.file,
          key: change.key,
          oldValue: oldValue,
          newValue: newValue,
          action: 'updated'
        };
      }
    }
    
    return {
      success: false,
      error: `Could not extract new content or key ${change.key} not found in ${change.file}`
    };
  }

  extractContentFromRequest(request, key) {
    const requestLower = request.toLowerCase();
    
    // Extract content for chairman bio updates
    if (key === 'aboutFounderBio') {
      // Look for patterns like "update chairman bio to [content]"
      const patterns = [
        /update.*chairman.*bio.*to[:\s]+(.+?)(?:\.|$)/i,
        /change.*chairman.*bio.*to[:\s]+(.+?)(?:\.|$)/i,
        /set.*chairman.*bio.*to[:\s]+(.+?)(?:\.|$)/i,
        /chairman.*bio[:\s]+(.+?)(?:\.|$)/i
      ];
      
      for (const pattern of patterns) {
        const match = request.match(pattern);
        if (match && match[1]) {
          return match[1].trim().replace(/['"]/g, '');
        }
      }
    }
    
    // Extract content for other bio updates
    if (key.includes('Bio')) {
      const patterns = [
        /update.*bio.*to[:\s]+(.+?)(?:\.|$)/i,
        /change.*bio.*to[:\s]+(.+?)(?:\.|$)/i,
        /bio[:\s]+(.+?)(?:\.|$)/i
      ];
      
      for (const pattern of patterns) {
        const match = request.match(pattern);
        if (match && match[1]) {
          return match[1].trim().replace(/['"]/g, '');
        }
      }
    }
    
    return null;
  }

  extractCapacityFromRequest(request, currentValue) {
    // Look for capacity numbers in the request
    const patterns = [
      /capacity.*to\s*(\d+)/i,
      /change.*capacity.*(\d+)/i,
      /(\d+)\s*tcd/i,
      /(\d+)\s*tons/i
    ];
    
    for (const pattern of patterns) {
      const match = request.match(pattern);
      if (match && match[1]) {
        const newCapacity = match[1];
        // Replace the capacity number in the current value
        return currentValue.replace(/\d+(\s*TCD|\s*tons)/i, `${newCapacity} TCD`);
      }
    }
    
    return null;
  }

  async addContent(change) {
    // Implementation for adding new content
    return {
      success: true,
      action: 'content-added',
      description: change.description
    };
  }

  async searchContent(change) {
    // Implementation for searching and suggesting changes
    const suggestions = [
      'Update company description',
      'Modify leadership bios',
      'Change capacity numbers',
      'Update contact information'
    ];
    
    return {
      success: true,
      action: 'suggestions-provided',
      suggestions: suggestions
    };
  }

  // Get available commands
  getAvailableCommands() {
    return [
      {
        command: 'update chairman bio to [new bio text]',
        description: 'Updates the chairman\'s biography'
      },
      {
        command: 'change sugar capacity to [number] TCD',
        description: 'Updates sugar mill capacity'
      },
      {
        command: 'add board member [name] as [title]',
        description: 'Adds a new board member'
      },
      {
        command: 'update contact email to [email]',
        description: 'Updates contact information'
      },
      {
        command: 'change [any content description]',
        description: 'General content modification'
      }
    ];
  }
}

module.exports = { ClaudeContentManager };