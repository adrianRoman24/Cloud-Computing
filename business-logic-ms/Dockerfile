FROM node:18-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm ci --only=production

CMD [ "node", "src/index.js" ]