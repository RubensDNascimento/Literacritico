const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = new Schema({
    titulo: {
        type: String,
        required: true
    },
    critico: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    resumo: {
        type: String
    },
    livro:{
        type: Schema.Types.ObjectId,
        ref: 'book',
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model("review", Review);