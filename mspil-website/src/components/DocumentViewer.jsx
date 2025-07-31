import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, FileSpreadsheet, FileImage, Eye, Calendar, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DocumentViewer = ({ document, isOpen, onClose }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && document) {
      loadDocumentContent();
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

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading document...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-red-600 mb-2">{error}</p>
            <p className="text-gray-500 text-sm">Please try again later</p>
          </div>
        </div>
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
    if (!content) return null;

    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length === 0) return <p>No data available</p>;

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const rows = lines.slice(1).map(line => 
      line.split(',').map(cell => cell.trim().replace(/"/g, ''))
    );

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th 
                  key={index}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-b border-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 50).map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((cell, cellIndex) => (
                  <td 
                    key={cellIndex}
                    className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length > 50 && (
          <p className="text-center text-gray-500 py-4">
            Showing first 50 rows of {rows.length} total rows
          </p>
        )}
      </div>
    );
  };

  const renderTextContent = () => {
    if (!content) return null;

    return (
      <div className="prose max-w-none">
        <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-gray-50 p-4 rounded-lg overflow-x-auto">
          {content}
        </pre>
      </div>
    );
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'csv':
        return <FileSpreadsheet className="h-5 w-5" />;
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      case 'presentation':
        return <FileImage className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  if (!isOpen || !document) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="h-full border-0">
            <CardHeader className="border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getDocumentIcon(document.type)}
                  <div>
                    <CardTitle className="text-lg">{document.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(document.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Folder className="h-4 w-4" />
                        <span>{document.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="hover:bg-gray-200"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {document.description && (
                <p className="text-sm text-gray-600 mt-2">{document.description}</p>
              )}
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="p-6">
                {renderContent()}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DocumentViewer;