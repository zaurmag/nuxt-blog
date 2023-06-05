# Используем официальный образ Node.js
FROM node:16-alpine

# Устанавливаем директорию приложения в контейнере
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем все файлы проекта в контейнер
COPY . .

# Устанавливаем порт
ENV PORT=3000

EXPOSE $PORT

# Запускаем команду для запуска приложения
CMD ["npm", "start"]
