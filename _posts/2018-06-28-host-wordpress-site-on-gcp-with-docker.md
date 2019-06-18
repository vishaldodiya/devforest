---
id: 52
title: Host WordPress site on GCP with Docker
date: 2018-06-28T07:39:53+00:00
author: Vishal Dodiya
layout: post
guid: https://devforest.com/?p=52
permalink: /2018/06/28/host-wordpress-site-on-gcp-with-docker/
image: /wp-content/uploads/2018/06/marten-bjork-474033-unsplash-825x510.jpg
categories:
  - Tech
tags:
  - Docker
  - Docker Compose
  - GCP
  - WordPress
---
Hey There. Now we are moving ahead with our set up of the WordPress site. In this Post, we will cover the part of server configurations. We will be configuring our server on GCP (Google Cloud Platform) Using Docker Compose configuration we have done in previous [posts](https://devforest.com/2018/06/06/setup-wordpress-site-using-docker-compose/). The post will mostly focus on GCP overview and configuration of the instance and install dependencies for installing [WP_Docker](https://github.com/vishaldodiya/WP_Docker).

To configure an instance on GCP we need GCP access. One can use GCP&#8217;s 12 Month trial version for beginning and experiments or can check GCP [plans](https://cloud.google.com/pricing/list) as per the services. After getting GCP console we are ready to set up one VM instance.

<img class="alignnone wp-image-66" src="https://devforest.com/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.05.52-PM-300x188.png" alt="" width="945" height="592" srcset="http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.05.52-PM-300x188.png 300w, http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.05.52-PM-768x480.png 768w, http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.05.52-PM-1024x640.png 1024w" sizes="(max-width: 945px) 100vw, 945px" /> 

To create VM instance open GCP > Compute Engine > vm instance.

<img class="alignnone wp-image-67" src="https://devforest.com/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.06.20-PM-300x188.png" alt="" width="892" height="559" srcset="http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.06.20-PM-300x188.png 300w, http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.06.20-PM-768x480.png 768w, http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.06.20-PM-1024x640.png 1024w" sizes="(max-width: 892px) 100vw, 892px" /> 

To create new instance click **Create Instance** and you need to fill up configuration details.

<img class="alignnone wp-image-68" src="https://devforest.com/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.06.37-PM-300x188.png" alt="" width="839" height="526" srcset="http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.06.37-PM-300x188.png 300w, http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.06.37-PM-768x480.png 768w" sizes="(max-width: 839px) 100vw, 839px" /> 

Fill up the details like instance name, region etc. One can change VM boot disk by clicking Change in book disk box. There will be list of Boot disks like shown below. We will use **Ubuntu 16.04 LTS.**

<img class="alignnone wp-image-69" src="https://devforest.com/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.06.47-PM-300x188.png" alt="" width="825" height="517" srcset="http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.06.47-PM-300x188.png 300w, http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.06.47-PM-768x480.png 768w, http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.06.47-PM-1024x640.png 1024w" sizes="(max-width: 825px) 100vw, 825px" /> 

Select Ubuntu 16.04 LTS and click **Select**.

<img class="alignnone wp-image-70" src="https://devforest.com/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.07.01-PM-300x188.png" alt="" width="795" height="498" srcset="http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.07.01-PM-300x188.png 300w, http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.07.01-PM-768x480.png 768w, http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.07.01-PM-1024x640.png 1024w" sizes="(max-width: 795px) 100vw, 795px" /> 

Click **Create** to initialize the instance. The instance will be started in few minutes and one can check the instance status like below.

<img class="alignnone wp-image-71" src="https://devforest.com/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.07.14-PM-300x188.png" alt="" width="769" height="482" srcset="http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.07.14-PM-300x188.png 300w, http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.07.14-PM-768x480.png 768w, http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.07.14-PM-1024x640.png 1024w" sizes="(max-width: 769px) 100vw, 769px" /> 

Now our instance is ready to configure [WP_Docker](https://github.com/vishaldodiya/WP_Docker) and install dependencies. To access VM instance click ssh to login to ssh into the instance. It will open a popup menu and give access to the instance.

<img class="alignnone wp-image-72" src="https://devforest.com/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.14.49-PM-300x188.png" alt="" width="852" height="534" srcset="http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.14.49-PM-300x188.png 300w, http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.14.49-PM-768x480.png 768w, http://my.loc/wp-content/uploads/2018/06/Screen-Shot-2018-06-24-at-3.14.49-PM-1024x640.png 1024w" sizes="(max-width: 852px) 100vw, 852px" /> 

Now we are inside out instance so we need to install few dependencies because instance does not have docker and docker-compose pre-installed. To install docker check follow this [steps](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-convenience-script). After installing docker install Docker-compose by following this [steps](https://docs.docker.com/compose/install/#install-compose).

Confirm Docker and docker-compose by running below commands.

<pre>$ docker -v</pre>

<pre><span class="s1">$ docker-compose -v
</span></pre>

If everything is Ok then we can move to next step to install over [WP_Docker](https://github.com/vishaldodiya/WP_Docker).

Run this series of commands.

<pre>$ git clone git@github.com:vishaldodiya/WP_Docker.git</pre>

( this will need ssh setup on GitHub or you can use Http link )

<pre>$ cd WP_Docker</pre>

<pre>$ cp .env.example .env</pre>

in .env file one can change a MySQL password, database name and virtual hostname that will be required for configuration. Now we are good to run the setup file.

<pre>$ bash setup.sh</pre>

After successfully running all this commands our all docker containers will be started. Now to access our site and access from the domain name and DNS configurations will be covered in [next post](https://devforest.com/2018/09/02/gcp-instance-dns-configuration-steps/).