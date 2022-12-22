# Message Broker choice

## Context and Problem Statement

Choosing a message broker that has the ability to publish and consume messages in a delayed flow.

## Considered Options
1. RabbitMQ
2. Kafka

## Decision Outcome

**RabbitMQ** was chosen because it is easy to implement, though it does not natively support a delayed publish/consume model. A plugin is used to add this functionality to RabbitMQ.

## Pros and Cons of Other Options

### Kafka
**Cons:** Requires learning, does not natively support delayed publish/consume

### References
* [Delayed Publish RabbitMQ External Plugin](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange)
