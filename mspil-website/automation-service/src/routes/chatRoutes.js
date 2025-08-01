import express from 'express';
import { processUserMessage } from '../services/aiAgentService.js';
import { validateChatMessage } from '../utils/validation.js';
import { logger } from '../server.js';

const router = express.Router();

export default function chatRoutes(io) {
  // Process chat message
  router.post('/message', async (req, res) => {
    try {
      logger.info('Received chat message request:', { 
        body: req.body,
        headers: req.headers,
        method: req.method,
        url: req.url
      });
      
      const { error, value } = validateChatMessage(req.body);
      if (error) {
        logger.error('Validation error:', { 
          error: error.details[0].message,
          body: req.body 
        });
        return res.status(400).json({ error: error.details[0].message });
      }
      
      const { message, sessionId } = value;
      logger.info('Message validated successfully:', { message, sessionId });
      
      // Emit user message to WebSocket
      io.to('marketing_chat').emit('user_message', {
        message,
        timestamp: new Date().toISOString(),
        type: 'user'
      });
      
      logger.info('About to process message with AI agent...');
      
      // Process message with AI agent
      const response = await processUserMessage(message, sessionId);
      
      logger.info('AI agent response received:', {
        hasResponse: !!response,
        responseMessage: response?.message?.substring(0, 50) + '...',
        hasActions: response?.actions?.length > 0,
        hasAttachments: response?.attachments?.length > 0
      });
      
      // Don't save to database if it's not available
      // This allows the chat to work without database
      
      // Emit AI response to WebSocket
      io.to('marketing_chat').emit('agent_message', {
        message: response.message,
        timestamp: new Date().toISOString(),
        type: 'agent',
        actions: response.actions,
        attachments: response.attachments
      });
      
      const jsonResponse = {
        success: true,
        response: response.message,
        actions: response.actions,
        attachments: response.attachments
      };
      
      logger.info('Sending response to client:', { 
        success: jsonResponse.success,
        responseLength: jsonResponse.response?.length 
      });
      
      res.json(jsonResponse);
      
    } catch (error) {
      logger.error('Chat route error:', {
        message: error.message,
        stack: error.stack,
        type: error.constructor.name
      });
      res.status(500).json({ error: 'Failed to process message' });
    }
  });
  
  // Get chat history
  router.get('/history/:sessionId', async (req, res) => {
    try {
      const { sessionId } = req.params;
      const limit = parseInt(req.query.limit) || 50;
      
      // TODO: Implement database query for chat history
      const history = [];
      
      res.json({ history });
    } catch (error) {
      logger.error('History fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch history' });
    }
  });
  
  // Get available commands
  router.get('/commands', (req, res) => {
    const commands = [
      {
        command: 'post to linkedin',
        description: 'Create and post content to LinkedIn',
        examples: [
          'Post about our new ethanol production milestone to LinkedIn',
          'Share our sustainability report on LinkedIn with an image'
        ]
      },
      {
        command: 'generate image',
        description: 'Generate AI images for marketing content',
        examples: [
          'Generate an image of our sugar factory at sunset',
          'Create an infographic showing our production statistics'
        ]
      },
      {
        command: 'check news',
        description: 'Get latest industry news and updates',
        examples: [
          'What are the latest sugar industry news?',
          'Check ChiniMandi for ethanol market updates'
        ]
      },
      {
        command: 'schedule post',
        description: 'Schedule content for future posting',
        examples: [
          'Schedule a LinkedIn post for tomorrow at 10 AM',
          'Plan weekly content for next week'
        ]
      },
      {
        command: 'analyze performance',
        description: 'Get analytics and performance metrics',
        examples: [
          'How did our last LinkedIn post perform?',
          'Show me engagement metrics for this month'
        ]
      }
    ];
    
    res.json({ commands });
  });
  
  return router;
}