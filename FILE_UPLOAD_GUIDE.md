# File Upload Guide for MSPIL Website

## How the System Works

The CMS server now saves uploaded files directly to the frontend's `/public` directory, giving you:

1. **Mobile Upload Convenience** - Upload from your phone via CMS interface
2. **Static File Performance** - Files load instantly without API calls
3. **Version Control** - All files tracked in Git

## How to Upload Files

### From Your Phone or Any Device:

1. **Access CMS**:
   - Go to https://mspil.in/simple-cms
   - Login with your credentials

2. **Upload Files**:
   - Select the appropriate category
   - Choose files from your device
   - Add comments if needed
   - Click Upload

3. **Files are Automatically**:
   - Saved to the correct `/public` folder
   - Given smart names based on category
   - Available instantly as static files

4. **Commit Changes** (from your laptop later):
   ```bash
   git add -A
   git commit -m "Add new images via CMS"
   git push
   ```

## File Locations

Files are organized by category:

```
public/
├── images/
│   ├── leadership/       # Leadership team photos
│   ├── media/           # Media gallery
│   ├── news_media/      # News and press images
│   ├── office/          # Office facilities
│   ├── infrastructure/  # Factory and plants
│   ├── careers/         # Career page images
│   └── csr/            # CSR activities
│       ├── education/
│       ├── healthcare/
│       └── rural-development/
└── documents/
    ├── sugar-data/      # Sugar production data
    ├── ethanol-data/    # Ethanol production data
    ├── power-data/      # Power generation data
    ├── feed-data/       # Animal feed data
    └── investor-relations/
        ├── annual-reports/
        ├── quarterly-results/
        ├── presentations/
        └── policies/
```

## Smart File Naming

Files are automatically renamed based on:
- Category (e.g., `leadership_team_`)
- Date (e.g., `2025-06-15_`)
- Keywords from comments
- Unique ID to prevent conflicts

Example: "Board Meeting.jpg" → `leadership_team_2025-06-15_board_meeting_1234.jpg`

## Benefits

1. **Mobile Friendly** - Upload from anywhere
2. **Fast Loading** - No server requests needed
3. **SEO Optimized** - Search engines can index files
4. **Git Tracked** - Version history for all files
5. **CDN Ready** - Can be served globally

## Best Practices

1. **Choose the Right Category** - Ensures files go to the correct folder
2. **Add Descriptive Comments** - Helps with smart naming
3. **Commit Regularly** - Push changes to production
4. **Use Appropriate File Sizes** - Optimize images before uploading

## Example Usage in Code

```jsx
// Static image (loads instantly)
<img src="/images/leadership/nawab_raza.png" alt="Chairman" />

// Document link
<a href="/documents/annual-reports/annual_report_2024.pdf">Download Report</a>
```

## Important Notes

- Files are saved to the frontend repository
- You need to commit and push for production deployment
- Old CMS uploads (with API URLs) will continue to work
- The system handles both images and documents