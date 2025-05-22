# Use the official Node.js LTS (Long Term Support) image based on Debian Buster
# This provides a stable base for running Node.js applications
FROM node:lts-buster

# Set the working directory in the container
# All subsequent commands will be run from this directory
WORKDIR /app

# Copy all files from the current directory to the working directory in the container
# This includes package.json, source code, and other necessary files
COPY . .

# Install all dependencies defined in package.json
# This creates the node_modules directory with all required packages
RUN npm install

# Expose port 3000 to allow external access to the application
# Note: This is a documentation instruction and doesn't actually publish the port
EXPOSE 3000

# Define the command to run the application
# Uses node to execute index.js when the container starts
CMD ["node", "index.js"]
