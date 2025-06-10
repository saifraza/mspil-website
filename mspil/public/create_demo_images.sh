#\!/bin/bash

# Create simple colored demo images using ImageMagick (if available) or base64 encoded 1x1 pixel images

# Function to create a simple colored image
create_demo_image() {
    local filename="$1"
    local color="$2"
    local text="$3"
    
    # Create a simple HTML file that displays as an image placeholder
    cat > "$filename" << HTML
<\!DOCTYPE html>
<html><head><title>$text</title></head>
<body style="margin:0;padding:20px;background:$color;color:white;font-family:Arial;text-align:center;min-height:200px;display:flex;align-items:center;justify-content:center;">
<div><h2>$text</h2><p>Demo Image</p><p style="font-size:12px;">Category: $(basename $(dirname "$filename"))</p></div>
</body></html>
HTML
    
    echo "Created: $filename"
}

# Media Images
create_demo_image "images/media/company_overview.html" "#2563eb" "Company Overview"
create_demo_image "images/media/facility_tour.html" "#2563eb" "Facility Tour"

# News Images  
create_demo_image "images/news/press_conference.html" "#dc2626" "Press Conference 2024"
create_demo_image "images/news/industry_award.html" "#dc2626" "Industry Award"

# Office Images
create_demo_image "images/office/headquarters.html" "#059669" "Corporate Headquarters"
create_demo_image "images/office/modern_workspace.html" "#059669" "Modern Workspace"

# Leadership Images
create_demo_image "images/leadership/executive_team.html" "#7c3aed" "Executive Team"
create_demo_image "images/leadership/board_members.html" "#7c3aed" "Board Members"

# Career Images
create_demo_image "images/careers/team_collaboration.html" "#ea580c" "Team Collaboration"
create_demo_image "images/careers/training_program.html" "#ea580c" "Training Program"

# Infrastructure Images
create_demo_image "images/infrastructure/sugar_mill_facility.html" "#0891b2" "Sugar Mill Facility"
create_demo_image "images/infrastructure/ethanol_distillery.html" "#0891b2" "Ethanol Distillery"

# CSR Images
create_demo_image "images/csr/education/scholarship_program.html" "#16a34a" "Scholarship Program"
create_demo_image "images/csr/healthcare/medical_camp.html" "#16a34a" "Medical Camp"
create_demo_image "images/csr/rural-development/farmer_support.html" "#16a34a" "Farmer Support"

echo "✅ All demo images created as HTML files\!"
echo "Note: These are viewable placeholder images that will display in browsers"
