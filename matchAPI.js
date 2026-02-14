export const fetchMatches = async (users) => {
  try {
    const response = await fetch('/api/match', {
      method: 'POST',  // Usually POST because you're sending data
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ users }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch matches from backend');
    }

    const data = await response.json();
    return data.matches;  // or just return data if your backend sends array directly
  } catch (error) {
    console.error(error);
    return [];
  }
};
