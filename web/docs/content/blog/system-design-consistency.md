---
title: Consistency in System Design
description: What are the different kind of consistency when we design systems?
createdAt: '09/17/2024'

slug: system-design-consistency
tags: ['system design']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'system design, consistency'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2024 Juan Labrada'
    - name: 'publish'
      content: '09/17/2024'
---

# What is consistency?

Consistency may mean different things in distributed systems, but in general it is about the correctness of a distributed system doing concurrent data reads, writes and mutations. For example, it could mean that each replica of a node can view the same data at a given point in time. Another is that each read request gets the value of the most recent write. 
In addition to these two examples there are many other forms of consistency. It will depend on the consistency model and the abstractions associated with them on how we will be able to reason about the correctness of a distributed system.

# ACID vs CAP theorem consistency

ACID consistency defines a set of guarantees that we can rely upon when working with a database. Like:
- the uniqueness of a value in a field.
- the cascade of operations on tables related by foreign keys.
- and the none existance of rows with a foreign key and not having a related record.

On the other hand the CAP Theorem consistency guarantees that, in a distributed system, every replica of a node will have the same logical value at all times. 
The physical value is not guaranteed to be the same, though. Due to the speed of data transmition, replicating a value throughout a cluster may take some time. The physical picture of the system can be made match the logical one, by preventing clients from accessing values on nodes until they are properly replicated.

# Eventual consistency

Eventual consistency is the weakest consistency model. You can choose this model if your applications are unrelated and don't require to have the same value at the same time. The consistency can eventually be reach out when all changes are propagated.

The benefic of Eventual consistency is that it allows for high availability.

A common example of eventual consistency is the DNS. A change to a domain name configuration is not immediatly propagated to all the DNS server.

An example in the Database realm is Cassandra which is a highly available NoSQL database that provides eventual consistency.

# Causal consistency

Causal consistency works by categorizing operations into dependent and independent operations. Dependent operations are also called causally-related operations. Causal consistency preserves the order of the causally-related operations.

For example, if you have two processes, one that calculates the total of an invoice. And other that sends the invoice amount to the bank.  The second process can not run until the fist has finished up. So, there is a causal relationship that needs to be enforced to prevent non-intuitive behaviour.

This model doesn't ensure the ordering for the operations that are not causally related. So, in the previous example, any process that doesn't depend on the calculation of the total of the invoce can be run in a different order.

# Sequential consistency

Sequential consistency is stronger than the causal consistency model. It preserves the ordering specified by each client’s program regardless the causal relationship. However, sequential consistency doesn’t ensure that the writes are visible instantaneously or in the same order as they occurred according to some global clock.

Example

In social networking applications, we usually don’t care about the order in which some of our friends’ posts appear. However, we still anticipate a single friend’s posts to appear in the correct order in which they were created. Similarly, we expect our friends’ comments in a post to display in the order that they were submitted. The sequential consistency model captures all of these qualities.

# Strict consistency (linearizability)

A strict consistency or linearizability is the strongest consistency model. This model ensures that a read request from any replicas will get the latest write value. Once the client receives the acknowledgment that the write operation has been performed, other clients can read that value.

Linearizability is challenging to achieve in a distributed system. Some of the reasons for such challenges are variable network delays and failures. 

Usually, synchronous replication is one of the ingredients for achieving strong consistency, though it in itself is not sufficient. We might need consensus algorithms such as Paxos and Raft to achieve strong consistency.

Linearizability affects the system’s availability, which is why it’s not always used. Applications with strong consistency requirements use techniques like quorum-based replication to increase the system’s availability.

Example

Updating an account’s password requires strict consistency. For example, if we suspect suspicious activity on our bank account, we immediately change our password so that no unauthorized users can access our account. If it were possible to access our account using an old password due to a lack of strict consistency, then changing passwords would be a useless security strategy.

# Summary

Linearizable services appear to carry out transactions/operations in sequential, real-time order.

Linearizable services have worse performance rates than services with weaker consistency in exchange for their strong assurances. Think about a read in a key-value store that returns the value written by a concurrent write. The read imposes no limits on future reads if the key-value store is weakly consistent.

Application programmers have to compromise performance and availability if they use services with strong consistency models. The models may break the invariants of applications built on top of them in exchange for increased performance.


