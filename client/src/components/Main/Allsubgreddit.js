import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

const SubredditsList = () => {
  const [subreddits, setSubreddits] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const fetchSubreddits = async () => {
      const response = await axios.get("http://localhost:8080/api/subgreddit");
      console.log(response.data.subredditName)
      setSubreddits(response.data);
    };

    fetchSubreddits();
  }, []);
  const filteredSubreddits = subreddits.filter(subreddit => subreddit.subredditName.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };
  if (sortBy === 'name') {
    filteredSubreddits.sort((a, b) => a.subredditName.localeCompare(b.subredditName));
  } else if (sortBy === 'followers') {
    filteredSubreddits.sort((a, b) => b.followerCount- a.followerCount);
  } else if (sortBy === 'created_at') {
    filteredSubreddits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  //console.log(filteredSubreddits[0])
  return (
    <div>
        <Navbar />
      <h1>All subgreddiits</h1>
      <select value={sortBy} onChange={handleSortByChange}>
        <option vakue="none">No filter</option>
        <option value="name">Sort by name</option>
        <option value="followers">Sort by followers</option>
        <option value="created_at">Sort by creation date</option>
      </select>
      <input type="text" placeholder="Search subreddits" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      <ul>
        {filteredSubreddits.map(subreddit => (
          <li key={subreddit._id}>
            <a href={`/allsubgreddiit/${subreddit._id}`}>{subreddit.subredditName}</a>
            {!(subreddit.admin === localStorage.getItem("token")) && (
              <button>Join</button>
            )}
            {(subreddit.admin === localStorage.getItem("token")) && (
              <button>Leave</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}; 
export default SubredditsList;
