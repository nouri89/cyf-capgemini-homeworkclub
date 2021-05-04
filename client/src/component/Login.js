import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setAuth }) => {
     const [inputs, setInputs] = useState({
				
				email: "",
				password: "",
				
			});
    const { email, password } = inputs;
    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    const onSubmitForm
        = async (e) => {
				e.preventDefault();
				try {
					const body = {  email, password };
					console.log(body);
					const response = await fetch("http://localhost:3001/auth/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(body),
					});
                    const parsRes = await response.json();
                   
					localStorage.setItem("token", parsRes.token);

					setAuth(true);
				} catch (error) {
					console.log(error);
				}
			};

    
    return (
			<Fragment>
				<h1 className="text-center my-5">Login</h1>
				<form onSubmit={onSubmitForm}>
					<input
						type="email"
						name="email"
						placeholder="email"
						value={email}
						className="form-control my-3 "
						onChange={(e) => onChange(e)}
					/>
					<input
						type="password"
						name="password"
						value={password}
						placeholder="password"
						className="form-control my-3 "
						onChange={(e) => onChange(e)}
					/>
					<button className="btn btn-success btn-block">submit</button>
				</form>
				<Link to="register">Register</Link>
			</Fragment>
		);
};

export default Login;


// const isAuth = async () => {
/*
  try {
     const response = await fetch("http://localhost:3001/auth/is-verify", {
				method: "GET",
				headers: { token: localStorage.token },
			});
			const parsRes = await response.json();
    console.log(parsRes);
    
  } catch (error) {
    console.log(error)
  }
}
*/
  //useEffect(isAuth(), []);