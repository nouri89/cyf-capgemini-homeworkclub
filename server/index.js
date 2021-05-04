require("dotenv").config()
const express = require("express");

const app = express();
const cors = require("cors");



//middleware
app.use(express.json());
app.use(cors());


//Routes

// Register and login routes

app.use("/auth", require("./routes/jwtAuth"));

//Dashboard routes 
app.use("/dashboard", require("./routes/dashboard"));



const port = process.env.PORT;





app.listen(port, () => {console.log(`Server up and listening in port ${port}`);  });
