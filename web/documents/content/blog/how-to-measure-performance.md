---
title: How to Measure Performance
description: Notes on different tools and ways to measure performance
createdAt: '12/29/2024'

slug: how-to-measure-performance
tags: ['solution architecture','system design', 'measure performance']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'system design, solution architecture, measure performance'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2024 Juan Labrada'
    - name: 'publish'
      content: '12/29/2024'
---

# How to measure performance

## Apache HTTP server benchmarking tools
[Apache Benchmarking](https://httpd.apache.org/docs/2.4/programs/ab.html)

- How to install?
```
sudo apt-get install apache2-utils 
```

- How to use?

```
ab -c200 -t10 http://localhost:8080/
```
