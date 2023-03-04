


import axios from "axios";
import { useState } from "react";
import styles from "./styles.module.css";
import Navbar from "../Navbar";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);
// const connectionParams = {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// };
// mongoose.connect("mongodb+srv://Mourya07:Mourya07@cluster0.yjrbwzd.mongodb.net/?retryWrites=true&w=majority", connectionParams);
const Main = () => {
	const [datalogin, setDatalogin] = useState({ email: "", password: "" });
	const handleLogout =  () => {
		localStorage.removeItem("token");
		// const url = "http://localhost:8080/api/auth";
		// axios.get(url).then(resp => { console.log(resp.data)})
		window.location.reload();
	};
	const printname = () => {
		const firstname = localStorage.getItem("token")
	}
	return (
		<div>
		<Navbar />
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>GREDDIIT</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<h3><center>Hello {localStorage.getItem("token")}</center></h3>
		</div>
		</div>
	);
};

export default Main;
