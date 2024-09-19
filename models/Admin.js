const mongoose = require("mongoose")


const AdminSchema = mongoose.Schema({
    name: String,
    password: String
})

const AdminModel = mongoose.model("Admin",AdminSchema)
module.exports = AdminModel;