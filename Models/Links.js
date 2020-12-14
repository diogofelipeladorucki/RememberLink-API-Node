const mongoose = require('mongoose')
const Schema = mongoose.Schema

var LinkSchema = new Schema({
    idUser:{
        type: String,
        required: "insert idUser",
    },
    titleLink: {
        type: String,
        required: "insert titleLink"
    },
    link:{
        type: String,
        required: "insert link"
    },
    descriptionLink:{
        type: String
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: "insert category"
    }

})


module.exports = mongoose.model("Link", LinkSchema)