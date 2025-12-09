---
title: Availability
description: What is availability? How it is measured?
createdAt: '09/18/2024'

slug: system-design-availability
tags: ['system design']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'system design, availability'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2024 Juan Labrada'
    - name: 'publish'
      content: '09/18/2024'
---

# What is availability?

Availability is the percentage of time that some service or infrastructure is accessible to clients and is operated upon under normal conditions. It means that the said service functions and responds as intended during the available time.

# How is availability measured?

It is a percentage this way:
```
A = total time - amount of time the service was down
    -------------------------------------------------   x 100
             total time
```

It is common to advertize availability as number of nines:

99%       Downtime per year 3.65 days

99.9%     Downtime per year 8.76 hours

99.999%   Downtime per year 5.26 minutes

99.99999% Downtime per year 3.15 seconds


# How it is accounted for?

- The planned downtime is discounted
- You can counted for each client independently
- You can start counting it when the client starts using the service.
- Te downtime due to cyberattacks might be or might not be accounted for.


