#!/bin/bash
# SEO Setup Verification Script
# Run this to verify all SEO configurations are in place

echo "🔍 Checking Global Jobs Opportunity SEO Setup..."
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_file() {
  if [ -f "$1" ]; then
    echo -e "${GREEN}✅${NC} $2"
    return 0
  else
    echo -e "${RED}❌${NC} $2 - Missing: $1"
    return 1
  fi
}

check_dir() {
  if [ -d "$1" ]; then
    echo -e "${GREEN}✅${NC} $2"
    return 0
  else
    echo -e "${RED}❌${NC} $2 - Missing: $1"
    return 1
  fi
}

echo "📁 Checking Directory Structure..."
check_dir "src" "Source directory exists"
check_dir "public" "Public directory exists"
check_dir "src/lib" "Library directory exists"
check_dir "src/app" "App directory exists"
echo ""

echo "📄 Checking SEO Files..."
check_file "src/app/sitemap.ts" "Sitemap generator"
check_file "src/app/robots.ts" "Dynamic robots.ts"
check_file "public/robots.txt" "Static robots.txt"
check_file "src/lib/schema.ts" "Schema utilities"
check_file "public/manifest.json" "PWA Manifest"
check_file "SEO_IMPLEMENTATION.md" "SEO Documentation"
echo ""

echo "📄 Checking Main Files..."
check_file "src/app/layout.tsx" "Root layout with metadata"
check_file "src/app/page.tsx" "Homepage with metadata"
check_file "src/app/about/page.tsx" "About page with metadata"
check_file "src/app/contact/layout.tsx" "Contact page with metadata"
check_file "src/app/terms-and-conditions/page.tsx" "Terms page with metadata"
check_file "next.config.mjs" "Next config with optimizations"
check_file "package.json" "Package configuration"
echo ""

echo "🖼️  Checking Required Images (Optional - for production)..."
echo -e "${YELLOW}⚠️${NC}  Images should be added to /public:"
echo "   - og-image.png (1200x630px)"
echo "   - favicon.ico"
echo "   - apple-touch-icon.png"
echo "   - icon-192x192.png"
echo "   - icon-512x512.png"
echo "   - logo.png"
echo ""

echo "🔗 Checking Configuration..."
if grep -q "metadataBase" src/app/layout.tsx; then
  echo -e "${GREEN}✅${NC} Metadata base configured"
else
  echo -e "${RED}❌${NC} Metadata base not found"
fi

if grep -q "alternates:" src/app/layout.tsx; then
  echo -e "${GREEN}✅${NC} Canonical URLs configured"
else
  echo -e "${RED}❌${NC} Canonical URLs not found"
fi

if grep -q "openGraph" src/app/layout.tsx; then
  echo -e "${GREEN}✅${NC} Open Graph tags configured"
else
  echo -e "${RED}❌${NC} Open Graph tags not found"
fi

if grep -q "robots:" src/app/layout.tsx; then
  echo -e "${GREEN}✅${NC} Robots meta configured"
else
  echo -e "${RED}❌${NC} Robots meta not found"
fi

echo ""
echo "📊 File Count Summary:"
echo "   Schema files: $(find src/lib -name "*.ts" | wc -l)"
echo "   App pages: $(find src/app -name "page.tsx" | wc -l)"
echo "   Layouts: $(find src/app -name "layout.tsx" | wc -l)"
echo ""

echo "✨ SEO Setup Verification Complete!"
echo ""
echo "Next steps:"
echo "1. Add images to /public (og-image.png, favicon.ico, etc.)"
echo "2. Update SITE_URL in src/lib/constants.ts if needed"
echo "3. Add social media URLs in src/lib/schema.ts"
echo "4. Run 'npm run build' to test build"
echo "5. Deploy to production"
echo "6. Submit sitemap to Google Search Console"
