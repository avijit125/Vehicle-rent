# Use the official Node.js image
FROM node:20

# Install OpenSSL and any other dependencies
RUN apt-get update -y && apt-get install -y openssl

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./ 

# Install all dependencies (including dev dependencies for TypeScript compilation)
RUN npm install

# Copy the source code to the container
COPY . .

# Build the TypeScript application
RUN npx tsc


# Expose the application port
EXPOSE 5000

# Set the command to run the application
CMD ["node", "dist/app.js"]
