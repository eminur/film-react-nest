# Стадия сборки
FROM node:20-alpine AS builder
WORKDIR /var/www/app

# Установка зависимостей
COPY package*.json ./
RUN npm install

# Копируем всё (включая public!)
COPY . .   

# Сборка
RUN npm run build

# Финальный образ
FROM node:20-alpine AS prod
WORKDIR /var/www/app

# Копируем только нужное из builder
COPY --from=builder /var/www/app/dist ./dist
COPY --from=builder /var/www/app/public ./public
COPY --from=builder /var/www/app/package*.json ./

RUN npm install --production

CMD ["node", "./dist/main.js"]
EXPOSE 3000
