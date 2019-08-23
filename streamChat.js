const { StreamChat } = require("stream-chat");

const serverSideClient = new StreamChat(process.env.STREAM_KEY, process.env.STREAM_SECRET);

module.exports = serverSideClient;
