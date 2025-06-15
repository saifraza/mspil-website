import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Check, X, Trash2, ImageOff, Zap, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

const StaticUploadCMS = () => {
  const [files, setFiles] = useState([]);
  const [comment, setComment] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('media-images');
  const [dragActive, setDragActive] = useState(false);
  const [serverMode, setServerMode] = useState('static'); // 'static' or 'cms'
  const { toast } = useToast();

  // Different API URLs for different modes
  const API_URL = serverMode === 'static' 
    ? 'http://localhost:3002/api'  // Static server
    : (process.env.NODE_ENV === 'production' 
      ? 'https://mspil-mcp-production.up.railway.app/api' 
      : 'http://localhost:3002/api');

  const categories = [
    { value: 'media-images', label: 'Media Gallery', icon: '📸' },
    { value: 'news-images', label: 'News & Press', icon: '📰' },
    { value: 'timeline-images', label: 'Company Timeline', icon: '📅' },
    { value: 'office-images', label: 'Office & Facilities', icon: '🏢' },
    { value: 'infrastructure-images', label: 'Infrastructure', icon: '🏭' },
    { value: 'leadership-images', label: 'Leadership Team', icon: '👥' },
    { value: 'career-images', label: 'Careers', icon: '💼' },
    { value: 'csr-education-images', label: 'CSR - Education', icon: '📚' },
    { value: 'csr-healthcare-images', label: 'CSR - Healthcare', icon: '🏥' },
    { value: 'csr-rural-images', label: 'CSR - Rural Development', icon: '🌾' }
  ];

  useEffect(() => {
    fetchUploadedFiles();
  }, [serverMode]);

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch(`${API_URL}/content`);
      if (response.ok) {
        const data = await response.json();
        setUploadedFiles(data);
      }
    } catch (error) {
      console.error('Failed to fetch files:', error);
    }
  };

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
      setFiles(prev => [...prev, ...droppedFiles]);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: 'No files selected',
        description: 'Please select files to upload',
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', selectedCategory);
        formData.append('comment', comment);

        const response = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error(`Upload failed for ${file.name}`);
        }

        const result = await response.json();
        
        toast({
          title: 'Upload Successful!',
          description: serverMode === 'static' 
            ? `${file.name} saved to public directory - immediately available!`
            : `${file.name} uploaded to CMS server`,
        });
      }

      // Clear form
      setFiles([]);
      setComment('');
      
      // Refresh file list
      fetchUploadedFiles();

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (category, filename) => {
    try {
      const response = await fetch(`${API_URL}/content/${category}/${filename}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({
          title: 'File Deleted',
          description: 'File removed successfully'
        });
        fetchUploadedFiles();
      }
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const filteredFiles = selectedCategory === 'all' 
    ? uploadedFiles 
    : uploadedFiles.filter(file => file.category === selectedCategory);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl">Static File Upload System</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={serverMode === 'static' ? 'default' : 'outline'}
                  onClick={() => setServerMode('static')}
                  className="flex items-center gap-2"
                >
                  <Zap className="h-4 w-4" />
                  Static Mode
                </Button>
                <Button
                  variant={serverMode === 'cms' ? 'default' : 'outline'}
                  onClick={() => setServerMode('cms')}
                  className="flex items-center gap-2"
                >
                  <Server className="h-4 w-4" />
                  CMS Mode
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground mt-2">
              {serverMode === 'static' 
                ? '⚡ Files saved directly to public folder - no API calls needed!'
                : '🌐 Files uploaded to CMS server - requires API calls'}
            </p>
          </CardHeader>
          <CardContent>
            {serverMode === 'static' && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  Benefits of Static Mode:
                </h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Files load instantly - no server requests</li>
                  <li>• Better performance and SEO</li>
                  <li>• Works offline once cached</li>
                  <li>• Direct browser caching</li>
                </ul>
              </div>
            )}

            <div className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-700'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                  accept="image/*,.pdf,.doc,.docx,.csv"
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium">Drop files here or click to browse</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Support for images, PDFs, documents, and CSV files
                  </p>
                </label>
              </div>

              {/* Selected Files */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Selected Files:</h4>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <span className="text-sm">{file.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {(file.size / 1024).toFixed(1)} KB
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium mb-2">Comment (Optional)</label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a description or notes about these files..."
                  className="min-h-[80px]"
                />
              </div>

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                disabled={uploading || files.length === 0}
                className="w-full"
                size="lg"
              >
                {uploading ? (
                  <>Uploading...</>
                ) : (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    Upload {files.length} File{files.length !== 1 ? 's' : ''}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Files Browser */}
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files</CardTitle>
            <div className="flex gap-2 mt-4 overflow-x-auto">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All Files
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.icon} {cat.label}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFiles.map((file) => (
                <Card key={file.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative">
                    {file.filename.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                      <img
                        src={file.url}
                        alt={file.filename}
                        className="w-full h-full object-cover"
                        onError={() => {
                          const img = document.querySelector(`img[src="${file.url}"]`);
                          if (img) {
                            img.style.display = 'none';
                            img.parentElement.innerHTML = '<div class="flex items-center justify-center h-full"><svg class="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                          }
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <FileText className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <Badge className="absolute top-2 right-2" variant="secondary">
                      {serverMode === 'static' ? '⚡ Static' : '🌐 CMS'}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm font-medium truncate">{file.filename}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {categories.find(c => c.value === file.category)?.label || file.category}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        View File
                      </a>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(file.category, file.filename)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default StaticUploadCMS;