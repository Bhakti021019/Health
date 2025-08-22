// About.js
import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <div className="about-content">
        {/* Left side text */}
        <div className="about-text">
          <p>
            At <span className="highlight">Wellness</span>, we are dedicated to
            helping you achieve balance and inner peace. Whether it's through
            yoga, meditation, or wellness coaching, we aim to guide you towards
            a healthier and more mindful lifestyle.
          </p>
          <p>
            Our team consists of experienced instructors, wellness coaches, and
            mindfulness experts ready to assist you in your wellness journey.
          </p>
          <p>
            Join us and explore various services tailored to rejuvenate both
            your mind and body. Embrace a balanced lifestyle and discover your
            true potential!
          </p>
        </div>

        {/* Right side image */}
        <div className="about-image">
          <img src="/healthy.jpg" alt="Wellness" />
        </div>
      </div> {/* ✅ properly close about-content */}

      {/* Footer */}
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

export default About;
