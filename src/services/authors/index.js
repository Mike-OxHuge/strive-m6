import { Router } from "express";
import sequelize from "sequelize";
// import models from "../../lib/db/index.js";
import { Author } from "../../lib/db/index.js";
// const { Author } = models;
const { Op } = sequelize;

const router = Router();

router
  .route("/")
  .get(async (_req, res, next) => {
    try {
      const data = await Author.findAll();
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (_req, res, next) => {
    try {
      const data = await Author.create(_req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

// router
//   .route("/:authorId")
//   .get(async (_req, res, next) => {
//     try {
//       const query = `SELECT * FROM authors WHERE author_id='${_req.params.authorId}'`;
//       const result = await db.query(query);
//       res.send(result.rows);
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   })
//   .put(async (_req, res, next) => {
//     try {
//       const query = `UPDATE authors SET
//         name='${_req.body.name}', surname='${_req.body.surname}', avatar='${_req.body.avatar}'
//             WHERE author_id='${_req.params.authorId}'
//                 RETURNING*`;
//       const result = await db.query(query);
//       res.send(result.rows);
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   })
//   .delete(async (_req, res, next) => {
//     try {
//       const query = `DELETE FROM authors
//                         WHERE
//                             author_id='${_req.params.authorId}'
//                                 RETURNING*`;
//       const result = await db.query(query);
//       res.send(result.rows);
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   });

export default router;
