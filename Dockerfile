# Use a lightweight base image for serving static files
FROM nginx:alpine

# Copy your static files into the Nginx web server directory
COPY . .

# Expose port 80, which Nginx listens on by default
EXPOSE 80

# Command to start Nginx, which serves the static files
CMD ["nginx", "-g", "daemon off;"]