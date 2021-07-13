import { Router } from "express";
import * as db from "../../lib/db/index.js";

const router = Router();

router
  .route("/")
  .get(async (_req, res, next) => {
    try {
      const query = `SELECT * FROM authors`;
      const result = await db.query(query);
      res.send(result.rows);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (_req, res, next) => {
    try {
      const query = `INSERT INTO authors
            (name, surname, avatar)
                VALUES 
                    ( '${_req.body.name}', '${_req.body.surname}', '${_req.body.avatar}' )
                        RETURNING*`;
      const result = await db.query(query);
      res.send(result.rows);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router
  .route("/:authorId")
  .get(async (_req, res, next) => {
    try {
      const query = `SELECT * FROM authors WHERE author_id='${_req.params.authorId}'`;
      const result = await db.query(query);
      res.send(result.rows);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (_req, res, next) => {
    try {
      const query = `UPDATE authors SET 
        name='${_req.body.name}', surname='${_req.body.surname}', avatar='${_req.body.avatar}' 
            WHERE author_id='${_req.params.authorId}' 
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
      const query = `DELETE FROM authors
                        WHERE
                            author_id='${_req.params.authorId}'
                                RETURNING*`;
      const result = await db.query(query);
      res.send(result.rows);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default router;
