#!/bin/bash

# Fan Waves Deployment Script
# Run this to prepare files for BlueHost upload

echo "🚀 Starting Fan Waves deployment build..."

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run build process
echo "🔨 Building production files..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please check for errors."
    exit 1
fi

# Copy files to production directory
echo "📁 Preparing production files..."
cp -r dist/spa/* production-files/

# Create deployment summary
echo "✅ Build completed successfully!"
echo ""
echo "📋 Deployment Summary:"
echo "   - Source: dist/spa/*"
echo "   - Target: production-files/"
echo "   - Files ready for BlueHost upload"
echo ""
echo "🌐 Next Steps:"
echo "   1. Upload production-files/* to your BlueHost public_html folder"
echo "   2. Ensure .htaccess file is uploaded for proper routing"
echo "   3. Verify WooCommerce API environment variables are set"
echo ""
echo "📁 Production files location: $(pwd)/production-files/"
echo "📊 Total files: $(find production-files -type f | wc -l)"
echo "💾 Total size: $(du -sh production-files | cut -f1)"

# List key files
echo ""
echo "🔑 Key files prepared:"
echo "   - index.html (main entry point)"
echo "   - assets/ (CSS, JS, images)"
echo "   - .htaccess (routing configuration)"

echo ""
echo "🎉 Ready for deployment!"
