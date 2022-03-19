import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seats: {
    type: [],
    required: true,
  },
  paymentID: {
    type: String,
    required: true,
  }
});

export default mongoose.model("Booking", BookingSchema);