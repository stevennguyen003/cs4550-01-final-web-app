import React from 'react';
import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import LandingPage from './Final Project/LandingPage';

const CLIENT_ID = "9cecbacf65564b4c80471ac14f86d430";
const SECRET_ID = "ac38790dd2b14fbeac37d829f8be267a";

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
