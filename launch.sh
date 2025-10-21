#!/bin/bash
echo "🚀 Starting Biometric Dashboard..."
echo ""
echo "📊 Parsing CSV data..."
npm run parse
echo ""
echo "🌐 Starting development server..."
echo "Dashboard will open at: http://localhost:5173"
echo ""
npm run dev
