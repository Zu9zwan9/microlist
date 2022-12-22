FROM node:16.13.1
WORKDIR /services/todos
COPY services/todos/package*.json ./
RUN npm install
COPY services/todos ./
EXPOSE 8080
CMD ["npm", "start"]
