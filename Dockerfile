FROM node:18

# Install Git explicitly
RUN apt-get update && apt-get install -y git

# Set working directory to match GitHub Codespaces mount point
WORKDIR /workspaces/express-ejs-sp25-week9-lesson-plan

# Expose port for HTTP server
EXPOSE 3000
