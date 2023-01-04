import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    img: { type: String, required: true },
    verfied: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.models.users || mongoose.model("users", userSchema);
export default userModel;
