---
title: Go Dev, DevOps
project: YetAnotherDeFi
period: 2022-2022
link: https://yetanotherdefi.com/
location: Georgia, Tbilisi
stack: [Go, GRPC, BlockChain, HashiStack, Ansible, CI/CD]
weight: 50
---

- Developed a service for tracking (and then streaming via GRPC) changes in the state of the blockchain, which reduced the cost of this data by 4 times, and removed the block on the horizontal scaling of the product
- Developed a dynamic proxying service that independently searches for the best proxy servers and is very ascetic about the resources it consumes
- Designed and deployed from scratch (using Ansible) a fault-tolerant infrastructure on HashiStack (Consul, Nomad) with monitoring and logging (Prometheus, Promtail, Loki, Grafana) and the ability to be present in different geographic zones
- Built CI/CD processes in the company (testing, build, and delivery) for Go and NodeJS applications
- Interviewed candidates for the position of DevOps engineers
