import nc from "next-connect";
import Connectdatabse from "../../../database/Connection";
const app = nc();
Connectdatabse();
import jwt from "jsonwebtoken";
import userModel from "../../../Models/UserModel";
app.post(async (req, res) => {
  const { token } = req.body;
  

  try {
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY, (err, details) => {
      if (err) {
        return res.status(401).send({ message: "Please Login again" });
      }
      const { _id } = details;
      userModel
        .findById(_id)
        .then((respo) =>
          res.status(201).send({ data: respo, message: "Valid User" })
        )
        .catch((er) => res.status(404).send(er.message));
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
export default app;
