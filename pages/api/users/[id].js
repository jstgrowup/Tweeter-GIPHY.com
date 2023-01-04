import nc from "next-connect";
import Connectdatabse from "../../../database/Connection";
import userModel from "../../../Models/UserModel";
import joi from "joi";
import passwordComplexity from "joi-password-complexity";
import bycrypt from "bcrypt";
const app = nc();
Connectdatabse();
const validate = (data) => {
  const schema = joi.object({
    username: joi.string().required().label("username"),
    password: passwordComplexity().required().label("password"),
  });
  return schema.validate(data);
};
app.patch(async (req, res) => {
  const { id } = req.query;

  const { username, password } = req.body;

  try {
    const { error } = validate(req.body);

    if (error) {
      return res.status(401).send({ message: error.details[0].message });
    }
    const data = await userModel.findById({ _id: id });
    if (!data) {
      return res.status(401).send({ message: "User Doesnt exsists" });
    }
    const salt = await bycrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bycrypt.hash(password, salt);

    await userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { username: username, password: hashPassword } }
    );
    res.send({ message: "Updated Successfully" });
  } catch (error) {
    res.status(401).send(error.message);
  }
});
export default app;
