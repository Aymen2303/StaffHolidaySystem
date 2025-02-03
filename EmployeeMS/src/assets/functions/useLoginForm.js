import { useState } from 'react';
import { supabase } from './SupabaseClient';
import { useNavigate } from 'react-router-dom';

const useLoginForm = (onLogin, setLoading) => {
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

    setLoading(true);  // Start loading

    try {
      // Sign in with Supabase
      console.log('Attempting to log in with:', formData.email);
      const { user, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error("Login error:", error.message);
        setErrors({ general: error.message });
        setLoading(false);
        return;
      }
      
      // Call the onLogin callback
      console.log('Login successful:', user);
      onLogin(user);
      navigate('/dashboard', {state : { email: formData.email } });
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: error.message });
      setLoading(false);
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