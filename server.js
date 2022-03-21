import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/user.js';
import eventRouter from './routers/event.js';
import roomRouter from './routers/room.js';
import bookingRouter from './routers/booking.js';
import paymentRouter from './routers/payment.js';

dotenv.config();

const PORT = process.env.PORT || 8080;

// create server
const app = express();

// run server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// middleware
app.use(express.json());
app.use(cors());


//router
app.use('/user', userRouter);
app.use('/event', eventRouter);
app.use('/room', roomRouter);
app.use('/booking', bookingRouter);
app.use('/payment', paymentRouter);


// DB connection

mongoose.connect(process.env.MONGO_URI)
// mongoose.connect('mongodb://127.0.0.1:27017/events-website');
const db = mongoose.connection;

