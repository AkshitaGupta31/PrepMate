import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './nav.css';

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Promise.resolve(logout());
    if (result) navigate('/auth');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.leftSection}>
        <img
          src="/cropped_circle_image.png"
          alt="PrepMate Logo"
          style={styles.logoImg}
          onClick={() => navigate('/')}
        />
        <ul className="nav-links" style={styles.navLinks}>
          <li><Link to="/" style={styles.link}>Home</Link></li>
          <li><Link to="/match" style={styles.link}>Match</Link></li>
          <li><Link to="/About" style={styles.link}>About</Link></li>
          <li><Link to="/contact" style={styles.link}>Contact</Link></li>
        </ul>
      </div>

      <div style={styles.rightSection}>
        {user?.name ? (
  <>
    <span style={styles.greeting}>Hi, {user.name} 👋</span>
    <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
  </>
) : (
  <Link to="/auth" style={styles.authButton}>Login</Link>
)}

      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 30px', // thinner
    background: '#ffffffee',
    borderBottom: '1px solid #e3e3e3',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
    fontFamily: 'Poppins, sans-serif',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
  },
  logoImg: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    fontSize: '16px',
    color: '#333',
    fontWeight: '500',
    padding: '4px 6px',
    borderRadius: '6px',
    transition: 'all 0.2s ease-in-out',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  greeting: {
    fontSize: '14px',
    color: '#555',
  },
  logoutButton: {
    padding: '6px 14px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    fontWeight: '500',
    fontSize: '14px',
    cursor: 'pointer',
  },
  authButton: {
    padding: '6px 14px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    fontWeight: '500',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default Navbar;
