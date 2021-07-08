import mongoose from "mongoose";
import { AuthorSchema } from "../authors/schema.js";

const { Schema, model } = mongoose;

export const CommentSchema = new Schema(
  {
    author: [AuthorSchema],
    rate: {
      type: Number,
      min: 1,
      max: 5,
      default: 1,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Comment", CommentSchema);
