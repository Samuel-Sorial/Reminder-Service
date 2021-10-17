<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<h3 align="center">Reminder Service</h3>

  <p align="center">
    Reminder is a simple node/typescript service with a websocket interface to handle clients.
    <br />
    <a href="https://github.com/Samuel-Sorial/Reminder-Service/issues/new">Report Bug</a>

  </p>
</p>

---

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#usage-instructions">Usage Instructions</a></li>
    <li><a href="#behavior">Behavior</a></li>
</ol>
</details>

---

<!-- ABOUT THE PROJECT -->

## About The Project

It allows clients to send a command message to add an event reminder, the service send a reminder to all connected clients when this reminder date comes!
### Built With

- [Node.js](https://nodejs.org)
- [Typescript](https://www.typescriptlang.org/)
- [WebSocket](https://www.npmjs.com/package/ws)
- [Redis](https://redis.io/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Jest](https://jestjs.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Docker: [Installation Guide](https://docs.docker.com/engine/install)
- Docker Compose: [Installation Guide](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repo

```sh
git clone https://github.com/Samuel-Sorial/Reminder-Service.git
```

2. Go to the clone directory

```sh
cd Reminder-Service
```

3. Add environment variables (You can change them if needed)
```shell
cp .env.example .env
```

4. Build docker image 
```shell
sudo docker build -t  reminder .
```

5. Run docker-compose
```shell
sudo docker-compose up --build -d
```
   <!-- Testing -->

---

## Testing
### Prerequisites
* Node.js
* npm

Run
```sh
npm i
npm test
```
---

<!-- DOCUMENTATION -->

## Usage Instructions

The service opens a websocket server listening on port 3000.

To set a reminder:
- Connect to websocket server:`ws://localhost:3000`
- Send message that contains your reminder data

Set reminder message schema: 
```json
{
  "message": "<your_mesage>",
  "date": "<reminder_date>"
}
```
Reminder message example:
```json
{
  "message": "Hello World!",
  "date": "2021-10-17T02:19:10.155Z"
}
```
***Note***: date should be specified using *ISOString* format
<!-- Behavior -->

### Behavior
* If any reminder request is sent with a date that has already passed,
the service broadcasts it immediatly (assuming it was delayed by any reason from client side).
