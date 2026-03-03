# Use official lightweight Node image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the backend source code
COPY . .

# Expose backend port
EXPOSE 4000

# Start the server
CMD ["npm", "run", "start:docker"]