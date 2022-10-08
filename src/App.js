// import logo from ". /logo.svg";
import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div className="App">
      <div className="App__body">
        {/* sidebar */}
        <Sidebar />
        {/* chat */}
      </div>
    </div>
  );
}

export default App;