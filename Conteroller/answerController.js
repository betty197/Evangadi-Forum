const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Create an answer
async function createAnswer(req, res) {
  const { questionid, answer } = req.body;

  if (!questionid || !answer) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please provide questionid and answer",
    });
  }

  try {
    // Get logged-in user's ID from authMiddleware
    const customerid = req.customer.customerid;

    // Check if the question exists
    const [question] = await dbConnection.promise().query(
      "SELECT questionid FROM questions WHERE questionid = ?",
      [questionid]
    );

    if (question.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Question not found",
      });
    }

    // Insert answer
    await dbConnection.promise().query(
      `INSERT INTO answers (questionid, customerid, answer)
       VALUES (?, ?, ?)`,
      [questionid, customerid, answer]
    );

    return res.status(StatusCodes.CREATED).json({
      msg: "Answer posted successfully",
    });
  } catch (error) {
    console.log(error.message);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Server error",
    });
  }
}

// Get all answers for a question
async function getAnswers(req, res) {
  const { questionid } = req.params;

  try {
    const [answers] = await dbConnection.promise().query(
      `SELECT 
        a.answerid,
        a.answer,
        a.questionid,
        a.customerid,
        c.username
       FROM answers a
       JOIN customers c
       ON a.customerid = c.customerid
       WHERE a.questionid = ?
       ORDER BY a.answerid ASC`,
      [questionid]
    );

    return res.status(StatusCodes.OK).json({
      answers,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Server error",
    });
  }
}

// Delete an answer
async function deleteAnswer(req, res) {
  const { answerid } = req.params;
  const customerid = req.customer.customerid;

  try {
    // Find the answer
    const [answer] = await dbConnection.promise().query(
      "SELECT customerid FROM answers WHERE answerid = ?",
      [answerid]
    );

    if (answer.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Answer not found",
      });
    }

    // Check ownership
    if (answer[0].customerid !== customerid) {
      return res.status(StatusCodes.FORBIDDEN).json({
        msg: "You are not allowed to delete this answer",
      });
    }

    // Delete answer
    await dbConnection.promise().query(
      "DELETE FROM answers WHERE answerid = ?",
      [answerid]
    );

    return res.status(StatusCodes.OK).json({
      msg: "Answer deleted successfully",
    });
  } catch (error) {
    console.log(error.message);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Server error",
    });
  }
}

module.exports = {
  createAnswer,
  getAnswers,
  deleteAnswer,
};