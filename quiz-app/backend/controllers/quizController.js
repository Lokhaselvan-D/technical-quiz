const User = require('../models/User');

exports.submitScore = async (req, res) => {
  const { userId, score } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.scores.push({ score });
    await user.save();

    res.status(200).json({ message: 'Score submitted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getScores = async (req, res) => {
  try {
    const users = await User.find({}, 'name email scores');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
