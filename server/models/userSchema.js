const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: { 
    type: Number,
    required: true,
  }, 
  email: { 
    type: String,
    required: true,
  },
  hobbies: {
    type: String,
    required: true,
  },
});

const users = new mongoose.model("users", userSchema);

module.exports = users;
 