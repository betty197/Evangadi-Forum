const express = require("express");

const router = express.Router();

const {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  deleteQuestion,
} = require("../Conteroller/questionController");

// Create a question
router.post("/", createQuestion);

// Get all questions
router.get("/", getAllQuestions);

// Get one question
router.get("/:questionid", getSingleQuestion);

// Delete a question
router.delete("/:questionid", deleteQuestion);

module.exports = router;