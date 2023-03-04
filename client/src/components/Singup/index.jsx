import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
	const [datasignup, setDatasignup] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChangesignup = ({ currentTarget: input }) => {
		setDatasignup({ ...datasignup, [input.name]: input.value });
	};

	const handleSubmitsignup = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { datasignup: res } = await axios.post(url, datasignup);
			navigate("/");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.datasignup.message);
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/">
						<button type="button" className={styles.white_btn} onClick={() => {localStorage.removeItem("token1")}}>
							Sing in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmitsignup}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChangesignup}
							value={datasignup.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChangesignup}
							value={datasignup.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChangesignup}
							value={datasignup.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChangesignup}
							value={datasignup.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<Link to="/">
						<button type="submit" className={styles.green_btn} onClick={() => {localStorage.removeItem("token1")}}>
							Sing Up
						</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
