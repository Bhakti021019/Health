import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

// 👇 Import local image
// import yogaImage from "../assets/images/yoga.jpg";

function Login({ setUser }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Sending login request:", form);

    try {
      const res = await api.post("/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Login success:", res.data);

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      {/* Left: Form */}
      <div className="form-container">
        <h2>Welcome!</h2>
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
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-pink">Login</button>
        </form>
        <p className="signup-link">
          Don’t have an account? <a href="/register">Sign up</a>
        </p>
      </div>

      {/* Right: Illustration */}
      <div className="image-container">
        <img src="/yoga.jpg" alt="Yoga illustration" />
      </div>
    </div>
  );
}

export default Login;
