const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
  channelType: {
    type: String,
    required: true,
    enum: ["messaging", "team"],
    minlength: 3,
    maxLength: 20,
  },
  channelId: {
    type: String,
    required: true,
  },
  channelMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

const Channel = mongoose.model("Channel", ChannelSchema);

exports.Channel = Channel;
