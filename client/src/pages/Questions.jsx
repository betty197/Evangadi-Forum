import { useEffect, useState } from "react";
import axios from "../axios";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Get all questions
  async function getQuestions() {
    try {
      const response = await axios.get("/questions");

      console.log("Questions:", response.data);

      setQuestions(response.data.questions || response.data);
    } catch (error) {
      console.log("Error:", error.response?.data);
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  // Submit question
  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please provide a title and description");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/questions", {
        title: title,
        description: description,
      });

      console.log("Created:", response.data);

      alert("Question posted successfully!");

      // Clear form
      setTitle("");
      setDescription("");

      // Refresh questions
      getQuestions();
    } catch (error) {
      console.log("Error:", error.response?.data);

      alert(
        error.response?.data?.msg ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Question Form */}
      <section>
        <h1>Ask a Question</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Question Title</label>
            <br />

            <input
              type="text"
              placeholder="Enter your question"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <br />

          <div>
            <label>Description</label>
            <br />

            <textarea
              placeholder="Explain your question..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows="6"
              cols="50"
            />
          </div>

          <br />

          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post Question"}
          </button>
        </form>
      </section>

      <hr />

      {/* Questions List */}
      <section>
        <h2>All Questions</h2>

        {questions.length === 0 ? (
          <p>No questions yet.</p>
        ) : (
          questions.map((question) => (
            <div key={question.questionid}>
              <h3>{question.title}</h3>

              <p>{question.description}</p>

              <p>
                Asked by:{" "}
                <strong>
                  {question.username}
                </strong>
              </p>

              <hr />
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Questions;