# WebSocket Server

## Context and Problem Statement

A real-time protocol is needed to allow users to send and receive messages from the server. We have chosen to use WebSockets for this purpose.

## Considered Options
1. Native TCP/IP in Node.js
2. WS Library

## Decision Outcome

**WS Library** was chosen because it allows us to focus on the main goal of the service rather than spending a lot of time building, implementing, and testing a WebSocket server from scratch. It is also easy to scale using WS Library in the future if needed.

## Pros and Cons of Other Options

### Native TCP/IP in Node.js
**Pros:** Customizable

**Cons:** Requires a lot of time and knowledge about communication engineering
