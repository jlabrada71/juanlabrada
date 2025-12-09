---
title: System Design Maintainability
description: What it is? How to measure it and its relationship with reliability.
createdAt: '09/20/2024'

slug: system-design-maintainability
tags: ['system design']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'system design, maintainability'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2024 Juan Labrada'
    - name: 'publish'
      content: '09/20/2024'
---

# What is maintainability?
80% of system costs come after the system is deployed in production in the form of new features, bug fixes, and keeping the system ecosystem uptodate as well as maintaining smooth operations.
One of the salient features to define such requirements is maintainability. This can be divided in three underlying aspecs:
- Operability: This is teh ease with which we can ensure the system's smooth operational running under normal circumstances and acieve normal conditions under a fault.
- Lucidity: This refers to the simplicity of the code. The simpler the code base, the easier it is to understand and maintain it and vice versa.
- Modifiability: This is the capability of the system to integrate modified, new and, unforeseen features without any hassle.

# Measuring maintainability
Maintainability is the probability that the service will restore its functions withing a specified time of fault occurrence. It measures how conveniently and swiftly the service regains its normal operating conditions.
For example, suppose a component has a defined maintainability value of 95% for half an hour. In that case, the probability of restoring the component to its fully active from in half an hour is 0.95.

Maintainability gives us insight into the system's capability to undergo repairs and modifications while it's operational.

We use (mean time to repair) MTTR as the metrics to measure Maintainability.
```
           Total Maintenance Time
MTTR = -----------------------------
           Total number of repairs
```

It other words, MTTR is the average amount of time required to repair and restore a failed component. Our goal is to have as low a value of MTTR as possible.

# Maintainability and reliability

Maintainability is in close relation to reliability. The difference between them is the variable of interest. Maintainability refers to 'time-to-repair', whereas reliability refers to both 'time-to-repair' and 'time-to-failure'.

Combining maintainability and reliability analysis can help us achieve availability, downtime and uptime insights.

