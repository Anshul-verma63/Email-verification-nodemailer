import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password id required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("user", userSchema);
