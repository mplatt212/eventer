FROM node:alpine

EXPOSE 3000

WORKDIR /app

COPY package*.json .

RUN apk update && apk add mysql-client

RUN npm install && npm install nodemon -g

COPY . .

#ENTRYPOINT [ "nodemon", "--legacy-watch", "--inspect=0.0.0.0", "./api_main.js"]

CMD ["npm", "start"]