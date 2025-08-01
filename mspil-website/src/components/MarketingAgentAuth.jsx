import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Lock, AlertCircle } from 'lucide-react';

const MarketingAgentAuth = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple password check (in production, this should be validated server-side)
    if (password === '1234') {
      // Store auth status in sessionStorage
      sessionStorage.setItem('mspil_agent_auth', 'true');
      onAuthenticated();
    } else {
      setError('Invalid password. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <Card className="w-full max-w-md bg-gray-900/95 backdrop-blur-xl border border-white/40 p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Marketing Agent Access</h2>
          <p className="text-gray-400">Enter password to access the AI Marketing Agent</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="bg-gray-800/40 border-white/20 text-white placeholder:text-gray-500"
              autoFocus
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading || !password}
          >
            {isLoading ? 'Verifying...' : 'Access Marketing Agent'}
          </Button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          This feature is restricted to authorized MSPIL personnel only
        </p>
      </Card>
    </motion.div>
  );
};

export default MarketingAgentAuth;