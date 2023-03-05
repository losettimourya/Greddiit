import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import styles from "./styles.module.css";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from '../Navbar/NavbarElements';

const SubredditDetails = () => {
  const [comment,setcomment] = useState('')
  const [postts, setposts] = useState([]);
  const [nameform, setnameform] = useState({ title: "", content: "", author: localStorage.getItem("token"), subreddit: useParams().id});
  const [showForm, setShowForm] = useState(false);
  const [subreddit, setSubreddit] = useState(null);
  const idd = useParams()
//   console.log(idd)
let abc = ""
  useEffect(() => {
    const fetchSubreddit = async () => {
    try{
        let c = "http://localhost:8080/api/subgreddit/"
        let d = idd.id
        let p = c.concat(d)
        //console.log(p)
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
  const handleSavePost = async(id) => {
    axios
      .post("http://localhost:8080/api/savedpost", { post: id, name: localStorage.getItem("token")})
      .catch((err) => console.log(err));
  }
  const handleupvote = async(id) => {
    axios
      .post("http://localhost:8080/api/subgreddit/upvote", { post: id, name: localStorage.getItem("token")})
      .catch((err) => console.log(err));
  }
  const handledownvote = async(id) => {
    axios
      .post("http://localhost:8080/api/subgreddit/downvote", { post: id, name: localStorage.getItem("token")})
      .catch((err) => console.log(err));
  }
  const handleClick = () => {
    setShowForm(true)
  }
  const handleaddcomment = (postt) => {
    try{
      console.log(comment)
      axios
        .post("http://localhost:8080/api/subgreddit/comments", { post: postt, comment: comment})
        .catch((err) => console.log(err));
    }
    catch(error){
      console.log(error)
    }
  }
  const handleFollow = async(email) => {
    try{
      const data = {
        email: email,
        email2: localStorage.getItem("token")
      }
    axios.post("http://localhost:8080/api/users/followers", data)
    }
    catch(error){
      console.log(error)
    }
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
      //console.log(r)
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
  //console.log(subreddit.bannedkeywords)
  let commasep = subreddit.bannedkeywords.join(",")
  return (
    <div>
      <Navbar />
      <Nav>
        <Bars />
  
        <NavMenu>
        <NavLink to='/users' activeStyle>
            Users
          </NavLink>
          <NavLink to='/joiningrequests' activeStyle>
            Joining Requests
          </NavLink>
        </NavMenu>
      </Nav>
      <h1>Name: {subreddit.subredditName}</h1>
      <p>Description: {subreddit.description}</p>
      <p>Created by: {subreddit.admin}</p>
      <p>Banned key words:</p>
      <p>{commasep}</p>
      <p>Number of posts: {subreddit.posts.length}</p>
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
            <h3>Title: {postt.title}</h3>
            <p>Content: {postt.textSubmission}</p>
            <p>Author: {postt.author}</p>
            <p>Upvote count: {postt.upvotecount}</p>
            <p>Downvote count: {postt.downvotecount}</p>
            <button onClick={(event) => handleFollow(postt.author)}> Follow </button>
            {(postt.isSaved) ? (
        <p>Post saved!</p>
      ) : (
        <button onClick={(event) => handleSavePost(postt._id)}>Save post</button>
      )}
      <button onClick={(event) => handleupvote(postt._id)}>Upvote</button>
      <button onClick={(event) => handledownvote(postt._id)}>Downvote</button>
      <br />
      <form onSubmit={(event) => handleaddcomment(postt._id)}>
  <div>
    <label for="comment">Add Comment:</label>
    <input id="comment" value={comment} onChange={(event) => setcomment(event.target.value)} required/>
  </div>
  <button type="submit">Submit</button>
</form>
<h3>Comments:</h3>
<h3>{postt.comments.length}</h3>
<ul>
{postt.comments.map(comment => (
  <li>{comment}</li>
))}
</ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubredditDetails;