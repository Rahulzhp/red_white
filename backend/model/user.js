const mongoose = require("mongoose");

const UserShema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const UserModel = mongoose.model("red_whiteuser", UserShema)

module.exports = {
    UserModel
}