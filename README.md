# Event venue website (Server)

Server side of Event venue website. Completed as part of the final project for General Assembly. The purpose for this project was to really get an understanding of the MERN stack.

[Click here for Demo](https://jiasong214.github.io/events-client)

## Features

- CRUD for models (user, event, room, booking)
- User authentication with JWT.
- Payment system with [Stripe](https://stripe.com/au).

## Tech stack

- Node.js
- Express
- Mongoose
- MongoDB

## How to use

1. Clone the repo

```
$ git clone git@github.com:jiasong214/events-server.git
```

2. Create .env file

```javascript
// .env
PORT={port number}
MONGO_URI={your mongoDB uri}
JWT_SECRET={your jwt secret}
JWT_EXPIRES_SEC={your jwt expires sec}
```

3. Install npm packages and create seed data

```
$ npm install
$ npm run seed
```

## API endpoints

```javascript
// user
GET user/me
GET user/:id
POST user/signup
POST user/login
POST user/:id/wishlist
DELETE user/:id/wishlist/:eventID

// event
GET event
POST event
GET event/:id
PUT event/:id
DELETE event/:id
GET event/type/:type
GET event/search/:term

// room
GET room
POST room
GET room/:id
PUT room/:id
DELETE room/:id

// booking
GET booking
POST booking
GET booking/:id
```
