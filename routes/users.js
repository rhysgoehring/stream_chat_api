const bcrypt = require("bcryptjs");
const { StreamChat } = require("stream-chat");
const express = require("express");
const { User } = require("../models/user");

const router = express.Router();

router.get("/", (req, res) => res.send("It's working"));

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if username is taken:
    let user = await User.findOne({ username });
    if (user) return res.json({ error: "Username is taken, try another one." });

    // Create User
    user = new User({
      username,
      password,
    });

    // Hash Password & Save User
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    // Create StreamChat token:
    const serverSideClient = new StreamChat(process.env.STREAM_KEY, process.env.STREAM_SECRET);
    const chatToken = serverSideClient.createToken(user.id);

    // Generate token and send response
    const token = user.generateAuthToken();
    return res.status(200).send({
      _id: user.id,
      username: user.username,
      token,
      chatToken,
    });
  } catch (err) {
    console.log("user signup error", err);
  }
});

router.post("/signin", async (req, res) => {
  console.log("req.body", req.body);
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
      // Create StreamChat token:
      const serverSideClient = new StreamChat(process.env.STREAM_KEY, process.env.STREAM_SECRET);
      const chatToken = serverSideClient.createToken(user.id);

      // Generate auth token and and send response
      const token = user.generateAuthToken();
      return res.status(200).send({
        _id: user.id,
        username: user.username,
        token,
        chatToken,
      });
    });
  } catch (err) {
    console.log("user sign in error: ", err);
  }
});

module.exports = router;
