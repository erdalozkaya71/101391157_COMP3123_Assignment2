const express = require('express');
const router = express.Router();
const User = require('../models/user');
//const { mockUsers, mockEmployees } = require('../models/mockData');

// Route for user registration
router.post('/signup', async (req, res) => {
 

  try {
    const { username, email, password } = req.body;

    // Create a new user
    const user = new User({ username, email, password });

    // Save the user to the database
    await user.save();

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }


  //MockData
  //  
  // try {
  //     const { username, email, password } = mockUser;
  //     const user = new User({ username, email, password });
  //     res.status(201).json({ message: 'User registered successfully', user });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   }
});

// Route for user login
router.post('/login', async (req, res) => {

  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username });

    if (!user) {
      // If the user is not found, return an error message
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the password matches
    //const isMatch = await user.comparePassword(password);

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



  // //MockData
  // try {
  //   const { username, password } = mockUser;

  //   if (username === mockUser.username && password === mockUser.password) {
  //     return res.status(200).json({
  //       message: 'User logged in successfully',
  //       user: {
  //         username: username,
  //         email: mockUser.email
  //       }
  //     });
  //   } else {
  //     return res.status(401).json({ message: 'Invalid username or password' });
  //   }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Internal Server Error' });
  // }
});

module.exports = router;