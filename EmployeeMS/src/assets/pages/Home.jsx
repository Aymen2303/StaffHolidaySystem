import React, { useState } from "react";
import LoginForm from "./../../assets/components/LoginForm";
import logo from "../../assets/logo.svg";   
import "./../../assets/styles/index.css";  
import "bootstrap/dist/css/bootstrap.min.css";
import LoginProgressCard from "./../components/Progress";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (user) => {
    console.log("User logged in:", user);
    setLoading(false);  // Stop loading after login
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  const handleSubmit = async (userData) => {
    setLoading(true);  // Start loading before calling handleLogin
    await handleLogin(userData);  
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <div className="header bg-primary text-white text-center py-3 position-relative" style={{height:"50%"}}>
        <img 
          src={logo} 
          alt="Algeria Poste Logo" 
          className="logo left" 
          style={{ width: "120px", height: "auto" }}
        />
        <h1 style={{paddingTop : "15vh"}}>Systeme de gestion des vacances de la poste d'Algerie</h1>
        <img 
          src={logo} 
          alt="Algeria Poste Logo" 
          className="logo right" 
          style={{ width: "120px", height: "auto" }}
        />
      </div>

      <div className="bg-primary" style={{ height: "20vh", width: "100%" }}></div>

      {/* Login Card */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{marginTop : "-40vh"}}>
        {loading ? (
          <LoginProgressCard loading={loading} />  
        ) : (
          <LoginForm onLogin={handleLogin} onForgotPassword={handleForgotPassword} setLoading={setLoading} />
        )}
      </div>
    </div>
  );
};

export default Home;
