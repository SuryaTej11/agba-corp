#!/usr/bin/env bash
# Repeatable deploy for agbacorp.com. Run from the project root on the server:
#
#   ./deploy/deploy.sh
#
# Pulls, installs, builds and restarts. Never touches data/, so batches,
# documents, testimonials, news and leads survive every deploy.
set -euo pipefail

cd "$(dirname "$0")/.."
ROOT="$PWD"

echo "==> Deploying from $ROOT"

# A build failure must not take the live site down, so back up first and
# only restart once the new build succeeded.
echo "==> Backing up data/ before touching anything"
npm run backup

echo "==> Fetching latest code"
git pull --ff-only

echo "==> Installing dependencies"
npm ci
# npm gates native install scripts; better-sqlite3 needs to compile.
npm approve-scripts better-sqlite3 sharp unrs-resolver >/dev/null 2>&1 || true
npm rebuild better-sqlite3 >/dev/null

echo "==> Building"
npm run build

echo "==> Restarting"
if command -v pm2 >/dev/null 2>&1 && pm2 describe agba >/dev/null 2>&1; then
  pm2 restart agba --update-env
elif systemctl list-unit-files 2>/dev/null | grep -q '^agba.service'; then
  sudo systemctl restart agba
else
  echo "!! No pm2 process or agba.service found — start the app manually." >&2
  exit 1
fi

echo "==> Waiting for the app to answer"
for i in $(seq 1 30); do
  if curl -fsS --max-time 3 -o /dev/null "http://127.0.0.1:3009/"; then
    echo "==> Deploy complete — site is responding."
    exit 0
  fi
  sleep 1
done

echo "!! The app did not respond within 30s. Check the logs." >&2
exit 1
