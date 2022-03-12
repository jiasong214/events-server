import mongoose, { Schema } from 'mongoose';

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
    ref: "room",
    required: true,
  }
});

export default mongoose.model("event", EventSchema);