---
title: Reliability
description: What is reliability? How it is measured?
createdAt: '09/18/2024'

slug: system-design-reliability
tags: ['system design']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'system design, reliability'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2024 Juan Labrada'
    - name: 'publish'
      content: '09/18/2024'
---

# What is reliability?

Reliability is the probability that a service will perform its functions for a specified period of time. Reliability measures how the service performs under varying operating conditions.

It can be, commonly, measured using metrics like mean time between failures (MTBF) and mean time to repair(MTTR)

# How is reliability measured?

```
         Total Elapsed Time - Sum of Downtime
MTBF =  -------------------------------------
               Total number of Failures


            Total Maintenance Time 
MTTR =  -----------------------------
            Total Number of Repairs
```

# It's all about service level

Reliability and availability are two important metrics to measure compliance of service to agreed-upon service level objectives (SLO).

The goal is to have a service that is available when needed and that users can reliable trust.
The more failures and repairs of the service the less time it is available. So, both metrics work together to measure how good a service is.


<img src="https://picsum.photos/id/1028/400/400" alt="a forest after an apocalypse" data-v-f0e173a9="">
<img src="https://picsum.photos/id/15/400/400" alt="a waterfall and many rocks" data-v-f0e173a9="">
<img src="https://picsum.photos/id/106/400/400" alt="sime pink flowers" data-v-f0e173a9="">