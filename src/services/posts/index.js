import { Router } from "express";
import * as db from "../../lib/db/index.js";

const router = Router();

router
  .route("/")
  .get(async (_req, res, next) => {
    try {
      const query = `SELECT * FROM posts`;
      const result = await db.query(query);
      res.send(result.rows);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const query = `INSERT INTO posts
                        (category, title, cover, read_time_value, read_time_unit, author_id, content)
                            VALUES
                    ('${req.body.category}',
                        '${req.body.title}',
                        '${req.body.cover}',
                        ${parseInt(req.body.read_time_value)}, 
                        '${req.body.read_time_unit}', 
                        ${parseInt(req.body.author_id)},
                        '${req.body.content}')`;
      //   console.log(query);
      const result = await db.query(query);
      res.send(result.rows);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
// "category": "ARTICLE CATEGORY",
// "title": "ARTICLE TITLE",
// "cover":"ARTICLE COVER (IMAGE LINK)",
// "read_time_value": 2,
// "read_time_unit": "minute"
// "author":"AUTHOR FOREIGN KEY",
// "content": "HTML",

// {
//     "category": "ARTICLE CATEGORY",
//     "title": "ARTICLE TITLE",
//     "cover":"ARTICLE COVER (IMAGE LINK)",
//     "read_time_value": 2,
//     "read_time_unit": "minute"
//     "author_id": 7,
//     "content": "HTML"
// }
// router
//   .route("/:postId")
//   .get(async (_req, res, next) => {
//     try {
//       const query = ``;
//       const result = await db.query(query);
//       res.send(result.rows);
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   })
//   .put(async (_req, res, next) => {
//     try {
//       const query = ``;
//       const result = await db.query(query);
//       res.send(result.rows);
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   })
//   .delete(async (_req, res, next) => {
//     try {
//       const query = ``;
//       const result = await db.query(query);
//       res.send(result.rows);
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   });

export default router;
