---
id: 80
title: GCP instance DNS configuration steps
date: 2018-09-02T06:09:06+00:00
author: Vishal Dodiya
layout: post
guid: https://devforest.com/?p=80
permalink: /2018/09/02/gcp-instance-dns-configuration-steps/
image: /wp-content/uploads/2018/07/rawpixel-653764-unsplash-825x510.jpg
categories:
  - Tech
tags:
  - Docker
  - Docker Compose
  - GCP
  - WordPress
---
In the [last post](https://devforest.com/2018/06/28/host-wordpress-site-on-gcp-with-docker/), we configured our [WP_Docker](https://github.com/vishaldodiya/WP_Docker) setup on GCP. Now In this section, we will cover the DNS configuration on GCP.<figure class="wp-block-image">

<img src="https://devforest.com/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.00.18-PM-1024x640.png" alt="" class="wp-image-105" srcset="http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.00.18-PM-1024x640.png 1024w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.00.18-PM-300x188.png 300w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.00.18-PM-768x480.png 768w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.00.18-PM-900x563.png 900w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.00.18-PM-1280x800.png 1280w" sizes="(max-width: 1024px) 100vw, 1024px" /> </figure> 

First, go to GCP side menu bar > Network Services > Cloud DNS. After visiting that we can see the screen shown below.<figure class="wp-block-image">

<img src="https://devforest.com/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.01.07-PM-1024x640.png" alt="" class="wp-image-106" srcset="http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.01.07-PM-1024x640.png 1024w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.01.07-PM-300x188.png 300w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.01.07-PM-768x480.png 768w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.01.07-PM-900x563.png 900w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.01.07-PM-1280x800.png 1280w" sizes="(max-width: 1024px) 100vw, 1024px" /> </figure> 

Now click on Create Zone and another form will appear like shown below.<figure class="wp-block-image">

<img src="https://devforest.com/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.02.02-PM-1024x640.png" alt="" class="wp-image-107" srcset="http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.02.02-PM-1024x640.png 1024w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.02.02-PM-300x188.png 300w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.02.02-PM-768x480.png 768w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.02.02-PM-900x563.png 900w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.02.02-PM-1280x800.png 1280w" sizes="(max-width: 1024px) 100vw, 1024px" /> </figure> 

In this form, we need to fill zone name which can be anything, then DNS name, which will be your domain name and then we are good to go. Click on create.<figure class="wp-block-image">

<img src="https://devforest.com/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.03.19-PM-1024x640.png" alt="" class="wp-image-109" srcset="http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.03.19-PM-1024x640.png 1024w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.03.19-PM-300x188.png 300w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.03.19-PM-768x480.png 768w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.03.19-PM-900x563.png 900w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-07-at-10.03.19-PM-1280x800.png 1280w" sizes="(max-width: 1024px) 100vw, 1024px" /> </figure> 

As we can see It will generate Nameserver records. These nameserver records are used in your domain registrars nameserver records.<figure class="wp-block-image">

<img src="https://devforest.com/wp-content/uploads/2018/09/Screen-Shot-2018-07-08-at-2.14.09-PM-1024x640.png" alt="" class="wp-image-110" srcset="http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-08-at-2.14.09-PM-1024x640.png 1024w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-08-at-2.14.09-PM-300x188.png 300w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-08-at-2.14.09-PM-768x480.png 768w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-08-at-2.14.09-PM-900x563.png 900w, http://my.loc/wp-content/uploads/2018/09/Screen-Shot-2018-07-08-at-2.14.09-PM-1280x800.png 1280w" sizes="(max-width: 1024px) 100vw, 1024px" /> </figure> 

Now, we need to create two more records to point our DNS to the server. As you can see in the image after clicking add new record button we can see this page. Fill up the required details DNS name will be your domain name, First, we are generating an entry for A type record so set Resource record type to A and add your Instance IP ( As we have generated in the [last post](https://devforest.com/2018/06/28/host-wordpress-site-on-gcp-with-docker/) ) in server IP&nbsp;box and click Create. The second&nbsp;record will be CNAME record, so set Resource record type as CNAME and add your domain name with canonical URL www.domain.com in the canonical name section and click create. Now these two A and CNAME records are needs to be added on your domain registrars DNS records as well. After doing that we have completed our DNS configuration and now you can check that your domain will point to your server.