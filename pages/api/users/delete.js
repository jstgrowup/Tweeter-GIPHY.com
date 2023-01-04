import nc from "next-connect";

import Connectdatabse from "../../../database/Connection";

import userModel from "../../../Models/UserModel";

const app = nc();
Connectdatabse();

app.post(async (req, res) => {
  const { id } = req.body;
 
  try {
    await userModel.findByIdAndDelete({ _id: id });

    res.send("Deleted Successfully");
  } catch (error) {
    res.status(401).send(error.message);
  }
});
export default app