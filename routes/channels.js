const express = require("express");
const { StreamChat } = require("stream-chat");
const { Channel } = require("../models/channel");
const auth = require("../middleware/auth");
const serverSideClient = require("../streamChat");

const router = express.Router();

// Create a channel:
// TODO: Add auth middleware after client axios config
router.post("/new", async (req, res) => {
  console.log("req.body", req.body);
  return res.sendStatus(200);
});

module.exports = router;
