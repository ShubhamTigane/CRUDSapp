const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");
const nodemailer = require("nodemailer");

//get all users
router.get("/getdata", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(404).json(error);
  }
});

//get individual user
router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const user = await users.findById({ _id: id });
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

// register user
router.post("/register", async (req, res) => {
  const { name, number, email, hobbies } = req.body;

  if (!name || !number || !email || !hobbies) {
    res.status(400).json("fill all the data");
  }

  try {
    const preuser = await users.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(400).json("this user is already present");
    } else {
      const adduser = new users({
        name,
        number,
        email,
        hobbies,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(400).json({ error: " has error" });
  }
});

// update user
router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateuser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateuser);
    res.status(200).json(updateuser);
  } catch (error) {
    res.status(400).json(error);
  }
});

//delete user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteuser = await users.findByIdAndDelete({ _id: id });
    console.log(deleteuser);
    res.status(200).json(deleteuser);
  } catch (error) {
    res.status(400).json(error);
  }
});



module.exports = router;
