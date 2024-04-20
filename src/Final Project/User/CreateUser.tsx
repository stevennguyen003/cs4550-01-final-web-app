import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";

export default function CreateUser() {
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "", 
  });
  const navigate = useNavigate();

  const createUser = async () => {
    try {
      const userToCreate = {
        ...newUser,
        dob: new Date(newUser.dob), 
      };
      await client.createUser(userToCreate);
      navigate("/profile");   // change when we have this layout figured
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Create Account</h1>
      {error && <div>{error}</div>}
      <input name="username" placeholder="Username" value={newUser.username} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" value={newUser.password} onChange={handleChange} />
      <input name="firstName" placeholder="First Name" value={newUser.firstName} onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" value={newUser.lastName} onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" value={newUser.email} onChange={handleChange} />
      <input name="dob" type="date" value={newUser.dob} onChange={handleChange} />
      <button onClick={createUser}>Create Account</button>
    </div>
  );
}
