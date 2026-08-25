#!/usr/bin/env bash
set -euo pipefail

# server.js is what `output: "standalone"` emits. It is not `next start` - the
# next CLI is not in the traced node_modules, so calling it here fails.
#
# Next only inlines NEXT_PUBLIC_* into the client bundle at build time. The
# standalone server reads them from process.env at RUNTIME, and the container
# does not inherit the Worker's `vars`, so export whatever .env.production
# defines (NEXT_PUBLIC_API_URL, etc.) into the environment before starting.
if [ -f /app/.env.production ]; then
  set -a
  . /app/.env.production
  set +a
fi

exec node server.js
