# --- STAGE 1: Build ---
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# This runs: nest build && copyfiles ... dist/
RUN npm run build

# --- STAGE 2: Runtime ---
FROM node:24-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

# Only production dependencies to keep the image small
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy the entire dist folder (which contains your compiled code + extras)
COPY --from=build /app/dist ./dist

RUN mkdir -p /app/logs && chown -R node:node /app

# Security: Run as non-root user
USER node

EXPOSE 3000

# Start using your package.json script
CMD ["npm", "run", "start:prod"]

# # BUILD
# FROM node:24-alpine AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build

# # PROD
# FROM node:24-alpine AS prod
# ENV NODE_ENV=production
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --only=production && npm cache clean --force
# COPY --from=build /app/dist ./dist
# USER node
# EXPOSE 3000
# CMD ["node", "dist/main.js"]