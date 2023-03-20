import React, { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";


export default function Login(props) {
  const mobile = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);

  const onLogin = (event) => {
    event.preventDefault();
    console.log( { mobile: mobile.current.value, password: password.current.value })
    loginCall(
      { mobile: mobile.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ESocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on ESocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={onLogin}>
            <input
              type="text"
              placeholder="Mobile"
              required
              className="loginInput"
              ref={mobile}
              minLength="10"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="loginInput"
              ref={password}
              minLength="6"
            />
            <button className="loginButton">
              {isFetching ? "Loading..." : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
