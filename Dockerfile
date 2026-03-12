# --- STAGE 1: Build ---
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- STAGE 2: Runtime ---
FROM node:24-alpine AS prod
ARG VERSION=latest
LABEL version=$VERSION

WORKDIR /app
ENV NODE_ENV=production

# Create the directories first as root
RUN mkdir -p /app/logs /app/meta /app/seed

COPY package*.json ./
# Use --omit=dev for modern npm versions
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist

# Give 'node' user ownership of the app directory
RUN chown -R node:node /app

# Now switch to the non-root user
USER node

EXPOSE 3000
CMD ["node", "dist/main.js"]