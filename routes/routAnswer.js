const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth");

const {
  createAnswer,
  getAnswers,
  deleteAnswer,
} = require("../Conteroller/answerController");

// Create an answer
router.post("/", authMiddleware, createAnswer);

// Get all answers for a question
router.get("/:questionid", getAnswers);

// Delete an answer
router.delete("/:answerid", authMiddleware, deleteAnswer);

module.exports = router;