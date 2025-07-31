# MSPIL Website Project Structure

## Overview
This is the production website for Mahakaushal Sugar & Power Industries Ltd (MSPIL), deployed on Railway with a React frontend and Node.js CMS backend.

## Project Structure

```
mspil/
├── src/                      # Frontend React application
│   ├── components/          # Reusable UI components
│   │   ├── sections/       # Page section components
│   │   ├── ui/            # Shadcn UI components
│   │   └── ...            # Layout, Footer, Navbar, etc.
│   ├── pages/              # Route page components
│   ├── contexts/           # React contexts (Language, Images)
│   ├── hooks/              # Custom React hooks
│   ├── constants/          # Business data constants
│   ├── locales/           # i18n translations (en, hi)
│   └── utils/             # Utility functions
│
├── public/                  # Static assets (served directly)
│   ├── images/            # All static images
│   │   ├── leadership/    # Team photos
│   │   ├── infrastructure/# Factory/plant images
│   │   ├── media/         # Media gallery
│   │   ├── news_media/    # News images
│   │   ├── careers/       # Career page images
│   │   ├── csr/          # CSR activity images
│   │   └── ...           # Other image categories
│   ├── documents/         # PDF/document files
│   │   ├── sugar-data/    # Production data
│   │   ├── ethanol-data/  # Production data
│   │   └── investor-relations/
│   └── videos/            # Video files
│
├── mcp-cms/                # CMS Backend Server
│   ├── server.cjs         # Main server file
│   ├── ai-suggestions.cjs # AI placement logic
│   ├── uploads/           # Temporary upload storage
│   └── published-content.json # Content metadata
│
├── Configuration Files
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS config
│   ├── postcss.config.js  # PostCSS config
│   ├── package.json       # Frontend dependencies
│   └── .env.local         # Environment variables
│
└── Documentation
    ├── README.md          # Main documentation
    ├── FILE_UPLOAD_GUIDE.md # How to upload files
    └── PROJECT_STRUCTURE.md # This file
```

## Key Features

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **i18n Support** for English and Hindi
- **Responsive Design** for all devices

### CMS Backend
- **Express.js** server
- **JWT Authentication** for secure access
- **Smart File Upload** with automatic categorization
- **Static File Saving** to public directory
- **AI Suggestions** for content placement

### Deployment
- **Frontend**: Railway (mspil.in)
- **CMS Server**: Railway (mspil-mcp-production.up.railway.app)
- **Domain**: Custom domain via Railway

## How It Works

1. **Static Files First**: Most content (images, documents) is served as static files from `/public` for best performance

2. **CMS for Dynamic Content**: The CMS is used primarily for:
   - Uploading new content from mobile devices
   - Managing news and press releases
   - Content that changes frequently

3. **Smart Upload System**:
   - Files uploaded via CMS are saved to `/public`
   - Automatic categorization based on file type and content
   - Smart renaming for SEO and organization
   - No API calls needed to display uploaded content

## Common Tasks

### Upload Images from Phone
1. Visit https://mspil.in/simple-cms
2. Login with credentials
3. Upload files with appropriate category
4. Commit changes later from laptop

### Add Static Content Directly
1. Copy files to appropriate `/public` directory
2. Reference in code: `<img src="/images/category/file.jpg" />`
3. Commit and push

### Deploy Changes
```bash
./deploy.sh
```

## Environment Variables

```env
# .env.local
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_CMS_API_URL=https://mspil-mcp-production.up.railway.app/api
```

## Login Credentials
- **CMS Login**: admin / admin123
- **Alternate**: editor / editor123