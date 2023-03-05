import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

const SavedPosts = () => {
  const [postts, setposts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("http://localhost:8080/api/savedpost");
      //console.log(response.data)
      // const filtered = []
      // let i =0
      // for(i = 0;i<response.data.length;i++)
      // {
      //   if((response.data)[i].user === localStorage.getItem("token"))
      //   {
      //     filtered.push((response.data)[i])
      //   }
      // }
      console.log(response.data)
      const filtered = response.data.filter(postts => postts.author == localStorage.getItem("token"));
      //console.log(filtered)
      setposts(filtered);
    };

    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:8080/api/savedpost");
    const filtered = response.data.filter(postts => postts.author == localStorage.getItem("token"));
    //console.log(filtered)
    setposts(filtered);
  };
  const handleunsave = async(postid) => {
    try{
      console.log(postid)
      let c = "http://localhost:8080/api/savedpost/"
      let d = postid
      let p = c.concat(d)
      console.log(p)
    await axios.delete(p)
    fetchPosts()
    }
    catch(error)
    {
      console.log(error)
    }
  }
  //console.log(filteredSubreddits[0])
  return (
    <div>
        <Navbar />
      <h1>Saved Posts</h1>
      <ul>
        {postts.map(post => (
          <li key={post._id}>
              <p>Title: {post.title}</p>
              <p>Content: {post.textSubmission}</p>
              <p>Created by: {post.author}</p>
              <p>Subreddit: {post.subreddit}</p>
              <button onClick={(event) => handleunsave(post._id)}>Unsave</button>
          </li>
        ))}
      </ul>
    </div>
  );
}; 
export default SavedPosts;
