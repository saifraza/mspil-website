#\!/usr/bin/env python3
"""
Demo Image Generator for MSPIL CMS
Usage: python3 generate_demo_images.py
"""

from PIL import Image, ImageDraw, ImageFont
import os
import sys

def create_demo_image(filename, color, text_lines, size=(400, 300)):
    """Create a demo image with text overlay"""
    img = Image.new('RGB', size, color)
    draw = ImageDraw.Draw(img)
    
    # Try to use system fonts
    try:
        font_large = ImageFont.truetype('/System/Library/Fonts/Arial.ttf', 28)
        font_small = ImageFont.truetype('/System/Library/Fonts/Arial.ttf', 18)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Draw text
    y_offset = size[1] // 2 - 30
    for i, line in enumerate(text_lines):
        font = font_large if i == 0 else font_small
        bbox = draw.textbbox((0, 0), line, font=font)
        x = (size[0] - (bbox[2] - bbox[0])) // 2
        y = y_offset + (i * 40)
        draw.text((x, y), line, fill='white', font=font)
    
    img.save(filename, 'JPEG', quality=90)
    print(f'✅ Created: {filename}')

if __name__ == "__main__":
    print("🎨 MSPIL Demo Image Generator")
    print("=" * 40)
    
    # Add any custom images here
    categories = [
        ('images/media/custom_demo.jpg', (37, 99, 235), ['Custom Media', 'Generated Image']),
        ('images/news/custom_news.jpg', (220, 38, 38), ['Latest News', 'Press Update']),
    ]
    
    for filename, color, text in categories:
        create_demo_image(filename, color, text)
    
    print(f"\n✅ Generated {len(categories)} demo images")
