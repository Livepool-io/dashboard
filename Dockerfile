# build stage
FROM node:lts-alpine as build-stage
ARG base_url
ARG geth_url
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN VUE_APP_BASE_URL=${base_url} VUE_APP_GETH_URL=${geth_url} npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]