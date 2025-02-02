// src/assets/functions/useLoginForm.js
import { useState } from 'react';
import { supabase } from './SupabaseClient';
import { useNavigate } from 'react-router-dom';

const useLoginForm = (onLogin) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    // Basic validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Sign in with Supabase
      console.log('Attempting to log in with:', formData.email);
      const { user, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error){
        console.error("Login error:", error.message);
          setErrors({ general: error.message });
      return;
      }
      // Call the onLogin callback
      console.log('Login successful:', user);
      onLogin(user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: error.message });
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useLoginForm;