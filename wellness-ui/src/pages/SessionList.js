import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/SessionList.css";

function SessionList() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    api.get("/sessions").then((res) => setSessions(res.data.data));
  }, []);

  return (
    <div className="session-list">
      {/* Wellness Intro */}
      <div className="wellness-container">
        <p className="wellness-intro">
          Wellness is the foundation of a balanced life. Taking time to nurture
          your mind, body, and spirit helps reduce stress, improve focus, and
          bring harmony into daily living. Explore our curated sessions designed
          to guide you on your journey towards better health and inner peace.
        </p>
      </div>

      {/* Available Sessions */}
      <h2 className="session-heading">🌿 Available Sessions</h2>
      <div className="session-cards">
        {sessions.map((session) => (
          <div key={session._id} className="session-card">
            <h3>{session.title}</h3>
            <p>
              <strong>Status:</strong> {session.status}
            </p>
            <p className="session-link">
              <a href={session.json_file_url} target="_blank" rel="noreferrer">
                View JSON
              </a>
            </p>
            <Link className="btn-detail" to={`/sessions/${session._id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Available Services Section */}
      <div className="services-container">
        <h2 className="services-heading">✨ Available Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>🧘 Guided Yoga</h3>
            <p>Find balance and flexibility through structured yoga practices led by experts.</p>
          </div>
          <div className="service-card">
            <h3>🌸 Meditation Coaching</h3>
            <p>Reduce stress, improve mindfulness, and gain clarity through guided meditation.</p>
          </div>
          <div className="service-card">
            <h3>🥗 Nutrition Advice</h3>
            <p>Learn healthy eating habits to boost energy, immunity, and overall well-being.</p>
          </div>
          <div className="service-card">
            <h3>💆 Wellness Therapy</h3>
            <p>Experience relaxation techniques and therapies designed to heal mind and body.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="footer-bottom"
        style={{
          padding: "15px",
          width: "100%",
          background: "#f9f9f9",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <p>&copy; 2025 Zen Studio. Built with love.</p>
      </div>
    </div>
  );
}

export default SessionList;
