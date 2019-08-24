const express = require("express");
const { StreamChat } = require("stream-chat");
const { Channel } = require("../models/channel");
const { User } = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

// Create a channel:
// TODO: Add auth middleware after client axios config
router.post("/new", async (req, res) => {
  console.log("req.body", req.body);
  const { channelName, username } = req.body;
  try {
    // Check if channelName is in DB:
    const channelExists = await Channel.findOne({ channelName });
    console.log("channelExists", channelExists);
    if (channelExists) return res.json({ error: "There is already a channel with that name. " });

    // Get all usernames to allow all users access to channel:
    const userMap = await User.find({}).select("username -_id");

    const usernames = userMap.map((user) => user.username);

    // TODO: Generate better channelId or update channelId later with _id
    // Create channel:
    const channel = new Channel({
      channelType: "messaging",
      channelId: `${username}-${Date.now()}`,
      channelName,
      channelMembers: usernames,
    });
    console.log("channel", channel);
    await channel.save();
    return res.status(200).send(channel);
    // return res.sendStatus(200);
  } catch (err) {
    console.log("post new channel error: ", err);
  }
});

module.exports = router;
