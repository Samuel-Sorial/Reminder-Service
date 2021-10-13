# Message Broker choice
## Context and Problem Statement

Choosing message broker that has the ability to publish and consume in a delayed flow!

## Considered Options

1. RabbitMQ
2. Kafka

## Decision Outcome
***RabbitMQ***

Using RabbitMQ along with a delayed publish plugin that allows RabbitMQ to have the ability
of delayed publish/consume.

### Positive Consequences

* Easy to implmenet (because developer has previous experience with it)

### Negative Consequences

* Doesn't natively support delayed publish/consume model, some workarounds might use TTL & Priorities & Deadl-letter queues but it has some pitfalls and edge cases, so an external plugin to delay the publishing is used

## Pros and Cons of the other options

### Kafka

~~Pros~~
#### Cons

* Requires some time of learning because no experience with it
* Doesn't natively support delayed publish/consume (as far I reached)

### References
* [TTL & Expiration on RabbitMQ](https://www.rabbitmq.com/ttl.html)
* [Dead Letter Exchanges on RabbitMQ](https://www.rabbitmq.com/dlx.html)
* [Delayed Publish RabbitMQ External Plugin](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange)