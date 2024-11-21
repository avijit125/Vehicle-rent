# Build Stage
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json  to install dependencies
COPY package.json ./


# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the React app
RUN npm run build

# Production Stage: Use `serve` to serve the static files
FROM node:20-slim

# Install `serve` globally to serve the built React app
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy the build folder from the build stage to the current directory
COPY --from=build /app/build /app/build

# Expose port 3000 to access the app
EXPOSE 3000

# Command to serve the React app on port 3000
CMD ["serve", "-s", "build", "-l", "3000"]

