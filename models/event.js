import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  image: {
    type: String,
    default: ""
  },
  info: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  bookings: {
    type: String,
    default: JSON.stringify({
      "1-1": "1"
    })
  }
});

export default mongoose.model("Event", EventSchema);