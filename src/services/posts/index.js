import express from "express";
// import createError from "http-errors";

import PostModel from "./schema.js";

const postsRouter = express.Router();

postsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await PostModel.find();
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
  }
});

postsRouter.get("/:postId", async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.postId);
    res.status(200).send(post);
  } catch (error) {
    console.log(error);
  }
});

postsRouter.post("/", async (req, res, next) => {
  try {
    const newPost = new PostModel(req.body);
    await newPost.save();
    res.status(201).send("WELL DONE! THE NEW POST IS RIGHT HERE!");
  } catch (error) {
    console.log(error);
  }
});

postsRouter.put("/:postId", async (req, res, next) => {
  try {
    const post = await PostModel.findByIdAndUpdate(
      req.params.postId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send(`Post with ID ${post._id} has been updated!`);
  } catch (error) {
    console.log(error);
  }
});

postsRouter.delete("/:postId", async (req, res, next) => {
  try {
    await PostModel.findByIdAndDelete(req.params.postId);
    res.status(200).send("post has been deleted!");
  } catch (error) {
    console.log(error);
  }
});

export default postsRouter;

// full CRUD code reference is in here:
// https://github.com/nclBaz/strive-m6-d2-apr21/blob/main/src/services/users/index.js
