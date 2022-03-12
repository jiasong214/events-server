import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: String,
  // FIXME: temporary
  password: String,
  cart: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "event",
    default: []
  }
});

UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;

    delete ret.password;
    delete ret._id;
    delete ret.__v;
  }
})

export default mongoose.model("user", UserSchema);