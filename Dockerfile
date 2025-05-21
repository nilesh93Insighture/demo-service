# Use the official Node.js LTS (Long Term Support) image based on Debian Buster
FROM node:lts-buster

# Set the working directory in the container
WORKDIR /app

# Copy all files from the current directory to the container
COPY . .

# Install project dependencies
RUN npm install

# Expose port 3000 for the application
EXPOSE 3000

# Start the application using Node.js
CMD ["node", "index.js"]
