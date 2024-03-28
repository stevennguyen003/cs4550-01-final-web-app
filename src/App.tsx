import React from 'react';
import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import LandingPage from './Final Project/LandingPage';
import { useState, useEffect } from 'react';
import CreateAccount from './Final Project/CreateAccount';
import Home from './Final Project/Home';

function App() {
  /*
  //const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const searchInput = "Taylor Swift";

  useEffect(() => {
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))

    // Input Error Handling Here
  }, [])

  async function search() {
    console.log("Search for " + searchInput);

    // Get request using search to get the Artist ID
    var artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var artistID = await fetch('http://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', artistParameters)
      .then(response => response.json())
      .then(data => console.log(data))
    // Get request with Artist ID grab all the albums from that artist
  }
  */

  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<LandingPage />} />
        <Route path="CreateAccount" element={<CreateAccount />} />
        <Route path="Home" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
