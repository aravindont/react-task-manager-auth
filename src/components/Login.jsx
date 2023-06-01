import React from "react";
import axios from "axios";

const Login = ({ setLoggedIn }) => {
  const handleLogin = async () => {
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      });
      if (response.status === 200) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;
