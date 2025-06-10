#!/bin/bash

# Kill any existing processes
echo "🔄 Stopping existing servers..."
pkill -f "vite" 2>/dev/null || true
pkill -f "node.*server.cjs" 2>/dev/null || true
sleep 2

echo "🚀 Starting MCP CMS Server..."
# Start MCP server in background
node mcp-cms/server.cjs &
CMS_PID=$!

# Wait for CMS server to start
sleep 3

echo "🚀 Starting Main Application..."
# Start Vite dev server
npm run app:only &
APP_PID=$!

echo "
✅ Both servers started successfully!
==================================
🌐 Main App: http://localhost:3000
🔧 CMS Server: http://localhost:3002

Login to CMS:
- admin / admin123
- editor / editor123

Press Ctrl+C to stop both servers
==================================
"

# Wait for both processes
wait $CMS_PID $APP_PID