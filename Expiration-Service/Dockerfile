FROM quay.io/narendev/fishnode:alpine

WORKDIR /app

COPY package.json .
RUN yarn install --production
COPY . .

CMD [ "yarn","start" ]