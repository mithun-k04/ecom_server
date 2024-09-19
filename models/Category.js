const mongoose = require("mongoose")


const CategorySchema = mongoose.Schema({
    name: String,
    image: String,
})

const CategoryModel = mongoose.model("category",CategorySchema)
module.exports = CategoryModel;