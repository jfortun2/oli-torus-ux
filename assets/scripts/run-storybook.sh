#!/usr/bin/env bash
# Run Storybook without a global yarn install.
set -euo pipefail
cd "$(dirname "$0")/.."
if [[ ! -d node_modules ]]; then
  echo "Installing npm dependencies (first run)..."
  npm install --legacy-peer-deps
fi
exec npx yarn@1.22.17 storybook
