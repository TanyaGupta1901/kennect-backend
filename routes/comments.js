const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");

router.get("/search", async (req, res) => {
  const {keyword} = req.query;
  const regexPattern = new RegExp(keyword, 'i');
    const query = {
      $or: [
        { name: regexPattern },
        { content: regexPattern }
      ]
    };

    try{
      const posts = await Post.find(query).sort({_id: -1});
      const comments = await Comment.find(query);
      const commentIds = comments.map((c) => c.postId);
      const commentPosts = await Post.find({_id: {$in: commentIds}}).sort({_id: -1})

      res.status(200).send([...posts, ...commentPosts]);
    } catch(error) {
      res.status(400).send({error})
    }
  


})

router.get("/:postId/comments", async (req, res) => {
  try {
    const { postId } = req.params;
    Comment.find({postId}).sort({_id: -1})
    .then((comments) => {
        res.status(200).send(comments);
    })
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.post("/:postId/addComment", async (req, res) => {
  try {
    const { postId } = req.params;
    const { name, content, userId } = req.body;
    const currentPost = await Post.findById(postId);
    if (currentPost) {
      const newComment = new Comment({
        name,
        content,
        postId,
        userId,
      });
      newComment.save().then((comment) => {
        currentPost.comments.push(comment._id);
        currentPost.save();
        res.status(200).json({
          name: comment.name,
          content: comment.content,
        });
      });
    } else throw Error("User not found");
  } catch (e) {
    res.status(400).json({ error: "comment not created" });
  }
});

module.exports = router;
