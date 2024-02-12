const express = require("express");
const app = express();
require('dotenv').config();
const { Model } = require("./DB/mongooModel");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 3001;
const mongodburl = process.env.MONGOURL;

app.use(cors())

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Working Fine");
})

app.get("/getPersons", async (req, res) => {
    try {
        const Data = await Model.find({});
        res.send(Data)
    } catch (error) {
        res.json({ Message: "Something Error Happens" })
    }
})

app.post("/showCart", async (req, res) => {
    const newPerson = req.body.newPerson;

    const { name, description, linkedIn, twitter, interests } = newPerson;

    try {
        const addToDb = await Model.create({
            name,
            description,
            linkedIn,
            twitter,
            interests
        })
        res.json({
            Message: "Person Added",
            addToDb
        })
    } catch (error) {
        console.log(error)
        res.json({ Message: "Username Already Exists" });

    }
})


mongoose.connect(mongodburl).then(
    app.listen(port, () => {
        console.log(`Server is Running on the ${port}`);
    })
)