---
title: System Design Building Blocks
description: What are the common elements present when designing systems?
createdAt: '10/02/2024'

slug: system-design-building-blocks
tags: ['system design']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'system design, building blocks'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2024 Juan Labrada'
    - name: 'publish'
      content: '10/02/2024'
---

# How to simplify system design?

One logical way to simplify system design is to identify the common problems and solutions that need to be solved when designing systems and give them a name. This allows for referrencing later to these solutions in a way that is simple to understand when we are trying to solve a problem that we have seen in the past and for which there is a known solution already.

These solutions can have their particular implementation given the platform where is it implemented (AWS, Google Cloud, etc), but in general terms they are similar in the problem they try to solve.

# List of the building blocks

- Domain Name System : This solves the problem of referencing a computer or a group of computers in the internet by using a name.
- Load Balancer : This one allows to fairly distribute incoming clients' requests among a pool of available servers. It can also reduce the load as well as bypass failed servers.
- Database : This building block allows us to store, retrieve, modify and delete data related to different data-processing procedures. It supports solutions like partitioning, replication, etc.
- Key-Value store : This one allows us to store data in the form of a key-value pair. It supports solutions like scalability, durability and configurability.
- Content Delivery Network : This solve the issue of efficiently delivering huge amount of content (videos, images, audio and webpages ) to end users while reducing latency.
- Sequencer : This building block solves the issue of generating unique IDs with a major focus on maintaing causality.
- Service Monitoring : Monitoring systems are critical in distributed systems to analyze and alert if a problem occurs. As well as to provide an early warning that allows to act ahead of an impeding problem.
- Distributed Caching : This building block helps solve the problem of efficiently providing frequently accessed data.
- Distributed Messaging Queue : This building block helps in decoupling producers and consumers of data which simplifies scalability and enhances reliability.
- Publish-Subscribe system : This building block solves the problem of communicating events between services for coordinating and orchestrating processes.
- Rate Limiter : This building block allows to limit the number of requests that a system receives which prevents excessive usage.
- Blob Store : This building block solves the problem of storing unstructured data like binary and multimedia files.
- Distributed Search : This building block solves the issue of searching in a massive amount of data. Three common elements in this building block are Crawling, Indexing and Searching.
- Distributed Logging : This building block solve the issue of allowing services to log their events efficiently in an scalable an reliable way.
- Distributed Task Schedule :  This solve the issue of mediating between tasks and resources. This allows to meet task-level and system-level goals. It can also be used to offload background processing.
- Sharded Counters : This building block solve the issue of efficiently deal with a huge amount of concurrent read/write requests. Ex: counting likes on a celebrity tweet.




