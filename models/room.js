import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  type: String,
  rows: Number,
  cols: Number
});

export default mongoose.model("Room", RoomSchema);