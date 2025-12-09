---
title: Estimating Resources in System Design
description: A few notes I took when following the Grokking Modern System Design for Engineers and Managers course
createdAt: '01/20/2023'

slug: system-design-estimating-resources
tags: ['system design']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'system design'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2024 Juan Labrada'
    - name: 'publish'
      content: '09/06/2024'
---

# How can we estimate peak load

Using the pareto rule and assuming that 80% of our peak traffic comes within 20% of the time (around 5 hours every 24 hours)
This should be taken with a grain of salt since in that 5 hours span the traffic might not come evenly distributed. So, we should add monitoring to actually size the required number of servers.


# What to do if the load gets higher than predicted

We can use techniques like:
- load-shedding
- circuit-breakers
- throttling

# How can we estimate the cost of required servers?
 Using an EC2 instance as an example 'm7i.16xlarge' with 64 CPUs, 265 GB memory, Network Bandwidth of 25Gbps and EBS Bandwidth of 20Gbps, and as storage EBS-Only, which has a cost approximatly of $3.55 an hour.

 a 2 servers configuration would require $7.09/hour
 an 8 servers configuration would require $28.38/hour
 and 157K servers configuration would require $557,061.00/hour

# How can we estimate the required storage?

We need to consider the size of the request, the number of request per day, and then estimate the require storage per year.
For the tweeter example:
- 1 tweet 250 bytes
- 1 image 200 kb
- 1 video 3 Mb
- 10% of tweets contain images
- 5% of tweets contain videos
- Each user posts 3 tweets a day
- And there are 500M daily active users.

Average tweet size is 0.250 + 200kb/10 + 3000kb/20 (20 = 5%) = 0.250kb + 20kb + 150kb = 170.250kb each tweet.
Average 510.750kb per user daily
Average 500M * 510.75Kb daily ~~ 255TB.
Average 255TB * 365 = 93.08 PB per year.

# How can we estimate the required bandwidth?

In order to estimate the bandwidth requirements for a service, we use the following steps:

- Estimate the daily amount of incoming data to the service.
- Estimate the daily amount of outgoing data from the service.
- Estimate the bandwidth in Gbps (Gigabits per second) by dividing the incoming and outgoing data by the number of seconds in a day.

It is important to notice that the bandwidth is given in bits and not in bytes which means that the final number must be multiplied by 8 (the number of bits in a byte)

For the tweeter example, assuming each user sees 50tweets/day.

Incoming traffic = 255Gb * 8 bits/86400 seconds = 24Gbps
Outgoing traffic = 393.62 Gbps

Which totals 417Gbps


