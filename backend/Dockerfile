# backend/Dockerfile
# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Make your app's port available to the outside world
EXPOSE 5001

# Define the command to run your app
CMD [ "node", "server.js" ]
