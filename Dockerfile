FROM php:8.4-fpm-alpine AS base

RUN apk add --no-cache nginx nodejs npm git zip unzip curl
RUN docker-php-ext-install pdo pdo_sqlite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN npm install && npm run build

RUN touch database/database.sqlite

RUN cp .env.example .env && \
    sed -i 's|APP_URL=http://localhost|APP_URL=https://touring-web-1.onrender.com|g' .env && \
    sed -i 's|APP_ENV=local|APP_ENV=production|g' .env && \
    sed -i 's|APP_DEBUG=true|APP_DEBUG=false|g' .env

RUN php artisan key:generate
RUN php artisan storage:link
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

RUN chmod -R 775 storage bootstrap/cache

EXPOSE 8080

CMD php artisan serve --host=0.0.0.0 --port=8080