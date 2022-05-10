const mongoose = require("mongoose");
const { Schema, model } = mongoose

const celebritySchema = new Schema ({
    name: {
        type: String
    },
    occupation: {
        type: String
    },
    catchPhrase: {
        type: String
    }
})

const ModelCelebrities = model("model", celebritySchema);
module.exports = ModelCelebrities