import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [rememberMe, setRememberMe] = useState(false);
  const passwordInput = useRef();
  const usernameInput = useRef();
  const loginButton = useRef();
  const isLoggedIn = useSelector((state) => state.log.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // VERIFY IF LOGGED //

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  // FETCH LOGIN //

  async function loginRequest() {
    /* prettier-ignore */
    let loginForm = {
      "email": usernameInput.current.value,
      "password": passwordInput.current.value,
    };
    let chargeUtile = JSON.stringify(loginForm);

    return await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile,
    }).then((resp) => resp.json());
  }

  // MANAGE FORM //

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginRequest();
      if (response.error) {
        animationEchec();
      } else {
        const token = response.body.token;
        sessionStorage.setItem("token", token);
        if (rememberMe) {
          localStorage.setItem("token", token);
        }
        dispatch({ type: "LOGIN_SUCCESS" });
        navigate("/profile");
      }
    } catch (error) {
      animationEchec();
    }
  };

  function animationEchec() {
    passwordInput.current.classList.add("loginFailed");
    usernameInput.current.classList.add("loginFailed");
    window.setTimeout(function () {
      passwordInput.current.classList.remove("loginFailed");
      usernameInput.current.classList.remove("loginFailed");
    }, 500);
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required ref={usernameInput} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required ref={passwordInput} />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            className="sign-in-button"
            id="sign-in-button"
            ref={loginButton}
            onClick={handleLogin}
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default Signin;
