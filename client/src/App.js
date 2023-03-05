import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main/Profile";
//import Signup from "./components/Singup";
//import Login from "./components/Login";
import ToggleForm from "./components/Mixed";
import Dashboard from "./components/Dashboard";
import Subgreddiit from "./components/Main/Subgreddiit";
import SubredditsList from "./components/Main/Allsubgreddit";
import SubredditDetails from "./components/Main/Allsubgredditid";
import SavedPosts from "./components/Main/SavedPosts";

function App() {
	const user = localStorage.getItem("token");
	const login = localStorage.getItem("token1")
	console.log(login)
	console.log(user)
	return (
		<Routes>
			{user && <Route path="/dashboard" exact element={<Dashboard />} />}
			{user && <Route path="/home" exact element={<Main />} />}
			{user && <Route path="/" element={<Navigate replace to="/dashboard"/>} />}
			{user && <Route path="/subgreddiit" exact element={<Subgreddiit/>} />}
			{user && <Route path="/allsubgreddiit" exact element={<SubredditsList/>} />}
			{user && <Route path="/allsubgreddiit/:id" exact element={<SubredditDetails />} />}
			{user && <Route path="/savedposts" exact element={<SavedPosts />} />}
			<Route path="/" exact element={<ToggleForm />} />
			<Route path="/home" element={<Navigate replace to="/" />} />
			<Route path="/dashboard" element={<Navigate replace to="/" />} />
			<Route path="/subgreddiit" element={<Navigate replace to="/" />} />
			<Route path="/allsubgreddiit" element={<Navigate replace to="/" />} />
			<Route path="/allsubgreddiit/:id" element={<Navigate replace to="/" />} />
		</Routes>
	);
}

export default App;
