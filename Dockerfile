# Use official Node.js image as base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

FROM node:18-alpine

# Add the wait-for-it script
RUN apt-get update && apt-get install -y wget
RUN wget https://github.com/vishnubob/wait-for-it/releases/download/v2.4.3/wait-for-it.sh -O /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

WORKDIR /app
COPY . .

RUN npm install

CMD ["./wait-for-it.sh", "postgres_db:5432", "--", "npm", "run", "dev"]

RUN npm install
RUN npx prisma generate

