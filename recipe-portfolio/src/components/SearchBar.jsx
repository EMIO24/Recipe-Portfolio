import React, { useState } from 'react';


export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle search logic here (e.g., API call, filtering data)
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

