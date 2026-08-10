# Next.js frontend for Cloudflare Containers.
# Build context is the repo root, not this folder.
#   docker build -f deploy/cloudflare/Dockerfile .
#
# Three stages. The install stage carries the full ~1.5 GB node_modules that
# Syncfusion and MUI drag in, the build stage uses it, and the runtime stage
# copies only .next/standalone - the traced subset Next works out for itself.
# The instance disk budget is 4 GB total on "basic", so shipping the full
# install would not fit.

# -------------------------------------------------------------- install stage
FROM node:20-bookworm-slim AS deps

WORKDIR /app

# libc6/libvips are what sharp's prebuilt binary links against. Without these
# `npm ci` succeeds and the image only fails when the first next/image request
# arrives, which is a bad place to find out.
RUN apt-get update && apt-get install -y --no-install-recommends \
      libc6 \
      libvips42 \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

# ---------------------------------------------------------------- build stage
FROM node:20-bookworm-slim AS build

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* are inlined into the client bundle by the compiler, so they are
# build-time inputs, not runtime config. Setting them as Worker secrets does
# nothing - the strings are already baked into the JavaScript the browser got.
#
# They arrive here in .env.production, which CI writes from GitHub Actions
# variables before the build. All three end up readable in the browser anyway,
# which is why they are variables and not secrets.
#
# Fail loudly rather than build a bundle that silently points at nothing. An
# app that 404s every API call while looking perfectly healthy is the worst
# outcome available here.
RUN test -f .env.production || { \
      echo "ERROR: .env.production missing."; \
      echo "Copy .env.production.example and fill it in, or let CI write it."; \
      exit 1; \
    } \
    && grep -q '^NEXT_PUBLIC_API_URL=.\+' .env.production || { \
      echo "ERROR: NEXT_PUBLIC_API_URL is empty in .env.production."; \
      exit 1; \
    }

RUN npm run build

# -------------------------------------------------------------- runtime stage
FROM node:20-bookworm-slim AS runtime

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN apt-get update && apt-get install -y --no-install-recommends \
      libvips42 \
      curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# standalone contains server.js plus the traced node_modules. static/ and
# public/ are deliberately not traced into it, so they are copied separately -
# miss either one and the site renders with no CSS and no images.
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# next/image falls back to squoosh when sharp is absent, which works but is an
# order of magnitude slower per image. Output tracing does not reliably pick up
# sharp's native binary, so bring it over explicitly.
#
# Copied from the deps stage rather than `npm install`ed. The standalone output
# ships a package.json listing every dependency, so running npm install in this
# directory makes npm re-resolve the entire Syncfusion + MUI tree just to add
# one package - minutes of work under emulation, for a package that was already
# built in the deps stage.
COPY --from=deps /app/node_modules/sharp ./node_modules/sharp

COPY deploy/cloudflare/entrypoint.sh /entrypoint.sh
# The repo is cloned on Windows. A CRLF shebang makes Linux look for an
# interpreter literally named "bash\r" and the container dies on boot before a
# line of JavaScript runs. Same fix as the Backend image.
RUN sed -i 's/\r$//' /entrypoint.sh && chmod +x /entrypoint.sh

EXPOSE 3000

CMD ["/entrypoint.sh"]
