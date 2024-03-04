# tenderd-app

**Tech Stack:** NodeJS, ReactJS, TypeScript, MongoDB, Kafka, Zookeeper, WebSockets
 
To run the project:

1. Download or clone the repo
2. Install Docker on your machine
3. On root directory run below commands
   - `cd tenderd-backend/`
   - `docker-compose -f docker-compose.yml up -d`
4. Navigate to `http://localhost:4173/vehicle`

**Tenderd-Backend:**

We have two apps **server** and **simulator**.

**Simulator** app produces speed and location coordinates and sends it to **server** app.

**Server** app consumes data from **simulator** app, updates in mongo database and sends the data to client using websockets.

- We are using KAFKA and Zookeeper to handle real time data simulation

**Tenderd-Frontend:**

We can see real time speed and coordinates coming from **server** app.

_**Happy Coding**_


