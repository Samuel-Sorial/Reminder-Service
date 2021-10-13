# Schedule Reminder workflow
## Context and Problem Statement

Handling many reminders without losing them in case of service restart
is challenging, just like any computational problem,
we need to find a way that fulfills our requirements with minimum resource.
Having in mind scalability and ability to change!

## Considered Options

1. Built-in setTimeOut
2. Message Broker Only
3. Database Only
4. Message Broker & Database

## Decision Outcome
***Message Broker & Database***
### Positive Consequences

* Scalable
* Durable
* Real-time

### Negative Consequences

* Complex
* Adding new dependencies to the project

## Pros and Cons of the other options

### Built-in setTimeOut

#### Pros

* Very easy to implement
* Real-time

#### Cons

* Not scalable
* Not durable

### Message Broker Only

#### Pros

* Easy to implement
* Durable
* Scalable
* Real-time

#### Cons

* Might fail due to overloading queues with reminders that wait for long duration

### Database Only

#### Pros

* Easy to implement
* Durable
* Scalable

#### Cons

* DB that supports notification on specific event 
(redis expiry) are not garaunteed to be real-time.
"The expired events are generated when a key is accessed and is
found to be expired by one of the above systems, as a result
there are no guarantees that the Redis server will be able
to generate the expired event at the time the key time to live
reaches the value of zero." _**Redis Docs**_
* It's not the job of the database engine to schedule events

### References
* [Redis expiration event](https://redis.io/topics/notifications)
