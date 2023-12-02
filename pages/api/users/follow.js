import nc from "next-connect";
import Connectdatabse from "../../../database/Connection";
import userModel from "../../../Models/UserModel";
const app = nc();
Connectdatabse();

app.post(async (req, res) => {
  const { findId } = req.body;
  const data = await userModel.findById(findId);
  try {
    await userModel.findByIdAndUpdate(
      { _id: findId },
      {
        $set: { followers: data.followers + 1 },
      }
    );
    res.status(200).send({ message: "Followed" });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
export default app;
