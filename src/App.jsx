import { useState } from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import Task from "./Components/Tasks/Task";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/tasks" element={<Task></Task>} />
        </Routes>
      </BrowserRouter>
 
    </>
  );
}

export default App;
