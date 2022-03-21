import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/user.js';
import eventRouter from './routers/event.js';
import roomRouter from './routers/room.js';
import bookingRouter from './routers/booking.js';
import paymentRouter from './routers/payment.js';
import {config} from './config.js';

const PORT = config.host.port;

// create server
const app = express();

// run server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// middleware
const corsOption = {
  // origin: "*",
  origin: config.cors.allowedOrigin,
}

console.log({corsOption});

app.use(express.json());
app.use(cors(corsOption));


//router
app.use('/user', userRouter);
app.use('/event', eventRouter);
app.use('/room', roomRouter);
app.use('/booking', bookingRouter);
app.use('/payment', paymentRouter);


// DB connection
// mongoose.connect('mongodb://127.0.0.1:27017/events-website');
mongoose.connect(config.db.mongoURI);

const db = mongoose.connection;

