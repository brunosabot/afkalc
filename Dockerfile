FROM node:alpine
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY public ./public
COPY src ./src
RUN yarn build

FROM nginx:alpine
COPY --from=0 build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/other.conf /etc/nginx/conf.d/other.conf