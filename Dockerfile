FROM richarvey/nginx-php-fpm:php8.3-latest

COPY . .

ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr

ENV COMPOSER_ALLOW_SUPERUSER 1

USER root
RUN apk update && apk add --no-cache curl && \
    curl -fsSL https://unofficial-builds.nodejs.org/download/release/v20.18.1/node-v20.18.1-linux-x64-musl.tar.xz -o node.tar.xz && \
    tar -xJf node.tar.xz -C /usr/local --strip-components=1 && \
    rm node.tar.xz && \
    node -v && npm -v

CMD ["/start.sh"]