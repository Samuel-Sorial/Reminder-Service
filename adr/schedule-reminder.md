# Schedule Reminder Workflow

## Context and Problem Statement

Handling many reminders without losing them in case of a service restart is challenging. We need a solution that fulfills our requirements with minimal resources, is scalable, and can be changed easily.

## Considered Options
1. Built-in setTimeout
2. Message Broker Only
3. Database Only
4. Message Broker & Database

## Decision Outcome

**Message Broker & Database** was chosen because it is scalable, durable, and real-time. The message broker will be used to handle reminders that are in the near future (minutes) while the database will be used to store reminders that happen later (hours). A scheduled job will run at intervals (e.g. 9 minutes) to retrieve reminders from the database and publish them to the message broker.

## Pros and Cons of Other Options

### Built-in setTimeout
**Pros:** Easy to implement, real-time

**Cons:** Not scalable, not durable

### Message Broker Only
**Pros:** Easy to implement, durable, scalable, real-time

**Cons:** May fail due to queues being overloaded with long-duration reminders

### Database Only
**Pros:** Easy to implement, durable, scalable

**Cons:** May not be real-time, not the job of the database engine to schedule events

### References
* [Redis expiration event](https://redis.io/topics/notifications)
