import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import styles from "./styles.module.css";

const SubredditDetails = () => {
  const [postts, setposts] = useState([]);
  const [nameform, setnameform] = useState({ title: "", content: "", author: localStorage.getItem("token")});
  const [showForm, setShowForm] = useState(false);
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
  const handleClick = () => {
    setShowForm(true)
  }
  const handleChangetitle = (event) => {
    setnameform({ ...nameform, title: event.target.value})
  }
  const handleChangecontent = (event) => {
    setnameform({ ...nameform, content: event.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let c = "http://localhost:8080/api/subgreddit/"
			let d = idd.id
      let p = c.concat(d)
      let q = "/posts"
      let r = p.concat(q)
      console.log(r)
			const res = await axios.post(r, nameform);
		} catch (error) {
			console.log(error)
		}
  }
  useEffect(() => {
    const fetchposts = async () => {
      let c = "http://localhost:8080/api/subgreddit/"
			let d = idd.id
      let p = c.concat(d)
      let q = "/posts"
      let r = p.concat(q)
      const response = await axios.get(r);
      //console.log(response.data.subredditName)
      setposts(response.data);
    };

    fetchposts();
  }, []);
  if (!subreddit) {
    return <div>Loading...</div>;
  }
  //console.log(subreddit)
  return (
    <div>
      <Navbar />
      <h1>Name: {subreddit.subredditName}</h1>
      <p>Description: {subreddit.description}</p>
      <p>Created by: {subreddit.admin}</p>
      <button onClick={handleClick}>Add new post</button>
      {showForm && (
        <form className={styles.form_container} onSubmit={handleSubmit}>
        <h1>ADD DETAILS</h1>
        <input
            type="Title"
            placeholder="Title"
            name="title"
            onChange={handleChangetitle}
            value={nameform.title}
            required
            className={styles.input}
        />
        <input
            type="Content"
            placeholder="Content"
            name="content"
            onChange={handleChangecontent}
            value={nameform.content}
            required
            className={styles.input}
        />
        <button type="submit" className={styles.green_btn}>
            SUBMIT
        </button>
    </form>
      )}
      <h2>Posts</h2>
      <ul>
        {postts.map(postt => (
          <li key={postt._id}>
            <p>Title: {postt.title}</p>
            <p>Content: {postt.textSubmission}</p>
            <p>Author: {postt.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubredditDetails;