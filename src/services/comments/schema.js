import mongoose from "mongoose";

const { Schema, model } = mongoose;

export const CommentSchema = new Schema(
  {
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
