#!/usr/bin/env bash
set -euo pipefail

# server.js is what `output: "standalone"` emits. It is not `next start` - the
# next CLI is not in the traced node_modules, so calling it here fails.
exec node server.js
