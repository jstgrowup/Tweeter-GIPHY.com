import nc from "next-connect";
import Connectdatabse from "../../../database/Connection";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import userModel from "../../../Models/UserModel";
import loginvalidate from "../../../config/Loginvalidate";
const app = nc();
Connectdatabse();
app.post(async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = loginvalidate(req.body);
    if (error) {
      return res.status(401).send({ message: error.details[0].message });
    }
    const emu = await userModel.findOne({ email: email });
    if (!emu) {
      return res.status(401).send({
        message: "User Does not exists please create an account",
      });
    }
    const data = await userModel.findOne({
      email: email,
    });
    if (!data) {
      return res.status(401).send({
        message: `User Doesnt exists`,
      });
    }

    const isVerified = await bycrypt.compare(password, data.password);

    if (!isVerified) {
      return res.status(401).send({ message: "Invalid or Wrong Password" });
    }
    const updated = {
      _id: data._id,
      username: data.username,
      email: data.email,
      img: data.img,
    };

    const accessToken = jwt.sign(updated, process.env.NEXT_PUBLIC_JWT_KEY, {
      expiresIn: "30d",
    });

    res.status(200).send({
      token: accessToken,
      message: "Log in successfull",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});
export default app;
