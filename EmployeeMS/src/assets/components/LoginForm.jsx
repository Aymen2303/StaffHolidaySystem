// LoginForm.js
import React, { useState } from 'react';
import InputField from "../components/InputField";
import Button from "../components/Button";

const LoginForm = ({ onLogin, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(""); 
  const [passwordError, setPasswordError] = useState("");


  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required.";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[a-zA-Z]/.test(password)) {
      return "Password must contain at least one letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    return "";
  };

  const handleSubmit = () => {
    const emailErrorMessage = validateEmail(email); // Validate email
    const passwordErrorMessage = validatePassword(password); // Validate password

    setEmailError(emailErrorMessage); // Set email validation error message
    setPasswordError(passwordErrorMessage); // Set password validation error message

    // If there are no validation errors, proceed with the login
    if (!emailErrorMessage && !passwordErrorMessage) {
      onLogin(email, password); // Proceed with login
    }
  };

  return (
    <div className="card shadow-lg p-4 rounded" style={{ width: '350px' }}>
      <h3 className="text-center mb-3">Log in</h3>
      
      {/* Input Fields */}
      <div className="mb-3">
        <InputField
          label="Email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon="📧"
        />
      </div>
      {emailError && <div className="error-message">{emailError}</div>}
      
      <div className="mb-3">
        <InputField
          label="Mot de passe"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon="🔒"
        />
      </div>
      {passwordError && <div className="error-message">{passwordError}</div>}

      {/* Remember Me & Forgot Password Links */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember" className="ms-1">Remember me</label>
        </div>
        <a href="#" className="text-primary" onClick={onForgotPassword}>Forgot password?</a>
      </div>
      
      {/* Login Button */}
      <Button onClick={handleSubmit} text="Log in" color="#00843D" />
    </div>
  );
};

export default LoginForm;
