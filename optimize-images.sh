#!/bin/bash

# Image optimization script for MSPIL website
# This script optimizes images for web performance

echo "🖼️  Starting image optimization..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is not installed. Please install it first:"
    echo "   brew install imagemagick (macOS)"
    echo "   sudo apt-get install imagemagick (Linux)"
    exit 1
fi

# Create optimized directory
mkdir -p public/images/optimized

# Function to optimize images
optimize_image() {
    local input_file="$1"
    local output_file="$2"
    local max_width="$3"
    local quality="$4"
    
    echo "Optimizing: $input_file"
    
    # Get file extension
    ext="${input_file##*.}"
    ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
    
    case "$ext_lower" in
        jpg|jpeg)
            # Optimize JPEG images
            convert "$input_file" \
                -resize "${max_width}x>" \
                -quality "$quality" \
                -strip \
                -interlace Plane \
                -gaussian-blur 0.05 \
                -define jpeg:dct-method=float \
                "$output_file"
            ;;
        png)
            # Optimize PNG images
            convert "$input_file" \
                -resize "${max_width}x>" \
                -strip \
                -define png:compression-filter=5 \
                -define png:compression-level=9 \
                -define png:compression-strategy=1 \
                "$output_file"
            ;;
        *)
            # Copy other formats as-is
            cp "$input_file" "$output_file"
            ;;
    esac
}

# Optimize images in different categories with appropriate settings
echo "📁 Optimizing hero images..."
find public/images -name "hero_*" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
    output="public/images/optimized/$(basename "$file")"
    optimize_image "$file" "$output" 1920 85
done

echo "📁 Optimizing about-us images..."
find public/images/about-us -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
    output="public/images/optimized/about-us-$(basename "$file")"
    optimize_image "$file" "$output" 1200 80
done

echo "📁 Optimizing leadership images..."
find public/images/leadership -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
    output="public/images/optimized/leadership-$(basename "$file")"
    optimize_image "$file" "$output" 600 85
done

echo "📁 Optimizing infrastructure images..."
find public/images/infrastructure -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
    output="public/images/optimized/infrastructure-$(basename "$file")"
    optimize_image "$file" "$output" 1200 80
done

echo "📁 Optimizing CSR images..."
find public/images/csr -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
    output="public/images/optimized/csr-$(basename "$file")"
    optimize_image "$file" "$output" 800 80
done

# Generate WebP versions for modern browsers
echo "🎨 Generating WebP versions..."
if command -v cwebp &> /dev/null; then
    find public/images/optimized -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
        output="${file%.*}.webp"
        cwebp -q 80 "$file" -o "$output" 2>/dev/null
    done
else
    echo "⚠️  WebP conversion skipped (cwebp not installed)"
fi

# Calculate savings
original_size=$(du -sh public/images | cut -f1)
optimized_size=$(du -sh public/images/optimized | cut -f1)

echo "✅ Image optimization complete!"
echo "📊 Original size: $original_size"
echo "📊 Optimized size: $optimized_size"
echo ""
echo "💡 To use optimized images, update your image paths in the code"
echo "   Example: /images/hero.jpg → /images/optimized/hero.jpg"