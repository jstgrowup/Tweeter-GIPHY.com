import nc from "next-connect";
import Connectdatabse from "../../../database/Connection";
import PostModel from "../../../Models/PostsModel";
const app = nc();
Connectdatabse();
app.post(async (req, res) => {
  const { id } = req.body;
  const data = await PostModel.findById(id);
  try {
    if (data) {
      await PostModel.findByIdAndDelete(id);
      res.send("deleted");
    } else {
      res.status(404).send(error.message);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});
export default app;
