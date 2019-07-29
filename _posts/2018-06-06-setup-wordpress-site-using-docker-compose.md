---
id: 10
title: Setup WordPress site using docker compose
date: 2018-06-06T19:56:40+00:00
author: Vishal Dodiya
layout: post
guid: https://devforest.com/?p=10
permalink: /2018/06/06/setup-wordpress-site-using-docker-compose/
has_gist: false
categories:
  - Tech
tags:
  - Docker
  - Docker Compose
  - GCP
  - WordPress
---
<p style="text-align: left;">
  <span style="font-weight: 400;">This will cover all steps to set up a full WordPress site using a docker-compose file. Some basic knowledge of docker will be great. We will cover everything in parts so this is the first part of a process. In this part, we will see the directory structure of the current GitHub repo <a href="https://github.com/vishaldodiya/WP_Docker">WP_Docker</a>.</span>
</p>

<pre>.
├── app
├── config
│   ├── nginx
│   │   ├── custom_proxy_settings.conf
│   │   └── default.conf
│   └── php-fpm
│       ├── Dockerfile
│       ├── composer.json
│       ├── php.ini
│       └── www.conf
├── docker-compose.yml
├── logs
│   └── nginx
│       ├── access.log
│       └── error.log
└── setup.sh</pre>

First and the most important file is a docker-compose.yml file. So docker-compose yml file is used to define multiple Docker containers and use them together with a single common file. Then we have config folder which contains configurations of Nginx and PHP container.

In Nginx, we have **default.conf** for server configuration which includes all types of configuration of the site including where the root directory and etc. There is one **custom\_proxy\_settings.conf** which is used in a nginx-proxy container we will take a look at it in detail when we are ready to run all container.

In Php-Fpm, We have **Dockerfile** it has some extra customization over a standard PHP image. So In that Dockerfile, I have used rtcamp[/](https://hub.docker.com/r/rtcamp/wordpress/)wordpress image. so they have configured PHP image with WordPress and also installs wp-cli. Other than that there is some extra configuration file like **php.ini** and **www.conf** to customize PHP configs.

Other two directories **app** and **logs** are empty. the data will be mounted into those folders once we start all containers.

So **setup.php** have series of commands required to run all the containers.

This is the directory structure of repository and we will cover each file and configurations in next [part](https://devforest.com/2018/06/17/setup-wordpress-site-on-gcp-using-docker-compose-part-2/).