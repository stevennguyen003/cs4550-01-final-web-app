import React from 'react';
import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import LandingPage from './Final Project/LandingPage';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
