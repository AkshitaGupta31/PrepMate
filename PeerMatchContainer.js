//PeerMatchContainer7
import React, { useState } from 'react';
import MatchForm from './MatchForm';
import MatchMaker from './MatchMAker';

const PeerMatchContainer = () => {
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);

  const addUserAndMatch = async (user) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);

    if (updatedUsers.length >= 2) {
      try {
        const response = await fetch('http://localhost:5000/api/match/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ users: updatedUsers }),
        });
        const data = await response.json();
        setMatches(data.matches);
      } catch (err) {
        console.error("Error fetching matches:", err);
        setMatches([]);
      }
    } else {
      setMatches([]);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', padding: 20 }}>
      <MatchForm addUserAndMatch={addUserAndMatch} />
      <MatchMaker matches={matches} />
    </div>
  );
};

export default PeerMatchContainer;
