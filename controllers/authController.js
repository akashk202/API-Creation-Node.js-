const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body;

    // Validate at least one identifier exists
    if (!email && !phoneNumber) {
      return res.status(400).json({ error: 'Email or phone number is required' });
    }

    // Check if user exists with email or phone
    const existingUser = await User.findOne({
      $or: [
        { email: email || '' },
        { phoneNumber: phoneNumber || '' }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({
      email,
      phoneNumber,
      password
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body;

    // Validate at least one identifier exists
    if (!email && !phoneNumber) {
      return res.status(400).json({ error: 'Email or phone number is required' });
    }

    // Find user by email or phone
    const user = await User.findOne({
      $or: [
        { email: email || '' },
        { phoneNumber: phoneNumber || '' }
      ]
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ 
      message: 'Login successful',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};