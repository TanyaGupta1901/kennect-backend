const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/addUser", async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findOne({ name });

    if (user) {
      return res.status(200).json({
        name: user.name,
        userId: user._id,
      });
    }

    const newUser = new User({ name });
    await newUser.save();

    res.status(200).json({
      name: newUser.name,
      userId: newUser._id,
    });
  } catch (error) {
    res.status(400).json({ error: "User not created", err: error });
  }
});

module.exports = router;
