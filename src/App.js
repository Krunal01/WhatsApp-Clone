// import logo from ". /logo.svg";
import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
// import { Route, Router } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
import Login from "./Login";
import { StateContext, useStateValue } from "./StateProvider";
import { useContext } from "react";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <Router>
          <div className="App__body">
            <Sidebar />
            <Routes>
              <Route path="/rooms/:roomId" element={<Chat />}></Route>
              <Route path="/" element={<h1>Home Screen</h1>}></Route>
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
