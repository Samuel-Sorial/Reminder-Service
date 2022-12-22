# Database choice
## Context and Problem Statement

Choosing a simple database engine that is fast enough to serve the real-time requirements of reminders.

## Considered Options
1. In Memory DB - Redis
2. In Memory DB - Memcached
3. SQL DB
4. NOSQL DB

## Decision Outcome

**In Memory DB - Redis** was chosen because it satisfies the requirements of real-time constraints and data persistence. It is also easy to implement and scale, supports complex data structures, and has enough memory for operations. It can be made more durable by configuring it to use file append, and saves records compacting them each period.

## Pros and Cons of Other Options

### In Memory - Memcached
**Pros:** Easy to implement

**Cons:** Little memory, no data persistence, doesn't support complex data structures

### SQL
**Pros:** Supports complex data structures, data persistence

**Cons:** Complex (supports features not needed at this service)

### NoSQL
**Pros:** Supports complex data structures, data persistence

**Cons:** Complex (supports features not needed at this service)

### References
* [Redis vs Memcached DZone](https://dzone.com/articles/redis-vs-memcached-which-one-to-pick)
