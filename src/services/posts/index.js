import { Router } from "express";
import sequelize from "sequelize";
import models from "../../lib/db/index.js";

const { Post } = models;
const { Op } = sequelize;
const router = Router();

router
  .route("/")
  .get(async (_req, res, next) => {
    try {
      const data = await Post.findAll();
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Post.create(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router
  .route("/:postId")
  .get(async (_req, res, next) => {
    try {
      const query = `SELECT * FROM posts WHERE post_id=${_req.params.postId}`;
      const result = await db.query(query);
      res.send(result.rows);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (_req, res, next) => {
    try {
      const query = `UPDATE posts SET
                    category='${_req.body.category}', 
                    title='${_req.body.title}', 
                    cover='${_req.body.cover}', 
                    read_time_value=${parseInt(_req.body.read_time_value)}, 
                    read_time_unit='${_req.body.read_time_unit}', 
                    content='${_req.body.content}'
                        WHERE post_id=${_req.params.postId}
                            RETURNING*`;
      const result = await db.query(query);
      res.send(result.rows);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (_req, res, next) => {
    try {
      const query = `DELETE FROM posts WHERE post_id=${_req.params.postId} RETURNING* `;
      const result = await db.query(query);
      res.send(result.rows);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
export default router;
