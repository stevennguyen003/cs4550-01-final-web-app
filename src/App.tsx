import React, { Suspense } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import LandingPage from "./Final Project/LandingPage";
import { useState, useEffect } from "react";
import Home from "./Final Project/Home";
import CreateProfile from "./Final Project/Profile/CreateProfile";
import ProfileScreen from "./Final Project/Profile/Screen";
import ProtectedRoute from "./Final Project/Utilities/ProtectedRoute";
import LoadingEffect from "./Final Project/Utilities/LoadingEffect";

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingEffect />}>
        <Routes>
          <Route path="/" element={<Navigate to="/Main/Login" />} />
          <Route path="Main/:param" element={<LandingPage />} />
          <Route element={<ProtectedRoute />}>
          <Route path="Profile/create" element={<CreateProfile />} />
          <Route path="/Profile/:param" element={<ProfileScreen />} /></Route>
          <Route path="Home/*" element={<Home />} />

        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
