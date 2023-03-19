import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import "./register.css";
;


export default function Register() {
  const username=useRef();
  const mobile=useRef();
  const email=useRef();
  const password=useRef();
  const passwordAgain=useRef();
  const navigate=useNavigate();

const onRegister= async (event)=>{
event.preventDefault();
if(passwordAgain.current.value!==password.current.value){
  passwordAgain.current.setCustomValidity("does't match with password");
}else{
  const userCredential={
    username:username.current.value,
    mobile:mobile.current.value,
    email:email.current.value,
    password:password.current.value
  }
  try {
    await axios.post("/auth/register",userCredential);
    navigate("/login");
  } catch (error) {
    console.log(error) 
  }
}
}

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Esocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Esocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={onRegister}>
            <input type="text" required placeholder="Username" ref={username} className="loginInput" />
            <input type="text" required minLength="10" placeholder="Mobile" ref={mobile} className="loginInput" />
            <input type="email"  required  placeholder="Email" ref={email} className="loginInput" />
            <input type="password" required minLength="6" placeholder="Password" ref={password} className="loginInput" />
            <input type="password" required minLength="6" placeholder="Password Again" ref={passwordAgain} className="loginInput" />
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
