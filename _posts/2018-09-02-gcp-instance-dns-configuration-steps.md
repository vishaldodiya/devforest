---
id: 80
title: GCP instance DNS configuration steps
date: 2018-09-02T06:09:06+00:00
author: Vishal Dodiya
layout: post
guid: https://devforest.com/?p=80
permalink: /2018/09/02/gcp-instance-dns-configuration-steps/
has_gist: false
categories:
  - Tech
tags:
  - Docker
  - Docker Compose
  - GCP
  - WordPress
---
In the [last post](https://devforest.com/2018/06/28/host-wordpress-site-on-gcp-with-docker/), we configured our [WP_Docker](https://github.com/vishaldodiya/WP_Docker) setup on GCP. Now In this section, we will cover the DNS configuration on GCP.

<amp-img src="/assets/Screen-Shot-2018-07-07-at-10.00.18-PM.png" width="1080" height="610" layout="responsive" alt="AMP"></amp-img>

First, go to GCP side menu bar > Network Services > Cloud DNS. After visiting that we can see the screen shown below.

<amp-img src="/assets/Screen-Shot-2018-07-07-at-10.01.07-PM.png" width="1080" height="610" layout="responsive" alt="AMP"></amp-img>

Now click on Create Zone and another form will appear like shown below.

<amp-img src="/assets/Screen-Shot-2018-07-07-at-10.02.02-PM.png" width="1080" height="610" layout="responsive" alt="AMP"></amp-img>

In this form, we need to fill zone name which can be anything, then DNS name, which will be your domain name and then we are good to go. Click on create.

<amp-img src="/assets/Screen-Shot-2018-07-07-at-10.03.19-PM.png" width="1080" height="610" layout="responsive" alt="AMP"></amp-img>

As we can see It will generate Nameserver records. These nameserver records are used in your domain registrars nameserver records.
<amp-img src="/assets/Screen-Shot-2018-07-08-at-2.14.09-PM.png" width="1080" height="610" layout="responsive" alt="AMP"></amp-img>

Now, we need to create two more records to point our DNS to the server. As you can see in the image after clicking add new record button we can see this page. Fill up the required details DNS name will be your domain name, First, we are generating an entry for A type record so set Resource record type to A and add your Instance IP ( As we have generated in the [last post](https://devforest.com/2018/06/28/host-wordpress-site-on-gcp-with-docker/) ) in server IP&nbsp;box and click Create. The second&nbsp;record will be CNAME record, so set Resource record type as CNAME and add your domain name with canonical URL www.domain.com in the canonical name section and click create. Now these two A and CNAME records are needs to be added on your domain registrars DNS records as well. After doing that we have completed our DNS configuration and now you can check that your domain will point to your server.
