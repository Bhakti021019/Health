import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent: " + message);
    setMessage(""); // Reset the message after sending
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <div className="contact-content">
        {/* Left side text */}
        <div className="contact-text">
          <p>
            We would love to hear from you! Whether you have questions,
            feedback, or want to connect, feel free to reach out.
          </p>
          <p>
            Our team will get back to you as soon as possible to help with your
            wellness journey.
          </p>
        </div>

        {/* Right side form */}
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <label>Your Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows="5"
            />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom"
      style={{
    position: "fixed",
    bottom: 0,
    left: 20,
    padding : 30,
    margin: 10,
    width: "100%",
  }}>
  <p>&copy; 2025 Zen Studio. Built with love.</p>
</div>
    </div>
  );
}

export default Contact;
