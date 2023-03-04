import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';

const SubredditDetails = () => {
  const [subreddit, setSubreddit] = useState(null);
  const idd = useParams()
//   console.log(idd)
  useEffect(() => {
    const fetchSubreddit = async () => {
    try{
        let c = "http://localhost:8080/api/subgreddit/"
        let d = idd.id
        let p = c.concat(d)
        console.log(p)
      const response = await axios.get(p);
      setSubreddit(response.data);
    }
    catch(error)
    {
        console.log(error)
    }
    };

    fetchSubreddit();
  }, [idd]);

  if (!subreddit) {
    return <div>Loading...</div>;
  }
  console.log(subreddit)
  return (
    <div>
      <Navbar />
      <h1>Name: {subreddit.subredditName}</h1>
      <p>Description: {subreddit.description}</p>
      <p>Created by: {subreddit.admin}</p>
    </div>
  );
};

export default SubredditDetails;