const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Save Code Snippet
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, language, code } = req.body;

    const result = await pool.query(
      `INSERT INTO code_snippets (user_id, title, language, code)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [req.user.id, title, language, code]
    );

    res.status(201).json({
      message: "Code snippet saved successfully",
      snippet: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Get all snippets of logged in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM code_snippets
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;