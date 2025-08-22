import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css"; // 👈 create styles (can reuse Login.css if you want)

// If image is inside src/assets/images/
// import signupImage from "../assets/images/signup.jpg"; 

function Register() {
  const [form, setForm] = useState({ 
    username: "", 
    name: "", 
    email: "", 
    password: "" 
  });

  const navigate = useNavigate();

  const handleChange = (e) => 
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error registering user");
    }
  };

  return (
    <div className="login-container">
      {/* Left: Form */}
      <div className="form-container">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              name="username" 
              value={form.username} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={form.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn-pink">Sign Up</button>
        </form>
        <p className="signup-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

      {/* Right: Illustration */}
      <div className="image-container">
        <img src="/yoga.jpg" alt="Yoga illustration" />
      </div>
    </div>
  );
}

export default Register;
