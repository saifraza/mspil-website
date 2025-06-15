#!/bin/bash

echo "Starting MSPIL Production Services..."

# Start CMS server in background
echo "Starting CMS server on port 3002..."
PORT=3002 node mcp-cms/server.cjs &
CMS_PID=$!

# Give CMS server time to start
sleep 3

# Check if CMS is running
if ps -p $CMS_PID > /dev/null; then
    echo "✅ CMS server started successfully (PID: $CMS_PID)"
else
    echo "❌ CMS server failed to start"
    exit 1
fi

# Start frontend server
echo "Starting frontend server on port 3000..."
npm run start:frontend

# This will run when the frontend server stops
echo "Shutting down services..."
kill $CMS_PID 2>/dev/null