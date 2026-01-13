#!/bin/bash
set -e

# Only install dependencies for drizzle migration. Those are not bundled via `next build` as its optimized to only install dependencies that are used`
# echo "Installing production dependencies"
# # cd scripts
# pnpm config set store-dir ~/.pnpm-store
# pnpm fetch
# pnpm install --prod --prefer-offline

# echo "Approving only better-sqlite3..."
# pnpm approve-builds --filter better-sqlite3
# cd ..

# echo "Creating '/data/sqlite.db' using bind volume mount"
# pnpm run db:migrate:prod & PID=$!
# # Wait for migration to finish
# wait $PID

echo "Starting production server..."
node server.js & PID=$!

wait $PID
