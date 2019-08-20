const bcrypt = require("bcrypt");
const express = require("express");
const { User } = require("../models/user");

const router = express.Router();

router.get("/", (req, res) => res.send("It's working"));

router.post("/signup", async (req, res) => {
  const { username, password, dateCreated } = req.body;
  try {
    // Check if username is taken:
    let user = await User.findOne({ username });
    if (user) return res.json({ error: "Username is taken, try another one." });

    // Create User
    user = new User({
      username,
      password,
      dateCreated,
    });

    // Hash Password & Save User
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    // Generate token and send response
    const token = user.generateAuthToken();
    return res.status(200).send({ _id: user.id, username: user.username, token });
  } catch (err) {
    console.log("user signup error", err);
  }
});

module.exports = router;
