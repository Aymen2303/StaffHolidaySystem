import React, { useState } from "react";
import useLoginForm from "../functions/useLoginForm";
import InputField from "../components/InputField";
import Button from "../components/Button";

const LoginForm = ({ onLogin, onForgotPassword }) => {
  const { formData, errors, handleChange, handleSubmit } = useLoginForm(onLogin);

  return (
    <form onSubmit={handleSubmit}>
    <div className="card shadow-lg p-4 rounded" style={{ width: '350px' }}>
      <h3 className="text-center mb-3">Log in</h3>

      {/* Email Field */}
      <div className="mb-3">
        <InputField
          label="Email"
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          icon="📧"
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>

      {/* Password Field */}
      <div className="mb-3">
        <InputField
          label="Mot de passe"
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          icon="🔒"
        />
        {errors.password && <div className="error-message">{errors.password}</div>}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <label>
          <input type="checkbox" id="remember" className="me-1" />
          Remember me
        </label>
        <a href="#" className="text-primary" onClick={onForgotPassword}>
          Forgot password?
        </a>
      </div>

      {/* Login Button */}
      <Button type="submit" onClick={handleSubmit} text="Log in" color="#00843D" />
    </div>
    </form>
  );
};

export default LoginForm;
