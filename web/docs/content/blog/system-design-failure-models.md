---
title: Failure Models
description: What are failure models and how complex they are?
createdAt: '09/17/2024'

slug: system-design-failure-models
tags: ['system design']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'system design, failure models'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2024 Juan Labrada'
    - name: 'publish'
      content: '09/17/2024'
---

# The nature of failure

With distributed systems the reason for systems to fails is increased in several ways. We can use the failure models for reasoning about these failures and creating resilient systems.


# Kind of failures from easy to deal with to difficult to deal with


- Fail-stop
- Crash
- Omission
- Temporal
- Byzantine

# Fail-stop
When a node halts permanently. However, the other nodes can still detect that the node has stopped by communicating with it.

# Crash
When a node halts silently, and the other nodes can't detect that the node has stopped working. 

# Omission failures
In omission failures, the node fails to send or receive messages. There are two types of omission failures:
- Send omission failure: When the node fails to respond to the incoming request.
- Receive omission failure: When the node fails to receive the request and thus can’t acknowledge it.

# Temporal failures
In temporal failures, the node generates correct results, but is too late to be useful. This failure could be due to bad algorithms, a bad design strategy, or a loss of synchronization between the processor clocks.

# Byzantine failures
In Byzantine failures, the node exhibits random behavior like transmitting arbitrary messages at arbitrary times, producing wrong results, or stopping midway. This mostly happens due to an attack by a malicious entity or a software bug. A byzantine failure is the most challenging type of failure to deal with.



