const express = require("express");
const projectRoute = express.Router();
const { ProjectModel } = require("../model/project");
const { authenticator } = require("../middleware/auth")

const PAGE_SIZE = 5; // Number of items per page

projectRoute.get("/", async (req, res) => {
    const { search, page = 1 } = req.query;
    const skip = (page - 1) * PAGE_SIZE;

    try {
        const filter = {}; // Create an empty filter object

        if (search) {
            const searchRegex = new RegExp(search, "i");
            filter.$or = [
                { name: searchRegex },
                { description: searchRegex },

            ];
        }

        const count = await ProjectModel.countDocuments(filter);
        const totalPages = Math.ceil(count / PAGE_SIZE);

        const data = await ProjectModel.find(filter)
            .skip(skip)
            .limit(PAGE_SIZE);

        res.send({ data, totalPages });
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
    }
});

projectRoute.get("/sort/low", async (req, res) => {
    const { page = 1, search } = req.query;
    const skip = (page - 1) * PAGE_SIZE;

    try {
        const filter = {}; // Create an empty filter object

        if (search) {
            const searchRegex = new RegExp(search, "i");
            filter.$or = [
                { name: searchRegex },
                { description: searchRegex },

            ];
        }

        const count = await ProjectModel.countDocuments(filter);
        const totalPages = Math.ceil(count / PAGE_SIZE);

        const data = await ProjectModel.find(filter)
            .sort({ price: 1 })
            .skip(skip)
            .limit(PAGE_SIZE);

        res.send({ data, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

projectRoute.get("/sort/high", async (req, res) => {
    const { page = 1, search } = req.query;
    const skip = (page - 1) * PAGE_SIZE;

    try {
        const filter = {}; // Create an empty filter object

        if (search) {
            const searchRegex = new RegExp(search, "i");
            filter.$or = [
                { name: searchRegex },
                { description: searchRegex },

            ];
        }

        const count = await ProjectModel.countDocuments(filter);
        const totalPages = Math.ceil(count / PAGE_SIZE);

        const data = await ProjectModel.find(filter)
            .sort({ price: -1 })
            .skip(skip)
            .limit(PAGE_SIZE);

        res.send({ data, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});


projectRoute.post("/", async (req, res) => {
    const payload = req.body;
    try {
        const data = new ProjectModel(payload);
        await data.save();
        res.send("posted");
    } catch (err) {
        res.send(err);
    }
});
projectRoute.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    try {
        const data = await ProjectModel.findByIdAndUpdate(id, payload);
        res.send({ msg: "updated" });
    } catch (err) {
        res.send(err);
    }
});

projectRoute.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const data = await ProjectModel.findByIdAndDelete(id);
        res.send("deleted");
    } catch (err) {
        res.send(err);
    }
});

module.exports = {
    projectRoute
};