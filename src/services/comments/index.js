import express from "express";
// import createError from "http-errors";

import CommentModel from "./schema.js";
// import postModel from "../posts/schema.js";

const commentsRouter = express.Router();

commentsRouter.get("/", async (req, res, next) => {
  try {
    const comments = await CommentModel.find();
    res.status(200).send(comments);
  } catch (error) {
    console.log(error);
  }
});

export default commentsRouter;
