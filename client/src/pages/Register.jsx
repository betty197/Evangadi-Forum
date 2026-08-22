import { useRef } from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "../axios";

function Register() {
  const navigate = useNavigate();

  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const usernameValue = usernameDom.current.value;
    const firstnameValue = firstnameDom.current.value;
    const lastnameValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("Please provide all required information");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });

      alert("Registration successful. Please login");
      navigate("/login");
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("MESSAGE:", error.message);

      alert(
        error.response?.data?.msg ||
        "Something went wrong"
      );
    }
  }

  return (
    <div>
      <section>
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <span>Username: </span>
            <input
              ref={usernameDom}
              type="text"
              placeholder="username"
            />
          </div>

          <br />

          <div>
            <span>Firstname: </span>
            <input
              ref={firstnameDom}
              type="text"
              placeholder="firstname"
            />
          </div>

          <br />

          <div>
            <span>Lastname: </span>
            <input
              ref={lastnameDom}
              type="text"
              placeholder="lastname"
            />
          </div>

          <br />

          <div>
            <span>Email: </span>
            <input
              ref={emailDom}
              type="email"
              placeholder="email"
            />
          </div>

          <br />

          <div>
            <span>Password: </span>
            <input
              ref={passwordDom}
              type="password"
              placeholder="password"
            />
          </div>

          <br />

          <button type="submit">Register</button>
        </form>
        <Link to={'/login'}>Login</Link>
      </section>
    </div>
  );
}

export default Register;