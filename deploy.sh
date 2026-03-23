#!/bin/bash
# Deploy f8-alphablocks into aq-website as /alphablocks/ path
# Same pattern as MoneyLasso/deploy.sh
# Usage: bash deploy.sh

set -e

ALPHABLOCKS_DIR="$(cd "$(dirname "$0")" && pwd)"
AQ_WEBSITE_DIR="$(dirname "$ALPHABLOCKS_DIR")/aq-website"
REDIRECTS_FILE="$AQ_WEBSITE_DIR/public/_redirects"

echo "Building Alphablocks..."
cd "$ALPHABLOCKS_DIR"
npx vite build

echo "Copying to aq-website/public/alphablocks/ and dist/alphablocks/..."
rm -rf "$AQ_WEBSITE_DIR/public/alphablocks"
mkdir -p "$AQ_WEBSITE_DIR/public/alphablocks"
# Copy build, then remove audio/ — served from R2 via Pages Function, not Pages CDN
cp -r build/* "$AQ_WEBSITE_DIR/public/alphablocks/"
rm -rf "$AQ_WEBSITE_DIR/public/alphablocks/audio"

rm -rf "$AQ_WEBSITE_DIR/dist/alphablocks"
mkdir -p "$AQ_WEBSITE_DIR/dist/alphablocks"
cp -r build/* "$AQ_WEBSITE_DIR/dist/alphablocks/"
rm -rf "$AQ_WEBSITE_DIR/dist/alphablocks/audio"

# Ensure _redirects includes /alphablocks/* rule in both public and dist
for REDIRECTS_FILE in "$AQ_WEBSITE_DIR/public/_redirects" "$AQ_WEBSITE_DIR/dist/_redirects"; do
  if ! grep -q '/alphablocks/' "$REDIRECTS_FILE" 2>/dev/null; then
    echo "Adding /alphablocks/ redirect rule to $REDIRECTS_FILE..."
    sed -i 's|/\* /index.html 200|/alphablocks/* /alphablocks/index.html 200\n/* /index.html 200|' "$REDIRECTS_FILE"
  fi
done

echo ""
echo "Done. Alphablocks staged at: $AQ_WEBSITE_DIR/dist/alphablocks/"
echo "Redirects (dist):"
cat "$AQ_WEBSITE_DIR/dist/_redirects"
echo ""
echo "To upload new audio to R2 (only needed when audio files change):"
echo "  bash scripts/upload-audio-r2.sh"
echo ""
echo "To deploy: cd $AQ_WEBSITE_DIR && node deploy.mjs deploy"
