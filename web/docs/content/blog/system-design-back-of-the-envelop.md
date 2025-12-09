---
title: Back-of-the-envelope calculations
description: The swift, approximate, and simplified estimations in system design.
createdAt: '09/23/2024'

slug: system-design-back-of-the-envelop
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
      content: '09/23/2024'
---

# What are back-of-the-envelope calculations?

Back-of-the-envelope calculations(BOTECs) involve swift, approximate, and simplified estimations. This calculations are not intended to yield precise results, they work as a quick and preliminary evaluation of crucial parameters and the feasibility of a system.

# How to use BOTEC in system design

Given the natural complexity of systems and their architecture, getting a precise estimate of they requirements is sometimes impossible. It's way more advisable to provide a simplified estimate that ignores the nitty-gritty details of the system and focus on more important aspects, such as finding the feasibility of the service in terms of computational resources.

There are mainly three types of configurations that will allow us to get a blunt estimate for the needed resources:
- Web Server
- Application Server
- Storage Server

Each of them with its common resource requirements:
- A web server tipically requires low RAM, high Processing capability and low storage requirements. Enough to handle requests and responses properly.
- An application server requires high RAM, medium Processing and medium storage requirements. And it depends mainly on the type of processing the application can do. The more volume of data the application needs to deal with the more RAM and processing power it needs. 
- An Storage server requires low RAM, medium Processing and High Storage. In this case it also depends on the type of data that needs to be stored. Whether it is blob - for storing enconded videos, temporary processing queue - for processing the uploaded content, bigtable - for small but numerous elements, or relational data - for users and metadata in general.

# Typical Server Specifications

- Number of cores : 64
- RAM             : 256GB
- Cache(L3)       : 112MB
- Storage         : 16TB

# Typical Latencies

- L3 cache        : 13 ns
- Main Memory     : 100 ns
- Read from Mem   :   9 mcs
- Read from SSD   : 200 mcs
- Disk Seek       :   4 ms
- Disk Read       :   2 ms

# Typical queries per second (QPS)

- MySQL           :     1.000
- Key-Value store :    10.000
- Cache Server    :   100.000+

# Request types
- CPU-bound    : these depends on the processor of the node mainly.(ex: compressing data): X
- Memory-bound : the memore that the request requires is hight +1mb of data which has more impact than the CPU : 10X slower than CPU
- IO-bound     : these involve read-write from disk which is 100 times slower than memory operations. 100X slower than memory. 

Keep in mind that these comparison are simplications to make easy the estimation.




