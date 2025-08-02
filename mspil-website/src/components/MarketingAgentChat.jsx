import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Image as ImageIcon, 
  Linkedin, 
  Newspaper,
  Calendar,
  Sparkles,
  X
} from 'lucide-react';
import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_AUTOMATION_SERVICE_URL || 'http://localhost:3001';

const MarketingAgentChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Initialize socket connection
      const newSocket = io(SOCKET_URL, {
        transports: ['websocket']
      });
      
      newSocket.on('connect', () => {
        console.log('Connected to marketing agent');
        newSocket.emit('join_chat');
      });
      
      newSocket.on('chat_joined', (data) => {
        setMessages([{
          id: Date.now(),
          type: 'agent',
          content: data.message,
          timestamp: new Date().toISOString()
        }]);
      });
      
      newSocket.on('agent_message', (data) => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: 'agent',
          content: data.message,
          timestamp: data.timestamp,
          actions: data.actions,
          attachments: data.attachments
        }]);
        setIsLoading(false);
      });
      
      setSocket(newSocket);
      
      return () => {
        newSocket.disconnect();
      };
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const messageToSend = inputMessage; // Store before clearing
    setInputMessage('');
    setIsLoading(true);
    
    try {
      console.log('Sending message to:', `${SOCKET_URL}/api/chat/message`);
      console.log('Message data:', { message: messageToSend, sessionId });
      
      const response = await fetch(`${SOCKET_URL}/api/chat/message`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          message: messageToSend,
          sessionId
        })
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const responseData = await response.json();
      console.log('Response data:', responseData);
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to send message');
      }
      
      // If we got a successful response but WebSocket didn't emit, add the message manually
      if (responseData.success && responseData.response) {
        setTimeout(() => {
          if (isLoading) {
            setMessages(prev => [...prev, {
              id: Date.now(),
              type: 'agent',
              content: responseData.response,
              timestamp: new Date().toISOString(),
              actions: responseData.actions,
              attachments: responseData.attachments
            }]);
            setIsLoading(false);
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        response: error.response
      });
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'agent',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      }]);
      setIsLoading(false);
    }
  };

  const renderMessage = (message) => {
    const isAgent = message.type === 'agent';
    
    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`flex ${isAgent ? 'justify-start' : 'justify-end'} mb-4`}
      >
        <div className={`flex items-start max-w-[80%] ${isAgent ? '' : 'flex-row-reverse'}`}>
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isAgent ? 'bg-primary/20 text-primary ml-2' : 'bg-blue-500/20 text-blue-500 mr-2'
          }`}>
            {isAgent ? <Bot size={16} /> : <User size={16} />}
          </div>
          
          <div>
            <div className={`rounded-lg p-3 ${
              isAgent 
                ? 'bg-gray-800/60 backdrop-blur-xl border border-white/40' 
                : 'bg-primary/20 backdrop-blur-xl border border-primary/40'
            }`}>
              <p className="text-white whitespace-pre-wrap">{message.content}</p>
              
              {message.attachments?.map((attachment, index) => (
                <div key={index} className="mt-2">
                  {attachment.type === 'image' && (
                    <img 
                      src={attachment.url} 
                      alt="Generated content" 
                      className="rounded-lg max-w-full"
                    />
                  )}
                </div>
              ))}
              
              {message.actions?.map((action, index) => (
                <div key={index} className="mt-2 flex items-center text-xs text-gray-400">
                  {action.type === 'linkedin_posted' && (
                    <>
                      <Linkedin size={14} className="mr-1" />
                      <span>Posted to LinkedIn</span>
                    </>
                  )}
                  {action.type === 'image_generated' && (
                    <>
                      <ImageIcon size={14} className="mr-1" />
                      <span>Image generated</span>
                    </>
                  )}
                  {action.type === 'news_fetched' && (
                    <>
                      <Newspaper size={14} className="mr-1" />
                      <span>{action.count} news items found</span>
                    </>
                  )}
                  {action.type === 'content_scheduled' && (
                    <>
                      <Calendar size={14} className="mr-1" />
                      <span>Scheduled for posting</span>
                    </>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-xs text-gray-500 mt-1">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const quickActions = [
    { icon: <Linkedin size={16} />, text: 'Post to LinkedIn', action: 'Create a LinkedIn post about ' },
    { icon: <Newspaper size={16} />, text: 'Post News', action: 'I want to post news about ' },
    { icon: <ImageIcon size={16} />, text: 'Generate Image', action: 'Generate an image of ' },
    { icon: <Calendar size={16} />, text: 'Check News', action: 'What are the latest industry news?' }
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed bottom-4 right-4 w-96 h-[600px] z-50"
    >
      <Card className="w-full h-full bg-gray-900/95 backdrop-blur-xl border border-white/40 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-white font-semibold">MSPIL Marketing Agent</h3>
              <p className="text-xs text-gray-400">AI-powered marketing assistant</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </Button>
        </div>
        
        {/* Messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
        >
          <AnimatePresence>
            {messages.map(renderMessage)}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start mb-4"
            >
              <div className="bg-gray-800/60 backdrop-blur-xl border border-white/40 rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Quick Actions */}
        <div className="px-4 py-2 border-t border-white/20">
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputMessage(action.action)}
                className="text-xs bg-gray-800/40 border-white/20 hover:bg-gray-700/40"
              >
                {action.icon}
                <span className="ml-1">{action.text}</span>
              </Button>
            ))}
          </div>
        </div>
        
        {/* Input */}
        <div className="p-4 border-t border-white/20">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me to post, generate images, or check news..."
              className="flex-1 bg-gray-800/40 border-white/20 text-white placeholder:text-gray-500"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon"
              disabled={!inputMessage.trim() || isLoading}
              className="bg-primary hover:bg-primary/80"
            >
              <Send size={18} />
            </Button>
          </form>
        </div>
      </Card>
    </motion.div>
  );
};

export default MarketingAgentChat;