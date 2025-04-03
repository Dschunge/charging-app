# Multi-stage build for Next.js application

# Build stage
FROM node:lts-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else npm i; \
  fi

# Copy application code
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build the application
RUN npm run build

# Production stage
FROM node:lts-alpine AS runner
WORKDIR /app

# Install production dependencies only
RUN apk add --no-cache dumb-init

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3100

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy built application from builder stage
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the port the app will run on
EXPOSE 3100

# Set host to listen on all network interfaces
ENV HOST 0.0.0.0

# Start the application
CMD ["dumb-init", "node", "server.js"]
