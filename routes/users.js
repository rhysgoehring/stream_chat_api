const bcrypt = require("bcryptjs");
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

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if username is in DB:
    const user = await User.findOne({ username });
    if (!user) res.json({ error: "Username does not exist" });

    // Compare passwords
    user.comparePassword(password, (err, isMatch) => {
      if (err) console.log("compare password error", err);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Password." });
      }
      // Generate token and and send response
      const token = user.generateAuthToken();
      return res.status(200).send({ _id: user.id, username: user.username, token });
    });
  } catch (err) {
    console.log("user sign in error: ", err);
  }
});

module.exports = router;
