import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

import postsRouter from "./services/posts/index.js";
import commentsRouter from "./services/comments/index.js";
import authorsRouter from "./services/authors/index.js";
const server = express();

const port = process.env.PORT || 3001;

server.use(express.json());

server.use("/posts", postsRouter);
server.use("/comments", commentsRouter);
server.use("/authors", authorsRouter);

console.table(listEndpoints(server));

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    server.listen(port, () => {
      console.log("Server running on port ", port);
    })
  )
  .catch((err) => console.log(err));
