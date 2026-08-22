import React from 'react'
import { useRef } from "react";
import { useNavigate} from 'react-router-dom';
import axios from '../axios';

function Login() {
   const navigate = useNavigate();
   const emailDom = useRef();
   const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
     const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
     if(
       !emailValue ||
      !passwordValue 
    )
    {
      alert('please provide all required information');
      return;
    }
     try {
   const {data} = await axios.post('/users/login',{
       email: emailValue,
      password: passwordValue
    });
    alert('Login successfull.')
      localStorage.setItem('token', data.token);
   // navigate('/home');
   
  } catch (error) {
    alert(error?.response?.data?.msg);
    console.log(error.response.data);
  }}
  return (
    <div>
       <section>
       <form onSubmit={handleSubmit}>
        
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

          <button type="submit">Login</button>
        </form>
      </section>
    </div>
    
  )
}

export default Login;
