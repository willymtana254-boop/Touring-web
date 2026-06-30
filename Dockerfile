FROM php:8.4-fpm-alpine AS base

RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    git \
    unzip \
    sqlite \
    sqlite-dev \
    libpng-dev \
    libxml2-dev \
    oniguruma-dev \
    zip \
    bash \
    nodejs \
    npm \
    && docker-php-ext-install pdo pdo_sqlite mbstring exif pcntl bcmath gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction

RUN npm install && npm run build

RUN touch database/database.sqlite

RUN (php artisan storage:link || true)

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database

COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisord.conf

EXPOSE 80

CMD php artisan config:cache && php artisan route:cache && php artisan view:cache && php artisan migrate --force && supervisord -c /etc/supervisord.conf