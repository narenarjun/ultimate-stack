FROM quay.io/narendev/fishnode:alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

# RUN yarn build 

EXPOSE 3001

CMD ["yarn","dev"]