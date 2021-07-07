import mongoose from "mongoose";
import { CommentSchema } from "../comments/schema.js";
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    readTime: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
    },
    content: { type: String, required: true },
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

export default model("Post", PostSchema);
