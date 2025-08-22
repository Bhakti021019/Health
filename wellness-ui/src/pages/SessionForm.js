import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function SessionForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    json_file_url: "",
    status: "draft",
    tags: [],
  });
  const [newTag, setNewTag] = useState("");

  // ✅ Fetch data if editing
  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await api.get(`/sessions/my-sessions/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data && res.data.data) {
            setForm(res.data.data);
          }
        } catch (err) {
          console.error("Error fetching session:", err);
        }
      };
      fetchData();
    }
  }, [mode, id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add a new tag
  const handleAddTag = () => {
    if (newTag && !form.tags.includes(newTag)) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
      setNewTag("");
    }
  };

  // ✅ Save (draft or publish)
  const handleSave = async (status) => {
    let finalForm = { ...form, status };

    if (newTag && !form.tags.includes(newTag)) {
      finalForm.tags = [...finalForm.tags, newTag];
    }

    try {
      const token = localStorage.getItem("token");

      if (mode === "edit") {
        // ✅ Update existing session
        await api.put(`/sessions/${id}`, finalForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert(
          status === "draft"
            ? "✅ Draft updated successfully!"
            : "🚀 Session published successfully!"
        );
      } else {
        // ✅ Create new session
        await api.post("/sessions", finalForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert(
          status === "draft"
            ? "✅ Draft created successfully!"
            : "🚀 Session created and published successfully!"
        );
      }

      navigate("/my-sessions");
    } catch (err) {
      console.error("Error saving session:", err.response?.data || err);
      alert("❌ Failed to save session");
    }
  };

  return (
    <div>
      <h2>{mode === "edit" ? "Edit Session" : "Create Session"}</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">File URL</label>
          <input
            type="text"
            name="json_file_url"
            value={form.json_file_url}
            onChange={handleChange}
            className="form-control"
            placeholder="https://example.com/file.json"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tags</label>
          <div className="d-flex">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="form-control me-2"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="btn btn-secondary"
            >
              Add Tag
            </button>
          </div>
          <div className="mt-2">
            {form.tags.length > 0 && (
              <ul className="list-inline">
                {form.tags.map((tag, index) => (
                  <li
                    key={index}
                    className="list-inline-item badge bg-info me-2"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ✅ Action buttons */}
        <button
          type="button"
          onClick={() => handleSave("draft")}
          className="btn btn-warning me-2"
        >
          💾 Save as Draft
        </button>
        <button
          type="button"
          onClick={() => handleSave("published")}
          className="btn btn-success"
        >
          🚀 Publish
        </button>
      </form>
    </div>
  );
}

export default SessionForm;
