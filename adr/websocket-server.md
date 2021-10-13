# WebSocket Server
## Context and Problem Statement

To allow users send/receive messages from the server, it's required to use a real-time protocol, websocket at our case.

## Considered Options

1. [Native TCP/IP in Node.js](https://nodejs.org/api/net.html#net_net)
3. [WS Library](https://www.npmjs.com/package/ws)

## Decision Outcome
***WS library*** as the main goal of the service is to remind users, not building websocket from scratch.
### Positive Consequences

* Focusing on the main goal of the service, instead of spending much time on designing, implementing, and testing the websocket server.
* Ability to scale in future if needed, as WS library makes it easy to scale using  


### Negative Consequences

* Introducing new dependency on the project

## Pros and Cons of the other options

### Native TCP/IP in Node.js

#### Pros
* Customizable, each peice can be crafted to match our needs.

#### Cons
* Too much time spent on building
* Requires too much knowledge about communication engineering
