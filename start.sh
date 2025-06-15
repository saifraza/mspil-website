#!/bin/bash

# MSPIL Website Startup Script

echo "
╔═══════════════════════════════════════════╗
║       MSPIL Website Development           ║
╚═══════════════════════════════════════════╝
"

# Kill any existing processes
echo "🔄 Cleaning up existing processes..."
pkill -f "vite" 2>/dev/null || true
pkill -f "node.*server.cjs" 2>/dev/null || true
sleep 2

# Check if we should start CMS
if [ "$1" == "--no-cms" ]; then
    echo "🚀 Starting Frontend Only..."
    npm run app:only
else
    echo "🚀 Starting CMS Server..."
    cd mcp-cms && node server.cjs &
    CMS_PID=$!
    cd ..
    
    # Wait for CMS to start
    sleep 3
    
    # Check if CMS started successfully
    if ps -p $CMS_PID > /dev/null; then
        echo "✅ CMS server started (PID: $CMS_PID)"
    else
        echo "❌ CMS server failed to start"
        exit 1
    fi
    
    echo "🚀 Starting Frontend Application..."
    npm run app:only &
    APP_PID=$!
    
    echo "
╔═══════════════════════════════════════════╗
║          Services Running                 ║
╠═══════════════════════════════════════════╣
║ 🌐 Frontend:  http://localhost:3000      ║
║ 🔧 CMS:       http://localhost:3002      ║
║ 📱 CMS Login: http://localhost:3000/simple-cms ║
╠═══════════════════════════════════════════╣
║          Login Credentials                ║
║ Username: admin                           ║
║ Password: admin123                        ║
╠═══════════════════════════════════════════╣
║       Press Ctrl+C to stop all            ║
╚═══════════════════════════════════════════╝
"
    
    # Handle Ctrl+C
    trap "echo 'Shutting down...'; kill $CMS_PID $APP_PID 2>/dev/null; exit" INT
    
    # Wait for processes
    wait $CMS_PID $APP_PID
fi