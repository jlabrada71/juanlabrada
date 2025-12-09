---
title: System Design And Fault Tolerance
description: A few notes I took when following the Grokking Modern System Design for Engineers and Managers course
createdAt: '09/20/2024'

slug: system-design-fault-tolerance
tags: ['system design']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'system design, fault tolerance'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2024 Juan Labrada'
    - name: 'publish'
      content: '09/20/2024'
---

# What is fault tolerance?

Fault tolerance is the system's ability to execute persistently even if one or more of its components fail. Here, components can be software or hardware. Conceiving a system that is hundred percent fault-tolerant is practically very difficult.

Fault tolerance ensures availability and reliability during the expected times of system functioning.

# Fault tolerance techniques
## Replication
With Replication-based fault tolerance we can replicate both services and data. We can swap out failed nodes with healthy ones and a failed data store with its replica. Ideally, a large service can transparently make the switch without impacting the end customers. 

For data:
We create multiple copies of our data in separate storage. All copies need to update regularly for consistency when any update occurs in the data. When a system needs strong consistency, we can synchronously update in replicas. However, this reduces the availability of the system since for the update to occur we need to ensure no one else is modifying the data. We can also asynchronously update data in the replicas when we can tolerate eventual consistency, resulting in stale reads until all teh replicas converge. Thus, there is a trade-off between both consistency approaches. At the end of the day, we need to compromise either on availability or on consistency under failures - this is what the CAP theorem is all about.

## Checkpointing

Checkpointing is a technique that saves the system's state in stable storege for later retrieval in case of failure due to errors or service disruptions. Checkpointing is a fault tolerance technique performed in many stages at different time intervals (Word autosave is an example). When a distributed system fails, we can get the last computed data from the previous checkpoint and start working from there.

Checkpointing can be divided in two types:
- Consistent state: when all the processes have a consistent view of the shared state and sequence of events.
- Inconsistent state: This is a state where there are discrepancies in the saved state of different processes of a system. Ex: for Process A a message is sent but for process B the message is not sent yet.
 


