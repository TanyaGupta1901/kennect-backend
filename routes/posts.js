const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");

router.get("/all", (req, res) => {
    try{

        Post.find().sort({_id: -1})
        .then((posts) => {
            res.status(200).send(posts)
        });
    } catch {
        res.status(400).send({error: "some error occured"})
    }
});

router.post("/addPost", async (req, res) => {
  try{
   const {userId, name, content} = req.body;

   const user = await User.findById(userId);
   if(user)
   {
     const newPost = new Post({name, content, userId});
     newPost.save()
     .then((post) => {
        user.posts.push(post._id);
        user.save();
        res.status(200).json({message: "post created", post})
     })
   }
   else throw Error("User not found")
  } catch (e) {
    res.status(400).json({ message: "Post not created", error: e });
  }
});

module.exports = router;

