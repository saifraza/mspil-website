import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Calendar, Folder, FileText, FileSpreadsheet, FileImage, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EnhancedDocumentViewer from '@/components/EnhancedDocumentViewer';
import { fetchDocuments } from '@/services/documentService';

const DocumentLibrary = ({ category = 'all' }) => {
  const [documents, setDocuments] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const data = await fetchDocuments();
      if (data) {
        setDocuments(data);
      } else {
        // Fallback to local documents
        const response = await fetch('/data/documents.json');
        const localData = await response.json();
        setDocuments(localData);
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
      // Try fallback
      try {
        const response = await fetch('/data/documents.json');
        const localData = await response.json();
        setDocuments(localData);
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    setViewerOpen(true);
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'csv':
        return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'presentation':
        return <FileImage className="h-5 w-5 text-blue-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getDocumentTypeLabel = (type) => {
    switch (type) {
      case 'csv':
        return 'Spreadsheet';
      case 'pdf':
        return 'PDF Document';
      case 'presentation':
        return 'Presentation';
      default:
        return 'Document';
    }
  };

  const getAllDocuments = () => {
    const allDocs = [];
    
    // Investor Relations documents
    if (documents.investorRelations) {
      Object.values(documents.investorRelations).forEach(categoryDocs => {
        if (Array.isArray(categoryDocs)) {
          allDocs.push(...categoryDocs);
        }
      });
    }
    
    // Business Data documents
    if (documents.businessData) {
      Object.values(documents.businessData).forEach(categoryDocs => {
        if (Array.isArray(categoryDocs)) {
          allDocs.push(...categoryDocs);
        }
      });
    }
    
    // CSR documents
    if (documents.csr && Array.isArray(documents.csr)) {
      allDocs.push(...documents.csr);
    }
    
    // General documents
    if (documents.general && Array.isArray(documents.general)) {
      allDocs.push(...documents.general);
    }
    
    return allDocs;
  };

  const getFilteredDocuments = () => {
    let docs = [];
    
    switch (activeTab) {
      case 'investor':
        if (documents.investorRelations) {
          Object.values(documents.investorRelations).forEach(categoryDocs => {
            if (Array.isArray(categoryDocs)) {
              docs.push(...categoryDocs);
            }
          });
        }
        break;
      case 'business':
        if (documents.businessData) {
          Object.values(documents.businessData).forEach(categoryDocs => {
            if (Array.isArray(categoryDocs)) {
              docs.push(...categoryDocs);
            }
          });
        }
        break;
      case 'csr':
        if (documents.csr && Array.isArray(documents.csr)) {
          docs = documents.csr;
        }
        break;
      case 'general':
        if (documents.general && Array.isArray(documents.general)) {
          docs = documents.general;
        }
        break;
      default:
        docs = getAllDocuments();
    }
    
    // Filter by search term
    if (searchTerm) {
      docs = docs.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return docs;
  };

  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading documents...</p>
        </div>
      </div>
    );
  }

  const filteredDocuments = getFilteredDocuments();

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Document Categories Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="investor">Investor Relations</TabsTrigger>
          <TabsTrigger value="business">Business Data</TabsTrigger>
          <TabsTrigger value="csr">CSR Reports</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No documents found</p>
              {searchTerm && (
                <p className="text-gray-500 text-sm mt-2">
                  Try adjusting your search terms
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((document, index) => (
                <motion.div
                  key={`${document.filename}-${index}`}
                  {...fadeInProps}
                  transition={{ ...fadeInProps.transition, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          {getDocumentIcon(document.type)}
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {getDocumentTypeLabel(document.type)}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                        {document.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {document.description && (
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {document.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(document.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Folder className="h-3 w-3" />
                          <span>{document.category}</span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleViewDocument(document)}
                        className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                        variant="outline"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Document
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Enhanced Document Viewer Modal */}
      <EnhancedDocumentViewer
        document={selectedDocument}
        isOpen={viewerOpen}
        onClose={() => {
          setViewerOpen(false);
          setSelectedDocument(null);
        }}
      />
    </div>
  );
};

export default DocumentLibrary;