import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
	const [datalogin, setDatalogin] = useState({ email: "", password: "" });
	
	const [error, setError] = useState("");

	const handleChangelogin = ({ currentTarget: input }) => {
		setDatalogin({ ...datalogin, [input.name]: input.value });
	};

	const handleSubmitlogin = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { datalogin: res } = await axios.post(url, datalogin);
			localStorage.setItem("token", res.datalogin);
			window.location = "/dashboard";
		} catch (error) {
			// if (
			// 	error.response &&
			// 	error.response.status >= 400 &&
			// 	error.response.status <= 500
			// ) {
			// 	setError(error.response.datalogin.message);
			// }
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmitlogin}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChangelogin}
							value={datalogin.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChangelogin}
							value={datalogin.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sing In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/">
						<button type="button" className={styles.white_btn} onClick={() => {localStorage.setItem("token1","suii")}}>
							Sing Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
