import mongoose from "mongoose";

const forgotSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, required: true },
   
  },
  {
    versionKey: false,
  }
);
const ForgotModel =
  mongoose.models.forgot || mongoose.model("forgot", forgotSchema);
export default ForgotModel;
