const mongoose = require("mongoose");

var Post = new mongoose.Schema({
    name : String,
    userId:String,
    content : String,
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
    }],
})

module.exports = mongoose.model("Posts",Post);