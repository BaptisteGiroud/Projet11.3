import React, { useState } from "react";

function ButtonLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    try {
      /* prettier-ignore */
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email": username,
          "password": password,
        }),
      });
      const data = await response.json();
      console.log("Réponse du serveur:", data);
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  return (
    <button className="sign-in-button" onClick={handleLogin}>
      Sign In
    </button>
  );
}

export default ButtonLogin;
