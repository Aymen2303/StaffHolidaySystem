import React from "react";
import LoginForm from "./../../assets/components/LoginForm";
import logo from "../../assets/logo.svg";   
import "./../../assets/styles/index.css";  
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  
  const handleLogin = (user) => {
    console.log("User logged in:", user);
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
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
        <LoginForm onLogin={handleLogin} onForgotPassword={handleForgotPassword} />
      </div>
    </div>
  );
};

export default Home;
