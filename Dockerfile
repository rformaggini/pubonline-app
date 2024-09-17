FROM node:alpine3.18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build


FROM nginx:alpine
COPY --from=builder /app/dist/pubonline-app/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./mime.types /etc/nginx/mime.types
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]