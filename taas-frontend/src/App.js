import logo from "./logo.svg";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import GetTuki from "./components/GetTuki";
import UploadTuki from "./components/UploadTuki";
import Home from "./components/Home";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/get-tuki" element={<GetTuki />} />
        <Route exact path="/Upload-tuki" element={<UploadTuki />} />
      </Routes>
    </Router>
  );
}

export default App;
