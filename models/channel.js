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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Channel = mongoose.model("Channel", ChannelSchema);

exports.Channel = Channel;
