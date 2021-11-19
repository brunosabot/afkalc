FROM node:alpine
COPY package.json .
COPY package-lock.json .
RUN npm
COPY . .
RUN npm build
EXPOSE 8080
CMD npm start -p 8080
