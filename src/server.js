import express from "express";
import listEndpoints from "express-list-endpoints";
import postsRouter from "./services/posts/index.js";
import mongoose from "mongoose";

const server = express();

const port = process.env.PORT || 3001;

server.use(express.json());

server.use("/posts", postsRouter);

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
