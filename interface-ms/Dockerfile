FROM node:16
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available ([email protected]+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "serve" ]