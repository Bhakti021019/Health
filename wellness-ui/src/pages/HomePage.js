import React from "react";
import "../App.css"; // custom css
import {FaFacebook, FaInstagram, FaYoutube} from "react-icons/fa";

function HomePage() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Refreshing <span>Body And Soul</span>
          </h1>
          <p>
            Meet yourself where you are: mindfulness, balance, and calm.
            Namaste—inhale, exhale, expand, and embrace peace.
          </p>
          <button className="btn-primary">More Information</button>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHlvZ2F8ZW58MHx8MHx8fDA%3D"
            alt="Yoga Pose"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Yoga Stretch"
          />
        </div>
        <div className="about-text">
          <h3>Let’s Start</h3>
          <h2>Come As You Are</h2>
          <p>
            Rejuvenate your body and mind with yoga and meditation. Join us to
            practice mindfulness, relaxation, and self-discovery.
          </p>
          <button className="btn-outline">Join Us</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h3>Our Features</h3>
        <h2>What Made Us Special</h2>
        <p>
          Far from the chaos, find your center with our world-class teachers and
          holistic practices.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-chalkboard-teacher"></i>
            <h4>World-class Teachers</h4>
            <p>Learn from the best yoga & wellness guides worldwide.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-mobile-alt"></i>
            <h4>Practice On-the-go</h4>
            <p>Access online classes anytime, anywhere.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-calendar-alt"></i>
            <h4>Schedule Control</h4>
            <p>Book sessions at your convenience.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-spa"></i>
            <h4>Restorative</h4>
            <p>Rebalance your energy with calming practices.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-dumbbell"></i>
            <h4>Deep Training</h4>
            <p>Transform body & mind with expert-led training.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-layer-group"></i>
            <h4>Multi-Styles</h4>
            <p>Choose from yoga, meditation, and holistic therapies.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <h2>Zen Studio</h2>
          <p>Balance your body, mind and soul</p>
        </div>
        <div className="footer-links">
          <div> 
           <h4>Contact</h4>
           <p> Email :support@zenstudio.com</p>
           <p> Phone : +91-2222222222</p>
          </div>
          <div className="social">
            <h4>Follow Us</h4>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram size={24} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <FaYoutube size={24} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Zen Studio. Built with love.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
