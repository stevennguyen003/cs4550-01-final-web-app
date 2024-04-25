import React, { useState } from 'react';
import * as client from './client'; 

function SearchFriends() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await client.searchUsers(query);
      setResults(data);
    } catch (error) {
      console.error('Failed to fetch users', error);
      setResults([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {results.map((user: { _id: string, username: string }) => (
          <div key={user._id}>{user.username}</div>
        ))}
      </div>
    </div>
  );
}

export default SearchFriends;
