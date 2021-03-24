FROM node:lts-alpine

WORKDIR /app
ENV PORT=4002


COPY package.json .
RUN yarn install --production
COPY . .

EXPOSE ${PORT}

CMD [ "yarn","start" ]