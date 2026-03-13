FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY angular.json tsconfig*.json ./
COPY projects ./projects

RUN npm install

RUN npm run build carrito -- --configuration=production

FROM nginx:1.27-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY projects/carrito/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/carrito /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
