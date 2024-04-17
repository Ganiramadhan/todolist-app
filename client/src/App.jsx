import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Todolist from "./Pages/Todolist";
import Setting from "./Pages/Setting";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Todolist/>} />
        <Route path="/setting" element={<Setting/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App