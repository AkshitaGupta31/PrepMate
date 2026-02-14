//steps
import React from 'react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    icon: "📅",
    title: "STEP 1",
    subtitle: "Fill your preferences.",
    desc: "Provide time-slots and programming languages you're comfortable with.",
  },
  {
    icon: "👥",
    title: "STEP 2",
    subtitle: "Get Matched",
    desc: "We will match you with the best peer according to the details you provide.",
  },
  {
    icon: "🎤",
    title: "STEP 3",
    subtitle: "Give/Take Interview",
    desc: "You interview your peer and get interviewed back for one and a half hours.",
  },
  {
    icon: "💬",
    title: "STEP 4",
    subtitle: "Read your feedback",
    desc: "Get peer feedback. Improve. Repeat until you feel confident.",
  },
];

const StepsPage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem('seenIntro', 'true');
    navigate('/match');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>How It Works</h2>
      <p style={styles.subheading}>We match you with the best suitable peer available.</p>

      <div style={styles.timeline}>
        {steps.map((step, index) => (
          <div key={index} style={styles.step}>
            <div style={styles.iconWrapper}>
              <div style={styles.icon}>{step.icon}</div>
              {index < steps.length - 1 && <div style={styles.line}></div>}
            </div>
            <div style={styles.content}>
              <h4 style={styles.stepTitle}>{step.title}</h4>
              <h3 style={styles.stepSubtitle}>{step.subtitle}</h3>
              <p style={styles.stepDesc}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleContinue} style={styles.button}>Continue to Match</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    backgroundColor: '#edf7ed',
    fontFamily: 'Poppins, sans-serif',
    minHeight: '100vh',
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    color: '#234d20',
    marginBottom: '6px',
  },
  subheading: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '40px',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    maxWidth: '600px',
    margin: '0 auto',
  },
  step: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '40px',
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '20px',
    position: 'relative',
  },
  icon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    color: '#234d20',
    fontSize: '28px',
    lineHeight: '60px',
    textAlign: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    zIndex: 1,
  },
  line: {
    width: '2px',
    height: '60px',
    backgroundColor: '#c0c0c0',
    marginTop: '6px',
  },
  content: {
    textAlign: 'left',
  },
  stepTitle: {
    fontSize: '12px',
    color: '#999',
    marginBottom: '2px',
  },
  stepSubtitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '4px',
    color: '#2e2d2b',
  },
  stepDesc: {
    fontSize: '14px',
    color: '#555',
    maxWidth: '400px',
  },
  button: {
    marginTop: '40px',
    padding: '12px 28px',
    fontSize: '16px',
    backgroundColor: '#234d20',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.08)',
  },
};

export default StepsPage;
