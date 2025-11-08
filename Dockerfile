# syntax=docker/dockerfile:1

# Stage 1: Dependencies
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install Bun
RUN npm install -g bun

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies with Bun
RUN bun install --frozen-lockfile

# Stage 2: Builder
FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN npm install -g bun
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Remove Cosmos files that cause build issues
RUN rm -rf cosmos.imports.ts cosmos.config.json components/__fixtures__ app/cosmos || true

# Use Docker-specific config without Lingo
RUN cp next.config.docker.js next.config.js

# Use Docker-friendly API route for send endpoint
RUN cp app/api/send/route.docker.ts app/api/send/route.ts || true

# Build the application
RUN bun run build

# Stage 3: Runner
FROM node:22-alpine AS runner
WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy public directory from source (it contains static assets)
COPY --chown=nextjs:nodejs public ./public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => process.exit(1))"

# Start the application
CMD ["node", "server.js"]