# Stage 1: Build
FROM node:18 AS build-stage

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy all frontend source code
COPY . .

# Build Vue app
RUN npm run build

# Stage 2: Production (serve with Nginx)
FROM nginx:latest

# Copy built Vue app to Nginx directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Replace default Nginx config with our own
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]