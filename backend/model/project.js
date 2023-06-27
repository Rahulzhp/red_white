const mongoose = require("mongoose");

const ProjectShema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})



const ProjectModel = mongoose.model("red_white", ProjectShema)

module.exports = {
    ProjectModel
}