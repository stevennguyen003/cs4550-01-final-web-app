import React from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";

export default function SignOutButton() {
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await client.signOutUser();
      navigate("/"); // change when we figure this out
    } catch (err: any) {
      console.error(err.response.data.message);
    }
  };

  return (
    <button onClick={signOut}>Sign Out</button>
  );
}
