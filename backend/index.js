const express = require("express");
const cors = require("cors");

const { connection } = require("./config/db");
const { usersRoute } = require("./routes/userroute")
const { projectRoute } = require("./routes/projectroute")
const { authenticate } = require("./middleware/auth")



require('dotenv').config()
const app = express()

app.use(express.json())
app.use(
    cors({
        origin: "*",
    })
);



// Initialize Passport

app.get("/", (req, res) => {
    res.send("welcome to Home")
})

app.use("/users", usersRoute)
app.use(authenticate)
app.use("/project", projectRoute)
app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("connected to db")

    } catch (er) {
        console.log(er)
    }
    console.log(`server is running in port ${process.env.port}`)
})