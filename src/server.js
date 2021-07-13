import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import postsRouter from "./services/posts/index.js";
import authorsRouter from "./services/authors/index.js";

const server = express();

server.use(cors());
server.use(express.json());

server.use("/posts", postsRouter);
server.use("/authors", authorsRouter);

const port = process.env.PORT || 3001;
console.table(listEndpoints(server));
server.listen(port, () => console.log("🚀 Server is running on port ", port));

server.on("error", (error) =>
  console.log("🚀 Server is crashed due to ", error)
);
