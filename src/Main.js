import React from 'react';
import { Link } from 'react-router-dom';
import "./main.css"; // Import your CSS file for styling

function HomePage() {
  return (
    <div className="background">
      <div className="content">
        <h1>Welcome to Municipal Corporation Complaint System</h1>
        <br></br>
        <h3 >Your Voice Matters</h3>
        <p>Welcome to the Municipal Corporation Complaint System. This platform is designed to make it easy for you to report issues and track the resolution of your complaints. Whether it's a pothole, streetlight issue, or waste management problem, we're here to help.</p>
        <h3>Why Report?</h3>
        <p>Your feedback is crucial in helping us maintain and improve our city's infrastructure and services. By reporting issues, you contribute to a cleaner, safer, and more efficient community.</p>
        
        <Link to="/login"><button>Login</button></Link>
      </div>
    </div>
  );
}

export default HomePage;
