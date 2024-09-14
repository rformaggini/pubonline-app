FROM node:alpine3.18
WORKDIR /app
COPY . .
RUN npm install
RUN npm install @angular/cli -g
EXPOSE 4200
CMD [ "ng", "serve", "--host", "0.0.0.0" ]
