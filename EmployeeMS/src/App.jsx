import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home"
import Dashboard from "./assets/pages/Dashboard";
import EmployeeList from "./assets/pages/EmployeeList";
import Vacation from "./assets/pages/Vacation";


const App = () => {
  return ( 
 <Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/employees" element={<EmployeeList />}/>
    <Route path="/new-vacation" element={<Vacation />}  />
  </Routes>
 </Router>
);
}
 
export default App;