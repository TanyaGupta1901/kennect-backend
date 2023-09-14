const mongoose = require("mongoose");

var Comment = new mongoose.Schema({
    name : String,
    userId:String,
    postId: String,
    content : String,
})

module.exports = mongoose.model("Comments",Comment);
