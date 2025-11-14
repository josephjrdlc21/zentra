FROM php:8.3-fpm-alpine

WORKDIR /var/www/html

# Install system dependencies
RUN apk add --no-cache \
    bash \
    curl \
    libzip-dev \
    oniguruma-dev \
    icu-dev \
    libpng-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    g++ \
    make \
    autoconf \
    imagemagick \
    imagemagick-dev \
    zlib-dev \
    file \
    re2c \
    pkgconfig \
    libxml2-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring xml zip gd intl \
    && pecl install imagick \
    && docker-php-ext-enable imagick
