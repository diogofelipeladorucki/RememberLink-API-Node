const mongoose = require('mongoose')
const Schema = mongoose.Schema

var CategorySchema = new Schema({
    idUser:{
        type: String,
        required: "insert idUser",
    },
    color:{
        type: String,
        default: "#000000"
    },
    titleCategory:{
        type: String,
        default: "Sem titulo",
        required: "insert titleCategory"
    },
    descriptionCategory:{
        type: String,
        required: "insert descriptionCategory"
    }
})


module.exports = mongoose.model("Category", CategorySchema)