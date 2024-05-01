# using the node-based environment
from node:16-alpine

# change working directory to /app
WORKDIR /app 

# copy all the codes to the working directory
COPY . /app

# run the application on port 8080
EXPOSE 3000

# install all the required dependencies on our docker container
RUN npm install

# tell our application the command needed to run the application
CMD node server.js