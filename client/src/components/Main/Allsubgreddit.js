import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

const SubredditsList = () => {
  const [subreddits, setSubreddits] = useState([]);

  useEffect(() => {
    const fetchSubreddits = async () => {
      const response = await axios.get("http://localhost:8080/api/subgreddit");
      console.log(response.data.subredditName)
      setSubreddits(response.data);
    };

    fetchSubreddits();
  }, []);

  return (
    <div>
        <Navbar />
      <h1>All subreddits</h1>
      <ul>
        {subreddits.map(subreddit => (
          <li key={subreddit._id}>
            <a href={`/subgreddit/${subreddit._id}`}>{subreddit.subredditName}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}; 
export default SubredditsList;
