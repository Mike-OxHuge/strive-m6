import express from "express";
import createError from "http-errors";

import AuthorSchema from "./schema.js";

const authorsRouter = express.Router();

// get all authors
authorsRouter.get("/", async (req, res, next) => {
  try {
    const authors = await AuthorSchema.find();
    res.status(200).send(authors);
  } catch (error) {
    console.log(error);
  }
});

// create new author
authorsRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = new AuthorSchema(req.body);
    await newAuthor.save();
    res.status(201).send(`successfully created new author`);
  } catch (error) {
    console.log(error);
  }
});

export default authorsRouter;
