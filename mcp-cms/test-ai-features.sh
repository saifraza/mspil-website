#!/bin/bash

echo "🤖 Testing MSPIL AI-Enhanced CMS"
echo "================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

SERVER_URL="http://localhost:3002"

echo -e "${BLUE}1. Testing server health...${NC}"
HEALTH=$(curl -s $SERVER_URL/health)
echo "✅ Server status: $(echo $HEALTH | grep -o '"status":"[^"]*"' | cut -d'"' -f4)"

echo -e "\n${BLUE}2. Getting authentication token...${NC}"
TOKEN=$(curl -s -X POST $SERVER_URL/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}' | \
  grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo -e "${RED}❌ Failed to get authentication token${NC}"
  exit 1
fi
echo "✅ Authentication successful"

echo -e "\n${BLUE}3. Testing OCR functionality...${NC}"
echo "Looking for images to test with OCR..."

# Find an image file to test with
TEST_IMAGE=""
for file in uploads/*.jpeg uploads/*.jpg uploads/*.png; do
  if [ -f "$file" ]; then
    TEST_IMAGE="$file"
    break
  fi
done

if [ -n "$TEST_IMAGE" ]; then
  echo "📷 Testing OCR with: $(basename $TEST_IMAGE)"
  
  # Upload with OCR enabled
  UPLOAD_RESULT=$(curl -s -X POST "$SERVER_URL/api/upload" \
    -H "Authorization: Bearer $TOKEN" \
    -F "file=@$TEST_IMAGE" \
    -F "comment=Testing OCR extraction capabilities")
  
  echo "📤 Upload result:"
  echo "$UPLOAD_RESULT" | head -c 500
  echo -e "\n..."
  
  # Check if OCR was processed
  if echo "$UPLOAD_RESULT" | grep -q "ocrCompleted"; then
    echo -e "${GREEN}✅ OCR processing detected!${NC}"
  else
    echo -e "${YELLOW}⚠️ OCR may not have processed (check server logs)${NC}"
  fi
else
  echo -e "${YELLOW}⚠️ No image files found for OCR testing${NC}"
fi

echo -e "\n${BLUE}4. Testing AI categorization...${NC}"
echo "Checking how AI categorizes different file types..."

# Test with different file patterns
declare -A test_cases=(
  ["sugar_production_report.csv"]="sugar-data"
  ["annual_report_2024.pdf"]="annual-reports"
  ["saif_raza_photo.jpg"]="saif-raza-image"
  ["company_news_article.jpg"]="news-images"
)

for filename in "${!test_cases[@]}"; do
  expected="${test_cases[$filename]}"
  
  # Test placement suggestions
  SUGGESTIONS=$(curl -s -X POST "$SERVER_URL/api/placement-suggestions" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"filename\": \"$filename\", \"comment\": \"test file\"}")
  
  echo "📁 $filename → Expected: $expected"
  if echo "$SUGGESTIONS" | grep -q "$expected"; then
    echo -e "${GREEN}✅ Correct categorization${NC}"
  else
    echo -e "${YELLOW}📋 Suggestions: $(echo $SUGGESTIONS | head -c 100)...${NC}"
  fi
done

echo -e "\n${BLUE}5. Checking current content with AI data...${NC}"
CONTENT=$(curl -s "$SERVER_URL/api/content")
TOTAL_FILES=$(echo "$CONTENT" | grep -o '"id"' | wc -l)
AI_PROCESSED=$(echo "$CONTENT" | grep -o '"hasOCR":true\|"hasAI":true' | wc -l)

echo "📊 Total files: $TOTAL_FILES"
echo "🤖 AI processed files: $AI_PROCESSED"

echo -e "\n${BLUE}6. Environment configuration check...${NC}"
if grep -q "ENABLE_OCR=true" .env; then
  echo -e "${GREEN}✅ OCR enabled${NC}"
else
  echo -e "${RED}❌ OCR disabled${NC}"
fi

if grep -q "ENABLE_AI_ANALYSIS=true" .env; then
  echo -e "${GREEN}✅ AI analysis enabled${NC}"
else
  echo -e "${RED}❌ AI analysis disabled${NC}"
fi

if grep -q "your_deepseek_api_key_here" .env; then
  echo -e "${YELLOW}⚠️ DeepSeek API key not configured${NC}"
  echo "   Get your key from: https://platform.deepseek.com/api_keys"
else
  echo -e "${GREEN}✅ DeepSeek API key configured${NC}"
fi

echo -e "\n${GREEN}🎉 AI Testing Complete!${NC}"
echo "================================"
echo "💡 To test with your own files:"
echo "   1. Access the CMS at http://localhost:3002"
echo "   2. Login with admin/admin123"
echo "   3. Upload images or documents"
echo "   4. Check the processing logs in terminal"