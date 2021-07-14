import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import postsRouter from "./services/posts/index.js";
import authorsRouter from "./services/authors/index.js";
import services from "./services/index.js";
import db from "./lib/db/index.js";

const server = express();

server.use(cors());
server.use(express.json());

// server.use("/posts", postsRouter);
// server.use("/authors", authorsRouter);
server.use("/api", services);

const port = process.env.PORT || 5000;

db.sequelize
  .sync({ force: true, alter: true })
  .then(() => {
    app.listen(port, () => console.log("server is running: " + port));
    app.on("error", (error) =>
      console.info(" ❌ Server is not running due to : ", error)
    );
  })
  .catch((e) => {
    console.log(e);
  });
