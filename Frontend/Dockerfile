FROM quay.io/narendev/fishnode:alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build 

EXPOSE 3002

CMD ["yarn","start"]