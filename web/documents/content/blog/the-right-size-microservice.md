
title: The right size microservice
description: How to design a Microservice that is not too big not too small
createdAt: 12/26/2024'

slug: the-right-size-microservice
tags: ['system design', 'microservices', 'architecture']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'system design, microservices, architecture'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2024 Juan Labrada'
    - name: 'publish'
      content: '12/26/2024'


# Designing the Right Size Microservice

Designing the right size for a microservice is critical to achieving scalability, maintainability, and simplicity. The goal is to create services that are small enough to be manageable but large enough to avoid becoming fragmented or overly dependent on others. 

## What is a service
- Loosely coupled
- Independently deployable
- Implements a business capability
- Owned by a small team


Here are some key principles and strategies:

## Principles and Strategies

### 1. Define Clear Boundaries
- **Business Capability**: A microservice should align with a single, well-defined business capability (e.g., user management, order processing). Use domain-driven design (DDD) to identify these boundaries.
- **Bounded Context**: Each microservice should operate within a specific bounded context, meaning it has a clearly defined responsibility and minimal overlap with other services.



### 2. Aim for Cohesion
- **Highly Cohesive**: Group together functionalities that are closely related.
- **Low Coupling**: Minimize dependencies between microservices. A good microservice should function independently as much as possible.



### 3. Consider the Single Responsibility Principle
Each service should do one thing well. If a service starts handling unrelated concerns, it’s likely too big.



### 4. Size Based on Team Structure
- **Two-Pizza Rule**: A microservice should ideally be manageable by a small team (e.g., a team that can be fed with two pizzas, ~4-8 people).
- **Ownership**: Ensure one team owns the service to avoid shared responsibilities.



### 5. Factor in Scalability
- If a service cannot scale independently or has bottlenecks that affect unrelated functionality, it may be too large.
- Separate services by scalability needs (e.g., one service for CPU-intensive tasks and another for lightweight tasks).



### 6. Avoid Over-Splitting
- Don't break down a service just for the sake of being small. Over-splitting can lead to a network of tightly coupled microservices, increasing latency and complexity.



### 7. Use Communication Patterns as a Guide
- Services that communicate synchronously often are likely too small and interdependent.
- Design services that can function asynchronously or independently whenever possible.



### 8. Evaluate Change Frequency
- Group together components that change for the same reasons and at the same time.
- Split apart those that have distinct lifecycles or are managed differently.



### 9. Test and Iterate
- Start with broader services, then refactor into smaller ones if necessary as usage patterns, scaling, or complexity demands.
- Use tools to monitor service interactions and refine boundaries.
- Continuously evolve your microservices




### 10. Metrics to Watch
- **Size Metrics**: LOC (lines of code) is less important than complexity. A service might be too large if:
  - It’s hard to understand or modify.
  - It requires frequent collaboration between teams.
- **Latency and Throughput**: Services too tightly coupled often cause performance bottlenecks.
- **Deployment Frequency**: If a service frequently requires deployment due to unrelated reasons, it may need splitting.



### Example
- **Too Big**: A single "Monolithic Order Service" handling order creation, payment processing, inventory updates, and shipping.
- **Well-Sized**:
  - **Order Service**: Handles order creation and basic tracking.
  - **Payment Service**: Processes payments independently.
  - **Inventory Service**: Manages stock updates.
  - **Shipping Service**: Coordinates shipping logistics.

Each service handles a specific business function and can scale or evolve independently.

--
## Antipatterns
### **Excessively fine-grained** 
- Reduced maintainability
- Reduced performance
- reduced availability


## Image generation prompts


Here are the detailed prompts for generating the requested images related to the concepts of microservice design:

1. Define Clear Boundaries
Prompt:
"A visually clear and professional diagram illustrating business capability mapping for an e-commerce platform. A large rectangle labeled 'E-commerce' is divided into smaller, neatly aligned rectangles. Each smaller rectangle uniquely represents a capability such as 'Orders,' 'Payments,' 'User Management,' 'Inventory,' and 'Shipping,' with clearly labeled sections. The design is clean and didactic, featuring soft, professional colors like blues and greens to differentiate the capabilities. Suitable for educational purposes or presentations."

2. Aim for Cohesion
Prompt:
"A clear, professional diagram contrasting tightly coupled systems and highly cohesive systems. On one side, show multiple interconnected boxes with arrows crossing between them, labeled as 'Tightly Coupled System.' On the other side, depict isolated, self-contained boxes labeled as 'Highly Cohesive System.' Use simple, modern design with clear labels and color coding to emphasize the differences."

3. Single Responsibility Principle
Prompt:
"A clean flowchart illustrating the single responsibility principle for microservices. Show one box labeled 'Payment Service' that exclusively handles tasks like 'Process Payment' and 'Validate Payment Method.' In contrast, next to it, display an overloaded box labeled 'Overloaded Service' that handles unrelated tasks like 'User Login,' 'Inventory Updates,' and 'Shipping.' Use soft colors and arrows to highlight clarity and separation of responsibilities."

4. Size Based on Team Structure
Prompt:
"An engaging cartoon-style infographic illustrating the two-pizza team rule for microservices. Depict a small team of 4-8 people collaborating around a single service, with two pizzas in the center of the team. Show the team managing a single, labeled microservice, emphasizing simplicity and independence. Use fun, approachable colors and clean lines for a lighthearted educational feel."

5. Factor in Scalability
Prompt:
"A side-by-side bar chart comparing resource usage and scalability of two microservices. On the left, depict a CPU-intensive service with bars showing high compute requirements. On the right, show a lightweight service with minimal compute needs. Include labels like 'Service A (High CPU)' and 'Service B (Low CPU).' Use professional color schemes, such as shades of blue and green, to represent scaling needs effectively."

6. Avoid Over-Splitting
Prompt:
"A network diagram showing the anti-pattern of overly fragmented microservices. Display numerous small boxes (representing microservices) interconnected with many arrows, labeled as 'Over-Splitting Example.' Beside it, show a simplified network with fewer, well-sized boxes and minimal connections, labeled 'Optimized Microservices.' Use clear, didactic styling and distinguishable color coding."

7. Communication Patterns
Prompt:
"A professional diagram comparing synchronous and asynchronous communication in microservices. On the left, show two tightly coupled services with direct arrows indicating synchronous calls. On the right, depict two independent services communicating via a queue or broker (e.g., RabbitMQ or Kafka), labeled 'Asynchronous Communication.' Use clean labels and professional colors to distinguish between the two."

8. Evaluate Change Frequency
Prompt:
"A timeline illustration showing the lifecycle of a microservice before and after splitting. The first part of the timeline shows frequent updates to a single service labeled 'Monolithic Service.' The second part depicts the service split into smaller services, each with its own distinct update points, labeled 'Split Services.' Use clean, modern design with clear labels and color differentiation for clarity."

9. Test and Iterate
Prompt:
"A flowchart visualizing the process of starting with broader services and refining them into smaller microservices. Begin with a large rectangle labeled 'Initial Broad Service,' followed by arrows leading to smaller, neatly aligned rectangles labeled 'Refactored Microservices.' Include labels like 'Test,' 'Monitor,' and 'Refactor' along the steps. Use a professional, clean layout with soft, didactic colors."


10. Metrics to Watch
Image Type: Graphs and Performance Metrics

Show charts for deployment frequency, service latency, and inter-service throughput.
Example: A line chart showing deployment frequency dropping after splitting an overly large service.

Prompt:

Generate an image of: A set of graphs illustrating key metrics for microservice optimization. Include three separate graphs: a line chart showing 'Deployment Frequency' decreasing after splitting a service, a bar chart labeled 'Service Latency' showing improvement, and a throughput graph labeled 'Inter-Service Communication.' Use modern, professional styling with clear axes and labels for presentation purposes.