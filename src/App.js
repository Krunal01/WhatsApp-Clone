// import logo from ". /logo.svg";
import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
// import { Route, Router } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="App__body">
        <Sidebar />
        <Router>
          <Routes>
            <Route path="/rooms/:roomId" element={<Chat />}></Route>

            <Route path="/" element={<h1>Home Screen</h1>}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
