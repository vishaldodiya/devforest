---
id: 35
title: 'Setup WordPress site using docker compose Part 3'
date: 2018-06-18T07:54:51+00:00
author: Vishal Dodiya
layout: post
guid: https://devforest.com/?p=35
permalink: /2018/06/18/setup-wordpress-site-using-docker-compose-part-3/
has_gist: false
categories:
  - Tech
tags:
  - Docker
  - Docker Compose
  - GCP
  - WordPress
---
We have come to last part of setting up WordPress using docker compose. In this part, we will cover how to run all containers to get a fully working site. If you missed the last two parts ( [Part 1](https://devforest.com/2018/06/06/setup-wordpress-site-using-docker-compose/), [Part 2](https://devforest.com/2018/06/17/setup-wordpress-site-using-docker-compose-part-2/) ) then you can take a look to get more detail. For GitHub Repo check [WP_Docker](https://github.com/vishaldodiya/WP_Docker). I have created one setup file in very GitHub repo which includes series of commands to start WordPress site using docker compose.

<pre>export $(xargs &lt;.env)

docker network create $VIRTUAL_HOST

docker run --name nginx-proxy --restart always -d -p 80:80 -p 443:443 \
    -v ~/.ee4/etc/nginx/certs:/etc/nginx/certs \
    -v ~/.ee4/etc/nginx/conf.d:/etc/nginx/conf.d \
    -v ~/.ee4/etc/nginx/htpasswd:/etc/nginx/htpasswd \
    -v ~/.ee4/etc/nginx/vhost.d:/etc/nginx/vhost.d \
    -v ~/.ee4/usr/share/nginx/html:/usr/share/nginx/html \
    -v /var/run/docker.sock:/tmp/docker.sock:ro \
    -v $(pwd)/config/nginx/custom_proxy_settings.conf://etc/nginx/conf.d/custom_proxy_settings.conf \
    jwilder/nginx-proxy

docker run -d --name letsencrypt \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    --volumes-from nginx-proxy \
    jrcs/letsencrypt-nginx-proxy-companion

docker network connect $VIRTUAL_HOST nginx-proxy
docker network connect $VIRTUAL_HOST letsencrypt

docker-compose up -d

docker logs nginx-proxy -f</pre>

Let&#8217;s take a look at this file ( [setup.sh](https://github.com/vishaldodiya/WP_Docker/blob/master/setup.sh) ) and all the series of commands.

<pre>export $(xargs &lt;.env)</pre>

The first command is to export all the **.env** file variables into a current shell script so we can use those same variables inside script also.

<pre>docker network create $VIRTUAL_HOST</pre>

The second command is to create a network inside docker which is needed to attach one service to another docker service means it will be needed to connect all the containers/services to a single network.

<pre>docker run --name nginx-proxy --restart always -d -p 80:80 -p 443:443 \
    -v ~/.ee4/etc/nginx/certs:/etc/nginx/certs \
    -v ~/.ee4/etc/nginx/conf.d:/etc/nginx/conf.d \
    -v ~/.ee4/etc/nginx/htpasswd:/etc/nginx/htpasswd \
    -v ~/.ee4/etc/nginx/vhost.d:/etc/nginx/vhost.d \
    -v ~/.ee4/usr/share/nginx/html:/usr/share/nginx/html \
    -v /var/run/docker.sock:/tmp/docker.sock:ro \
    -v $(pwd)/config/nginx/custom_proxy_settings.conf://etc/nginx/conf.d/custom_proxy_settings.conf \
    jwilder/nginx-proxy</pre>

This command will create Nginx Reverse Proxy container. We have not included this container inside docker-compose because we are not going to stop this container and it can be used with other Nginx instances (for more detail check nginx[-proxy](https://github.com/jwilder/nginx-proxy) ). Here one configuration file is included **custom\_proxy\_settings.conf** which is needed for some custom configuration on the server. So I came across with one error while uploading images in wp-admin having a size of more than 2MB. The error is about the file upload limit but in Nginx configuration, we have a parameter for upload file size ( **client\_max\_body_size 100m; )** but that configuration was not affecting because nginx-proxy was running and nginx-proxy creates its own configuration file for the current server. So to bypass this error we can include configuration like this parameter ( **client\_max\_body_size 100m; )** in conf file to override default configurations.

<pre>docker run -d --name letsencrypt \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    --volumes-from nginx-proxy \
    jrcs/letsencrypt-nginx-proxy-companion</pre>

This command is an optional command. Its used to create SSL certificate for our site, it takes volumes from nginx-proxy and creates certificates as per the configurations in nginx-proxy. For more detail check [Letsencrypt](https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion).

<pre>docker network connect $VIRTUAL_HOST nginx-proxy
docker network connect $VIRTUAL_HOST letsencrypt

docker-compose up -d

docker logs nginx-proxy -f</pre>

These are the last commands. First, 2 commands will connect nginx-proxy and letsencrypt container with docker network. The third command will run docker compose configuration means run all containers which are configured in docker-compose.yml file and the last command is to display logs.

So now we can run all this command by typing this command in terminal.

<pre>bash setup.sh</pre>

It will create all the services and containers and connect everything and we are ready to access our WordPress site.
