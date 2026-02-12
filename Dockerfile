# Use a Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app
ARG REACT_APP_FAST_API
ENV REACT_APP_FAST_API=$REACT_APP_FAST_API
# Copy package.json and package-lock.json (if any) and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (e.g., 5173 for Vite, 3000 for create-react-app)
EXPOSE 3000

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
# Command to run the application (use 0.0.0.0 host for Docker compatibility)
#CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
