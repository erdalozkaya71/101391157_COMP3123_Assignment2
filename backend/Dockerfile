# Use an official Node.js runtime as a parent image
FROM node:latest
LABEL version="1.0" 
LABEL maintainer="Erdal Ozkaya <erdalozkaya@yahoo.com>"
LABEL description="NodeJS, Express, ReactJS, MongoDB and Docker containerized backend for the MERN stack application."
# Set the working directory to /app
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install any needed dependencies
RUN npm install
# Copy the rest of the application code to the working directory
COPY . .
# Expose port 8089 for the app to listen on
EXPOSE 3001
# Start the app
CMD ["npm", "start"]
