import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function SessionEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", json_file_url: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/sessions/my-sessions/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFormData({
          title: res.data.data.title,
          json_file_url: res.data.data.json_file_url,
        });
      } catch (err) {
        console.error("Error fetching session", err);
      }
    };
    fetchData();
  }, [id, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/sessions/${id}`,   // ✅ update uses generic route
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/dashboard"); // redirect after save
    } catch (err) {
      console.error("Error updating session", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        name="json_file_url"
        value={formData.json_file_url}
        onChange={handleChange}
        placeholder="JSON File URL"
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default SessionEdit;
