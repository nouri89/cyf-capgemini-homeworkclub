import  { Fragment, useState, useEffect } from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Login from "./component/Login";
import Register from "./component/Register";

function App() {
	const [isAuthanticated, setIsAuthanticated] = useState(false);
	const setAuth = (boolean) => {
		setIsAuthanticated(boolean);
	};

	async function isAuth() {
		try {
			const response = await fetch("http://localhost:3001/auth/is-verify", {
				method: "GET",
				headers: { token: localStorage.token }
			});
			const parsRes = await response.json();
			console.log(parsRes);
			parsRes === true ? setIsAuthanticated(true) : setIsAuthanticated(false);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() =>{isAuth()} );

	return (
		<div className="App">
			<Fragment>
				<Router>
					<div className="container">
						<Switch>
							<Route
								exact
								path="/login"
								render={(props) =>
									!isAuthanticated ? (
										<Login {...props} setAuth={setAuth} />
									) : (
										<Redirect to="/dashboard" />
									)
								}
							/>
							<Route
								exact
								path="/register"
								render={(props) =>
									!isAuthanticated ? (
										<Register {...props} setAuth={setAuth} />
									) : (
										<Redirect to="/login" />
									)
								}
							/>
							<Route
								exact
								path="/dashboard"
								render={(props) =>
									isAuthanticated ? (
										<Dashboard {...props} setAuth={setAuth} />
									) : (
										<Redirect to="/login" />
									)
								}
							/>
						</Switch>
					</div>
				</Router>
			</Fragment>
		</div>
	);
}

export default App;
