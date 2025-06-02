FROM node:18

# Install Git, MongoDB, and curl for testing
RUN apt-get update && apt-get install -y git mongodb curl

# Install Mongo Express globally via npm
RUN npm install -g mongo-express

# Set working directory
WORKDIR /workspace

# Copy your app code into the container
COPY . .

# Install Node dependencies
RUN npm install

# Expose application ports
EXPOSE 3000 27017 8081

# Start MongoDB, Mongo Express, and your app
CMD mongod --fork --logpath /var/log/mongodb.log && \
    mongo-express --url mongodb://localhost:27017 & \
    npm start
