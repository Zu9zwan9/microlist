FROM node:16.13.1

WORKDIR /
COPY services/todos services/todos

WORKDIR /services/todos

RUN npm install
EXPOSE 8080
CMD npm start