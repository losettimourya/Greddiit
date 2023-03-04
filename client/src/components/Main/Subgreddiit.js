import React, { useState } from "react";
import styles from "./styles.module.css";
import Navbar from "../Navbar";
import axios from "axios";
function Subgreddiit() {
  const [showForm, setShowForm] = useState(false);
  const [nameform, setnameform] = useState({ name: "", description: "", tags: [], bannedkeywords: [] });
  const handleChangeName = (event) => {
    setnameform({ ...nameform, name: event.target.value})
  }
  const handleChangeDesc = (event) => {
    setnameform({ ...nameform, description: event.target.value})
  }
  const handleChangeList = (event) => {
    setnameform({...nameform, tags: event.target.value.split(',')});
  }
  const handlechangeKeywords = (event) => {
    setnameform({...nameform, bannedkeywords: event.target.value.split(',')});
  }
  const handleClick = () => {
    setShowForm(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nameform.description)
		try {
			const url = "http://localhost:8080/api/subgreddit";
			const res = await axios.post(url, nameform);
      console.log("res",res)
			await localStorage.setItem("subgreddittoken", res.nameform.name);
      console.log(res.nameform.name)
			// window.location = "/dashboard";
		} catch (error) {
			// if (
			// 	error.response &&
			// 	error.response.status >= 400 &&
			// 	error.response.status <= 500.
			// ) {
			// 	setError(error.response.datalogin.message);
			// }
		}
  }
  return (
    <div>
        <Navbar />
      <button onClick={handleClick}>Create New Subgreddiit</button>
      {showForm && (
        <form className={styles.form_container} onSubmit={handleSubmit}>
        <h1>SUBGREDDIIT FORM</h1>
        <input
            type="Name"
            placeholder="Name"
            name="name"
            onChange={handleChangeName}
            value={nameform.name}
            required
            className={styles.input}
        />
        <input
            type="Description"
            placeholder="Description"
            name="description"
            onChange={handleChangeDesc}
            value={nameform.description}
            required
            className={styles.input}
        />
        <input 
            type="Tags"
            placeholder="Tags"
            name="Tags"
            onChange={handleChangeList}

        />
        <input 
            type="BannedKeys"
            placeholder="Banned Keywords"
            name="bannedkeywords"
            onChange={handlechangeKeywords}
        />
        <button type="submit" className={styles.green_btn}>
            SUBMIT
        </button>
    </form>
      )}
    <div>

    </div>
    </div>
  );
}

export default Subgreddiit;
