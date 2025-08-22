import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./MySessionDetail.css"; // ✅ custom styles

function MySessionDetail() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/sessions/my-sessions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSession(res.data.data || res.data);
      } catch (err) {
        console.error("Error fetching session:", err);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleSaveDraft = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.put(
        `/sessions/${id}`,
        { ...session, status: "draft" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSession(res.data.data);
      alert("✅ Session saved as draft");
    } catch (err) {
      console.error("Error saving as draft:", err);
      alert("Failed to save draft");
    }
  };

  const handlePublish = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.put(
        `/sessions/${id}`,
        { ...session, status: "published" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSession(res.data.data);
      alert("🚀 Session published successfully!");
    } catch (err) {
      console.error("Error publishing session:", err);
      alert("Failed to publish session");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("❌ Are you sure you want to delete this session?")) {
      try {
        const token = localStorage.getItem("token");
        await api.delete(`/sessions/my-sessions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Session deleted successfully!");
        navigate("/my-sessions");
      } catch (err) {
        console.error("Error deleting session:", err);
        alert("Failed to delete session");
      }
    }
  };

  if (!session) return <p>Loading...</p>;

  return (
    <div className="session-detail-container">
      <div className="session-detail-card">
        <h2 className="detail-title">{session.title}</h2>
        <p>
          Status:{" "}
          <span
            className={`status-badge ${
              session.status === "published" ? "published" : "draft"
            }`}
          >
            {session.status}
          </span>
        </p>
        <p>
          📂 JSON File:{" "}
          <a href={session.json_file_url} target="_blank" rel="noreferrer">
            {session.json_file_url}
          </a>
        </p>

        {/* Created At */}
        <p>
          📅 Created:{" "}
          {session.createdAt
            ? new Date(session.createdAt).toLocaleString()
            : "N/A"}
        </p>

        {/* Updated At */}
        <p>
          🛠️ Last Updated:{" "}
          {session.updatedAt
            ? new Date(session.updatedAt).toLocaleString()
            : "N/A"}
        </p>

        <div className="actions">
          <Link to={`/my-sessions/edit/${session._id}`} className="btn brown">
            ✏️ Edit
          </Link>
          <button onClick={handleSaveDraft} className="btn yellow">
            💾 Save Draft
          </button>
          <button onClick={handlePublish} className="btn green">
            🚀 Publish
          </button>
          <button onClick={handleDelete} className="btn red">
            🗑️ Delete
          </button>
        </div>
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
}

export default MySessionDetail;
