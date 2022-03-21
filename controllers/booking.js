import EventData from '../models/Event.js';
import BookingData from '../models/Booking.js';
import UserData from '../models/User.js';


export const getAll = async (req, res) => {
  const booking = await BookingData.find()
    .populate("user")
    .populate("event");

  return res.status(200).json(booking);
}

export const getOne = async (req, res) => {
  const booking = await BookingData.findOne({_id: req.params.id})
    .populate("user")
    .populate("event");

  return res.status(200).json(booking);
}

export const create = async (req, res) => {
  const {userID, eventID, seats, paymentID} = req.body;

  // 1. create a booking
  const newBooking = await BookingData.create({
    user: userID,
    event: eventID,
    seats,
    paymentID
  });

  // 2. push the booking in User data
  const user = await UserData.findOne({_id: userID});
  user.bookings.push(newBooking._id);
  await user.save();

  // // 3. push the booking in Event data
  const event = await EventData.findOne({_id: eventID});
  event.bookings.push(newBooking._id);
  await event.save();

  return res.status(200).json(newBooking);
}