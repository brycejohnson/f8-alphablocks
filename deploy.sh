#!/bin/bash
# Deploy volcanofrog into aq-website as /volcanofrog/ path
# Same pattern as MoneyLasso/deploy.sh
# Usage: bash deploy.sh

set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
AQ_WEBSITE_DIR="$(dirname "$PROJECT_DIR")/aq-website"
REDIRECTS_FILE="$AQ_WEBSITE_DIR/public/_redirects"

echo "Building Volcanofrog..."
cd "$PROJECT_DIR"
npx vite build

echo "Copying to aq-website/public/volcanofrog/ and dist/volcanofrog/..."
rm -rf "$AQ_WEBSITE_DIR/public/volcanofrog"
mkdir -p "$AQ_WEBSITE_DIR/public/volcanofrog"
# Copy build, then remove audio/ — served from R2 via Pages Function, not Pages CDN
cp -r build/* "$AQ_WEBSITE_DIR/public/volcanofrog/"
rm -rf "$AQ_WEBSITE_DIR/public/volcanofrog/audio"

rm -rf "$AQ_WEBSITE_DIR/dist/volcanofrog"
mkdir -p "$AQ_WEBSITE_DIR/dist/volcanofrog"
cp -r build/* "$AQ_WEBSITE_DIR/dist/volcanofrog/"
rm -rf "$AQ_WEBSITE_DIR/dist/volcanofrog/audio"

# Ensure _redirects includes /volcanofrog/* rule in both public and dist
for REDIRECTS_FILE in "$AQ_WEBSITE_DIR/public/_redirects" "$AQ_WEBSITE_DIR/dist/_redirects"; do
  if ! grep -q '/volcanofrog/' "$REDIRECTS_FILE" 2>/dev/null; then
    echo "Adding /volcanofrog/ redirect rule to $REDIRECTS_FILE..."
    sed -i 's|/\* /index.html 200|/volcanofrog/* /volcanofrog/index.html 200\n/* /index.html 200|' "$REDIRECTS_FILE"
  fi
done

echo ""
echo "Done. Volcanofrog staged at: $AQ_WEBSITE_DIR/dist/volcanofrog/"
echo "Redirects (dist):"
cat "$AQ_WEBSITE_DIR/dist/_redirects"
echo ""
echo "To upload new audio to R2 (only needed when audio files change):"
echo "  bash scripts/upload-audio-r2.sh"
echo ""
echo "To deploy: cd $AQ_WEBSITE_DIR && node deploy.mjs deploy"
