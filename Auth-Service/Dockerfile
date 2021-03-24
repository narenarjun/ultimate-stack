FROM quay.io/narendev/fishnode:alpine

WORKDIR /app
ENV PORT=4000

COPY package.json .
RUN yarn install --production
COPY . .

EXPOSE ${PORT}

CMD [ "yarn","start" ]