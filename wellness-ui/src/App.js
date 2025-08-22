import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import SessionList from "./pages/SessionList";
import SessionForm from "./pages/SessionForm";
import SessionDetail from "./pages/SessionDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MySessions from "./pages/MySessions";
import MySessionDetail from "./pages/MySessionDetail";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";


function App() {
  const [user, setUser] = useState(null); // track logged-in user

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <div className="container mt-4">
        <Routes>
          {/* Show HomePage if not logged in, otherwise show SessionList */}
          <Route
            path="/"
            element={user ? <SessionList /> : <HomePage />}
          />

          {/* Public sessions */}
          <Route path="/sessions/:id" element={<SessionDetail />} />

          {/* My Sessions (only when logged in) */}
          {user && (
            <>
              <Route path="/my-sessions" element={<MySessions />} />
              <Route path="/my-sessions/:id" element={<MySessionDetail />} />
              <Route path="/my-sessions/new" element={<SessionForm mode="draft" />} />
              <Route path="/my-sessions/edit/:id" element={<SessionForm mode="edit" />} />
            </>
          )}

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Redirect unknown paths to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
