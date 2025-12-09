---
title: Load balancers
description: A few notes I took when following the Grokking Modern System Design for Engineers and Managers course
createdAt: '01/20/2023'

slug: system-design-load-balancers
tags: ['system design']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'system design, load balancers'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2024 Juan Labrada'
    - name: 'publish'
      content: '09/06/2024'
---

# What is a load balancer?
The job of the load balancer is to fairly divide all clients’ requests among the pool of available servers. Load balancers perform this job to avoid overloading or crashing servers.
 A load balancer may not be required if a service entertains a few hundred or even a few thousand requests per second. However, for increasing client requests, load balancers provide the following capabilities:
- Scalability: By adding servers, the capacity of the application/service can be increased seamlessly. Load balancers make such upscaling or downscaling transparent to the end users.
- Availability: Even if some servers go down or suffer a fault, the system still remains available. One of the jobs of the load balancers is to hide faults and failures of servers.
- Performance: Load balancers can forward requests to servers with a lesser load so the user can get a quicker response time. This not only improves performance but also improves resource utilization.

# Where should load balancers be placed?
- Place LBs between end users of the application and web servers/application gateway.
- Place LBs between the web servers and application servers that run the business/application logic.
- Place LBs between the application servers and database servers.

In reality, load balancers can be potentially used between any two services with multiple instances within the design of a system.

# What services are offered by load balancers?
LBs not only enable services to be scalable, available, and highly performant, they offer some key services like the following:

- Health checking: LBs use the heartbeat protocol to monitor the health and, therefore, reliability of end-servers. Another advantage of health checking is the improved user experience.
- TLS termination: LBs reduce the burden on end-servers by handling TLS termination with the client.
- Predictive analytics: LBs can predict traffic patterns through analytics performed over traffic passing through them or using statistics of traffic obtained over time.
- Reduced human intervention: Because of LB automation, reduced system administration efforts are required in handling failures.
- Service discovery: An advantage of LBs is that the clients’ requests are forwarded to appropriate hosting servers by inquiring about the service registry.
- Security: LBs may also improve security by mitigating attacks like denial-of-service (DoS) at different layers of the OSI model (layers 3, 4, and 7).

As a whole, load balancers provide flexibility, reliability, redundancy, and efficiency to the overall design of the system.

Load balancers are usually deployed in pairs as a means of disaster recovery. If one load balancer fails, and there’s nothing to failover to, the overall service will go down. Generally, to maintain high availability, enterprises use clusters of load balancers that use heartbeat communication to check the health of load balancers at all times. On failure of primary LB, the backup can take over. But, if the entire cluster fails, manual rerouting can also be performed in case of emergencies.

# Load balancing takes place at different scales
- Global server load balancing (GSLB): GSLB involves the distribution of traffic load across multiple geographical regions. GSLB takes forwarding decisions based on the users’ geographic locations, the number of hosting servers in different locations, the health of data centers, and so on. GSLB offers automatic zonal failover. GSLB service can be installed on-premises or obtained through Load Balancing as a Service (LBaaS).
- Local load balancing: This refers to load balancing achieved within a data center. This type of load balancing focuses on improving efficiency and better resource utilization of the hosting servers in a data center. They behave like a reverse proxy and make their best effort to divide incoming requests among the pool of available servers. Incoming clients’ requests seamlessly connect to the LB that uses a virtual IP address

For global balancing DNS can help. it’s possible to do load balancing through DNS while looking at the output of nslookup. DNS uses a simple technique of reordering the list of IP addresses in response to each DNS query. Therefore, different users get a reordered IP address list. It results in users visiting a different server to entertain their requests. In this way, DNS distributes the load of requests on different data centers.

DNS isn’t the only form of GSLB. Application delivery controllers (ADCs) and cloud-based load balancing are better ways to do GSLB.

There are two ways of doing global traffic management (GTM):

- GTM through ADCs: Some ADCs implement GSLB. In that case, ADCs have a real-time view of the hosting servers and forward requests based on the health and capacity of the data center.
- GTM through DNS: DNS does GSLB by analyzing the IP location of the client. For each user requesting IP for a domain name (for example, www.educative.io), DNS-based GSLB forwards the IP address of the data center geographically closer to the requesting IP location.

# Algorithms of load balancers

- Round-robin scheduling: In this algorithm, each request is forwarded to a server in the pool in a repeating sequential manner.
- Weighted round-robin: If some servers have a higher capability of serving clients’ requests, then it’s preferred to use a weighted round-robin algorithm. In a weighted round-robin algorithm, each node is assigned a weight. LBs forward clients’ requests according to the weight of the node. The higher the weight, the higher the number of assignments.
- Least connections: In certain cases, even if all the servers have the same capacity to serve clients, uneven load on certain servers is still a possibility. For example, some clients may have a request that requires longer to serve. Or some clients may have subsequent requests on the same connection. In that case, we can use algorithms like least connections where newer arriving requests are assigned to servers with fewer existing connections. LBs keep a state of the number and mapping of existing connections in such a scenario. We’ll discuss more about state maintenance later in the lesson.
- Least response time: In performance-sensitive services, algorithms such as least response time are required. This algorithm ensures that the server with the least response time is requested to serve the clients.
- IP hash: Some applications provide a different level of service to users based on their IP addresses. In that case, hashing the IP address is performed to assign users’ requests to servers.
- URL hash: It may be possible that some services within the application are provided by specific servers only. In that case, a client requesting service from a URL is assigned to a certain cluster or set of servers. The URL hashing algorithm is used in those scenarios.

# Static versus dynamic algorithms
- Static algorithms don’t consider the changing state of the servers. Therefore, task assignment is carried out based on existing knowledge about the server’s configuration. Naturally, these algorithms aren’t complex, and they get implemented in a single router or commodity machine where all the requests arrive.

- Dynamic algorithms are algorithms that consider the current or recent state of the servers. Dynamic algorithms maintain state by communicating with the server, which adds communication overhead. State maintenance makes the design of the algorithm much more complicated.

# Stateful versus stateless LBs
While static and dynamic algorithms are required to consider the health of the hosting servers, a state is maintained to hold session information of different clients with hosting servers.

If the session information isn’t kept at a lower layer (distributed cache or database), load balancers are used to keep the session information.

## Stateful load balancing
Stateful load balancing involves maintaining a state of the sessions established between clients and hosting servers. The stateful LB incorporates state information in its algorithm to perform load balancing.
the stateful LBs retain a data structure that maps incoming clients to hosting servers.

Stateful LBs increase complexity and limit scalability because session information of all the clients is maintained across all the load balancers. That is, load balancers share their state information with each other to make forwarding decisions.

## Stateless load balancing
Stateless load balancing maintains no state and is, therefore, faster and lightweight. Stateless LBs use consistent hashing to make forwarding decisions. However, if infrastructure changes (for example, a new application server joining), stateless LBs may not be as resilient as stateful LBs because consistent hashing alone isn’t enough to route a request to the correct application server. Therefore, a local state may still be required along with consistent hashing.
Therefore, a state maintained across different load balancers is considered as stateful load balancing. Whereas, a state maintained within a load balancer for internal use is assumed as stateless load balancing.

# Types of load balancers

- Layer 4 load balancers: Layer 4 refers to the load balancing performed on the basis of transport protocols like TCP and UDP. These types of LBs maintain connection/session with the clients and ensure that the same (TCP/UDP) communication ends up being forwarded to the same back-end server. Even though TLS termination is performed at layer 7 LBs, some layer 4 LBs also support it.
- Layer 7 load balancers: Layer 7 load balancers are based on the data of application layer protocols. It’s possible to make application-aware forwarding decisions based on HTTP headers, URLs, cookies, and other application-specific data—for example, user ID. Apart from performing TLS termination, these LBs can take responsibilities like rate limiting users, HTTP routing, and header rewriting.

Layer 7 load balancers are smart in terms of inspection. However layer 4 load balancers are faster in terms of processing.

# Load balancer deployment
A single layer LB isn’t enough for a large data center. In fact, multiple layers of load balancers coordinate to take informed forwarding decisions. A traditional data center may have a three-tier LB;
- Tier 0: DNS (which could act as loadbalancers)
- Tier 1: A router layer (Layer 3) that distributes connections from clients to Layer 4 LBs. These helps in horizontal scalability of the higher-tier LBs.
- Tier 2: TCP/UDP layer (Layer 4) that distributes requests from Tier 1 to Layer 7 LBs.  Tier-2 LBs make sure that for any connection, all incoming packets are forwarded to the same tier-3 LBs.
- Tier 3: Application Data (Layer 7) that distributes requests from Tier 2 to the servers pool. Since these LBs are in direct contact with the back-end servers, they perform health monitoring of servers at HTTP level. This tier enables scalability by evenly distributing requests among the set of healthy back-end servers and provides high availability by monitoring the health of servers directly. 

To summarize, tier 1 balances the load among the load balancers themselves. Tier 2 enables a smooth transition from tier 1 to tier 3 in case of failures, whereas tier 3 does the actual load balancing between back-end servers. Each tier performs other tasks to reduce the burden on end-servers.

# Questions

- After a request reaches a back-end server, should the response be routed back through each tier of the load balancers?

No, the server can send the response directly to the routers (tier-1 LBs) through tier-3 LBs, which can forward the response from the data center. Such a response is called direct routing (DR) or direct server return (DSR).

DR/DSR is typically used for non-HTTPS traffic because when TLS termination is involved, responses need to be encrypted before reaching the client, requiring them to pass back through the Layer 7 load balancer for encryption.

- Why don’t the servers directly send the response to the routers (tier-1 LBs) instead of tier-3 LBs?
Tier-3 LBs maintain some state of connection—for example, SSL encryption/decryption. This is necessary to give clients a seamless experience.

- which tier of LBs is more prone to bugs?

Tier 3 has more complexity, which makes it more prone to bugs.

-  a higher number of tier-3 load balancers than that of tier-2. What do you think is the reason for such a representation?

Tier 3 performs application-specific analysis and substantially more sophisticated computations. Therefore, handling the same number of queries as tier 2 requires a higher number of machines. Furthermore, tier-3 LBs maintain the state of a large number of application servers, which may not be possible using the same number of LBs as tier 2.

# Implementation of load balancers
## Hardware load balancers
Hardware load balancers work as stand-alone devices and are quite expensive. Nonetheless, they have their performance benefits and are able to handle a lot of concurrent users. Configuration of hardware-based solutions is problematic because it requires additional human resources. Hardware LBs can have higher maintenance/operational costs and compatibility issues making them less flexible. Not to mention that hardware LBs have vendor locks as well.

## Software load balancers
Software load balancers are becoming increasingly popular because of their flexibility, programmability, and cost-effectiveness. That’s all possible because they’re implemented on commodity hardware. Software LBs scale well as requirements grow. Software LBs can provide predictive analysis that can help prepare for future traffic patterns.

## Cloud load balancers
Load Balancers as a Service (LBaaS) has been introduced. This is where cloud owners provide load balancing services. Cloud-based LBs may not necessarily replace a local on-premise load balancing facility, but they can perform global traffic management between different zones. Primary advantages of such load balancers include ease of use, management, metered cost, flexibility in terms of usage, auditing, and monitoring services to improve business decisions. 

## Client-side load balancing. 
Client-side load balancing is suited where there are numerous services, each with many instances (such as load balancing in Twitter).