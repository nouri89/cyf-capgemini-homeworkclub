import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Register = ({setAuth}) => {
    const [inputs, setInputs] = useState({ username: "", email: "", password: "", role: "" });
    const { username, email, password, role } = inputs;

   
    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };
    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            const body = { username, email, password, role };
            console.log(body);
            const response = await fetch("http://localhost:3001/auth/register", {
                 method:"POST",
                headers:{ "Content-Type": "application/json" },
                body: JSON.stringify(body) 
            }
            );
            const parsRes = await response.json();
            localStorage.setItem("token", parsRes.token);

            setAuth(true);
        } catch (error) {
            console.log(error);
            
        }
    }
	return (
		<Fragment>
			<h1 className="text-center my-5">Register</h1>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					name="username"
					placeholder="username"
					value={username}
					className="form-control my-3 "
					onChange={(e) => onChange(e)}
				/>
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

				<select
					id="role"
					name="role"
					className="form-control my-3 "
					onChange={(e) => onChange(e)}
					required
				>
					<option>Select Your Role</option>
					<option value="volunteer">Volunteer</option>
					<option value="trainee">Trainee</option>
				</select>
				<button className="btn btn-success btn-block">submit</button>
			</form>
			<Link to="login">Login</Link>
		</Fragment>
	);
};

export default Register;
