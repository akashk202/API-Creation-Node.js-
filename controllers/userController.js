const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllUsersWithDetails = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'details', // The collection name in MongoDB (usually lowercase plural)
          localField: '_id',
          foreignField: 'userId',
          as: 'userDetails'
        }
      },
      {
        $unwind: {
          path: '$userDetails',
          preserveNullAndEmptyArrays: true // Include users without details
        }
      },
      {
        $project: {
          password: 0, // Exclude password
          'userDetails._id': 0, // Exclude unnecessary fields
          'userDetails.userId': 0,
          'userDetails.createdAt': 0,
          'userDetails.updatedAt': 0
        }
      }
    ]);

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};