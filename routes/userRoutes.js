const express = require('express');
const router = express.Router();
const Users = require('../models/users');



/*
    TODO: Make the algorithm like this:

    1. User clicks on the login button
    2. A search query runs on the backend to find if the user is already exists.
    3. If the user already exists, they are directed to the home feed.
    4. If they don't exist, we make another API call to the backend.
    5. We give it the sub, name, username and email attributes of the new user.
    6. Based on that it will create the user with the following schema:
    {
        sub: sub,
        name: name,
        username: username,
        email: email,
        imageUrl: imageUrl,
        bio: NULL,
    }
*/

router.get('/users', async (req, res) => {
  try {
    const user = await Users.find({sub: "92yri4ur3h4jb4378"})
    if (user) {
      res.status(200).json(user);
      
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/users', async (req, res) => {
  const { sub, name, username, email, imageUrl, bio } = req.body;

  try {

    const newUser = new Users({ sub, name, username, email, imageUrl, bio });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});



module.exports = router;
