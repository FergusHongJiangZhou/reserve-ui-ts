import React from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Reservations from "./components/Reservations";
import Header from "./components/Header";
import { Routes, BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/reservations" element={<Reservations />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
