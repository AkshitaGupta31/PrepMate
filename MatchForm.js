import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const roleSkillsMap = {
  "Frontend Developer": ["React", "JavaScript", "CSS", "HTML", "UI/UX"],
  "Backend Developer": ["Node.js", "Express", "MongoDB", "APIs", "Docker"],
  "Data Scientist": ["Python", "Pandas", "Deep Learning", "TensorFlow", "NLP"],
  "Security Analyst": ["Securities", "Threat Detection", "Firewalls", "SIEM"],
  "Product Manager": ["CRM Proficiency", "Tone of Voice", "E-Discovery"]
};

const MatchForm = ({ setMatches = () => {} }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience: '',
    skills: []
  });

  const [users, setUsers] = useState([]);
  const [localMatches, setLocalMatches] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const alreadyAdded = Array.isArray(users) && users.some((u) =>
    u.email === user?.email &&
    u.role === formData.role &&
    u.experience === formData.experience
  );

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/match/find-matches');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (user?.name) {
      setFormData(prev => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleMatch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/match/find-matches?email=${user.email}`);
      setMatches(response.data.matches);
      setLocalMatches(response.data.matches);
    } catch (error) {
      console.error('Error matching users:', error);
    }
  };

  const suggestedSkills = roleSkillsMap[formData.role] || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first.");
      return;
    }

    const payload = {
      name: user.name,
      email: user.email,
      role: formData.role?.trim(),
      experience: formData.experience?.trim(),
      skills: formData.skills || []
    };

    if (!payload.role || !payload.experience) {
      alert("Role and Experience are required!");
      return;
    }

    try {
      if (alreadyAdded) {
        const res = await axios.put(`http://localhost:5000/api/users/${user.email}`, payload);
        console.log("User updated:", res.data);
      } else {
        const res = await axios.post('http://localhost:5000/api/users', payload);
        console.log("User added:", res.data);
      }

      setFormData({ name: '', role: '', experience: '', skills: [] });
      fetchUsers();

    } catch (err) {
      console.error('Error saving/updating user:', err.response?.data || err.message);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '30px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      background: '#fdfdfd'
    }}>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          name="name"
          value={user?.name || formData.name}
          onChange={handleChange}
          readOnly={!!user?.name}
          required
          style={{
            display: 'block',
            width: '100%',
            marginBottom: '12px',
            padding: '8px',
            backgroundColor: user?.name ? '#f1f1f1' : '#fff',
            borderRadius: '6px'
          }}
        />

        <label>Role:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          style={{
            display: 'block',
            width: '100%',
            marginBottom: '12px',
            padding: '8px',
            borderRadius: '6px'
          }}
        >
          <option value="">--Select Role--</option>
          {Object.keys(roleSkillsMap).map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>

        <label>Experience Level:</label>
        <input
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
          style={{
            display: 'block',
            width: '100%',
            marginBottom: '12px',
            padding: '8px',
            borderRadius: '6px'
          }}
        />

        {suggestedSkills.length > 0 && (
          <>
            <label>Suggested Skills:</label>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '15px'
            }}>
              {suggestedSkills.map(skill => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: formData.skills.includes(skill)
                      ? '2px solid #007bff'
                      : '1px dashed #aaa',
                    backgroundColor: formData.skills.includes(skill)
                      ? '#007bff'
                      : '#fff',
                    color: formData.skills.includes(skill)
                      ? '#fff'
                      : '#007bff',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}
                >
                  {skill}
                </button>
              ))}
            </div>
          </>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {alreadyAdded ? 'Update Info' : 'Add Info'}
        </button>
      </form>

      {user && (
        <button
          onClick={handleMatch}
          style={{
            marginTop: '15px',
            width: '100%',
            padding: '10px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Match
        </button>
      )}

      {localMatches.length > 0 ? (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}>
          <h3>🔗 Matched Pairs:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {localMatches.map((pair, idx) => (
              <li key={idx} style={{ marginBottom: '10px' }}>
                <strong>{pair.peer1?.name || 'Unknown'}</strong> 🤝 <strong>{pair.peer2?.name || 'Unknown'}</strong>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        users.length >= 2 && (
          <p style={{
            marginTop: '20px',
            fontStyle: 'italic'
          }}>
            No matches yet. Click Match to generate pairs!
          </p>
        )
      )}

      {/* 🎯 NEW BUTTON for Chatbot page */}
      <button
        onClick={() => navigate('/chat')}
        style={{
          marginTop: '20px',
          width: '100%',
          padding: '10px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Talk to PeerMate Bot
      </button>
    </div>
  );
};

export default MatchForm;
