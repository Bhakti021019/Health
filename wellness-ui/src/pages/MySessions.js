import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./MySessions.css"; // ✅ import the new styles

const MySessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/sessions/my-sessions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSessions(res.data.data || []);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="session-list">
      <h2 className="session-heading">🌟 My Sessions</h2>
      <div className="session-cards">
        {sessions.map((s) => (
          <div className="session-card" key={s._id}>
            <div className="session-link">
              <Link to={`/my-sessions/${s._id}`}>
                <h3>{s.title}</h3>
              </Link>
            </div>
            <p>
              Status:{" "}
              <span
                style={{
                  background: s.status === "published" ? "#28a745" : "#ffc107",
                  color: "white",
                  padding: "3px 8px",
                  borderRadius: "5px",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                }}
              >
                {s.status}
              </span>
            </p>
            {s.tags?.length > 0 && <p>Tags: {s.tags.join(", ")}</p>}

            {/* Created At */}
            <p>
              📅 Created:{" "}
              {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "N/A"}
            </p>

            <Link to={`/my-sessions/${s._id}`} className="btn-detail">
              View Details
            </Link>
          </div>
        ))}
      </div>


      <div
        className="footer-bottom"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          padding: "15px",
          width: "100%",
          background: "#f9f9f9",
          textAlign: "center",
        }}
      >
        <p>&copy; 2025 Zen Studio. Built with love.</p>
      </div>
    </div>
  );
};

export default MySessions;
