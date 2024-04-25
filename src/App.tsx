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
import AdminRoute from "./Final Project/Utilities/AdminRoute";
import UserList from "./Final Project/UserList";
import ExerciseDetails from "./Final Project/Home/Exercises/Details";

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingEffect />}>
        <Routes>
          <Route path="/" element={<Navigate to="/Main/Login" />} />
          <Route path="Main/:param" element={<LandingPage />} />
          <Route path="Profile/create" element={<CreateProfile />} />
          <Route element={<ProtectedRoute />}>
            <Route path="Profile/" element={<CreateProfile />} />
            <Route path="/Profile/:param" element={<ProfileScreen />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="Home/Users" element={<UserList/>} />
          </Route>
          <Route path="Home/:param" element={<Home />} />
          <Route path="Home/Search/*" element={<Home />} />
          <Route path="Home/Search/:query/:id" element={<Home />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
