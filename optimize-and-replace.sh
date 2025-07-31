#!/bin/bash

# Automatic Image Optimization Script for MSPIL Website
# Usage: ./optimize-and-replace.sh [source_image] [target_location]
# Example: ./optimize-and-replace.sh ~/Desktop/new_image.jpg public/images/about-us/2024_future.jpg

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}🔄 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if arguments are provided
if [ $# -lt 2 ]; then
    print_error "Usage: $0 [source_image] [target_location]"
    echo "Example: $0 ~/Desktop/plant.jpg public/images/about-us/2024_future.jpg"
    exit 1
fi

SOURCE_IMAGE="$1"
TARGET_LOCATION="$2"

# Check if source image exists
if [ ! -f "$SOURCE_IMAGE" ]; then
    print_error "Source image not found: $SOURCE_IMAGE"
    exit 1
fi

# Get file info
ORIGINAL_SIZE=$(stat -f%z "$SOURCE_IMAGE" 2>/dev/null || stat -c%s "$SOURCE_IMAGE" 2>/dev/null)
ORIGINAL_SIZE_MB=$(echo "scale=2; $ORIGINAL_SIZE / 1024 / 1024" | bc)

print_status "Optimizing image: $(basename "$SOURCE_IMAGE")"
print_status "Original size: ${ORIGINAL_SIZE_MB}MB"

# Create temp directory
TEMP_DIR=$(mktemp -d)
TEMP_IMAGE="$TEMP_DIR/optimized_image.jpg"

# Get file extension
EXT="${SOURCE_IMAGE##*.}"
EXT_LOWER=$(echo "$EXT" | tr '[:upper:]' '[:lower:]')

# Optimization based on file type
case "$EXT_LOWER" in
    jpg|jpeg)
        print_status "Optimizing JPEG image..."
        # For JPEG: 75% quality for good balance of size/quality
        sips -s format jpeg -s formatOptions 75 "$SOURCE_IMAGE" --out "$TEMP_IMAGE" > /dev/null 2>&1
        ;;
    png)
        print_status "Optimizing PNG image..."
        # For PNG: convert to JPEG if it's a photo, keep as PNG if it has transparency
        if sips -g hasAlpha "$SOURCE_IMAGE" | grep -q "hasAlpha: no"; then
            # No transparency, convert to JPEG for better compression
            sips -s format jpeg -s formatOptions 75 "$SOURCE_IMAGE" --out "$TEMP_IMAGE" > /dev/null 2>&1
            print_warning "Converted PNG to JPEG (no transparency detected)"
        else
            # Has transparency, optimize as PNG
            sips -s format png "$SOURCE_IMAGE" --out "$TEMP_IMAGE" > /dev/null 2>&1
        fi
        ;;
    webp)
        print_status "Converting WebP to JPEG..."
        sips -s format jpeg -s formatOptions 75 "$SOURCE_IMAGE" --out "$TEMP_IMAGE" > /dev/null 2>&1
        ;;
    *)
        print_warning "Unknown format, converting to JPEG..."
        sips -s format jpeg -s formatOptions 75 "$SOURCE_IMAGE" --out "$TEMP_IMAGE" > /dev/null 2>&1
        ;;
esac

# Check if optimization was successful
if [ ! -f "$TEMP_IMAGE" ]; then
    print_error "Image optimization failed"
    exit 1
fi

# Get optimized file size
OPTIMIZED_SIZE=$(stat -f%z "$TEMP_IMAGE" 2>/dev/null || stat -c%s "$TEMP_IMAGE" 2>/dev/null)
OPTIMIZED_SIZE_MB=$(echo "scale=2; $OPTIMIZED_SIZE / 1024 / 1024" | bc)

# Calculate savings
SAVINGS_PERCENT=$(echo "scale=1; (($ORIGINAL_SIZE - $OPTIMIZED_SIZE) * 100) / $ORIGINAL_SIZE" | bc)

print_success "Optimized size: ${OPTIMIZED_SIZE_MB}MB"
print_success "Size reduction: ${SAVINGS_PERCENT}%"

# Resize if image is too large (width > 1920px)
IMAGE_WIDTH=$(sips -g pixelWidth "$TEMP_IMAGE" | awk '{print $2}' | tail -1)
if [ "$IMAGE_WIDTH" -gt 1920 ]; then
    print_warning "Image width (${IMAGE_WIDTH}px) is too large, resizing to 1920px max width..."
    sips -Z 1920 "$TEMP_IMAGE" > /dev/null 2>&1
    
    # Recalculate size after resize
    FINAL_SIZE=$(stat -f%z "$TEMP_IMAGE" 2>/dev/null || stat -c%s "$TEMP_IMAGE" 2>/dev/null)
    FINAL_SIZE_MB=$(echo "scale=2; $FINAL_SIZE / 1024 / 1024" | bc)
    TOTAL_SAVINGS=$(echo "scale=1; (($ORIGINAL_SIZE - $FINAL_SIZE) * 100) / $ORIGINAL_SIZE" | bc)
    
    print_success "Final size after resize: ${FINAL_SIZE_MB}MB"
    print_success "Total reduction: ${TOTAL_SAVINGS}%"
fi

# Create target directory if it doesn't exist
TARGET_DIR=$(dirname "$TARGET_LOCATION")
if [ ! -d "$TARGET_DIR" ]; then
    print_status "Creating directory: $TARGET_DIR"
    mkdir -p "$TARGET_DIR"
fi

# Copy optimized image to target location
cp "$TEMP_IMAGE" "$TARGET_LOCATION"

# Clean up temp directory
rm -rf "$TEMP_DIR"

print_success "Image optimized and saved to: $TARGET_LOCATION"

# Optional: Show recommendations
if (( $(echo "$OPTIMIZED_SIZE > 500000" | bc -l) )); then
    print_warning "Image is still large (>500KB). Consider further optimization for critical images."
fi

print_success "🚀 Image optimization complete!"
echo ""
echo "Next steps:"
echo "1. Build the website: npm run build"
echo "2. Deploy changes: ./deploy.sh \"Update image: $(basename "$TARGET_LOCATION")\""