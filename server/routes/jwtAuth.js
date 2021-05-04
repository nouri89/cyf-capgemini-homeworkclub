const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorisation = require("../middleware/authorisation");
/*
router.get("/", (req, res) => {
	try {
		res.json("you are connected");
	} catch (error) {
		console.log(error);
	}
});*/

//registering

router.post("/register", validInfo, async (req, res) => {
	try {
		//1. de-structure  req.body {name, email, password}
		const { username, email, password, role } = req.body;

		//2. check if the user exits (if user exist throw error)
		const user = await pool.query("SELECT * FROM users WHERE email =$1  ", [
			email,
		]);
		// res.json(user.rows);
		if (user.rows.length > 0) {
			res
				.status(401)
				.send(` Unauthorized! user  with email ${email} already exists.`);
		}

		//3. bcrypt the user password
		const saltRound = 10;
		const salt = await bcrypt.genSalt(saltRound);
		const bcryptPassword = await bcrypt.hash(password, salt);

		//4. enter the new user inside the database

		const newUser = await pool.query(
			"INSERT INTO users (username,email,password,role) VALUES ($1,$2,$3,$4) RETURNING *   ",
			[username, email, bcryptPassword, role]
		);
		//res.json(newUser.rows[0]);
		//5. generate our jwt token

		const token = jwtGenerator(newUser.rows[0].user_id);
		res.json({ token });
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});
// Login Route
router.post("/login", validInfo, async (req, res) => {
	try {
		//1 .de-structure req.body

		const { email, password } = req.body;

		//2. check if the user exist , if not throw an error
		const user = await pool.query("SELECT * FROM users WHERE email =$1", [
			email
		]);
		if (user.rows.length === 0) {
			return res
				.status(401)
				.send(
					`User with email ${email} does not exist please enter another email or Register.`
				);
		}

		//3. check if the incomming password is the same as the database password

		const validPassword = await bcrypt.compare(
			password,
			user.rows[0].password
		);

		
		if (!validPassword) {
			return res.status(401).send(` password ${password} is incorrect .`);
		}

		//4. give them gwt token

		const token = jwtGenerator(user.rows[0].user_id);
		res.json({ token });
	} catch (error) {
		console.log(error);
		res.status(500).send("server error");
	}
});

router.get("/is-verify", authorisation, async (req, res) => {
	try {
		res.json(true);
	} catch (error) {
		console.log(error);
		res.status(500).send("server error");
	}
});

module.exports = router;
