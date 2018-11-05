# Use an official Python runtime as a parent image
FROM node:10.8.0-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
RUN npm install

COPY ./node_modules/oauth/lib/oauth2.js /app/node_modules/oauth/lib/oauth2.js
# Make port 80 available to the world outside this container
EXPOSE 8080

# Define environment variable
# ENV apiURI https://navinfraqapi.azurewebsites.net/api/registerApp-PS?code=9Rcyd6Jg4nU1NVwG/u5o7/osIdnqUAX24cRjyLyO7dadoPYY2xicIw==

# Run app.py when the container launches
CMD ["npm", "start"]