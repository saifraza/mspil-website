# 🏭 Ethanol Plant Image Update Instructions

## What to do:

1. **Save your ethanol plant construction image** (the one showing the storage silos and industrial construction) as:
   ```
   /Users/saifraza/Desktop/Website/mspil-website/public/images/about-us/2024_ethanol_expansion.jpg
   ```

2. **The image should show:**
   - Large cylindrical storage silos
   - Industrial construction framework 
   - Construction materials and equipment
   - Your ethanol plant expansion in progress

3. **After placing the image, run:**
   ```bash
   cd /Users/saifraza/Desktop/Website/mspil-website
   npm run build
   ./deploy.sh "Add 2024 ethanol plant expansion to timeline"
   ```

## What I've already updated:

✅ **Timeline Component**: Added 2024 entry to AboutUsSection.jsx  
✅ **English Content**: Added timeline text for 2024 expansion  
✅ **Image Path**: Set to use `/images/about-us/2024_ethanol_expansion.jpg`  

## Timeline Content Added:

**Title**: "2024: Major Ethanol Plant Expansion"  
**Description**: "Significant infrastructure development with large-scale ethanol storage silos and processing facilities under construction. This expansion represents our commitment to scaling biofuel production capacity and meeting growing market demands."

The timeline will automatically show your new 2024 entry once you place the image file!