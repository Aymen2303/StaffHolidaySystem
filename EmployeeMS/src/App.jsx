import React from "react";
import Home from "./assets/pages/Home"
import Dashboard from "./assets/pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  return ( 
 <Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />}/>
  </Routes>
 </Router>
);
}
 
export default App;