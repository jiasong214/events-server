import mongoose from 'mongoose';

// TODO: input validation

const UserSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "user"
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  wishlist: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Event",
    default: []
  },
  bookings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Booking",
    default: []
  }
});

// UserSchema.set("toJSON", {
//   transform: (doc, ret) => {
//     delete ret.password;
//   }
// });

export default mongoose.model("User", UserSchema);