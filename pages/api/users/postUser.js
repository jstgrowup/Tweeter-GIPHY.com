import nc from "next-connect";
import validate from "../../../config/Validate";
import Connectdatabse from "../../../database/Connection";

import bycrypt from "bcrypt";
import userModel from "../../../Models/UserModel";
const app = nc();
Connectdatabse();
app.post(async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(401).send({ message: error.details[0].message });
    }
    const data = await userModel.findOne({ email: req.body.email });
    if (data) {
      return res
        .status(401)
        .send({ message: "User already exists please log in" });
    }
    const salt = await bycrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bycrypt.hash(req.body.password, salt);

    await userModel.create({
      ...req.body,
      password: hashPassword,
    });

    res.send({ message: "User Created Successfully" });
  } catch (error) {
    res
      .status(401)
      .send({ message: "Internal server error please try again later" });
  }
});
export default app;
