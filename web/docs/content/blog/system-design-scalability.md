---
title: Scalability in system design
description: What is scalability in system design?
createdAt: '09/20/2024'

slug: system-design-scalability
tags: ['system design']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'system design, scalability'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2024 Juan Labrada'
    - name: 'publish'
      content: '09/20/2024'
---

# What is scalability?

Scalability is the ability of a system to handle an increasing amount of workload without compromising performance. A search engine, for example, must accommodate increasing number of users, as well as the amount of data it indexes.

The workload can be of different types, including the following:
- request workload: this is the number of requests served by the system.
- data/storage workload: this is the number of data stored by the system.

## Dimensions of scalability

Here are the different dimensions of scalability:
- Size scalability: A system is scalable in size if we can simply add additional users and resources to it.
- Administrative scalability: This is the capacity for a growing number of organizations or users to share a single distributed system with ease.
- Geographical scalability: This relates to how easily the program can cater to other regions while maintaining acceptable performance constraints. In other words, the system can readily service a broad geographical region, as well as a smaller one.

# How to approach scalability?
We can scale systems in basically two different ways:

## Vertical scalability -- scaling up
Vertical scaling, also know as "scaling up", refers to providing additional capabilities to an existing device.(More Memory, More Diskspace, etc). It is limited by the max capacity of the device. In this case the complexity of the system remains almost the same.

## Horizontal scalability -- scaling out
Horizontal scaling, also known as "scaling out", refers to increasing the number of machines in the network. Sometimes two small machines cost less than a big and powerful machine. 
Scaling out increases the complexity of the overall system as we need to deal with problems like balancing, etc.

