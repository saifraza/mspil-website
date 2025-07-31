import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, FileText, FileSpreadsheet, FileImage, Eye, Calendar, Folder, 
  Download, Share2, Search, ZoomIn, ZoomOut, Maximize2, Filter,
  ArrowUp, ArrowDown, Copy, CheckCircle, Loader2, FileCode,
  BarChart2, PieChart, TrendingUp, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const EnhancedDocumentViewer = ({ document, isOpen, onClose }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    if (isOpen && document) {
      loadDocumentContent();
      setActiveTab('content');
      setSearchTerm('');
      setCurrentPage(1);
    }
  }, [isOpen, document]);

  const loadDocumentContent = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(document.url);
      if (!response.ok) {
        throw new Error('Failed to load document');
      }
      
      const text = await response.text();
      setContent(text);
    } catch (err) {
      setError('Unable to load document content');
      console.error('Document loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Document content copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const shareDocument = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: document.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      copyToClipboard();
    }
  };

  const processedCSVData = useMemo(() => {
    if (!content || document.type !== 'csv') return { headers: [], rows: [] };

    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length === 0) return { headers: [], rows: [] };

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const rows = lines.slice(1).map(line => 
      line.split(',').map(cell => cell.trim().replace(/"/g, ''))
    );

    // Apply search filter
    const filteredRows = searchTerm
      ? rows.filter(row => 
          row.some(cell => 
            cell.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : rows;

    // Apply sorting
    const sortedRows = sortConfig.key !== null
      ? [...filteredRows].sort((a, b) => {
          const aValue = a[sortConfig.key];
          const bValue = b[sortConfig.key];
          
          // Try to parse as numbers
          const aNum = parseFloat(aValue);
          const bNum = parseFloat(bValue);
          
          if (!isNaN(aNum) && !isNaN(bNum)) {
            return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
          }
          
          // Sort as strings
          if (sortConfig.direction === 'asc') {
            return aValue.localeCompare(bValue);
          }
          return bValue.localeCompare(aValue);
        })
      : filteredRows;

    return { headers, rows: sortedRows };
  }, [content, document.type, searchTerm, sortConfig]);

  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return processedCSVData.rows.slice(startIndex, startIndex + rowsPerPage);
  }, [processedCSVData.rows, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(processedCSVData.rows.length / rowsPerPage);

  const handleSort = (columnIndex) => {
    setSortConfig(current => ({
      key: columnIndex,
      direction: current.key === columnIndex && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const renderContent = () => {
    if (loading) {
      return (
        <motion.div 
          className="flex items-center justify-center py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-12 w-12 text-primary mx-auto mb-4" />
            </motion.div>
            <p className="text-gray-600 font-medium">Loading document...</p>
            <p className="text-gray-400 text-sm mt-2">Please wait while we fetch the content</p>
          </div>
        </motion.div>
      );
    }

    if (error) {
      return (
        <motion.div 
          className="flex items-center justify-center py-24"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="text-center">
            <div className="p-4 bg-red-50 rounded-full inline-block mb-4">
              <FileText className="h-12 w-12 text-red-400" />
            </div>
            <p className="text-red-600 font-semibold mb-2">{error}</p>
            <p className="text-gray-500 text-sm">Please try again later</p>
            <Button onClick={loadDocumentContent} className="mt-4">
              Retry
            </Button>
          </div>
        </motion.div>
      );
    }

    if (document.type === 'csv') {
      return renderCSVContent();
    } else if (document.type === 'pdf' || document.type === 'presentation') {
      return renderTextContent();
    }

    return renderTextContent();
  };

  const renderCSVContent = () => {
    if (!processedCSVData.headers.length) return <p>No data available</p>;

    return (
      <div>
        {/* Search and Controls */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search in data..."
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={rowsPerPage.toString()} onValueChange={(v) => setRowsPerPage(Number(v))}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 rows</SelectItem>
                <SelectItem value="20">20 rows</SelectItem>
                <SelectItem value="50">50 rows</SelectItem>
                <SelectItem value="100">100 rows</SelectItem>
              </SelectContent>
            </Select>
            
            <Badge variant="secondary">
              {processedCSVData.rows.length} total rows
            </Badge>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <tr>
                  {processedCSVData.headers.map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => handleSort(index)}
                    >
                      <div className="flex items-center gap-2">
                        {header}
                        {sortConfig.key === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {sortConfig.direction === 'asc' ? 
                              <ArrowUp className="h-3 w-3" /> : 
                              <ArrowDown className="h-3 w-3" />
                            }
                          </motion.div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                <AnimatePresence mode="wait">
                  {paginatedRows.map((row, rowIndex) => (
                    <motion.tr
                      key={`${currentPage}-${rowIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: rowIndex * 0.02 }}
                      className={rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                        >
                          {cell}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, processedCSVData.rows.length)} of {processedCSVData.rows.length} entries
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="px-3 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTextContent = () => {
    if (!content) return null;

    const highlightedContent = searchTerm
      ? content.replace(
          new RegExp(`(${searchTerm})`, 'gi'),
          '<mark class="bg-yellow-200 px-1 rounded">$1</mark>'
        )
      : content;

    return (
      <div>
        {/* Search Bar */}
        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search in document..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Content with zoom */}
        <div 
          className="prose max-w-none dark:prose-invert"
          style={{ fontSize: `${zoomLevel}%` }}
        >
          <div 
            className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 font-mono bg-gray-50 dark:bg-gray-800 p-6 rounded-lg overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: highlightedContent }}
          />
        </div>
      </div>
    );
  };

  const getDocumentIcon = (type) => {
    const iconClass = "h-5 w-5";
    switch (type) {
      case 'csv':
        return <FileSpreadsheet className={iconClass} />;
      case 'pdf':
        return <FileText className={iconClass} />;
      case 'presentation':
        return <FileImage className={iconClass} />;
      case 'code':
        return <FileCode className={iconClass} />;
      default:
        return <FileText className={iconClass} />;
    }
  };

  if (!isOpen || !document) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="h-full border-0">
            <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                    {getDocumentIcon(document.type)}
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">{document.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(document.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Folder className="h-4 w-4" />
                        <span>{document.category}</span>
                      </div>
                      <Badge variant="outline">{document.type.toUpperCase()}</Badge>
                    </div>
                    {document.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{document.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Zoom controls for text documents */}
                  {document.type !== 'csv' && (
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setZoomLevel(z => Math.max(50, z - 10))}
                        className="h-8 w-8 p-0"
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium px-2">{zoomLevel}%</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setZoomLevel(z => Math.min(200, z + 10))}
                        className="h-8 w-8 p-0"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="gap-2"
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={shareDocument}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="hover:bg-red-100 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 overflow-hidden h-[calc(100%-120px)]">
              {/* Tabs for different views */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-gray-50 dark:bg-gray-800">
                  <TabsTrigger value="content" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Content
                  </TabsTrigger>
                  {document.type === 'csv' && (
                    <>
                      <TabsTrigger value="stats" className="gap-2">
                        <BarChart2 className="h-4 w-4" />
                        Statistics
                      </TabsTrigger>
                      <TabsTrigger value="insights" className="gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Insights
                      </TabsTrigger>
                    </>
                  )}
                </TabsList>
                
                <TabsContent value="content" className="h-full overflow-y-auto p-6">
                  {renderContent()}
                </TabsContent>
                
                {document.type === 'csv' && (
                  <>
                    <TabsContent value="stats" className="h-full overflow-y-auto p-6">
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Data Statistics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Total Rows</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-2xl font-bold">{processedCSVData.rows.length}</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Total Columns</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-2xl font-bold">{processedCSVData.headers.length}</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Data Points</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-2xl font-bold">
                                {processedCSVData.rows.length * processedCSVData.headers.length}
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="insights" className="h-full overflow-y-auto p-6">
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Data Insights</h3>
                        <p className="text-gray-600">
                          Advanced data analysis and insights would be displayed here based on the CSV content.
                        </p>
                      </div>
                    </TabsContent>
                  </>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnhancedDocumentViewer;