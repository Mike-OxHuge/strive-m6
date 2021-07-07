import express from "express";
import createError from "http-errors";

import PostModel from "./schema.js";
import CommentModel from "../comments/schema.js";

const postsRouter = express.Router();

// all the posts
postsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await PostModel.find();
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
  }
});

// single post
postsRouter.get("/:postId", async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.postId);
    res.status(200).send(post);
  } catch (error) {
    console.log(error);
  }
});

// all the comments for single post
postsRouter.get("/:postId/comments", async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.postId);
    if (post) {
      res.send(post.comments);
    } else {
      next(createError(404, "post not found!"));
    }
  } catch (error) {
    next(createError(500, "Generic Error"));
  }
});

// single comment
postsRouter.get("/:postId/comments/:commentId", async (req, res, next) => {
  try {
    // const wholePost = await PostModel.findById(req.params.postId);
    const post = await PostModel.findById(req.params.postId, {
      comments: { $elemMatch: { _id: req.params.commentId } },
    });
    console.log(`
    postId from request: ${req.params.postId}
    commentId from request: ${req.params.commentId}
    `);
    console.log(post);
    res.send(post);
    // if (post) {
    //   if (post.comments.length > 0) {
    //     res.status(200).send(post.comments[0]);
    //   } else {
    //     res.status(404).send("Comment not found!");
    //   }
    // } else {
    //   res.status(404).send("Post not found!");
    // }
  } catch (error) {
    console.log(error);
  }
});

// new post
postsRouter.post("/", async (req, res, next) => {
  try {
    const newPost = new PostModel(req.body);
    await newPost.save();
    res.status(201).send("WELL DONE! THE NEW POST IS RIGHT HERE!");
  } catch (error) {
    console.log(error);
  }
});

// new comment
postsRouter.post("/:postId/comments", async (req, res, next) => {
  try {
    const postId = req.body.postId;
    const newComment = new CommentModel(req.body);
    if (newComment) {
      const commentToInsert = { ...newComment.toObject() };
      console.log(await PostModel.findByIdAndUpdate(req.params.postId));
      const updatedPost = await PostModel.findByIdAndUpdate(
        req.params.postId,
        {
          $push: { comments: commentToInsert },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (updatedPost) {
        res.send(updatedPost);
      } else {
        next(createError(404, "post not found!"));
      }
    } else {
      res.status(500).send("something went wrong!");
    }
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

// full code reference is in here:
// https://github.com/nclBaz/strive-m6-d3-apr21
