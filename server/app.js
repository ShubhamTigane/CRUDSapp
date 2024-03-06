require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const users = require("./models/userSchema");
const cors = require("cors");
const router = require("./routes/router");

const port =process.env.PORT || 4000;

const emailHost = process.env.EMAIL_HOST;
const emailPort = process.env.EMAIL_PORT;
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;

app.use(cors());

app.use(express.json()); 

app.use(router);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
