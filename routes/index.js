import { Router } from "express";
import pool from "../config/dbconfig.js";
const router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  try {
    pool.query("select * from family_tree;", (err, result) => {
      if (err) {
        throw err;
      }
      if (result.rows.length < 1) {
        res.json({ message: "There are no family members in the database" });
      } else {
        res.json(result.rows);
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router
