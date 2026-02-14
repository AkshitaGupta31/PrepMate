import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchMaker = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/match'); // <-- this was missing
        setMatches(res.data.matches);
      } catch (err) {
        console.error('Error fetching matches:', err);
      }
    };

    fetchMatches();
  }, []);

  return null;
};

export default MatchMaker;
