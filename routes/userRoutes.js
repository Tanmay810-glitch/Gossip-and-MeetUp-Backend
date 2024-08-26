const express = require('express');
const router = express.Router();
const User = require('./models/User'); // Path to your User model

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

// Route to save or update user data
router.post('/login', async (req, res) => {
  const { name, picture, sub } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ sub });

    if (!user) {
      // Create a new user if they don't exist
      user = new User({ name, picture, sub });
      await user.save();
    } else {
      // Update the user data if they exist
      user.name = name;
      user.picture = picture;
      await user.save();
    }

    res.status(200).json({ message: 'User logged in successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
