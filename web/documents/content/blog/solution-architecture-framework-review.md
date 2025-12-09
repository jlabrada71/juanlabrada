---
title: How to run a Well-Architected Framework review
description: Complete a Well-Architected Framework Review, Understand the impact of design decisions about your architecture and Evaluate risks in your architecture and how to mitigate them.
createdAt: '10/01/2024'

slug: solution-architecture-framework-review
tags: ['solution architecture', 'system design']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'system design, solution architecture'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2024 Juan Labrada'
    - name: 'publish'
      content: '10/01/2024'
---

# What is the Well-Architected Framework Review?

It is a continuous improvement mechanism that allow customers to consistently evaluate their workflow against Amazon Web Services Best Practices. 

They can identify recommended remediations to high risks and medium risks issues.

The purpose of reviewing an architecture is to help identify any critical issue that might need to be addressed or areas that could be improved.

The outcome of the review is a set of actions designed to improve the workflow architecture based on the 6 pillars of the framework.


# How to implement the continuous improvement mechanism?
Consider its steps in your workflow lifecycle.
- Learn : Start by learning the strategies and best practices for architecting in the Cloud
- Measure : Use the framework to measure your architecture, use the lenses for measuring specific issues.
- Improve : Use the measure outcome to address any hight risk issue. You can identify issues by using the improvement plan.


This three steps should be applied in any workflow of your organization.

A workflow identify a set components that together deliver business value. 

# Intent of a review

The purpose of the review is identify critical issues and areas that might need improve.

The outcome is a set of actions that should improve the experience of using the workflow.

To achieve this goal the review should be done consistently and with a blame free approach that encourages the team to dive deep in to the issues.

It should be completed in hours not days. It is a conversation not an audit.

This review should not be theoretical but rather pragmatic with proven advice.

This process of review is not a one-time check. Instead it should be done continuously as the system evolve. Throughout the whole lifecycle of the architecture.

# Learnings from doing reviews
- Review early in the lifecycle because it is faster and easier to fix and influence design.
- Sometimes issues are not caused by bad decisions but rather by not realizing that there are decisions that need to be made.
- Most workflows have high risks that need to be addressed. If you find them early there are then less things that could damage your business.


# Common use cases for Well-architected framework reviews
- Learning best practices for the cloud. By learning best practices companies can identify risks and improvement opportunities.
- Technology governance. Before you launch into production you want to know that you and your workflow are ready. When there are many teams it is difficult to know if they are all doing the right thing. This also helps achieving consistency and prioritizing problems over time.
- Portfolio Management. 

# The three review phases
- prepare: identify sponsors (that could own the improvement plan) and also scope workload.
- review: Review the workload and create the report.
- improve: Prioritize issues treatment plan

# Prepare
## Best practices for preparing reviews
- Define the workload that will be reviewed (A process, technology, infrastucture, a team or a combination of all) that delivers business value to the organization.
- Identify the core team that is responsible for the workload and that has subject matter experts of the workload. These experts should be able to answer question regarding the 6 pillars. And should own the future improvement plan resulting from the review.
- Hold scoping session: In this session we decide on the workload and pillars to be reviewed.
- Decide on the type of review
- Gather data
- Schedule session

## Example preparation plan
- 3 weeks before : Workload selection, Core team selection, Scoping meeting invite
- 2 weeks before : Scoping meeting, Question relevance, Identify who can answer the questions, Review participants, Review scheduling
- 5 days before : Check with participants if agenda or scope needs any change. Remainder to have relevant information available during review.
- 1 day before : Final reminder for review attendance for all attendees.


# Review
## Best practices for running reviews
- One person moderates, one person takes notes
- Use tool to record results, only one person updates the tool
- Focus on the highest priority issues and risks, keep it simple, stay in scope
- Use the AWS Well-Architected tool to track results.
- Store documents in an S3 bucket, using workload name as naming convention.

# Improve
## Risk prioritization methodology and considerations
Prioritization should include the likelihood of occurence and potencial impact of the issue.
## Examples of risk impacts
- Lost sales
- Corporate liability
- Brand reputation damage
- Lost of market share.
- Longer time to market
- Legal
- Regulatory
- Etc.

# Well-Architected improvement workflow

- Identify risks and improvement opportunities
- Understand risks and improvement opportunities
- Determine prescriptive solutions
- Prioritize improvements
- Implement and track improvements













[Engineering at Meta](https://engineering.fb.com/)

[Meta Research](https://research.fb.com/)




```js
const personName = personObject?.name
```


