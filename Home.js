// src/pages/Home.js
import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');

  };

  return (
    <div className="landing">
      <div className="hero">

        <h1>Welcome to<span className="gradient-text"> PrepMate</span></h1>

        <p><b> <span style={{ color: 'gray', fontSize: '25px' }}>Your Peer Interview Matchmaker</span></b></p>
        <button className="btn" onClick={handleGetStarted}>Get Started</button>
      </div>
    </div>
  );
};

export default Home;
