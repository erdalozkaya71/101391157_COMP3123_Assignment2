const express = require("express")
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require('bcrypt');


router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExist = await user.findOne({ username });
        if (userExist) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const newUser = new userModel({
            username,
            email,
            password
        });
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (e) {
        return res.status(500).json({message: 'Username or email exist' });
    }
})
// Route for user login


router.post('/login', async (req, res) => {

  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await userModel.findOne({ username });

    if (!user) {
      // If the user is not found, return an error message
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the password matches

    if (password === user.password) {
      // If the password matches, return a success message and user details
      return res.status(200).json({
        message: 'User logged in successfully',
        user: {
          username: user.username,
          email: user.email
        }
      });
    } else {
      // If the password does not match, return an error message
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }


});

module.exports = router;