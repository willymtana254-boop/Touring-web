FROM php:8.4-fpm-alpine AS base

# Install system dependencies, nginx, supervisor, Node, and PHP extensions
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

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy application code
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Install Node dependencies and build frontend assets
RUN npm install && npm run build

# Laravel setup (cache config/routes/views, link storage)
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \
    && (php artisan storage:link || true)

# Permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Nginx config
COPY docker/nginx.conf /etc/nginx/http.d/default.conf

# Supervisor config (runs nginx + php-fpm together)
COPY docker/supervisord.conf /etc/supervisord.conf

EXPOSE 80

CMD php artisan migrate --force; supervisord -c /etc/supervisord.conf