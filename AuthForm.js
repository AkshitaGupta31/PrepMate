//AuthForm
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './AuthForm.css';

const AuthForm = () => {
  const { login, setUser } = useUser();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const SERVER_URL = 'http://localhost:5000';

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      login(JSON.parse(user));
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return true;
  };

  const toggleMode = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'skills') {
      const skillList = value.split(',').map((s) => s.trim());
      setFormData({ ...formData, skills: skillList });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || (!isLogin && (!formData.name ))) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const endpoint = isLogin
        ? `${SERVER_URL}/api/auth/login`
        : `${SERVER_URL}/api/auth/signup`;

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
            experience: formData.experience,
            skills: formData.skills,
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Auth response:", data);

      if (!response.ok) {
        alert(data.error || 'Something went wrong');
        return;
      }

      alert(`${isLogin ? 'Login' : 'Signup'} successful! Welcome, ${data.user?.name || ''}`);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        login(data.user);
        navigate('/steps'); // 👈 This ensures StepsPage shows first
}


    } catch (error) {
      console.error("Network error:", error);
      alert(`Network error: ${error.message}`);
    }
  };

  return (
    <section
      style={{
        height: '100vh',
        width: '100%',
        backgroundImage: 'url("/login_bg.jpg")',
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
  <div className="auth-container">
    
    <div className="auth-card">
      {/* Toggle Buttons */}
      <div className="form-toggle">
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? 'active' : ''}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={!isLogin ? 'active' : ''}
        >
          Sign Up
        </button>
      </div>

      {/* Slider Wrapper */}
      <div className="auth-slider-wrapper">
        <div className={`auth-slider ${isLogin ? 'slide-login' : 'slide-signup'}`}>

          {/* Login Slide */}
          <div className="auth-slide">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="auth-input"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="auth-input"
              />
              <button type="submit" className="auth-btn">
                Login
              </button>
            </form>
          </div>

          {/* Signup Slide */}
          <div className="auth-slide">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="auth-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="auth-input"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="auth-input"
              />
              <button type="submit" className="auth-btn">
                Sign Up
              </button>
            </form>
          </div>

        </div>
      </div>

     
    </div>
  </div>
  </section>
);



};

const styles = {

  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: 'linear-gradient(to bottom right, #00d8ff, #007acc)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  toggleText: {
    marginTop: '20px',
    color: '#007bff',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default AuthForm;
