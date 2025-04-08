const Details = require('../models/Details');
const User = require('../models/User');

exports.createDetails = async (req, res) => {
  try {
    const details = new Details({
      ...req.body,
      userId: req.user._id
    });
    await details.save();
    res.status(201).json(details);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const details = await Details.findOne({ userId: req.params.userId });
    if (!details) return res.status(404).json({ error: 'Details not found' });
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

