import BookingData from '../models/Booking.js';


export const getAll = async (req, res) => {
  const booking = await BookingData.find().populate("event", "user");

  return res.status(200).json(booking);
}

export const getOne = async (req, res) => {
  const booking = await BookingData.findOne({_id: req.params.id}).populate("event", "user");

  return res.status(200).json(booking);
}

export const create = async (req, res) => {
  // const userID = req.
  // const booking = await BookingData.create({...req.body});

  // return res.status(200).json(booking);
}