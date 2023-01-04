import mongoose from "mongoose";
const PostsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    userName: { type: String, required: true },
    caption: { type: String, required: true },
    url: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const PostModel = mongoose.models.posts || mongoose.model("posts", PostsSchema);
export default PostModel;
