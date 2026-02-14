import React from 'react';

const About = () => {
  return (
    <section
      style={{
        height: '100vh',
        width: '100%',
        backgroundImage: 'url("/about_bg.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 10%',  // matches paper edges in background
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '900px',  // controls width so it doesn't overflow the paper
          textAlign: 'center',
          color: '#333',
        }}
      >
        <h2
          style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '1.5rem',
            color: '#1a202c',
          }}
        >
          About <span style={{ color: 'blue' }}>PrepMate</span>
        </h2>
        <p
          style={{
            fontSize: '1.2rem',
            lineHeight: '1.7',
            marginBottom: '2rem',
            color: '#2d3748',
          }}
        >
          PrepMate is your go-to platform for peer-to-peer interview prep — built to help you find the{' '}
          <span style={{ fontWeight: '600', color: 'blue' }}>right match</span>, not just any match.
          <br /><br />
          We know how overwhelming interview prep can get. Coding rounds, system design, behavioral questions — it's a lot.
          But here’s the thing: you don’t have to do it alone. PrepMate pairs you with peers who vibe with your skill level,
          goals, and schedule, so you can practice smarter, not harder.
          <br /><br />
          From mock interviews to AI-generated questions and (soon) emotion-aware feedback, we’re blending tech and teamwork
          to level up your prep game. Whether you're gearing up for Big Tech, startups, or your first internship, PrepMate
          is here to make sure you’re prepped, confident, and ready.
        </p>
        <div
          style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: '2px solid blue',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          <p style={{ color: 'blue', fontWeight: '500', fontSize: '1.1rem' }}>
            ✨ No cold DMs. Just real prep with real people.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
