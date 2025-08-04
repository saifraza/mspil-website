import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the reports to create
const reports = [
  // Quarterly Results
  { 
    dir: 'investor-relations/quarterly-results',
    files: [
      { name: 'q2_fy2024_results.pdf', title: 'Q2 FY2024 Financial Results', date: 'September 30, 2024' },
      { name: 'q3_fy2024_results.pdf', title: 'Q3 FY2024 Financial Results', date: 'December 31, 2024' },
      { name: 'q4_fy2023_results.pdf', title: 'Q4 FY2023 Financial Results', date: 'March 31, 2023' }
    ]
  },
  // Corporate Policies
  {
    dir: 'investor-relations/policies',
    files: [
      { name: 'whistleblower_policy.pdf', title: 'Whistleblower Policy', date: 'January 1, 2024' },
      { name: 'related_party_policy.pdf', title: 'Related Party Transaction Policy', date: 'January 1, 2024' },
      { name: 'insider_trading_policy.pdf', title: 'Insider Trading Policy', date: 'January 1, 2024' },
      { name: 'dividend_policy.pdf', title: 'Dividend Distribution Policy', date: 'January 1, 2024' },
      { name: 'csr_policy.pdf', title: 'Corporate Social Responsibility Policy', date: 'January 1, 2024' },
      { name: 'code_of_conduct.pdf', title: 'Code of Conduct', date: 'January 1, 2024' }
    ]
  },
  // Notices & Announcements
  {
    dir: 'investor-relations/notices',
    files: [
      { name: 'board_meeting_notice_q3_2024.pdf', title: 'Board Meeting Notice - Q3 FY2024', date: 'January 15, 2024' },
      { name: 'agm_notice_2024.pdf', title: 'Annual General Meeting Notice 2024', date: 'June 15, 2024' },
      { name: 'disclosure_regulation_30.pdf', title: 'Disclosure under Regulation 30', date: 'November 30, 2023' }
    ]
  }
];

// Create directories if they don't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Generate a demo PDF
function generateDemoPDF(filePath, title, date) {
  const doc = new PDFDocument();
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Add company header
  doc.fontSize(20)
     .text('MAHAKAUSHAL SUGAR & POWER INDUSTRIES LTD.', 50, 50, { align: 'center' });
  
  doc.fontSize(12)
     .text('CIN: L15122UP2013PLC055120', { align: 'center' })
     .moveDown();

  // Add title
  doc.fontSize(18)
     .text(title, { align: 'center' })
     .moveDown();

  // Add date
  doc.fontSize(12)
     .text(`Date: ${date}`, { align: 'center' })
     .moveDown(2);

  // Add demo content
  doc.fontSize(12)
     .text('This is a demonstration PDF for the MSPIL investor relations portal.', { align: 'left' })
     .moveDown()
     .text('Key Highlights:', { underline: true })
     .moveDown(0.5);

  // Add some demo financial data
  const demoData = [
    '• Revenue Growth: 25% YoY',
    '• EBITDA Margin: 18.5%',
    '• Capacity Utilization: 85%',
    '• Debt-to-Equity Ratio: 0.65',
    '• Return on Equity: 22%'
  ];

  demoData.forEach(item => {
    doc.text(item, { indent: 20 });
  });

  doc.moveDown(2)
     .text('For more information, please contact:', { align: 'center' })
     .text('Investor Relations Department', { align: 'center' })
     .text('Email: cs@mspil.in', { align: 'center' })
     .text('Phone: +91 98915 46422', { align: 'center' });

  // Add footer
  doc.fontSize(10)
     .text('This is a demo document for testing purposes only.', 50, 700, { align: 'center', color: 'grey' });

  doc.end();
  
  return new Promise((resolve) => {
    stream.on('finish', resolve);
  });
}

// Main function to generate all PDFs
async function generateAllPDFs() {
  const baseDir = path.join(__dirname, '..', 'public', 'documents');
  
  for (const category of reports) {
    const categoryDir = path.join(baseDir, category.dir);
    ensureDirectoryExists(categoryDir);
    
    for (const file of category.files) {
      const filePath = path.join(categoryDir, file.name);
      
      // Only create if file doesn't exist
      if (!fs.existsSync(filePath)) {
        console.log(`Creating: ${file.name}`);
        await generateDemoPDF(filePath, file.title, file.date);
      } else {
        console.log(`File exists: ${file.name}`);
      }
    }
  }
  
  console.log('Demo PDFs generation complete!');
}

// Run the generator
generateAllPDFs().catch(console.error);