FROM node:16

WORKDIR /usr/src/literacritico

COPY package*.json /usr/src/literacritico/

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "app.js" ]


