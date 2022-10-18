// import logo from ". /logo.svg";
import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
// import { Route, Router } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
// import { StateContext, useStateValue } from "./StateProvider";
// import { useContext } from "react";
// import { useEffect } from "react";
// import ListProducts from "./products/ListProducts";

function App() {
  const [{ user }] = useStateValue();
  // const [{ user }, dispatch] = useStateValue();

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
              <Route
                path="/"
                element={
                  <img
                    className="backImage"
                    src="https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"
                    alt="#"
                  />
                }
              ></Route>
              {/* <Route path="/products" element={<ListProducts />}></Route> */}
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
