import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';

const DisplayUsers = () => {
  const [postts, setposts] = useState([]);
  let url = "http://localhost:8080/api/subgreddit/"
  url = url.concat(useParams().id)
  useEffect(() => {
    const fetchPosts = async () => {
        console.log(url)
      const response = await axios.get(url);
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
      console.log("res",response.data)
      //console.log(filtered)
      setposts(response.data);
      console.log("postts",postts.members)
    };

    fetchPosts();
  }, []);
  //console.log(filteredSubreddits[0])
  return (
    <div>
        <Navbar />
      <h1>Users</h1>
       <ul>
        {postts.members.map(post => (
          <li>
              <p>Name: {post}</p>
              </li>
))}
    </ul> 
    </div>
  );
}; 
export default DisplayUsers;
