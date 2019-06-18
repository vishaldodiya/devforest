---
id: 20
title: 'Setup WordPress site using docker compose Part 2'
date: 2018-06-17T07:03:16+00:00
author: Vishal Dodiya
layout: post
guid: https://devforest.com/?p=20
permalink: /2018/06/17/setup-wordpress-site-using-docker-compose-part-2/
image: /wp-content/uploads/2018/06/ilya-pavlov-87438-unsplash-825x510.jpg
categories:
  - Tech
tags:
  - Docker
  - Docker Compose
  - GCP
  - WordPress
---
This is Part 2 of setting up a WordPress site using docker compose. [Part 1](https://devforest.com/2018/06/06/setup-wordpress-site-on-google-compute-platform-gcp-using-docker-compose/) covers some details regarding GitHub repository ( [WP_Docker](https://github.com/vishaldodiya/WP_Docker/blob/master/docker-compose.yml) ) directory structure. In this part, we will deep dive into [Docker Compose](https://github.com/vishaldodiya/WP_Docker/blob/master/docker-compose.yml) file included in Github Repository.

We will check [Docker Compose](https://github.com/vishaldodiya/WP_Docker/blob/master/docker-compose.yml) file service by service. There are three main services (Database, PHP, Nginx ) needed to start the WordPress site and Phpmyadmin is optional.

**1. Database: **

<pre>db:
    image: mysql:5.7
    restart: always
    volumes:
      - "./app/db:/var/lib/mysql"
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD
      - MYSQL_DATABASE
      - MYSQL_USER
      - MYSQL_PASSWORD
    networks:
     - site-network</pre>

Here we are using Mysql 5.7 image which the stable one. We have mounted MySQL data to out host directory to make the volume persistent otherwise whenever you restart the container our data will be gone. The port is mapped to use the functionality from the host so we have mapped container 3306 port with Host&#8217;s 3306 port. We can customize MySQL configuration using environment variables like root password and database name etc. This environment variables are fetched by docker-compose file from the **.env** file in the same directory as docker-compose.yml. In [WP_Docker](https://github.com/vishaldodiya/WP_Docker) I have included one **.env.example** file.

<pre>MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=wordpress
MYSQL_USER=wordpress
MYSQL_PASSWORD=password

WORDPRESS_DB_HOST=db
VIRTUAL_HOST=example.com</pre>

We can specify password or hostname etc for using environment variables in containers. So this is an example file, to use those environment variables we need to move the file to .env named file.

**2. PHP:**

<pre>php:
    build:
      context: ./config/php-fpm/
    links:
      - db:mysql
    restart: always
    ports:
      - "9000:9000"
    volumes:
      - "./app/src:/var/www/html"
      - "./config/php-fpm/php.ini:/usr/local/etc/php/php.ini"
      - "./config/php-fpm/composer.json:/var/www/html/composer.json"
      - "./config/php-fpm/www.conf:/usr/local/etc/php-fpm.d/www.conf"
    environment:
      - WORDPRESS_DB_HOST
      - WORDPRESS_DB_USER=${MYSQL_USER}
      - WORDPRESS_DB_PASSWORD=${MYSQL_PASSWORD}
    networks:
     - site-network</pre>

Same as database service It has been mapped to host 9000 port so server (Nginx) can listen to PHP service. We are mapping **./app/src** from container&#8217;s **/var/www/html. **Here app/src folder will be created when we start the container means the image we are using rtcamp[/](https://hub.docker.com/r/rtcamp/wordpress/)wordpress include all WordPress core files in /var/www/html folder and that folder is mapped in host ./app/src folder. The New thing in this container is we are customizing image and building it again, So the docker-compose will look into context directory and look for default file named as [Dockerfile](https://github.com/vishaldodiya/WP_Docker/blob/master/config/php-fpm/Dockerfile) and build the file before running the container. Other than that we mounting some configuration files like php.ini file and www.conf files.

**3. Nginx:**

<pre>nginx:
    image: nginx:latest
    depends_on:
      - php
    restart: always
    environment:
      - VIRTUAL_HOST
      - LETSENCRYPT_HOST=${VIRTUAL_HOST}
    volumes:
      - "./app/src:/var/www/html"
      - "./config/nginx/default.conf:/etc/nginx/conf.d/default.conf"
      - "./logs/nginx:/var/log/nginx"
    networks:
     - site-network</pre>

Most of the part is same as above two services. In Nginx container we provide VIRTUAL\_HOST and LETSENCRYPTY\_HOST env variable. These variables are used by other two services like nginx-proxy and letsencrypt. Here we have not mounted any ports because we will be using ports of nginx-proxy. nginx[-proxy](https://github.com/jwilder/nginx-proxy) is a Nginx Reverse Proxy image which can take data from Nginx container and use the services. We will take a look at its configuration while running all the containers.

One parameter is common in all services is the network. so we need to connect all containers to one single network so everyone can access to ports and data.

The next [part](https://devforest.com/2018/06/18/setup-wordpress-site-using-docker-compose-part-3/) will cover details to set up and run site configurations.
