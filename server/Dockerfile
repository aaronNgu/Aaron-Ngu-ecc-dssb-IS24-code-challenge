# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:14.17.3
# Set the working directory to /server
WORKDIR /server
# copy package.json into the container at /server
COPY package*.json /server/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /server
COPY . /server/
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "run", "start"]
