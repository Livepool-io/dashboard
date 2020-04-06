# build stage
FROM node:lts-alpine as build-stage
ARG base_url
WORKDIR /
COPY . ./
RUN npm install
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]