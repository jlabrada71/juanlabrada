---
title: System Design Process
description: A quick process and questions to consider when designing a system
createdAt: '01/20/2023'

slug: system-design-process
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

# Quick Process

- Ask questions for understanding the details of the problem
- Ask question to understand the nature and scope of the data
- Discuss the possible components for the solution
- Discuss the trade-offs of the proposed solution

# Ask questions for understanding the details of the problem
- Requirements that the clients need directly (Functional requirements - problem related)
- Requirements that the clients need indirectly (Non-functional requirements - solution related ex: performance
)
# Ask questions to understand the nature and scope of the data

We need to identify and understand data and its characteristics in order to look for appropriate data storage systems and data processing components for the system design.

- What’s the size of the data right now?
- At what rate is the data expected to grow over time?
- How will the data be consumed by other subsystems or end users?
- Is the data read-heavy or write-heavy?
- Do we need strict consistency of data, or will eventual consistency work?
- What’s the durability target of the data?
- What privacy and regulatory requirements do we require for storing or transmitting user data?

# Discuss the possible components for the solution

Part of our job is to figure out which components we’ll use, where they’ll be placed, and how they’ll interact with each other.
- Front-end components
- Servers
- Databases
- Apis
- load balancers
- caches
- firewalls
- CDNs
- etc.

We might need to balance the ideal components with the real component that we can include due to restrictions of the client.
Ex: The ideal is to use MongoDB for storing JSON data, but the client might have Postgres which allows to store JSON as a column field.

This component level design is abstracted of the details. Usually this might be accomplished by defining APIs.

# Discuss the trade-offs of the proposed solution

There’s no one best answer to a design problem, you might have different solutions each with its trade-offs.

- Different components have different pros and cons. We’ll need to carefully weigh what works for us.
- Different choices have different costs in terms of money, technical complexity, and maintenance. We need to efficiently utilize our resources.
- Every design has its weaknesses. As designers, we should be aware of all of them, and we should have a follow-up plan to tackle them. And plan for monitoring and evolve the design as requiered.

- Something is always failing in a big system. We need to integrate fault tolerance and security into our design.

# What not to do
- Don’t start building without a plan.
- Don’t work in silence. Discuss your design ideas.
- If we don’t know something, we don’t paper over it, and we don’t pretend to know it.




