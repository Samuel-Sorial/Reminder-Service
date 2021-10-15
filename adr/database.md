# Database choice
## Context and Problem Statement

Choosing a simple database engine that is fash enough to serve the real-time requirments of reminders

## Considered Options

1. In Memory DB - Redis
2. In Memory DB - Memcached
3. SQL DB
4. NOSQL DB

## Decision Outcome
***In Memory DB - Redis***

Using Redis satisfies the requirements of real-time constraints & data persistence!

### Positive Consequences

* Easy to implement
* Easy to scale
* Supports data persistence
* Supports complex data strctures
* Enough memory for operations
* Can be used to scale websockets later using socket adapter

## Pros and Cons of the other options

### In Memory - Memcached

### Pros

* Easy to implement

### Cons
* Little memory
* No data persistence
* Doesn't support complex data structures

### SQL

### Pros

* Supports complex data structures
* Data persistence

### Cons
* Doesn't satisfy real-time constraints
* Complex (supports features that is not needed at this service at all)

### NoSQL

### Pros

* Supports complex data structures
* Data persistence

### Cons
* Doesn't satisfy real-time constraints
* Complex (supports features that is not needed at this service at all)


### References
* [Redis vs Memcached DZone](https://dzone.com/articles/redis-vs-memcached-which-one-to-pick)
