FROM node:14
# Create app directory
WORKDIR /usr/src/app/server
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
EXPOSE 3030
CMD [ "node", "index.js" ]
