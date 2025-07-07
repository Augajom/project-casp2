FROM node:18

WORKDIR /app

# Copy backend code
COPY . .

# Install dependencies
RUN npm install

# Expose backend port
EXPOSE 5000

# Run the backend
CMD ["npm", "run", "start"]