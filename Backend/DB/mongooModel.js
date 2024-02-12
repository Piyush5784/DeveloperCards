const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    linkedIn: {
        type: String,
        required: true,
        unique: true
    },
    twitter: {
        type: String,
        required: true,
        unique: true
    },
    interests: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Model = mongoose.model("Cards", schema);

module.exports = { Model };


