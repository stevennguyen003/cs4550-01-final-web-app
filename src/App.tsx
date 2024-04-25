import React, { Suspense } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import LandingPage from "./Final Project/LandingPage";
import { useState, useEffect } from "react";
import Home from "./Final Project/Home";
import LoadingScreen from "./Final Project/Utilities/LoadingScreen";
import CreateProfile from "./Final Project/Profile/CreateProfile";
import ProfileScreen from "./Final Project/Profile/Screen";

function App() {

  return (
    <HashRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
        <Route path="/" element={<Navigate to="/Main/Login" />} />
          <Route path="Main/:param" element={<LandingPage />} />
          <Route path="/Profile/create" element={<CreateProfile />} />
          <Route path="/Profile/:param" element={<ProfileScreen />} />
          <Route path="Home/*" element={<Home />} />

        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
