import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import JobDetail from "./pages/JobDetail";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/job/:id" element={<JobDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
