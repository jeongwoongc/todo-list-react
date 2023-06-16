import React, { useState } from "react";
import axios from "axios";

const HomeGuest = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    // Perform login or signup logic here
    // if (isLogin) {
    //   console.log("Email:", email);
    //   console.log("Password:", password);
    // } else {
    //   console.log("Username:", username);
    //   console.log("Email:", email);
    //   console.log("Password:", password);
    // }
    try {
      await axios.post("http://localhost:8000/api/users/", { username: "testasd", email: "test@test", password: "tes231sghfght12311" });
      console.log("User was successfully created.");
    } catch (e) {
      console.log(e);
    }
  }

  const clearForm = () => {
    setIsLogin(!isLogin);
    // Clear input fields when switching to login/signup
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="home-guest">
      <div className="home-guest-card">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && <input type="text" placeholder="Username" autoComplete="off" id="username" value={username} onChange={e => setUsername(e.target.value)} />}
          <br />
          <input type="email" placeholder="Email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
          <br />
          <input type="password" placeholder="Password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
          <br />
          <br />
          <button className="guest-submit" role="button">
            <span>{isLogin ? "Login" : "Sign Up"}</span>
          </button>
        </form>
        <br />
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button className="toggle-btn" onClick={clearForm}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default HomeGuest;
