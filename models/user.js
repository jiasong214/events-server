import mongoose from 'mongoose';

// TODO: input validation

const UserSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "user"
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "event",
    default: []
  }
});

// UserSchema.set("toJSON", {
//   transform: (doc, ret) => {
//     delete ret.password;
//   }
// });

export default mongoose.model("User", UserSchema);