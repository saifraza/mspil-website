#!/bin/bash

echo "📄 Testing PDF Upload with OCR"
echo "==============================="

# Get auth token
TOKEN=$(curl -s -X POST http://localhost:3002/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}' | \
  grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Failed to get auth token"
  exit 1
fi

echo "✅ Got authentication token"

# Find a PDF to test with
PDF_FILE=""
for file in ../public/documents/**/*.pdf uploads/*.pdf; do
  if [ -f "$file" ]; then
    PDF_FILE="$file"
    break
  fi
done

if [ -n "$PDF_FILE" ]; then
  echo "📄 Testing with PDF: $(basename "$PDF_FILE")"
  
  echo "🚀 Uploading PDF with OCR processing..."
  
  # Upload the PDF
  RESPONSE=$(curl -s -X POST http://localhost:3002/api/upload \
    -H "Authorization: Bearer $TOKEN" \
    -F "file=@$PDF_FILE" \
    -F "comment=Testing PDF OCR processing")
  
  echo "📤 Upload Response:"
  echo "$RESPONSE" | head -c 800
  echo ""
  echo "..."
  
  # Check for OCR indicators
  if echo "$RESPONSE" | grep -q "PDF OCR completed"; then
    echo "✅ PDF OCR processing successful!"
  elif echo "$RESPONSE" | grep -q "ocrCompleted.*true"; then
    echo "✅ OCR processing detected!"
  else
    echo "⚠️ Check server console for OCR processing logs"
  fi
  
else
  echo "❌ No PDF files found to test with"
  echo "💡 Try uploading a PDF through the web interface at http://localhost:3002"
fi

echo ""
echo "🎯 What to look for:"
echo "- Check the terminal running 'npm start' for OCR progress logs"
echo "- Look for: '📄 Starting PDF OCR processing...'"
echo "- Look for: '✅ PDF OCR completed with XX% confidence'"
echo "- The response should include 'hasOCR': true if text was extracted"