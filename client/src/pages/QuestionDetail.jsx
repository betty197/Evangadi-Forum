import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import Answer from "./Answer";

function QuestionDetail() {
  const { questionid } = useParams();

  const [question, setQuestion] = useState(null);

  async function getQuestion() {
    try {
      const response = await axios.get(
        `/questions/${questionid}`
      );

      console.log("Question:", response.data);

      setQuestion(
        response.data.question || response.data
      );
    } catch (error) {
      console.log(
        "Error:",
        error.response?.data
      );
    }
  }

  useEffect(() => {
    getQuestion();
  }, [questionid]);

  if (!question) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>{question.title}</h1>

      <p>{question.description}</p>

      <p>
        Asked by:{" "}
        <strong>{question.username}</strong>
      </p>

      <hr />

      {/* Answer form */}
      <Answer questionid={questionid} />
    </div>
  );
}

export default QuestionDetail;