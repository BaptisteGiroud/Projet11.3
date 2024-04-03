import React, { useState, useRef } from "react";

function Signin() {
  const [rememberMe, setRememberMe] = useState(false);
  const passwordInput = useRef();
  const usernameInput = useRef();
  const loginButton = useRef();

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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginRequest();
      if (response.error) {
        console.log("Echec de connexion");
        animationEchec();
      } else {
        const token = response.body.token;
        console.log("Connexion Reussi");
        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }
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
            <input
              type="text"
              id="username"
              required="required"
              ref={usernameInput}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required="required"
              ref={passwordInput}
            />
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
