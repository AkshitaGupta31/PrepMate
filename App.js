// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import PeerMatchContainer from './components/PeerMatchContainer';
import StepsPage from './components/StepsPage';
import About from './components/About';
import { UserProvider } from './context/UserContext';
import Contact from './components/ContactPage';
import Chatbot from './components/Chatbot';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

  const seenIntro = localStorage.getItem('seenIntro') === 'true';

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/steps" element={<StepsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ✅ Protect /match */}
        <Route
          path="/match"
          element={seenIntro ? <PeerMatchContainer /> : <Navigate to="/how-it-works" />}
        />

        {/* ✅ New dedicated Chatbot route */}
        <Route
          path="/chat"
          element={
            <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
              <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Welcome to PeerMate Bot</h1>
              <Chatbot />
            </div>
          }
        />

        <Route
          path="*"
          element={
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h2>404 — Page Not Found</h2>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
