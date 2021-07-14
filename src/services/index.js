import express from "express";
const route = express.Router();

import authorsRouter from "./authors/index.js";
import postsRouter from "./posts/index.js";

route.use("/authors", authorsRouter);
route.use("/posts", postsRouter);

export default route;
