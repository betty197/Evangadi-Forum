import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Questions from "./pages/Questions";
import QuestionDetail from "./pages/QuestionDetail";

import { useEffect, useState, createContext } from "react";
import axios from "./axios";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkUser() {
    if (!token) {
      return;
    }

    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setUser(data);
    } catch (error) {
      console.log(error.response);

      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Questions */}
        <Route path="/questions" element={<Questions />} />

        {/* Question + Answers */}
        <Route
          path="/questions/:questionid"
          element={<QuestionDetail />}
        />

      </Routes>
    </AppState.Provider>
  );
}

export default App;