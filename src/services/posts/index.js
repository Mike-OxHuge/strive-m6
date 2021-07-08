import express from "express";
import createError from "http-errors";
import q2m from "query-to-mongo";

import PostModel from "./schema.js";
import CommentModel from "../comments/schema.js";
import AuthorModel from "../authors/schema.js";

const postsRouter = express.Router();

// all the posts + pagination, example route /posts?limit=3 makes it 3 posts per page.
postsRouter.get("/", async (req, res, next) => {
  try {
    const query = q2m(req.query);
    console.log(query);
    const total = await PostModel.countDocuments(query.criteria);
    const posts = await PostModel.find(query.criteria, query.options.fields)
      .skip(query.options.skip)
      .limit(query.options.limit)
      .sort(query.options.sort);
    res.status(200).send({ links: query.links("/posts", total), total, posts });
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
    if (post) {
      if (post.comments.length > 0) {
        res.status(200).send(post.comments[0]);
      } else {
        res.status(404).send("Comment not found!");
      }
    } else {
      res.status(404).send("Post not found!");
    }
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

// edit post
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

// edit comment
postsRouter.put("/:postId/comments/:commentId", async (req, res, next) => {
  try {
    const comment = await PostModel.findOneAndUpdate(
      { _id: req.params.postId, "comments._id": req.params.commentId },
      {
        $set: {
          "comments.$.rate": req.body.rate,
          "comments.$.text": req.body.text,
        },
      },
      { new: true }
    );
    if (comment) {
      res.send(`Comment with ID: ${req.params.commentId} has been updated!`);
    } else {
      next(createError(404, "comment not found!"));
    }
  } catch (error) {
    console.log(error);
  }
});

// delete post
postsRouter.delete("/:postId", async (req, res, next) => {
  try {
    await PostModel.findByIdAndDelete(req.params.postId);
    res.status(200).send("post has been deleted!");
  } catch (error) {
    console.log(error);
  }
});

// delete comment
postsRouter.delete("/:postId/comments/:commentId", async (req, res, next) => {
  try {
    const post = await PostModel.findByIdAndUpdate(
      req.params.postId,
      {
        $pull: {
          comments: { _id: req.params.commentId },
        },
      },
      { new: true }
    );
    if (post) {
      res.send(post);
    } else {
      res.send("user not found");
    }
  } catch (error) {
    console.log(error);
  }
});

export default postsRouter;

// full code reference is in here:
// https://github.com/nclBaz/strive-m6-d3-apr21
