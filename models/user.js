const mongoose = require('mongoose');

var User = new mongoose.Schema(
    {
        name: String,
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }],
    }
)

module.exports = mongoose.model("Users", User);