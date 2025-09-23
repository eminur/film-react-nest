# С помощью директивы AS можно дать образу имя
FROM node:20-alpine AS build
WORKDIR /var/www/app
COPY package*.json ./
# Устанавливаем зависимости
RUN npm install
# Копируем исходный код и собираем приложение
COPY . .
RUN npm run build