#!/bin/bash
# Upload audio files to Cloudflare R2 (alphablocks-audio bucket)
# Run this when audio files change — not needed on every deploy.
# Requires CLOUDFLARE_API_TOKEN in cloudflare.env or environment.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
ENV_FILE="$ROOT_DIR/cloudflare.env"

if [ -f "$ENV_FILE" ]; then
  export CLOUDFLARE_API_TOKEN=$(head -1 "$ENV_FILE" | tr -d '[:space:]')
fi

if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "Error: CLOUDFLARE_API_TOKEN not set. Add it to cloudflare.env or export it."
  exit 1
fi

BUCKET="alphablocks-audio"
AUDIO_DIR="$ROOT_DIR/static/audio"

echo "Uploading EN audio..."
count=0
for f in "$AUDIO_DIR/en/"*.m4a; do
  key="audio/en/$(basename "$f")"
  npx wrangler r2 object put "$BUCKET/$key" --file="$f" --remote 2>&1 | grep -E "(Upload complete|ERROR)" && ((count++)) || true
done
echo "EN: $count files uploaded"

echo "Uploading ZH audio..."
count=0
for f in "$AUDIO_DIR/zh/"*.m4a; do
  key="audio/zh/$(basename "$f")"
  npx wrangler r2 object put "$BUCKET/$key" --file="$f" --remote 2>&1 | grep -E "(Upload complete|ERROR)" && ((count++)) || true
done
echo "ZH: $count files uploaded"

echo "Done."
