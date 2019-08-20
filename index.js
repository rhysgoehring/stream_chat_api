const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/users");

require("dotenv").config();

// TODO: Put entre URL for production environment in .env
mongoose
  .connect(
    `mongodb+srv://rhysgoehring:${
      process.env.MONGO_PASSWORD
    }@streamchat-zwel6.mongodb.net/test?retryWrites=true&w=majority
`,
    { useNewUrlParser: true, useCreateIndex: true },
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

const app = express();

app.use(express.json());

app.use("/users", userRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

module.exports = app;
