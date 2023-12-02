import nc from "next-connect";

import Connectdatabse from "../../../database/Connection";

import PostModel from "../../../Models/PostsModel";
const app = nc();
Connectdatabse();
app.post(async (req, res) => {
  const { id, type } = req.body;
  const data = await PostModel.findById(id);
  try {
    if (type == "like") {
      await PostModel.findByIdAndUpdate(data._id, {
        $set: { likes: data.likes + 1 },
      });
      res.send("updated likes");
    } else {
      await PostModel.findByIdAndUpdate(data._id, {
        $set: { likes: data.likes - 1 },
      });
      res.send("updated dislikes");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});
export default app;
