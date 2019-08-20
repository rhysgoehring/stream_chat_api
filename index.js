const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

require('dotenv').config();

const app = express();
app.use(express.json());



mongoose.connect(
  `mongodb+srv://rhysgoehring:${
    process.env.MONGO_PASSWORD
  }@streamchat-zwel6.mongodb.net/test?retryWrites=true&w=majority
`,
  { useNewUrlParser: true },
);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
