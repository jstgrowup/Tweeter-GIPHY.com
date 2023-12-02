import nc from "next-connect";
import Connectdatabse from "../../../database/Connection";
import PostModel from "../../../Models/PostsModel";
const app = nc();
Connectdatabse();
app.post(async (req, res) => {
  try {
    const repo = await PostModel.create(req.body);
    res.send(repo);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
export default app;
