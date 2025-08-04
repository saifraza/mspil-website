import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read documents.json
function getDocumentsData() {
  const documentsPath = path.join(__dirname, '..', 'public', 'data', 'documents.json');
  const data = fs.readFileSync(documentsPath, 'utf8');
  return JSON.parse(data);
}

// Function to flatten document structure for Excel
function flattenDocuments(documents) {
  const flattened = [];
  
  // Process investor relations documents
  if (documents.investorRelations) {
    const ir = documents.investorRelations;
    
    // Annual Reports
    ir.annualReports?.forEach(doc => {
      flattened.push({
        Category: 'Investor Relations',
        Subcategory: 'Annual Reports',
        Title: doc.title,
        Filename: doc.filename,
        URL: doc.url,
        Date: doc.date,
        Type: doc.type,
        Description: doc.description,
        FileSize: doc.fileSize || 'N/A'
      });
    });
    
    // Quarterly Results
    ir.quarterlyResults?.forEach(doc => {
      flattened.push({
        Category: 'Investor Relations',
        Subcategory: 'Quarterly Results',
        Title: doc.title,
        Filename: doc.filename,
        URL: doc.url,
        Date: doc.date,
        Type: doc.type,
        Description: doc.description,
        FileSize: doc.fileSize || 'N/A'
      });
    });
    
    // Policies
    ir.policies?.forEach(doc => {
      flattened.push({
        Category: 'Investor Relations',
        Subcategory: 'Corporate Policies',
        Title: doc.title,
        Filename: doc.filename,
        URL: doc.url,
        Date: doc.date,
        Type: doc.type,
        Description: doc.description,
        FileSize: doc.fileSize || 'N/A'
      });
    });
    
    // Presentations
    ir.presentations?.forEach(doc => {
      flattened.push({
        Category: 'Investor Relations',
        Subcategory: 'Presentations',
        Title: doc.title,
        Filename: doc.filename,
        URL: doc.url,
        Date: doc.date,
        Type: doc.type,
        Description: doc.description,
        FileSize: doc.fileSize || 'N/A'
      });
    });
    
    // Notices
    ir.notices?.forEach(doc => {
      flattened.push({
        Category: 'Investor Relations',
        Subcategory: 'Notices',
        Title: doc.title,
        Filename: doc.filename,
        URL: doc.url,
        Date: doc.date,
        Type: doc.type,
        Description: doc.description,
        FileSize: doc.fileSize || 'N/A'
      });
    });
  }
  
  // Process business data
  if (documents.businessData) {
    const bd = documents.businessData;
    
    Object.entries(bd).forEach(([key, docs]) => {
      docs.forEach(doc => {
        flattened.push({
          Category: 'Business Data',
          Subcategory: key.charAt(0).toUpperCase() + key.slice(1),
          Title: doc.title,
          Filename: doc.filename,
          URL: doc.url,
          Date: doc.date,
          Type: doc.type,
          Description: doc.description,
          FileSize: doc.fileSize || 'N/A'
        });
      });
    });
  }
  
  // Process CSR documents
  if (documents.csr) {
    documents.csr.forEach(doc => {
      flattened.push({
        Category: 'CSR',
        Subcategory: 'Reports',
        Title: doc.title,
        Filename: doc.filename,
        URL: doc.url,
        Date: doc.date,
        Type: doc.type,
        Description: doc.description,
        FileSize: doc.fileSize || 'N/A'
      });
    });
  }
  
  // Process general documents
  if (documents.general) {
    documents.general.forEach(doc => {
      flattened.push({
        Category: 'General',
        Subcategory: 'Company Information',
        Title: doc.title,
        Filename: doc.filename,
        URL: doc.url,
        Date: doc.date,
        Type: doc.type,
        Description: doc.description,
        FileSize: doc.fileSize || 'N/A'
      });
    });
  }
  
  return flattened;
}

// Function to update Excel file
function updateExcelWithDocuments(excelPath, outputPath) {
  try {
    // Read existing Excel file
    const workbook = xlsx.readFile(excelPath);
    
    // Get documents data
    const documentsData = getDocumentsData();
    const flattenedDocs = flattenDocuments(documentsData);
    
    // Create a new worksheet for documents
    const ws = xlsx.utils.json_to_sheet(flattenedDocs);
    
    // Add the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, ws, 'Documents');
    
    // Write the updated workbook
    xlsx.writeFile(workbook, outputPath);
    
    console.log(`Excel file updated successfully!`);
    console.log(`Total documents added: ${flattenedDocs.length}`);
    console.log(`Output file: ${outputPath}`);
    
    // Print summary
    const summary = {};
    flattenedDocs.forEach(doc => {
      const key = `${doc.Category} - ${doc.Subcategory}`;
      summary[key] = (summary[key] || 0) + 1;
    });
    
    console.log('\nDocument Summary:');
    Object.entries(summary).forEach(([key, count]) => {
      console.log(`  ${key}: ${count} documents`);
    });
    
  } catch (error) {
    console.error('Error updating Excel file:', error);
  }
}

// Main execution
const inputPath = '/Users/saifraza/Desktop/MSPIL_Chart_Data_Template.xlsx';
const outputPath = '/Users/saifraza/Desktop/MSPIL_Chart_Data_Template_Updated.xlsx';

// Check if input file exists
if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

// Update the Excel file
updateExcelWithDocuments(inputPath, outputPath);