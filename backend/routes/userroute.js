const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../model/user");


const usersRoute = express.Router();

// Hash the password

usersRoute.post("/register", async (req, res) => {
    const { name, email, password, gender } = req.body
    try {
        bcrypt.hash(password, 8, async (err, hash) => {
            const user = new UserModel({ name, email, password: hash, gender })
            await user.save()
            res.send("Registered")
        });
    } catch (err) {
        res.send("er", err)
        console.log(err)
    }
})

usersRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (er, result) => {
                if (er) {
                    res.send("something error")
                } else {
                    const token = jwt.sign({ userId: user[0]._id }, "masai");
                    res.send({ "sucess": "login successfully", "token": token })
                }
            })
        }
        else {
            res.send("error")
        }

    } catch (er) {
        res.send("something error")
    }
})
module.exports = {
    usersRoute,
};
