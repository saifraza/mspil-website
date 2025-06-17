import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, LogOut, Check, X, Download, ImageOff, GitBranch, Bot, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://mspil-mcp-production.up.railway.app/api' 
  : 'http://localhost:3002/api';

console.log('CMS API URL:', API_URL, 'Environment:', process.env.NODE_ENV);

const SimpleCMS = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('cms_token'));
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [files, setFiles] = useState([]);
  const [comment, setComment] = useState('');
  const [summary, setSummary] = useState('');
  const [uploading, setUploading] = useState(false);
  const [recentUploads, setRecentUploads] = useState([]);
  const [showPlacementSuggestions, setShowPlacementSuggestions] = useState(false);
  const [placementSuggestions, setPlacementSuggestions] = useState([]);
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [allFiles, setAllFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [aiProgress, setAiProgress] = useState(0);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [claudeRequest, setClaudeRequest] = useState('');
  const [claudeProcessing, setClaudeProcessing] = useState(false);
  const [claudeCommands, setClaudeCommands] = useState([]);
  const { toast } = useToast();

  // Helper function to get category path
  const getCategoryPath = (category) => {
    const categoryPaths = {
      'media-images': 'images/media',
      'news-images': 'images/news_media',
      'timeline-images': 'images/about-us',
      'office-images': 'images/office',
      'infrastructure-images': 'images/infrastructure',
      'leadership-images': 'images/leadership',
      'saif-raza-image': 'images/leadership',
      'nawab-raza-image': 'images/leadership',
      'career-images': 'images/careers',
      'about-images': 'images/about',
      'csr-education-images': 'images/csr/education',
      'csr-healthcare-images': 'images/csr/healthcare',
      'csr-rural-images': 'images/csr/rural-development',
      'sugar-data': 'documents/sugar-data',
      'ethanol-data': 'documents/ethanol-data',
      'power-data': 'documents/power-data',
      'feed-data': 'documents/feed-data',
      'annual-reports': 'documents/investor-relations/annual-reports',
      'quarterly-results': 'documents/investor-relations/quarterly-results',
      'presentations': 'documents/investor-relations/presentations',
      'policies': 'documents/investor-relations/policies',
      'csr-reports': 'documents/csr',
      'general-documents': 'documents/general'
    };
    return categoryPaths[category] || categoryPaths['general-documents'];
  };

  useEffect(() => {
    if (token) {
      // Verify token is still valid
      verifyTokenAndFetchContent();
      // Load Claude commands
      fetchClaudeCommands();
    }
  }, [token]);

  const fetchClaudeCommands = async () => {
    try {
      const response = await fetch(`${API_URL}/claude/commands`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setClaudeCommands(data.commands || []);
      }
    } catch (error) {
      console.error('Failed to fetch Claude commands:', error);
    }
  };

  const handleClaudeRequest = async () => {
    if (!claudeRequest.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a content change request',
        variant: 'destructive'
      });
      return;
    }

    setClaudeProcessing(true);
    
    try {
      const response = await fetch(`${API_URL}/claude/change-content`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          request: claudeRequest,
          context: {
            timestamp: new Date().toISOString()
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: '🧠 Claude Applied Changes',
          description: result.message,
          duration: 5000
        });
        
        // Show detailed results
        if (result.changes && result.changes.length > 0) {
          const changeDetails = result.changes.map(change => 
            `✅ ${change.description || change.action}`
          ).join('\n');
          
          setTimeout(() => {
            alert(`Changes Applied:\n\n${changeDetails}\n\nThe website will need to be rebuilt to see changes.`);
          }, 1000);
        }
        
        setClaudeRequest('');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: 'Claude Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setClaudeProcessing(false);
    }
  };

  const verifyTokenAndFetchContent = async () => {
    try {
      setIsLoadingContent(true);
      console.log('Fetching content from server...');
      const response = await fetch(`${API_URL}/content`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Fetched ${data.length} files from server`);
        
        // Update both recent uploads and all files
        if (Array.isArray(data)) {
          // Sort by upload date and get most recent
          const sortedData = [...data].sort((a, b) => 
            new Date(b.uploadedAt) - new Date(a.uploadedAt)
          );
          
          setRecentUploads(sortedData.slice(0, 5)); // Show last 5 uploads
          setAllFiles(data); // Store all files for browser
          console.log(`Updated UI with ${sortedData.slice(0, 5).length} recent uploads`);
        }
        setIsLoggedIn(true);
        return true; // Success
      } else if (response.status === 401) {
        // Token is invalid or expired
        handleTokenExpired();
        return false;
      } else {
        console.error('Failed to fetch content:', response.status);
        throw new Error(`Failed to fetch content: ${response.status}`);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      // Don't log out on network errors, just throw
      if (error.message && !error.message.includes('401')) {
        throw error;
      }
      handleTokenExpired();
      return false;
    } finally {
      setIsLoadingContent(false);
    }
  };

  const handleTokenExpired = () => {
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('cms_token');
    toast({
      title: 'Session Expired',
      description: 'Please log in again',
      variant: 'destructive'
    });
  };

  const handleDownload = async (filename, category) => {
    try {
      const response = await fetch(`${API_URL}/download/${category}/${filename}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Create blob and download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        toast({
          title: 'Download Started',
          description: `Downloading ${filename}`,
        });
      } else if (response.status === 401) {
        handleTokenExpired();
      } else {
        const errorData = await response.json();
        toast({
          title: 'Download Failed',
          description: errorData.error || 'Failed to download file',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Download Error',
        description: 'Connection error during download',
        variant: 'destructive'
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      
      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        setIsLoggedIn(true);
        localStorage.setItem('cms_token', data.token);
        toast({
          title: 'Success',
          description: 'Logged in successfully'
        });
        
        // Fetch content after successful login
        setTimeout(() => {
          verifyTokenAndFetchContent().catch(error => {
            console.error('Failed to fetch content after login:', error);
          });
        }, 100);
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Login failed',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Connection error',
        variant: 'destructive'
      });
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('cms_token');
    setUsername('');
    setPassword('');
  };

  const handleFileChange = async (e) => {
    try {
      const selectedFiles = Array.from(e.target.files);
      console.log('Files selected:', selectedFiles.length);
      
      if (selectedFiles.length > 0) {
        setFiles(selectedFiles);
        
        // Reset suggestions when new files are selected
        setShowPlacementSuggestions(false);
        setPlacementSuggestions([]);
        setSelectedPlacement(null);
        
        // Automatically get AI suggestions after file selection
        setTimeout(() => {
          getPlacementSuggestionsForFiles(selectedFiles);
        }, 500); // Small delay to allow UI to update
      }
    } catch (error) {
      console.error('Error in handleFileChange:', error);
      toast({
        title: 'Error',
        description: 'Error selecting files',
        variant: 'destructive'
      });
    }
  };

  const getPlacementSuggestionsForFiles = async (fileList) => {
    try {
      console.log('Getting suggestions for files:', fileList.length);
      const file = fileList[0]; // Use first file for suggestions
      console.log('File details:', file.name, file.type);
      
      const response = await fetch(`${API_URL}/placement-suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          filename: file.name,
          comment: comment,
          fileType: file.type
        })
      });

      console.log('Suggestions response status:', response.status);
      const data = await response.json();
      console.log('Suggestions data:', data);

      if (response.ok) {
        // Server returns suggestions directly as an array
        const suggestions = Array.isArray(data) ? data : data.suggestions || [];
        console.log('Processed suggestions:', suggestions);
        
        setPlacementSuggestions(suggestions);
        setShowPlacementSuggestions(true);
        
        // Auto-select the top recommendation if confidence is high
        if (suggestions.length > 0 && suggestions[0].confidence > 80) {
          setSelectedPlacement(suggestions[0]);
        }
      } else {
        console.error('Suggestions API error:', data);
      }
    } catch (error) {
      console.error('Auto-suggestions failed:', error);
      // Don't show error toast for auto-suggestions, just log it
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getPlacementSuggestions = async () => {
    if (files.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select files first',
        variant: 'destructive'
      });
      return;
    }

    try {
      // Get suggestions for the first file (or batch if multiple)
      const file = files[0];
      const response = await fetch(`${API_URL}/placement-suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          filename: file.name,
          comment: comment,
          fileType: file.type
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Server returns suggestions directly as an array
        const suggestions = Array.isArray(data) ? data : data.suggestions || [];
        setPlacementSuggestions(suggestions);
        setShowPlacementSuggestions(true);
      } else if (response.status === 401) {
        handleTokenExpired();
        return;
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to get suggestions',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Connection error getting suggestions',
        variant: 'destructive'
      });
    }
  };

  const selectPlacement = (suggestion) => {
    setSelectedPlacement(suggestion);
  };

  const confirmAndUpload = async () => {
    if (!selectedPlacement) {
      toast({
        title: 'Error',
        description: 'Please select a placement location',
        variant: 'destructive'
      });
      return;
    }

    // Add the selected placement to the comment for better categorization
    const enhancedComment = `${comment} [AI Placement: ${selectedPlacement.title}]`;
    
    // Proceed with normal upload but with enhanced comment
    await handleUploadWithPlacement(enhancedComment, selectedPlacement.id);
  };

  const handleUploadWithPlacement = async (enhancedComment, placementId) => {
    setUploading(true);
    let successCount = 0;
    let failCount = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('comment', enhancedComment);
        formData.append('summary', summary);
        formData.append('forcePlacement', placementId); // Override auto-detection

        try {
          const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
          });

          if (response.ok) {
            successCount++;
            const result = await response.json();
            console.log('Upload success:', result);
            
            // Show smart rename info if available
            if (result.smartRename) {
              toast({
                title: '✅ File Uploaded Successfully',
                description: `${result.smartRename.original} → ${result.smartRename.smart} in ${result.smartRename.category}`,
                duration: 5000
              });
            } else if (result.file) {
              toast({
                title: '✅ File Uploaded',
                description: `${result.file.originalFilename} uploaded as ${result.file.filename}`,
                duration: 5000
              });
            }
          } else if (response.status === 401) {
            handleTokenExpired();
            setUploading(false);
            return;
          } else {
            failCount++;
            const errorData = await response.json();
            console.error('Upload failed:', errorData);
          }
        } catch (error) {
          failCount++;
        }
      }

      if (successCount > 0) {
        toast({
          title: 'Success',
          description: `${successCount} files uploaded to ${selectedPlacement.title}!`
        });
      }

      // Reset state
      setFiles([]);
      setComment('');
      setSummary('');
      setShowPlacementSuggestions(false);
      setSelectedPlacement(null);
      setPlacementSuggestions([]);
      document.getElementById('file-input').value = '';
      
      // Immediately update UI with successful uploads
      if (successCount > 0) {
        // Note: We don't have detailed results here, so we'll rely on server fetch
        toast({
          title: 'Refreshing content...',
          description: 'Loading your uploaded files',
        });
      }
      
      // Fetch latest content with retry
      setTimeout(() => {
        verifyTokenAndFetchContent().catch(error => {
          console.error('Failed to refresh content after upload:', error);
          // Retry once after a delay
          setTimeout(() => {
            verifyTokenAndFetchContent().catch(err => {
              console.error('Retry failed:', err);
              toast({
                title: 'Notice',
                description: 'Files uploaded but refresh failed. Please reload the page.',
                variant: 'default'
              });
            });
          }, 2000);
        });
      }, 500);

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Upload failed: ' + error.message,
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one file',
        variant: 'destructive'
      });
      return;
    }

    // Check file sizes
    const maxSize = 500 * 1024 * 1024; // 500MB
    const oversizedFiles = files.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      toast({
        title: 'File Too Large',
        description: `Files must be under 500MB. Large files: ${oversizedFiles.map(f => f.name).join(', ')}`,
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);
    let successCount = 0;
    let failCount = 0;
    const results = [];

    try {
      console.log('Starting upload for', files.length, 'files');
      
      // Upload files one by one to maintain proper error handling
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`Uploading file ${i + 1}/${files.length}: ${file.name}`);
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('comment', comment || `Batch upload: ${file.name}`);
        formData.append('summary', summary);

        try {
          const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
          });
          
          console.log('Upload response status:', response.status);

          let data;
          try {
            data = await response.json();
            console.log('Upload response data:', data);
          } catch (jsonError) {
            console.error('Failed to parse response JSON:', jsonError);
            throw new Error('Invalid response from server');
          }

          if (response.ok) {
            successCount++;
            results.push({ 
              file: file.name, 
              status: 'success',
              uploadedAs: data.file?.filename || data.smartRename?.smart,
              category: data.file?.category || data.smartRename?.category,
              message: data.message
            });
            
            // Show individual file upload success with renamed filename
            if (data.smartRename) {
              toast({
                title: '✅ File Uploaded',
                description: `${data.smartRename.original} → ${data.smartRename.smart} in ${data.smartRename.category}`,
                duration: 5000
              });
            }
          } else {
            failCount++;
            const errorMessage = data.error || `Upload failed with status ${response.status}`;
            results.push({ file: file.name, status: 'error', error: errorMessage });
            
            // Show error toast for failed upload
            toast({
              title: '❌ Upload Failed',
              description: `${file.name}: ${errorMessage}`,
              variant: 'destructive',
              duration: 5000
            });
          }
        } catch (error) {
          failCount++;
          console.error('Upload error for', file.name, ':', error);
          results.push({ file: file.name, status: 'error', error: error.message });
          
          // Show error toast for individual file
          toast({
            title: '❌ Upload Failed',
            description: `${file.name}: ${error.message}`,
            variant: 'destructive',
            duration: 5000
          });
        }
      }

      // Show results
      if (successCount > 0 && failCount === 0) {
        // Don't show summary toast if individual toasts were shown
        if (files.length === 1) {
          // Single file upload - individual toast already shown
        } else {
          // Multiple files - show summary
          toast({
            title: 'All Files Uploaded Successfully',
            description: `${successCount} files uploaded and renamed successfully!`,
            duration: 5000
          });
        }
      } else if (successCount > 0 && failCount > 0) {
        toast({
          title: 'Partial Success',
          description: `${successCount} files uploaded, ${failCount} failed. Check individual notifications for details.`,
          variant: 'default'
        });
      } else {
        const firstError = results.find(r => r.status === 'error')?.error || 'Unknown error';
        toast({
          title: 'Upload Failed',
          description: `All ${failCount} files failed: ${firstError}`,
          variant: 'destructive'
        });
        console.error('Upload results:', results);
      }

      // Clear form and refresh
      setFiles([]);
      setComment('');
      setSummary('');
      document.getElementById('file-input').value = '';
      
      // Fetch updated content to show new uploads
      if (successCount > 0) {
        // Wait a bit for server to process, then refresh content
        setTimeout(async () => {
          try {
            await verifyTokenAndFetchContent();
            toast({
              title: 'Content Refreshed',
              description: 'Recent uploads are now visible',
              duration: 2000
            });
          } catch (error) {
            console.error('Failed to refresh content after upload:', error);
            toast({
              title: 'Notice',
              description: 'Files uploaded successfully. Refresh the page to see them.',
              variant: 'default'
            });
          }
        }, 1000);
      }

    } catch (error) {
      console.error('Overall upload error:', error);
      toast({
        title: 'Upload Error',
        description: 'Upload failed: ' + error.message,
        variant: 'destructive',
        duration: 5000
      });
    } finally {
      setUploading(false);
      console.log('Upload process completed. Success:', successCount, 'Failed:', failCount);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(droppedFiles);
      
      toast({
        title: 'Files Added',
        description: `${droppedFiles.length} file(s) ready for upload`,
      });
    }
  };

  // AI Insights function with progress tracking
  const generateAIInsights = async () => {
    if (files.length === 0) return;

    try {
      setAiProcessing(true);
      setAiProgress(0);
      setProgressMessage('Starting AI analysis...');
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgressMessage(`Analyzing ${file.name}...`);
        setAiProgress(10);
        
        const formData = new FormData();
        formData.append('file', file);
        
        // Simulate progress updates during processing
        const progressInterval = setInterval(() => {
          setAiProgress(prev => {
            if (prev < 90) return prev + 5;
            return prev;
          });
        }, 1000);
        
        const response = await fetch(`${API_URL}/ai-insights`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        clearInterval(progressInterval);

        if (response.ok) {
          const result = await response.json();
          setAiProgress(100);
          setProgressMessage('AI analysis complete!');
          
          if (result.summary) {
            setSummary(result.summary);
            toast({
              title: '✨ AI Insights Generated',
              description: `Intelligent summary created for ${file.name}`,
            });
          }
        } else {
          throw new Error('Failed to process file');
        }
      }
    } catch (error) {
      setAiProgress(0);
      setProgressMessage('');
      toast({
        title: 'Error',
        description: 'Failed to generate AI insights: ' + error.message,
        variant: 'destructive'
      });
    } finally {
      setTimeout(() => {
        setAiProcessing(false);
        setAiProgress(0);
        setProgressMessage('');
      }, 2000); // Keep progress visible for 2 seconds
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-md">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl">Simple CMS</CardTitle>
              <p className="text-purple-100 text-sm">AI-Powered Document Management</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin or editor"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Simple CMS
                </h1>
                <p className="text-sm text-gray-500">AI-Powered Document Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  verifyTokenAndFetchContent().then(() => {
                    toast({
                      title: 'Refreshed',
                      description: 'Content updated successfully'
                    });
                  }).catch(() => {
                    toast({
                      title: 'Error',
                      description: 'Failed to refresh content',
                      variant: 'destructive'
                    });
                  });
                }} 
                className="border-purple-200 hover:bg-purple-50"
                disabled={isLoadingContent}
              >
                {isLoadingContent ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                ) : (
                  <>↻ Refresh</>
                )}
              </Button>
              <Button variant="outline" onClick={handleLogout} className="border-purple-200 hover:bg-purple-50">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Upload Section */}
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload Document</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Drag and Drop Upload Area */}
              <div
                className={`
                  relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
                  ${dragActive 
                    ? 'border-purple-500 bg-purple-50 scale-105' 
                    : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
                  }
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  accept="*/*"
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                      dragActive ? 'bg-purple-200' : 'bg-gray-100'
                    }`}>
                      <Upload className={`w-8 h-8 ${dragActive ? 'text-purple-600' : 'text-gray-500'}`} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {dragActive ? 'Drop files here!' : 'Upload Your Documents'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {dragActive 
                        ? 'Release to add files' 
                        : 'Drag and drop files here, or click to browse'
                      }
                    </p>
                    <p className="text-xs text-gray-500">
                      Supports PDFs, Images, Documents • Max 100MB per file
                    </p>
                  </div>
                  {!dragActive && (
                    <Button 
                      variant="outline" 
                      className="border-dashed border-gray-400 hover:border-purple-500 hover:text-purple-600"
                      onClick={() => document.getElementById('file-input').click()}
                    >
                      Choose Files
                    </Button>
                  )}
                </div>
              </div>

              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Selected {files.length} file{files.length > 1 ? 's' : ''}:
                  </p>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type || 'Unknown type'}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Comment (What is this file?)
                  </label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="e.g., Annual Report 2024, Q3 Financial Results, CSR Policy Document..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Summary (Brief description)
                  </label>
                  <Textarea
                    value={summary}
                    readOnly
                    placeholder="Click 'AI Insights' to generate automatic summary..."
                    rows={3}
                    className="bg-gray-50 cursor-not-allowed text-gray-800 placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button 
                  onClick={getPlacementSuggestions}
                  disabled={files.length === 0 || uploading}
                  className="w-full"
                >
                  {uploading ? (
                    <>Uploading...</>
                  ) : (
                    <>
                      🧠 <Upload className="h-4 w-4 ml-2 mr-2" />
                      Smart Upload with Intelligent Suggestions
                    </>
                  )}
                </Button>

                <Button 
                  onClick={generateAIInsights}
                  disabled={files.length === 0 || uploading || aiProcessing}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {aiProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>✨ AI Insights</>
                  )}
                </Button>
              </div>

              {/* AI Progress Bar */}
              {aiProcessing && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-700">AI Analysis Progress</span>
                    <span className="text-sm text-purple-600">{aiProgress}%</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-3">
                    <div 
                      className="bg-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${aiProgress}%` }}
                    ></div>
                  </div>
                  {progressMessage && (
                    <p className="text-sm text-purple-600 mt-2 flex items-center">
                      <div className="animate-pulse w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      {progressMessage}
                    </p>
                  )}
                </div>
              )}

              {/* AI Placement Suggestions - moved here to appear right under upload */}
              {showPlacementSuggestions && (
                <div className="border-2 border-primary/20 rounded-lg p-4 bg-primary/5">
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    🤖 AI Placement Suggestions
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our AI analyzed your file and suggests these locations:
                  </p>
                  <div className="space-y-3">
                    {placementSuggestions.map((suggestion, index) => (
                      <motion.div
                        key={suggestion.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedPlacement?.id === suggestion.id
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200 hover:border-primary/50'
                        } ${suggestion.recommended ? 'ring-2 ring-green-200' : ''}`}
                        onClick={() => selectPlacement(suggestion)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{suggestion.icon}</span>
                              <h3 className="font-semibold">{suggestion.title}</h3>
                              {suggestion.recommended && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                  Recommended
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {suggestion.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              📁 {suggestion.path}
                            </p>
                          </div>
                          {selectedPlacement?.id === suggestion.id && (
                            <Check className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {selectedPlacement && (
                    <div className="mt-4 pt-4 border-t">
                      <Button 
                        onClick={confirmAndUpload}
                        disabled={uploading}
                        className="w-full"
                      >
                        {uploading ? (
                          <>Uploading to {selectedPlacement.title}...</>
                        ) : (
                          <>
                            Upload to {selectedPlacement.title}
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>🤖 Smart Upload:</strong> Select files and add descriptive comments. 
                  Our intelligent system will suggest the best locations:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-blue-700">
                  <li>🖼️ <strong>Media images</strong> → Media Gallery</li>
                  <li>🍯 <strong>Sugar data files</strong> → Sugar Business Data (Local)</li>
                  <li>🎬 <strong>Videos/thumbnails</strong> → Hero Section</li>
                  <li>📅 <strong>Timeline images</strong> → About Us Section</li>
                  <li>📊 <strong>Excel/CSV files</strong> → Data & Analytics</li>
                  <li>📋 <strong>Reports/PDFs</strong> → Document Library</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Claude Content Management */}
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>Claude Content Manager</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
                <h3 className="font-semibold text-indigo-900 mb-2 flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  AI-Powered Content Changes
                </h3>
                <p className="text-sm text-indigo-700 mb-3">
                  Tell Claude what content you want to change on your website using natural language. 
                  No coding or file editing required!
                </p>
                
                {/* Available Commands */}
                {claudeCommands.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-indigo-800 mb-2">Example Commands:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {claudeCommands.slice(0, 4).map((cmd, index) => (
                        <div key={index} className="text-xs bg-white/70 p-2 rounded border border-indigo-200">
                          <code className="text-indigo-700">{cmd.command}</code>
                          <p className="text-gray-600 mt-1">{cmd.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Claude Request Input */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Content Change Request
                  </label>
                  <Textarea
                    value={claudeRequest}
                    onChange={(e) => setClaudeRequest(e.target.value)}
                    placeholder="Examples:
• Update chairman bio to 'Mr. Nawab Raza is a visionary leader...'
• Change sugar capacity to 12000 TCD
• Add board member Dr. John Smith as Independent Director
• Update contact email to info@newdomain.com
• Change company description to mention our green initiatives"
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <Button 
                  onClick={handleClaudeRequest}
                  disabled={claudeProcessing || !claudeRequest.trim()}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  {claudeProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Claude is working...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Apply Changes with Claude
                    </>
                  )}
                </Button>
              </div>

              {/* Help Section */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 How it works:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Type what you want to change in plain English</li>
                  <li>• Claude analyzes your request and identifies the right content</li>
                  <li>• Changes are applied directly to your website content</li>
                  <li>• No need to edit files manually or use terminal commands</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Recent Uploads */}
          {(recentUploads.length > 0 || isLoadingContent) && (
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Recent Uploads</span>
                  {isLoadingContent && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingContent && recentUploads.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-4"></div>
                      <p className="text-sm text-gray-600">Loading recent uploads...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentUploads.map((item) => {
                    const isImage = item.mimeType && item.mimeType.startsWith('image/');
                    const hasError = imageErrors[item.id];
                    return (
                      <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        {isImage && !hasError ? (
                          <img 
                            src={item.url} 
                            alt={item.filename}
                            className="h-12 w-12 object-cover rounded"
                            loading="lazy"
                            onError={() => {
                              setImageErrors(prev => ({ ...prev, [item.id]: true }));
                            }}
                          />
                        ) : isImage && hasError ? (
                          <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                            <ImageOff className="h-6 w-6 text-gray-400" />
                          </div>
                        ) : (
                          <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.metadata?.title || item.filename}</p>
                          <p className="text-xs text-gray-600 mt-1">{item.comment}</p>
                          {item.summary && (
                            <p className="text-xs text-gray-500 mt-1 italic">📝 {item.summary}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500">
                              Category: {item.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(item.uploadedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(item.filename, item.category)}
                            className="h-8 w-8 p-0"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Check className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                    );
                  })}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* File Browser */}
          {allFiles.length > 0 && (
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>File Browser</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    <option value="all">All Categories</option>
                    <option value="media-images">Media Images</option>
                    <option value="news-images">News Images</option>
                    <option value="sugar-data">Sugar Data</option>
                    <option value="ethanol-data">Ethanol Data</option>
                    <option value="power-data">Power Data</option>
                    <option value="feed-data">Feed Data</option>
                    <option value="annual-reports">Annual Reports</option>
                    <option value="quarterly-results">Quarterly Results</option>
                    <option value="presentations">Presentations</option>
                    <option value="csr-reports">CSR Reports</option>
                    <option value="general-documents">General Documents</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {allFiles
                    .filter(file => selectedCategory === 'all' || file.category === selectedCategory)
                    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
                    .map((file) => {
                      const isImage = file.mimeType && file.mimeType.startsWith('image/');
                      return (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-3 flex-1">
                            {isImage && !imageErrors[file.id] ? (
                              <img 
                                src={file.url} 
                                alt={file.filename}
                                className="h-12 w-12 object-cover rounded"
                                loading="lazy"
                                onError={() => {
                                  setImageErrors(prev => ({ ...prev, [file.id]: true }));
                                }}
                              />
                            ) : isImage && imageErrors[file.id] ? (
                              <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                                <ImageOff className="h-6 w-6 text-gray-400" />
                              </div>
                            ) : (
                              <FileText className="h-4 w-4 text-gray-500" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{file.filename}</p>
                              {file.comment && (
                                <p className="text-xs text-gray-600 mt-0.5">💬 {file.comment}</p>
                              )}
                              {file.summary && (
                                <p className="text-xs text-gray-500 mt-1 truncate italic">📝 {file.summary}</p>
                              )}
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                  {file.category}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(file.uploadedAt).toLocaleDateString()}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {(file.size / 1024).toFixed(1)}KB
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(file.filename, file.category)}
                            className="ml-2 h-8 px-3"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      );
                    })}
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  Total files: {allFiles.filter(file => selectedCategory === 'all' || file.category === selectedCategory).length}
                </div>
              </CardContent>
            </Card>
          )}

        </motion.div>
      </div>
    </div>
  );
};

export default SimpleCMS;