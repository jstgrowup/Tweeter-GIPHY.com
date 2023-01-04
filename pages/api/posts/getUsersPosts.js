import nc from "next-connect";

import Connectdatabse from "../../../database/Connection";
import jwt from "jsonwebtoken";
import PostModel from "../../../Models/PostsModel";
const app = nc();
Connectdatabse();
app.post(async (req, res) => {
  try {
    const { token } = req.body;
    
    const check = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);

    const respo = await PostModel.find({ userId: check._id });
  
    res.send(respo);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
export default app;
