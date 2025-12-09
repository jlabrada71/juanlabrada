---
title: Operational Excellence
description: Design principles and best practices of the operational excellence.
createdAt: '10/02/2024'

slug: solution-architecture-operational-excellence
tags: ['solution architecture','system design']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'system design, solution architecture, operational excellence'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2024 Juan Labrada'
    - name: 'publish'
      content: '10/02/2024'
---

# What is the operational excellence?

Operational excellence is the ability to support development and run workloads effectively, gain insight into operations, and continuously improve supporting processes and procedures to deliver business value.

# Operational excellence design principles
- Perform operations as code.
- Make frequent, small, reversible changes.
- Refine operations procedures frequently.
- Anticipate failure.
- Learn from all operational failures.  

# Operational excellence best practices
## Organization
### Organization priorities
- Evaluate external customer needs
- Evaluate internal customer needs
- Evaluate governance requirements
- Evaluate compliance requirements
- Evaluate threat landscape
- Evaluate trade-offs
- Manage benefits and risks

### Operating Models
                                            
Applications (business software)
Platform     (Infrastructure) Compute, network, storage, Middleware, runtime, data operations, Security
Engineering  (Develop, build, and test) All activities to define and validate business applications and platform
Operations   (Deploy, operate, manage)  All activities needed to deploy and support business applications and platform in production

We have:
Application engineering
Application operations
Platform engineering
Platform operations

### Organization culture
- Executive sponsorship
- Team members empowered to take action when outcomes are at risk
- Escalation is encouraged
- Comunications are timely, clear, and actionable.
- Experimentation is encouraged
- Team members are empowered and encouraged to maintain and grow skill sets
- Resource teams appropriately
- Diverse opinions are encouraged and sought within and across teams

## Prepare
### Design Telemetry
- Implement application telemetry : metrics to describe the state of the application and allow to detect anomalies and logs internal states and events that occurs (error codes, transaction identifiers, user actions)
- Implement and configure workload telemetry : emit information about workload internal state and current status.(API call volume, http status code, scaling events)
- Implement user activity telemetry : emit information about user activity (click streams, completed transactions), help determine patterns of usage.
- Implement dependency telemetry: emit information about the status of resources your workload depends on.(database, dns, and network connectivity)
- Implement transaction traceability: emit events for single logical operations

### Design for Operations
- Use version control
- Test and validate changes
- Use configuration management systems
- Use build and deployment management system
- Perform patch management
- Share design standards
- Implement practices to improve code quality
- Use multiple environments
- Make frequent, small, reversible changes
- Fully automate integration and deployment
### Mitigate deployment risks
### Operational readiness and change management
## Operate
### Understanding workload health
### Understanding operational health
### Responding to events
## Evolve
### Learn, share, and improve


[Engineering at Meta](https://engineering.fb.com/)

[Meta Research](https://research.fb.com/)




```js
const personName = personObject?.name
```


