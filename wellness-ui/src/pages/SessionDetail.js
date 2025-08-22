import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import "../styles/SessionDetail.css";

function SessionDetail() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/sessions/${id}`)
      .then((res) => {
        console.log("Session detail response:", res.data);
        setSession(res.data.data || res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching session:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading session details...</p>;
  if (!session) return <p>Session not found.</p>;

  // ✅ Helper to render file preview
  const renderFilePreview = (url) => {
    if (!url) return null;

    const ext = url.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      return <img src={url} alt="Uploaded File" style={{ maxWidth: "400px", marginTop: "10px" }} />;
    }

    if (["mp4", "webm", "ogg"].includes(ext)) {
      return (
        <video controls style={{ maxWidth: "400px", marginTop: "10px" }}>
          <source src={url} type={`video/${ext}`} />
          Your browser does not support the video tag.
        </video>
      );
    }

    if (ext === "pdf") {
      return (
        <iframe
          src={url}
          title="PDF Preview"
          style={{ width: "100%", height: "500px", marginTop: "10px" }}
        ></iframe>
      );
    }

    if (ext === "json") {
      return (
        <iframe
          src={url}
          title="JSON File"
          style={{ width: "100%", height: "400px", marginTop: "10px", border: "1px solid #ddd" }}
        ></iframe>
      );
    }

    // Fallback for unknown file types
    return (
      <p>
        <a href={url} target="_blank" rel="noreferrer">
          📂 Download File
        </a>
      </p>
    );
  };

  return (
    <div className="session-detail">
      <h2>{session.title}</h2>
      <p>
        <strong>Status:</strong> {session.status}
      </p>

      {/* Tags */}
      {session.tags && session.tags.length > 0 && (
        <p>
          <strong>Tags:</strong> {session.tags.join(", ")}
        </p>
      )}

      {/* Created At */}
      {session.created_at && (
        <p>
          <strong>Created:</strong>{" "}
          {new Date(session.created_at).toLocaleString()}
        </p>
      )}

      {/* Updated At */}
      {session.updated_at && (
        <p>
          <strong>Last Updated:</strong>{" "}
          {new Date(session.updated_at).toLocaleString()}
        </p>
      )}

      {/* File Preview */}
      {session.json_file_url && (
        <div style={{ marginTop: "20px" }}>
          <h4>Uploaded File:</h4>
          {renderFilePreview(session.json_file_url)}
        </div>
      )}

      <Link to="/sessions" className="btn-back">
        ⬅ Back to Sessions
      </Link>

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

export default SessionDetail;
