import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";

export default function SignIn() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      await client.signInUser(user.username, user.password);
      navigate("/profile"); // we change when we have this layout figured
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      {error && <div>{error}</div>}
      <input 
        placeholder="Username"
        value={user.username} 
        onChange={(e) => setUser({ ...user, username: e.target.value })} 
      />
      <input 
        type="password"
        placeholder="Password"
        value={user.password} 
        onChange={(e) => setUser({ ...user, password: e.target.value })} 
      />
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}
