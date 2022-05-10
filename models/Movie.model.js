const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const MovieSchema = new Schema({
    title: {
        type: String
    },
    genre: {
        type: String
    },
    plot: {
        type: String
    },
    cast: [
        {
            type: Schema.Types.ObjectId
        }
    ]
})

const ModelMovie = model("movie", MovieSchema);

module.exports = ModelMovie;

