const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
  channelType: {
    type: String,
    required: true,
    enum: ["messaging", "team"],
  },
  channelId: {
    type: String,
  },
  channelName: {
    type: String,
    required: true,
    minLength: 3,
  },
  channelMembers: [
    {
      type: String,
      ref: "User.username",
    },
  ],
});

const Channel = mongoose.model("Channel", ChannelSchema);

exports.Channel = Channel;
