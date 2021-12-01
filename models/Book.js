const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Book = new Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    ano: {
        type: String,
        required: Number
    },
    sinopse: {
        type: String,
        required: true
    },
    capa: {
        type: String
    }
})

mongoose.model("book", Book);