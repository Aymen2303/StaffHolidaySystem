import { useState } from "react";

const useLoginForm = (onLogin) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const validateForm = () => {
    let newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-zA-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === ""); // Returns true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onLogin(formData.email, formData.password);
    }
  };

  return { formData, errors, handleChange, handleSubmit };
};

export default useLoginForm;
