import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createPost,
  getPosts,
  deletepost,
  updatepost,
} from "../controllers/post.controller.js";
import Post from "../models/post.model.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", verifyToken, deletepost);
router.put("/updatepost/:postId/:userId", verifyToken, updatepost);
// router.get("/testpost", async (req, res) => {
//   const searchTerm = "next.js";
//   const regex = new RegExp(searchTerm, "i");

//   console.log(regex);

//   const filter = {
//     $or: [{ title: regex }, { content: regex }],
//   };

//   console.log(filter);

//   const posts = await Post.find(filter);
//   console.log(posts);
//   res.send(posts);
// });

export default router;
