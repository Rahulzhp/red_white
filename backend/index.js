const express = require("express");
const cors = require("cors");

const { connection } = require("./config/db");
const { usersRoute } = require("./routes/userroute")
const { projectRoute } = require("./routes/projectroute")

const cookieSession = require('cookie-session');

require('dotenv').config()
const app = express()

app.use(express.json())
app.use(
    cors({
        origin: "*",
    })
);

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    keys: ['rahulvicku_yash_arti'], // Replace with your own secret key
}));

// Initialize Passport

app.get("/", (req, res) => {
    res.send("welcome to Home")
})

app.use("/users", usersRoute)
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