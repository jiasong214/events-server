import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  rows: {
    type: Number,
    required: true
  },
  cols:{
    type: Number,
    required: true
  }
});

export default mongoose.model("Room", RoomSchema);