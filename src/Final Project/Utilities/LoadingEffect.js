import React from "react";
import { pulsar } from "ldrs";
import "./LoadingScreen.css";

pulsar.register();

function LoadingEffect() {
  return (
    <div className="mt-5 d-flex justify-content-center align-items-center loading-screen">
      <l-pulsar size="150" speed="3.5" color='#c084fc'></l-pulsar>
      <p className="loading-text text-gradient">Loading...</p>
    </div>
  );
}

export default LoadingEffect;